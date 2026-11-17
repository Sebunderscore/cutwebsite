// ABOUT-FOTO: bij elke klik de volgende foto.
// Nieuwe foto toevoegen: zet een staand 4:5-bestand (1200x1500) in img/ en voeg de naam hieronder toe.
// Automatisch wisselen: elke AUTO_MS milliseconden (0 = uit).
const AUTO_MS = 8000;

const ABOUT_PHOTOS = [
  { src: 'img/cut-duo-1.jpg', alt: 'Belle Doron and Sebastiaan Dutilh of CUT_ in pink tracksuits in a forest, each holding a white egg' },
  { src: 'img/cut-duo-4.jpg', alt: 'Belle and Sebastiaan of CUT_ in black and silver coats against a dark, overgrown wall' },
  { src: 'img/cut-duo-2.jpg', alt: 'Belle and Sebastiaan of CUT_ sitting on a bench in front of a parked car' },
  { src: 'img/cut-duo-3.jpg', alt: 'Belle in a fur coat and Sebastiaan in sunglasses on a jetty by the water in Amsterdam' },
  { src: 'img/cut-duo-5.jpg', alt: 'Belle and Sebastiaan of CUT_ under a viaduct next to a graffiti-covered pillar' }
];

(function () {
  const btn = document.querySelector('.photo-cycle');
  if (!btn) return;
  const img = btn.querySelector('img');
  const count = document.querySelector('.photo-count');
  let i = 0;
  img.alt = ABOUT_PHOTOS[0].alt;

  // volgende foto alvast laden, zodat de wissel direct is
  const preload = n => { const p = new Image(); p.src = ABOUT_PHOTOS[n % ABOUT_PHOTOS.length].src; };
  preload(1);

  const show = () => {
    i = (i + 1) % ABOUT_PHOTOS.length;
    img.style.opacity = 0;
    setTimeout(() => {
      img.src = ABOUT_PHOTOS[i].src;
      img.alt = ABOUT_PHOTOS[i].alt;
      if (count) count.textContent = (i + 1) + ' / ' + ABOUT_PHOTOS.length;
      img.onload = () => { img.style.opacity = 1; };
      if (img.complete) img.style.opacity = 1;
      preload(i + 1);
    }, 180);
  };

  // Automatisch: alleen als de foto in beeld is en het tabblad open staat.
  // Na een klik begint de 8 seconden opnieuw.
  let timer = null, inView = false;
  const stop = () => { clearInterval(timer); timer = null; };
  const start = () => { stop(); if (AUTO_MS && inView && !document.hidden) timer = setInterval(show, AUTO_MS); };

  btn.addEventListener('click', () => { show(); start(); });
  document.addEventListener('visibilitychange', start);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; start(); }, { threshold: 0.3 }).observe(btn);
  } else { inView = true; start(); }
})();
