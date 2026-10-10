// Simulator gerbang logika — fungsi murni + wiring UI
const Gates={
  AND:(a,b)=>a&b, OR:(a,b)=>a|b, NOT:(a)=>a?0:1,
  NAND:(a,b)=>(a&b)?0:1, NOR:(a,b)=>(a|b)?0:1,
  XOR:(a,b)=>a^b, XNOR:(a,b)=>(a^b)?0:1
};
const EQ={AND:'Y = A · B',OR:'Y = A + B',NOT:'Y = Ā',NAND:'Y = ¬(A · B)',NOR:'Y = ¬(A + B)',XOR:'Y = A ⊕ B',XNOR:'Y = ¬(A ⊕ B)'};

function bindGate(cardId){
  const card=document.getElementById(cardId);
  if(!card) return;
  const gate=card.dataset.gate;
  const btnA=card.querySelector('[data-in="a"]');
  const btnB=card.querySelector('[data-in="b"]');
  const led=card.querySelector('.led');
  const outTxt=card.querySelector('[data-out]');
  let a=0,b=0;
  function render(){
    const y=gate==='NOT'?Gates.NOT(a):Gates[gate](a,b);
    if(btnA){btnA.textContent='A = '+a;btnA.classList.toggle('on',a===1);}
    if(btnB){btnB.textContent='B = '+b;btnB.classList.toggle('on',b===1);}
    led.classList.toggle('on',y===1);
    outTxt.textContent='Y = '+y;
    // highlight tabel
    card.querySelectorAll('table.truth tbody tr').forEach(tr=>{
      const ra=+tr.cells[0].textContent;
      const hasB=tr.cells.length===3;
      const rb=hasB?+tr.cells[1].textContent:null;
      const match=gate==='NOT'?(ra===a):(ra===a&&rb===b);
      tr.classList.toggle('active',match);
    });
  }
  if(btnA) btnA.onclick=()=>{a=a?0:1;render();};
  if(btnB) btnB.onclick=()=>{b=b?0:1;render();};
  render();
}
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.gate-sim').forEach(c=>bindGate(c.id));
  // Mode bandingkan
  const s1=document.getElementById('cmp1'),s2=document.getElementById('cmp2');
  const bA=document.getElementById('cmpA'),bB=document.getElementById('cmpB');
  const o1=document.getElementById('cmpOut1'),o2=document.getElementById('cmpOut2');
  if(s1&&s2){
    let a=0,b=1;
    function cmp(){
      const g1=s1.value,g2=s2.value;
      const y1=g1==='NOT'?Gates.NOT(a):Gates[g1](a,b);
      const y2=g2==='NOT'?Gates.NOT(a):Gates[g2](a,b);
      bA.textContent='A = '+a; bA.classList.toggle('on',a===1);
      bB.textContent='B = '+b; bB.classList.toggle('on',b===1);
      o1.textContent=g1+': Y = '+y1; o2.textContent=g2+': Y = '+y2;
    }
    bA.onclick=()=>{a=a?0:1;cmp();}; bB.onclick=()=>{b=b?0:1;cmp();};
    s1.onchange=cmp; s2.onchange=cmp; cmp();
  }
});
