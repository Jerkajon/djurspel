# Djurspel 🦕

A Swedish children's memory card game built as a PWA. Players match pairs of animal and dinosaur emoji cards with sound effects, animations, and confetti celebrations.

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS (no framework)
- **Audio:** Web Audio API (synthesized tones — no audio files)
- **PWA:** Service Worker with cache-first strategy, manifest for home screen install
- **Target devices:** iPad primary, mobile/desktop responsive
- **Fonts:** Nunito (Google Fonts)

## Current State

- Two difficulty levels: Lätt (4 pairs), Medel (6 pairs)
- Card flip with 3D CSS transform, brief reveal at start
- Match/mismatch detection with sound feedback
- Star progress bar, confetti win celebration
- Landscape/portrait responsive grid layouts
- Safe area insets for notched devices
- Two commits, stable working state

## Key Files

| File | Purpose |
|---|---|
| `index.html` | App shell — three screens (start, game, win) |
| `game.js` | Game logic, audio engine, confetti system |
| `style.css` | All styling, animations, responsive layout |
| `sw.js` | Service worker — offline cache |
| `manifest.json` | PWA manifest |
| `icon-*.png` | App icons (192, 512) |
