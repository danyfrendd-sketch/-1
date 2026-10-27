/* Interior renderer — Rooms, furniture, interaction highlights and interior scene drawing.
 * Extracted from the original game.js; classic script, shared global scope.
 */
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
