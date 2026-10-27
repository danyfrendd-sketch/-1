/* World rendering — Buildings, characters and drawing helpers.
 * Extracted from the original game.js. Load as a classic script in index.html.
 * Keep script order in index.html: these sections share the original global scope.
 */
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