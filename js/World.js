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
