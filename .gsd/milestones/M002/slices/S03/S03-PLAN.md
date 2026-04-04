# S03: Visual polish and integration

**Goal:** Apply visual polish so the Pokémon level looks finished: distinct Pokémon button, animated loading spinner, and responsive 8-pair grid confirmed on iPad viewport.
**Demo:** After this: Pokémon button has distinct styling (unique color/icon), loading spinner shows during sprite fetch, 8-pair grid layout responsive on iPad, error message if fetch fails entirely

## Tasks
- [x] **T01: Added animated yellow spinner ring to #pokemon-loading overlay and hover/focus-visible polish to .btn-pokemon** — Add a visible animated spinner ring to the #pokemon-loading overlay, and improve .btn-pokemon hover/focus/active states so it visually stands out from the Lätt/Medel buttons. No changes to game.js logic.

Steps:
1. In `index.html`, add a `<div class="pokemon-spinner"></div>` element inside `#pokemon-loading`, before the existing `<p>` tag.
2. In `style.css`, add `.pokemon-spinner` styles: circular ring (border + border-top colored, border-radius 50%, width/height ~56px) with a new `@keyframes pokemonSpinnerRotate` (clean 360° rotation, no scale). Animate at 0.8s linear infinite.
3. In `style.css`, add `.btn-pokemon:hover` rule: slightly brighter background (e.g. `#ffd93d`), lift shadow to 8px, scale(1.02) transform. Ensure `.btn-pokemon:focus-visible` has a visible outline (e.g. 3px solid #fff with 2px outline-offset).
4. Verify the spinner element is hidden when `#pokemon-loading` has `display:none` (it is — the parent hides it).
5. Run a quick static check: `grep -n 'pokemon-spinner\|pokemonSpinnerRotate\|btn-pokemon:hover' style.css index.html` — all three patterns should appear.
  - Estimate: 30m
  - Files: style.css, index.html
  - Verify: grep -n 'pokemon-spinner\|pokemonSpinnerRotate\|btn-pokemon:hover' style.css index.html | wc -l | grep -v '^0$'
- [x] **T02: All S03 visual polish criteria verified in browser: distinct Pokémon button, spinner in DOM, 8-pair 4×4 grid correct on iPad 768×1024, zero JS errors** — Run a local HTTP server and verify all S03 visual polish criteria using browser automation. Confirm the spinner is present in the DOM, the Pokémon button is visually distinct, the 8-pair grid renders correctly on iPad viewport (768×1024), and the error state markup is correct.

Steps:
1. Start a Python HTTP server: `python3 -m http.server 8765` in `/Users/erikandersson/vscode/djurspel`.
2. Navigate to `http://localhost:8765` and screenshot the start screen — confirm `.btn-pokemon` is visually distinct from the two standard buttons.
3. Verify `#pokemon-loading` contains a `.pokemon-spinner` div in the DOM (use `browser_evaluate` on `document.querySelector('.pokemon-spinner') !== null`).
4. Switch to iPad viewport (768×1024 portrait) and navigate to the start screen — screenshot to confirm the Pokémon button still looks correct at tablet size.
5. Trigger the Pokémon level (click `.btn-pokemon`) and immediately check whether the loading overlay appears (it may flash by quickly on fast connections — acceptable).
6. After the board renders, screenshot to confirm the 4-column grid fills the iPad viewport without overflow.
7. Check browser console for zero JS errors.
8. Kill the server.
  - Estimate: 20m
  - Files: style.css, index.html
  - Verify: browser_assert: selector_visible '.btn-pokemon', selector_visible '#pokemon-loading .pokemon-spinner' (DOM present), no_console_errors
