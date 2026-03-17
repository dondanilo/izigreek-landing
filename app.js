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
