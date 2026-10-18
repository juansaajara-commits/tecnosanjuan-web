(function(){
  var nav=document.getElementById('nav'); if(!nav) return;
  var btn=nav.querySelector('.menu-btn'); var links=document.getElementById('nav-links');
  if(!btn||!links) return;
  function set(open){nav.classList.toggle('open',open);btn.setAttribute('aria-expanded',open?'true':'false');btn.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');}
  btn.addEventListener('click',function(){set(!nav.classList.contains('open'));});
  links.addEventListener('click',function(e){if(e.target.tagName==='A') set(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape') set(false);});
})();

/* Lightbox para las galerías con data-lightbox */
(function(){
  var items=[].slice.call(document.querySelectorAll('a[data-lightbox]'));
  if(!items.length) return;
  var lb=document.createElement('div'); lb.className='lb'; lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true'); lb.setAttribute('aria-label','Foto ampliada');
  lb.innerHTML='<button type="button" class="close" aria-label="Cerrar">×</button><button type="button" class="prev" aria-label="Anterior">‹</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="next" aria-label="Siguiente">›</button>';
  document.body.appendChild(lb);
  var img=lb.querySelector('img'), cap=lb.querySelector('figcaption'), i=0, last=null;
  function show(n){
    i=(n+items.length)%items.length; var a=items[i];
    img.src=a.getAttribute('href'); img.alt=a.querySelector('img')?a.querySelector('img').alt:'';
    var c=a.getAttribute('data-caption')||(a.parentNode.querySelector('figcaption')||{}).textContent||'';
    cap.textContent=c;
  }
  function open(n){last=document.activeElement;show(n);lb.classList.add('open');document.body.classList.add('lb-lock');lb.querySelector('.close').focus();}
  function close(){lb.classList.remove('open');document.body.classList.remove('lb-lock');img.src='';if(last&&last.focus) last.focus();}
  items.forEach(function(a,n){a.addEventListener('click',function(e){e.preventDefault();open(n);});});
  lb.querySelector('.close').addEventListener('click',close);
  lb.querySelector('.prev').addEventListener('click',function(){show(i-1);});
  lb.querySelector('.next').addEventListener('click',function(){show(i+1);});
  lb.addEventListener('click',function(e){if(e.target===lb) close();});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') close(); else if(e.key==='ArrowLeft') show(i-1); else if(e.key==='ArrowRight') show(i+1);
  });
  var x0=null;
  lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
  lb.addEventListener('touchend',function(e){if(x0===null) return; var dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>50) show(dx<0?i+1:i-1); x0=null;},{passive:true});
})();
