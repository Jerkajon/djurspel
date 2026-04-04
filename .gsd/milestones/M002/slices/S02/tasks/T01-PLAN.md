---
estimated_steps: 15
estimated_files: 3
skills_used: []
---

# T01: Rewrite startPokemonGame() with CDN sprite fetching, loading state, and failure resilience

Replace the placeholder animal/dino pool in `startPokemonGame()` with a full async sprite-loading pipeline:

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

## Inputs

- ``game.js` — contains current `startPokemonGame()` placeholder implementation using animal/dino pool`
- ``index.html` — contains `#game-screen` where loading overlay needs to be added`
- ``style.css` — needs loading indicator styles`

## Expected Output

- ``game.js` — `startPokemonGame()` rewritten as async function with CDN sprite fetching, retry logic, and loading state management`
- ``index.html` — `#pokemon-loading` overlay element added inside `#game-screen``
- ``style.css` — loading indicator styles for `#pokemon-loading``

## Verification

grep -q 'raw.githubusercontent.com/PokeAPI/sprites' game.js && grep -q 'pokemon-loading' index.html && grep -q 'pokemon-loading' style.css && grep -q 'pokemon-loading' game.js
