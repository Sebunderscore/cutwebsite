// SHOWS
// Staan er geen komende shows, dan verdwijnt het hele Shows-blok en de knop in het menu.
//
// Twee manieren om shows te tonen:
// 1. Automatisch uit Bandsintown: vul hieronder BANDSINTOWN_APP_ID in
//    (te vinden in Bandsintown for Artists, onder API key). De site haalt dan zelf de komende shows op.
// 2. Met de hand: zet ze in SHOWS. Verlopen datums verdwijnen vanzelf.
//    { date: '2026-11-20', city: 'Mexico City', country: 'MX', venue: 'Naam venue', tickets: 'https://...' },
const BANDSINTOWN_URL = 'https://www.bandsintown.com/a/8626694-cut_';
const BANDSINTOWN_ARTIST = 'id_8626694';
const BANDSINTOWN_APP_ID = '0c2dafdd15425edebafb11e802af1350';
const SHOWS = [
];

(async function () {
  const section = document.getElementById('shows');
  const list = document.getElementById('shows-list');
  const navLinks = document.querySelectorAll('a[href$="#shows"]');
  const hide = () => { if (section) section.hidden = true; navLinks.forEach(a => a.parentElement.hidden = true); };

  const today = new Date(); today.setHours(0, 0, 0, 0);
  let shows = SHOWS.filter(s => new Date(s.date + 'T23:59:59') >= today);

  if (BANDSINTOWN_APP_ID) {
    try {
      const r = await fetch(`https://rest.bandsintown.com/artists/${BANDSINTOWN_ARTIST}/events?app_id=${encodeURIComponent(BANDSINTOWN_APP_ID)}&date=upcoming`);
      if (r.ok) {
        const events = await r.json();
        if (Array.isArray(events)) {
          shows = shows.concat(events.map(e => ({
            date: String(e.datetime).slice(0, 10),
            city: e.venue && e.venue.city,
            country: e.venue && e.venue.country,
            venue: e.venue && e.venue.name,
            tickets: (e.offers && e.offers[0] && e.offers[0].url) || e.url
          })));
        }
      }
    } catch (err) { /* Bandsintown niet bereikbaar: alleen de handmatige lijst tonen */ }
  }

  if (!shows.length) { hide(); return; }
  if (!list) return; // andere pagina's: alleen de menuknop regelen

  shows.sort((a, b) => a.date.localeCompare(b.date));
  const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const fmt = d => new Date(d + 'T12:00:00')
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  list.innerHTML = shows.map(s => `
    <div class="show">
      <span class="show-date">${fmt(s.date)}</span>
      <span class="show-place">${esc(s.city)}${s.country ? ', ' + esc(s.country) : ''}<small>${esc(s.venue)}</small></span>
      ${s.tickets ? `<a class="button" href="${s.tickets}" target="_blank" rel="noopener">Tickets</a>` : '<span></span>'}
    </div>`).join('') +
    `<p class="shows-more"><a class="button" href="${BANDSINTOWN_URL}" target="_blank" rel="noopener">All dates on Bandsintown</a></p>`;
})();
