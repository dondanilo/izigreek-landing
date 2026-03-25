// ============================================================
// LANGUAGE TOGGLE
// ============================================================
let currentLang = 'ru';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  document.querySelectorAll('[data-ru]').forEach(el => {
    el.textContent = el.dataset[lang] || el.dataset.ru;
  });
  document.documentElement.lang = lang;
}

// ============================================================
// NAV SCROLL EFFECT
// ============================================================
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ============================================================
// CONTACT FORM
// ============================================================
async function submitContactForm() {
  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  if (!name || !email || !message) {
    alert(currentLang === 'ru' ? 'Пожалуйста, заполните все поля.' : 'Please fill in all fields.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert(currentLang === 'ru' ? 'Введите корректный email.' : 'Please enter a valid email.');
    return;
  }

  const btn = document.querySelector('.contact-submit');
  btn.disabled = true;
  btn.textContent = currentLang === 'ru' ? 'Отправляем...' : 'Sending...';

  try {
    const res = await fetch('https://izigreek-webhook.vercel.app/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject: 'Сайт izigreek.com', message })
    });
    if (!res.ok) throw new Error('Server error');
    document.getElementById('contact-form-block').style.display = 'none';
    document.getElementById('contact-success').style.display = 'flex';
  } catch (e) {
    alert(currentLang === 'ru'
      ? 'Не удалось отправить. Напишите напрямую: support@izigreek.com'
      : 'Could not send. Write directly: support@izigreek.com');
  } finally {
    btn.disabled = false;
    btn.textContent = currentLang === 'ru' ? 'Отправить' : 'Send';
  }
}

// ============================================================
// FAQ ACCORDION
// ============================================================
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const arrow = btn.querySelector('.faq-arrow');
  const isOpen = answer.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-arrow').forEach(a => a.classList.remove('rotated'));

  // Open clicked if it was closed
  if (!isOpen) {
    answer.classList.add('open');
    arrow.classList.add('rotated');
  }
}
