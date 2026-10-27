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
