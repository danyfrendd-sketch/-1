/* Interior logic — Interior setup, furniture, room actions, NPC movement and food queue.
 * Extracted from the original game.js; classic script, shared global scope.
 */
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
