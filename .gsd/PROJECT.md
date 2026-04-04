# Djurspel 🦕

A Swedish children's memory card game built as a PWA. Players match pairs of animal, dinosaur, and Pokémon cards with sound effects, animations, and confetti celebrations.

## Core Value

Fun, immediate gameplay for a 4-year-old — simple to start, visually engaging, rewarding to complete.

## Current State

- Three difficulty levels: Lätt (4 pairs), Medel (6 pairs), ⚡ Pokémon-nivå! (8 pairs)
- Pokémon-nivå! fetches real sprites from PokeAPI CDN at runtime (raw.githubusercontent.com/PokeAPI/sprites)
- 8 unique Pokémon randomly selected from first 151 per game start (Fisher-Yates shuffle)
- Loading overlay shown during sprite fetch; board reveals only after all 8 sprites confirmed loaded
- Resilient failure handling: onerror triggers serial replacement draws, capped at MAX_ATTEMPTS=25, user-visible error on exhaustion
- Animal/dino levels use static WebP assets (backward compat intact)
- Card flip with 3D CSS transform, brief reveal at start
- Match/mismatch detection with sound feedback
- Star progress bar, confetti win celebration
- Landscape/portrait responsive grid layouts
- Safe area insets for notched devices
- Two themes (default/jungle) with persistence

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS (no framework)
- **Audio:** Web Audio API (synthesized tones — no audio files)
- **PWA:** Service Worker with cache-first strategy, manifest for home screen install
- **External APIs:** PokeAPI sprites CDN (`raw.githubusercontent.com/PokeAPI/sprites`) — no auth, direct URL construction
- **Target devices:** iPad primary, mobile/desktop responsive
- **Fonts:** Nunito (Google Fonts)

## Architecture / Key Patterns

- Three-screen flow: start → game → win → start
- `showScreen(screen)` — manages screen transitions with exit animations
- `startGame(pairs)` — initializes game state, selects random animals/dinos from pools
- `startPokemonGame()` — async function; builds random pool of 8 Pokémon IDs from 1–151, fetches CDN sprites in parallel with serial onerror fallback, shows loading overlay, renders board on success, shows error message on cap exhaustion
- `winGame()` — confetti, sound, stars, returns to start
- All game state in global variables (small app, no framework)
- Grid class (`pairs-4` / `pairs-6` / `pairs-8`) assigned via `board.className` (replaces, not accumulates)
- `animalId` stores primitive numeric Pokémon ID for strict-equality pair matching in `matchFound()`
- `data-id` on `.card` DOM elements = shuffle position index (0–15), NOT Pokémon ID — use `cards[i].animalId` for identity

## Key Files

| File | Purpose |
|---|---|
| `index.html` | App shell — three screens (start, game, win), #pokemon-loading overlay |
| `game.js` | Game logic, async Pokémon sprite pipeline, audio engine, confetti system |
| `style.css` | All styling, animations, responsive layout, #pokemon-loading overlay styles |
| `sw.js` | Service worker — offline cache |
| `manifest.json` | PWA manifest |
| `icon-*.png` | App icons (192, 512) |
| `assets/animals/*.webp` | Static animal illustrations |
| `assets/themes/` | Background and card-back images per theme |
| `assets/dino-dance/`, `assets/brachio-dance/` | Animated sprites for start screen |

## Capability Contract

See `.gsd/REQUIREMENTS.md` for the explicit capability contract, requirement status, and coverage mapping.

## Milestone Sequence

- [x] M001: Core memory game with animals and dinos
- [ ] M002: Pokémon level with dynamic sprite loading
  - [x] S01: Pokémon button and routing (placeholder images → real routing)
  - [x] S02: Dynamic sprite loading with resilience (PokeAPI CDN fetch, retry, loading state)
  - [ ] S03: Visual polish and integration (spinner polish, Pokémon button distinct styling, responsive grid)
