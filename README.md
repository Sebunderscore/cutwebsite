# cutunderscore.com

Statische site: geen database, geen server-code. Draait op Cloudflare Pages; elke wijziging in deze repo gaat vanzelf live.

## Bestanden
- `index.html`: homepage (opening met FEMINONE, video, about, shows, music, stage & screen, contact)
- `scoring.html`: pagina Stage & Screen
- `css/style.css`: vormgeving
- `js/shows.js`: optredens. Geen komende shows = het Shows-blok en de menuknop verdwijnen vanzelf
- `js/scoring.js`: alle projecten op Stage & Screen (original scores en sync)
- `js/glyphs.js`: de getekende CUT_-glyphs en het laden van YouTube-video's na een klik
- `js/nav.js`: hamburgermenu op telefoon
- `img/`: alle afbeeldingen

## Show toevoegen
Zet in `js/shows.js` een regel in `SHOWS`:

    { date: '2026-11-20', city: 'Mexico City', country: 'MX', venue: 'Naam venue', tickets: 'https://...' },

## Project toevoegen op Stage & Screen
Kopieer in `js/scoring.js` een regel in `SCORES_FEATURED`, `SCORES` of `SYNC` en pas hem aan.
