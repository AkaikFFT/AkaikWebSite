const SE={summer:{leaf:[48,128,52],con:[24,92,60],gr:[44,96,42],sn:0,bl:0},autumn:{leaf:[205,98,28],con:[52,96,52],gr:[118,72,32],sn:0,bl:0},winter:{leaf:[205,214,228],con:[38,78,70],gr:[232,238,248],sn:1,bl:0},spring:{leaf:[132,205,112],con:[48,128,80],gr:[88,160,70],sn:0,bl:1}};
let cs=JSON.parse(JSON.stringify(SE[season()]));
const KH=[0,5.5,8,13,17.5,19.5,21,24],KT=[[5,8,22],[30,35,70],[90,150,220],[60,130,220],[70,120,200],[60,40,90],[10,12,35],[5,8,22]],KB=[[15,22,45],[200,120,100],[200,225,245],[170,215,250],[240,190,140],[240,110,80],[40,40,80],[15,22,45]],KL=[.28,.5,.9,1,.9,.55,.3,.28];
function sky(h){let i=0;while(h>=KH[i+1])i++;const t=(h-KH[i])/(KH[i+1]-KH[i]);return{top:LA(KT[i],KT[i+1],t),bot:LA(KB[i],KB[i+1],t),l:L(KL[i],KL[i+1],t)}}
let hr=targetHour(),oc=0,tt=0,trees=[],stars=[],clouds=[];
const rnd=(()=>{let s=7;return()=>(s=(s*16807)%2147483647)/2147483647})();
function resize(){W=innerWidth;H=innerHeight;const d=Math.min(devicePixelRatio||1,W<700?1.5:2),U=Math.min(H,W*1.2);cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0);
trees=[[.62,.2,34,.55],[.76,.32,64,.3],[1.0,.52,120,0]].map(([by,hh,sp,fog])=>{const a=[];for(let x=-30;x<W+60;x+=sp*(.7+rnd()*.6))a.push({x,h:U*hh*(.75+rnd()*.5),w:U*hh*(.5+rnd()*.25),c:rnd()<.62,v:rnd()-.5,p:rnd()*9});return{by,fog,a}});
stars=Array.from({length:130},()=>({x:rnd()*W,y:rnd()*H*.55,r:rnd()*1.4+.3,p:rnd()*9}));
clouds=Array.from({length:7},()=>({x:rnd()*W,y:H*(.05+rnd()*.3),s:.6+rnd()*1.2,v:.1+rnd()*.25}))}
addEventListener('resize',resize);resize();
function tint(c,l,fog,bot){const m=[.85,.92,1.15];return c.map((v,i)=>L(Math.min(255,v*l*m[i]),bot[i],fog))}
function tree(t,by,fog,k){const{x,h,w}=t,b=by*H,wind=1+(S.storm?3:S.precip?1:0),sw=Math.sin(tt*1.3+t.p)*(1.5+wind)*h/110;
const col=(c,v=0)=>rgb(tint(c.map(q=>q+v*50),k.l,fog,k.bot));
cx.fillStyle=col([62,44,32]);{const tw=t.c?.05:.035,th2=t.c?.28:.66;cx.fillRect(x-w*tw,b-h*th2,w*tw*2,h*th2)}
if(t.c){for(let i=0;i<4;i++){const y0=b-h*.16-i*h*.19,th=h*.36,hw=w*.5*(1-i*.2),ax=x+sw*(i+1)*.35;
cx.fillStyle=col(cs.con,t.v);cx.beginPath();cx.moveTo(ax,y0-th);cx.lineTo(x-hw,y0);cx.lineTo(x+hw,y0);cx.fill();
if(cs.sn>.02){cx.fillStyle=rgb(tint([245,248,255],k.l,fog,k.bot),cs.sn);cx.beginPath();cx.moveTo(ax,y0-th);cx.lineTo(x-hw*.62,y0-th*.38);cx.lineTo(x+hw*.62,y0-th*.38);cx.fill()}}}
else{const r=w*.3;cx.fillStyle=col(cs.leaf,t.v);[[0,.8,.78],[-.55,.55,1],[.55,.55,1],[0,.58,1.1]].forEach(([dx,dy,s])=>{cx.beginPath();cx.arc(x+dx*r+sw*dy,b-h*dy-r*.2,r*s,0,7);cx.fill()});
if(cs.bl>.02){cx.fillStyle=rgb(tint([255,190,215],k.l,fog,k.bot),cs.bl*.9);for(let j=0;j<7;j++){cx.beginPath();cx.arc(x+Math.sin(t.p*j)*r*1.1+sw*.6,b-h*(.45+.3*((j*37)%10)/10),r*.12,0,7);cx.fill()}}}}
let P=[],pType='',LV=[],lvType='';
let bolt=null,flash=0,nextL=0,qi=-1,qT;
const Q=["«Один не устанавливает диктатуру, чтобы защитить революцию; он совершает революцию, чтобы установить диктатуру.»","«Будучи в меньшинстве, даже оставаясь один против всех, вы не безумны. Была правда и была ложь, и если вы отстаиваете правду даже против всего мира, вы не безумец.»","«Каждое поколение считает себя более умным, чем предыдущее, и более мудрым, чем последующее.»","«Самый быстрый способ окончить войну — проиграть её.»","«Старший Брат смотрит на тебя.»","«Чем дальше общество отдаляется от правды, тем больше оно ненавидит тех, кто её говорит.»"];
function quote(){let n;do n=Math.random()*Q.length|0;while(n===qi);qi=n;$('#qt').textContent=Q[n];$('#q').classList.add('show');fit();clearTimeout(qT);qT=setTimeout(()=>{$('#q').classList.remove('show');$('.card').style.translate='0 0'},3500+Q[n].length*65)}
function fit(){const c=$('.card'),q=$('#q');c.style.transition='none';c.style.translate='0 0';const qb=q.getBoundingClientRect().bottom,r=c.getBoundingClientRect();c.offsetWidth;c.style.transition='';
const need=qb+30-r.top,room=innerHeight-r.bottom-12;c.style.translate='0 '+Math.max(0,Math.min(need,room))+'px'}
function strike(q){let x=W*(.12+rnd()*.76),y=0;const p=[[x,0]],br=[];while(y<H*.7){y+=H*(.03+Math.random()*.05);x+=(Math.random()-.5)*80;p.push([x,y])}
for(let i=0;i<2;i++){let j=1+Math.random()*(p.length-3)|0,[bx,by]=p[j];const s=[[bx,by]];for(let q=0;q<4;q++){bx+=(Math.random()-.3)*70;by+=H*.04;s.push([bx,by])}br.push(s)}
bolt={p,br,life:1};flash=1;setTimeout(()=>flash=.8,160);if(q!==false&&playing&&S.storm)quote()}
function frame(ts){tt=ts/1000;
const th=targetHour(),d=((th-hr+36)%24)-12;hr=(hr+d*.04+24)%24;
const win=season()==='winter';
oc=L(oc,S.storm?1:S.precip?.5:0,.03);
const sk=sky(hr),k={l:sk.l*(1-oc*.35),top:LA(sk.top,[84,92,106].map(v=>v*sk.l),oc*.8),bot:LA(sk.bot,[96,104,116].map(v=>v*sk.l),oc*.8)};
const tg=SE[season()];for(const q of['leaf','con','gr'])cs[q]=LA(cs[q],tg[q],.04);cs.sn=L(cs.sn,tg.sn,.04);cs.bl=L(cs.bl,tg.bl,.04);
const g=cx.createLinearGradient(0,0,0,H*.8);g.addColorStop(0,rgb(k.top));g.addColorStop(1,rgb(k.bot));cx.fillStyle=g;cx.fillRect(0,0,W,H);
const sa=cl((.5-sk.l)*3.2)*(1-oc);cx.fillStyle='#fff';stars.forEach(s=>{cx.globalAlpha=sa*(.6+.4*Math.sin(tt*2+s.p));cx.beginPath();cx.arc(s.x,s.y,s.r,0,7);cx.fill()});cx.globalAlpha=1;
const sun=hr>5.5&&hr<19.5,pp=sun?(hr-5.5)/14:(((hr-19.5+24)%24)/10.5),bx=W*(.08+.84*cl(pp)),by=H*.5-Math.sin(cl(pp)*Math.PI)*H*.38,al=(1-oc*.85)*cl(Math.min(pp,1-pp)*8);
if(al>.01){const r=sun?H*.07:H*.05,gl=cx.createRadialGradient(bx,by,0,bx,by,r*5);const c=sun?(hr<8||hr>17?'255,170,90':'255,235,170'):'200,215,255';gl.addColorStop(0,`rgba(${c},${.9*al})`);gl.addColorStop(.2,`rgba(${c},${.35*al})`);gl.addColorStop(1,`rgba(${c},0)`);cx.fillStyle=gl;cx.fillRect(bx-r*5,by-r*5,r*10,r*10);cx.fillStyle=`rgba(${c},${al})`;cx.beginPath();cx.arc(bx,by,r,0,7);cx.fill()}
clouds.forEach(c=>{c.x+=c.v*(1+oc*2);if(c.x>W+200)c.x=-200;const a=.25+oc*.65;cx.fillStyle=rgb(LA([255,255,255].map(v=>v*Math.min(1,sk.l+.2)),[70,76,88].map(v=>v*sk.l),oc),a);for(let i=0;i<5;i++){cx.beginPath();cx.ellipse(c.x+i*38*c.s,c.y+Math.sin(i*2)*10*c.s,60*c.s,26*c.s,0,0,7);cx.fill()}});
trees.forEach(l=>{const gc=tint(cs.gr,k.l,l.fog,k.bot);cx.fillStyle=rgb(gc);cx.fillRect(0,l.by*H-4,W,H);l.a.forEach(t=>tree(t,l.by,l.fog,k));
const fg=cx.createLinearGradient(0,l.by*H-H*.18,0,l.by*H);fg.addColorStop(0,rgb(k.bot,0));fg.addColorStop(1,rgb(k.bot,.28*(1-l.fog*.3)));cx.fillStyle=fg;cx.fillRect(0,l.by*H-H*.18,W,H*.18)});
const pt=win?'snow':'rain';if(pt!==pType){P=[];pType=pt}
const n=(S.precip||S.storm)?Math.round(S.dens*(pt==='rain'?8:6)*cl(W*H/900000,.3,1)):0;while(P.length<n)P.push({x:Math.random()*W,y:Math.random()*H,z:.4+Math.random()*.6,p:Math.random()*9});P.length=Math.min(P.length,n);
const wd=S.storm?9:3;
if(pt==='rain'){cx.strokeStyle=`rgba(190,210,235,${k.l>.6?.4:.3})`;cx.lineWidth=1.2;cx.beginPath();P.forEach(q=>{q.y+=(16+q.z*10)*(S.storm?1.3:1);q.x-=wd*q.z;if(q.y>H){q.y=-20;q.x=Math.random()*W+100}if(q.x<-20)q.x+=W+40;cx.moveTo(q.x,q.y);cx.lineTo(q.x+wd*q.z*1.4,q.y-14*q.z)});cx.stroke()}
else{cx.fillStyle='rgba(255,255,255,.9)';P.forEach(q=>{q.y+=(.8+q.z*1.6)*(S.storm?1.6:1);q.x+=Math.sin(tt+q.p)*.6-(S.storm?3:.3)*q.z;if(q.y>H){q.y=-6;q.x=Math.random()*W}if(q.x<-6)q.x=W+6;cx.globalAlpha=.5+q.z*.5;cx.beginPath();cx.arc(q.x,q.y,1+q.z*2.2,0,7);cx.fill()});cx.globalAlpha=1}
const st=season(),lt=st==='autumn'?'a':st==='spring'?'s':'';if(lt!==lvType){LV=[];lvType=lt}
if(lt&&LV.length<34&&Math.random()<.2)LV.push({x:Math.random()*W,y:-10,a:Math.random()*6,s:5+Math.random()*5,c:lt==='a'?[[210,90,30],[230,150,40],[170,50,30]][Math.random()*3|0]:[255,190,215],p:Math.random()*9});
LV=LV.filter(q=>q.y<H+20);LV.forEach(q=>{q.y+=1+q.s*.12;q.x+=Math.sin(tt*1.5+q.p)*1.2+(S.storm?3:.6);q.a+=.03;cx.fillStyle=rgb(q.c.map(v=>v*Math.max(.35,k.l)));cx.save();cx.translate(q.x,q.y);cx.rotate(q.a);cx.beginPath();cx.ellipse(0,0,q.s,q.s*.5,0,0,7);cx.fill();cx.restore()});
if(S.storm&&!playing&&ts>nextL){strike();nextL=ts+3500+Math.random()*5000}
if(bolt){cx.save();cx.strokeStyle=`rgba(235,240,255,${bolt.life})`;cx.shadowColor='#a8c4ff';cx.shadowBlur=24;cx.lineWidth=3;cx.lineJoin='round';[bolt.p,...bolt.br].forEach((s,i)=>{cx.lineWidth=i?1.5:3;cx.beginPath();s.forEach((q,j)=>j?cx.lineTo(q[0],q[1]):cx.moveTo(q[0],q[1]));cx.stroke()});cx.restore();bolt.life-=.035;if(bolt.life<=0)bolt=null}
if(flash>.01){cx.fillStyle=`rgba(225,232,255,${flash*.55})`;cx.fillRect(0,0,W,H);flash*=.88}
requestAnimationFrame(frame)}
requestAnimationFrame(frame);
