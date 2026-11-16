// Stage & Screen: alle projecten op de pagina scoring.html.
// img = bestand in /img (zonder img krijgt het project een kaart met alleen tekst).
// fit: 'contain' = hele poster tonen in plaats van bijsnijden.
// url = waar de kaart naartoe linkt (optioneel). pos = welk deel van de foto in beeld blijft.
// kind = het soort werk (Film, Dance, Stage, Fashion); staat klein boven de titel.

// ORIGINAL SCORES: grote kaarten. Film eerst, daarna stage.
const SCORES_FEATURED = [
  { kind: 'Film', title: 'De Wilde Stad', year: 2020, role: 'Original score', note: 'Feature-length nature documentary, international release.', img: 'img/film-de-wilde-stad.jpg', pos: '50% 12%', url: 'https://youtu.be/p9Z8tX6YI3w' },
  { kind: 'Film', title: 'Stay', year: 2020, role: 'Original score', note: 'Short film by Youp Kruijsdijk.', img: 'img/film-stay.jpg', pos: '50% 40%' },
  { kind: 'Stage', title: 'The Witch’s Mark', year: 2025, role: 'Composition, production, live score', note: 'A 1.5-hour multidisciplinary show by Belle and The Beats: a witch trial told through live music, contemporary dance and shibari. We co-wrote and produced the album Dancing with the Devil and play the score live. Premiered at Door Open Space, Amsterdam.', img: 'img/stage-witchs-mark.jpg', pos: '50% 20%', url: 'https://open.spotify.com/album/7ALCPzdBHYah72NolNYj8F' },
  { kind: 'Dance', title: 'Blind to the Depths', year: 2023, role: 'Original score', note: 'Contemporary dance piece, choreography by Paxton Ricketts and Madoka Kariya. Premiered at Sadler’s Wells, London.', img: 'img/stage-blind-to-the-depths.jpg', credit: 'Photo via Paxton Ricketts' },
  { kind: 'Stage', title: 'The Ritual', year: 2024, role: 'Concept, music, live', note: 'Multisensory CUT_ show using scent, taste and touch to make live music accessible to audiences with a disability. 15 shows across Europe, incl. Sziget and Colors of Ostrava.', img: 'img/stage-the-ritual.jpg', pos: '29% 30%' },
  { kind: 'Fashion', title: '1/OFF at Amsterdam Fashion Week', year: 2024, role: 'Composition', note: 'Music for the 1/OFF SS’25 show, the opening show of Amsterdam Fashion Week 2024.', img: 'img/stage-fashion-week-1off.jpg', pos: '50% 25%', credit: 'Photo: Merel Daantje' }
];

// ORIGINAL SCORES: kleinere kaarten eronder
const SCORES = [
  { kind: 'Dance', title: 'RE:HUMANIZE', year: 2020, role: 'Composition, live', note: 'Immersive dance show with choreography by Guido Dutilh, music and dancers reacting to each other live.', img: 'img/stage-rehumanize.jpg', url: 'https://youtu.be/ydkhITuYsYo' },
  { kind: 'Dance', title: 'Switch (NDT)', year: 2019, role: 'Composition', note: 'Music for new work by dancers of Nederlands Dans Theater. Zuiderstrandtheater, Den Haag.', img: 'img/stage-switch-2019.jpg' },
  { kind: 'Dance', title: 'Switch: On the Move (NDT)', role: 'Composition', note: 'Lucent Danstheater, Den Haag.', img: 'img/stage-switch-on-the-move.jpg' },
  { kind: 'Dance', title: 'Switch (NDT)', year: 2021, role: 'Composition', note: 'Nederlands Dans Theater.', img: 'img/stage-switch-2021.jpg', fit: 'contain' },
  { kind: 'Dance', title: 'Momentum: Lost & Found', role: 'Composition', note: 'Contemporary dance.', img: 'img/stage-momentum.jpg', fit: 'contain' }
];

// SYNC: bestaande CUT_-tracks in series
const SYNC = [
  { title: 'Élite (Netflix)', year: 2019, role: 'Out of Touch', note: 'Featured in seasons 2 and 3. #1 on the global Shazam chart.', img: 'img/film-elite.jpg', url: 'https://youtu.be/9NQh9ovnDe0' },
  { title: 'Anne+', year: 2018, role: 'Tactics', note: 'Dutch series about a girl dating girls in Amsterdam.', img: 'img/film-anne-plus.jpg' },
  { title: 'Anne+ season 2', year: 2020, note: 'Music by CUT_ in the second season.', img: 'img/film-anne-plus-s2.jpg' },
  { title: 'The L Word: Generation Q', role: 'No One’s Lost, Flip the Switch', note: 'Two CUT_ tracks featured in the series.', img: 'img/film-the-l-word.jpg' },
  { title: 'This Is Gonna Be Great', role: 'No One’s Lost, Flip the Switch', note: 'Two CUT_ tracks featured in the series.', img: 'img/film-this-is-gonna-be-great.jpg' }
];

(function () {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const card = it => {
    const media = it.img
      ? `<img src="${it.img}" alt="${esc(it.title)}" loading="lazy"${it.pos || it.fit ? ` style="${it.pos ? `object-position:${it.pos};` : ''}${it.fit ? `object-fit:${it.fit}` : ''}"` : ''}>`
      : `<span class="card-type">${esc(it.title)}</span>`;
    const inner = `
      <div class="card-media${it.img ? '' : ' card-media--type'}">${media}</div>
      <div class="card-body">
        <p class="card-meta">${it.kind ? `<span class="kind">${it.kind}</span> · ` : ''}${[it.year, it.role && esc(it.role)].filter(Boolean).join(' · ')}</p>
        <h3>${esc(it.title)}</h3>
        <p class="card-note">${esc(it.note)}</p>
        ${it.credit ? `<p class="card-credit">${esc(it.credit)}</p>` : ''}
      </div>`;
    return it.url
      ? `<a class="card" href="${it.url}" target="_blank" rel="noopener">${inner}</a>`
      : `<div class="card">${inner}</div>`;
  };
  const fill = (id, items) => { document.getElementById(id).innerHTML = items.map(card).join(''); };
  fill('score-feature', SCORES_FEATURED);
  fill('score-grid', SCORES);
  fill('sync-grid', SYNC);

})();
