/* =============================================
   霸軒與小美 粉絲致敬站 — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Active nav link ──────────────────────── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  /* ── Category pill filter (blog & video) ──── */
  document.querySelectorAll('.pills-row').forEach(row => {
    row.querySelectorAll('.pill').forEach(pill => {
      pill.addEventListener('click', () => {
        row.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const target = pill.dataset.filter;
        const container = row.nextElementSibling;
        if (!container) return;

        container.querySelectorAll('[data-category]').forEach(item => {
          if (target === 'all' || item.dataset.category === target) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });

  /* ── Blog row hover ripple ────────────────── */
  document.querySelectorAll('.blog-row').forEach(row => {
    row.addEventListener('click', () => {
      const title = row.querySelector('.blog-row__title');
      if (title) {
        row.style.background = 'var(--cream)';
        setTimeout(() => { row.style.background = ''; }, 300);
      }
    });
  });

  /* ── Video card click ─────────────────────── */
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.video-card__title')?.textContent || '';
      console.log('Play:', title);
    });
  });

  /* ── Scroll reveal ────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.blog-row, .video-card, .biz-card, .stat-box, .nav-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach((el, i) => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
      observer.observe(el);
    });
  }

  /* ── Mobile nav toggle ────────────────────── */
  const hamburger = document.querySelector('.navbar__hamburger');
  const navMenu   = document.querySelector('.navbar__links');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const open = navMenu.classList.toggle('navbar__links--open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
  }

});
