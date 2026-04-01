# M001: 

## Vision
Transform the game from emoji placeholders to a fully illustrated, themed experience — AI-generated animal art, multiple visual themes with real backgrounds and card backs, richer animations, atmospheric sound, and the kind of tactile feel that makes a toddler want to keep tapping.

## Slice Overview
| ID | Slice | Risk | Depends | Done | After this |
|----|-------|------|---------|------|------------|
| S01 | Animation & Interaction Juice | medium | — | ✅ | Cards flip with springy overshoot, matches pulse and glow, mismatches wobble, screen transitions slide smoothly, deal animation staggers naturally |
| S02 | Theme System & Visual Variety | high | S01 | ✅ | Start screen shows theme picker. Selecting a theme instantly changes background gradient, card back design, button colors, and overall mood. At least 2 themes: default purple/blue and a warm jungle theme. |
| S03 | Sound & Atmosphere | medium | S01 | ✅ | Game has subtle background ambient loop. SFX are richer (layered tones). Mute button visible on all screens. Sound preference persists. |
| S04 | Final Integration & PWA Update | low | S01, S02, S03 | ✅ | Full playthrough with themes and sound — everything works together. PWA installs cleanly with updated cache. |
| S05 | Final Integration & PWA Update | low | S01, S02, S03, S04 | ⬜ | Full playthrough with each theme, sound on/off, both difficulty levels. Install as PWA, go offline, play again — everything works. |
