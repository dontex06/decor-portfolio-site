fetch('/data/about.json')
  .then(r => r.json())
  .then(data => {
    const services = document.getElementById('services');
    const stats = document.getElementById('stats');
    const intro = document.getElementById('about-intro');
    const photo = document.getElementById('about-photo');

    // Вставляем HTML-текст "Обо мне"
    if (intro && data.intro)
      intro.innerHTML = data.intro; // заменили textContent на innerHTML ✅

    // Вставляем список услуг
    if (services && Array.isArray(data.services)) {
      services.innerHTML = data.services
        .map(s => `<span class="chip">${s}</span>`)
        .join('');
    }

    // Вставляем статистику
    if (stats && Array.isArray(data.stats)) {
      stats.innerHTML = data.stats
        .map(it => `<div class="stat"><b>${it.value}</b>${it.label}</div>`)
        .join('');
    }

    // Вставляем фото, если есть
    if (photo && data.photo) {
      photo.src = data.photo;
      photo.style.display = 'block';
    }
  })
  .catch(err => console.error('Ошибка при загрузке about.json:', err));
