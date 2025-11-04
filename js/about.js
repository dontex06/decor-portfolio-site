// /js/about.js (временно для отладки)
fetch('/data/about.json')
  .then(response => {
    console.log('fetch status:', response.status, response.statusText, 'url:', response.url);
    return response.json();
  })
  .then(data => {
    console.log('about.json loaded:', data); // <-- важный лог, посмотри в консоли
    const intro = document.getElementById('about-intro');
    const services = document.getElementById('services');
    const stats = document.getElementById('stats');

    if (intro && data.intro) intro.innerHTML = data.intro;
    if (services && Array.isArray(data.services)) {
      services.innerHTML = data.services.map(s => `<span class="chip">${s}</span>`).join('');
    }
    if (stats && Array.isArray(data.stats)) {
      stats.innerHTML = data.stats.map(stat => `<div class="stat"><b>${stat.value}</b><span>${stat.label}</span></div>`).join('');
    }
  })
  .catch(err => {
    console.error('Ошибка при загрузке about.json:', err);
    // Показываем сообщение на странице
    const wrap = document.querySelector('.about-text') || document.body;
    const note = document.createElement('div');
    note.style.color = 'red';
    note.textContent = 'Не удалось загрузить about.json — см. консоль (F12).';
    wrap.prepend(note);
  });
