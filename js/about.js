fetch('/data/about.json')
  .then(response => {
    console.log('fetch status:', response.status, ' url:', response.url);
    return response.json();
  })
  .then(data => {
    console.log('about.json loaded:', data);

    const intro = document.getElementById('about-intro');
    const services = document.getElementById('services');
    const stats = document.getElementById('stats');

    // вставляем HTML (а не текст)
    if (intro && data.intro) {
      intro.innerHTML = data.intro;
    }

    // блок с направлениями
    if (services && Array.isArray(data.services)) {
      services.innerHTML = data.services
        .map(s => `<span class="chip">${s}</span>`)
        .join('');
    }

    // блок со статистикой
    if (stats && Array.isArray(data.stats)) {
      stats.innerHTML = data.stats
        .map(stat => `
          <div class="stat">
            <b>${stat.value}</b>
            <span>${stat.label}</span>
          </div>
        `)
        .join('');
    }
  })
  .catch(err => {
    console.error('Ошибка при загрузке about.json:', err);
  });
