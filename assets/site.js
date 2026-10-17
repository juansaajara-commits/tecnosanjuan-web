(function(){
  var nav=document.getElementById('nav'); if(!nav) return;
  var btn=nav.querySelector('.menu-btn'); var links=document.getElementById('nav-links');
  if(!btn||!links) return;
  function set(open){nav.classList.toggle('open',open);btn.setAttribute('aria-expanded',open?'true':'false');btn.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');}
  btn.addEventListener('click',function(){set(!nav.classList.contains('open'));});
  links.addEventListener('click',function(e){if(e.target.tagName==='A') set(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape') set(false);});
})();
