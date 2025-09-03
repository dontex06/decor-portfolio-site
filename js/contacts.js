
fetch('/data/contacts.json').then(r=>r.json()).then(c=>{
  const box = document.getElementById('contact-actions');
  let html = '';
  if(c.telegram) html += `<a class="btn" href="${c.telegram}" target="_blank" rel="noopener">Telegram</a>`;
  if(c.whatsapp) html += `<a class="btn" href="${c.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>`;
  if(c.phone) html += `<a class="btn ghost" href="tel:${c.phone}">Позвонить</a>`;
  if(c.instagram) html += `<a class="btn ghost" href="${c.instagram}" target="_blank" rel="noopener">Instagram</a>`;
  box.innerHTML = html;
  // form submit via mailto if email present
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const msg = document.getElementById('msg').value;
    const to = c.email || 'you@example.com';
    window.location.href = `mailto:${to}?subject=${encodeURIComponent('Заявка со сайта')}&body=${encodeURIComponent(msg)}`;
  });
});
