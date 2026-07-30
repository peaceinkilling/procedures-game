'use strict';

const fs=require('fs');
const path=require('path');
const assert=require('assert');
const data=require('../src/procedure-data.js');
const {EXPECTED_ROSTER_IDS,validateData}=require('./route-validator.js');

const result=validateData(data);
assert.deepStrictEqual(result.errors,[],`Route validation errors:\n${result.errors.join('\n')}`);
assert.strictEqual(data.characters.length,EXPECTED_ROSTER_IDS.length,'Every Issue roster entity must appear exactly once.');
assert.deepStrictEqual(result.warnings,[],'All roster entities should now have source-reviewed routes and cited transitions.');
assert.ok(data.characters.every(item=>item.routeStatus==='approved'),'Every roster entity must be source-reviewed and approved for play.');
assert.ok(data.characters.filter(item=>item.routeStatus==='approved').every(item=>item.primarySourceRefs.length>0),'Every approved route needs a primary paragraph/page citation.');
assert.ok(data.characters.every(item=>item.playable),'Every roster entity must be playable.');
assert.ok(['iv2','iv5','receiptedAcknowledgement'].every(id=>data.characters.find(item=>item.id===id).reviewNote.includes('213(n)')),'The isolated DGOSTI-002 para 213(n) anomaly must remain disclosed on every affected route.');
assert.deepStrictEqual(data.routes.receiptVoucher1.slice(0,4),['Consignor','CentralRegistry','Provision','ReceiptProgress'],'RV1 must include its advance-copy route before stores-document marriage.');
assert.ok(!data.receiptRouteVariants.receiptVoucher1NoDuesOut.includes('FPVRelease'),'RV1 without dues-out must bypass Further Part Voucher Release.');
assert.ok(data.receiptRouteVariants.receiptVoucher1DuesOut.includes('FPVRelease'),'RV1 with dues-out must preserve Further Part Voucher Release.');
assert.deepStrictEqual(data.routes.receiptVoucher2.slice(0,6),['ReceiptArea','ReceiptLiaison','ReceiptProgress','ReceiptLiaison','ReceiptControl','ReceiptArea'],'RV2 must return through Liaison between marriage and control.');
assert.deepStrictEqual(data.routes.rndorDuesOut,['ReceiptLiaison','FPVRelease','ReceiptArea','DuesOutSuspense','ReceiptLiaison'],'Dues-out RN&DOR must expose both parallel destinations and return to Liaison.');
const rndorFocusTransition=data.transitions.find(item=>item.characterId==='rndorDuesOut'&&item.from==='FPVRelease'&&item.to==='ReceiptArea');
assert.strictEqual(rndorFocusTransition?.handoffType,'focus-switch','FPV Release to Receipt Area must be labelled as a parallel-copy focus switch, not a custody transfer.');
assert.deepStrictEqual(data.routes.discrepancyReport,['ReceiptArea','ReceiptDiscrepancy','DAO','ReceiptDiscrepancy','DAO','Consignor'],'Receipt discrepancy control must return to the Sub-Depot for clearance before the completed case goes back through DAO.');
assert.ok(data.campaigns.issueNormal.stages.some(stage=>stage.focus==='IV3 + IV4')&&data.campaigns.issueNormal.stages.some(stage=>stage.focus==='Returned IV2')&&data.campaigns.issueNormal.stages.some(stage=>stage.focus==='IV6'),'Full Issue must exercise every principal concurrent copy branch.');
assert.ok(data.campaigns.receiptNormal.stages.some(stage=>stage.focus.includes('Advance RV1'))&&data.campaigns.receiptNormal.stages.some(stage=>stage.focus.includes('DRS1–3'))&&data.campaigns.receiptNormal.stages.some(stage=>stage.focus==='Receipted RV2'),'Full Receipt must distinguish advance, physical/DRS and acknowledgement streams.');
const receiptStages=data.campaigns.receiptNormal.stages;
const firstReceiptArea=receiptStages.find(stage=>stage.office==='ReceiptArea');
assert.ok(firstReceiptArea.documentIds.includes('receiptVoucher2')&&firstReceiptArea.documentIds.includes('drs2'),'Initial Receipt Area must expose RV2 and DRS2.');
assert.ok(!firstReceiptArea.documentIds.includes('receiptVoucher1')&&!firstReceiptArea.documentIds.includes('rndorBulk')&&!firstReceiptArea.documentIds.includes('rndorDuesOut'),'Initial Receipt Area must not show RV1 or an RN&DOR that does not yet exist.');
const controlledReceiptArea=receiptStages.find((stage,index)=>stage.office==='ReceiptArea'&&index>receiptStages.indexOf(firstReceiptArea));
assert.ok(!controlledReceiptArea.documentIds.includes('rndorBulk')&&!controlledReceiptArea.documentIds.includes('rndorDuesOut'),'Controlled checking must occur before RN&DOR preparation.');
const rndorCreationStage=receiptStages.find(stage=>stage.office==='ReceiptLiaison'&&/prepare(?:\/check)? the required RN&DOR/i.test(stage.action));
assert.ok(rndorCreationStage&&rndorCreationStage.documentIds.includes('rndorBulk')&&rndorCreationStage.documentIds.includes('rndorDuesOut'),'RN&DOR must first appear when Liaison prepares it after RV1 returns.');
assert.strictEqual(data.characterStageEvents.receiptVoucher1.length,data.routes.receiptVoucher1.length,'RV1 needs one exact state per route position.');
assert.strictEqual(data.characterStageEvents.receiptVoucher2.length,data.routes.receiptVoucher2.length,'RV2 needs one exact state per route position.');
assert.strictEqual(data.characterStageEvents.drs2.length,data.routes.drs2.length,'DRS2 needs one exact state per route position.');
assert.match(data.characterStageEvents.drs2[1].waiting,/RN&DOR does not exist/i,'DRS2 initial Receipt Area state must explicitly teach that RN&DOR is not yet present.');
for(const character of data.characters.filter(item=>item.playable)){
  const stages=data.characterStageEvents[character.id];
  assert.ok(stages,`${character.id} needs explicit copy-specific stage data.`);
  assert.strictEqual(stages.length,character.route.length,`${character.id} needs one explicit stage record per route position.`);
  stages.forEach((stage,index)=>{
    for(const field of ['action','reason','companion','waiting'])assert.ok(stage[field]?.trim(),`${character.id} stage ${index+1} needs ${field}.`);
    assert.ok(stage.documentIds?.includes(character.id),`${character.id} stage ${index+1} must identify the active entity in its exact bundle.`);
    assert.doesNotMatch([stage.action,stage.companion,stage.waiting].join(' '),/as specified (?:by DGOSTI|at each cited transition)|process .*pass it onward|complete (?:its|the) cited/i,`${character.id} stage ${index+1} must not use a procedural placeholder.`);
  });
}
assert.deepStrictEqual(data.formSchemas.rcrs.columns.map(column=>column[0]),['1','2','3','4','5','6','7','8','9'],'RCRS must reproduce all nine printed columns.');
assert.ok(data.formSchemas.rcrs.events.ReceiptControl.fields.every(field=>Number(field)<=6||field==='9'),'Receipt Control must not invent completion of RCRS posting columns.');
assert.deepStrictEqual(data.formSchemas.rcrs.events.CAB.fields,['7','8'],'CAB must show RCRS columns 7 then 8.');
assert.deepStrictEqual(data.formSchemas.irps.columns.map(column=>column[0]),['1','2','3','4','5','6','7','8','9','10','11'],'IRPS must reproduce all eleven printed columns.');
assert.ok(data.formSchemas.trafficDrs&&data.formSchemas.subDepotDrs&&data.formSchemas.trafficIssue,'All DGOSTI register twins must be present.');
for(const [procedure,offices] of Object.entries(data.officeSituations)){
  for(const [officeId,situations] of Object.entries(offices)){
    assert.ok(data.mapOfficeIds[procedure].includes(officeId),`${procedure} situation gate references unknown office ${officeId}.`);
    assert.ok(situations.normal?.title&&situations.normal?.description,`${officeId} needs a clearly labelled normal route.`);
    assert.ok(situations.contingencies.length,`${officeId} situation gate needs at least one contingency.`);
    for(const contingency of situations.contingencies){
      const character=data.characters.find(item=>item.id===contingency.role);
      assert.ok(character?.playable&&character.procedure===procedure,`${officeId} contingency ${contingency.role} must reference a playable character.`);
      assert.strictEqual(character.route[0],officeId,`${contingency.role} must begin at the office where it is offered.`);
      assert.ok(contingency.source&&contingency.description,`${contingency.role} needs a source and procedural trigger.`);
    }
  }
}

for(const procedure of ['Issue','Receipt']){
  const offices=data.mapOfficeIds[procedure].map(id=>Object.assign({},data.offices.find(item=>item.id===id),data.mapLayouts[procedure]?.[id]||{}));
  for(const office of offices){
    assert.ok(office.x>=0&&office.y>=0&&office.x+office.w<=1200&&office.y+office.h<=675,`${procedure} office ${office.id} must remain inside the playable map.`);
    const dossier=data.officeIntel?.[procedure]?.[office.id];
    assert.ok(dossier,`${procedure} office ${office.id} needs a structured intelligence dossier.`);
    assert.ok(dossier.role&&dossier.memory&&dossier.source,`${procedure} office ${office.id} dossier needs role, memory cue and source basis.`);
    for(const field of ['actions','situations','deviations'])assert.ok(Array.isArray(dossier[field])&&dossier[field].length,`${procedure} office ${office.id} dossier needs ${field}.`);
  }
  for(let left=0;left<offices.length;left++)for(let right=left+1;right<offices.length;right++){
    const a=offices[left],b=offices[right],clearance=8;
    const overlaps=a.x<b.x+b.w+clearance&&a.x+a.w+clearance>b.x&&a.y<b.y+b.h+clearance&&a.y+a.h+clearance>b.y;
    assert.ok(!overlaps,`${procedure} offices ${a.id} and ${b.id} overlap or lack visual clearance.`);
  }
}
const issueGrid=Object.values(data.mapLayouts.Issue);
assert.deepStrictEqual([...new Set(issueGrid.map(office=>office.w))],[165],'Every Issue office card must use the same width.');
assert.deepStrictEqual([...new Set(issueGrid.map(office=>office.x))],[20,215,410,605,800,995],'Issue offices must align to the same six columns.');
assert.deepStrictEqual([...new Set(issueGrid.map(office=>office.y))],[35,205,525],'Issue offices must align to three orderly rows.');
const rowOrder=(procedure,y)=>Object.entries(data.mapLayouts[procedure]).filter(([,office])=>office.y===y).sort((a,b)=>a[1].x-b[1].x).map(([id])=>id);
assert.deepStrictEqual(rowOrder('Issue',35),['HQ','SDIC','CAB','ULC','Traffic','VoucherPrep'],'The orderly Issue grid must not reveal the office route as a linear sequence.');
assert.deepStrictEqual(rowOrder('Receipt',35),['ReceiptArea','Provision','RPS','TrafficReceipts','DuesOutSuspense','ReceiptControl'],'The orderly Receipt grid must not reveal the office route as a linear sequence.');
assert.strictEqual(data.officeNames.Issue.ISS,'Indent Sorting Section','ISS must expand to the DGOSTI-002 office heading.');
assert.match(data.characters.find(item=>item.id==='crvException').name,/^Certificate Receipt Voucher \(CRV\)/,'CRV must use the RAOS Part II expansion Certificate Receipt Voucher.');
assert.ok(!/Credit Receipt Voucher|Certified Issue Voucher/.test(JSON.stringify(data)),'Unsupported CRV expansions must not return to procedure data.');

const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const engineSource=fs.readFileSync(path.join(__dirname,'..','src','engine.js'),'utf8');
const mainSource=fs.readFileSync(path.join(__dirname,'..','src','main.js'),'utf8');
const mapSource=fs.readFileSync(path.join(__dirname,'..','src','map.js'),'utf8');
const uiSource=fs.readFileSync(path.join(__dirname,'..','src','ui.js'),'utf8');
const archiveSource=fs.readFileSync(path.join(__dirname,'..','src','archive.js'),'utf8');
require('../src/archive-data.js');
const archiveData=global.DepotArchiveData;
const sessionSource=fs.readFileSync(path.join(__dirname,'..','src','session.js'),'utf8');
const missionIndex=html.indexOf('class="mission-strip"');
const layoutIndex=html.indexOf('class="layout"');
const canvasIndex=html.indexOf('class="canvas-wrap"');
assert.ok(missionIndex>-1&&missionIndex<layoutIndex&&layoutIndex<canvasIndex,'Mission strip must be outside and before the playable map layout.');
assert.ok(!/<div class="canvas-wrap">[\s\S]*class="compass"/.test(html),'Compass must not be inside the playable canvas wrapper.');
assert.ok(html.indexOf('id="officeIntelCard"')>canvasIndex,'Office intelligence must remain outside the playable canvas.');
assert.ok(/speed:3[6-9]\d/.test(engineSource),'Base character speed must remain at least 360 map units per second.');
assert.ok(mainSource.includes("map.canvas.addEventListener('pointerup'")&&mainSource.includes('ui.showOfficeIntel'),'Pointer office selection must preserve the structured office dossier.');
assert.ok(mainSource.includes("office.id===engine.game.route[engine.game.index]")&&mainSource.includes('engine.navigateToOffice(office.id)'),'Clicking the current objective office must auto-route and open it on desktop and touch devices.');
assert.ok(engineSource.includes("lives:game.mode==='learn'?null:3")&&engineSource.includes("if(game.mode!=='learn')game.lives--"),'Learn mode must use unlimited attempts and never decrement lives.');
assert.ok(uiSource.includes("game.mode==='learn'?'∞'"),'Learn mode must display unlimited practice instead of a life counter.');
assert.ok(html.includes('Unlimited practice: mistakes explain the correct logic but never end the mission.'),'The Learn-mode card must explain unlimited attempts.');
assert.ok(mapSource.includes("building(game.route[game.index],game.procedure)")&&uiSource.includes("map.building(game.route[game.index],game.procedure)"),'Receipt guidance arrows and compass must use the active procedure layout.');
assert.ok(mainSource.includes("['1','2','3','4'].includes(event.key)")&&mainSource.includes("event.key==='i'"),'Every graded choice and nearest-office intelligence must be keyboard accessible.');
assert.ok(uiSource.includes('updateRecordConsole')&&html.includes('id="recordConsole"'),'The live progressive document twin must remain outside the map.');
assert.ok(html.includes('id="joystick"')&&mainSource.includes('engine.navigateToOffice(office.id)')&&engineSource.includes('autoNavigation'),'Mobile play must provide continuous joystick movement and tap-to-route.');
assert.ok(uiSource.includes('Contingencies / situations')&&uiSource.includes('Normal route'),'Office entry must separate normal questions from source-backed contingencies.');
assert.ok(html.includes('By <b>Sahil(105)</b>'),'Creator credit must remain visible in the persistent header.');
assert.ok(/<h1>Procedures[\s\S]*brand-punct[\s\S]*brand-go[\s\S]*<\/h1>\s*<div class="creator-mark"/.test(html),'Creator credit must sit beneath the Procedures:GO heading, not consume a separate HUD column.');
assert.ok(!html.includes('TACTICAL PROCEDURE SIMULATOR'),'The redundant line below the creator credit must remain removed.');
assert.ok(html.includes('src/instrument-theme.css'),'The maintainable Procedures:GO instrument theme must load after the structural stylesheet.');
assert.ok(mapSource.includes('officeLabelFont')&&mapSource.includes("ctx.font='38px Segoe UI Emoji'"),'Office names and icons on the playable map must remain enlarged and fitted for mobile recognition.');
assert.ok(mapSource.includes('expandOfficeCard')&&mapSource.includes('focusOffice')&&uiSource.includes('map.focusOffice?.(target,game.procedure)'),'Office cards must use the available grid space and the mobile camera must center its zoom on the current objective.');
assert.ok(uiSource.includes('office.fullName')&&mapSource.includes('data.officeNames?.[procedure]?.[id]'),'Office entry and dossier views must expand map acronyms to their audited official names.');
assert.ok(uiSource.includes("start.textContent=\"Let's play\""),'Every playable mission launcher must use the simple “Let’s play” label.');
assert.ok(!uiSource.includes('<b>Status:</b>')&&!uiSource.includes('<b>Closure proof:</b>')&&!uiSource.includes('<b>Review note:</b>'),'Character selection must not show the removed technical status, closure-proof or review-note footer.');
assert.ok(!/All 53 Issue and Receipt|Source-reviewed and playable|Qualified ruling|Verified Sections|Verified Documents|verified\/qualified stages|SOURCE-VERIFIED OFFICE PROFILE|ONLY SOURCE-SUPPORTED CONTENT IS SHOWN|Evidence Review Lab/i.test(`${html}\n${uiSource}\n${archiveSource}`),'Player-facing screens must not expose rollout and development-status commentary.');
assert.ok(html.includes('id="documentConstellation"')&&uiSource.includes('updateDocumentConstellation'),'A stage-aware document constellation must remain outside the playable map.');
assert.ok(uiSource.includes('FLOW SNAPSHOT')&&uiSource.includes('What happens next?'),'Every playable question must receive a short procedural-flow narrative.');
assert.ok(uiSource.includes('Exact bundle now')&&uiSource.includes('Action and evidence')&&uiSource.includes('After this desk'),'Copy-specific stage questions must expose the exact bundle, action and next custody picture.');
assert.ok(!/Process \$\{game\.cargo\.name\} and pass it onward|Complete the cited final record action/.test(uiSource),'The UI must not restore generic process/pass-forward answers.');
assert.ok(html.includes('id="challengeLevel"')&&html.includes('data-difficulty="easy"')&&html.includes('data-difficulty="difficult"'),'Arcade and Exam must expose three selectable challenge levels.');
assert.ok(html.includes('id="characterChooser"')&&uiSource.includes("showCharacters=mission==='role'"),'The character roster must appear only for Character Campaign.');
assert.ok(html.includes('data-roster-view="main"')&&html.includes('data-roster-view="all"')&&uiSource.includes('mainCharacterIds'),'The Hangar must separate principal characters from the complete source-reviewed roster.');
assert.ok(!/activeDocumentIds[\s\S]{0,500}officeDocumentSets/.test(uiSource),'Stage documents must come from exact lifecycle states, not office-wide document lists.');
assert.ok(uiSource.includes("difficulty==='difficult'")&&uiSource.includes("difficulty==='easy'"),'Question generation must vary by selected challenge level.');
assert.strictEqual(Object.keys(data.documentProfiles).length,data.characters.length,'Every playable Issue/Receipt entity needs a document profile.');
for(const campaign of Object.values(data.campaigns))for(const stage of campaign.stages){
  assert.ok(stage.documentIds.length,`${campaign.procedure} stage at ${stage.office} needs at least one active document.`);
  stage.documentIds.forEach(id=>assert.ok(data.documentProfiles[id],`${campaign.procedure} stage ${stage.office} references missing document profile ${id}.`));
}
for(const profile of Object.values(data.documentProfiles)){
  assert.ok(profile.preparedBy&&profile.creationAction&&profile.creatorSource,`${profile.id} must identify who creates/prepares it and cite that origin.`);
  assert.ok(profile.frontEntries.length,`${profile.id} needs source-backed main-record or physical-custody detail.`);
  assert.ok(profile.frontEntries.every(entry=>entry.entry&&entry.filledBy&&entry.source),`${profile.id} front entries need content, responsibility and source.`);
  assert.ok(profile.frontEntries.every(entry=>!entry.entry.includes('Lifecycle authority and copy-specific action')),`${profile.id} must not use generic placeholder entry text.`);
  assert.ok(profile.reverseEntries.every(entry=>entry.entry&&entry.filledBy&&entry.source),`${profile.id} reverse entries need content, responsibility and source.`);
}
assert.match(data.documentProfiles.scheduleOfIndents.preparedBy,/Origin not stated/,'Schedule of Indents creator must not be invented when DGOSTI-002 only says it accompanies the demand.');
assert.match(data.documentProfiles.irpsDuplicate.frontEntries.map(item=>item.entry).join(' '),/column 8.*column 9/i,'IRPS Duplicate must teach SDIC selection and packing progress columns.');
assert.match(data.documentProfiles.drs1.frontEntries.map(item=>item.entry).join(' '),/RR\/PWB\/IB\/post receipt/i,'DRS must expose its source-defined transit-document entries.');
assert.match(data.documentProfiles.rndorBulk.frontEntries.map(item=>item.entry).join(' '),/item-position suffix/i,'RN&DOR must expose its source-defined serial construction.');
assert.ok(data.documentProfiles.iv6.reverseEntries.length>=4,'IV6 must teach its cited reverse-side time, DOC, packing and dispatch entries.');
assert.ok(data.documentProfiles.receiptVoucher1.reverseEntries.some(entry=>entry.entry.includes('Receipt Time Check')),'RV1 must teach its reverse-side Receipt Time Check.');
assert.ok(data.documentProfiles.drs3.reverseEntries.some(entry=>entry.entry.includes('Progress chart')),'DRS3 must teach its reverse-side progress chart.');
assert.ok(html.includes('id="archiveBtn"')&&html.includes('id="archiveOfficesTab"')&&html.includes('id="archiveDocumentsTab"'),'Archive must expose Sections/Branches and Documents as separate selectable indexes.');
assert.ok(html.includes('src/archive-data.js'),'Verified Archive data must load separately from gameplay procedure data.');
assert.ok(archiveSource.includes('renderOffice')&&archiveSource.includes('renderDocument')&&archiveSource.includes('Lifecycle flowchart'),'Archive must provide individual cited office dossiers and document flowcharts.');
assert.ok(!archiveSource.includes('Blank document')&&!archiveSource.includes('blank-line'),'Archive must not generate speculative blank-document facsimiles.');
assert.deepStrictEqual(Object.keys(archiveData.offices.Issue).sort(),data.mapOfficeIds.Issue.slice().sort(),'Every Issue map office needs a verified Archive classification.');
assert.deepStrictEqual(Object.keys(archiveData.offices.Receipt).sort(),data.mapOfficeIds.Receipt.slice().sort(),'Every Receipt map office needs a verified Archive classification.');
assert.strictEqual(archiveData.documents.Issue.length,21,'Issue Archive must expose only the 21 independently verified documents/records.');
assert.strictEqual(archiveData.documents.Receipt.length,17,'Receipt Archive must expose only the 17 independently verified documents/records.');
assert.strictEqual(new Set([...archiveData.documents.Issue,...archiveData.documents.Receipt].map(item=>item.id)).size,38,'Verified Archive document IDs must be unique.');
for(const procedure of ['Issue','Receipt']){
  for(const profile of Object.values(archiveData.offices[procedure])){
    assert.ok(profile.officialName&&profile.classification&&profile.sequence&&profile.role&&profile.boundary,`${procedure} Archive office needs official identity and procedural boundary.`);
    assert.ok(profile.actions.length&&profile.actions.every(item=>item.text&&item.evidence?.source&&item.evidence?.reference&&item.evidence?.pages),`${profile.officialName} actions must have paragraph/page citations.`);
  }
  for(const [id,profile] of Object.entries(archiveData.offices[procedure]))assert.strictEqual(data.officeNames[procedure][id],profile.officialName,`${procedure} office ${id} must show its exact Archive/DGOSTI name when entered.`);
  for(const profile of archiveData.documents[procedure]){
    assert.ok(profile.origin&&profile.purpose&&profile.disposal,`${profile.id} needs verified origin, purpose and disposal.`);
    assert.ok(profile.contents.length&&profile.contents.every(item=>item.name&&item.text&&item.evidence?.reference),`${profile.id} contents must be cited.`);
    assert.ok(profile.flowchart.length&&profile.flowchart.every(stage=>stage.label&&stage.text&&stage.evidence?.reference),`${profile.id} flowchart stages must be cited.`);
  }
}
assert.strictEqual(archiveData.offices.Issue.ICR.officialName,'Control Registry','Issue Archive must use the exact DGOSTI Section VII name.');
assert.strictEqual(archiveData.offices.Receipt.ReceiptControl.officialName,'Receipts Control Registry','Receipt Archive must use the exact DGOSTI Appendix G name.');
assert.ok(archiveData.documents.Issue.find(item=>item.id==='iv2').flowchart.some(stage=>stage.status==='conflict'),'IV2 Archive flow must disclose, not conceal, the returned-copy source conflict.');
assert.ok(archiveData.excluded.Issue.some(item=>item.includes('No separate “Issues Control Sheet equivalent”')),'Archive must explicitly reject the invented separate Issues Control Sheet.');
for(const procedure of ['Issue','Receipt'])for(const officeId of data.mapOfficeIds[procedure]){
  assert.ok(data.officeIntel[procedure][officeId].actions.length,`${procedure} Archive office ${officeId} needs chronological actions.`);
}
assert.ok(html.includes('id="loginOverlay"')&&html.includes('id="playerName"')&&html.includes('id="playerCourse"')&&html.includes('id="coursePassword"'),'Course access gate must collect name, course and password.');
assert.ok(!sessionSource.includes('bom#105')&&!sessionSource.includes('bom#106'),'Course passwords must not be stored as plaintext in the shipped session module.');
assert.ok(sessionSource.includes("'105':'a3778a955e2ecc")&&sessionSource.includes("'106':'317ed5868abccec"),'BOM 105 and BOM 106 password digests must remain distinct.');
assert.ok(sessionSource.includes("name.toUpperCase()==='FOLS'")&&!sessionSource.includes("name.toLowerCase()==='admin'"),'FOLS must be the only name-based bypass; the common admin bypass must be removed.');
assert.ok(!sessionSource.includes('localStorage')&&!engineSource.includes('recordMissionStart')&&!html.includes('analyticsOverlay'),'Static analytics and browser-local persistence must be removed entirely.');
assert.ok(!sessionSource.includes('peaceinkilling')&&!sessionSource.includes('Security@123'),'Administrator credentials must never be shipped in public client code.');
assert.ok(!html.includes('authorised no-password bypass')&&!html.includes('Privacy: this static edition'),'The access screen must read like a normal login without implementation or privacy notices.');
assert.ok(mainSource.includes("['INPUT','SELECT','TEXTAREA'].includes(event.target.tagName)"),'Gameplay keyboard shortcuts must not intercept typing or selecting in form controls.');

console.log(`PASS: ${data.characters.length} Issue/Receipt roster entities validated.`);
console.log(`PASS: ${data.transitions.length} declared transitions checked.`);
console.log(`PASS: ${result.warnings.length} unresolved source gaps remain.`);
console.log('PASS: Issue and Receipt office layouts have distinct, in-bounds footprints.');
console.log('PASS: Every mapped office has role, actions, situations, deviations, memory cue and source basis.');
console.log('PASS: Full campaigns distinguish custody hand-offs from concurrent-branch focus switches.');
console.log('PASS: Archive chronology and course-access boundary validated.');
