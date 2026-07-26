(function attachDepotArchive(root){
  'use strict';
  const data=root.DepotData,map=root.DepotMap,byId=id=>document.getElementById(id);
  let section='offices',procedure='Issue',detail=null,archiveWasRunning=false;
  const clean=value=>String(value||'').toLowerCase().replace(/[^a-z0-9&]+/g,' ');
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const office=id=>map.building(id,procedure)||data.offices.find(item=>item.id===id);
  const profiles=()=>Object.values(data.documentProfiles).filter(item=>item.procedure===procedure);
  const character=id=>data.characters.find(item=>item.id===id);
  const officeProfiles=id=>profiles().filter(profile=>profile.route.includes(id));
  const aliases={
    DemandingUnit:['demanding unit','originating unit','consignee'],HQ:['hq section'],ISS:['iss','indent sorting'],ULC:['ulc','unit location'],IndentChecking:['indent checking'],
    ICR:['issue control','control registry'],VoucherPrep:['voucher preparation','typist','checker'],SDIC:['sdic','sub depot issue control'],DOC:['doc','dues out control'],
    MLRS:['mlrs','master location'],Selection:['selection','selector'],Packing:['packing','packer'],Traffic:['traffic'],CentralRegistry:['central registry'],
    CAB:['cab','ledger poster','ledger checker','accounts'],SM:['s&m','time check'],RPS:['r&ps','crs','unit pad'],LAO:['lao'],
    Consignor:['consignor'],Provision:['provision'],TrafficReceipts:['traffic receipts'],ReceiptProgress:['receipt progress','receipts progress'],
    ReceiptArea:['receipt area','receipts area'],ReceiptLiaison:['receipt liaison','receipts liaison'],ReceiptControl:['receipt control'],
    FPVRelease:['further part voucher','release cell'],DuesOutSuspense:['dues out suspense'],BulkStore:['bulk','detail store'],
    ReceiptDiscrepancy:['discrepancy clerk','receipt discrepancy','receipts discrepancy'],DAO:['dao']
  };
  function entryMatchesOffice(entry,officeId){
    const text=clean(entry.filledBy),terms=[officeId,...(aliases[officeId]||[]),office(officeId)?.label].map(clean).filter(term=>term.length>2);
    return terms.some(term=>text.includes(term));
  }
  function setTabs(){
    const offices=section==='offices';byId('archiveOfficesTab').classList.toggle('primary',offices);byId('archiveDocumentsTab').classList.toggle('primary',!offices);
    byId('archiveOfficesTab').setAttribute('aria-selected',String(offices));byId('archiveDocumentsTab').setAttribute('aria-selected',String(!offices));
    byId('archiveBreadcrumb').textContent=`Archive / ${offices?'Sections & Branches':'Documents'}${detail?` / ${detail}`:''}`;
  }
  function render(){
    setTabs();const query=clean(byId('archiveSearch').value),content=byId('archiveContent');
    if(detail){section==='offices'?renderOffice(detail):renderDocument(detail);return}
    if(section==='offices'){
      const ids=data.mapOfficeIds[procedure].filter(id=>{const dossier=data.officeIntel[procedure][id],place=office(id);return !query||clean(`${place.label} ${dossier.role} ${dossier.actions.join(' ')}`).includes(query)});
      content.innerHTML=`<div class="archive-grid">${ids.map((id,index)=>{const place=office(id),dossier=data.officeIntel[procedure][id],docs=officeProfiles(id);return `<button class="archive-card" data-office="${id}" onclick="DepotArchive.openDetail('${id}')" type="button"><span class="archive-number">${String(index+1).padStart(2,'0')}</span><i>${place.icon}</i><b>${place.label}</b><small>${dossier.role}</small><em>${docs.length} document lifecycles</em></button>`}).join('')}</div>`;
    }else{
      const items=profiles().filter(profile=>{const item=character(profile.id);return !query||clean(`${profile.title} ${profile.preparedBy} ${profile.copyPurpose} ${profile.frontEntries.map(entry=>entry.entry).join(' ')}`).includes(query)});
      content.innerHTML=`<div class="archive-grid document-grid">${items.map((profile,index)=>{const item=character(profile.id);return `<button class="archive-card document-card" data-document="${profile.id}" onclick="DepotArchive.openDetail('${profile.id}')" type="button"><span class="archive-number">${String(index+1).padStart(2,'0')}</span><i>${item.icon}</i><b>${profile.title}</b><small>Created by: ${profile.preparedBy}</small><em>${profile.route.length} chronological stages</em></button>`}).join('')}</div>`;
    }
  }
  function openDetail(id){
    detail=id;
    try{render()}catch(error){byId('archiveContent').innerHTML=`${backButton()}<div class="feedback">Archive page could not be rendered: ${esc(error.message)}</div>`;bindBack();console.error(error)}
  }
  const backButton=()=>'<button class="btn archive-back" id="archiveBack" type="button">← Back to Archive</button>';
  function bindBack(){byId('archiveBack').addEventListener('click',()=>{detail=null;render()})}
  function renderOffice(id){
    const place=office(id),dossier=data.officeIntel[procedure][id],docs=officeProfiles(id),content=byId('archiveContent');
    const lifecycleRows=[];
    docs.forEach(profile=>profile.route.forEach((routeOffice,index)=>{
      if(routeOffice!==id)return;
      const previous=index?office(profile.route[index-1])?.label:'Origin / creation',next=index<profile.route.length-1?office(profile.route[index+1])?.label:'Final disposal';
      lifecycleRows.push({profile,index,previous,next});
    }));
    lifecycleRows.sort((a,b)=>a.index-b.index||a.profile.title.localeCompare(b.profile.title));
    content.innerHTML=`${backButton()}<article class="archive-dossier">
      <header><div class="dossier-icon">${place.icon}</div><div><span>${procedure.toUpperCase()} SECTION / BRANCH</span><h3>${place.label}</h3><p>${dossier.role}</p></div></header>
      <div class="archive-memory">${dossier.memory}</div>
      <section><h4>Actions in chronological order</h4><ol class="chronology">${dossier.actions.map((action,index)=>`<li><span>${index+1}</span><div><b>Action ${index+1}</b><p>${action}</p></div></li>`).join('')}</ol></section>
      <div class="archive-two">
        <section><h4>When this section is involved</h4><ul>${dossier.situations.map(item=>`<li>${item}</li>`).join('')}</ul></section>
        <section class="caution-panel"><h4>Deviations / safeguards</h4><ul>${dossier.deviations.map(item=>`<li>${item}</li>`).join('')}</ul></section>
      </div>
      <section><h4>Document actions through this office</h4><div class="office-document-flow">${lifecycleRows.map(row=>{
        const matched=[...row.profile.frontEntries,...row.profile.reverseEntries].filter(entry=>entryMatchesOffice(entry,id));
        return `<button type="button" data-jump-document="${row.profile.id}" onclick="DepotArchive.openDocument('${row.profile.id}')"><b>${row.profile.title}</b><span>${row.previous} → <strong>${place.label}</strong> → ${row.next}</span><small>${matched.length?matched.map(entry=>`${entry.entry} (${entry.filledBy})`).join(' · '):`Custody/control action: ${dossier.actions[0]} No additional form entry is asserted here.`}</small></button>`;
      }).join('')||'<p>No independent playable document route is assigned to this office.</p>'}</div></section>
      <footer>PRIMARY BASIS · ${dossier.source}</footer>
    </article>`;
    bindBack();
  }
  function schemaFor(profile){const key=data.formByRole[profile.id];return key?data.formSchemas[key]:null}
  function renderBlank(profile){
    const schema=schemaFor(profile),entries=[...profile.frontEntries,...profile.reverseEntries];
    if(schema)return `<div class="form-preview"><div class="form-title"><b>${schema.title}</b><span>${schema.copy} · ${schema.format}</span></div><div class="blank-grid">${schema.columns.map(column=>`<div><small>COL ${column[0]}</small><b>${column[1]}</b><span class="blank-line"></span></div>`).join('')}</div><p class="facsimile-note">Schematic learning template—not an official printable facsimile.</p></div>`;
    return `<div class="form-preview"><div class="form-title"><b>${profile.title}</b><span>BLANK LEARNING VIEW</span></div><div class="blank-fields">${entries.map((entry,index)=>`<div><small>FIELD / EVIDENCE ${index+1}</small><b>${entry.entry}</b><span class="blank-line"></span><em>To be completed by ${entry.filledBy}</em></div>`).join('')}</div><p class="facsimile-note">Schematic learning template—not an official printable facsimile. Only source-supported fields/evidence are shown.</p></div>`;
  }
  function stageChanges(profile,officeId){
    return [...profile.frontEntries,...profile.reverseEntries].filter(entry=>entryMatchesOffice(entry,officeId));
  }
  function renderFilled(profile){
    return `<div class="filled-document"><div class="completion-banner">ENTIRE LIFECYCLE · RESPONSIBILITY-ATTRIBUTED</div><ol class="document-timeline">${profile.route.map((officeId,index)=>{
      const place=office(officeId),changes=stageChanges(profile,officeId),action=data.officeIntel[procedure]?.[officeId]?.actions?.[0]||data.officeWhy[officeId];
      return `<li><span>${index+1}</span><div><small>${place?.label||officeId}</small><b>${changes.length?'Entry / endorsement made':'Custody or control stage'}</b><p>${changes.length?changes.map(entry=>`${entry.entry} `+`[Filled by: ${entry.filledBy}]`).join(' '):`${action} No new entry is attributed to this office by the current cited profile.`}</p><em>${changes.length?changes.map(entry=>entry.source).join('; '):data.officeIntel[procedure]?.[officeId]?.source||profile.source}</em></div></li>`;
    }).join('')}</ol><section class="complete-ledger"><h4>Completed document: all attributed entries</h4>${[...profile.frontEntries,...profile.reverseEntries].map(entry=>`<div><b>${entry.entry}</b><span>Filled by: ${entry.filledBy}</span><small>${entry.source}</small></div>`).join('')}</section></div>`;
  }
  function renderDocument(id){
    const profile=data.documentProfiles[id],item=character(id),content=byId('archiveContent');
    content.innerHTML=`${backButton()}<article class="archive-dossier document-dossier">
      <header><div class="dossier-icon">${item.icon}</div><div><span>${procedure.toUpperCase()} DOCUMENT</span><h3>${profile.title}</h3><p>${item.category}</p></div></header>
      <div class="document-importance"><div><span>ORIGIN / WHO MAKES IT</span><b>${profile.preparedBy}</b><p>${profile.creationAction}</p></div><div><span>ROLE & IMPORTANCE</span><b>${profile.copyPurpose}</b><p>Closure proof: ${item.closureProof}</p></div></div>
      <section><h4>Chronological route</h4><div class="route archive-route">${profile.route.map((officeId,index)=>`<span class="route-chip done">${index+1}. ${office(officeId)?.label||officeId}</span>`).join('')}</div></section>
      <div class="document-view-tabs"><button class="btn primary" id="blankDocumentTab" type="button">Blank document</button><button class="btn" id="filledDocumentTab" type="button">Entirely filled lifecycle</button></div>
      <div id="documentArchiveView">${renderBlank(profile)}</div>
      <footer>PRIMARY BASIS · ${profile.source}<br>ORIGIN BASIS · ${profile.creatorSource}</footer>
    </article>`;
    bindBack();const view=byId('documentArchiveView'),blank=byId('blankDocumentTab'),filled=byId('filledDocumentTab');
    blank.addEventListener('click',()=>{blank.classList.add('primary');filled.classList.remove('primary');view.innerHTML=renderBlank(profile)});
    filled.addEventListener('click',()=>{filled.classList.add('primary');blank.classList.remove('primary');view.innerHTML=renderFilled(profile)});
  }
  function open(){
    procedure=byId('archiveProcedure').value;detail=null;archiveWasRunning=!!root.DepotEngine?.game?.running;
    if(archiveWasRunning)root.DepotEngine.game.paused=true;
    byId('archiveOverlay').classList.remove('hidden');render();
  }
  function close(){byId('archiveOverlay').classList.add('hidden');if(archiveWasRunning&&root.DepotEngine?.game?.running)root.DepotEngine.game.paused=false}
  function openDocument(id){section='documents';detail=id;render()}
  function initialize(){
    byId('archiveBtn').addEventListener('click',open);byId('hangarArchiveBtn').addEventListener('click',open);byId('archiveClose').addEventListener('click',close);
    byId('archiveOfficesTab').addEventListener('click',()=>{section='offices';detail=null;render()});
    byId('archiveDocumentsTab').addEventListener('click',()=>{section='documents';detail=null;render()});
    byId('archiveProcedure').addEventListener('change',event=>{procedure=event.target.value;detail=null;render()});
    byId('archiveSearch').addEventListener('input',()=>{detail=null;render()});
    byId('archiveContent').addEventListener('click',event=>{
      const officeButton=event.target.closest('[data-office]'),documentButton=event.target.closest('[data-document]'),jumpButton=event.target.closest('[data-jump-document]');
      if(officeButton){openDetail(officeButton.dataset.office);return}
      if(documentButton){openDetail(documentButton.dataset.document);return}
      if(jumpButton){section='documents';detail=jumpButton.dataset.jumpDocument;render()}
    });
    byId('hangarBtn').addEventListener('click',()=>{byId('archiveOverlay').classList.add('hidden');if(root.DepotEngine?.game?.running)root.DepotEngine.quitGame();else byId('startOverlay').classList.remove('hidden')});
  }
  root.DepotArchive={open,close,render,openDetail,openDocument};initialize();
})(globalThis);
