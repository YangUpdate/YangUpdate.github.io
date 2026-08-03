// ===== Language Toggle =====
const langToggle = document.getElementById('langToggle');
const body = document.body;

const savedLang = localStorage.getItem('lang') || 'en';
body.classList.add('lang-' + savedLang);

langToggle.addEventListener('click', () => {
  const current = body.classList.contains('lang-en') ? 'en' : 'zh';
  const next = current === 'en' ? 'zh' : 'en';
  body.classList.remove('lang-' + current);
  body.classList.add('lang-' + next);
  localStorage.setItem('lang', next);
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '\u2600\uFE0F';
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  if (next === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '\u2600\uFE0F';
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.textContent = '\uD83C\uDF19';
  }
  localStorage.setItem('theme', next);
});
