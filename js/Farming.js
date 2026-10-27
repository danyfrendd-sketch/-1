/* Growing system — Inventory upgrades, cultivation, drying, packaging and related actions.
 * Extracted from the original game.js; classic script, shared global scope.
 */
const SH={tent:[100,'Grow Tent','палатка со светом, до 8'],soil:[10,'Земля','хватает на 2 урожая'],seed:[30,'Семена Лунного мха','доставка ~20 с (Альберт)'],fert:[30,'Удобрение','+качество'],pgr:[30,'PGR','+урожай, −качество'],spd:[30,'Speed Grow','рост ×1.5, −качество'],bag:[1,'Пакеты','для упаковки'],rack:[250,'Drying Rack','сушит 6 порций, +★'],spr:[200,'Спринклер','автополив палаток'],pk:[100,'Станция упаковки','фасовка']};
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
