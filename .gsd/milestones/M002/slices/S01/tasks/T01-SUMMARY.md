---
id: T01
parent: S01
milestone: M002
key_files:
  - index.html
  - game.js
  - style.css
key_decisions:
  - Combined all 10 ANIMALS + 6 DINOS into one pool (16 items = exactly 2× 8 pairs) — no explicit dino/animal ratio logic needed
  - Placed .pairs-8 portrait CSS rule after the landscape @media block; cascade is correct regardless
duration: 
verification_result: passed
completed_at: 2026-04-04T19:00:19.164Z
blocker_discovered: false
---

# T01: Added ⚡ Pokémon-nivå! button and startPokemonGame() launching a 4×4 responsive 8-pair memory game from combined animal/dino pool

**Added ⚡ Pokémon-nivå! button and startPokemonGame() launching a 4×4 responsive 8-pair memory game from combined animal/dino pool**

## What Happened

Added the Pokémon-nivå! button (golden-yellow .btn-pokemon) to the start screen between Medel and the theme-picker. Added startPokemonGame() in game.js that combines all ANIMALS+DINOS (16 items), shuffles, picks 8, creates 16 paired cards, sets board.className='pairs-8', and runs the full reveal/shuffle/unlock cycle. Added .btn-pokemon CSS (gold #f9ca24, dark text #333), #board.pairs-8 grid layout (4×4, max-width 680px portrait / 820px landscape), and deal animation delays for cards 13–16 (0.6s–0.75s). Existing Lätt/Medel buttons are untouched.

## Verification

Slice verification grep command passed (exit 0). Browser verification: 4×4 board renders 16 cards, score bar shows 8 stars, element_count and text_visible assertions both passed.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `grep -q 'startPokemonGame' game.js && grep -q 'btn-pokemon' index.html && grep -q 'pairs-8' style.css && grep -q 'btn-pokemon' style.css` | 0 | ✅ pass | 50ms |
| 2 | `browser: element_count .card == 16` | 0 | ✅ pass | 1000ms |
| 3 | `browser: text_visible ⭐×8 in score bar` | 0 | ✅ pass | 80ms |

## Deviations

None.

## Known Issues

None.

## Files Created/Modified

- `index.html`
- `game.js`
- `style.css`
