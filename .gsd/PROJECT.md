# Djurspel 🦕

A Swedish children's memory card game built as a PWA. Players match pairs of animal, dinosaur, and Pokémon cards with sound effects, animations, and confetti celebrations.

## Core Value

Fun, immediate gameplay for a 4-year-old — simple to start, visually engaging, rewarding to complete.

## Current State

- Three difficulty levels: Lätt (4 pairs), Medel (6 pairs), Pokémon-nivå! (8 pairs)
- Animal/dino levels use static WebP assets
- Pokémon level fetches sprites from PokéAPI at runtime with resilient loading
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
- **External APIs:** PokéAPI sprites (runtime fetch, first 151 Pokémon)
- **Target devices:** iPad primary, mobile/desktop responsive
- **Fonts:** Nunito (Google Fonts)

## Architecture / Key Patterns

- Three-screen flow: start → game → win → start
- `showScreen(screen)` — manages screen transitions with exit animations
- `startGame(pairs)` — initializes game state, selects random animals/dinos from pools
- `startPokemonGame()` — fetches sprites, validates images, replaces failures, waits for all before board reveal
- `winGame()` — confetti, sound, stars, returns to start
- All game state in global variables (small app, no framework)
- Image preloading pattern for static assets (themes, dino dance frames)
- Dynamic image loading pattern for Pokémon sprites (validate, retry, replace on failure)

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
