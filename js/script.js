const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
// Hero slideshow + subtle pointer parallax (home page only)
const slides=$$('.hero-slide'), heroTitle=$('#heroTitle'), heroEngine=$('#heroEngine'), track=$('#heroTrack'), heroBg=$('#heroBg'), heroEl=$('.hero');
if(slides.length && heroTitle && heroEngine && track && heroBg){
  let heroIndex=0;
  function activateHero(i){slides.forEach((s,n)=>s.classList.toggle('active',n===i));heroTitle.textContent=slides[i].dataset.title;heroEngine.textContent=slides[i].dataset.engine;track.classList.remove('run');void track.offsetWidth;track.classList.add('run')}
  setInterval(()=>{heroIndex=(heroIndex+1)%slides.length;activateHero(heroIndex)},6000);
  if(heroEl)heroEl.addEventListener('pointermove',e=>{if(matchMedia('(pointer:fine)').matches){const x=(e.clientX/innerWidth-.5)*-14,y=(e.clientY/innerHeight-.5)*-10;heroBg.style.setProperty('--px',x+'px');heroBg.style.setProperty('--py',y+'px')}});
}
// Scroll progress
const progressEl=$('#progress');
if(progressEl)addEventListener('scroll',()=>{const h=document.documentElement;progressEl.style.width=((h.scrollTop/(h.scrollHeight-h.clientHeight))*100)+'%'});
// Reveal on scroll
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}}),{threshold:.12});
document.documentElement.classList.add('reveal-ready');$$('.reveal').forEach(el=>ro.observe(el));
$$('.work-card').forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=(i%4)*60+'ms';ro.observe(el)});
// Work filters (work.html and home featured grid)
$$('.filter').forEach(btn=>btn.addEventListener('click',()=>{$$('.filter',btn.closest('.section')).forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;$$('.work-card',btn.closest('.section')).forEach(c=>c.classList.toggle('hide',f!=='all'&&c.dataset.engine!==f))}));
// Spotlight image swaps (stories page)
const spot=$('#spotImage');
if(spot){const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){spot.style.opacity=.08;setTimeout(()=>{spot.src=e.target.dataset.src;spot.style.opacity=1},220)}}),{rootMargin:'-35% 0px -45% 0px',threshold:0});$$('.spot-copy').forEach(x=>so.observe(x));}
