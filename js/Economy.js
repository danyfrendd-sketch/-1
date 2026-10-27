/* Business economy — Employees, daily rollover and business simulation.
 * Extracted from the original game.js; classic script, shared global scope.
 */
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
