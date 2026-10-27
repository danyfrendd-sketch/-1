/* Phone actions — Phone app click/action handlers.
 * Extracted from the original game.js; classic script, shared global scope.
 */
function phAct(a){const[k,v]=a.split(':');
 if(k=='mapfs'){mapOpen();return}if(k=='app'){papp=v;if(v=='msg'){phone.un=0;$('phb').textContent='📱'}}else if(k=='back')papp=null;
 else if(k=='buy'){const it=ITEMS[v];if(pay(it.p)){addItem(v,1);toast(it.ic+' '+it.n+' — в рюкзаке')}}
 else if(k=='use'){const it=ITEMS[v];if(it&&it.use&&removeItem(v,1))toast(it.use())}
 else if(k=='up'){const u=UP.find(q=>q[0]==v);if(!apt.own)toast('Сначала купи квартиру в подъезде');else if(apt.it[v])toast('Уже стоит');else if(pay(u[2])){apt.it[v]=1;toast('🛋 '+u[1]+' доставлен в квартиру')}}
 if(k=='hire'){const c=cands[v|0];if(c&&pay(c.w*2)){emp.push({id:'e'+(t|0)+v,n:c.n,r:c.r,s:c.s,l:60+(Math.random()*30|0),w:c.w});cands.splice(v|0,1);toast('👥 '+c.n+' нанят')}}
 else if(k=='fire'){const e=emp.splice(v|0,1)[0];if(e)toast(e.n+' уволен')}
 else if(k=='raise'){const e=emp[v|0];if(e&&e.s<5&&pay(e.w*5)){e.s++;e.w=Math.round(e.w*1.25);e.l=Math.min(100,e.l+10);toast(e.n+': навык '+e.s)}}
 else if(k=='dk')darkAct(v);
 else if(k=='tv'){if(!apt.own)toast('ТВ — в твоей квартире');else{adv(.33);en=Math.min(100,en+6);if(v=='news'){const c=coins[Math.random()*3|0],up=Math.random()<.5;c.p*=up?1.1:.9;toast('📰 '+c.n+(up?' растёт':' падает'))}else if(v=='ad')toast('📢 Скидки на энергетики — глянь в магазине');else if(v=='crime'){heat=Math.max(0,heat-3);toast('🚨 Полиция проверяет районы')}else toast(rain?'🌧 Дожди':'☀ Ясно')}}
 phR()}

$('phb').onclick=phOpen;$('phx').onclick=phClose;$('mfx').onclick=mapClose;$('mft').onclick=()=>{mapTh=mapTh=='paper'?'bp':'paper';MAPSVG=null;mapFill();if(PH&&papp=='map')phR()};$('mfp').onclick=()=>{mapZ=Math.min(2.2,mapZ+.25);mapFill()};$('mfm').onclick=()=>{mapZ=Math.max(.45,mapZ-.25);mapFill()};$('phc').onclick=e=>{const b=e.target.closest('[data-a]');if(b)phAct(b.dataset.a)};

