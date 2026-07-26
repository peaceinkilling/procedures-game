(function attachDepotSession(root){
  'use strict';
  const storageKey='depotRun.analytics.v1';
  const sessionKey='depotRun.session.v1';
  const courseHashes={
    '105':'a3778a955e2ecc698a76fdc73ef18cf5f78b526485f6089f6c28076519f9fc43',
    '106':'317ed5868abccec6efb5e8364db6b5010797d5dbae0d41eea96cea67992682d4'
  };
  let current=null;
  let activeMission=null;
  const byId=id=>document.getElementById(id);
  const nowIso=()=>new Date().toISOString();
  const safeParse=(value,fallback)=>{if(!value)return fallback;try{return JSON.parse(value)??fallback}catch(error){return fallback}};
  const readRecords=()=>{const records=safeParse(localStorage.getItem(storageKey),[]);return Array.isArray(records)?records:[]};
  const writeRecords=records=>localStorage.setItem(storageKey,JSON.stringify(records.slice(-2500)));
  const id=()=>`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`;
  async function digest(value){
    const bytes=new TextEncoder().encode(value),hash=await crypto.subtle.digest('SHA-256',bytes);
    return [...new Uint8Array(hash)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
  }
  function record(activity,details={}){
    if(!current||current.admin)return;
    const records=readRecords();
    records.push({recordId:id(),sessionId:current.sessionId,name:current.name,course:current.course,activity,timestamp:nowIso(),...details});
    writeRecords(records);
  }
  function setSessionChip(){
    if(!current)return;
    byId('sessionChip').innerHTML=current.admin?'<b>ADMIN</b><span>Private local console</span>':`<b>${current.name}</b><span>BOM ${current.course}</span>`;
    byId('analyticsBtn').classList.toggle('hidden',!current.admin);
    byId('hangarAnalyticsBtn').classList.toggle('hidden',!current.admin);
  }
  function restoreSession(){
    current=safeParse(sessionStorage.getItem(sessionKey),null);
    if(!current)return false;
    byId('loginOverlay').classList.add('hidden');setSessionChip();return true;
  }
  function showFeedback(message){
    const feedback=byId('accessFeedback');feedback.textContent=message;feedback.classList.remove('hidden');
  }
  async function submitAccess(event){
    event.preventDefault();
    const name=byId('playerName').value.trim();
    if(!name){showFeedback('Enter your name to continue.');return}
    if(name.toLowerCase()==='admin'){
      current={sessionId:id(),name:'admin',course:'ADMIN',admin:true,loginAt:nowIso()};
      sessionStorage.setItem(sessionKey,JSON.stringify(current));
      byId('loginOverlay').classList.add('hidden');setSessionChip();renderAnalytics();return;
    }
    const course=byId('playerCourse').value,password=byId('coursePassword').value;
    if(await digest(password)!==courseHashes[course]){showFeedback(`The password does not match BOM ${course}.`);return}
    current={sessionId:id(),name,course,admin:false,loginAt:nowIso()};
    sessionStorage.setItem(sessionKey,JSON.stringify(current));
    byId('loginOverlay').classList.add('hidden');setSessionChip();
    record('session_started',{loginAt:current.loginAt,userAgentClass:/Mobi|Android/i.test(navigator.userAgent)?'mobile':'desktop'});
  }
  function recordMissionStart(game){
    if(!current||current.admin)return;
    activeMission={missionId:id(),startedAt:Date.now(),procedure:game.procedure,mode:game.mode,mission:game.mission,role:game.role};
    record('mission_started',{...activeMission,startedAt:new Date(activeMission.startedAt).toISOString(),transport:game.transport});
  }
  function recordStep(game,officeId){
    record('control_point_completed',{missionId:activeMission?.missionId,procedure:game.procedure,mode:game.mode,mission:game.mission,role:game.role,office:officeId,step:game.index+1,score:game.score});
  }
  function recordMistake(game,kind,detail){
    record('mistake',{missionId:activeMission?.missionId,procedure:game.procedure,mode:game.mode,mission:game.mission,role:game.role,kind,detail,step:game.index+1,score:game.score});
  }
  function recordMissionEnd(game,success){
    const durationSeconds=activeMission?Math.round((Date.now()-activeMission.startedAt)/1000):Math.round(game.elapsed||0);
    record('mission_finished',{missionId:activeMission?.missionId,procedure:game.procedure,mode:game.mode,mission:game.mission,role:game.role,success,score:game.score,mistakes:game.mistakes,livesRemaining:game.lives,durationSeconds,penaltySeconds:game.penalty,controlPointsCompleted:game.completed.length});
    activeMission=null;
  }
  function recordMissionQuit(game){
    if(!game.running)return;
    const durationSeconds=activeMission?Math.round((Date.now()-activeMission.startedAt)/1000):Math.round(game.elapsed||0);
    record('mission_quit',{missionId:activeMission?.missionId,procedure:game.procedure,mode:game.mode,mission:game.mission,role:game.role,score:game.score,mistakes:game.mistakes,durationSeconds,controlPointsCompleted:game.completed.length});
    activeMission=null;
  }
  function recordArchiveView(kind,itemId,procedure){
    record('archive_view',{archiveKind:kind,itemId,procedure});
  }
  const csvCell=value=>`"${String(value??'').replaceAll('"','""')}"`;
  function download(name,type,content){
    const link=document.createElement('a'),url=URL.createObjectURL(new Blob([content],{type}));
    link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),500);
  }
  function exportCsv(){
    const records=readRecords(),keys=['timestamp','name','course','activity','procedure','mode','mission','role','office','score','durationSeconds','mistakes','success','kind','itemId','archiveKind','sessionId','missionId'];
    download(`depot-run-analytics-${new Date().toISOString().slice(0,10)}.csv`,'text/csv;charset=utf-8',[keys.join(','),...records.map(row=>keys.map(key=>csvCell(row[key])).join(','))].join('\n'));
  }
  function exportJson(){download(`depot-run-analytics-${new Date().toISOString().slice(0,10)}.json`,'application/json',JSON.stringify({exportedAt:nowIso(),storageScope:'this browser only',records:readRecords()},null,2))}
  function renderAnalytics(){
    if(!current?.admin)return;
    const records=readRecords(),finished=records.filter(row=>row.activity==='mission_finished'),players=new Set(records.map(row=>`${row.name}|${row.course}`));
    const totalSeconds=finished.reduce((sum,row)=>sum+(row.durationSeconds||0),0),average=finished.length?Math.round(finished.reduce((sum,row)=>sum+(row.score||0),0)/finished.length):0;
    byId('analyticsSummary').innerHTML=`<div><span>Players</span><b>${players.size}</b></div><div><span>Sessions</span><b>${new Set(records.map(row=>row.sessionId)).size}</b></div><div><span>Missions completed</span><b>${finished.length}</b></div><div><span>Average score</span><b>${average}</b></div><div><span>Recorded play time</span><b>${Math.round(totalSeconds/60)} min</b></div><div><span>Mistakes</span><b>${records.filter(row=>row.activity==='mistake').length}</b></div>`;
    const rows=byId('analyticsRows');rows.innerHTML='';
    [...records].reverse().forEach(row=>{
      const tr=document.createElement('tr'),values=[
        row.name,row.course,row.activity,
        [row.procedure,row.mode,row.role||row.itemId].filter(Boolean).join(' · '),
        row.score??'—',
        row.durationSeconds!=null?`${row.durationSeconds}s`:new Date(row.timestamp).toLocaleString(),
        [row.kind,row.office,row.success===true?'completed':row.success===false?'failed':'',row.mistakes!=null?`${row.mistakes} mistakes`:''].filter(Boolean).join(' · ')
      ];
      values.forEach(value=>{const td=document.createElement('td');td.textContent=value;tr.append(td)});rows.append(tr);
    });
    if(!records.length)rows.innerHTML='<tr><td colspan="7">No player activity is stored in this browser yet.</td></tr>';
  }
  function openAnalytics(){if(!current?.admin)return;renderAnalytics();byId('analyticsOverlay').classList.remove('hidden')}
  function initialize(){
    byId('accessForm').addEventListener('submit',submitAccess);
    byId('playerName').addEventListener('input',()=>{
      const admin=byId('playerName').value.trim().toLowerCase()==='admin';
      byId('passwordField').classList.toggle('hidden',admin);byId('coursePassword').required=!admin;
    });
    byId('analyticsBtn').addEventListener('click',openAnalytics);byId('hangarAnalyticsBtn').addEventListener('click',openAnalytics);
    byId('analyticsClose').addEventListener('click',()=>byId('analyticsOverlay').classList.add('hidden'));
    byId('exportCsvBtn').addEventListener('click',exportCsv);byId('exportJsonBtn').addEventListener('click',exportJson);
    byId('clearAnalyticsBtn').addEventListener('click',()=>{if(confirm('Permanently clear all player records stored in this browser?')){localStorage.removeItem(storageKey);renderAnalytics()}});
    restoreSession();
  }
  initialize();
  root.DepotSession={get current(){return current},record,recordMissionStart,recordStep,recordMistake,recordMissionEnd,recordMissionQuit,recordArchiveView,renderAnalytics,readRecords};
})(globalThis);
