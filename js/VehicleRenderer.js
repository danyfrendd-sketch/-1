/* Vehicle renderer — Cars and traffic-light drawing.
 * Extracted from the original game.js; classic script, shared global scope.
 */
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
