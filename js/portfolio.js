const grid = document.getElementById('grid');
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox ? lightbox.querySelector('img') : null;

fetch('/data/works.json')
  .then(r => r.json())
  .then(data => {
    // Проверяем, что есть массив изображений
    const images = data.images || data.works || [];
    if (!Array.isArray(images)) return;

    // Создаём HTML с плитками
    grid.innerHTML = images
      .map(src => `
        <figure class="tile">
          <img src="${typeof src === 'string' ? src : src.image}" 
               alt="Работа" 
               loading="lazy" />
        </figure>
      `)
      .join('');
  })
  .catch(err => console.error('Ошибка при загрузке works.json:', err));

// Лайтбокс (увеличение при клике)
if (grid) {
  grid.addEventListener('click', e => {
    const img = e.target.closest('.tile')?.querySelector('img');
    if (!img || !lightbox) return;
    lbImg.src = img.src;
    lightbox.classList.add('open');
  });
}

if (lightbox) {
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
}
