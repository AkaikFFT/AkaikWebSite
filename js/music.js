// lofi
let AC,MG,LPF,NB,playing=false,step=0,nextT=0,tm,T,SD=.4,cur=-1;
const mf=n=>440*2**((n-69)/12);
const TR=[
{bpm:72,ch:[[50,53,57,60,64],[55,59,62,65,69],[48,52,55,59,62],[45,48,52,55,59]],bs:[38,43,36,33],k:[0,5],s:[2,6],a:[0,3,5,7],pad:'triangle',lp:2600},
{bpm:80,ch:[[53,57,60,64,67],[52,55,59,62],[50,53,57,60,64],[48,52,55,59]],bs:[41,40,38,36],k:[0,3,6],s:[2,6],a:[1,3,5,7],pad:'sine',lp:3000},
{bpm:66,ch:[[45,48,52,55,59],[53,57,60,64],[48,52,55,59],[55,59,62,65]],bs:[33,41,36,43],k:[0,4],s:[2,6],a:[0,2,4,6],pad:'sine',lp:2000},
{bpm:70,ch:[[46,50,53,57,60],[55,58,62,65,69],[51,55,58,62],[53,57,60,63]],bs:[46,43,39,41],k:[0,5],s:[2,6],a:[0,3,6],pad:'triangle',lp:2300},
{bpm:84,ch:[[55,59,62,66,69],[52,55,59,62,66],[48,52,55,59,62],[50,54,57,59]],bs:[43,40,36,38],k:[0,3,5],s:[2,6],a:[1,2,4,5,7],pad:'triangle',lp:3400}];
function init(){if(AC)return;AC=new(window.AudioContext||window.webkitAudioContext)();LPF=AC.createBiquadFilter();LPF.type='lowpass';LPF.frequency.value=2600;const cp=AC.createDynamicsCompressor();MG=AC.createGain();MG.gain.value=.7;MG.connect(LPF);LPF.connect(cp);cp.connect(AC.destination);
NB=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);const d=NB.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
const cb=AC.createBuffer(1,AC.sampleRate*4,AC.sampleRate),c=cb.getChannelData(0);for(let i=0;i<c.length;i++)c[i]=Math.random()<.0007?(Math.random()*2-1)*.8:(Math.random()*2-1)*.01;
const cs2=AC.createBufferSource(),cg=AC.createGain();cs2.buffer=cb;cs2.loop=true;cg.gain.value=.1;cs2.connect(cg);cg.connect(cp);cs2.start()}
function tone(f,t,d,ty,v,det=0,dest){const o=AC.createOscillator(),g=AC.createGain();o.type=ty;o.frequency.value=f;o.detune.value=det;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.03);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(dest||MG);o.start(t);o.stop(t+d+.05)}
function noise(t,d,ty,f,v){const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NB;fl.type=ty;fl.frequency.value=f;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(g);g.connect(MG);s.start(t,Math.random());s.stop(t+d+.02)}
function kick(t){const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(42,t+.16);g.gain.setValueAtTime(.9,t);g.gain.exponentialRampToValueAtTime(.0001,t+.3);o.connect(g);g.connect(MG);o.start(t);o.stop(t+.35)}
function bump(k){if(!playing)return;const a=()=>Math.random()*2-1;av.style.transition='transform .07s ease-out';av.style.transform=`translate(${a()*20*k}px,${a()*20*k}px) rotate(${a()*14*k}deg) scale(${1+.11*k})`;setTimeout(()=>{av.style.transition='transform .3s ease-out';av.style.transform='translate(0,0) rotate(0) scale(1)'},110)}
const after=(t,f)=>setTimeout(f,Math.max(0,(t-AC.currentTime)*1000));
function sched(s,t){const bar=(s>>3)%4,p=s%8,ch=T.ch[bar];t+=p%2?SD*.14:0;
if(p===0){ch.forEach(n=>tone(mf(n),t,SD*7.5,T.pad,.05,Math.random()*12-6));
if(S.storm&&Math.random()<.7)after(t,()=>{if(playing&&S.storm)strike(!$('#q').classList.contains('show'))})}
if(T.a.includes(p))tone(mf(ch[Math.random()*ch.length|0]+12),t,.9,'sine',.07);
if(p===0||p===5)tone(mf(T.bs[bar]),t,SD*3,'sine',.3);
if(T.k.includes(p)){kick(t);after(t,()=>bump(1))}
if(T.s.includes(p)){noise(t,.16,'bandpass',1900,.3);tone(185,t,.1,'triangle',.12);after(t,()=>bump(.7))}
noise(t,.04,'highpass',7500,p%2?.07:.04)}
function ui(){$('#music').classList.toggle('on',playing);document.querySelectorAll('#mp [data-i]').forEach(b=>b.classList.toggle('on',playing&&+b.dataset.i===cur))}
function play(i){init();cur=i;T=TR[i];SD=60/T.bpm/2;LPF.frequency.value=T.lp;AC.resume();nextT=AC.currentTime+.1;step=0;
if(!playing){playing=true;tm=setInterval(()=>{while(nextT<AC.currentTime+.15){sched(step,nextT);nextT+=SD;step++}},30)}ui()}
function stopMusic(){playing=false;clearInterval(tm);AC&&AC.suspend();av.style.transition='transform .3s';av.style.transform='';ui()}
$('#music').onclick=()=>{if(playing){stopMusic();$('#mp').classList.remove('open')}else{$('#panel').classList.remove('open');$('#mp').classList.add('open')}};
let ct;const mo=()=>{clearTimeout(ct);if($('#panel').classList.contains('open'))return;$('#mp').classList.add('open')},mc=()=>{clearTimeout(ct);ct=setTimeout(()=>$('#mp').classList.remove('open'),350)};
['#music','#mp'].forEach(s=>{$(s).addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')mo()});$(s).addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')mc()})});
document.addEventListener('click',e=>{if(!e.target.closest('#mp,#music'))$('#mp').classList.remove('open')});
document.querySelectorAll('#mp [data-i]').forEach(b=>b.onclick=()=>{play(+b.dataset.i);$('#mp').classList.remove('open')});
function thud(){try{init();AC.resume();const t=AC.currentTime+.01,f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=700;f.connect(AC.destination);
const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(200,t);o.frequency.exponentialRampToValueAtTime(75,t+.18);g.gain.setValueAtTime(.6,t);g.gain.exponentialRampToValueAtTime(.0001,t+.3);o.connect(g);g.connect(f);o.start(t);o.stop(t+.35);
const o2=AC.createOscillator(),g2=AC.createGain();o2.frequency.value=330;g2.gain.setValueAtTime(.12,t);g2.gain.exponentialRampToValueAtTime(.0001,t+.25);o2.connect(g2);g2.connect(f);o2.start(t);o2.stop(t+.3)}catch(e){}}
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',thud));
