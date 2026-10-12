(function(){
  const hero=document.getElementById('argon-hero');
  const legacy=document.querySelector('.main-page.funnel-entry-page');
  const demo=document.getElementById('box6cb10f67-d1e8-fe8c-c98f-94e9f64283dc');
  if(!hero||!legacy||!demo)return;
  function alignContent(){
    const top=demo.getBoundingClientRect().top-legacy.getBoundingClientRect().top;
    legacy.style.setProperty('--am-legacy-offset',(28-top)+'px');
    // Remove the original hero's positioned elements; retain the full page backdrop.
    Array.from(legacy.children).forEach(function(el){
      if(el===demo||!el.classList.contains('cvt-1568371626-box'))return;
      const rect=el.getBoundingClientRect();
      const relativeTop=rect.top-legacy.getBoundingClientRect().top;
      if(relativeTop<top && rect.height<top && !el.dataset.amOldHero){el.dataset.amOldHero='true';el.style.setProperty('visibility','hidden','important');el.style.setProperty('pointer-events','none','important');}
    });
  }
  alignContent();window.addEventListener('load',alignContent);window.addEventListener('resize',alignContent);
  hero.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click',function(event){
      const target=document.getElementById(link.getAttribute('href').slice(1));
      if(!target)return;
      event.preventDefault();
      target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    });
  });
})();
