// De CUT_-glyphs (boog, zigzag, streep), getekend door de browser in plaats van als GIF.
// data-accent="#e3b1b6" kleurt een op de vijf glyphs roze.
// data-avoid=".a, .b" houdt die blokken vrij.
// Gebruik: <canvas class="glyphs" data-color="#fff" data-cell="170"></canvas> in een blok met position: relative.
// Ze schokken licht zoals de oude GIFs en wijken een beetje uit voor de muis.
(function () {
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

  document.querySelectorAll('canvas.glyphs').forEach((cv, n) => {
    const ctx = cv.getContext('2d');
    const color = cv.dataset.color || '#3a3a3a';
    const cell = +cv.dataset.cell || 170;
    const weight = +cv.dataset.weight || 3;
    const accent = cv.dataset.accent || '';
    let W = 0, H = 0, glyphs = [], mouse = null, visible = false, timer = null;

    function layout() {
      const r = cv.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rand = rng(7 + n * 101);
      // data-avoid: blokken waar geen glyphs overheen mogen vallen (tekst, hoezen, knoppen)
      const avoid = (cv.dataset.avoid ? [...document.querySelectorAll(cv.dataset.avoid)] : []).map(el => {
        const a = el.getBoundingClientRect();
        return { l: a.left - r.left - 34, t: a.top - r.top - 34, r: a.right - r.left + 34, b: a.bottom - r.top + 34 };
      });
      const blocked = (x, y) => avoid.some(a => x > a.l && x < a.r && y > a.t && y < a.b);
      glyphs = [];
      // Gelijkmatig raster in halfsteens verband, met een kleine afwijking per glyph
      const cols = Math.max(3, Math.round(W / cell)), cw = W / cols;
      const rows = Math.max(2, Math.round(H / cw)), ch = H / rows;
      let i = 0;
      for (let row = 0; row < rows; row++) for (let col = 0; col < cols + (row % 2); col++) {
        const gx = (col + (row % 2 ? 0 : .5)) * cw + (rand() - .5) * cw * .22;
        const gy = (row + .5) * ch + (rand() - .5) * ch * .22;
        const type = ['arc', 'zig', 'line'][(col + row * 2 + Math.floor(rand() * 2)) % 3];
        const rot = rand() * Math.PI * 2, size = 26 + rand() * 10;
        const pink = accent && (i++ % 5 === 2);
        if (blocked(gx, gy)) continue;
        glyphs.push({ x: gx, y: gy, type, rot, size, pink });
      }
      draw();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = weight; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      for (const g of glyphs) {
        let x = g.x, y = g.y, rot = g.rot;
        if (!still) { x += (Math.random() - .5) * 2.4; y += (Math.random() - .5) * 2.4; rot += (Math.random() - .5) * .09; }
        if (mouse) {
          const dx = x - mouse.x, dy = y - mouse.y, d = Math.hypot(dx, dy);
          if (d < 240) { const f = (1 - d / 240); x += dx / (d || 1) * f * 22; y += dy / (d || 1) * f * 22; rot += f * .9; }
        }
        ctx.strokeStyle = g.pink ? accent : color;
        ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath();
        const s = g.size;
        if (g.type === 'arc') ctx.arc(0, 0, s, .5, .5 + Math.PI * 1.45);
        else if (g.type === 'line') { ctx.moveTo(-s * .75, 0); ctx.lineTo(s * .75, 0); }
        else { ctx.moveTo(-s, s * .5); ctx.lineTo(-s * .35, -s * .5); ctx.lineTo(-s * .3, s * .5); ctx.lineTo(s * .35, -s * .5); ctx.lineTo(s * .4, s * .5); ctx.lineTo(s, -s * .5); }
        ctx.stroke(); ctx.restore();
      }
    }

    function run() {
      clearInterval(timer);
      if (visible && !still) timer = setInterval(draw, 170);
    }
    new IntersectionObserver(e => { visible = e[0].isIntersecting; run(); }).observe(cv);
    const host = cv.parentElement;
    host.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; if (still) draw(); });
    host.addEventListener('pointerleave', () => { mouse = null; });
    let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(layout, 150); });
    layout();
  });

  // Video's: de YouTube-player laadt pas na een klik
  document.querySelectorAll('.reel[data-yt]').forEach(reel => {
    reel.addEventListener('click', () => {
      const box = document.createElement('div'); box.className = 'reel reel--playing';
      const f = document.createElement('iframe');
      f.src = `https://www.youtube-nocookie.com/embed/${reel.dataset.yt}?autoplay=1&rel=0`;
      f.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture'; f.allowFullscreen = true; f.title = 'Video';
      box.appendChild(f); reel.replaceWith(box);
    });
  });
})();
