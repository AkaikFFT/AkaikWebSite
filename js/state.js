const $=s=>document.querySelector(s),cv=$('#bg'),cx=cv.getContext('2d');
let W,H,S={theme:'dark',season:'auto',time:'auto',precip:false,storm:false,dens:50};
try{Object.assign(S,JSON.parse(localStorage.getItem('akaik')||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem('akaik',JSON.stringify(S))}catch(e){}};
const L=(a,b,t)=>a+(b-a)*t,LA=(a,b,t)=>a.map((v,i)=>L(v,b[i],t)),cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const rgb=(c,a=1)=>`rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`;
const autoSeason=()=>['winter','winter','spring','spring','spring','summer','summer','summer','autumn','autumn','autumn','winter'][new Date().getMonth()];
const season=()=>S.season==='auto'?autoSeason():S.season;
const targetHour=()=>{const d=new Date();return S.time==='auto'?d.getHours()+d.getMinutes()/60:{morning:7,day:13,evening:19.5,night:0.5}[S.time]};
