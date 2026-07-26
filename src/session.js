(function attachDepotSession(root){
  'use strict';
  const sessionKey='depotRun.access.v2';
  const courseHashes={
    '105':'a3778a955e2ecc698a76fdc73ef18cf5f78b526485f6089f6c28076519f9fc43',
    '106':'317ed5868abccec6efb5e8364db6b5010797d5dbae0d41eea96cea67992682d4'
  };
  let current=null;
  const byId=id=>document.getElementById(id);
  const safeParse=value=>{if(!value)return null;try{return JSON.parse(value)}catch(error){return null}};
  async function digest(value){
    const bytes=new TextEncoder().encode(value),hash=await crypto.subtle.digest('SHA-256',bytes);
    return [...new Uint8Array(hash)].map(byte=>byte.toString(16).padStart(2,'0')).join('');
  }
  function setSessionChip(){
    if(!current)return;
    byId('sessionChip').innerHTML=current.bypass?'<b>FOLS</b><span>Authorised bypass · no analytics</span>':`<b>${current.name}</b><span>BOM ${current.course} · no analytics</span>`;
  }
  function restoreSession(){
    current=safeParse(sessionStorage.getItem(sessionKey));
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
    if(name.toUpperCase()==='FOLS'){
      current={name:'FOLS',course:'BYPASS',bypass:true};
      sessionStorage.setItem(sessionKey,JSON.stringify(current));
      byId('loginOverlay').classList.add('hidden');setSessionChip();return;
    }
    const course=byId('playerCourse').value,password=byId('coursePassword').value;
    if(await digest(password)!==courseHashes[course]){showFeedback(`The password does not match BOM ${course}.`);return}
    current={name,course,bypass:false};
    sessionStorage.setItem(sessionKey,JSON.stringify(current));
    byId('loginOverlay').classList.add('hidden');setSessionChip();
  }
  function initialize(){
    byId('accessForm').addEventListener('submit',submitAccess);
    byId('playerName').addEventListener('input',()=>{
      const bypass=byId('playerName').value.trim().toUpperCase()==='FOLS';
      byId('passwordField').classList.toggle('hidden',bypass);byId('coursePassword').required=!bypass;
    });
    restoreSession();
  }
  initialize();
  root.DepotSession={
    get current(){return current},
    analyticsEnabled:false
  };
})(globalThis);
