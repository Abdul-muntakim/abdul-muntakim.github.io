# Abdul Muntakim — personal website

Static personal portfolio, online CV and educational insights, published on GitHub Pages.

- `index.html` and `portfolio.css`: responsive portfolio in ivory and forest green.
- `cv.html` and `cv.css`: online CV, including a browser print / Save as PDF layout.
- `insights/` and `reading.css`: educational articles, source links and author profiles.
- `portfolio.js`: accessible mobile navigation and active section indicator.
- `src/effects.js`: optional Motion entrances and Vanilla Tilt monogram depth. All content is visible without JavaScript. Touch devices and reduced-motion preferences disable tilt; preference changes cancel active animations.

Run `npm ci` and `npm run build` after editing animation source, and commit the generated `effects.js`. It runs locally with no CDN or API key. Retain `THIRD_PARTY_NOTICES.md`.

Preview with `python3 -m http.server 8000`. Push to the default branch to publish through GitHub Pages.
