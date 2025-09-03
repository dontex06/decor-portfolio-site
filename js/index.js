
// Load site & about snippets for the homepage
fetch('/data/site.json').then(r=>r.json()).then(site=>{
  if(site.hero_title) document.getElementById('hero-title').textContent = site.hero_title;
  if(site.hero_subtitle) document.getElementById('hero-subtitle').textContent = site.hero_subtitle;
  if(site.hero_cta && site.hero_cta.label){
    const el = document.getElementById('hero-cta');
    el.textContent = site.hero_cta.label;
    if(site.hero_cta.href) el.href = site.hero_cta.href;
  }
  if(site.before_after){
    const before = document.getElementById('before-img');
    const after = document.getElementById('after-img');
    if(site.before_after.before) before.src = site.before_after.before;
    if(site.before_after.after) after.src = site.before_after.after;
  }
});

fetch('/data/about.json').then(r=>r.json()).then(data=>{
  const services = document.getElementById('services');
  const stats = document.getElementById('stats');
  const intro = document.getElementById('about-intro');
  if(intro && data.intro) intro.textContent = data.intro;
  if(services && Array.isArray(data.services)){
    services.innerHTML = data.services.map(s=>`<span class="chip">${s}</span>`).join('');
  }
  if(stats && Array.isArray(data.stats)){
    stats.innerHTML = data.stats.map(it=>`<div class="stat"><b>${it.value}</b>${it.label}</div>`).join('');
  }
});

// Before/After slider
const cmp = document.getElementById('compare');
if(cmp){
  const clip = cmp.querySelector('.clip');
  const range = cmp.querySelector('input[type=range]');
  const divider = cmp.querySelector('.divider');
  function setClip(v){
    clip.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
    divider.style.left = `calc(${v}% )`;
  }
  range.addEventListener('input', e=> setClip(+e.target.value));
  setClip(50);
}
