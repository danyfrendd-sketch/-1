/* Traffic and driving logic — Vehicle state, traffic movement, collisions and player driving.
 * Extracted from the original game.js; classic script, shared global scope.
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
