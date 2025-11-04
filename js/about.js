fetch('/data/about.json')
  .then(r => r.json())
  .then(data => {
    const intro = document.getElementById('about-intro');
    const services = document.getElementById('services');
    const stats = document.getElementById('stats');
    const photo = document.getElementById('about-photo');

    // Текст с HTML-разметкой
    if (intro && data.intro) intro.innerHTML = data.intro;

    // Список направлений
    if (services && Array.isArray(data.services)) {
      services.innerHTML = data.services
        .map(s => `<span class="chip">${s}</span>`)
        .join('');
    }

    // Статистика
    if (stats && Array.isArray(data.stats)) {
      stats.innerHTML = data.stats
        .map(it => `<div class="stat"><b>${it.value}</b>${it.label}</div>`)
        .join('');
    }

    // Фото
    if (photo && data.photo) {
      photo.src = data.photo;
      photo.style.display = 'block';
    }
  })
  .catch(err => console.error('Ошибка при загрузке about.json:', err));
