# BUCO website

Plain HTML/CSS/JS. No build step, no dependencies, no tracking.

**Quick look:** double-click `preview.html` (everything built in, works offline, photos included).
**Preview locally:** `python3 -m http.server` in this folder → open http://localhost:8000

**Edit links, images, form:** `assets/js/config.js` (everything is commented).
**Change a photo:** replace the file in `assets/img/` with one of the same name and shape (names and spots are listed in `LAUNCH-CHECKLIST.md`), then run `python3 build.py` to refresh `preview.html`.
**Logo:** `assets/img/logo-cream.svg`, `logo-terra.svg` and `favicon.svg`.
**Edit page text:** edit `src/index.src.html` then run `python3 build.py`, or edit `index.html` directly.
**Legal pages:** `privacy.html`, `cookies.html`, `terms.html`, `refunds.html`, `accessibility.html`, `legal.html` — fill every yellow `[PLACEHOLDER]`.

Read `LAUNCH-CHECKLIST.md` before publishing.
