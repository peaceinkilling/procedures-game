(function attachDepotArchive(root){
  'use strict';
  const data=root.DepotData,verified=root.DepotArchiveData,map=root.DepotMap,byId=id=>document.getElementById(id);
  let section='offices',procedure='Issue',detail=null,archiveWasRunning=false;
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const clean=value=>String(value||'').toLowerCase().replace(/[^a-z0-9&]+/g,' ');
  const profiles=()=>verified.documents[procedure]||[];
  const officeProfiles=()=>verified.offices[procedure]||{};
  const character=id=>data.characters.find(item=>item.id===id);
  const place=id=>map.building(id,procedure)||data.offices.find(item=>item.id===id);
  const citation=evidence=>evidence?`${esc(evidence.source)} · ${esc(evidence.reference)} · ${esc(evidence.pages)}`:'Source citation unavailable';
  const iconForOffice=id=>place(id)?.icon||'▣';
  const iconForDocument=id=>character(id)?.icon||'▤';
  const documentsAtOffice=id=>profiles().filter(profile=>profile.flowchart.some(stage=>stage.officeId===id));
  const backButton=()=>'<button class="btn archive-back" id="archiveBack" type="button">← Back to Archive</button>';
  function bindBack(){byId('archiveBack').addEventListener('click',()=>{detail=null;render()})}
  function setTabs(){
    const onOffices=section==='offices';
    byId('archiveOfficesTab').classList.toggle('primary',onOffices);
    byId('archiveDocumentsTab').classList.toggle('primary',!onOffices);
    byId('archiveOfficesTab').setAttribute('aria-selected',String(onOffices));
    byId('archiveDocumentsTab').setAttribute('aria-selected',String(!onOffices));
    byId('archiveBreadcrumb').textContent=`Archive / ${onOffices?'Sections & Branches':'Documents'}${detail?` / ${detail}`:''}`;
  }
  function render(){
    setTabs();
    const query=clean(byId('archiveSearch').value),content=byId('archiveContent');
    if(detail){section==='offices'?renderOffice(detail):renderDocument(detail);return}
    if(section==='offices'){
      const items=Object.entries(officeProfiles()).filter(([id,profile])=>!query||clean(`${profile.officialName} ${profile.classification} ${profile.role}`).includes(query));
      content.innerHTML=`<div class="archive-grid">${items.map(([id,profile],index)=>`<button class="archive-card" data-office="${esc(id)}" type="button">
        <span class="archive-number">${String(index+1).padStart(2,'0')}</span><i>${iconForOffice(id)}</i>
        <b>${esc(profile.officialName)}</b><small>${esc(profile.classification)}</small>
        <em>Sequence: ${esc(profile.sequence)}</em></button>`).join('')}</div>`;
    }else{
      const items=profiles().filter(profile=>!query||clean(`${profile.title} ${profile.form} ${profile.origin} ${profile.purpose}`).includes(query));
      content.innerHTML=`<div class="archive-grid document-grid">${items.map((profile,index)=>`<button class="archive-card document-card" data-document="${esc(profile.id)}" type="button">
        <span class="archive-number">${String(index+1).padStart(2,'0')}</span><i>${iconForDocument(profile.id)}</i>
        <b>${esc(profile.title)}</b><small>${esc(profile.form)}</small>
        <em>${profile.flowchart.length} lifecycle stages</em></button>`).join('')}</div>`;
    }
  }
  function renderOffice(id){
    const profile=officeProfiles()[id],docs=documentsAtOffice(id),content=byId('archiveContent');
    if(!profile)throw new Error(`No Archive profile for ${id}.`);
    content.innerHTML=`${backButton()}<article class="archive-dossier verified-dossier">
      <header><div class="dossier-icon">${iconForOffice(id)}</div><div><span>${esc(profile.classification)}</span><h3>${esc(profile.officialName)}</h3><p>Procedure position: ${esc(profile.sequence)}</p></div></header>
      <div class="source-verdict verified">OFFICE ROLE AND ACTIONS</div>
      <section><h4>Exact role in the procedure</h4><p class="archive-role">${esc(profile.role)}</p></section>
      <section><h4>Actions in source order</h4><ol class="chronology">${profile.actions.map((item,index)=>`<li><span>${index+1}</span><div><b>${esc(item.text)}</b><small class="source-line">${citation(item.evidence)}</small></div></li>`).join('')}</ol></section>
      <section class="caution-panel"><h4>Boundary — what this office must not be mistaken for</h4><p>${esc(profile.boundary)}</p></section>
      <section><h4>Documents that pass through this point</h4><div class="office-document-flow">${docs.map(doc=>`<button type="button" data-jump-document="${esc(doc.id)}"><b>${esc(doc.title)}</b><span>${esc(doc.flowchart.find(stage=>stage.officeId===id)?.text||'Procedure stage')}</span><small>Open lifecycle flowchart</small></button>`).join('')||'<p>No separately indexed document passes through this supporting point.</p>'}</div></section>
      <footer>PRIMARY BASIS · ${citation(profile.source)}</footer>
    </article>`;
    bindBack();
  }
  function renderFlowchart(profile){
    return `<div class="document-flowchart" role="list" aria-label="${esc(profile.title)} lifecycle">${profile.flowchart.map((stage,index)=>`<div class="flow-step ${esc(stage.status)}" role="listitem">
      <div class="flow-node-index">${index+1}</div>
      <div class="flow-node-body"><span>${esc(stage.status==='conflict'?'SOURCE NOTE':stage.status==='conditional'?'CONDITIONAL STAGE':'PROCEDURE STAGE')}</span><h5>${esc(stage.label)}</h5><p>${esc(stage.text)}</p><small>${citation(stage.evidence)}</small></div>
    </div>${index<profile.flowchart.length-1?'<div class="flow-arrow" aria-hidden="true">↓</div>':''}`).join('')}</div>`;
  }
  function renderDocument(id){
    const profile=profiles().find(item=>item.id===id),content=byId('archiveContent');
    if(!profile)throw new Error(`No document profile for ${id}.`);
    const notes=profile.notes.length?`<section class="caution-panel"><h4>Source limitations / conflicts</h4><ul>${profile.notes.map(note=>`<li>${esc(note)}</li>`).join('')}</ul></section>`:'';
    content.innerHTML=`${backButton()}<article class="archive-dossier document-dossier verified-dossier">
      <header><div class="dossier-icon">${iconForDocument(id)}</div><div><span>${procedure.toUpperCase()} · DOCUMENT</span><h3>${esc(profile.title)}</h3><p>${esc(profile.form)}</p></div></header>
      <div class="source-verdict verified">DOCUMENT ROLE AND LIFECYCLE</div>
      <div class="document-importance"><div><span>ORIGIN / WHO PREPARES IT</span><b>${esc(profile.origin)}</b></div><div><span>PROCEDURAL PURPOSE</span><b>${esc(profile.purpose)}</b></div></div>
      <section><h4>Contents and endorsements</h4><div class="verified-fields">${profile.contents.map(item=>`<div class="verified-field"><span>${esc(item.side==='reverse'?'REVERSE':'FORM / RECORD')}</span><b>${esc(item.name)}</b><p>${esc(item.text)}</p><small>${citation(item.evidence)}</small></div>`).join('')}</div></section>
      <section><h4>Lifecycle flowchart</h4>${renderFlowchart(profile)}</section>
      <section class="document-disposal"><h4>Final disposal / retained evidence</h4><p>${esc(profile.disposal)}</p></section>
      ${notes}
      <footer>PRIMARY BASIS<br>${profile.sources.map(source=>citation(source)).join('<br>')}</footer>
    </article>`;
    bindBack();
  }
  function openDetail(id){detail=id;try{render()}catch(error){byId('archiveContent').innerHTML=`${backButton()}<div class="feedback">Archive page could not be rendered: ${esc(error.message)}</div>`;bindBack();console.error(error)}}
  function open(){
    procedure=byId('archiveProcedure').value;detail=null;archiveWasRunning=!!root.DepotEngine?.game?.running;
    if(archiveWasRunning)root.DepotEngine.game.paused=true;
    byId('archiveOverlay').classList.remove('hidden');render();
  }
  function close(){byId('archiveOverlay').classList.add('hidden');if(archiveWasRunning&&root.DepotEngine?.game?.running)root.DepotEngine.game.paused=false}
  function openDocument(id){section='documents';detail=id;render()}
  function initialize(){
    byId('archiveBtn').addEventListener('click',open);byId('hangarArchiveBtn').addEventListener('click',open);byId('archiveClose').addEventListener('click',close);
    byId('archiveOfficesTab').textContent='Sections / Branches';
    byId('archiveDocumentsTab').textContent='Documents';
    byId('archiveOfficesTab').addEventListener('click',()=>{section='offices';detail=null;render()});
    byId('archiveDocumentsTab').addEventListener('click',()=>{section='documents';detail=null;render()});
    byId('archiveProcedure').addEventListener('change',event=>{procedure=event.target.value;detail=null;render()});
    byId('archiveSearch').addEventListener('input',()=>{detail=null;render()});
    byId('archiveContent').addEventListener('click',event=>{
      const officeButton=event.target.closest('[data-office]'),documentButton=event.target.closest('[data-document]'),jumpButton=event.target.closest('[data-jump-document]');
      if(officeButton){openDetail(officeButton.dataset.office);return}
      if(documentButton){openDetail(documentButton.dataset.document);return}
      if(jumpButton){openDocument(jumpButton.dataset.jumpDocument)}
    });
    byId('hangarBtn').addEventListener('click',()=>{byId('archiveOverlay').classList.add('hidden');if(root.DepotEngine?.game?.running)root.DepotEngine.quitGame();else byId('startOverlay').classList.remove('hidden')});
  }
  root.DepotArchive={open,close,render,openDetail,openDocument};
  initialize();
})(globalThis);
