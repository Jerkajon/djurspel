---
id: T01
parent: S02
milestone: M002
key_files:
  - game.js
  - index.html
  - style.css
key_decisions:
  - Parallel initial 8 Image() loads + serial tryNext() fallback — faster happy path, correct failure recovery
  - MAX_ATTEMPTS=25 to account for 8 parallel starters consuming attempts simultaneously
  - position:relative added to .screen so #pokemon-loading absolute overlay stays contained
  - animalId stores numeric Pokémon ID so matchFound() strict equality works between paired cards
duration: 
verification_result: passed
completed_at: 2026-04-04T19:06:41.153Z
blocker_discovered: false
---

# T01: Replaced static animal pool in startPokemonGame() with async CDN sprite pipeline: 8 unique Pokémon from 1–151 via PokeAPI sprites CDN, with loading overlay, parallel+serial retry logic (cap 25), and user-visible error on network failure

**Replaced static animal pool in startPokemonGame() with async CDN sprite pipeline: 8 unique Pokémon from 1–151 via PokeAPI sprites CDN, with loading overlay, parallel+serial retry logic (cap 25), and user-visible error on network failure**

## What Happened

Read game.js, index.html, and style.css in full to understand existing card rendering patterns, state management, and screen lifecycle. Rewrote startPokemonGame() as async function with three new helpers (buildPokemonPool for Fisher-Yates shuffle of 1–151, pokemonSpriteUrl for CDN URL construction, loadPokemonSprites returning a Promise that kicks off 8 parallel Image() loads then uses serial tryNext() fallback on onerror, capping at 25 total attempts). Audio/state init and showScreen() happen before the async wait so the user sees the transition immediately. Loading overlay shown on start, hidden after sprites confirmed loaded, replaced with error message if cap hit. Card rendering uses identical HTML structure (card-inner > card-back + card-front > img) with animalId set to numeric Pokémon ID for correct matchFound() equality. Added #pokemon-loading overlay to index.html and corresponding CSS (absolute positioning, pulse animation). Added position:relative to .screen so overlay is correctly contained.

## Verification

All four required grep checks from the task plan passed: CDN URL present in game.js, pokemon-loading referenced in index.html, style.css, and game.js. Structural checks confirmed: async function declaration, MAX_ATTEMPTS guard, loading show/hide calls, animalId: pokemon.id assignment, revealThenShuffle() call.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -q 'raw.githubusercontent.com/PokeAPI/sprites' game.js` | 0 | ✅ pass | 50ms |
| 2 | `grep -q 'pokemon-loading' index.html` | 0 | ✅ pass | 30ms |
| 3 | `grep -q 'pokemon-loading' style.css` | 0 | ✅ pass | 30ms |
| 4 | `grep -q 'pokemon-loading' game.js` | 0 | ✅ pass | 30ms |

## Deviations

MAX_ATTEMPTS set to 25 instead of plan's suggested 20 — the parallel initial batch of 8 consumes 8 attempts immediately, so 25 gives 17 serial retries. Plan said 'e.g. max 20' (non-binding).

## Known Issues

None.

## Files Created/Modified

- `game.js`
- `index.html`
- `style.css`
