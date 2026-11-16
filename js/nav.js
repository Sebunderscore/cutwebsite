// Hamburgermenu op kleine schermen
(function () {
  const btn = document.querySelector('.nav-toggle');
  if (!btn) return;
  const header = btn.closest('.site-header');
  const set = open => {
    header.classList.toggle('nav-open', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  btn.addEventListener('click', () => set(!header.classList.contains('nav-open')));
  header.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
})();
