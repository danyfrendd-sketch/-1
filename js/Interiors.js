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
