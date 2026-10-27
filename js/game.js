const T=32,W=180,H=90,$=i=>document.getElementById(i),cv=$('c'),cx=cv.getContext('2d');
let Z=2,t=0,money=200,mins=480,en=100,order=null,cur=null,busy=false,px=0,py=0,pd=0,pf=0,debt=0,own=0,stock=0,till=0,scoot=0,style=0,skill=0,tk=0;const coins=[{n:'БрокКоин',p:100,a:0,v:.05},{n:'ДоджМем',p:20,a:0,v:.2},{n:'ГенаКоин',p:50,a:0,v:.1}];
// ===== v6: предметы и инвентарь =====
const SV=9;let emp=[],cands=[],heat=0,dk=newDk(),rain=0,rA=0,cam={x:0,y:0,i:0};let noSave=0,lm=null,led=[],inventory=[],phone={msgs:[['Гена','Заходи в кафе, налью борща со скидкой 😉','08:00'],['Банк','Добро пожаловать в Брокевиль! Кредит 500 € доступен в Крипто-банке.','08:00']],un:2};
const ITEMS={goods:{n:'Товар',p:28,ic:'📦',d:'Для перепродажи в ломбарде (40 €)'},snack:{n:'Перекус',p:12,ic:'🥪',d:'+20⚡ когда съешь',use:()=>{en=Math.min(100,en+20);return 'Съел перекус +20⚡'}},energy:{n:'Энергетик',p:25,ic:'🥤',d:'+35⚡ сразу',use:()=>{en=Math.min(100,en+35);return 'Бодрит! +35⚡'}}};
const countItem=id=>{const e=inventory.find(q=>q.id==id);return e?e.count:0};
const addItem=(id,n=1)=>{let e=inventory.find(q=>q.id==id);if(!e){e={id,count:0};inventory.push(e)}e.count+=n;if(e.count<=0)inventory=inventory.filter(q=>q!=e)};
const hasItem=(id,n=1)=>countItem(id)>=n;
const removeItem=(id,n=1)=>{if(!hasItem(id,n))return 0;addItem(id,-n);return 1};
Object.defineProperty(globalThis,'goods',{configurable:true,get:()=>countItem('goods'),set:v=>{const n=Math.max(0,Math.round(v));addItem('goods',n-countItem('goods'))}});
function rs(){const d=devicePixelRatio||1;cv.width=innerWidth*d;cv.height=innerHeight*d;Z=Math.max(2,Math.round(2*d))}
addEventListener('resize',rs);rs();
const h=(a,b)=>{let n=Math.sin(a*127.1+b*311.7)*43758.5;return n-Math.floor(n)};
// map: 0 трава,1 дорога,2 тротуар,3 здание,4 дверь,5 вода
let sd=1;const RR=()=>h(sd++,7.3);
const g=[];for(let y=0;y<H;y++){g[y]=new Uint8Array(W);for(let x=0;x<W;x++)g[y][x]=(x%15<3||y%15<3)?1:0}
const pools=[['Пиццерия','Кафе «У Гены»','Ломбард','Ларёк','Рынок','Дом','Кафе «У Гены»','Ломбард'],['Крипто-банк','Автосалон','Торговый центр','Отель','Кинотеатр','Казино','Крипто-банк','Торговый центр'],['Супермаркет','Аптека','Почта','Школа','Дом','Дом','Супермаркет','Аптека'],['Склад','Автосервис','Мойка','Бар','Завод','Склад','Бар','Завод']];
const dc=[['#9c4a3a','#b5653f','#8a4a3a','#a8553f','#c27a4a'],['#5d8aa8','#7aa5bd','#4a6f8c','#8aa0a8','#6c7c96'],['#b9b6ab','#a4a69f','#c8c3b2','#aab0a0'],['#7a6a5a','#6b6f73','#8a5a3a','#5f6a70']];
const mats=['brick','glass','panel','metal'],awc=['#c0392b','#2e86c1','#27ae60','#d4ac0d','#8e44ad'];
const B=[],trees=[],props=[],pc=[0,0,0,0,0,0,0,0];const vp=['Рынок','Кафе «У Гены»','Дом','Дом','Аптека','Дом','Почта','Дом'],vc=['#a8793f','#c9a066','#8a6a42','#b5803f'];pools.push(vp,vp,['Супермаркет','Торговый центр','Автосалон','Аптека','Супермаркет','Мойка','Торговый центр','Автосервис'],['Школа','Дом','Почта','Дом','Аптека','Школа','Дом','Кафе «У Гены»']);dc.push(vc,vc,['#6c8aa0','#a4a69f','#b9b6ab','#8aa0a8'],['#a8583f','#b9b6ab','#c8c3b2','#9c4a3a']);mats.push('wood','wood','panel','brick');pc.push(0,0,0);
const solid=(x,y)=>{const a=x/T|0,b=y/T|0;return a<0||b<0||a>=W||b>=H||(g[b][a]>=3&&g[b][a]!=6)};
const free=(x,y)=>!(solid(x-7,y)||solid(x+7,y)||solid(x-7,y-6)||solid(x+7,y-6));
const MAPD=['VVRFFPGGMMFF','VRMCPPGGGFFF','VRPCCDGGDFFF','FHHHDDIPXWFF','FSSSSIIIXRFF','FFFFMMIIIIFF'],PI={G:0,D:1,R:2,I:3,V:4,M:6,C:7,X:3},BR=new Set();
const cellL=(bx,by)=>(MAPD[by]||'')[bx]||'F',landC=(bx,by)=>bx>=0&&by>=0&&bx<12&&by<6&&'WS'.indexOf(cellL(bx,by))<0;
const RV=[[56,-5,12],[58,2,12],[60,7,11],[68,15,10],[77,25,7],[86,33,6],[92,41,6],[97,50,6],[101,61,6],[106,69,7],[115,76,9],[128,82,12],[142,92,16]],rv=new Uint8Array(W*H);
for(let y=0;y<H;y++)for(let x=0;x<W;x++){let m=99;for(let i=0;i<RV.length-1;i++){const[a,b,r1]=RV[i],[c,d,r2]=RV[i+1],dx=c-a,dy=d-b;let u=((x-a)*dx+(y-b)*dy)/(dx*dx+dy*dy);u=Math.max(0,Math.min(1,u));const q=Math.hypot(x-a-u*dx,y-b-u*dy)-(r1+(r2-r1)*u);if(q<m)m=q}if(m<0)rv[y*W+x]=1}
for(let by=0;by<6;by++)for(let bx=0;bx<12;bx++){const L=cellL(bx,by),x0=3+15*bx,y0=3+15*by,pi=PI[L];
 for(let y=0;y<12;y++)for(let x=0;x<12;x++)g[y0+y][x0+x]=(x%11==0||y%11==0)?2:0;
 if(L=='W'||L=='S'){for(let y=0;y<12;y++)for(let x=0;x<12;x++)g[y0+y][x0+x]=5;if(L=='S'&&RR()<.8)props.push({k:'boat',x:(x0+2+(RR()*8|0))*T+16,y:(y0+3+(RR()*6|0))*T+24,r:RR()});continue}
 if(L=='H'){for(let y=0;y<12;y++)for(let x=0;x<12;x++)g[y0+y][x0+x]=y<4?2:((x==2||x==3||x==6||x==7||x==10)&&y<10)?2:5;for(let k=0;k<3;k++)props.push({k:'lamp',x:(x0+2+k*4)*T+16,y:(y0+1)*T+20});props.push({k:'bench',x:(x0+5)*T+16,y:(y0+3)*T+20},{k:'boat',x:(x0+4)*T+16,y:(y0+7)*T+24,r:RR()},{k:'boat',x:(x0+9)*T+16,y:(y0+8)*T+24,r:RR()});continue}
 if(L=='P'||L=='F'){for(let y=0;y<12;y++)for(let x=0;x<12;x++)g[y0+y][x0+x]=0;if(L=='P'&&(bx+by)%2==0)for(let y=4;y<8;y++)for(let x=4;x<8;x++)g[y0+y][x0+x]=5;const nT=L=='P'?44:30;for(let i=0;i<nT;i++){const a=x0+(RR()*12|0),b2=y0+(RR()*12|0);if(g[b2][a]==0){g[b2][a]=3;trees.push([a,b2])}}if(L=='P')props.push({k:'bench',x:(x0+3)*T+16,y:(y0+2)*T+20},{k:'lamp',x:(x0+9)*T+16,y:(y0+2)*T+20});continue}
 for(let k=0;k<3;k++)props.push({k:'lamp',x:(x0+2+k*4)*T+16,y:(y0)*T+20});
 props.push({k:'bench',x:(x0+3)*T+16,y:(y0+11)*T+20},{k:'bench',x:(x0+8)*T+16,y:(y0+11)*T+20},{k:'bin',x:(x0+6)*T+16,y:(y0+11)*T+24,t:0},{k:'bin',x:(x0+11)*T+20,y:(y0+5)*T+24,t:0});
 let c0=x0+1;while(c0<x0+10){let w=3+(RR()*3|0);if(L=='D'||L=='R'||L=='C')w=Math.max(w,4);if(L=='X')w=Math.max(w,5);if(c0+w>x0+11)w=x0+11-c0;if(w<3)break;
  if(L=='V'&&RR()<.35){c0+=w+1;continue}
  const hh=L=='D'?5+(RR()*3|0):(L=='R'||L=='C')?5+(RR()*2|0):L=='X'?6+(RR()*3|0):4+(RR()*3|0),bt=y0+7+(RR()*3|0),pl=pools[pi],nm=pl[pc[pi]++%pl.length],cs=dc[pi],by2=bt-hh+1;
  let wet=0;for(let y=by2;y<=bt+1;y++)for(let x=c0;x<c0+w;x++)if(rv[y*W+x])wet=1;
  if(wet){c0+=w+1;continue}
  const b={x:c0,y:by2,w,h:hh,m:mats[pi],c:cs[RR()*cs.length|0],rc:['#4a3b36','#3f4a52','#5a4a40','#444'][RR()*4|0],aw:awc[RR()*5|0],n:nm,sd:RR()};B.push(b);
  for(let y=0;y<b.h;y++)for(let x=0;x<b.w;x++)g[b.y+y][b.x+x]=3;
  const d=b.w>>1;g[bt][b.x+d]=4;b.dx=(b.x+d)*T+16;b.dy=(bt+1)*T+8;c0+=w+(RR()<.3?1:0)}
 for(let i=0;i<5;i++){const a=x0+1+(RR()*10|0),b2=y0+9+(RR()*2|0);if(g[b2][a]==0)trees.push([a,b2])}
 if(L=='C'||L=='R')for(let i=0;i<10;i++){const a=x0+1+(RR()*10|0),b2=y0+1+(RR()*4|0);if(g[b2][a]==0)trees.push([a,b2])}}
// дороги через воду убираем, мосты оставляем
for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(g[y][x]!=1)continue;const bx=x/15|0,by=y/15|0,xs=x%15<3?[bx-1,bx]:[bx],ys=y%15<3?[by-1,by]:[by];let ok=0;for(const a of xs)for(const b of ys)if(landC(a,b))ok=1;if(!ok)g[y][x]=5}
const BRW=[30,45,60,75];
for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(rv[y*W+x]){if(g[y][x]==1&&y%15<3&&BRW.includes(y-y%15))BR.add(y*W+x);else g[y][x]=5}
for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(g[y][x]==0&&(g[y-1][x]==5||g[y+1][x]==5||g[y][x-1]==5||g[y][x+1]==5)&&h(x,y)>.25)g[y][x]=6;
for(let i=trees.length;i--;){const q=trees[i];if(g[q[1]][q[0]]==5)trees.splice(i,1)}
for(let i=props.length;i--;){const p=props[i],v=g[Math.min(H-1,(p.y-4)/T|0)][Math.min(W-1,p.x/T|0)];if(p.k=='boat'?v!=5:v==5)props.splice(i,1)}
const ISX=[];for(let j=0;j<H/15;j++)for(let k=0;k<W/15;k++){const x=15*k+1,y=15*j+1;ISX.push(g[y][x]==1&&((x>1&&g[y][x-2]==1)||g[y][x+4]==1)&&((y>1&&g[y-2][x]==1)||g[y+4][x]==1))}
const DNM={G:'Старый центр',D:'Финансовый квартал',R:'Спальный район',I:'Промзона',V:'Пригород',M:'Торговый район',C:'Университет',X:'Заводской район',P:'Парки',F:'Окраина',H:'Гавань',W:'Река Серпантин',S:'Бухта'};
function distName(x,y){const tx=Math.max(0,Math.min(W-1,x/T|0)),ty=Math.max(0,Math.min(H-1,y/T|0));if(rv[ty*W+tx])return 'Река Серпантин';return DNM[cellL(tx/15|0,ty/15|0)]||'Брокевиль'}
const MLB=[[0,0,'Пригороды'],[2,1,'Торг. площадь'],[3,1,'Университет'],[4,3,'Финансовый кв.'],[2,3,'Гавань'],[2,4,'Бухта'],[7,1,'Старый центр'],[5,4,'Промзона'],[8,3,'Химзавод'],[7,5,'Логистика'],[4,1,'р. Серпантин'],[5,0,'Парки'],[2,2,'Парки'],[8,0,'Ритейл'],[10,4,'Юго-восток']];
const SEG=[];for(let k=0;k<H/15;k++){const r=15*k+1;let a=-1;for(let x=0;x<=W;x++){const ok=x<W&&g[r][x]==1;if(ok&&a<0)a=x;if(!ok&&a>=0){if(x-a>=14)SEG.push({ax:0,k,a:a*T,b:x*T});a=-1}}}
for(let k=0;k<W/15;k++){const c=15*k+1;let a=-1;for(let y=0;y<=H;y++){const ok=y<H&&g[y][c]==1;if(ok&&a<0)a=y;if(!ok&&a>=0){if(y-a>=14)SEG.push({ax:1,k,a:a*T,b:y*T});a=-1}}}
const cars=[];for(let i=0;i<46;i++){const s=SEG[RR()*SEG.length|0],d=i%3?1:-1;cars.push({ax:s.ax,d,s:45+RR()*30,c:['#c0392b','#2e86c1','#f1c40f','#ecf0f1','#27ae60','#8e44ad'][i%6],p:s.a+80+RR()*(s.b-s.a-160),l:(15*s.k+(d>0?0:2))*T+16,ty:i%5,st:0,v:0,br:0,k0:15*s.k,a:s.a+64,b:s.b-64})}
const SB=B.find(b=>b.n.startsWith('Кафе')&&b.x>=90&&b.x<135&&b.y<45)||B[0];
let apt={own:0,it:{}},OLDSV=0;px=SB.dx;py=SB.dy+14;

try{const q=JSON.parse(localStorage.getItem('brk2')||'null');if(q&&(q.sv||0)>SV)noSave=1;if(q&&!noSave){({money,mins,en,goods,debt,own,stock,till,scoot,style,skill}=q);if((q.sv||0)>=9){px=q.x;py=q.y}else OLDSV=1;if(q.apt)apt=q.apt;if(Array.isArray(q.inv))inventory=q.inv;if(q.ph&&q.ph.msgs)phone=q.ph;if(q.emp)emp=q.emp;heat=q.heat||0;if(q.dk&&q.dk.pots)dk=q.dk;q.c.forEach((a,i)=>{coins[i].a=a[0];coins[i].p=a[1]})}}catch(e){}
if(OLDSV){if(apt.own)money+=200;apt={own:0,it:apt.it||{}};phone.msgs.unshift(['Мэрия','Город перепланирован по новому генплану! Прежняя квартира выкуплена, 200 € возвращены.','08:00'])}
// жители с ИИ
const P=[['Гена','владелец кафе «У Гены», 54 года','ворчливый, но добрый, любит байки и дешёвые обеды'],
['Лиза','курьер на самокате, 22 года','быстрая, шутливая, знает короткие пути'],
['Борис','хозяин ломбарда, 61 год','хитрый, торгуется по любому поводу'],
['Нина','продавщица в аптеке, 38 лет','заботливая, всё знает про слухи района'],
['Макс','студент и начинающий крипто-трейдер, 20 лет','азартный, вечно без денег, сыплет «советами»'],
['Тамара','пенсионерка с лавочки, 72 года','любопытная болтушка, помнит город лучше всех'],
['Рустам','водитель такси, 45 лет','циничный, философ, жалуется на пробки'],
['Ира','блогер, 26 лет','болтливая, ищет сюжеты для видео']];
const nm2=['Антон','Оля','Витя','Света','Паша','Катя','Денис','Юля','Миша','Аня','Егор','Вера','Олег','Дана','Стас','Рита','Кирилл','Зоя','Лёва','Мила'],jb=['охранник','студентка','рабочий завода','бариста','таксист','почтальон','строитель','продавец','художник','бухгалтер'],tr2=['весёлый','угрюмый','любопытный','жадный','добрый','саркастичный'];
nm2.forEach((n,i)=>P.push([n,jb[i%10]+', '+(18+(i*7)%45)+' лет',tr2[i%6]]));
const cols=['#c0392b','#2e86c1','#7d3c98','#d4ac0d','#27ae60','#e67e22','#16a085','#d35400'];
const hairs=['#2b1b12','#d8b25a','#999','#5a3a22','#111'];
const FEM=new Set(['Лиза','Нина','Тамара','Ира','Оля','Света','Катя','Юля','Аня','Вера','Дана','Рита','Зоя','Мила']);
const NP=P.map((p,i)=>{let x,y,a=0;do{const fx=i<20?90+h(i,5+a)*45:h(i,5+a)*W,fy=i<20?h(i,9+a*3)*45:h(i,9+a*3)*H;x=(fx|0)*T+16;y=(fy|0)*T+24;a++}while(a<800&&(solid(x,y)||g[y/T|0][x/T|0]!=2));
 const o={g:FEM.has(p[0])?1:0,bd:!FEM.has(p[0])&&i%3==0,n:p[0],j:p[1],tr:p[2],x,y,c:i<8?cols[i]:'hsl('+(i*47%360)+',55%,45%)',hr:hairs[i%5],vx:0,vy:0,tm:0,d:0,h:[]};return o});
try{const q=JSON.parse(localStorage.getItem('brk3')||'null');if(q){Object.assign(veh,q.v);PG=q.pg|0;veh.on=0;if(OLDSV){veh.x=px+30;veh.y=py}}}catch(e){}
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
// рисование
function bld(b,dark){const x=b.x*T,y=b.y*T,w=b.w*T,H2=b.h*T,fy=y+48,fh=H2-48,m=b.m,dcl=b.w>>1,n=b.n,s=b.sd,K=kind(n),mid=x+w/2,night=dark>.2,
 R=(k,X,Y,W,H)=>{cx.fillStyle=k;cx.fillRect(X,Y,W,H)},tri=(k,a,b2,c2,d2,e,f)=>{cx.fillStyle=k;cx.beginPath();cx.moveTo(a,b2);cx.lineTo(c2,d2);cx.lineTo(e,f);cx.fill()},
 smoke=(X,Y)=>{cx.fillStyle='rgba(200,200,200,.35)';for(let i=0;i<3;i++){cx.beginPath();cx.arc(X+Math.sin(t+i)*4+i*3,Y-((t*10+i*9)%26),4+i,0,7);cx.fill()}};
 R(b.c,x,fy,w,fh);
 if(m=='brick'){cx.fillStyle='rgba(0,0,0,.15)';for(let r=0;r<fh;r+=4){cx.fillRect(x,fy+r,w,1);for(let k=(r/4%2)*4;k<w;k+=8)cx.fillRect(x+k,fy+r,1,4)}}
 else if(m=='panel'){cx.fillStyle='rgba(0,0,0,.16)';for(let k=0;k<w;k+=32)cx.fillRect(x+k,fy,1,fh);for(let r=0;r<fh;r+=32)cx.fillRect(x,fy+r,w,1)}
 else if(m=='glass'){cx.fillStyle='rgba(255,255,255,.2)';for(let k=0;k<w;k+=26)cx.fillRect(x+k+4,fy,9,fh);cx.fillStyle='rgba(0,0,0,.12)';for(let r=0;r<fh;r+=24)cx.fillRect(x,fy+r,w,1)}
 else if(m=='wood'){cx.fillStyle='rgba(0,0,0,.2)';for(let r=0;r<fh;r+=8)cx.fillRect(x,fy+r,w,1)}
 else{cx.fillStyle='rgba(0,0,0,.2)';for(let k=0;k<w;k+=6)cx.fillRect(x+k,fy,2,fh)}
 R('rgba(0,0,0,.12)',x,fy+fh*.6,w,fh*.4);R('rgba(0,0,0,.26)',x+w,fy+3,6,fh-3);R('rgba(255,255,255,.12)',x,fy,2,fh);R('#77746c',x-2,y+H2-7,w+4,7);
 const gab=m=='wood'||n=='Пиццерия'||n.startsWith('Кафе'),ind=n=='Завод'||n=='Склад',cls=n=='Крипто-банк'||n=='Школа'||n=='Отель'||n=='Кинотеатр'||n=='Казино';
 if(gab){R(b.rc,x-3,y+40,w+6,10);tri(b.rc,x-8,y+50,mid,y-14,x+w+8,y+50);tri('rgba(0,0,0,.22)',mid,y-14,x+w+8,y+50,mid,y+50);cx.strokeStyle='rgba(0,0,0,.25)';cx.lineWidth=1;
  for(let r=0;r<5;r++){const yy=y+r*9+4,hw=(yy-(y-14))/64*(w/2+8);cx.beginPath();cx.moveTo(mid-hw,yy);cx.lineTo(mid+hw,yy);cx.stroke()}
  if(w>=128){R('#2a2f3a',mid-9,y+16,18,16);R(night?'#ffd36b':'#9fc4d8',mid-7,y+18,14,12)}
  if(s>.4){R('#6a4a3a',x+w-28,y+2,10,24);smoke(x+w-23,y+2)}}
 else if(ind){R(b.rc,x-3,y+24,w+6,26);for(let k=0;k<w;k+=32){tri('#4a4f55',x+k,y+24,x+k,y+6,x+k+32,y+24);R('#8fc0d8',x+k,y+8,3,16)}R('#5a4a40',x+10,y-16,12,36);R('#5a4a40',x+w-24,y-8,12,28);smoke(x+16,y-16);smoke(x+w-18,y-8)}
 else if(cls){R('#d9d4c4',x-3,y+30,w+6,20);tri('#d9d4c4',x-3,y+30,mid,y+4,x+w+3,y+30);tri(b.rc,x+8,y+30,mid,y+12,x+w-8,y+30);cx.fillStyle='#e8c24a';cx.beginPath();cx.arc(mid,y+24,4,0,7);cx.fill();
  R('#e8e4d6',x+3,fy,5,fh);R('#e8e4d6',x+w-8,fy,5,fh);R('rgba(0,0,0,.15)',x+7,fy,1,fh);
  if(n=='Школа'){R('#b9b6ab',mid-12,y-22,24,30);R(b.rc,mid-15,y-28,30,8);cx.fillStyle='#fff';cx.beginPath();cx.arc(mid,y-8,8,0,7);cx.fill();cx.strokeStyle='#222';cx.lineWidth=1.5;const am=mins%60/60*6.2832-1.5708,ah=(mins/60%12)/12*6.2832-1.5708;cx.beginPath();cx.moveTo(mid,y-8);cx.lineTo(mid+Math.cos(am)*7,y-8+Math.sin(am)*7);cx.moveTo(mid,y-8);cx.lineTo(mid+Math.cos(ah)*4,y-8+Math.sin(ah)*4);cx.stroke()}}
 else{R(b.rc,x-3,y+8,w+6,42);R('rgba(255,255,255,.16)',x-3,y+8,w+6,4);R('rgba(0,0,0,.28)',x-3,y+12,w+6,3);R('rgba(0,0,0,.18)',x+4,y+16,w-8,14);
  if(s<.5){R('#8c9198',x+8,y+14,20,14);cx.strokeStyle='#222';cx.lineWidth=1.5;const a=t*8;cx.beginPath();cx.arc(x+18,y+21,5,0,7);cx.moveTo(x+18,y+21);cx.lineTo(x+18+Math.cos(a)*5,y+21+Math.sin(a)*5);cx.stroke()}
  if(s>.3&&s<.8){cx.strokeStyle='#bbb';cx.lineWidth=1.5;cx.beginPath();cx.moveTo(x+w-14,y+26);cx.lineTo(x+w-14,y-2);cx.moveTo(x+w-20,y+6);cx.lineTo(x+w-8,y+6);cx.stroke()}
  if(s>.55&&s<.7){R('#7a5a3a',x+w-46,y-8,16,20);R('#444',x+w-46,y,16,2);tri('#5a3a28',x+w-48,y-8,x+w-38,y-14,x+w-28,y-8)}
  if(s>.7||m=='metal'){R('#6a4a3a',x+w-30,y-8,10,28);smoke(x+w-25,y-8)}}
 const K2=K=='home'||K=='work';R('#111',x+3,y+28,w-6,19);R({food:'#5a2e20',shop:'#243a52',work:'#33383d',fun:'#3a1f4d',home:'#3a3a40'}[K]||'#243a52',x+4,y+29,w-8,17);
 cx.fillStyle=night&&K!='home'?'#ffe9a0':'#f6efe0';cx.font='bold 11px system-ui';cx.textAlign='center';cx.fillText(n,mid,y+42);
 const dec={'Пиццерия':()=>{const Y2=y-6+Math.sin(t*2)*2;cx.fillStyle='#e9a23b';cx.beginPath();cx.arc(mid,Y2,13,0,7);cx.fill();cx.fillStyle='#c0392b';for(let q=0;q<5;q++){cx.beginPath();cx.arc(mid+Math.cos(q*1.26)*7,Y2+Math.sin(q*1.26)*7,2.4,0,7);cx.fill()}},
  'Аптека':()=>{if((t*2|0)%2||!night){R('#27ae60',x+w-22,y+14,14,5);R('#27ae60',x+w-17.5,y+9,5,15)}},
  'Кинотеатр':()=>{for(let q=0;q<w/8;q++){const o=((t*5|0)+q)%2;R(o?'#ffd23f':'#7a5a1a',x+q*8+3,y+29,3,3);R(o?'#7a5a1a':'#ffd23f',x+q*8+3,y+43,3,3)}},
  'Казино':()=>{for(let q=0;q<w/8;q++){const c=['#ff4d6d','#ffd23f','#4dd2ff'][((t*6|0)+q)%3];R(c,x+q*8+3,y+29,3,3);R(c,x+q*8+3,y+43,3,3)}},
  'Отель':()=>{R('#bbb',x+10,y-26,2,40);for(let q=0;q<16;q+=2)R(b.aw,x+12+q,y-26+Math.sin(t*4+q*.4)*1.5,2,9)},
  'Крипто-банк':()=>{cx.fillStyle='#f7931a';cx.beginPath();cx.arc(x+w-16,y+4,9,0,7);cx.fill();cx.fillStyle='#fff';cx.font='bold 12px system-ui';cx.fillText('₿',x+w-16,y+8)},
  'Автосалон':()=>{for(let q=0;q<w;q+=8)R(q%16?'#e74c3c':'#f1c40f',x+q,y+20+(q%16?2:0),6,5)},
  'Бар':()=>{if((t*3|0)%7){R('#ff3b8a',x+w-20,y+8,3,13);R('#ff3b8a',x+w-24,y+8,11,3)}},
  'Почта':()=>{R('#f1c40f',x+w-24,y+10,16,11);R('#a07c10',x+w-24,y+10,16,2)},
  'Мойка':()=>{cx.fillStyle='rgba(255,255,255,.7)';for(let q=0;q<4;q++){cx.beginPath();cx.arc(x+10+q*16+Math.sin(t*2+q)*3,y+10-((t*12+q*7)%16),3,0,7);cx.fill()}}};
 (dec[n]||(n.startsWith('Кафе')?()=>smoke(x+10,y+2):null))?.();
 const nr=Math.max(1,((fh-54)/38)|0),sf=!K2;
 for(let r=0;r<nr;r++)for(let k=0;k<b.w;k++){const last=r==nr-1;if(last&&(k==dcl||sf))continue;const wx=x+k*32+7,wy=fy+10+r*38,v=h(b.x*3+k,r+b.y),lit=night&&v>.45,hm=K=='home'||m=='wood'||m=='brick',gl=lit?'#ffd36b':(m=='glass'?'#6fa0c0':'#9fc4d8');
  if(v<.3&&hm){cx.fillStyle='#2a2f3a';cx.beginPath();cx.arc(wx+9,wy,11,Math.PI,0);cx.fill();R('#2a2f3a',wx-2,wy,22,22);cx.fillStyle=gl;cx.beginPath();cx.arc(wx+9,wy,9,Math.PI,0);cx.fill();R(gl,wx,wy,18,20)}
  else{R('#2a2f3a',wx-2,wy-2,22,24);R(gl,wx,wy,18,20)}
  if(hm){R('#2a2f3a',wx+8,wy,2,20);R('#2a2f3a',wx,wy+9,18,2)}
  if(!lit)R('rgba(255,255,255,.28)',wx+2,wy+2,5,10);else{R('rgba(190,80,70,.5)',wx,wy,5,20);if(v>.7){R('rgba(60,40,30,.6)',wx+8,wy+7,5,5);R('rgba(60,40,30,.6)',wx+6,wy+12,9,8)}}
  if(v>=.3&&v<.5&&hm){R(b.aw,wx-6,wy-1,5,22);R(b.aw,wx+19,wy-1,5,22)}
  R('#d8d4c8',wx-3,wy+20,24,3);
  if(v>.8&&r>0&&(K=='home'||m=='panel')){R('#444',wx-5,wy+20,28,3);for(let q=0;q<7;q++)R('#444',wx-4+q*4,wy+13,1,8);R('rgba(0,0,0,.25)',wx-5,wy+23,28,4);R('#3c8040',wx+14,wy+14,6,5)}}
 if(sf){const gy=y+H2-44;for(let k=0;k<b.w;k++){if(k==dcl)continue;const gx=x+k*32+2;R('#222',gx-1,gy-1,30,36);R(night?'#ffe9a8':'#2d4254',gx,gy,28,34);
   for(let q=0;q<3;q++){const hq=6+((b.y+k*q)%3)*3;R(['#c0392b','#f1c40f','#2e86c1','#27ae60'][(b.x+k+q)%4],gx+3+q*9,gy+26-hq,7,hq)}R('#111',gx,gy+26,28,2);R('rgba(255,255,255,.22)',gx+3,gy+2,5,28);R('rgba(255,255,255,.1)',gx+11,gy+2,3,28)}
  for(let k=0;k<w;k+=8){const c=(k/8)%2?'#f2efe6':b.aw;R(c,x+k,y+H2-52,8,8);cx.fillStyle=c;cx.beginPath();cx.arc(x+k+4,y+H2-44,4,0,Math.PI);cx.fill()}}
 else for(let k=0;k<5;k++)R(k%2?'#fff':b.aw,(b.x+dcl)*T-4+k*8,y+H2-52,8,9);
 const dx=(b.x+dcl)*T,d0=y+H2-42,op=b.dop>t;R('#2a2018',dx,d0-2,32,44);R(op?'#1a120c':(K=='home'?['#6a4a3a','#3a5a6a','#5a3a4a'][(s*9|0)%3]:'#3a2a20'),dx+2,d0,28,42);
 if(op){R('rgba(255,207,106,.5)',dx+8,d0+4,16,38);R('#5a3a28',dx+2,d0,6,42)}else{if(sf)R('rgba(150,200,220,.5)',dx+6,d0+4,20,22);R('#d9b24a',dx+24,d0+22,3,3);R('rgba(255,255,255,.15)',dx+4,d0+2,3,38)}
 R('#8a8a84',dx-2,y+H2-3,36,3);R('#222',dx+14,d0-10,4,6);
 if(night){R('#ffe9a0',dx+13,d0-6,6,3);cx.fillStyle='rgba(255,224,138,.16)';cx.beginPath();cx.arc(dx+16,d0+4,26,0,7);cx.fill()}
 if(K=='home'){cx.fillStyle='#fff';cx.font='bold 8px system-ui';cx.textAlign='center';cx.fillText('№'+(b.x+b.y),dx+16,d0-13)}
 if(s>.4){R('#8a4a2a',dx-10,y+H2-12,8,10);R('#3c8040',dx-11,y+H2-20,10,9)}}

// ===== v5: люди м/ж =====
function person(x,y,c,hr,d,f,mv,G,bd){const s=mv?(f?2:-2):0,sk='#e8b98e',R=(k,X,Y,W,H)=>{cx.fillStyle=k;cx.fillRect(X,Y,W,H)};
 cx.fillStyle='rgba(0,0,0,.3)';cx.beginPath();cx.ellipse(x,y,9,3,0,0,7);cx.fill();
 if(G&&d!=0)R(hr,x-6,y-43,12,d==1?21:16);
 if(G){R(sk,x-4,y-10,3,9+(s>0?-1:0));R(sk,x+1,y-10,3,9+(s>0?0:-1));R('#a33',x-6,y-2+(s>0?-1:0),5,2);R('#a33',x+1,y-2,5,2)}
 else{R('#2b2f4a',x-5,y-13,4,13+(s>0?-1:0));R('#2b2f4a',x+1,y-13,4,s>0?13:12);R('#111',x-6,y-2+(s>0?-1:0),5,2);R('#111',x+1,y-2,5,2)}
 if(G){R(c,x-5,y-30,10,13);R('rgba(255,255,255,.2)',x-5,y-30,10,3);const w=Math.sin(t*12)*(mv?1:0);R(c,x-6,y-19,12,3);R(c,x-8+w,y-16,16,6);R('rgba(255,255,255,.25)',x-8+w,y-11,16,1);R(c,x-8,y-29+s/2,3,11);R(c,x+5,y-29-s/2,3,11);R(sk,x-8,y-18+s/2,3,3);R(sk,x+5,y-18-s/2,3,3)}
 else{R(c,x-7,y-30,14,18);R('rgba(0,0,0,.18)',x-7,y-16,14,4);R('#222',x-7,y-14,14,2);R(c,x-10,y-29+s/2,3,12);R(c,x+7,y-29-s/2,3,12);R(sk,x-10,y-18+s/2,3,3);R(sk,x+7,y-18-s/2,3,3)}
 R(sk,x-5,y-41,10,11);
 if(G){R(hr,x-6,y-43,12,d==1?13:6);if(d!=1){R(hr,x-6,y-41,2,12);R(hr,x+4,y-41,2,12);R(hr,x-4,y-38,8,2)}R('#ff6fa8',x+2,y-45,4,3)}
 else R(hr,x-5,y-42,10,d==1?9:4);
 if(d!=1){const o=d==2?-2:d==3?2:0;R('#fff',x-4+o,y-37,3,3);R('#fff',x+1+o,y-37,3,3);R('#222',x-3+o,y-36,2,2);R('#222',x+2+o,y-36,2,2);
  if(G){R('#222',x-4+o,y-38,3,1);R('#222',x+1+o,y-38,3,1);R('#d2455e',x-1+o,y-32,3,1)}else{R('#3a2a1a',x-4+o,y-39,3,1);R('#3a2a1a',x+1+o,y-39,3,1);if(bd)R(hr,x-4+o,y-33,8,3)}}}
// ===== v5: светофоры/машины =====
let veh={own:0,on:0,x:0,y:0,hp:100,f:100,v:0,d:0,col:'#c0392b',ct:0,lt:0},PG=0,shk=0,DN=0,FL=1,hitT=0;
const lt=ax=>{const p=t%12;return ax==0?(p<.5?'r':p<5.5?'g':p<6?'y':'r'):(p<6.5?'r':p<11.5?'g':'y')};
const cwAx=(x,y)=>{if(x<0||y<0||x>=W||y>=H||g[y][x]!=1)return -1;const a=x%15,b=y%15;if(b<3&&(a==3||a==14))return 0;if(a<3&&(b==3||b==14))return 1;return -1};
const pw=(x,y,n)=>{const tx=x/T|0,ty=y/T|0;if(tx<0||ty<0||tx>=W||ty>=H)return 0;const v=g[ty][tx];if(v%2==0)return 1;const a=cwAx(tx,ty);return a>=0&&(cwAx(n.x/T|0,n.y/T|0)>=0||lt(a)=='r')};
const cbox=(X,Y,ax)=>ax==0?[X-22,Y-14,X+22,Y+8]:[X-11,Y-20,X+11,Y+18];
const ov=(a,b)=>a[0]<b[2]&&a[2]>b[0]&&a[1]<b[3]&&a[3]>b[1];
function carStep(c,dt){const L=(c.ax?H:W)*T,Zs=15*T,X=c.ax?c.l:c.p,Y=c.ax?c.p:c.l;let sp=c.s;
 if(t<c.st)sp=0;else{const m=((c.p%Zs)+Zs)%Zs;let dist=1e9;if(c.d>0){if(m>=3*T)dist=Zs-m-T-24}else if(m>=4*T)dist=m-4*T-24;
  const L1=lt(c.ax);if(L1!='g'&&dist<56&&dist>-4&&!(L1=='y'&&dist<14))sp*=Math.max(0,dist)/56;
  const pp=(ux,uy)=>{const dp=(c.ax?uy-Y:ux-X)*c.d,la=Math.abs(c.ax?ux-X:uy-Y);if(dp>-6&&dp<64&&la<20)sp=Math.min(sp,Math.max(0,(dp-30)/34)*c.s)};
  for(const n of NP)if(!(n.in>t)&&Math.abs(n.x-X)<90&&Math.abs(n.y-Y)<90)pp(n.x,n.y);pp(px,py);
  for(const o of cars)if(o!=c&&o.ax==c.ax&&o.d==c.d&&Math.abs(o.l-c.l)<4){const gp=(((o.p-c.p)*c.d)%L+L)%L;if(gp<80)sp=Math.min(sp,Math.max(0,(gp-50)/30)*c.s)}}
 c.br=sp<c.v-2;c.v+=(sp-c.v)*Math.min(1,dt*(sp<c.v?5:2));{let np=c.p+c.d*c.v*dt;if(np<c.a||np>c.b){c.d=-c.d;c.l=(c.k0+(c.d>0?0:2))*T+16;c.v*=.3;np=Math.max(c.a,Math.min(c.b,np))}c.p=np}
 if(!veh.on&&c.v>12&&t>hitT&&Math.abs(X-px)<40&&Math.abs(Y-py)<40&&ov(cbox(X,Y,c.ax),[px-6,py-14,px+6,py])){hitT=t+1.6;en=Math.max(0,en-18);shk=.3;c.st=t+1.5;toast('🚑 Тебя задела машина! −18⚡');if(c.ax){const q=px+(px<X?-16:16);if(free(q,py))px=q}else{const q=py+(py<Y?-16:16);if(free(px,q))py=q}}}
function crash(c){const V=veh;if(t<V.ct)return;V.ct=t+1.2;const dm=Math.min(30,5+Math.abs(V.v)/9);V.hp=Math.max(0,V.hp-dm);money=Math.max(0,money-20);shk=.45;if(c)c.st=t+3;toast('💥 Авария! кузов −'+(dm|0)+'%, штраф 20 €');V.v=0}
function blk(x,y,d){const V=veh,ax=d<2?1:0,b=cbox(x,y,ax),mx=(b[0]+b[2])/2,my=(b[1]+b[3])/2;
 for(const[u,w]of[[b[0],b[1]],[b[2],b[1]],[b[0],b[3]],[b[2],b[3]],[mx,b[1]],[mx,b[3]],[b[0],my],[b[2],my]])if(solid(u,w))return 1;
 for(const c of cars){const X=c.ax?c.l:c.p,Y=c.ax?c.p:c.l;if(Math.abs(X-x)<60&&Math.abs(Y-y)<60&&ov(b,cbox(X,Y,c.ax))){crash(c);return 1}}return 0}
function drive(vx,vy,l,dt){const V=veh;if(l>1){vx/=l;vy/=l}const run=V.f>0&&V.hp>0,tg=run&&l>.15?Math.min(1,l)*175:0;
 if(l>.15)V.d=Math.abs(vx)>Math.abs(vy)?(vx<0?2:3):(vy<0?1:0);
 V.v+=(tg-V.v)*Math.min(1,dt*(tg?1.6:2.4));if(V.v<2&&!tg)V.v=0;
 const d=V.d,dx=d==2?-1:d==3?1:0,dy=d==0?1:d==1?-1:0,mv2=V.v*dt,nx=px+dx*mv2,ny=py+dy*mv2;
 if(!blk(nx,ny,d)){px=nx;py=ny;V.f=Math.max(0,V.f-mv2*.0016)}else if(V.v>30)V.v*=-.2;else V.v=0;
 if(V.f<=0&&V.v<2&&t>V.lt){V.lt=t+8;toast('⛽ Бензин кончился — заправка в автосервисе')}
 const tx=px/T|0,ty=py/T|0,ax=d<2?1:0;if(tx%15<3&&ty%15<3&&V.v>35&&lt(ax)=='r'&&t>V.lt){V.lt=t+6;money=Math.max(0,money-40);toast('📸 Красный свет! Штраф 40 €')}
 for(const n of NP)if(!(n.in>t)&&t>(n.hit||0)&&V.v>45&&Math.hypot(n.x-px,n.y-6-py)<20){n.hit=t+6;money=Math.max(0,money-150);V.hp=Math.max(0,V.hp-6);shk=.35;V.v*=.4;n.bt=t+3;n.bs='Ай!';n.tm=2;n.vx=n.vy=0;toast('🚨 Сбил прохожего! Штраф 150 €')}}
function drawCar(X,Y,ax,d,col,ty,v,br,hp){const R=(k,x,y,w,h)=>{cx.fillStyle=k;cx.fillRect(x,y,w,h)},GL='#9fd0e8',tl=br?'#ff3b30':'#8c1d18',s=d>0?1:-1;
 if(ax==0){const fx=s>0?X+19:X-22,rx=s>0?X-22:X+19,cw=[22,26,22,36,16][ty],ch=[8,8,8,10,6][ty],top=Y-6-ch,cc=X-cw/2-3*s;
  R('rgba(0,0,0,.3)',X-23,Y+6,46,5);R('#111',X-16,Y+3,9,6);R('#111',X+8,Y+3,9,6);R('#9a9a9a',X-13,Y+5,3,3);R('#9a9a9a',X+11,Y+5,3,3);
  R(col,X-22,Y-6,44,13);R('rgba(0,0,0,.25)',X-22,Y+3,44,4);R('rgba(255,255,255,.22)',X-22,Y-6,44,2);
  R(col,cc,top,cw,ch);R('rgba(255,255,255,.18)',cc,top,cw,2);R(GL,cc+2,top+2,cw-4,ch-3);R(col,cc+cw/2-1,top+2,2,ch-3);
  if(ty==2){R('#ffd23f',X-22,Y-1,44,2);R('#ffd23f',X-4,top-3,8,3)}
  R('#fff6b0',fx,Y-4,3,4);R(tl,rx,Y-4,3,4);R('#222',X-22,Y+5,44,2);
  if(DN>.2){cx.fillStyle='rgba(255,240,170,.13)';cx.beginPath();cx.moveTo(fx+(s>0?3:0),Y-3);cx.lineTo(fx+s*42,Y-13);cx.lineTo(fx+s*42,Y+9);cx.fill()}
  if(hp<60){R('rgba(0,0,0,.4)',X-6,Y-3,8,2);R('rgba(0,0,0,.4)',X+6,Y,5,2)}}
 else{const yy=(a,h)=>s>0?Y+a:Y-a-h;
  R('rgba(0,0,0,.3)',X-12,Y+16,24,5);for(const a of[9,-15]){R('#111',X-13,yy(a,8),3,8);R('#111',X+10,yy(a,8),3,8)}
  R(col,X-11,Y-19,22,38);R('rgba(0,0,0,.2)',X-11,Y-19,2,38);R('rgba(255,255,255,.2)',X+8,Y-19,3,38);R('rgba(255,255,255,.14)',X-10,yy(9,10),20,10);
  const vl=ty==3?[-16,22]:[-9,11];R(col,X-8,yy(vl[0],vl[1]),16,vl[1]);R('rgba(0,0,0,.18)',X-8,yy(vl[0],vl[1]),16,vl[1]);
  if(ty!=3){R(GL,X-8,yy(2,7),16,7);R(GL,X-8,yy(-14,5),16,5)}else{R(GL,X-8,yy(10,4),16,4)}
  if(ty==2)R('#ffd23f',X-4,yy(-4,4),8,4);R(col,X-13,yy(3,3),2,3);R(col,X+11,yy(3,3),2,3);
  R('#fff6b0',X-9,yy(16,3),5,3);R('#fff6b0',X+4,yy(16,3),5,3);R(tl,X-9,yy(-19,3),5,3);R(tl,X+4,yy(-19,3),5,3);
  if(DN>.2){cx.fillStyle='rgba(255,240,170,.13)';cx.beginPath();const fy=s>0?Y+19:Y-19;cx.moveTo(X-9,fy);cx.lineTo(X-17,fy+s*42);cx.lineTo(X+17,fy+s*42);cx.lineTo(X+9,fy);cx.fill()}
  if(hp<60){R('rgba(0,0,0,.4)',X-5,yy(0,2),7,2)}}
 if(hp<35){cx.fillStyle='rgba(120,120,120,.45)';for(let i=0;i<3;i++){cx.beginPath();cx.arc(X+Math.sin(t*3+i)*4,Y-16-((t*14+i*8)%24),4+i,0,7);cx.fill()}}}
function tlight(X,Y,st){cx.fillStyle='#333';cx.fillRect(X-1,Y-34,3,34);cx.fillStyle='#111';cx.fillRect(X-4,Y-48,9,17);
 cx.fillStyle=st=='r'?'#ff3b30':'#3a1512';cx.fillRect(X-2,Y-46,5,4);cx.fillStyle=st=='y'?'#ffd23f':'#3a3212';cx.fillRect(X-2,Y-40,5,4);cx.fillStyle=st=='g'?'#34d058':'#123a1c';cx.fillRect(X-2,Y-34,5,4)}
// ===== v5: подъезд =====
function fl(q){FL=q;inn.o=lay(inn.b.n,'home',inn.b)}
function homeAct(a,n,I){
 if(a=='up'){menu('Лестница · этаж '+FL,()=>[...(FL<5?[['⬆ Подняться на '+(FL+1)+' этаж',()=>{cm();fl(FL+1)}]]:[]),...(FL>1?[['⬇ Спуститься на '+(FL-1)+' этаж',()=>{cm();fl(FL-1)}]]:[]),['✖ Закрыть',cm]]);return 1}
 if(a=='lift'){I.lf=t+1.5;menu('Лифт · этаж '+FL,()=>[1,2,3,4,5].filter(q=>q!=FL).map(q=>['🛗 На '+q+' этаж',()=>{cm();fl(q);inn.lf=t+1.5;toast('🔔 Динь! Этаж '+q)}]).concat([['✖ Закрыть',cm]]));return 1}
 if(a=='mailb'){if(t<(I.b.mt||0))toast('Ящик пуст');else{I.b.mt=t+120;if(Math.random()<.5){const m=5+(Math.random()*20|0);money+=m;toast('✉ В ящике конверт +'+m+' €')}else toast('Только реклама и счета')}return 1}
 if(a=='nt'){toast('📌 '+rum[Math.random()*rum.length|0]);return 1}
 if(a=='ic'){const q=NP[Math.random()*NP.length|0];toast('📞 Домофон: отвечает '+q.n);openChat(q);return 1}
 if((a=='ap1'&&FL>1)||a=='ap2'||a=='ap3'){const r=Math.random();if(r<.4){const q=NP[Math.random()*NP.length|0];toast('Дверь открыл'+(q.g?'а ':' ')+q.n);openChat(q)}else if(r<.6){money+=8;toast('Сосед дал 8 € за помощь с сумками')}else toast('Никто не открыл…');return 1}
 return 0}
function drawN(tp,x,y,w,g2,a,l,rc,ci){const I=inn,tx=(s,X,Y,col,f)=>{cx.fillStyle=col;cx.font=f||'bold 9px system-ui';cx.textAlign='center';cx.fillText(s,X,Y)};
 if(tp=='stairs'){for(let i=0;i<8;i++){const yy=y+i*(g2/8),sh=150-i*8;rc(`rgb(${sh},${sh-8},${sh-24})`,x,yy,w,g2/8-1);rc('rgba(255,255,255,.2)',x,yy,w,2);rc('rgba(0,0,0,.25)',x,yy+g2/8-3,w,2)}
  rc('#2b2b2b',x-3,y-8,3,g2+8);rc('#2b2b2b',x+w,y-8,3,g2+8);rc('#6b4a2a',x-4,y-10,w+8,3);tx('↑ '+(FL<5?FL+1:'—')+' эт.',x+w/2,y-14,'#ddd');return 1}
 if(tp=='mail'){rc('#555',x-2,y-2,w+4,40);for(let k=0;k<6;k++){const X=x+(k%3)*30,Y=y+(k/3|0)*18;rc(k==0?'#4a8ac0':'#889',X,Y,26,15);rc('#222',X+2,Y+3,22,2);rc('#fc3',X+10,Y+9,6,3);tx(''+((10+((I.b.x*7+I.b.y*3)%80))+k),X+13,Y+13,'#222','7px system-ui')}return 1}
 if(tp=='icom'){rc('#2a2d33',x,y,w,g2);rc('#111',x+3,y+3,w-6,8);rc(Math.sin(t*4)>0?'#3f6':'#183',x+w-7,y+5,3,3);for(let k=0;k<9;k++)rc('#9aa',x+4+(k%3)*6,y+14+(k/3|0)*6,4,4);rc('#555',x+4,y+g2-8,w-8,3);return 1}
 if(tp=='door'){const hi=I.b.sd,col=['#5a3a28','#3a5a6a','#6a3a4a'][(l|0)%3];rc('#2a2018',x-2,y-2,w+4,g2+2);rc(col,x,y,w,g2);rc('rgba(0,0,0,.25)',x+4,y+5,w-8,16);rc('rgba(0,0,0,.25)',x+4,y+26,w-8,14);rc('#d9b24a',x+w-8,y+g2/2,3,3);rc('#111',x+w/2-1,y+8,3,3);
  rc('#caa',x+w/2-8,y+g2-3,16,3);rc('#c9c3b0',x+w/2-8,y-12,16,9);tx(''+(+l+(FL-1)*3),x+w/2,y-5,'#222','bold 8px system-ui');if(DK>.3&&((l|0)+FL)%2)rc('rgba(255,220,120,.7)',x+3,y+g2-1,w-6,1);return 1}
 if(tp=='lift'){const op=I.lf>t;rc('#6a6e75',x-3,y-3,w+6,g2+3);rc(op?'#f2e6b0':'#aeb4bc',x,y,w,g2);if(!op){rc('#8c929a',x+w/2-1,y,2,g2);rc('rgba(255,255,255,.3)',x+3,y+3,4,g2-6)}else{rc('#c9bb80',x+4,y+4,w-8,g2-6)}
  rc('#111',x+w/2-9,y-12,18,9);tx(''+FL,x+w/2,y-4,'#f33','bold 9px monospace');rc('#aaa',x+w+5,y+18,3,3);return 1}
 if(tp=='notice'){rc('#6b4a2a',x-2,y-2,w+4,g2+4);rc('#c9a36a',x,y,w,g2);rc('#fff',x+3,y+3,12,10);rc('#9fd',x+18,y+5,12,12);rc('#fc6',x+5,y+15,14,10);rc('#d44',x+9,y+3,2,2);return 1}
 if(tp=='window'){rc('#e6e2d6',x-3,y-3,w+6,g2+6);const sk=DK>.3?'#162038':'#9fd0f0';rc(sk,x,y,w/2-1,g2);rc(sk,x+w/2+1,y,w/2-1,g2);rc('rgba(255,255,255,.35)',x+3,y+3,5,g2-8);if(DK<.3){rc('#fff',x+w-14,y+8,10,4)}return 1}
 return 0}

let DK=0,inn=null;
const Q=[],D=[['Бургер',15,6,25],['Борщ',18,9,28],['Пицца',22,8,32],['Кофе',8,4,12],['Салат',12,5,18],['Пончик',6,3,10]],UP=[['sofa','Диван',120],['plant','Растение',30],['lamp','Торшер',40],['rug','Ковёр',50],['tv2','Большой ТВ',200]];
const S='counter shelf oven coffee fridge crate conv machine slot poker table desk stairs mail car wash bed closet tv sofa lift icom';
const kind=n=>/Пицц|Кафе|Бар/.test(n)?'food':/Склад|Завод|Автосервис|Мойка/.test(n)?'work':/Кино|Казино|Отель|Школа|банк/.test(n)?'fun':n=='Дом'?'home':'shop';
const TH={food:['#b98f5a','#6e4535'],shop:['#d6d2c6','#4f5f70'],work:['#8d8d86','#4a4d52'],fun:['#5b3350','#2a2036'],home:['#b5a07a','#7c6c5c'],apt:['#a98f6a','#8a7767']};
function art(c,i){c.clearRect(0,0,48,48);const f=(k,x,y,w,h)=>{c.fillStyle=k;c.fillRect(x,y,w,h)},e=(k,x,y,rx,ry)=>{c.fillStyle=k;c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill()};
 if(i==0){e('#d99a4a',24,13,18,9);f('#5fae3a',5,21,38,4);f('#6b3a22',6,25,36,7);f('#e8c24a',5,31,38,3);e('#d99a4a',24,38,18,6)}
 else if(i==1){e('#e8e8e8',24,26,21,16);e('#b3202a',24,24,18,11);e('#fff',24,24,6,3);f('#3a8a3a',30,21,3,3)}
 else if(i==2){e('#e8b84a',24,24,22,22);for(let k=0;k<6;k++)e('#c0392b',24+Math.cos(k)*11,24+Math.sin(k)*11,4,4)}
 else if(i==3){f('#fff',10,18,24,20);f('#6b3a22',12,20,20,4);f('#fff',34,22,7,10);c.strokeStyle='#bbb';c.lineWidth=2;for(let k=0;k<3;k++){c.beginPath();c.moveTo(14+k*7,14);c.lineTo(17+k*7,6);c.stroke()}}
 else if(i==4){e('#ddd',24,30,21,11);for(let k=0;k<5;k++)e('#5fae3a',12+k*6,24,6,6);e('#c0392b',20,22,4,4);e('#c0392b',32,24,4,4)}
 else{e('#d99a4a',24,24,20,20);e('#f08ab0',24,22,18,17);e('#363b52',24,23,5,4);f('#fff',14,16,3,2);f('#ffd23f',30,18,3,2)}}
function lay(n,k,bb){const c=['counter',250,206,90,22,'m'];
 if(k=='apt'){const o=[['bed',24,72,70,46,'sleep'],['closet',104,66,44,52,'upg'],apt.it.tv2?['tv',156,62,84,48,'tv']:['tv',160,70,60,40,'tv'],['fridge',300,66,40,52,'fr'],['table',210,170,48,30]];if(apt.it.rug)o.push(['rug',40,160,120,64]);if(apt.it.sofa)o.push(['sofa',50,176,90,30,'#6a4a8a']);if(apt.it.plant)o.push(['plant',20,210,20,30]);if(apt.it.lamp)o.push(['lamp',160,206,14,30]);return o}
 if(k=='home'){const nb=bb?10+((bb.x*7+bb.y*3)%80):10,o=[['stairs',300,76,44,90,'up'],['notice',24,20,40,30,'nt'],['door',80,22,32,46,'ap1',''+nb],['door',136,22,32,46,'ap2',''+(nb+1)],['door',192,22,32,46,'ap3',''+(nb+2)],['lift',246,22,44,46,'lift'],['window',300,12,40,40]];if(FL==1)o.push(['mail',24,80,90,36,'mailb'],['icom',124,88,22,32,'ic'],['plant',120,200,20,30]);else o.push(['plant',24,90,20,30],['plant',200,200,20,30]);return o}
 if(n=='Кинотеатр')return[['screen',56,66,240,50],['seats',64,140,224,60],c];
 if(n=='Казино')return[['slot',24,70,30,40],['slot',60,70,30,40],['slot',96,70,30,40],['slot',300,70,30,40],['poker',150,130,150,56],c];
 if(n=='Бар')return[['bottles',20,62,310,14],['counter',50,110,250,22,'m'],['stool',80,150,0,0],['stool',140,150,0,0],['stool',200,150,0,0],['stool',260,150,0,0],['table',40,200,48,30]];
 if(n=='Отель')return[['counter',90,86,170,22,'m'],['sofa',24,176,90,30,'#8a3a3a'],['plant',300,70,20,30],['rug',130,150,110,60],['lamp',270,170,14,30]];
 if(n=='Школа'){const o=[['board',90,64,170,24],['counter',140,96,70,20,'m']];for(let i=0;i<6;i++)o.push(['desk',40+(i%3)*100,150+(i/3|0)*46,60,22]);return o}
 if(n=='Крипто-банк')return[['chart',24,62,100,46],['chart',228,62,100,46],['counter',70,126,210,22,'m'],['sofa',24,190,80,28,'#3a4a6a']];
 if(n=='Автосервис')return[['car',30,96,100,52],['machine',250,90,70,44],c,['crate',160,170,34,34]];
 if(n=='Мойка')return[['wash',40,92,120,80],['machine',250,90,70,44],c];
 if(n=='Автосалон')return[['car',40,90,100,52],['car',190,90,100,52],c,['plant',14,200,20,30]];
 if(k=='food')return[['counter',32,76,210,22,'m'],['oven',256,66,70,36],['coffee',48,60,28,20],['table',40,150,48,30],['table',150,150,48,30],['table',256,150,48,30],['plant',14,210,20,30]];
 if(k=='work')return[['conv',16,100,210,16],['crate',240,76,34,34],['crate',282,76,34,34],['machine',246,140,76,46],['crate',140,170,34,34],['counter',24,206,90,22,'m']];
 return[['shelf',24,80,92,22],['shelf',130,80,92,22],['shelf',236,80,92,22],['shelf',24,140,92,22],['shelf',130,140,92,22],['fridge',286,130,44,52],c]}
function okp(I,x,y){if(x<12||x>340||y<68||y>272)return 0;for(const o of I.o)if(S.includes(o[0])&&x>o[1]-4&&x<o[1]+o[3]+4&&y>o[2]+o[4]*.35&&y<o[2]+o[4]+8)return 0;return 1}
function enter(b,m){cm();FL=1;const k=m||kind(b.n);inn={b,k,o:lay(b.n,k,b),x:176,y:244,d:0,f:0,mv:0,bots:[],pl:null};
 const nb=k=='apt'?0:k=='home'?1:3;for(let i=0;i<nb;i++){const n=NP.filter(z=>z.inb==b&&z.in>t)[i]||NP[Math.random()*NP.length|0],q={n:n.n,x:0,y:0,vx:0,vy:0,tm:0,c:n.c,hr:n.hr,d:0,g:n.g,bd:n.bd};for(let a=0;a<30;a++){q.x=40+Math.random()*270;q.y=140+Math.random()*100;if(okp(inn,q.x,q.y))break}inn.bots.push(q)}}
function inAct(){const I=inn,n=I.n;if(mf||!n)return;
 if(n.k=='exit'){if(I.k=='apt')enter(I.b,'home');else inn=null;return}
 const a=n.o[5];if(homeAct(a,n,I))return;
 if(a=='m')menu(I.b.n,()=>rows(I.b));
 else if(a=='sleep'){mins=420;en=100;toast('Выспался: ⚡100%, 07:00')}
 else if(a=='tv'){en=Math.min(100,en+3);adv(.25);toast('Посмотрел ТВ +3⚡')}
 else if(a=='fr'){if(t<(I.fr||0))toast('Холодильник пуст');else{I.fr=t+60;en=Math.min(100,en+10);toast('Перекус +10⚡')}}
 else if(a=='upg')menu('Улучшения квартиры',()=>UP.map(([k,nm,c])=>[apt.it[k]?'✔ '+nm:nm+' — '+c+' €',()=>{if(!apt.it[k]&&pay(c)){apt.it[k]=1;I.o=lay('', 'apt')}}]).concat([['✖ Закрыть',cm]]));
 else if(a=='ap1'){const bi=B.indexOf(I.b);if(apt.own&&apt.bi==bi)enter(I.b,'apt');else if(apt.own)toast('Твоя квартира в другом доме');else menu('Квартира '+n.o[6],()=>[['🔑 Купить квартиру −200 €',()=>{if(pay(200)){apt.own=1;apt.bi=bi;enter(I.b,'apt')}}],['✖ Закрыть',cm]])}
 else if(a=='ap2'||a=='ap3')toast(['За дверью играет радио','Никто не открывает','Сосед: «Не до тебя!»'][Math.random()*3|0])}
function dishes(a){D.forEach((d,i)=>a(`${d[0]} — ${d[1]} € · ⏱ ${d[2]} с · +${d[3]}⚡`,()=>{if(Q.length>=3){say('Очередь полна');return}if(pay(d[1])){Q.push({i,t:t+d[2],e:d[3]});say('Заказ принят, ждите '+d[2]+' с')}},i))}
const LN=['Привет!','Как дела?','Слышал новости?','Всё дорого стало','ДоджМем растёт!','Пойдём в кафе?','Ну и погодка','Где тут работа?','Хороший день'];
function pathTo(n){const tx=n.x/T|0,ty=n.y/T|0;if(g[ty][tx]!=2)return;const bx=Math.floor((tx-3)/15),by=Math.floor((ty-3)/15),x0=3+15*bx,y0=3+15*by;if(tx<x0||tx>x0+11||ty<y0||ty>y0+11)return;
 const c=B.filter(b=>b.x>x0&&b.x<x0+11&&b.y>y0&&b.y<y0+11);if(!c.length)return;const b=c[Math.random()*c.length|0],sx=(Math.abs(tx-x0)<Math.abs(tx-x0-11)?x0:x0+11)*T+16,ry=(y0+10)*T+16;
 n.tg=b;n.wp=[[sx,n.y],[sx,ry],[b.dx,ry],[b.dx,b.dy]]}
function NB(){for(let i=Q.length;i--;)if(t>=Q[i].t){const o=Q.splice(i,1)[0];en=Math.min(100,en+o.e);toast(D[o.i][0]+' готов: +'+o.e+'⚡');if(inn)inn.pl=[t+8,o.i]}
 for(const n of NP){
  if(n.in){if(t>n.in){n.in=0;const b=n.inb;if(b){n.x=b.dx;n.y=b.dy;b.dop=t+1.2}n.cd=t+6}continue}
  if(n.wp&&n.wp.length){const w=n.wp[0],dx=w[0]-n.x,dy=w[1]-n.y,d=Math.hypot(dx,dy);
   if(d<5){n.wp.shift();if(!n.wp.length){const b=n.tg;n.in=t+10+Math.random()*15;n.inb=b;b.dop=t+1.2;n.tg=null;n.vx=n.vy=0;if(b.n=='Ларёк'&&own&&stock>0){stock--;till+=48}}}
   else{const mx=Math.abs(dx)>5;n.vx=mx?Math.sign(dx):0;n.vy=mx?0:Math.sign(dy);n.tm=.3;n.sk=Math.hypot(n.x-(n.lx||0),n.y-(n.ly||0))<.3?(n.sk||0)+.016:0;if(n.sk>1.5){n.wp=null;n.tg=null;n.sk=0;n.tm=0}}
   n.lx=n.x;n.ly=n.y}
  else if(Math.random()<.003)pathTo(n)}
 for(let i=0;i<NP.length;i++){const n=NP[i];if(n.in||n.cd>t||(n.wp&&n.wp.length))continue;for(let j=i+1;j<NP.length;j++){const m=NP[j];if(m.in||m.cd>t||(m.wp&&m.wp.length))continue;if(Math.hypot(n.x-m.x,n.y-m.y)<38){n.bt=t+3;m.bt=t+3.6;n.cd=m.cd=t+14;n.bs=LN[Math.random()*9|0];m.bs=LN[Math.random()*9|0];n.vx=n.vy=m.vx=m.vy=0;n.tm=m.tm=2.5;break}}}}
function room(I,th,w,H3){const rc=(k,X,Y,W,H)=>{cx.fillStyle=k;cx.fillRect(X,Y,W,H)},k=I.k,sd=I.b.sd;
 rc(th[1],0,0,w,64);rc('rgba(255,255,255,.07)',0,0,w,20);rc('rgba(0,0,0,.2)',0,38,w,26);rc('rgba(255,255,255,.1)',0,38,w,2);rc('rgba(0,0,0,.4)',0,60,w,4);
 for(let x=0;x<w;x+=16)rc('rgba(0,0,0,.07)',x,40,1,20);
 for(let y=64;y<H3;y+=32)for(let x=0;x<w;x+=32){const a=(x+y)/32&1;rc(th[0],x,y,32,32);
  if(k=='food'||k=='apt'){rc('rgba(0,0,0,.1)',x,y+10,32,1);rc('rgba(0,0,0,.1)',x,y+21,32,1);rc('rgba(0,0,0,.08)',x+(y/32%2?9:21),y,1,10)}
  else if(k=='home')rc(a?'rgba(0,0,0,.15)':'rgba(255,255,255,.1)',x,y,32,32);
  else if(k=='fun'){rc(a?'rgba(255,255,255,.05)':'rgba(0,0,0,.12)',x,y,32,32);rc('rgba(255,215,120,.15)',x+14,y+14,4,4)}
  else{rc(a?'rgba(0,0,0,.07)':'rgba(255,255,255,.07)',x,y,32,32);rc('rgba(0,0,0,.1)',x,y,32,1);rc('rgba(0,0,0,.1)',x,y,1,32)}
  rc('rgba(255,255,255,.04)',x,y,32,3)}
 for(const xw of k=='home'?[]:[48,270]){rc('#2a2f3a',xw-2,10,44,34);rc(DK>.3?'#1a2340':'#9fd0f0',xw,12,40,30);rc('rgba(255,255,255,.35)',xw+3,14,8,12);rc('#2a2f3a',xw+19,12,2,30);rc('rgba(0,0,0,.35)',xw-4,44,48,4);
  if(DK<.3){cx.fillStyle='rgba(255,240,170,.1)';cx.beginPath();cx.moveTo(xw,44);cx.lineTo(xw+40,44);cx.lineTo(xw+95,175);cx.lineTo(xw+30,175);cx.fill()}}
 if(k=='home'){const f=Math.sin(t*3)>.96?.05:.2;cx.fillStyle='rgba(255,230,160,'+f+')';cx.beginPath();cx.arc(176,40,100,0,7);cx.fill();rc('#555',172,0,8,6);rc('#ffeaa0',166,6,20,4)}
 else{for(const X of[130,210]){rc('#2a2018',X,12,24,20);rc(['#d9a65a','#5a9fd9','#c75a5a','#6abf7a'][((sd*10|0)+X%4)%4],X+2,14,20,16);rc('rgba(255,255,255,.25)',X+2,14,8,5)}
  const ca=mins/60%12/12*6.283-1.57,cb=mins%60/60*6.283-1.57;cx.fillStyle='#fff';cx.beginPath();cx.arc(176,22,9,0,7);cx.fill();cx.strokeStyle='#222';cx.lineWidth=1.5;cx.beginPath();cx.moveTo(176,22);cx.lineTo(176+Math.cos(ca)*5,22+Math.sin(ca)*5);cx.moveTo(176,22);cx.lineTo(176+Math.cos(cb)*8,22+Math.sin(cb)*8);cx.stroke()}
 for(const X of k=='home'?[]:[24,326]){rc('#d9b24a',X-2,26,4,10);cx.fillStyle='rgba(255,220,140,.2)';cx.beginPath();cx.arc(X,30,34,0,7);cx.fill()}}
function drawO(o){const[tp,x,y,w,g2,a,l]=o,rc=(k,X,Y,W,H)=>{cx.fillStyle=k;cx.fillRect(X,Y,W,H)},ci=(k,X,Y,r)=>{cx.fillStyle=k;cx.beginPath();cx.arc(X,Y,r,0,7);cx.fill()};
 if(drawN(tp,x,y,w,g2,a,l,rc,ci))return;
 if(tp=='counter'){person(x+w*.5,y+13,'#c0392b','#222',0,(t*2|0)%2,1);rc('#6b4a2a',x,y,w,g2);rc('#9a7447',x,y,w,6);rc('#222',x+w-34,y-8,16,10);rc('#7fd',x+w-32,y-6,12,4);rc('#1c2a1f',x+8,y-16,44,13);rc('#ddd',x+12,y-12,30,1);rc('#ddd',x+12,y-8,22,1);ci('#ffd23f',x+w-50,y-3,3)}
 else if(tp=='table'){rc('#6a4a2a',x-10,y+12,8,12);rc('#6a4a2a',x+w+2,y+12,8,12);rc('rgba(0,0,0,.25)',x+4,y+g2-4,w,6);rc('#8a5a32',x,y+6,w,g2-10);rc('#fff',x+w/2-1,y+1,2,6);ci('#ffb03a',x+w/2,y-1+Math.sin(t*12),2);rc('#a8743f',x,y+6,w,5);rc('#5a3a22',x-8,y+14,6,10);rc('#5a3a22',x+w+2,y+14,6,10);if(inn.pl&&inn.pl[0]>t&&o===inn.o.find(q=>q[0]=='table')){cx.fillStyle='#fff';cx.beginPath();cx.ellipse(x+w/2,y+14,10,5,0,0,7);cx.fill();rc(['#d99a4a','#b3202a','#e8b84a','#6b3a22','#5fae3a','#f08ab0'][inn.pl[1]],x+w/2-5,y+10,10,5)}}
 else if(tp=='oven'){rc('#3a2a24',x,y,w,g2);rc('#111',x+8,y+10,w-16,g2-14);for(let i=0;i<4;i++)ci(i%2?'#ff8a1f':'#ffd23f',x+16+i*13,y+g2-9-Math.abs(Math.sin(t*9+i))*5,5)}
 else if(tp=='coffee'){rc('#444',x,y,w,g2);rc('#c33',x+4,y+4,6,4);for(let i=0;i<3;i++)ci('rgba(255,255,255,.4)',x+w/2+Math.sin(t*3+i)*3,y-4-((t*14+i*8)%22),3)}
 else if(tp=='shelf'){rc('#5a4630',x,y,w,g2);for(let r=0;r<2;r++)for(let k=0;k<(w/9|0);k++)rc(['#c0392b','#2e86c1','#f1c40f','#27ae60','#ecf0f1','#e67e22'][h(k+r,x)*6|0],x+3+k*9,y+3+r*9,7,7)}
 else if(tp=='fridge'){rc('#cfe3ee',x,y,w,g2);rc('#9ab',x+w/2,y,2,g2);rc('rgba(180,230,255,.25)',x-4,y+g2,w+8,10)}
 else if(tp=='crate'){rc('#a8793f',x,y,w,g2);rc('#7a5428',x,y+g2/2,w,2);rc('#7a5428',x+w/2,y,2,g2)}
 else if(tp=='conv'){rc('#3d3d40',x,y,w,g2);for(let k=0;k<w/16+1;k++)rc('#666',x+((k*16+t*30)%w),y+2,6,g2-4);rc('#c9a66b',x+(t*30%(w-14)),y-10,14,12)}
 else if(tp=='machine'){rc('#667788',x,y,w,g2);rc('#333',x+6,y+6,w-12,14);rc(Math.sin(t*5)>0?'#4f4':'#f44',x+w-12,y+g2-12,6,6);if(Math.sin(t*7)>.85)rc('#ffd23f',x+w/2,y+g2,6,3)}
 else if(tp=='screen'){rc('#111',x-4,y-4,w+8,g2+8);rc(`hsl(${(t*50)%360},60%,45%)`,x,y,w,g2);rc('rgba(255,255,255,.15)',x,y,w,6)}
 else if(tp=='seats'){for(let r=0;r<3;r++)for(let k=0;k<(w/16|0);k++){rc('#8a2a2a',x+k*16,y+r*22,12,14);rc('#6a1a1a',x+k*16,y+r*22+12,12,4)}}
 else if(tp=='slot'){rc('#822',x,y,w,g2);rc('#222',x+4,y+8,w-8,14);rc(Math.sin(t*6+x)>0?'#ff0':'#fa0',x+4,y+g2-8,w-8,4);for(let i=0;i<3;i++)rc('#fff',x+5+i*7,y+10+(Math.sin(t*8+i)*2|0),5,10)}
 else if(tp=='poker'){rc('#1f6a3a',x,y,w,g2);rc('#5a3a22',x,y+g2-6,w,6);rc('#fff',x+20,y+16,10,14);rc('#fff',x+40,y+16,10,14);rc('#c33',x+100,y+20,8,8);rc('#27a',x+112,y+22,8,8)}
 else if(tp=='lift'){const op=Math.sin(t*.7)>.8?9:0;rc('#6f757b',x-3,y-3,w+6,g2+3);rc('#b9c0c6',x,y,w/2-op,g2);rc('#b9c0c6',x+w/2+op,y,w/2-op,g2);if(op)rc('#ffe9a8',x+w/2-op,y,op*2,g2);rc('#111',x+w/2-9,y-12,18,9);cx.fillStyle='#4f4';cx.font='8px monospace';cx.textAlign='center';cx.fillText(1+(t*.4|0)%6,x+w/2,y-5)}
 else if(tp=='notice'){rc('#6a4a2a',x,y,w,g2);rc('#c9a66b',x+2,y+2,w-4,g2-4);for(let i=0;i<4;i++)rc(['#fff','#ffeaa0','#bfe3ff','#ffc0c0'][i],x+4+(i%2)*14,y+4+(i/2|0)*11,11,9)}
 else if(tp=='stool')ci('#a33',x,y,8);
 else if(tp=='bottles'){for(let k=0;k<(w/10|0);k++)rc(['#2a7','#a62','#27a','#a27'][k%4],x+k*10,y,6,g2)}
 else if(tp=='bed'){rc('#5a3a22',x,y,w,g2);rc('#7a8fb5',x+4,y+14,w-8,g2-16);rc('#fff',x+6,y+4,22,10)}
 else if(tp=='closet'){rc('#7a5a3a',x,y,w,g2);rc('#5a3a22',x+w/2,y,2,g2);rc('#d9b24a',x+w/2-5,y+g2/2,3,5);rc('#d9b24a',x+w/2+3,y+g2/2,3,5)}
 else if(tp=='tv'){rc('#111',x,y,w,g2);rc(`rgb(${40+Math.sin(t*9)*20|0},${80+Math.sin(t*7)*30|0},${180+Math.sin(t*5)*50|0})`,x+3,y+3,w-6,g2-8);rc('#333',x+w/2-8,y+g2,16,4)}
 else if(tp=='sofa'){rc(a,x,y,w,g2);rc('rgba(255,255,255,.15)',x,y,w,6);rc('rgba(0,0,0,.2)',x,y+g2-6,w,6)}
 else if(tp=='plant'){rc('#8a4a2a',x+4,y+g2-10,12,10);for(let i=0;i<4;i++)ci('#3c8040',x+10+Math.sin(t*1.5+i)*2+(i-1.5)*4,y+8+i%2*6,6)}
 else if(tp=='lamp'){rc('#333',x+6,y+8,2,g2-8);rc('#ffe08a',x,y,14,10);ci('rgba(255,224,138,.2)',x+7,y+10,30)}
 else if(tp=='desk'){rc('#8a6a42',x,y,w,g2);rc('#6a4a2a',x,y+g2-4,w,4);rc('#fff',x+8,y+3,12,8)}
 else if(tp=='board'){rc('#2f5f3f',x,y,w,g2);rc('#ddd',x+10,y+8,60,2);rc('#ddd',x+10,y+14,40,2)}
 else if(tp=='stairs'){for(let i=0;i<6;i++)rc(`rgb(${150-i*10},${140-i*10},${120-i*10})`,x,y+i*(g2/6),w,g2/6-2)}
 else if(tp=='mail'){for(let k=0;k<6;k++){rc('#889',x+(k%3)*30,y+(k/3|0)*18,26,14);rc('#fc3',x+(k%3)*30+10,y+(k/3|0)*18+5,6,3)}}
 else if(tp=='door'){rc('#5a3a28',x,y,w,g2);rc('#3a2418',x+4,y+4,w-8,g2-8);rc('#d9b24a',x+w-8,y+g2/2,3,3);cx.fillStyle='#fff';cx.font='bold 10px system-ui';cx.textAlign='center';cx.fillText(l,x+w/2,y+16)}
 else if(tp=='chart'){rc('#101820',x,y,w,g2);for(let i=0;i<8;i++)rc(i%2?'#3c6':'#c44',x+6+i*11,y+8+(Math.sin(t+i*1.3)*8+8|0),6,12+(i*5%10))}
 else if(tp=='car'){rc('rgba(0,0,0,.3)',x+4,y+g2-6,w,6);rc(['#c0392b','#2e86c1','#f1c40f'][(x/50|0)%3],x,y+10-(Math.sin(t)*2|0),w,g2-14);rc('rgba(20,30,50,.7)',x+22,y+12,w-44,14);rc('#111',x+8,y+g2-8,14,8);rc('#111',x+w-22,y+g2-8,14,8)}
 else if(tp=='wash'){rc('#445',x,y,w,g2);cx.strokeStyle='#38c';cx.lineWidth=5;for(let i=0;i<2;i++){cx.beginPath();cx.arc(x+20+i*(w-40),y+g2/2,12,t*6,t*6+4);cx.stroke()}rc('rgba(120,200,255,.6)',x+w/2,y+(t*40%g2),3,6)}}
function inDraw(dt,vx,vy,l){const I=inn,w=352,H3=272,th=TH[I.k];
 if(l>.1&&!cur&&!mf&&!PH){if(l>1){vx/=l;vy/=l}const nx=I.x+vx*80*dt,ny=I.y+vy*80*dt;if(okp(I,nx,I.y))I.x=nx;if(okp(I,I.x,ny))I.y=ny;I.d=Math.abs(vx)>Math.abs(vy)?(vx<0?2:3):(vy<0?1:0);I.f=(t*10|0)%2;I.mv=1}else I.mv=0;
 for(const b of I.bots){b.tm-=dt;if(b.tm<=0){b.tm=1+Math.random()*2;b.vx=Math.random()<.4?0:Math.random()<.5?-1:1;b.vy=Math.random()<.5?0:Math.random()<.5?-1:1}const nx=b.x+b.vx*30*dt,ny=b.y+b.vy*30*dt;if(okp(I,nx,b.y))b.x=nx;else b.vx=0;if(okp(I,b.x,ny)&&ny<250)b.y=ny;else b.vy=0;b.d=b.vx<0?2:b.vx>0?3:0}
 let bn=null,bd=26;for(const o of I.o){if(!o[5])continue;const d=Math.hypot(Math.max(o[1]-I.x,0,I.x-o[1]-o[3]),Math.max(o[2]-I.y,0,I.y-o[2]-o[4]));if(d<bd){bd=d;bn={k:'o',o}}}
 if(I.y>H3-14&&Math.abs(I.x-176)<28)bn={k:'exit'};I.n=bn;
 const LB={m:'Меню / касса',sleep:'Спать',tv:'Смотреть ТВ',fr:'Холодильник',upg:'Улучшить',ap1:'Моя квартира',ap2:'Постучать',ap3:'Постучать',up:'Лестница',lift:'Лифт',mailb:'Почтовые ящики',nt:'Объявления',ic:'Домофон'};
 $('act').textContent=bn?(bn.k=='exit'?'Выйти':LB[bn.o[5]]):'—';$('act').className=bn?'on':'';
 $('hud').innerHTML=`${I.k=='apt'?'Квартира':I.k=='home'?'Подъезд · этаж '+FL:I.b.n} &nbsp; € ${money|0} &nbsp; ⚡ ${en|0}%`+(Q.length?`<br>⏳ Заказ готовится: ${Q.length}`:'');
 const Zi=Math.max(1,Math.floor(Math.min(cv.width/360,cv.height/290))),ox=((cv.width/Zi-w)/2)|0,oy=((cv.height/Zi-H3)/2)|0,rc=(k,X,Y,W,H)=>{cx.fillStyle=k;cx.fillRect(X,Y,W,H)};
 cx.setTransform(Zi,0,0,Zi,0,0);cx.imageSmoothingEnabled=false;rc('#0d0e12',0,0,cv.width/Zi,cv.height/Zi);cx.translate(ox,oy);
 room(I,th,w,H3);
 rc('#2a1f18',160,H3-6,32,6);rc('rgba(140,40,40,.6)',150,H3-22,52,14);
 for(const o of I.o)if(o[0]=='rug'){rc('#a0444a',o[1],o[2],o[3],o[4]);rc('#d8c070',o[1]+5,o[2]+5,o[3]-10,o[4]-10)}
 const R2=[];for(const o of I.o)if(o[0]!='rug')R2.push([o[2]+o[4],()=>{if(S.includes(o[0])){cx.fillStyle='rgba(0,0,0,.22)';cx.fillRect(o[1]+3,o[2]+o[4]-3,o[3],8)}drawO(o)}]);
 for(const b of I.bots)R2.push([b.y,()=>{person(b.x,b.y,b.c,b.hr,b.d,(t*8|0)%2,b.vx||b.vy,b.g,b.bd);if(Math.hypot(b.x-I.x,b.y-I.y)<60){cx.fillStyle='#fff';cx.font='bold 9px system-ui';cx.textAlign='center';cx.fillText(b.n,b.x,b.y-46)}}]);
 R2.push([I.y,()=>person(I.x,I.y,['#e8a33d','#2e86c1','#27ae60','#8e44ad','#c0392b','#111'][style],PG?'#6a3a1a':'#3a2a1a',I.d,I.f,I.mv,PG)]);
 R2.sort((a,b)=>a[0]-b[0]);for(const r of R2)r[1]();
 {const gr=cx.createRadialGradient(176,150,70,176,150,270);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,.38)');cx.fillStyle=gr;cx.fillRect(0,0,w,H3);if(DK<.3)for(let i=0;i<14;i++){cx.fillStyle='rgba(255,245,200,.55)';cx.fillRect(48+((i*37+t*6)%230),66+((i*53+t*9)%150),1.5,1.5)}}
 if(DK>.3){cx.setTransform(1,0,0,1,0,0);cx.fillStyle=`rgba(10,15,45,${DK*.35})`;cx.fillRect(0,0,cv.width,cv.height)}}
// ===== v6: телефон =====
const APPS=[['🗺','Карта','map'],['🛒','Магазин','shop'],['🎒','Рюкзак','bag'],['💬','Сообщения','msg'],['🏦','Банк','bank'],['📊','Статистика','stat'],['👥','Найм','hire'],['🕶','Тень','dark'],['📺','ТВ','tv']];
let PH=0,papp=null,mmC=null,NWV=0,STG='';
function pmsg(f,tx){phone.msgs.unshift([f,tx,String(mins/60%24|0).padStart(2,'0')+':'+String(mins%60|0).padStart(2,'0')]);phone.msgs.length=Math.min(phone.msgs.length,30);phone.un=(phone.un||0)+1;if(PH&&papp=='msg'){phone.un=0;phR()}$('phb').textContent=phone.un?'📱'+phone.un:'📱';toast('💬 '+f)}
function ledg(){if(lm===null)lm=money;if(Math.abs(money-lm)>=1){led.unshift([String(mins/60%24|0).padStart(2,'0')+':'+String(mins%60|0).padStart(2,'0'),Math.round(money-lm)]);led.length=Math.min(led.length,20);lm=money}
 if(PH){phHdr();if(papp=='map'||MFO)mmDraw()}}
function phHdr(){$('pht').textContent=String(mins/60%24|0).padStart(2,'0')+':'+String(mins%60|0).padStart(2,'0')+'  ·  € '+(money|0)}
function phOpen(){PH=1;papp=null;$('ph').style.display='flex';phR()}
function phClose(){PH=0;$('ph').style.display='none'}
// ===== v8: тактическая карта =====
const MS=8,MX=34,MY=86,MFW=W*MS+MX*2,MFH=H*MS+MY+206;let MAPSVG=null,mapTh='paper',MFO=0,mapZ=.9;
const MPAL={paper:{bg:'#e6d6ae',ink:'#4a3921',grid:'#7a5e34',rdc:'#6c5738',rdf:'#f7eed3',hwc:'#8f431c',hwf:'#eea84e',wat:'#a5c8d8',wte:'#5d8ca6',bld:'#b09a74',ble:'#5a4630',pl:'#f4ead0',tre:'#6f9a52',G:'#e2b99b',D:'#b2bfd8',R:'#e8d8a4',V:'#dcdcb0',M:'#e6b4c6',C:'#b9d7b0',I:'#d4c48e',X:'#e0a89b',P:'#b4d698',F:'#e0d6b8',H:'#a9c9da',pier:'#8a6a42',quay:'#cdbf98'},
 bp:{bg:'#0f2f55',ink:'#d3e6ff',grid:'#9ec6ff',rdc:'#8bb8f2',rdf:'#17426f',hwc:'#ffffff',hwf:'#2c6bb8',wat:'#09213f',wte:'#6fa8ee',bld:'#2b5f9e',ble:'#9cc8ff',pl:'#0f2f55',tre:'#4d97cc',G:'#295a96',D:'#3a6faf',R:'#1f4b82',V:'#1a4273',M:'#3369a8',C:'#245d8c',I:'#2b5e8e',X:'#3d69a6',P:'#1c4f70',F:'#143a66',H:'#1e5b94',pier:'#9cc8ff',quay:'#2c66a6'}};
function mergeRects(fn){const rs=[],open={};for(let y=0;y<=H;y++){const row=[];if(y<H){let a=-1;for(let x=0;x<=W;x++){const ok=x<W&&fn(x,y);if(ok&&a<0)a=x;if(!ok&&a>=0){row.push([a,x]);a=-1}}}
 const keys={};for(const[a,b]of row)keys[a+'-'+b]=1;for(const k in open)if(!keys[k]){rs.push(open[k]);delete open[k]}
 for(const[a,b]of row){const k=a+'-'+b;if(open[k])open[k].h++;else open[k]={x:a,y,w:b-a,h:1}}}return rs}
function buildMap(){const X=x=>MX+x*MS,Y=y=>MY+y*MS,r1=n=>Math.round(n*10)/10,ST=(a,b)=>`style="${a}"`;let o='';
 const css=Object.entries(MPAL).map(([k,p])=>`.mp-${k}{${Object.entries(p).map(([a,b])=>`--${a}:${b}`).join(';')}}`).join('')+'.mp-bp .pp{display:none}.lb{fill:var(--ink);font-weight:700;font-size:12px;letter-spacing:.08em;text-anchor:middle}.sm{fill:var(--ink);font-size:11px}';
 o+=`<svg class="mapsvg mp-${mapTh}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MFW} ${MFH}" style="display:block;width:100%;height:auto;font-family:system-ui,Arial,sans-serif"><style>${css}</style>
<defs><pattern id="mhI" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" style="stroke:var(--ink);stroke-opacity:.32;stroke-width:1.3"/></pattern>
<pattern id="mhX" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 0L6 6M6 0L0 6" style="stroke:var(--ink);stroke-opacity:.3;stroke-width:1;fill:none"/></pattern>
<pattern id="mwv" width="16" height="8" patternUnits="userSpaceOnUse"><path d="M0 4Q4 0 8 4T16 4" style="stroke:var(--wte);stroke-opacity:.55;stroke-width:1;fill:none"/></pattern>
<filter id="mpn" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .35 0 0 0 0 .24 0 0 0 0 .1 0 0 0 .55 0"/></filter>
<radialGradient id="mvg" cx="50%" cy="50%" r="75%"><stop offset="58%" stop-color="#3a2408" stop-opacity="0"/><stop offset="100%" stop-color="#3a2408" stop-opacity=".42"/></radialGradient>
<clipPath id="mcl"><rect x="${MX}" y="${MY}" width="${W*MS}" height="${H*MS}"/></clipPath><radialGradient id="mst"><stop offset="0" stop-color="#7a5010" stop-opacity=".16"/><stop offset="1" stop-color="#7a5010" stop-opacity="0"/></radialGradient></defs>
<rect width="${MFW}" height="${MFH}" style="fill:var(--bg)"/><g class="pp"><rect width="${MFW}" height="${MFH}" filter="url(#mpn)" opacity=".45"/><ellipse cx="${MFW*.2}" cy="${MFH*.3}" rx="220" ry="150" fill="url(#mst)"/><ellipse cx="${MFW*.75}" cy="${MFH*.7}" rx="260" ry="170" fill="url(#mst)"/><ellipse cx="${MFW*.55}" cy="${MFH*.12}" rx="160" ry="70" fill="url(#mst)"/></g>
<rect x="${X(0)}" y="${Y(0)}" width="${W*MS}" height="${H*MS}" style="fill:var(--F)"/>`;
 // районы
 for(let by=0;by<6;by++)for(let bx=0;bx<12;bx++){const L=cellL(bx,by);if('WSF'.includes(L))continue;const x=X(15*bx+3)+2,y=Y(15*by+3)+2,w=12*MS-4,hh=12*MS-4;o+=`<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="7" style="fill:var(--${L});stroke:var(--ink);stroke-opacity:.35;stroke-width:1"/>`;if(L=='I')o+=`<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="7" fill="url(#mhI)"/>`;if(L=='X')o+=`<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="7" fill="url(#mhX)"/>`}
 // Парки: стволы, кроны и мягкие тени вместо одинаковых точек
 o+='<g class="map-trees">'+trees.map((q,i)=>{const x=X(q[0]+.5),y=Y(q[1]+.5),r=1.6+(h(i+3,11)*1.5);return `<ellipse cx="${x+1.1}" cy="${y+2.2}" rx="${r+1}" ry="${r*.72+1}" fill="#273a26" opacity=".16"/><path d="M${x} ${y+1}v3" stroke="#765b3c" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="${r+1}" fill="var(--tre)" opacity=".45"/><circle cx="${x-.8}" cy="${y-.6}" r="${r*.72}" fill="#a7bd76" opacity=".72"/><circle cx="${x+.9}" cy="${y+.5}" r="${r*.63}" fill="var(--tre)"/>`}).join('')+'</g>';
 // Застройка: тени, контур, крыша, световые фонари и мелкая архитектурная детализация
 o+='<g class="map-buildings">'+B.map((b,i)=>{const x=X(b.x)+1,y=Y(b.y)+1,w=b.w*MS-2,hh=b.h*MS-2,roof=b.m==='glass'?'#c9dce0':b.m==='metal'?'#a9b0b3':b.m==='wood'?'#c6a27a':'#c4b59a',inset=Math.min(4,Math.max(1.5,w*.12)),winY=y+Math.min(6,hh*.22);let windows='';if(w>15&&hh>15){for(let wx=x+4;wx<x+w-2;wx+=Math.max(5,Math.min(8,w/3)))windows+=`<path d="M${wx} ${winY}v${Math.max(3,hh*.48)}" stroke="var(--ble)" stroke-width="1.2" opacity=".9"/>`}const roofLine=b.m==='glass'?`<path d="M${x+2} ${y+3}H${x+w-2}" stroke="#eef5f4" stroke-width="1.2" opacity=".8"/>`:'';return `<rect x="${x+2}" y="${y+3}" width="${w}" height="${hh}" rx="1.5" fill="#322c26" opacity=".18"/><rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="1.5" fill="${b.c||'var(--bld)'}" stroke="var(--ble)" stroke-width="1.1"/><rect x="${x+inset}" y="${y+inset}" width="${Math.max(1,w-inset*2)}" height="${Math.max(1,hh-inset*2)}" rx="1" fill="${roof}" opacity=".78"/><path d="M${x+inset} ${y+inset+2}H${x+w-inset}" stroke="#fff4d9" stroke-width="1" opacity=".55"/>${roofLine}${windows}<rect x="${x+w*.42}" y="${y+hh-4}" width="${Math.max(2,w*.16)}" height="3" fill="#453b32" opacity=".7"/>`}).join('')+'</g>';
 // дороги: непрерывные линии по осям
 const runs=[];for(let k=0;k<H/15;k++){const r=15*k+1;let a=-1,ba=-1;for(let x=0;x<=W;x++){const ok=x<W&&g[r][x]==1,br=ok&&BR.has(r*W+x);if(ok&&a<0)a=x;if(!ok&&a>=0){runs.push({hz:1,k,a,b:x,at:r});a=-1}
  if(br&&ba<0)ba=x;if(!br&&ba>=0){runs.push({hz:1,k,a:ba,b:x,at:r,br:1});ba=-1}}}
 for(let k=0;k<W/15;k++){const c=15*k+1;let a=-1,ba=-1;for(let y=0;y<=H;y++){const ok=y<H&&g[y][c]==1,br=ok&&BR.has(y*W+c);if(ok&&a<0)a=y;if(!ok&&a>=0){runs.push({hz:0,k,a,b:y,at:c});a=-1}
  if(br&&ba<0)ba=y;if(!br&&ba>=0){runs.push({hz:0,k,a:ba,b:y,at:c,br:1});ba=-1}}}
 const HW=r=>!r.br&&((r.hz&&(r.k==2||r.k==5))||(!r.hz&&(r.k==0||r.k==11)));
 const pth=(r,e)=>{let a=r.a,b=r.b,ea=0,eb=0;if(!r.br){const A=r.hz?(a>0?g[r.at][a-1]:0):(a>0?g[a-1][r.at]:0),Bb=r.hz?(b<W?g[r.at][b]:0):(b<H?g[b][r.at]:0);ea=A==5?5:0;eb=Bb==5?5:0}
  const c=15*r.k+1.5,ra=r.a<=0?0:0;return r.hz?`M${r1(X(a)-ea)} ${Y(r.at+.5)}H${r1(X(b)+eb)}`:`M${X(r.at+.5)} ${r1(Y(a)-ea)}V${r1(Y(b)+eb)}`};
 const rn=runs.filter(r=>!r.br);
 // вода: сначала контур, затем заливка (без швов)
 const wr=mergeRects((x,y)=>g[y][x]==5&&!rv[y*W+x]);
 let C=[],RD=[];for(let i=0;i<RV.length-1;i++){const[a,b,q1]=RV[i],[c,d,q2]=RV[i+1],n=Math.max(2,Math.ceil(Math.hypot(c-a,d-b)*2));for(let j=(i?1:0);j<=n;j++){const u=j/n;C.push([a+(c-a)*u,b+(d-b)*u]);RD.push(q1+(q2-q1)*u+.35)}}
 const Lp=[],Rp=[];for(let i=0;i<C.length;i++){const p=C[Math.max(0,i-3)],q=C[Math.min(C.length-1,i+3)],dx=q[0]-p[0],dy=q[1]-p[1],l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l;Lp.push([X(C[i][0]+nx*RD[i]),Y(C[i][1]+ny*RD[i])]);Rp.push([X(C[i][0]-nx*RD[i]),Y(C[i][1]-ny*RD[i])])}
 const rvp='M'+Lp.map(p=>r1(p[0])+' '+r1(p[1])).join('L')+'L'+Rp.reverse().map(p=>r1(p[0])+' '+r1(p[1])).join('L')+'Z';
 o+=`<g style="stroke:var(--ink);stroke-opacity:.5;fill:none"><path d="${rn.filter(r=>!HW(r)).map(r=>pth(r)).join('')}" style="stroke:var(--rdc);stroke-opacity:1;stroke-width:12"/><path d="${rn.filter(HW).map(r=>pth(r)).join('')}" style="stroke:var(--hwc);stroke-opacity:1;stroke-width:19"/></g>`;
 o+=`<path d="${rn.filter(r=>!HW(r)).map(r=>pth(r)).join('')}" style="fill:none;stroke:var(--rdf);stroke-width:8"/><path d="${rn.filter(HW).map(r=>pth(r)).join('')}" style="fill:none;stroke:var(--hwf);stroke-width:13"/><path d="${rn.filter(HW).map(r=>pth(r)).join('')}" style="fill:none;stroke:#fff;stroke-opacity:.7;stroke-width:1.4;stroke-dasharray:6 6"/>`;
 // Разметка улиц: прерывистые осевые линии на крупных дорогах
 o+=`<path d="${rn.filter(HW).map(r=>pth(r)).join('')}" style="fill:none;stroke:#fff5d9;stroke-opacity:.8;stroke-width:1.5;stroke-dasharray:5 7"/><path d="${rn.filter(r=>!HW(r)&&r.b-r.a>9).map(r=>pth(r)).join('')}" style="fill:none;stroke:var(--ink);stroke-opacity:.18;stroke-width:.65;stroke-dasharray:2 5"/>`;
 // водные объекты поверх концов дорог
 o+='<g clip-path="url(#mcl)">';o+=`<g style="fill:var(--wte);stroke:var(--wte);stroke-width:5;stroke-linejoin:round">${wr.map(q=>`<rect x="${X(q.x)}" y="${Y(q.y)}" width="${q.w*MS}" height="${q.h*MS}"/>`).join('')}<path d="${rvp}"/></g>`;
 o+=`<g style="fill:var(--wat);stroke:none" shape-rendering="crispEdges">${wr.map(q=>`<rect x="${X(q.x)}" y="${Y(q.y)}" width="${q.w*MS}" height="${q.h*MS}"/>`).join('')}</g><path d="${rvp}" style="fill:var(--wat)"/>`;
 o+=`<g fill="url(#mwv)" style="opacity:.9">${wr.map(q=>`<rect x="${X(q.x)}" y="${Y(q.y)}" width="${q.w*MS}" height="${q.h*MS}"/>`).join('')}<path d="${rvp}"/></g>`;o+='</g>';
 // набережная и пирсы
 const pr=mergeRects((x,y)=>g[y][x]==2&&cellL(Math.floor(x/15),Math.floor(y/15))=='H'&&(y-3)%15>=4&&x>=3),qy=mergeRects((x,y)=>g[y][x]==2&&cellL(Math.floor(x/15),Math.floor(y/15))=='H'&&(y-3)%15<4&&(y%15)>=3);
 o+=`<g style="fill:var(--quay);stroke:var(--ink);stroke-opacity:.5">${qy.map(q=>`<rect x="${X(q.x)}" y="${Y(q.y)}" width="${q.w*MS}" height="${q.h*MS}"/>`).join('')}</g><g style="fill:var(--pier);stroke:var(--ink);stroke-opacity:.6">${pr.map(q=>`<rect x="${X(q.x)}" y="${Y(q.y)}" width="${q.w*MS}" height="${q.h*MS}"/>`).join('')}</g>`;
 for(const p of props)if(p.k=='boat'){const x=X(p.x/T),y=Y(p.y/T);o+=`<path d="M${r1(x-6)} ${r1(y-3)}L${r1(x+6)} ${r1(y-3)}L${r1(x+3)} ${r1(y+3)}L${r1(x-3)} ${r1(y+3)}Z" style="fill:var(--pl);stroke:var(--ink);stroke-width:1"/>`}
 // мосты
 const bd=runs.filter(r=>r.br).map(r=>pth(r)).join('');
 o+=`<path d="${bd}" style="fill:none;stroke:var(--ink);stroke-width:17"/><path d="${bd}" style="fill:none;stroke:var(--rdf);stroke-width:11"/><path d="${bd}" style="fill:none;stroke:var(--ink);stroke-opacity:.55;stroke-width:11;stroke-dasharray:1.6 3.4"/>`;
 // сетка
 let gr='';for(let i=0;i<=12;i++)gr+=`M${X(15*i+1.5)} ${Y(0)}V${Y(H)}`;for(let j=0;j<=6;j++)gr+=`M${X(0)} ${Y(15*j+1.5)}H${X(W)}`;
 o+=`<path d="${gr}" style="fill:none;stroke:var(--grid);stroke-opacity:.42;stroke-width:.9;stroke-dasharray:3 6"/>`;
 // рамка и координаты
 o+=`<rect x="${X(0)}" y="${Y(0)}" width="${W*MS}" height="${H*MS}" style="fill:none;stroke:var(--ink);stroke-width:2.5"/><rect x="${X(0)-7}" y="${Y(0)-7}" width="${W*MS+14}" height="${H*MS+14}" style="fill:none;stroke:var(--ink);stroke-width:1"/>`;
 for(let i=0;i<12;i++){const cx0=X(15*i+9),L='ABCDEFGHIJKL'[i];o+=`<text class="sm" x="${cx0}" y="${Y(0)-14}" text-anchor="middle" font-weight="700">${L}</text><text class="sm" x="${cx0}" y="${Y(H)+24}" text-anchor="middle" font-weight="700">${L}</text>`}
 for(let j=0;j<6;j++){const cy0=Y(15*j+9)+4;o+=`<text class="sm" x="${X(0)-18}" y="${cy0}" text-anchor="middle" font-weight="700">${j+1}</text><text class="sm" x="${X(W)+18}" y="${cy0}" text-anchor="middle" font-weight="700">${j+1}</text>`}
 // подписи с плашками
 const pl=(x,y,t,fs=12)=>{const w=t.length*(fs*.74)+22;return `<rect x="${r1(x-w/2)}" y="${r1(y-fs-3)}" width="${r1(w)}" height="${fs+10}" rx="4" style="fill:var(--pl);fill-opacity:.92;stroke:var(--ink);stroke-opacity:.55"/><text class="lb" x="${x}" y="${y+1}" style="font-size:${fs}px">${t}</text>`};
 for(const[bx,by,t,ox,oy]of [[0,0,'ПРИГОРОДЫ'],[2,0,'СПАЛЬНЫЙ РАЙОН'],[2,1,'ТОРГ. ПЛОЩАДЬ',-14,-18],[3,1,'УНИВЕРСИТЕТ',16,16],[1,2,'ЖИЛОЙ КВАРТАЛ'],[5,0,'ПАРКИ'],[2,2,'ПАРКИ'],[7,3,'ПАРКИ'],[7,1,'СТАРЫЙ ЦЕНТР'],[8,0,'РИТЕЙЛ'],[4,3,'ФИНАНСОВЫЙ КВ.'],[8,2,'ТРАНСПОРТНЫЙ УЗЕЛ'],[2,3,'ГАВАНЬ'],[2,4,'БУХТА И МАРИНА'],[5,4,'ПРОМЗОНА'],[8,3,'ХИМЗАВОД'],[8,4,'АВТОЗАВОД'],[7,5,'ЛОГИСТИКА'],[5,5,'ТОРГ. КОМПЛЕКС'],[10,4,'ЮГО-ВОСТОК'],[9,3,'ЛАГУНА']])o+=pl(X(15*bx+9)+(ox||0),Y(15*by+9)+(oy||0)+(t=='ГАВАНЬ'?-14:0),t,11);
 o+=`<path id="mrp" d="M${r1(X(70))} ${r1(Y(16))}L${r1(X(86))} ${r1(Y(33))}L${r1(X(98))} ${r1(Y(52))}" style="fill:none"/><text style="fill:var(--ink);font-style:italic;font-size:15px;letter-spacing:.35em;font-weight:700;opacity:.85"><textPath href="#mrp" startOffset="50%" text-anchor="middle">РЕКА СЕРПАНТИН</textPath></text>`;
 o+=pl(X(95),Y(44.4)-18,'ЦЕНТРАЛЬНЫЙ МОСТ',10);
 for(const[hx,hy,t]of[[26,31.5,'H4'],[22,76.5,'H3'],[1.5,40,'H1'],[166.5,24,'H2']]){o+=`<rect x="${X(hx)-14}" y="${Y(hy)-9}" width="28" height="18" rx="9" style="fill:var(--hwc);stroke:var(--ink)"/><text x="${X(hx)}" y="${Y(hy)+4}" text-anchor="middle" style="fill:var(--bg);font-size:11px;font-weight:800">${t}</text>`}
 // маркеры игрока
 o+=`<g class="mk-c" style="display:none"><rect x="-6" y="-6" width="12" height="12" rx="2" style="fill:#2e9fe6;stroke:#fff;stroke-width:2"/></g><g class="mk-o" style="display:none"><path d="M0 -10L8 0L0 10L-8 0Z" style="fill:#e8402f;stroke:#fff;stroke-width:2"><animate attributeName="opacity" values="1;.4;1" dur="1s" repeatCount="indefinite"/></path></g><g class="mk-p"><circle r="8" style="fill:none;stroke:#ffd23f;stroke-width:2"><animate attributeName="r" values="7;18;7" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="1.8s" repeatCount="indefinite"/></circle><circle r="6" style="fill:#ffd23f;stroke:#222;stroke-width:2"/></g>`;
 // шапка, компас, масштаб
 o+=`<text x="${MX}" y="44" style="fill:var(--ink);font:700 30px Georgia,'Times New Roman',serif;letter-spacing:.14em">БРОКЕВИЛЬ</text><text x="${MX}" y="68" style="fill:var(--ink);font:italic 14px Georgia,serif;letter-spacing:.12em;opacity:.85">ТАКТИЧЕСКИЙ ПЛАН ГОРОДА · 12×6 КВАРТАЛОВ · ИЗДАНИЕ 2026</text><g transform="translate(${MFW-MX-34} 44)"><circle r="26" style="fill:none;stroke:var(--ink);stroke-width:1.5"/><path d="M0 -24L6 0L0 24L-6 0Z" style="fill:var(--ink)"/><path d="M-24 0L0 -5L24 0L0 5Z" style="fill:var(--ink);fill-opacity:.4"/><text y="-30" text-anchor="middle" style="fill:var(--ink);font-size:13px;font-weight:800">С</text></g>`;
 const by0=Y(H)+46;o+=`<g transform="translate(${X(0)} ${by0+14})"><text class="sm" y="-8" style="font-weight:700;letter-spacing:.1em">МАСШТАБ</text>${[0,1,2].map(i=>`<rect x="${i*120}" y="0" width="120" height="8" style="fill:${i%2?'var(--bg)':'var(--ink)'};stroke:var(--ink)"/>`).join('')}<text class="sm" y="24">0</text><text class="sm" x="120" y="24" text-anchor="middle">1 квартал</text><text class="sm" x="240" y="24" text-anchor="middle">2</text><text class="sm" x="360" y="24" text-anchor="end">3 кв.</text><text class="sm" y="52" style="opacity:.8">1 квартал = 15 клеток · сетка A–L / 1–6</text></g>`;
 // легенда
 const LX=MFW-MX-640,LY=by0-8,LH=150;o+=`<g transform="translate(${LX} ${LY})"><rect width="640" height="${LH}" rx="6" style="fill:var(--pl);fill-opacity:.94;stroke:var(--ink);stroke-width:2"/><rect x="5" y="5" width="630" height="${LH-10}" rx="4" style="fill:none;stroke:var(--ink);stroke-opacity:.6"/><text x="20" y="27" style="fill:var(--ink);font:700 14px Georgia,serif;letter-spacing:.2em">ЛЕГЕНДА</text>`;
 const col1=[['G','Старый центр'],['D','Деловой / финансовый'],['R','Жилые районы'],['V','Пригороды'],['M','Торговые районы']],col2=[['C','Университет'],['I','Промзона (штрих)'],['X','Заводы / химия'],['P','Парки'],['H','Порт и гавань']];
 col1.forEach(([k,n],i)=>o+=`<rect x="20" y="${42+i*20}" width="22" height="14" rx="3" style="fill:var(--${k});stroke:var(--ink);stroke-opacity:.6"/><text class="sm" x="52" y="${53+i*20}">${n}</text>`);
 col2.forEach(([k,n],i)=>{o+=`<rect x="220" y="${42+i*20}" width="22" height="14" rx="3" style="fill:var(--${k});stroke:var(--ink);stroke-opacity:.6"/>${k=='I'?`<rect x="220" y="${42+i*20}" width="22" height="14" rx="3" fill="url(#mhI)"/>`:k=='X'?`<rect x="220" y="${42+i*20}" width="22" height="14" rx="3" fill="url(#mhX)"/>`:''}<text class="sm" x="252" y="${53+i*20}">${n}</text>`});
 o+=`<path d="M420 49H452" style="stroke:var(--hwc);stroke-width:12"/><path d="M420 49H452" style="stroke:var(--hwf);stroke-width:8"/><text class="sm" x="464" y="53">Шоссе (H1–H4)</text><path d="M420 69H452" style="stroke:var(--rdc);stroke-width:9"/><path d="M420 69H452" style="stroke:var(--rdf);stroke-width:6"/><text class="sm" x="464" y="73">Улица</text><path d="M420 89H452" style="stroke:var(--ink);stroke-width:11"/><path d="M420 89H452" style="stroke:var(--rdf);stroke-width:7"/><text class="sm" x="464" y="93">Мост</text><rect x="420" y="102" width="32" height="12" style="fill:var(--wat);stroke:var(--wte);stroke-width:2"/><text class="sm" x="464" y="112">Река и море</text><rect x="420" y="122" width="32" height="12" rx="1.5" style="fill:var(--bld);stroke:var(--ble)"/><text class="sm" x="464" y="132">Здание</text><circle cx="556" cy="49" r="6" style="fill:#ffd23f;stroke:#222;stroke-width:2"/><text class="sm" x="570" y="53">Ты</text><path d="M556 63L563 71L556 79L549 71Z" style="fill:#e8402f;stroke:#fff;stroke-width:1.5"/><text class="sm" x="570" y="75">Заказ</text><rect x="550" y="86" width="12" height="12" rx="2" style="fill:#2e9fe6;stroke:#fff;stroke-width:1.5"/><text class="sm" x="570" y="96">Машина</text></g>`;
 return o+'</svg>'}
const mapSvg=()=>MAPSVG||(MAPSVG=buildMap());
function mmDraw(){const P=`translate(${MX+px/T*MS} ${MY+py/T*MS})`;document.querySelectorAll('.mk-p').forEach(e=>e.setAttribute('transform',P));
 document.querySelectorAll('.mk-o').forEach(e=>{if(order){e.setAttribute('transform',`translate(${MX+order.b.dx/T*MS} ${MY+order.b.dy/T*MS})`);e.style.display=''}else e.style.display='none'});
 document.querySelectorAll('.mk-c').forEach(e=>{if(veh.own){e.setAttribute('transform',`translate(${MX+(veh.on?px:veh.x)/T*MS} ${MY+(veh.on?py:veh.y)/T*MS})`);e.style.display=''}else e.style.display='none'})}
function mapFill(){const b=$('mfb');b.innerHTML=mapSvg();const s=b.firstChild;s.style.width=(MFW*mapZ)+'px';s.style.maxWidth='none';mmDraw();b.scrollLeft=(MX+px/T*MS)*mapZ-b.clientWidth/2;b.scrollTop=(MY+py/T*MS)*mapZ-b.clientHeight/2}
function mapOpen(){MFO=1;$('mapfs').style.display='flex';mapFill()}
function mapClose(){MFO=0;$('mapfs').style.display='none'}
function phR(){const c=$('phc'),bk='<button class="pb2" data-a="back">‹ Назад</button>';phHdr();let h='';
 if(!papp)h='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">'+APPS.map(a=>`<button class="pa" data-a="app:${a[2]}"><span style="font-size:30px">${a[0]}</span><br>${a[1]}${a[2]=='msg'&&phone.un?' <b style="color:#f55">●'+phone.un+'</b>':''}</button>`).join('')+'</div>';
 else if(papp=='map')h=bk+`<div data-a="mapfs" style="margin-top:8px;border-radius:10px;overflow:hidden;border:2px solid #2b2f40">${mapSvg()}</div><button class="pb2" data-a="mapfs" style="margin-top:8px;width:100%">🔍 Открыть карту на весь экран</button><div class="pn2">Детализированная карта Брокевиля: районы, кварталы зданий, парки, река, гавань, мосты, магистрали и координатная сетка. Переключай «Бумага / Чертёж», приближай карту кнопками +/− и ищи своё положение по жёлтому маркеру.</div>`;
 else if(papp=='shop'){const row=(ic,n,d,a,p)=>`<div class="pr"><span>${ic} ${n}<small>${d}</small></span><button class="pb2" data-a="${a}">${p}</button></div>`;
  h=bk+'<div class="ph2">Еда и расходники</div>'+Object.entries(ITEMS).map(([k,v])=>row(v.ic,v.n,v.d,'buy:'+k,v.p+' €')).join('')+'<div class="ph2">Мебель для квартиры'+(apt.own?'':' (нужна квартира)')+'</div>'+UP.map(([k,n,p])=>row('🛋',n,apt.it[k]?'уже стоит':'ставится в квартиру','up:'+k,apt.it[k]?'✔':p+' €')).join('')+'<div class="ph2">Скоро</div><div class="pn2">Оборудование для магазина и транспорт — в следующих фазах.</div>'}
 else if(papp=='bag'){const L=inventory.filter(q=>ITEMS[q.id]);h=bk+'<div class="ph2">Рюкзак</div>'+(L.length?L.map(q=>{const v=ITEMS[q.id];return `<div class="pr"><span>${v.ic} ${v.n} ×${q.count}<small>${v.d}</small></span>${v.use?`<button class="pb2" data-a="use:${q.id}">Использовать</button>`:''}</div>`}).join(''):'<div class="pn2">Пусто. Купи что-нибудь в приложении «Магазин».</div>')}
 else if(papp=='msg')h=bk+'<div class="ph2">Сообщения</div>'+phone.msgs.map(m=>`<div class="pr" style="display:block"><b>${m[0]}</b> <small style="display:inline">${m[2]}</small><br>${m[1]}</div>`).join('');
 else if(papp=='bank')h=bk+`<div class="ph2">Баланс: ${money|0} €${debt?' · долг '+debt+' €':''}</div>`+coins.map(q=>`<div class="pr"><span>${q.n}<small>у тебя ${q.a.toFixed(2)}</small></span><b>${q.p.toFixed(1)} €</b></div>`).join('')+'<div class="ph2">История операций</div>'+(led.length?led.map(e=>`<div class="pr"><span>${e[0]}</span><b style="color:${e[1]>0?'#6c6':'#e66'}">${e[1]>0?'+':''}${e[1]} €</b></div>`).join(''):'<div class="pn2">Пока пусто</div>');
 else if(papp=='stat'){const S=(a,b)=>`<div class="pr"><span>${a}</span><b>${b}</b></div>`;h=bk+'<div class="ph2">Статистика</div>'+S('Статус',STG)+S('Капитал',(NWV|0)+' €')+S('Наличные',(money|0)+' €')+S('Долг',debt+' €')+S('Ларёк',own?'есть':'нет')+S('Квартира',apt.own?'есть':'нет')+S('Машина',veh.own?'есть':'нет')+S('Скутер',scoot?'есть':'нет')+S('Heat (внимание)',heat|0)+S('Сотрудники',emp.length)+S('Версия сохранения',SV)}
 else if(papp=='hire'){const R2={cashier:'Кассир',porter:'Грузчик',guard:'Охранник',courier:'Курьер',dealer:'Дилер',botanist:'Ботаник'};h=bk+'<div class="ph2">Кандидаты (обновляются раз в сутки)</div>'+cands.map((c,i)=>`<div class="pr"><span>${c.n} · ${R2[c.r]}<small>навык ${c.s}/5 · ${c.w} €/день · ${c.t}</small></span><button class="pb2" data-a="hire:${i}">Нанять</button></div>`).join('')+`<div class="ph2">Команда (${emp.length})</div>`+(emp.length?emp.map((e,i)=>`<div class="pr"><span>${e.n} · ${R2[e.r]}<small>навык ${e.s} · лояльность ${e.l|0} · ${e.w} €/день</small></span><span><button class="pb2" data-a="raise:${i}">⬆</button> <button class="pb2" data-a="fire:${i}">✕</button></span></div>`).join(''):'<div class="pn2">Никого нет.</div>')+'<div class="pn2">Зарплаты — раз в сутки. Кассир и грузчик работают на ларёк, охранник снижает кражи, курьер приносит доход, дилер продаёт особый товар. Найм = депозит 2× зарплаты.</div>'}
 else if(papp=='tv'){h=bk+'<div class="ph2">📺 Телевизор'+(apt.own?'':' (нужна квартира)')+'</div>'+[['news','📰 Новости'],['ad','📢 Реклама'],['crime','🚨 Криминальная хроника'],['wx','⛅ Погода']].map(c=>`<div class="pr"><span>${c[1]}<small>+энергия, +20 мин</small></span><button class="pb2" data-a="tv:${c[0]}">Смотреть</button></div>`).join('')}
 else if(papp=='dark'){h=bk+'<div class="ph2">🕶 Тень — «Лунный мох» (вымышленная культура)</div>';if(NWV<1500)h+='<div class="pn2">Контакты появятся при капитале 1500 €.</div>';else{const r=(a,b,c,d)=>`<div class="pr"><span>${a}<small>${b}</small></span>${c?`<button class="pb2" data-a="dk:${c}">${d}</button>`:''}</div>`;
 h+=r('🚔 Heat: '+(heat|0),'выше 70 — облавы и предательства','','')+'<div class="ph2">Снабжение</div>'+Object.entries(SH).map(([k,v])=>r(v[1]+' · '+v[0]+' €',v[2]+' · есть: '+(k=='tent'?dk.pots.length:dk[k]||0)+(k=='seed'&&dk.ord.length?' (в пути '+dk.ord.length+')':''),'b'+k,'Купить')).join('')
 +'<div class="ph2">Палатки</div>'+(dk.pots.length?dk.pots.map((p,i)=>r('🌱 #'+(i+1)+' '+(p.s==0?'пусто':p.s==1?'земля есть':'рост '+(p.g|0)+'% · влага '+(p.m|0)+'%'),p.s==2?(p.f?'🧪':'')+(p.p?'📈':'')+(p.sp?'⚡':'')+(p.g>=100?' зрелое!':''):'',p.s==0?'p'+i+'s':p.s==1?'p'+i+'d':p.g>=100?'p'+i+'h':'p'+i+'w',p.s==0?'Земля':p.s==1?'Посадить':p.g>=100?'Собрать':'Полить')+(p.s==2&&p.g<100?r('','добавки из рюкзака','p'+i+'u','+ добавки'):'')).join(''):'<div class="pn2">Купи Grow Tent.</div>')
 +'<div class="ph2">Продукт</div>'+r('🌿 Сырой: '+dk.bud.length+' · 🪵 Сушка: '+dk.dry.length,dk.bud.map(q=>'★'+q).join(' ')||'—','zdry','Сушить')+r('📦 Упаковано: '+dk.pack.length,dk.pack.map(q=>'★'+q).join(' ')||'нужны пакеты и станция','zpack','Упаковать')+r('Сбыть лично','55 € × ★, heat растёт','zsell','Сбыть')+r('Взятка','300 €: heat −30','zbribe','Дать')+r('Отмыть через ларёк',own?'500 € → 400 €, heat −15':'нужен ларёк','zwash','Отмыть')+'<div class="pn2">Ботаник из «Найма» сам сажает, поливает и собирает до 8 палаток из запаса земли и семян. Только игровые числа.</div>'}}
 c.innerHTML=h;if(papp=='map')mmDraw()}
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

function genCands(){cands=[];const rl=['cashier','porter','guard','courier','dealer','botanist'];for(let i=0;i<3+(Math.random()*4|0);i++){const s=1+(Math.random()*5|0);cands.push({n:nm2[Math.random()*nm2.length|0],r:rl[Math.random()*6|0],s,w:40+s*20+(Math.random()*20|0),t:tr2[Math.random()*tr2.length|0]})}}
function newDay(){genCands();if(dk.pots.length>3)heat+=1;let tot=0;for(const e of emp)tot+=e.w;
 if(tot){if(money>=tot){money-=tot;for(const e of emp)e.l=Math.min(100,e.l+2);pmsg('Бухгалтерия','Зарплаты выплачены: '+tot+' €')}else{for(const e of emp)e.l-=15;pmsg('Бухгалтерия','Нет денег на зарплаты! Люди недовольны.')}}
 let inc=0;const guard=emp.some(e=>e.r=='guard');
 for(const e of emp){if(e.r=='cashier'&&own)inc+=e.s*35;else if(e.r=='porter'&&own&&stock<8)stock+=e.s;else if(e.r=='courier')inc+=e.s*30;else if(e.r=='dealer'){const n=Math.min(dk.pack.length,e.s);for(let i=0;i<n;i++)inc+=Math.round(dk.pack.shift()*55*.7);heat+=n*3;if((e.l<30&&Math.random()<.4)||(heat>80&&Math.random()<.3)){const f=Math.min(money,200);money-=f;heat+=20;e.l=0;pmsg('Улица',e.n+' сдал тебя полиции. Штраф '+f+' €.')}}}
 if(inc){money+=inc;pmsg('Выручка','Команда принесла '+inc+' €')}
 if(own&&till>50&&!guard&&Math.random()<.3){const l=Math.round(till*.15);till-=l;pmsg('Ларёк','В ларьке не сходится учёт: −'+l+' €')}
 for(let i=emp.length;i--;)if(emp[i].l<=0){pmsg('Кадры',emp[i].n+' ушёл');emp.splice(i,1)}
 heat=Math.max(0,heat-3);
 if(heat>70&&Math.random()<.4){const f=Math.round(money*.2);money-=f;const lost=dk.bud.length+dk.dry.length+dk.pack.length;dk.bud=[];dk.dry=[];dk.pack=[];heat=35;pmsg('Полиция','Облава! Конфискован товар ('+lost+'), штраф '+f+' €.')}}
const SH={tent:[100,'Grow Tent','палатка со светом, до 8'],soil:[10,'Земля','хватает на 2 урожая'],seed:[30,'Семена Лунного мха','доставка ~20 с (Альберт)'],fert:[30,'Удобрение','+качество'],pgr:[30,'PGR','+урожай, −качество'],spd:[30,'Speed Grow','рост ×1.5, −качество'],bag:[1,'Пакеты','для упаковки'],rack:[250,'Drying Rack','сушит 6 порций, +★'],spr:[200,'Спринклер','автополив палаток'],pk:[100,'Станция упаковки','фасовка']};
function newDk(){return{u:0,seed:0,soil:0,fert:0,pgr:0,spd:0,bag:0,rack:0,spr:0,pk:0,pots:[],bud:[],dry:[],pack:[],ord:[],ft:0}}
function harv(p){const n=2+(p.p?2:0);let q=1+(Math.random()*2|0)+(p.f?1:0)-(p.p?1:0)-(p.sp?1:0);q=Math.max(1,Math.min(5,q));for(let i=0;i<n;i++)dk.bud.push(q);p.u=(p.u||0)+1;p.s=p.u>=2?0:1;if(p.s==0)p.u=0;p.g=0;p.m=0;p.f=p.p=p.sp=0}
function farmTick(dt){const P=dk.pots;for(const p of P)if(p.s==2){if(dk.spr&&p.m<35)p.m=100;p.m=Math.max(0,p.m-dt*.6);if(p.m>0&&p.g<100)p.g=Math.min(100,p.g+dt*1.11*(p.sp?1.5:1))}
 for(const d of dk.dry)if(!d.d){d.t-=dt;if(d.t<=0){d.d=1;d.q=Math.min(5,d.q+1)}}
 for(let i=dk.ord.length;i--;){dk.ord[i]-=dt;if(dk.ord[i]<=0){dk.ord.splice(i,1);dk.seed++;pmsg('Альберт','Заказ забран из тайника: семена в рюкзаке.')}}
 dk.ft+=dt;if(dk.ft>3){dk.ft=0;const n=emp.filter(e=>e.r=='botanist').length;if(n){let c=n*8;for(const p of P){if(c--<=0)break;if(p.s==0&&dk.soil>0){dk.soil--;p.s=1}if(p.s==1&&dk.seed>0){dk.seed--;p.s=2;p.g=0;p.m=100}if(p.s==2&&p.m<40)p.m=100;if(p.s==2&&p.g>=100)harv(p)}}}}
function darkAct(a){
 if(a[0]=='z'){
  if(a=='zdry'){const cap=dk.rack*6-dk.dry.filter(d=>!d.d).length;if(cap<=0)return toast('Нужна сушилка');for(let i=0;i<cap&&dk.bud.length;i++)dk.dry.push({q:dk.bud.shift(),t:25,d:0})}
  else if(a=='zpack'){if(!dk.pk)return toast('Нужна станция упаковки');let n=dk.bag;if(n<1)return toast('Нужны пакеты');dk.dry=dk.dry.filter(d=>{if(d.d&&n>0){n--;dk.pack.push(d.q);return false}return true});while(n>0&&dk.bud.length){n--;dk.pack.push(dk.bud.shift())}dk.bag=n}
  else if(a=='zsell'){if(!dk.pack.length)return toast('Нечего сбывать');let s=0;for(const q of dk.pack)s+=q*55;const n=dk.pack.length;dk.pack=[];money+=s;heat+=6*n;toast('+'+s+' € · heat растёт');if(Math.random()<heat/200){const f=Math.min(money,150);money-=f;toast('🚔 Задержали! Штраф '+f+' €')}}
  else if(a=='zbribe'){if(pay(300))heat=Math.max(0,heat-30)}
  else if(a=='zwash'){if(!own)toast('Нужен ларёк');else if(pay(500)){money+=400;heat=Math.max(0,heat-15);toast('Чисто: вернулось 400 €')}}
  return}
 if(a[0]=='b'){const k=a.slice(1),v=SH[k];if(!v)return;if(k=='tent'&&dk.pots.length>=8)return toast('Максимум 8 палаток');if(!pay(v[0]))return;if(k=='tent')dk.pots.push({s:0,g:0,m:0,u:0});else if(k=='seed'){dk.ord.push(20);toast('Заказ у Альберта: ~20 с')}else dk[k]=(dk[k]||0)+1;return}
 if(a[0]=='p'){const i=parseInt(a.slice(1)),o=a.slice(-1),p=dk.pots[i];if(!p)return;
  if(o=='s'){if(p.s==0&&dk.soil>0){dk.soil--;p.s=1}else toast('Нужна земля')}
  else if(o=='d'){if(p.s==1&&dk.seed>0){dk.seed--;p.s=2;p.g=0;p.m=100}else toast('Нужны семена')}
  else if(o=='w'&&p.s==2)p.m=100;
  else if(o=='h'&&p.s==2&&p.g>=100)harv(p);
  else if(o=='u'&&p.s==2){if(dk.fert>0&&!p.f){dk.fert--;p.f=1}if(dk.pgr>0&&!p.p){dk.pgr--;p.p=1}if(dk.spd>0&&!p.sp){dk.spd--;p.sp=1}}}}
genCands();
function frame(){requestAnimationFrame(frame);const dt=.016;t+=dt;mins+=dt*2;if(mins>=1440){mins-=1440;newDay()}rain=h(Math.floor(t/100),5)>.7?1:0;rA+=(rain-rA)*dt*.5;
 let vx=jx+((keys.d||keys.arrowright)?1:0)-((keys.a||keys.arrowleft)?1:0),vy=jy+((keys.s||keys.arrowdown)?1:0)-((keys.w||keys.arrowup)?1:0);
 const l=Math.hypot(vx,vy),mv=l>.1&&!cur&&!mf&&!inn&&!PH;
 if(veh.on&&!cur&&!mf&&!PH)drive(vx,vy,l,dt);else if(mv){if(l>1){vx/=l;vy/=l}const sp=(en>15?100:55)*dt*(scoot?1.7:1);const nx=px+vx*sp,ny=py+vy*sp;if(free(nx,py))px=nx;if(free(px,ny))py=ny;
  pd=Math.abs(vx)>Math.abs(vy)?(vx<0?2:3):(vy<0?1:0);pf=(t*10|0)%2;en=Math.max(0,en-dt*.35)}else en=Math.min(100,en+dt*3);
 for(const n of NP){n.tm-=dt;if(n.tm<=0){const r=Math.random();n.tm=1+Math.random()*3;const sg=()=>Math.random()<.5?-1:1;n.vx=r<.3?0:sg();n.vy=r<.3?0:sg();if(Math.random()<.5)n.vy=0;else n.vx=0}
  if(n==cur||n.in>t){n.vx=n.vy=0}else{const ca=cwAx(n.x/T|0,n.y/T|0);if(ca==0){n.vx=0;n.vy=n.vy||n.cy||1;n.cy=n.vy;n.tm=.4}else if(ca==1){n.vy=0;n.vx=n.vx||n.cx||1;n.cx=n.vx;n.tm=.4}}const nx=n.x+n.vx*36*dt,ny=n.y+n.vy*36*dt;
  if(free(nx,n.y)&&pw(nx,n.y,n))n.x=nx;else n.vx=0;if(free(n.x,ny)&&pw(n.x,ny,n))n.y=ny;else n.vy=0;
  if(n.vx||n.vy)n.d=Math.abs(n.vx)>Math.abs(n.vy)?(n.vx<0?2:3):(n.vy<0?1:0)}
 NB();findNear();ledg();farmTick(dt);heat=Math.max(0,heat-dt*.02);if(!dk.u&&NWV>=1500){dk.u=1;pmsg('Незнакомец','Есть тема для серьёзных людей. Загляни в приложение «Тень».')}tk+=dt;if(tk>=7.5){tk=0;tickM()}for(const c of cars)carStep(c,dt);
 const dark=Math.max(0,Math.min(.62,(Math.cos((mins/1440-.5)*6.2832)+.25)*.7)),
 hh=String(mins/60%24|0).padStart(2,'0')+':'+String(mins%60|0).padStart(2,'0');
 const nw=money+goods*30+coins.reduce((q,c)=>q+c.a*c.p,0)+(own?1200:0)+(scoot?900:0)-debt,stg=nw<1000?'Нищий':nw<2500?'Работяга':nw<6000?'Делец':nw<15000?'Предприниматель':nw<40000?'Магнат':'Хозяин города';NWV=nw;STG=stg;
 $('hud').innerHTML=`€ ${money|0} &nbsp; 🕐 ${hh} &nbsp; ⚡ ${en|0}% &nbsp; 🎒 ${goods}<br><span style="font-size:12px;opacity:.85">${distName(px,py)} · ${stg} · капитал ${nw|0} €${debt?' · долг '+debt:''}${heat>25?' · 🚔'+(heat|0):''}${rA>.5?' · 🌧':''}</span>`+(veh.own?`<br>🚗 ⛽${veh.f|0}% 🔧${veh.hp|0}%${veh.on?' · '+(veh.v|0)+' км/ч':''}`:'')+(order?`<br>📦 Пицца: ${order.b.n} (+${rew()} €)`:'');
 if(inn){DK=dark;inDraw(dt,vx,vy,l);return}
 // сцена
 const vw=cv.width/Z,vh=cv.height/Z;if(!cam.i||Math.hypot(cam.x-px,cam.y-py)>400){cam.x=px;cam.y=py;cam.i=1}cam.x+=(px-cam.x)*Math.min(1,dt*7);cam.y+=(py-cam.y)*Math.min(1,dt*7);const ox=Math.round(vw/2-cam.x),oy=Math.round(vh/2-cam.y+20);
 cx.setTransform(Z,0,0,Z,0,0);cx.imageSmoothingEnabled=false;cx.fillStyle='#4f7a3a';cx.fillRect(0,0,vw,vh);cx.translate(ox,oy);DN=dark;if(shk>0){cx.translate((Math.random()-.5)*shk*14,(Math.random()-.5)*shk*14);shk-=dt}
 const x0=Math.max(0,(-ox/T|0)-1),x1=Math.min(W,((vw-ox)/T|0)+2),y0=Math.max(0,(-oy/T|0)-1),y1=Math.min(H,((vh-oy)/T|0)+2);
 for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){const k=g[y][x],X=x*T,Y=y*T;
  if(k==1){cx.fillStyle='#3a3d45';cx.fillRect(X,Y,T,T);{const r=h(x,y);if(r>.8){cx.fillStyle='#34363d';cx.fillRect(X+4,Y+6,18,12)}if(r<.12){cx.fillStyle='#2a2c32';cx.fillRect(X+6,Y+8,1,12);cx.fillRect(X+7,Y+14,8,1)}if(h(y,x)>.97){cx.fillStyle='#22242a';cx.fillRect(X+10,Y+10,12,12);cx.fillStyle='#555';cx.fillRect(X+13,Y+13,2,2);cx.fillRect(X+18,Y+17,2,2)}if(rA>.3){cx.fillStyle='rgba(120,150,190,'+(.18*rA)+')';cx.fillRect(X,Y,T,T)}}{const ca=cwAx(x,y);if(ca>=0){cx.fillStyle='#e6e4da';for(let i=0;i<5;i++)ca==0?cx.fillRect(X+3,Y+2+i*6,T-6,3):cx.fillRect(X+2+i*6,Y+3,3,T-6)}}if((x%15==1&&y%15>2||y%15==1&&x%15>2)&&((x+y)&1)){cx.fillStyle='#d9c35a';if(x%15==1)cx.fillRect(X+14,Y+4,4,T-8);else cx.fillRect(X+4,Y+14,T-8,4)}if(BR.has(y*W+x)){cx.fillStyle='#9a968c';if(y%15==0)cx.fillRect(X,Y,T,5);if(y%15==2)cx.fillRect(X,Y+T-5,T,5);cx.fillStyle='rgba(0,0,0,.25)';if(y%15==2)cx.fillRect(X,Y+T,T,4)}}
  else if(k==5){cx.fillStyle='#2c6a9c';cx.fillRect(X,Y,T,T);cx.fillStyle='rgba(255,255,255,.35)';const o=Math.sin(t*2+x+y*2)*4;cx.fillRect(X+8+o,Y+10,10,2);cx.fillRect(X+2-o,Y+22,8,2);cx.fillStyle='rgba(255,255,255,.1)';cx.fillRect(X,Y+4,T,3)}
  else if(k==2){cx.fillStyle=['#9a968c','#a29e92','#948f85'][h(x,y)*3|0];cx.fillRect(X,Y,T,T);if(h(x+9,y)>.93){cx.fillStyle='rgba(60,110,170,.35)';cx.beginPath();cx.ellipse(X+16,Y+18,9,4,0,0,7);cx.fill()}if(h(x,y+9)>.95){cx.fillStyle='#ddd';cx.fillRect(X+9,Y+20,2,1)}if(y>0&&g[y-1][x]==1){cx.fillStyle='#55575c';cx.fillRect(X,Y,T,3)}cx.fillStyle='rgba(0,0,0,.12)';cx.fillRect(X,Y+T-1,T,1);cx.fillRect(X+T-1,Y,1,T)}
  else if(k==6){cx.fillStyle=h(x,y)>.5?'#e6d79c':'#dccb8c';cx.fillRect(X,Y,T,T);if(h(x*5,y)>.8){cx.fillStyle='#bba96e';cx.fillRect(X+10,Y+14,3,2)}}
  else{cx.fillStyle=x>=63?(h(x,y)>.5?'#3d6b34':'#356030'):h(x,y)>.5?'#527f3d':'#4a7536';cx.fillRect(X,Y,T,T);
   cx.strokeStyle='#6fa24d';cx.lineWidth=1.5;cx.beginPath();for(let i=0;i<4;i++){const gx=X+4+i*8+h(x+i,y)*4,gy=Y+6+(i%2)*14+h(x,y+i)*6,
    bend=Math.sin(t*2+gx*.05+gy*.03)*2.5,dd=Math.hypot(gx-px,gy-py),pu=dd<14?(gx-px)/(dd+1)*(14-dd)*.5:0;cx.moveTo(gx,gy);cx.lineTo(gx+bend+pu,gy-7+(dd<14?4:0))}cx.stroke();
   {const q=h(x*3,y*7);if(q>.93){cx.fillStyle=['#f3e9c8','#e86a8a','#f2d14a','#9b7be0'][h(x,y*2)*4|0];cx.fillRect(X+10,Y+12,3,3);cx.fillRect(X+11,Y+11,1,5)}else if(q<.05){cx.fillStyle='#8f8b82';cx.fillRect(X+7,Y+20,3,2);cx.fillRect(X+22,Y+9,2,2)}else if(q>.5&&q<.54){cx.fillStyle='#a89a52';cx.fillRect(X+14,Y+8,1,6);cx.fillRect(X+17,Y+10,1,5)}}}}
 const R=[];for(const b of B){if(Math.abs(b.x*T+b.w*T/2-px)>vw/2+b.w*T/2+60||Math.abs((b.y+b.h/2)*T-py)>vh/2+b.h*T/2+80)continue;R.push([(b.y+b.h)*T,()=>{const bx=b.x*T,by=b.y*T,bw=b.w*T,bh=b.h*T,L=Math.min(46,bh*.3);cx.fillStyle='rgba(25,30,50,'+(.2*(1-dark))+')';cx.beginPath();cx.moveTo(bx+bw,by+bh);cx.lineTo(bx+bw+L,by+bh+L*.35);cx.lineTo(bx+bw+L,by+bh*.45);cx.lineTo(bx+bw,by+bh*.3);cx.fill();bld(b,dark)}])}
 for(const q of trees){const X=q[0]*T+16,Y=q[1]*T+24;if(Math.abs(X-px)>vw/2+50||Math.abs(Y-py)>vh/2+70)continue;R.push([Y,()=>{cx.fillStyle='rgba(0,0,0,.25)';cx.beginPath();cx.ellipse(X,Y,14,5,0,0,7);cx.fill();cx.fillStyle='#5a3d28';cx.fillRect(X-3,Y-22,6,22);
  for(let i=0;i<5;i++){const a=i*1.3,sw=Math.sin(t*1.5+i+X*.02)*2;cx.fillStyle=i%2?'#2f6b34':'#3c8040';cx.beginPath();cx.arc(X+Math.cos(a)*9+sw,Y-30+Math.sin(a)*8,10,0,7);cx.fill()}}])}
 for(const n of NP)if(!(n.in>t))R.push([n.y,()=>{person(n.x,n.y,n.c,n.hr,n.d,(t*8|0)%2,n.vx||n.vy,n.g,n.bd);if(n.bt>t){cx.font='9px system-ui';const tw=cx.measureText(n.bs).width+8;cx.fillStyle='#fff';cx.fillRect(n.x-tw/2,n.y-66,tw,13);cx.fillStyle='#222';cx.textAlign='center';cx.fillText(n.bs,n.x,n.y-56)}}]);
 R.push([py,()=>{if(veh.on)drawCar(px,py,veh.d<2?1:0,(veh.d==0||veh.d==3)?1:-1,veh.col,0,veh.v,veh.v<5,veh.hp);else person(px,py,['#e8a33d','#2e86c1','#27ae60','#8e44ad','#c0392b','#111'][style],PG?'#6a3a1a':'#3a2a1a',pd,pf,mv,PG)}]);if(veh.own&&!veh.on)R.push([veh.y,()=>drawCar(veh.x,veh.y,veh.d<2?1:0,(veh.d==0||veh.d==3)?1:-1,veh.col,0,0,1,veh.hp)]);
 for(const p of props){if(Math.abs(p.x-px)>vw||Math.abs(p.y-py)>vh)continue;R.push([p.y,()=>{if(p.k=='lamp'){cx.fillStyle='#333';cx.fillRect(p.x-1,p.y-34,3,34);cx.fillStyle=dark>.2?'#ffe08a':'#999';cx.fillRect(p.x-4,p.y-38,9,5);if(dark>.2){cx.fillStyle='rgba(255,224,138,.22)';cx.beginPath();cx.arc(p.x,p.y-10,34,0,7);cx.fill()}}
 else if(p.k=='boat'){const by=p.y-4+Math.sin(t*1.5+p.x)*1.5,hc=['#e8e4d6','#c0392b','#2e86c1','#d4ac0d'][(p.r*4|0)];cx.fillStyle='rgba(0,0,0,.2)';cx.fillRect(p.x-15,by+1,30,4);cx.fillStyle=hc;cx.beginPath();cx.moveTo(p.x-15,by-8);cx.lineTo(p.x+16,by-8);cx.lineTo(p.x+10,by+1);cx.lineTo(p.x-10,by+1);cx.fill();cx.fillStyle='#333';cx.fillRect(p.x-15,by-8,31,2);cx.fillStyle='#fff';cx.fillRect(p.x-5,by-15,10,7);cx.fillStyle='#8fc0d8';cx.fillRect(p.x-3,by-13,6,3);cx.fillStyle='#444';cx.fillRect(p.x+7,by-22,2,14)}else if(p.k=='bench'){cx.fillStyle='#6b4a2a';cx.fillRect(p.x-12,p.y-12,24,6);cx.fillRect(p.x-12,p.y-6,24,4);cx.fillStyle='#333';cx.fillRect(p.x-11,p.y-2,2,3);cx.fillRect(p.x+9,p.y-2,2,3)}
 else{cx.fillStyle='#4a5560';cx.fillRect(p.x-5,p.y-14,10,14);cx.fillStyle='#2e353d';cx.fillRect(p.x-6,p.y-16,12,3)}}])}
for(const c of cars){const X=c.ax?c.l:c.p,Y=c.ax?c.p:c.l;if(Math.abs(X-px)>vw/2+60||Math.abs(Y-py)>vh/2+60)continue;R.push([Y,()=>drawCar(X,Y,c.ax,c.d,c.c,c.ty,c.v,c.br,100)])}
 for(let k=0;k<W/15;k++)for(let j=0;j<H/15;j++){if(!ISX[j*(W/15)+k])continue;const ix=15*k*T,iy=15*j*T;if(Math.abs(ix+48-px)>vw/2+80||Math.abs(iy+48-py)>vh/2+80)continue;const a=lt(0),b2=lt(1);
  R.push([iy-4,()=>tlight(ix-6,iy-4,a)],[iy-4,()=>tlight(ix+3*T+6,iy-4,b2)],[iy+3*T+14,()=>tlight(ix-6,iy+3*T+14,b2)],[iy+3*T+14,()=>tlight(ix+3*T+6,iy+3*T+14,a)])}
R.sort((a,b)=>a[0]-b[0]);for(const r of R)r[1]();
 for(const n of NP)if(Math.hypot(n.x-px,n.y-py)<60){cx.fillStyle='#fff';cx.font='bold 10px system-ui';cx.textAlign='center';cx.fillText(n.n,n.x,n.y-48)}
 if(order){const a=Math.atan2(order.b.dy-py,order.b.dx-px),X=px+Math.cos(a)*46,Y=py-20+Math.sin(a)*46;cx.save();cx.translate(X,Y);cx.rotate(a);cx.fillStyle='#ff5a4f';cx.beginPath();cx.moveTo(8,0);cx.lineTo(-5,-6);cx.lineTo(-5,6);cx.fill();cx.restore();
  cx.strokeStyle='#ff5a4f';cx.lineWidth=2;cx.beginPath();cx.arc(order.b.dx,order.b.dy-4,10+Math.sin(t*5)*2,0,7);cx.stroke()}
 if(dark>.2)for(const c of cars){const X=c.ax?c.l:c.p,Y=c.ax?c.p:c.l;if(Math.abs(X-px)>vw/2+60||Math.abs(Y-py)>vh/2+60)continue;cx.fillStyle='rgba(255,238,160,'+(dark*.35)+')';cx.beginPath();cx.ellipse(c.ax?X:X+c.d*44,c.ax?Y+c.d*44:Y,c.ax?14:40,c.ax?40:14,0,0,7);cx.fill()}
 cx.setTransform(1,0,0,1,0,0);if(rA>.05){const w2=cv.width,h2=cv.height,k=Z/2;cx.strokeStyle='rgba(180,200,235,'+.5*rA+')';cx.lineWidth=k;cx.beginPath();for(let i=0;i<110*rA;i++){const x=(h(i,1)*w2+t*220)%w2,y=(h(i,2)*h2+t*900+i*37)%h2;cx.moveTo(x,y);cx.lineTo(x-4*k,y+14*k)}cx.stroke();cx.fillStyle='rgba(30,45,70,'+.18*rA+')';cx.fillRect(0,0,w2,h2)}cx.fillStyle=`rgba(10,15,45,${dark})`;cx.fillRect(0,0,cv.width,cv.height)}
frame();
setInterval(()=>{try{localStorage.setItem('brk3',JSON.stringify({v:{own:veh.own,x:veh.on?px:veh.x,y:veh.on?py:veh.y,hp:veh.hp,f:veh.f,col:veh.col,d:veh.d},pg:PG}))}catch(e){}},5000);
setInterval(()=>{if(noSave)return;try{localStorage.setItem('brk2',JSON.stringify({money,mins,en,goods,debt,own,stock,till,scoot,style,skill,sv:SV,emp,heat,dk,inv:inventory,ph:phone,x:px,y:py,apt,c:coins.map(c=>[c.a,c.p])}))}catch(e){}},5000);
