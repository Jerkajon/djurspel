# Requirements

This file is the explicit capability and coverage contract for the project.

## Validated

### R002 — Untitled
- Status: validated
- Validation: Browser verification (T02) confirmed: second game produced entirely different set of 8 Pokémon IDs via Fisher-Yates shuffle of 1–151, run per game start in startPokemonGame().

### R003 — Untitled
- Status: validated
- Validation: Browser network log confirmed 8× HTTP 200 responses from raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png. All card img src attributes verified pointing to CDN URLs.

### R004 — Untitled
- Status: validated
- Validation: T01 implemented #pokemon-loading overlay shown before sprites load and hidden after all 8 confirmed loaded. T02 confirmed board renders only after fetch completes (loading overlay too fast to screenshot on fast network — expected on local fast connections).

## Traceability

| ID | Class | Status | Primary owner | Supporting | Proof |
|---|---|---|---|---|---|
| R002 |  | validated | none | none | Browser verification (T02) confirmed: second game produced entirely different set of 8 Pokémon IDs via Fisher-Yates shuffle of 1–151, run per game start in startPokemonGame(). |
| R003 |  | validated | none | none | Browser network log confirmed 8× HTTP 200 responses from raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png. All card img src attributes verified pointing to CDN URLs. |
| R004 |  | validated | none | none | T01 implemented #pokemon-loading overlay shown before sprites load and hidden after all 8 confirmed loaded. T02 confirmed board renders only after fetch completes (loading overlay too fast to screenshot on fast network — expected on local fast connections). |

## Coverage Summary

- Active requirements: 0
- Mapped to slices: 0
- Validated: 3 (R002, R003, R004)
- Unmapped active requirements: 0
