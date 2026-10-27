/* NPC conversations — Resident chat UI and dialogue request handling.
 * Extracted from the original game.js; classic script, shared global scope.
 */
// чат с ИИ-жителями
const fb=['Ну привет! Чем занят в наших краях?','Деньги — это хорошо. А у тебя сколько на кармане?','Слышал, в центре открыли новый банк. Пойдёшь туда?','А ты чего вообще приехал в Брокевиль?'];
let smP=null;const getS=()=>smP||(smP=(window.claude?claude.use('sample'):Promise.resolve(null)).catch(()=>null));
function addM(c,t){const d=document.createElement('div');d.className='m '+c;d.textContent=t;$('log').appendChild(d);$('log').scrollTop=1e9;return d}
function persona(n){const hh=String(mins/60%24|0).padStart(2,'0')+':'+String(mins%60|0).padStart(2,'0');
 return `Ты — ${n.n}, ${n.j}, житель вымышленного города Брокевиль (пиксельная игра на телефоне). Характер: ${n.tr}. Собеседник — игрок, новичок, приехал с 200 € и хочет стать хозяином города (курьер, магазин, крипта, машины). Сейчас у игрока ${money} €, время ${hh}${order?', он везёт пиццу':''}. Отвечай по-русски, 1–3 коротких фразы, строго в образе, только в рамках игры. Часто сам задавай игроку встречный вопрос (про планы, деньги, выбор пути, что он думает о других жителях) и реагируй на его ответы. Верни ТОЛЬКО JSON: {"say":"реплика","money":0}, где money — €, которые ты даёшь игроку (+) или просишь у него (−) прямо сейчас; обычно 0, максимум ±30, и только если это логично по разговору.`}
async function ask(){busy=true;const w=addM('n','…');
 let say=fb[Math.random()*4|0],mo=0;
 try{const s=await getS();if(s){const ms=cur.h.map((m,i)=>i?m:{role:'user',content:persona(cur)+'\n\n'+m.content});
  const r=await s(ms,{cache:false});const m=r.text.match(/\{[\s\S]*\}/);
  try{const j=JSON.parse(m[0]);say=j.say||say;mo=+j.money||0}catch(e){say=r.text}}}catch(e){}
 mo=Math.max(-30,Math.min(30,Math.round(mo)));if(money+mo<0)mo=0;money+=mo;
 w.textContent=say+(mo?`  (${mo>0?'+':''}${mo} €)`:'');cur.h.push({role:'assistant',content:say});busy=false}
function openChat(n){cur=n;$('chat').style.display='flex';$('nm').textContent=n.n;$('jb').textContent=n.j;$('log').innerHTML='';
 n.h=[{role:'user',content:'*игрок подошёл к тебе*'}];ask()}
function send(){const v=$('inp').value.trim();if(!v||busy)return;$('inp').value='';addM('p',v);cur.h.push({role:'user',content:v});ask()}
$('snd').onclick=send;$('inp').onkeydown=e=>{if(e.key=='Enter')send()};$('x').onclick=()=>{cur=null;$('chat').style.display='none'};
