# Requirements

This file is the explicit capability and coverage contract for the project.

## Validated

### R002 — Pokémon selection is randomized via Fisher-Yates shuffle of 1–151 per game start, producing different Pokémon sets each round
- Status: validated
- Description: Pokémon selection is randomized via Fisher-Yates shuffle of 1–151 per game start, producing different Pokémon sets each round
- Validation: Browser verification (T02) confirmed: second game produced entirely different set of 8 Pokémon IDs via Fisher-Yates shuffle of 1–151, run per game start in startPokemonGame().

### R003 — Pokémon sprites are fetched from PokeAPI CDN (raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png) at runtime
- Status: validated
- Description: Pokémon sprites are fetched from PokeAPI CDN (raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png) at runtime
- Validation: Browser network log confirmed 8× HTTP 200 responses from raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png. All card img src attributes verified pointing to CDN URLs.

### R004 — Loading overlay shown during sprite fetch; board revealed only after all 8 sprites are confirmed loaded
- Status: validated
- Description: Loading overlay shown during sprite fetch; board revealed only after all 8 sprites are confirmed loaded
- Validation: T01 implemented #pokemon-loading overlay shown before sprites load and hidden after all 8 confirmed loaded. T02 confirmed board renders only after fetch completes (loading overlay too fast to screenshot on fast network — expected on local fast connections).

### R005 — Untitled
- Status: validated
- Validation: T01 implemented onerror-triggered tryNext() serial fallback capped at MAX_ATTEMPTS=25. On cap exhaustion, user-visible error message shown. Reviewed in code; network path fully passes in T02 with 8/8 sprites loading successfully.

### R006 — Pokémon button has distinct golden-yellow (#f9ca24) color and ⚡ icon, visually separate from Lätt (default red) and Medel (green), with hover/focus-visible interaction states
- Class: functional
- Status: validated
- Description: Pokémon button has distinct golden-yellow (#f9ca24) color and ⚡ icon, visually separate from Lätt (default red) and Medel (green), with hover/focus-visible interaction states
- Why it matters: Makes it visually clear this is a different kind of level; exciting and distinct for the target user (4-year-old)
- Source: M002
- Validation: .btn-pokemon CSS rule with golden-yellow background (#f9ca24), dark text (#333), hover state brightening to #ffd93d with lift shadow and scale, focus-visible 3px white outline confirmed in style.css — visually distinct from both default and .btn-green styles

### R007 — Third button '⚡ Pokémon-nivå!' present on start screen, calling startPokemonGame() to launch an 8-pair memory game
- Class: functional
- Status: validated
- Description: Third button '⚡ Pokémon-nivå!' present on start screen, calling startPokemonGame() to launch an 8-pair memory game
- Why it matters: Enables the Pokémon game mode as a distinct third difficulty level, making the feature discoverable to the user's son
- Source: M002
- Validation: Button present in index.html (grep confirmed), startPokemonGame() in game.js launches full 8-pair game loop — browser verification showed 16 cards and 8 stars in score bar

## Traceability

| ID | Class | Status | Primary owner | Supporting | Proof |
|---|---|---|---|---|---|
| R002 |  | validated | none | none | Browser verification (T02) confirmed: second game produced entirely different set of 8 Pokémon IDs via Fisher-Yates shuffle of 1–151, run per game start in startPokemonGame(). |
| R003 |  | validated | none | none | Browser network log confirmed 8× HTTP 200 responses from raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png. All card img src attributes verified pointing to CDN URLs. |
| R004 |  | validated | none | none | T01 implemented #pokemon-loading overlay shown before sprites load and hidden after all 8 confirmed loaded. T02 confirmed board renders only after fetch completes (loading overlay too fast to screenshot on fast network — expected on local fast connections). |
| R005 |  | validated | none | none | T01 implemented onerror-triggered tryNext() serial fallback capped at MAX_ATTEMPTS=25. On cap exhaustion, user-visible error message shown. Reviewed in code; network path fully passes in T02 with 8/8 sprites loading successfully. |
| R006 | functional | validated | none | none | .btn-pokemon CSS rule with golden-yellow background (#f9ca24), dark text (#333), hover state brightening to #ffd93d with lift shadow and scale, focus-visible 3px white outline confirmed in style.css — visually distinct from both default and .btn-green styles |
| R007 | functional | validated | none | none | Button present in index.html (grep confirmed), startPokemonGame() in game.js launches full 8-pair game loop — browser verification showed 16 cards and 8 stars in score bar |

## Coverage Summary

- Active requirements: 0
- Mapped to slices: 0
- Validated: 6 (R002, R003, R004, R005, R006, R007)
- Unmapped active requirements: 0
