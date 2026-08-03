// ===== 主题切换 =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

// ===== 导航栏滚动效果 =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== 移动端菜单 =====
const mobileBtn = document.getElementById('mobileBtn');
const navLinks = document.querySelector('.nav-links');

mobileBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// 点击导航链接后关闭菜单
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ===== 滚动淡入动画 =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// 给 section 内容添加淡入效果
document.querySelectorAll(
  '.about-grid > *, .skill-category, .project-card, .timeline-item, .award-card, .contact-card'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== 平滑滚动偏移（考虑固定导航栏） =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
