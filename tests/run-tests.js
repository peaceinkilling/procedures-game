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
assert.deepStrictEqual(data.routes.discrepancyReport,['ReceiptArea','ReceiptDiscrepancy','DAO','ReceiptDiscrepancy','DAO','Consignor'],'Receipt discrepancy control must return to the Sub-Depot for clearance before the completed case goes back through DAO.');
assert.ok(data.campaigns.issueNormal.stages.some(stage=>stage.focus==='IV3 + IV4')&&data.campaigns.issueNormal.stages.some(stage=>stage.focus==='Returned IV2')&&data.campaigns.issueNormal.stages.some(stage=>stage.focus==='IV6'),'Full Issue must exercise every principal concurrent copy branch.');
assert.ok(data.campaigns.receiptNormal.stages.some(stage=>stage.focus.includes('Advance RV1'))&&data.campaigns.receiptNormal.stages.some(stage=>stage.focus.includes('DRS1–3'))&&data.campaigns.receiptNormal.stages.some(stage=>stage.focus==='Receipted RV2'),'Full Receipt must distinguish advance, physical/DRS and acknowledgement streams.');
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

const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const engineSource=fs.readFileSync(path.join(__dirname,'..','src','engine.js'),'utf8');
const mainSource=fs.readFileSync(path.join(__dirname,'..','src','main.js'),'utf8');
const mapSource=fs.readFileSync(path.join(__dirname,'..','src','map.js'),'utf8');
const uiSource=fs.readFileSync(path.join(__dirname,'..','src','ui.js'),'utf8');
const missionIndex=html.indexOf('class="mission-strip"');
const layoutIndex=html.indexOf('class="layout"');
const canvasIndex=html.indexOf('class="canvas-wrap"');
assert.ok(missionIndex>-1&&missionIndex<layoutIndex&&layoutIndex<canvasIndex,'Mission strip must be outside and before the playable map layout.');
assert.ok(!/<div class="canvas-wrap">[\s\S]*class="compass"/.test(html),'Compass must not be inside the playable canvas wrapper.');
assert.ok(html.indexOf('id="officeIntelCard"')>canvasIndex,'Office intelligence must remain outside the playable canvas.');
assert.ok(/speed:3[6-9]\d/.test(engineSource),'Base character speed must remain at least 360 map units per second.');
assert.ok(mainSource.includes("map.canvas.addEventListener('pointerup'")&&mainSource.includes('ui.showOfficeIntel'),'Pointer office selection must preserve the structured office dossier.');
assert.ok(mapSource.includes("building(game.route[game.index],game.procedure)")&&uiSource.includes("map.building(game.route[game.index],game.procedure)"),'Receipt guidance arrows and compass must use the active procedure layout.');
assert.ok(mainSource.includes("['1','2','3','4'].includes(event.key)")&&mainSource.includes("event.key==='i'"),'Every graded choice and nearest-office intelligence must be keyboard accessible.');
assert.ok(uiSource.includes('updateRecordConsole')&&html.includes('id="recordConsole"'),'The live progressive document twin must remain outside the map.');
assert.ok(html.includes('id="joystick"')&&mainSource.includes('engine.navigateToOffice(office.id)')&&engineSource.includes('autoNavigation'),'Mobile play must provide continuous joystick movement and tap-to-route.');
assert.ok(uiSource.includes('Contingencies / situations')&&uiSource.includes('Normal route'),'Office entry must separate normal questions from source-backed contingencies.');
assert.ok(html.includes('By <b>Sahil(105)</b>'),'Creator credit must remain visible in the persistent header.');
assert.ok(html.includes('id="documentConstellation"')&&uiSource.includes('updateDocumentConstellation'),'A stage-aware document constellation must remain outside the playable map.');
assert.ok(uiSource.includes('FLOW SNAPSHOT')&&uiSource.includes('What happens next?'),'Every playable question must receive a short procedural-flow narrative.');
assert.strictEqual(Object.keys(data.documentProfiles).length,data.characters.length,'Every playable Issue/Receipt entity needs a document profile.');
for(const campaign of Object.values(data.campaigns))for(const stage of campaign.stages){
  assert.ok(stage.documentIds.length,`${campaign.procedure} stage at ${stage.office} needs at least one active document.`);
  stage.documentIds.forEach(id=>assert.ok(data.documentProfiles[id],`${campaign.procedure} stage ${stage.office} references missing document profile ${id}.`));
}
for(const profile of Object.values(data.documentProfiles)){
  assert.ok(profile.preparedBy&&profile.creationAction&&profile.creatorSource,`${profile.id} must identify who creates/prepares it and cite that origin.`);
  assert.ok(profile.frontEntries.every(entry=>entry.entry&&entry.filledBy&&entry.source),`${profile.id} front entries need content, responsibility and source.`);
  assert.ok(profile.reverseEntries.every(entry=>entry.entry&&entry.filledBy&&entry.source),`${profile.id} reverse entries need content, responsibility and source.`);
}
assert.ok(data.documentProfiles.iv6.reverseEntries.length>=4,'IV6 must teach its cited reverse-side time, DOC, packing and dispatch entries.');
assert.ok(data.documentProfiles.receiptVoucher1.reverseEntries.some(entry=>entry.entry.includes('Receipt Time Check')),'RV1 must teach its reverse-side Receipt Time Check.');
assert.ok(data.documentProfiles.drs3.reverseEntries.some(entry=>entry.entry.includes('Progress chart')),'DRS3 must teach its reverse-side progress chart.');

console.log(`PASS: ${data.characters.length} Issue/Receipt roster entities validated.`);
console.log(`PASS: ${data.transitions.length} declared transitions checked.`);
console.log(`PASS: ${result.warnings.length} unresolved source gaps remain.`);
console.log('PASS: Issue and Receipt office layouts have distinct, in-bounds footprints.');
console.log('PASS: Every mapped office has role, actions, situations, deviations, memory cue and source basis.');
console.log('PASS: Full campaigns distinguish custody hand-offs from concurrent-branch focus switches.');
