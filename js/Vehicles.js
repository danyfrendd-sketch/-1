/* Vehicles and traffic — Traffic, driving, collisions and traffic lights.
 * Extracted from the original game.js. Load as a classic script in index.html.
 * Keep script order in index.html: these sections share the original global scope.
 */
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