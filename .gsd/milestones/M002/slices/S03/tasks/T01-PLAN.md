---
estimated_steps: 7
estimated_files: 2
skills_used: []
---

# T01: Add CSS spinner to loading overlay and enhance Pokémon button styling

Add a visible animated spinner ring to the #pokemon-loading overlay, and improve .btn-pokemon hover/focus/active states so it visually stands out from the Lätt/Medel buttons. No changes to game.js logic.

Steps:
1. In `index.html`, add a `<div class="pokemon-spinner"></div>` element inside `#pokemon-loading`, before the existing `<p>` tag.
2. In `style.css`, add `.pokemon-spinner` styles: circular ring (border + border-top colored, border-radius 50%, width/height ~56px) with a new `@keyframes pokemonSpinnerRotate` (clean 360° rotation, no scale). Animate at 0.8s linear infinite.
3. In `style.css`, add `.btn-pokemon:hover` rule: slightly brighter background (e.g. `#ffd93d`), lift shadow to 8px, scale(1.02) transform. Ensure `.btn-pokemon:focus-visible` has a visible outline (e.g. 3px solid #fff with 2px outline-offset).
4. Verify the spinner element is hidden when `#pokemon-loading` has `display:none` (it is — the parent hides it).
5. Run a quick static check: `grep -n 'pokemon-spinner\|pokemonSpinnerRotate\|btn-pokemon:hover' style.css index.html` — all three patterns should appear.

## Inputs

- ``style.css` — existing #pokemon-loading styles, .btn-pokemon base styles, @keyframes definitions`
- ``index.html` — existing #pokemon-loading div structure`

## Expected Output

- ``style.css``
- ``index.html``

## Verification

grep -n 'pokemon-spinner\|pokemonSpinnerRotate\|btn-pokemon:hover' style.css index.html | wc -l | grep -v '^0$'
