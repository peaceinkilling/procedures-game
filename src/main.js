(function bootstrap(root){
  'use strict';
  const engine=root.DepotEngine,ui=root.DepotUI,map=root.DepotMap;
  const visibleOverlay=()=>[...document.querySelectorAll('.overlay:not(.hidden)')].at(-1);
  const keyboardTargets=scope=>[...scope.querySelectorAll('button:not(:disabled),select:not(:disabled)')].filter(item=>item.offsetParent!==null);
  function moveKeyboardFocus(scope,direction){
    const targets=keyboardTargets(scope);if(!targets.length)return;
    const current=targets.indexOf(document.activeElement),next=current<0?0:(current+direction+targets.length)%targets.length;
    targets[next].focus();
  }
  document.addEventListener('keydown',event=>{
    if(['INPUT','SELECT','TEXTAREA'].includes(event.target.tagName)||event.target.isContentEditable)return;
    const overlay=visibleOverlay(),inMenu=!!overlay;
    if(inMenu&&['1','2','3','4'].includes(event.key)){
      const choices=[...overlay.querySelectorAll('.choice,.filetray,.rack,.package,.copy-card')].filter(item=>item.offsetParent!==null&&!item.classList.contains('used'));
      const selected=choices[Number(event.key)-1];if(selected){event.preventDefault();selected.focus();selected.click()}return;
    }
    if(inMenu&&['Enter',' '].includes(event.key)&&document.activeElement?.matches('button:not(:disabled)')){
      event.preventDefault();document.activeElement.click();return;
    }
    if(inMenu&&document.activeElement.tagName!=='SELECT'&&['ArrowRight','ArrowDown','ArrowLeft','ArrowUp'].includes(event.key)){
      event.preventDefault();moveKeyboardFocus(overlay,['ArrowRight','ArrowDown'].includes(event.key)?1:-1);return;
    }
    if((event.key==='i'||event.key==='I')&&engine.game.running&&!inMenu){
      event.preventDefault();const office=map.nearestBuilding(engine.game.player,engine.game.procedure);if(office)ui.showOfficeIntel(office.id,engine.game.procedure);return;
    }
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','e','E','w','a','s','d','W','A','S','D','Shift'].includes(event.key))event.preventDefault();
    engine.game.keys[event.key]=true;engine.game.keys[event.key.toLowerCase()]=true;
    if((event.key==='e'||event.key==='E'||event.key===' ')&&!event.repeat)engine.interact()
  });
  document.addEventListener('keyup',event=>{if(['INPUT','SELECT','TEXTAREA'].includes(event.target.tagName)||event.target.isContentEditable)return;engine.game.keys[event.key]=false;engine.game.keys[event.key.toLowerCase()]=false});
  const joystick=document.getElementById('joystick'),joystickKnob=document.getElementById('joystickKnob');let joystickPointer=null;
  function moveJoystick(event){
    if(event.pointerId!==joystickPointer)return;event.preventDefault();
    const bounds=joystick.getBoundingClientRect(),cx=bounds.left+bounds.width/2,cy=bounds.top+bounds.height/2,max=bounds.width*.32,rawX=event.clientX-cx,rawY=event.clientY-cy,length=Math.hypot(rawX,rawY)||1,scale=Math.min(1,max/length),x=rawX*scale,y=rawY*scale;
    joystickKnob.style.transform=`translate(${x}px,${y}px)`;engine.game.touchVector={x:x/max,y:y/max};engine.cancelNavigation()
  }
  function releaseJoystick(event){if(joystickPointer!==null&&event.pointerId!==joystickPointer)return;joystickPointer=null;engine.game.touchVector={x:0,y:0};joystickKnob.style.transform='translate(0,0)'}
  joystick.addEventListener('pointerdown',event=>{joystickPointer=event.pointerId;joystick.setPointerCapture(event.pointerId);moveJoystick(event)});
  joystick.addEventListener('pointermove',moveJoystick);joystick.addEventListener('pointerup',releaseJoystick);joystick.addEventListener('pointercancel',releaseJoystick);
  const boost=document.getElementById('boostBtn'),boostOn=event=>{event.preventDefault();engine.game.keys.boost=true;boost.classList.add('active')},boostOff=event=>{event.preventDefault();engine.game.keys.boost=false;boost.classList.remove('active')};boost.addEventListener('pointerdown',boostOn);boost.addEventListener('pointerup',boostOff);boost.addEventListener('pointerleave',boostOff);boost.addEventListener('pointercancel',boostOff);
  const canvasPoint=event=>{const bounds=map.canvas.getBoundingClientRect();return{x:(event.clientX-bounds.left)*map.width/bounds.width,y:(event.clientY-bounds.top)*map.height/bounds.height}};
  map.canvas.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const office=map.buildingAt(canvasPoint(event),engine.game.procedure);map.setHovered(office?.id);map.canvas.style.cursor=office?'pointer':'default'});
  map.canvas.addEventListener('pointerleave',()=>{map.setHovered(null);map.canvas.style.cursor='default'});
  map.canvas.addEventListener('pointerup',event=>{if(!engine.game.running||!document.getElementById('miniOverlay').classList.contains('hidden'))return;const office=map.buildingAt(canvasPoint(event),engine.game.procedure);if(!office)return;if(event.pointerType==='touch')engine.navigateToOffice(office.id);else ui.showOfficeIntel(office.id,engine.game.procedure)});
  document.getElementById('touchAct').addEventListener('click',engine.interact);document.getElementById('touchIntel').addEventListener('click',()=>{const office=map.nearestBuilding(engine.game.player,engine.game.procedure);if(office)ui.showOfficeIntel(office.id,engine.game.procedure)});document.getElementById('interactBtn').addEventListener('click',engine.interact);document.getElementById('quitBtn').addEventListener('click',engine.quitGame);document.getElementById('soundBtn').addEventListener('click',()=>{engine.game.sound=!engine.game.sound;document.getElementById('soundBtn').textContent=`Sound: ${engine.game.sound?'On':'Off'}`;if(engine.game.sound)engine.tone(500,.08)});
  document.querySelectorAll('#modeGrid .option-card').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('#modeGrid .option-card').forEach(item=>item.classList.remove('selected'));button.classList.add('selected')}));
  document.querySelectorAll('#difficultyGrid .difficulty-card').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('#difficultyGrid .difficulty-card').forEach(item=>item.classList.remove('selected'));button.classList.add('selected')}));
  document.querySelectorAll('#missionGrid .option-card').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('#missionGrid .option-card').forEach(item=>item.classList.remove('selected'));button.classList.add('selected')}));
  document.getElementById('startBtn').addEventListener('click',engine.startGame);document.getElementById('menuBtn').addEventListener('click',engine.quitGame);document.getElementById('againBtn').addEventListener('click',()=>{document.getElementById('endOverlay').classList.add('hidden');engine.startGame()});
  if(!CanvasRenderingContext2D.prototype.roundRect){CanvasRenderingContext2D.prototype.roundRect=function(x,y,width,height,radius){this.beginPath();this.moveTo(x+radius,y);this.arcTo(x+width,y,x+width,y+height,radius);this.arcTo(x+width,y+height,x,y+height,radius);this.arcTo(x,y+height,x,y,radius);this.arcTo(x,y,x+width,y,radius);this.closePath();return this}}
  ui.initializeHangar();map.draw(engine.game);requestAnimationFrame(engine.loop);
})(globalThis);
