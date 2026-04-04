---
id: S02
parent: M002
milestone: M002
provides:
  - startPokemonGame() as fully async function fetching real PokeAPI CDN sprites
  - 8-pair board rendered with pairs-8 layout using CDN image URLs
  - Loading overlay (#pokemon-loading) with show/hide lifecycle
  - Retry-with-cap resilience for sprite failures
  - User-visible error message on complete network failure
requires:
  - slice: S01
    provides: startPokemonGame() entry point, pairs-8 board layout, game screen routing
affects:
  - S03
key_files:
  - game.js
  - index.html
  - style.css
key_decisions:
  - Parallel initial 8 Image() loads + serial tryNext() fallback — faster happy path, correct failure recovery
  - MAX_ATTEMPTS=25 (not 20) to account for 8 parallel starters consuming 8 attempts simultaneously
  - position:relative added to .screen so #pokemon-loading absolute overlay stays contained
  - animalId stores numeric Pokémon ID (primitive) so matchFound() strict equality works between paired cards
  - data-id on .card stores shuffle position index, not Pokémon ID — JS cards[].animalId is the identity source
patterns_established:
  - Async startPokemonGame(): audio/state init synchronously first, then async sprite pipeline, so screen transition is immediate
  - Parallel-then-serial retry pattern for image preloading: fast happy path, graceful degradation on failure
  - Attempt cap pattern: MAX_ATTEMPTS guards against infinite retry on complete network failure, surfaces user-visible error
  - animalId as primitive numeric ID for strict-equality pair matching across all game modes
observability_surfaces:
  - #pokemon-loading overlay: visible to user during sprite fetch, replaced with error text if MAX_ATTEMPTS exhausted — direct UX signal of load state and failure
  - Browser console: onerror warnings logged for each retried sprite (warnings acceptable, not errors)
drill_down_paths:
  - .gsd/milestones/M002/slices/S02/tasks/T01-SUMMARY.md
  - .gsd/milestones/M002/slices/S02/tasks/T02-SUMMARY.md
duration: ""
verification_result: passed
completed_at: 2026-04-04T19:12:54.817Z
blocker_discovered: false
---

# S02: Dynamic sprite loading with resilience

**Pokémon level now fetches real sprites from PokeAPI CDN at runtime — 8 unique pairs randomly selected from 1–151 per game, loading overlay, parallel+serial retry logic capped at 25 attempts, user-visible error on complete network failure, zero console errors.**

## What Happened

T01 rewrote `startPokemonGame()` as a fully async function with three new helpers: `buildPokemonPool()` (Fisher-Yates shuffle of 1–151), `pokemonSpriteUrl()` (CDN URL construction), and `loadPokemonSprites()` (returns a Promise that kicks off 8 parallel `Image()` loads then uses a serial `tryNext()` fallback on `onerror`, capping at MAX_ATTEMPTS=25). Audio/state init and `showScreen()` execute before the async wait so the user sees the start→game transition immediately. The `#pokemon-loading` overlay is shown at fetch start and hidden once all 8 sprites confirm loaded, or replaced with a user-visible error message if the attempt cap is exhausted. Card rendering uses the identical `card-inner > card-back + card-front > img` HTML structure, with `animalId` set to the numeric Pokémon ID so `matchFound()` strict equality works correctly for pairs. `index.html` gained the `#pokemon-loading` overlay element; `style.css` gained the overlay's absolute-positioning rule and a pulse animation, plus `position:relative` on `.screen` to keep the overlay contained.

T02 ran full end-to-end browser verification via Python HTTP server. Key discovery: `data-id` on `.card` DOM elements stores the shuffle position index (0–15), not the Pokémon ID — actual Pokémon identity lives in the JS `cards[]` array as `animalId`. All 11 verification checks passed: 16 cards rendered in `pairs-8` layout, all img src URLs point to PokeAPI CDN, 8 unique Pokémon IDs each appearing exactly twice, score bar shows 8 stars, 8× HTTP 200 from CDN confirmed in network log, second game produced a completely different set of Pokémon IDs (Fisher-Yates randomization confirmed), Lätt and Medel still serve local animal images with correct card counts, zero JavaScript errors throughout.

## Verification

All 4 static grep checks passed (CDN URL in game.js, pokemon-loading in index.html/style.css/game.js). Browser end-to-end: 16 .card elements visible, all img src contain 'raw.githubusercontent.com/PokeAPI/sprites', 8 unique animalIds each ×2, 8 stars in score bar, 8× PokeAPI CDN requests → HTTP 200, randomization confirmed across two games, Lätt/Medel backward compat intact, no JS console errors.

## Requirements Advanced

- R002 — Fisher-Yates shuffle of 1–151 per game start confirmed producing different sets across games
- R003 — CDN URL pattern implemented and network log confirmed 8× HTTP 200 from raw.githubusercontent.com/PokeAPI/sprites
- R004 — Loading overlay shown before board reveal, hidden after all 8 sprites confirmed loaded
- R005 — onerror-triggered tryNext() fallback with MAX_ATTEMPTS=25 cap and user-visible error on exhaustion

## Requirements Validated

- R002 — T02 browser eval confirmed second game produced entirely different Pokémon IDs from first game
- R003 — T02 network log: 8× raw.githubusercontent.com/PokeAPI/sprites → HTTP 200; all img src attributes verified
- R004 — T01 code review + T02 browser observation: board renders only after fetch pipeline completes
- R005 — T01 implementation reviewed: onerror→tryNext()→MAX_ATTEMPTS guard→error message path all present

## New Requirements Surfaced

None.

## Requirements Invalidated or Re-scoped

None.

## Deviations

MAX_ATTEMPTS set to 25 instead of the plan's suggested 20 — the parallel initial batch of 8 consumes 8 attempts immediately, so 25 gives 17 effective serial retries. Plan said 'e.g. max 20' (non-binding). Loading overlay resolves too fast to screenshot on fast local network; this is expected behavior, not a defect.

## Known Limitations

Failure handling (onerror/retry path) is implemented and code-reviewed but was not exercised in T02 verification because all 8 CDN requests returned HTTP 200. The error path was not tested under simulated network failure in this slice — S03 visual polish does not cover this either. The #pokemon-loading overlay display duration is imperceptible on fast connections; users on slow connections will see it correctly.

## Follow-ups

S03 (visual polish) should style the #pokemon-loading overlay more distinctively (spinner, animation) — currently it is a minimal text/emoji indicator. The Pokémon button needs distinct color/icon treatment per R006 and D006.

## Files Created/Modified

- `game.js` — Rewrote startPokemonGame() as async with buildPokemonPool(), pokemonSpriteUrl(), loadPokemonSprites() helpers; parallel+serial retry pipeline; loading overlay show/hide; error message on cap exhaustion
- `index.html` — Added #pokemon-loading overlay div inside #game-screen
- `style.css` — Added #pokemon-loading overlay styles (absolute positioning, pulse animation); added position:relative to .screen
