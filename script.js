const FILE="[Lv.04] Yellow - Cold Play  (★★☆☆☆)  Drum Cover, Score, Sheet Music, Lessons, Tutorial  DRUMMATE_1790044583659.mp3";
const $=id=>document.getElementById(id),audio=$("audio");audio.src=FILE;let playing=false,started=false;
function show(id){document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));$(id).classList.add("active")}
async function music(){if(playing)return;try{audio.volume=.82;await audio.play();playing=true;$("music").classList.add("on")}catch(e){}}
$("start").onclick=async()=>{await music();show("letter")};
$("env").onclick=()=>{show("close")};
$("x").onclick=async()=>{await music();show("cosmos");if(!started){started=true;init()}};
document.addEventListener("pointerdown",()=>{if(!playing)music()},{passive:true});

const cv=$("c"),ctx=cv.getContext("2d");let W,H,dpr,ps,stars,raf;
function heart(t){return[16*Math.sin(t)**3,-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))]}
function resize(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+"px";cv.style.height=H+"px";ctx.setTransform(dpr,0,0,dpr,0,0);make()}
function make(){let s=Math.min(W,H);ps=[];for(let i=0;i<Math.min(2300,Math.max(1100,s*2.2));i++){let t=Math.random()*Math.PI*2,h=heart(t),sc=s*(.017+Math.random()*.016);ps.push({x:Math.random()*W,y:Math.random()*H,tx:W/2+h[0]*sc,ty:H/2+h[1]*sc,r:.25+Math.random()*1.45,a:.25+Math.random()*.7,p:Math.random()*7})}stars=Array.from({length:Math.floor(s*.7)},()=>({x:Math.random()*W,y:Math.random()*H,r:.1+Math.random()*.8,a:.1+Math.random()*.5,p:Math.random()*7}))}
function init(){resize();cancelAnimationFrame(raf);draw(performance.now())}
function draw(now){let t=now*.001;ctx.clearRect(0,0,W,H);ctx.fillStyle="#000";ctx.fillRect(0,0,W,H);
for(const s of stars){ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,7);ctx.fillStyle=`rgba(255,239,190,${s.a*(.55+.45*Math.sin(t*2+s.p))})`;ctx.fill()}
for(const p of ps){p.x+=(p.tx-p.x)*.003;p.y+=(p.ty-p.y)*.003;let x=p.x+Math.sin(t*.35+p.p)*1.8,y=p.y+Math.cos(t*.3+p.p)*1.8;ctx.beginPath();ctx.arc(x,y,p.r,0,7);ctx.fillStyle=`rgba(255,218,111,${p.a*(.7+.3*Math.sin(t*2+p.p))})`;ctx.shadowBlur=5;ctx.shadowColor="rgba(255,210,90,.7)";ctx.fill()}ctx.shadowBlur=0;raf=requestAnimationFrame(draw)}
addEventListener("resize",()=>{if(started)resize()});