# S02: Dynamic sprite loading with resilience

**Goal:** Pokémon level fetches real sprites from the PokeAPI CDN at runtime, randomly selecting 8 from the first 151 each round, with loading indicator and resilient failure handling.
**Demo:** After this: Pokémon level shows real sprites fetched from PokéAPI, randomly selected from first 151, handles failures gracefully, waits for all images before revealing board

## Tasks
- [x] **T01: Replaced static animal pool in startPokemonGame() with async CDN sprite pipeline: 8 unique Pokémon from 1–151 via PokeAPI sprites CDN, with loading overlay, parallel+serial retry logic (cap 25), and user-visible error on network failure** — Replace the placeholder animal/dino pool in `startPokemonGame()` with a full async sprite-loading pipeline:

1. **Random selection (R002):** Generate 8 unique random IDs from 1–151 using a shuffle-and-take approach. Selection happens per game start (D003), not globally.

2. **Sprite URL construction (R003, D002):** Build URLs using `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png` — no API calls, just direct CDN image URLs.

3. **Image preloading with failure handling (R004, R005, D004, D005):** For each selected Pokémon ID, create an `Image()` object and attempt to load the sprite. On load failure (onerror), log a warning and draw a replacement ID from the remaining pool (1–151 minus already-selected). Implement a retry cap (e.g. max 20 total attempts) to prevent infinite loops if the network is completely down. If the retry cap is hit before 8 valid pairs are obtained, show an error message to the user.

4. **Loading indicator (R004):** Add a `#pokemon-loading` overlay element inside `#game-screen` in `index.html`. Show it when sprite fetching begins, hide it when all 8 pairs are confirmed loaded. CSS in `style.css` for centered text/emoji loading indicator.

5. **Board rendering:** Once 8 valid sprites are confirmed loaded, build card data using the Pokémon ID as `animalId` and the CDN URL as `img`. Render to `#board` with `className = 'pairs-8'` following the existing pattern. Then call `revealThenShuffle()`.

6. **Make `startPokemonGame` async:** The function becomes async since it awaits sprite loading. The `onclick` handler in `index.html` already calls it directly — `onclick="startPokemonGame()"` works fine with async functions.

**Key constraints:**
- Keep the same initialization pattern (ensureAudio, playStartJingle, playBgMusic, reset state) at the top before the async work.
- Show the game screen immediately with the loading overlay visible, so the user sees a transition from the start screen.
- The `board.innerHTML` must be cleared and `board.className` set to `pairs-8` as before.
- Card elements must use the same HTML structure (card-inner > card-back + card-front > img) so existing flip/match animations work.
- The `img` src is the CDN URL; the `alt` should be `Pokémon {id}` for accessibility.
- `matchFound()` compares `a.animalId === b.animalId` — so pairs must share the same `animalId` value (use the Pokémon ID number or string).
- Do NOT touch `startGame()` or any other existing function.
  - Estimate: 45m
  - Files: game.js, index.html, style.css
  - Verify: grep -q 'raw.githubusercontent.com/PokeAPI/sprites' game.js && grep -q 'pokemon-loading' index.html && grep -q 'pokemon-loading' style.css && grep -q 'pokemon-loading' game.js
- [x] **T02: Browser-verified Pokémon game: CDN sprites load from PokeAPI, 16 cards in pairs-8 layout, 8 unique pairs, 8 stars, randomization confirmed across games, Lätt/Medel backward compat intact, zero console errors** — Launch the app in the browser and verify the full Pokémon game flow end-to-end with real network requests.

1. Start a local HTTP server for the project directory.
2. Navigate to the app and click the ⚡ Pokémon-nivå! button.
3. Verify the loading indicator appears (text_visible check for loading message).
4. Wait for the board to render with 16 cards.
5. Verify card images have `src` attributes pointing to `raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/` URLs.
6. Verify 8 unique Pokémon IDs across the 16 cards (each ID appears exactly twice = pairs).
7. Verify the score bar shows 8 stars.
8. Navigate back and start a second game — verify at least one different Pokémon ID appears (randomization check).
9. Check browser console for no errors (warnings for retried sprites are acceptable).
10. Verify existing Lätt/Medel buttons still work (click Lätt, confirm 8 cards with animal images).

**Key constraints:**
- This task is verification only — no code changes.
- If any check fails, document the failure clearly so it can be fixed.
- Use browser tools (browser_navigate, browser_click, browser_evaluate, browser_assert) for all verification.
  - Estimate: 20m
  - Files: game.js, index.html
  - Verify: Browser assertions: 16 .card elements visible, img src contains 'raw.githubusercontent.com/PokeAPI/sprites', 8 stars in score bar, no JS errors in console
