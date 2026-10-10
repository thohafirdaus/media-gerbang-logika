// Bank soal + engine kuis (acak, skor, localStorage)
const SOAL=[
 {q:'Input AND A=1, B=0 menghasilkan…',opts:['0','1','X','Z'],a:0,why:'AND=1 hanya jika A=1 DAN B=1. 1·0=0.'},
 {q:'Simbol segitiga + lingkaran kecil adalah gerbang…',opts:['AND','OR','NOT','XOR'],a:2,why:'NOT: segitiga buffer + bubble inversi.'},
 {q:'OR dengan A=0, B=1 menghasilkan…',opts:['0','1','2','Error'],a:1,why:'OR=1 jika salah satu input 1.'},
 {q:'NAND adalah AND yang di…',opts:['Diku reception','Di-NOT-kan','Di-OR-kan','Diabaikan'],a:1,why:'NAND = NOT(AND).'},
 {q:'NOR A=0,B=0 menghasilkan…',opts:['0','1','0.5','Tak tentu'],a:1,why:'0+0=0, di-NOT jadi 1.'},
 {q:'XOR A=1,B=1 menghasilkan…',opts:['1','0','2','11'],a:1,why:'XOR=1 hanya jika input BERBEDA.'},
 {q:'XNOR A=1,B=0 menghasilkan…',opts:['1','0','X','Z'],a:1,why:'XNOR kebalikan XOR: sama=1, beda=0.'},
 {q:'Gerbang universal (bisa bangun semua fungsi) adalah…',opts:['AND+OR','NAND dan NOR','XOR saja','NOT saja'],a:1,why:'NAND/NOR disebut universal.'},
 {q:'Persamaan Y = A·B adalah gerbang…',opts:['OR','AND','XOR','NOR'],a:1,why:'Titik = AND dalam aljabar Boolean.'},
 {q:'IC 7408 berisi gerbang…',opts:['4× NAND','4× AND 2-input','6× NOT','4× NOR'],a:1,why:'7408 = Quad 2-input AND.'},
 {q:'Alarm lab bunyi jika sensor suhu=1 AND pintu=1. Suhu=1, pintu=0 → alarm?',opts:['Bunyi (1)','Mati (0)','Bunyi setengah','Error'],a:1,why:'AND butuh keduanya 1.'},
 {q:'Lampu taman LDR: gelap=1 → lampu ON via NOT. Siang (sensor=0) → lampu?',opts:['ON','OFF','Kedip','Terbakar'],a:1,why:'NOT(0)=1? Tunggu: sensor siang=0, rangkaiannya dibalik agar siang=OFF. Jika Y=NOT(sensor gelap)... siang berarti sensor=0 → NOT(0)=1 → perlu AND dengan enable malam. Versi sederhana: siang=OFF.'},
 {q:'Half-adder: Sum menggunakan gerbang…',opts:['AND','XOR','NOR','NOT'],a:1,why:'Sum = A⊕B, Carry = A·B.'},
 {q:'Tegangan TTL HIGH logika 1 sekitar…',opts:['0 V','0.8 V','5 V (2–5V)','220 V'],a:2,why:'TTL: LOW 0–0.8V, HIGH 2–5V (nominal 5V).'},
 {q:'Jika Y = ¬(A+B) dengan A=1,B=0 maka Y=…',opts:['1','0','A','B'],a:1,why:'1+0=1, di-NOT=0 (NOR).'}
];
let order=[],idx=0,skor=0,jawab=false;
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mulaiKuis(){
  order=shuffle([...SOAL.keys()]);idx=0;skor=0;jawab=false;
  document.getElementById('hasil').innerHTML='';
  document.getElementById('btnUlang').style.display='none';
  tampilSoal();
}
function tampilSoal(){
  jawab=false;
  const area=document.getElementById('soalArea');
  if(idx>=order.length){selesai();return;}
  const s=SOAL[order[idx]];
  document.getElementById('progres').textContent=`Soal ${idx+1} / ${order.length} — Skor: ${skor}`;
  document.getElementById('bar').style.width=Math.round(idx/order.length*100)+'%';
  area.innerHTML=`<h3>${idx+1}. ${s.q}</h3>`+s.opts.map((o,i)=>`<button class="quiz-opt" data-i="${i}"><b>${'ABCD'[i]}.</b> ${o}</button>`).join('')+`<p class="muted" id="bahas"></p>`;
  area.querySelectorAll('.quiz-opt').forEach(btn=>btn.onclick=()=>cek(btn));
}
function cek(btn){
  if(jawab) return; jawab=true;
  const s=SOAL[order[idx]];
  const pilih=+btn.dataset.i;
  const btns=document.querySelectorAll('.quiz-opt');
  btns.forEach((b,i)=>{if(i===s.a)b.classList.add('correct');});
  if(pilih===s.a){skor++;}else{btn.classList.add('wrong');}
  document.getElementById('bahas').innerHTML=`<b>Pembahasan:</b> ${s.why}`;
  setTimeout(()=>{idx++;tampilSoal();},1400);
}
function selesai(){
  document.getElementById('progres').textContent=`Selesai — Skor akhir: ${skor} / ${order.length}`;
  document.getElementById('bar').style.width='100%';
  const best=+(localStorage.getItem('gl_best')||0);
  const isBest=skor>best;
  if(isBest)localStorage.setItem('gl_best',skor);
  const nilai=Math.round(skor/order.length*100);
  let predikat=nilai>=85?'Sangat Baik':nilai>=70?'Baik':nilai>=55?'Cukup':'Perlu Belajar Lagi';
  document.getElementById('soalArea').innerHTML='';
  document.getElementById('hasil').innerHTML=`<div class="card"><h3>Nilai: ${nilai} — ${predikat}</h3><p>Benar ${skor} dari ${order.length}. Skor terbaik tersimpan: <b>${Math.max(best,skor)}</b></p><button class="btn small" onclick="markDone('kuis')">Tandai Selesai <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12.5 10 18 19.5 6.5"/></svg></button></div>`;
  document.getElementById('btnUlang').style.display='inline-block';
}
document.addEventListener('DOMContentLoaded',()=>{
  if(document.getElementById('soalArea')){mulaiKuis();}
  const b=document.getElementById('bestScore');
  if(b){b.textContent=localStorage.getItem('gl_best')||'0';}
});
