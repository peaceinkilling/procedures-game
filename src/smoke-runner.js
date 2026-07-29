(function attachSmokeRunner(root){
  'use strict';
  if(!new URLSearchParams(location.search).has('smoke'))return;

  const realSetTimeout=root.setTimeout.bind(root),wait=(ms=4)=>new Promise(resolve=>realSetTimeout(resolve,ms));
  const correctChoicePositions=[];
  const panel=document.createElement('section');
  panel.id='smokePanel';panel.className='smoke-panel';panel.dataset.status='ready';
  panel.innerHTML='<b>Automated procedure smoke matrix</b><button class="btn primary" id="runSmokeMatrix" type="button">Run all flows</button><pre id="smokeReport" aria-live="polite">Ready.</pre>';
  document.body.appendChild(panel);

  function selectCard(group,attribute,value){
    document.querySelectorAll(`#${group} [data-${attribute}]`).forEach(card=>card.classList.toggle('selected',card.dataset[attribute]===value));
  }
  function setScenario(role,mode,mission,difficulty='medium'){
    const character=root.DepotData.characters.find(item=>item.id===role);
    document.getElementById('procedureSelect').value=character.procedure;
    document.getElementById('procedureSelect').dispatchEvent(new Event('change',{bubbles:true}));
    root.DepotUI.selectCharacter(role);selectCard('modeGrid','mode',mode);selectCard('missionGrid','mission',mission);selectCard('difficultyGrid','difficulty',difficulty);
    root.DepotEngine.startGame();root.DepotEngine.game.sound=false;
  }
  function clickCorrect(game){
    const bySelector=selector=>document.querySelector(selector);
    const normalSituation=bySelector('#normalSituation');if(normalSituation){normalSituation.click();return 'gate'}
    const ordered=[...document.querySelectorAll('#miniModal .copy-card')];
    if(ordered.length){ordered.sort((a,b)=>Number(a.dataset.n)-Number(b.dataset.n)).forEach(button=>button.click());return true}
    const item=[...document.querySelectorAll('#miniModal .item-choice')].find(button=>button.dataset.item===game.selectedItem);
    if(item){item.click();bySelector('#splitCorrect').click();return true}
    const rack=[...document.querySelectorAll('#miniModal .rack')].find(button=>button.dataset.r===game.selectionLocation);
    if(rack){rack.click();return true}
    const sort=bySelector(`#miniModal [data-sort="${game.staticUnit?'static':'nonstatic'}"]`);if(sort){sort.click();return true}
    const pack=bySelector('#miniModal [data-p="1"]');if(pack){pack.click();return true}
    const transport=bySelector(`#miniModal [data-mode="${game.transport}"]`);if(transport){transport.click();return true}
    const filing={iv2:'control',receiptedAcknowledgement:'control',iv5:'lao',iv6:'unit',demand:'unit',unitPadBundle:'unit'}[game.role]||'progress';
    const tray=bySelector(`#miniModal [data-f="${filing}"]`);if(tray){tray.click();return true}
    const correct=bySelector('#miniModal [data-ok="1"]');if(correct){const siblings=[...correct.parentElement.children];correctChoicePositions.push(siblings.indexOf(correct));correct.click();return true}
    return false;
  }
  async function completeCurrentScenario(label,exerciseRecall=false){
    const game=root.DepotEngine.game,expected=[...game.route];let guard=0;
    if(!expected.length)throw new Error(`${label}: generated an empty route`);
    while(game.running&&guard++<200){
      const target=game.route[game.index],office=root.DepotMap.building(target,game.procedure);
      if(!office)throw new Error(`${label}: missing office ${target}`);
      const center=root.DepotMap.center(office);game.player.x=center.x;game.player.y=center.y;
      const before=game.index;root.DepotEngine.interact();
      if(document.getElementById('miniOverlay').classList.contains('hidden'))throw new Error(`${label}: ${target} did not open an office challenge`);
      const modalText=document.getElementById('miniModal').innerText;
      if(/process .*pass it onward|complete (?:its|the) cited .*action|as specified (?:by DGOSTI|at each cited transition)/i.test(modalText))throw new Error(`${label}: ${target} exposed a generic procedural placeholder`);
      const clicked=clickCorrect(game);if(!clicked)throw new Error(`${label}: no supported correct control at ${target}: ${document.getElementById('miniModal').innerText.slice(0,160)}`);
      if(clicked==='gate'){await wait();if(!clickCorrect(game))throw new Error(`${label}: normal-route office question did not open after situation selection at ${target}`)}
      for(let tries=0;tries<80&&game.running&&game.index===before;tries++)await wait();
      if(game.running&&game.index===before)throw new Error(`${label}: ${target} did not advance`);
      if(game.index>=game.route.length){for(let tries=0;tries<80&&game.running;tries++)await wait();break}
    }
    for(let tries=0;tries<80&&game.running;tries++)await wait();
    if(game.running)throw new Error(`${label}: route guard exceeded`);
    if(game.completed.length!==expected.length)throw new Error(`${label}: completed ${game.completed.length}/${expected.length}`);
    if(document.getElementById('endOverlay').classList.contains('hidden'))throw new Error(`${label}: completion overlay missing`);
    if(game.mistakes!==0)throw new Error(`${label}: correct-path automation recorded ${game.mistakes} mistakes`);
    const actual=game.completed.join('>');if(actual!==expected.join('>'))throw new Error(`${label}: route deviated from generated path`);
    if(exerciseRecall){
      document.getElementById('recallBtn').click();
      for(const id of expected){
        const labelText=root.DepotMap.building(id).label,choice=[...document.querySelectorAll('#recallChoices .choice')].find(button=>button.textContent===labelText);
        if(!choice)throw new Error(`${label}: recall did not offer correct next office ${labelText}`);
        choice.click();await wait();
      }
      if(!document.getElementById('recallStatus').textContent.includes('Route Mastery earned'))throw new Error(`${label}: recall did not award mastery`);
    }
    return{label,procedure:game.procedure,mode:game.mode,difficulty:game.mode==='learn'?'guided':game.difficulty,mission:game.mission,role:game.role,steps:expected.length,score:game.score,recall:exerciseRecall,route:expected};
  }
  async function runScenario(spec){
    setScenario(spec.role,spec.mode,spec.mission,spec.difficulty);
    const result=await completeCurrentScenario(spec.label,!!spec.recall);
    root.DepotEngine.quitGame();return result;
  }
  async function wrongOfficeProbe(){
    setScenario('iv1','learn','role');const game=root.DepotEngine.game,wrong=root.DepotMap.building('Traffic'),center=root.DepotMap.center(wrong);game.player.x=center.x;game.player.y=center.y;root.DepotEngine.interact();
    const message=document.getElementById('miniModal').innerText;if(!message.includes('correct destination is VOUCHER PREP')||!message.includes(root.DepotData.officeWhy.VoucherPrep))throw new Error('Wrong-office feedback did not identify and explain the correct destination');
    root.DepotUI.closeMini();root.DepotEngine.quitGame();return true;
  }
  async function officeIntelClickProbe(){
    setScenario('iv1','learn','role');const office=root.DepotMap.building('Packing','Issue'),canvas=root.DepotMap.canvas,bounds=canvas.getBoundingClientRect();
    canvas.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerType:'mouse',clientX:bounds.left+(office.x+office.w/2)*bounds.width/root.DepotMap.width,clientY:bounds.top+(office.y+office.h/2)*bounds.height/root.DepotMap.height}));
    if(document.getElementById('intelName').textContent!=='PACKING')throw new Error('Clicking Packing did not load its office dossier');
    for(const id of ['intelActions','intelSituations','intelDeviations'])if(!document.getElementById(id).querySelectorAll('li').length)throw new Error(`Office dossier ${id} is empty`);
    root.DepotEngine.quitGame();return true;
  }
  async function contingencyGateProbe(){
    setScenario('receiptVoucher2','learn','role');const game=root.DepotEngine.game,office=root.DepotMap.building('ReceiptArea','Receipt'),center=root.DepotMap.center(office);game.player.x=center.x;game.player.y=center.y;root.DepotEngine.interact();
    const normal=document.getElementById('normalSituation'),contingencies=[...document.querySelectorAll('[data-contingency]')];if(!normal||contingencies.length<2)throw new Error('Receipt Area did not separate Normal route from contingencies');
    const discrepancy=contingencies.find(button=>button.dataset.contingency==='discrepancyReport');if(!discrepancy)throw new Error('Discrepancy route is not offered at Receipt Area');discrepancy.click();await wait();
    if(game.role!=='discrepancyReport'||game.route[0]!=='ReceiptArea')throw new Error('Discrepancy selection did not activate the complete source-backed route');
    root.DepotUI.closeMini();root.DepotEngine.quitGame();return true;
  }
  async function touchAutoRouteProbe(){
    setScenario('accountCardPosting','learn','role');const game=root.DepotEngine.game;root.DepotEngine.navigateToOffice('CAB');
    for(let tries=0;tries<500&&!game.paused;tries++)await wait(10);
    if(!game.paused||document.getElementById('miniOverlay').classList.contains('hidden'))throw new Error('Tap-to-route did not auto-run and enter the selected office');
    root.DepotUI.closeMini();root.DepotEngine.quitGame();return true;
  }
  async function reviewLabProbe(character){
    document.getElementById('procedureSelect').value=character.procedure;document.getElementById('procedureSelect').dispatchEvent(new Event('change',{bubbles:true}));root.DepotUI.selectCharacter(character.id);root.DepotEngine.startGame();
    const choices=[...document.querySelectorAll('#miniModal .choice')],correct=choices.find(button=>button.dataset.ok==='1');if(choices.length<4||!correct)throw new Error(`${character.id}: evidence lab did not present four review choices`);correctChoicePositions.push(choices.indexOf(correct));correct.click();await wait();
    const back=document.getElementById('reviewReturn');if(!back)throw new Error(`${character.id}: evidence lab did not explain the safe review decision`);back.click();return character.id;
  }
  async function runMatrix(){
    const report=document.getElementById('smokeReport');panel.dataset.status='running';report.dataset.done='false';report.textContent='Running…';
    const originalTimeout=root.setTimeout;root.setTimeout=(callback,delay,...args)=>originalTimeout(callback,Math.min(Number(delay)||0,2),...args);
    const specs=[];
    const levelByMode={learn:'medium',arcade:'easy',exam:'difficult'};
    ['learn','arcade','exam'].forEach(mode=>{const difficulty=levelByMode[mode];specs.push({label:`Issue full / ${mode}${mode==='learn'?'':` / ${difficulty}`}`,role:'iv1',mode,mission:'campaign',difficulty,recall:mode==='learn'});specs.push({label:`Receipt full / ${mode}${mode==='learn'?'':` / ${difficulty}`}`,role:'advanceIssueVoucher',mode,mission:'campaign',difficulty,recall:mode==='learn'})});
    specs.push({label:'Issue random operation',role:'iv1',mode:'learn',mission:'random'},{label:'Receipt random operation',role:'advanceIssueVoucher',mode:'learn',mission:'random'});
    root.DepotData.characters.filter(item=>item.playable).forEach(item=>specs.push({label:`${item.procedure} character / ${item.id}`,role:item.id,mode:'learn',mission:'role'}));
    const results=[],failures=[],reviewLabs=[];correctChoicePositions.length=0;
    try{
      await officeIntelClickProbe();await wrongOfficeProbe();await contingencyGateProbe();await touchAutoRouteProbe();
      for(const character of root.DepotData.characters.filter(item=>item.reviewPlayable))reviewLabs.push(await reviewLabProbe(character));
      for(const spec of specs){
        report.textContent=`${results.length+failures.length}/${specs.length} complete\nRunning ${spec.label}`;
        try{results.push(await runScenario(spec))}catch(error){failures.push({label:spec.label,error:error.message});root.DepotEngine.quitGame()}
      }
    }finally{root.setTimeout=originalTimeout}
    const positionVariety=new Set(correctChoicePositions).size;if(positionVariety<2)failures.push({label:'answer randomisation',error:'Correct choices did not move between positions'});const totals=results.reduce((sum,item)=>sum+item.steps,0),summary={status:failures.length?'FAIL':'PASS',scenarios:specs.length,passed:results.length,failed:failures.length,controlPointsExercised:totals,routeRecallChallenges:results.filter(item=>item.recall).length,evidenceReviewLabs:reviewLabs.length,correctAnswerPositions:[...new Set(correctChoicePositions)].sort(),officeIntelClickProbe:true,wrongOfficeExplanationProbe:true,contingencyGateProbe:true,touchAutoRouteProbe:true,procedures:[...new Set(results.map(item=>item.procedure))],modes:[...new Set(results.map(item=>item.mode))],failures};
    panel.dataset.status=failures.length?'fail':'pass';report.dataset.done='true';report.textContent=JSON.stringify(summary,null,2);root.__DEPOT_SMOKE__={summary,results};
  }
  document.getElementById('runSmokeMatrix').addEventListener('click',runMatrix);
})(globalThis);
