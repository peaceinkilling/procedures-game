'use strict';

const EXPECTED_ISSUE_ROSTER_IDS = [
  'demand','irpsOriginal','irpsDuplicate','scheduleOfIndents','issuesControlSheet',
  'iv1','iv2','iv3','iv4','iv5','iv6',
  'packingNoteOriginal','packingNoteDuplicate','packingCompletionOriginal','packingCompletionDuplicate',
  'roadTransit','railTransit','postalTransit','localIssueTransit','railwayReceipt','parcelWayBill','convoyDocument','collectionDocument',
  'trafficRegister','localIssueRegister','postalIssueRegister',
  'stores','eachPackage','packageOneWithIv2','accountCardPosting','binCardSelection','receiptedAcknowledgement','unitPadBundle'
];
const EXPECTED_RECEIPT_ROSTER_IDS = [
  'advanceIssueVoucher','receiptVoucher1','receiptVoucher2','drs1','drs2','drs3','rcrs1','rcrs2','rcrs3','rndorBulk','rndorDuesOut',
  'receiptStoresBulk','receiptStoresDuesOut','binCardReceipt','receiptAccountPosting','discrepancyReport','adjustmentVoucher','receiptedRv2','crvException','ctcException'
];
const EXPECTED_ROSTER_IDS=[...EXPECTED_ISSUE_ROSTER_IDS,...EXPECTED_RECEIPT_ROSTER_IDS];

function duplicates(values){return [...new Set(values.filter((value,index)=>values.indexOf(value)!==index))]}

function validateData(data){
  const errors=[],warnings=[];
  const officeIds=data.offices.map(office=>office.id),characterIds=data.characters.map(character=>character.id),transitionIds=data.transitions.map(transition=>transition.id);
  duplicates(officeIds).forEach(id=>errors.push(`Duplicate office ID: ${id}`));
  duplicates(characterIds).forEach(id=>errors.push(`Duplicate character ID: ${id}`));
  duplicates(transitionIds).forEach(id=>errors.push(`Duplicate transition ID: ${id}`));
  EXPECTED_ROSTER_IDS.filter(id=>!characterIds.includes(id)).forEach(id=>errors.push(`Missing Issue roster entity: ${id}`));
  characterIds.filter(id=>!EXPECTED_ROSTER_IDS.includes(id)).forEach(id=>errors.push(`Unexpected roster entity: ${id}`));
  if(data.receiptImplemented!==true)errors.push('Receipt Procedure should be enabled by the current project scope.');

  const usedOffices=new Set();
  for(const character of data.characters){
    if(!['Issue','Receipt'].includes(character.procedure))errors.push(`${character.id}: invalid or missing procedure.`);
    if(character.playable){
      if(!Array.isArray(character.route)||character.route.length<1)errors.push(`${character.id}: playable character has no route.`);
      if(!character.spawnPoint)errors.push(`${character.id}: missing spawn point.`);
      if(!character.finalDisposition)errors.push(`${character.id}: missing final disposition.`);
      if(!character.closureProof)errors.push(`${character.id}: missing closure proof.`);
      if(character.routeStatus==='approved'&&character.primarySourceRefs.length===0)errors.push(`${character.id}: approved route has no primary citation.`);
      for(const officeId of character.route||[]){usedOffices.add(officeId);if(!officeIds.includes(officeId))errors.push(`${character.id}: route references unknown office ${officeId}.`)}
      for(let index=0;index<(character.route||[]).length-1;index++){
        const from=character.route[index],to=character.route[index+1];
        const transition=data.transitions.find(item=>item.characterId===character.id&&item.from===from&&item.to===to);
        if(!transition)errors.push(`${character.id}: missing transition declaration ${from} -> ${to}.`);
        else if(transition.support!=='primary-supported'&&!transition.domainReview)errors.push(`${transition.id}: unsupported transition is not blocked for domain review.`);
        else if(character.routeStatus==='approved'&&transition.support!=='primary-supported')errors.push(`${transition.id}: unsupported transition leaked into an approved route.`);
      }
    }else{
      if(character.route!==null)errors.push(`${character.id}: locked character must not encode a guessed route.`);
      if(character.finalDisposition!==null)errors.push(`${character.id}: locked character must not invent a disposal.`);
      if(!character.reviewNote)errors.push(`${character.id}: locked character needs a domain-review explanation.`);
    }
    if(character.primarySourceRefs.length===0)warnings.push(`${character.id}: primary paragraph/page required.`);
  }
  for(const office of data.offices){if(!usedOffices.has(office.id)&&!office.domainReviewOnly)errors.push(`Unreachable office: ${office.id}`)}
  for(const [campaignId,campaign] of Object.entries(data.campaigns||{})){
    if(!campaign.primarySourceRefs.length)errors.push(`${campaignId}: campaign has no primary citations.`);
    if(!Array.isArray(campaign.stages)||campaign.stages.length!==campaign.route.length)errors.push(`${campaignId}: campaign stages must align one-to-one with the playable route.`);
    if(!(campaign.stages||[]).some(stage=>stage.handoffToNext==='focus-switch'))errors.push(`${campaignId}: concurrent branches must contain explicit focus switches.`);
    for(let index=0;index<(campaign.stages||[]).length;index++){
      const stage=campaign.stages[index];
      if(stage.office!==campaign.route[index])errors.push(`${campaignId}: stage ${index} office does not match its route position.`);
      for(const field of ['focus','state','action','reason','companion','waiting'])if(!stage[field])errors.push(`${campaignId}: stage ${index} is missing ${field}.`);
      if(!['custody','focus-switch'].includes(stage.handoffToNext))errors.push(`${campaignId}: stage ${index} has invalid handoff type ${stage.handoffToNext}.`);
    }
    for(const officeId of campaign.route){if(!officeIds.includes(officeId))errors.push(`${campaignId}: campaign references unknown office ${officeId}.`)}
    for(let index=0;index<campaign.route.length-1;index++){
      const from=campaign.route[index],to=campaign.route[index+1];
      const transition=data.transitions.find(item=>item.characterId===campaignId&&item.id.startsWith(`${campaignId}:${index}:`));
      if(!transition||transition.from!==from||transition.to!==to||transition.support!=='primary-supported'||!transition.primarySourceRef)errors.push(`${campaignId}: unsupported campaign transition ${from} -> ${to}.`);
      else if(transition.handoffType!==campaign.stages[index].handoffToNext)errors.push(`${campaignId}: transition ${index} does not preserve its custody/focus-switch classification.`);
    }
  }
  for(const transition of data.transitions){
    if(!officeIds.includes(transition.from)||!officeIds.includes(transition.to))errors.push(`${transition.id}: transition references an unknown office.`);
    if(transition.support!=='primary-supported')warnings.push(`${transition.id}: domain review required.`);
  }
  return {errors,warnings};
}

module.exports={EXPECTED_ISSUE_ROSTER_IDS,EXPECTED_RECEIPT_ROSTER_IDS,EXPECTED_ROSTER_IDS,validateData};
