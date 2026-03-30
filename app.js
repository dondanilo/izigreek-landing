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
// ECOMMERCE TRACKING (Yandex Metrika)
// ============================================================
const CHECKOUT_PRODUCTS = {
  'a889f6e0-005e-43c3-a843-e4d25aa47bdd': { id: 'monthly', name: 'Помесячная подписка', price: 8.99 },
  '58bb7cae-d33a-4ecf-9cd8-b56ac6afc8e9': { id: 'annual',  name: 'Годовая подписка',   price: 59.88 }
};

document.addEventListener('click', function(e) {
  const link = e.target.closest('a[href*="lemonsqueezy.com/checkout"]');
  if (!link) return;
  const uuid = (link.href.match(/buy\/([a-f0-9-]+)/) || [])[1];
  const product = CHECKOUT_PRODUCTS[uuid];
  if (!product) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ecommerce: {
      currencyCode: 'EUR',
      add: { products: [{ id: product.id, name: product.name, price: product.price, quantity: 1 }] }
    }
  });

  if (typeof ym !== 'undefined') {
    ym(108299434, 'reachGoal', 'checkout_click', { product: product.id });
  }
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
