# Djurspel 🦕

A Swedish children's memory card game built as a PWA. Players match pairs of animal, dinosaur, and Pokémon cards with sound effects, animations, and confetti celebrations.

## Core Value

Fun, immediate gameplay for a 4-year-old — simple to start, visually engaging, rewarding to complete.

## Current State

- Three difficulty levels: Lätt (4 pairs), Medel (6 pairs), ⚡ Pokémon-nivå! (8 pairs)
- Pokémon-nivå! button is live (golden-yellow, visually distinct) — currently uses placeholder animal/dino images
- Animal/dino levels use static WebP assets
- Pokémon level routing and 4×4 grid layout in place (real sprites arrive in M002/S02)
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
- **External APIs:** PokéAPI sprites planned for M002/S02 (not yet wired)
- **Target devices:** iPad primary, mobile/desktop responsive
- **Fonts:** Nunito (Google Fonts)

## Architecture / Key Patterns

- Three-screen flow: start → game → win → start
- `showScreen(screen)` — manages screen transitions with exit animations
- `startGame(pairs)` — initializes game state, selects random animals/dinos from pools
- `startPokemonGame()` — currently picks 8 pairs from combined ANIMALS+DINOS pool; will be updated in S02 to fetch real sprites from PokéAPI
- `winGame()` — confetti, sound, stars, returns to start
- All game state in global variables (small app, no framework)
- Grid class (`pairs-4` / `pairs-6` / `pairs-8`) assigned via `board.className` (replaces, not accumulates)
- Image preloading pattern for static assets (themes, dino dance frames)

## Capability Contract

See `.gsd/REQUIREMENTS.md` for the explicit capability contract, requirement status, and coverage mapping.

## Key Files

| File | Purpose |
|---|---|
| `index.html` | App shell — three screens (start, game, win) |
| `game.js` | Game logic, Pokémon loader, audio engine, confetti system |
| `style.css` | All styling, animations, responsive layout |
| `sw.js` | Service worker — offline cache |
| `manifest.json` | PWA manifest |
| `icon-*.png` | App icons (192, 512) |
| `assets/animals/*.webp` | Static animal illustrations |
| `assets/themes/` | Background and card-back images per theme |
| `assets/dino-dance/`, `assets/brachio-dance/` | Animated sprites for start screen |

## Milestone Sequence

- [x] M001: Core memory game with animals and dinos
- [ ] M002: Pokémon level with dynamic sprite loading
  - [x] S01: Pokémon button and routing (placeholder images)
  - [ ] S02: Dynamic sprite loading with resilience (PokéAPI fetch, retry, loading state)
  - [ ] S03: Visual polish and integration (spinner, Pokémon button styling, responsive grid)
