const grid = document.getElementById('grid');
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox ? lightbox.querySelector('img') : null;

fetch('/data/works.json')
  .then(response => {
    if (!response.ok) throw new Error('Ошибка загрузки JSON');
    return response.json();
  })
  .then(data => {
    console.log('works.json loaded:', data);
    if (!Array.isArray(data.images)) return;

    grid.innerHTML = data.images
      .map(img => `
        <figure class="tile">
          <img src="${img}" alt="Работа" loading="lazy" />
        </figure>
      `)
      .join('');
  })
  .catch(err => console.error('Ошибка при загрузке works.json:', err));

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
