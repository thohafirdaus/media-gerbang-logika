// Tema + progress + navigasi aktif
(function(){
  const root=document.documentElement;
  const saved=localStorage.getItem('gl_theme');
  if(saved) root.setAttribute('data-theme',saved);
  window.toggleTheme=function(){
    const cur=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',cur);
    localStorage.setItem('gl_theme',cur);
  };
  // tandai link aktif
  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    if(a.getAttribute('href')===path||a.getAttribute('href').endsWith(path)) a.classList.add('active');
  });
  // progress modul (checklist di index)
  window.markDone=function(id){
    const s=new Set(JSON.parse(localStorage.getItem('gl_done')||'[]'));
    s.add(id); localStorage.setItem('gl_done',JSON.stringify([...s]));
    renderProgress();
  };
  window.renderProgress=function(){
    const s=new Set(JSON.parse(localStorage.getItem('gl_done')||'[]'));
    document.querySelectorAll('[data-modul]').forEach(el=>{
      const id=el.getAttribute('data-modul');
      const badge=el.querySelector('.done-badge');
      if(s.has(id)&&badge){badge.innerHTML='<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12.5 10 18 19.5 6.5"/></svg> Selesai';}
    });
    const bar=document.getElementById('progressBar');
    if(bar){bar.style.width=Math.round(s.size/5*100)+'%';}
    const txt=document.getElementById('progressTxt');
    if(txt){txt.textContent=s.size+' / 5 modul selesai';}
  };
  document.addEventListener('DOMContentLoaded',renderProgress);
})();
