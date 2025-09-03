
const grid = document.getElementById('grid');
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox ? lightbox.querySelector('img') : null;

fetch('/data/works.json').then(r=>r.json()).then(data=>{
  if(!Array.isArray(data.works)) return;
  grid.innerHTML = data.works.map(item=>`
    <figure class="tile" data-style="${item.style||''}">
      <img src="${item.image}" alt="${item.title||'Работа'}" loading="lazy"/>
    </figure>`).join('');
});

if(grid){
  grid.addEventListener('click', e=>{
    const img = e.target.closest('.tile')?.querySelector('img');
    if(!img || !lightbox) return;
    lbImg.src = img.src;
    lightbox.classList.add('open');
  });
}
if(lightbox){
  lightbox.addEventListener('click', ()=> lightbox.classList.remove('open'));
}
