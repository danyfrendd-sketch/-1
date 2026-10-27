/* Controls and interactions — Touch/keyboard controls, menus, shop interactions and action handling.
 * Extracted from the original game.js; classic script, shared global scope.
 */
// ввод
const st=$('stick'),kn=$('knob');let jx=0,jy=0,keys={};
function js(e){const r=st.getBoundingClientRect();let dx=e.clientX-r.left-60,dy=e.clientY-r.top-60,l=Math.hypot(dx,dy)||1,m=Math.min(l,50);
 jx=dx/l*m/50;jy=dy/l*m/50;kn.style.left=40+dx/l*m+'px';kn.style.top=40+dy/l*m+'px'}
st.onpointerdown=e=>{st.setPointerCapture(e.pointerId);js(e)};st.onpointermove=e=>{if(e.buttons||e.pressure)js(e)};
st.onpointerup=st.onpointercancel=()=>{jx=jy=0;kn.style.left=kn.style.top='40px'};
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=1;if(e.key.toLowerCase()=='e'&&!cur&&document.activeElement!=$('inp'))doAct()});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=0);
let near=null;const pn=$('pn');let mf=null,msg='';
const rew=()=>Math.round(order.r*(1+.08*style+.1*skill));
const toast=q=>{const e=$('ts');e.textContent=q;e.style.opacity=1;clearTimeout(toast.t);toast.t=setTimeout(()=>e.style.opacity=0,2200)};
const say=q=>{msg=q;toast(q)};
function cm(){mf=null;pn.style.display='none'}
function menu(ti,fn){mf=fn;pn.style.display='flex';$('pt').textContent=ti;msg='';rm()}
function rm(){if(!mf)return;const r=mf();$('pi').textContent=`€ ${money|0} · ⚡ ${en|0}% · 🎒 товаров ${goods}`;$('pm').textContent=msg;const c=$('pb');c.innerHTML='';for(const[x,f,im]of r){const b=document.createElement('button');b.className='b';if(im!=null){const k=document.createElement('canvas');k.width=k.height=48;art(k.getContext('2d'),im);k.style.cssText='vertical-align:middle;margin-right:10px;border-radius:8px;background:#242733';b.appendChild(k)}b.appendChild(document.createTextNode(x));b.onclick=()=>{if(f)f();rm()};c.appendChild(b)}}
const pay=c=>money>=c?(money-=c,1):(say('Не хватает денег'),0);
const adv=hr=>{const m=mins+hr*60;if(m>=1440)newDay();mins=m%1440};
function work(hr,p,e,x){if(en<e){say('Нет сил: нужно ⚡'+e);return}en-=e;adv(hr);p=Math.round(p);money+=p;say(x+' +'+p+' €')}
const sleep=c=>{if(pay(c)){if(mins>420)newDay();mins=420;en=100;say('Выспался: ⚡100%, 07:00')}};
const eat=(c,e,x)=>{if(pay(c)){en=Math.min(100,en+e);say(x+' +'+e+'⚡')}};
const rum=['Говорят, ДоджМем скоро улетит на луну.','На складе ищут грузчиков, платят неплохо.','Ларёк на углу можно купить за 1200 €.','Борис в ломбарде берёт товар по 40 €.','Скутер в автосалоне ускорит доставки.','ГенаКоин падает после слухов про налоги.'];
function tickM(){if(Math.random()<.07)pmsg('Район',rum[Math.random()*rum.length|0]);for(const c of coins)c.p=Math.max(1,c.p*(1+(Math.random()-.46)*c.v*2));if(own&&stock>0){stock--;till+=48}}
function rows(b){const n=b.n,R=[],a=(x,f,i)=>R.push([x,f,i]);
 if(n=='Пиццерия'){if(order)a('Заказ уже у тебя',0);else a('📦 Взять заказ на доставку',()=>{let q;do q=B[Math.random()*B.length|0];while(q==b||Math.hypot(q.dx-b.dx,q.dy-b.dy)/T>55);order={b:q,r:40+Math.round(Math.hypot(q.dx-b.dx,q.dy-b.dy)/T*1.6)};cm();toast('Заказ: '+q.n)});dishes(a)}
 else if(n.startsWith('Кафе'))dishes(a);
 else if(n=='Ломбард'){a(`💍 Продать 1 товар (есть ${goods}) за 40 €`,()=>{if(goods>0){goods--;money+=40;say('+40 €')}else say('Нечего продавать')});a('Продать всё',()=>{money+=goods*40;say('+'+goods*40+' €');goods=0})}
 else if(n=='Ларёк'){if(!own)a('🏪 Купить ларёк −1200 €',()=>{if(pay(1200)){own=1;say('Теперь это твой ларёк!')}});else{a(`📦 Закупить товар −25 € (на полке ${stock}/20)`,()=>{if(stock<20&&pay(25))stock++});a(`💰 Забрать выручку: ${till} €`,()=>{money+=till;say('+'+till+' €');till=0});a('🎒 Выложить товар из рюкзака',()=>{if(goods>0&&stock<20){goods--;stock++}})}}
 else if(n=='Рынок'||n=='Супермаркет'){a('🛒 Купить товар −28 € (для перепродажи)',()=>{if(pay(28))goods++});a('🥖 Еда −12 € +20⚡',()=>eat(12,20,'Поел'))}
 else if(n=='Дом')a('🛏 Снять комнату −25 €: спать до 07:00',()=>sleep(25));
 else if(n=='Отель')a('🛎 Номер −80 €: сон до 07:00',()=>sleep(80));
 else if(n=='Крипто-банк'){for(const c of coins){a(`📈 ${c.n}: ${c.p.toFixed(1)} € · у тебя ${c.a.toFixed(2)}`,0);a('   Купить на 100 € (комиссия 1%)',()=>{if(pay(100))c.a+=99/c.p});a(`   Продать всё (+${(c.a*c.p*.99)|0} €)`,()=>{money+=Math.round(c.a*c.p*.99);c.a=0})}
  a(debt?`💳 Погасить долг ${debt} €`:'💳 Кредит 500 € (вернуть 600)',()=>{if(debt){if(pay(debt))debt=0}else{money+=500;debt=600}})}
 else if(n=='Автосалон')a(veh.own?'🚗 Машина уже куплена':'🚗 Купить машину −2500 € (ездить, бензин, ремонт)',()=>{if(!veh.own&&pay(2500)){Object.assign(veh,{own:1,hp:100,f:100,x:b.dx+10,y:b.dy+36,d:0,v:0,col:['#c0392b','#2e86c1','#27ae60','#f1c40f','#ecf0f1','#8e44ad'][Math.random()*6|0]});say('Машина ждёт у входа!')}}),a(scoot?'🛵 Скутер уже куплен':'🛵 Купить скутер −900 € (скорость ×1.7)',()=>{if(!scoot&&pay(900))scoot=1});
 else if(n=='Торговый центр')a('👗 Сменить облик: '+(PG?'женский → мужской':'мужской → женский'),()=>{PG^=1}),a(`👕 Новая одежда −60 € (стиль ${style}/5, +8% к доставкам)`,()=>{if(style<5&&pay(60))style++});
 else if(n=='Кинотеатр')a('🎬 Фильм −25 € +20⚡ (2 ч)',()=>{if(pay(25)){en=Math.min(100,en+20);adv(2)}});
 else if(n=='Казино')a('🎰 Ставка 20 € (шанс 45%, выигрыш ×2)',()=>{if(pay(20)){if(Math.random()<.45){money+=40;say('Выигрыш +40 €!')}else say('Проигрыш −20 €')}});
 else if(n=='Аптека')a('💊 Витамины −30 € +30⚡',()=>eat(30,30,'Полегчало'));
 else if(n=='Почта')a('✉ Проверить почту',()=>{if(Math.random()<.5){const m=5+(Math.random()*30|0);money+=m;say('Перевод +'+m+' €')}else say('Только реклама и счета')});
 else if(n=='Школа')a(`🎓 Курсы курьера −100 € (уровень ${skill}/3, +10% к доставкам)`,()=>{if(skill<3&&pay(100))skill++});
 else if(n=='Склад')a('📦 Смена грузчика, 1 ч: 45–120 €, −25⚡',()=>work(1,45+Math.random()*75,25,'Смена'));
 else if(n=='Завод')a('🏭 Смена на заводе, 4 ч: 170 €, −45⚡',()=>work(4,170,45,'Смена'));
 else if(n=='Автосервис')a('⛽ Заправить машину −15 €',()=>{if(!veh.own)say('Нет машины');else if(veh.f>95)say('Бак полный');else if(pay(15)){veh.f=100;say('Бак полный')}}),a('🛠 Починить кузов −40 €',()=>{if(!veh.own)say('Нет машины');else if(veh.hp>95)say('Кузов целый');else if(pay(40)){veh.hp=100;say('Как новая')}}),a('🔧 Помочь механику, 1 ч: 70 €, −20⚡',()=>work(1,70,20,'Подработка'));
 else if(n=='Мойка')a('🚿 Мыть машины, 1 ч: 55 €, −20⚡',()=>work(1,55,20,'Помыл'));
 else if(n=='Бар'){dishes(a);a('👂 Послушать слухи',()=>say(rum[Math.random()*rum.length|0]))}
 else a('Закрыто',0);
 a('✖ Выйти',cm);return R}
function findNear(){near=null;let bd=50;const cn=(d,o)=>{if(d<bd){bd=d;near=o}};
 for(const n of NP)if(!(n.in>t))cn(Math.hypot(n.x-px,n.y-py),{k:'npc',n,l:'Говорить: '+n.n});
 for(const b of B)cn(Math.hypot(b.dx-px,b.dy-py)-6,{k:'bld',b,l:order&&order.b==b?'Отдать +'+rew()+' €':'Войти: '+b.n});
 for(const p of props)if(p.k!='lamp'&&p.k!='boat')cn(Math.hypot(p.x-px,p.y-py),{k:'p',p,l:p.k=='bench'?'Сесть':'Порыться'});
 if(veh.own&&!veh.on)cn(Math.hypot(veh.x-px,veh.y-py)-8,{k:'veh',l:'Сесть в машину'});if(veh.on)near={k:'veh2',l:'Выйти из машины'};$('act').textContent=near?near.l:'—';$('act').className=near?'on':''}
function doAct(){if(PH)return;if(inn){inAct();return}if(!near||mf)return;const k=near.k;
 if(k=='veh'){if(veh.hp<=0)toast('Машина разбита: нужен ремонт в автосервисе');else if(veh.f<=0)toast('Нет бензина: заправься в автосервисе');else{veh.on=1;veh.v=0;px=veh.x;py=veh.y;toast('Поехали! На красный не гони')}}else if(k=='veh2'){if(Math.abs(veh.v)>25)toast('Сначала остановись');else{veh.on=0;veh.x=px;veh.y=py;veh.v=0}}else if(k=='npc')openChat(near.n);
 else if(k=='bld'){const b=near.b;if(order&&order.b==b){const r=rew();money+=r;toast('Доставлено +'+r+' €');order=null}else enter(b)}
 else{const p=near.p;if(p.k=='bench'){en=Math.min(100,en+12);adv(.25);toast('Отдохнул +12⚡')}else if(t<p.t)toast('Пусто');else{p.t=t+90;if(Math.random()<.5){const m=3+(Math.random()*12|0);money+=m;toast('Нашёл '+m+' €')}else{goods++;toast('Нашёл хлам: можно продать')}}}}
$('act').onpointerdown=e=>{e.preventDefault();doAct()};
