/* Phone state and controls — phone apps and open/close state.
 * Extracted from original game.js. Classic script; preserve load order.
 */
// ===== v6: телефон =====
const APPS=[['🗺','Карта','map'],['🛒','Магазин','shop'],['🎒','Рюкзак','bag'],['💬','Сообщения','msg'],['🏦','Банк','bank'],['📊','Статистика','stat'],['👥','Найм','hire'],['🕶','Тень','dark'],['📺','ТВ','tv']];
let PH=0,papp=null,mmC=null,NWV=0,STG='';
function pmsg(f,tx){phone.msgs.unshift([f,tx,String(mins/60%24|0).padStart(2,'0')+':'+String(mins%60|0).padStart(2,'0')]);phone.msgs.length=Math.min(phone.msgs.length,30);phone.un=(phone.un||0)+1;if(PH&&papp=='msg'){phone.un=0;phR()}$('phb').textContent=phone.un?'📱'+phone.un:'📱';toast('💬 '+f)}
function ledg(){if(lm===null)lm=money;if(Math.abs(money-lm)>=1){led.unshift([String(mins/60%24|0).padStart(2,'0')+':'+String(mins%60|0).padStart(2,'0'),Math.round(money-lm)]);led.length=Math.min(led.length,20);lm=money}
 if(PH){phHdr();if(papp=='map'||MFO)mmDraw()}}
function phHdr(){$('pht').textContent=String(mins/60%24|0).padStart(2,'0')+':'+String(mins%60|0).padStart(2,'0')+'  ·  € '+(money|0)}
function phOpen(){PH=1;papp=null;$('ph').style.display='flex';phR()}
function phClose(){PH=0;$('ph').style.display='none'}