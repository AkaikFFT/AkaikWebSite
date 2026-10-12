// UI
function render(){document.documentElement.dataset.theme='dark';
document.querySelectorAll('.seg').forEach(s=>s.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.v===S[s.dataset.k])));
const w=season()==='winter';$('#plab').textContent=w?'Снег':'Дождь';$('#precip').checked=S.precip||S.storm;$('#storm').checked=S.storm;$('#dens').value=S.dens;$('#dv').textContent=S.dens+'%';
$('#hint').textContent=w?'Зимой вместо дождя идёт только снег.':'';save()}
document.querySelectorAll('.seg').forEach(s=>s.onclick=e=>{const b=e.target.closest('button');if(!b)return;S[s.dataset.k]=b.dataset.v;render()});
$('#precip').onchange=e=>{S.precip=e.target.checked;if(!S.precip)S.storm=false;render()};
$('#storm').onchange=e=>{S.storm=e.target.checked;if(S.storm){S.precip=true;nextL=performance.now()+700}render()};
$('#dens').oninput=e=>{S.dens=+e.target.value;render()};
$('#gear').onclick=()=>{if($('#panel').classList.toggle('open'))$('#mp').classList.remove('open')};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#panel').classList.remove('open');$('#mp').classList.remove('open')}});
render();
// tilt
const hit=$('#hit'),av=$('#av'),nk=$('#nick');let over=false;
const tilt=e=>{if(!over)return;const r=hit.getBoundingClientRect(),dx=cl((e.clientX-r.left-r.width/2)/(r.width/2),-1,1),dy=cl((e.clientY-r.top-r.height/2)/(r.height/2),-1,1);
nk.style.transform=`rotateX(${-dy*22}deg) rotateY(${dx*28}deg)`};
hit.addEventListener('pointerenter',e=>{over=true;tilt(e)});
addEventListener('pointermove',tilt);
hit.addEventListener('pointerleave',()=>{over=false;nk.style.transform=''});
