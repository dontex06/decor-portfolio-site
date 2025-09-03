
fetch('/data/about.json').then(r=>r.json()).then(data=>{
  const services = document.getElementById('services');
  const stats = document.getElementById('stats');
  const intro = document.getElementById('about-intro');
  const photo = document.getElementById('about-photo');
  if(intro && data.intro) intro.textContent = data.intro;
  if(services && Array.isArray(data.services)){
    services.innerHTML = data.services.map(s=>`<span class="chip">${s}</span>`).join('');
  }
  if(stats && Array.isArray(data.stats)){
    stats.innerHTML = data.stats.map(it=>`<div class="stat"><b>${it.value}</b>${it.label}</div>`).join('');
  }
  if(photo && data.photo){
    photo.src = data.photo;
    photo.style.display = 'block';
  }
});
