---
id: S01
parent: M002
milestone: M002
provides:
  - startPokemonGame() function entry point for the Pokémon game flow
  - .btn-pokemon CSS class for the golden-yellow button visual
  - #board.pairs-8 CSS grid layout for 4×4 16-card board
  - Deal animation delays for cards 13-16
requires:
  []
affects:
  - S02
  - S03
key_files:
  - index.html
  - game.js
  - style.css
key_decisions:
  - Combined all 10 ANIMALS + 6 DINOS into one 16-item pool — exactly 2× 8 pairs, so no explicit ratio logic was needed
  - .pairs-8 portrait CSS rule placed after the landscape @media block — cascade is correct regardless since the landscape rule is inside the media query
  - board.className assigned wholesale (not classList.add) following existing startGame() pattern — clears any prior grid class
patterns_established:
  - startPokemonGame() follows the same initialization pattern as startGame() — ensureAudio, playStartJingle, playBgMusic, reset state, build card data, set board.className, render, revealThenShuffle
  - Grid class (pairs-4 / pairs-6 / pairs-8) is always assigned via board.className (replaces) not classList.add (accumulates)
observability_surfaces:
  - none
drill_down_paths:
  - .gsd/milestones/M002/slices/S01/tasks/T01-SUMMARY.md
duration: ""
verification_result: passed
completed_at: 2026-04-04T19:01:53.904Z
blocker_discovered: false
---

# S01: Pokémon button and routing

**Added ⚡ Pokémon-nivå! button (golden-yellow styling) and startPokemonGame() launching a fully functional 4×4 8-pair memory game from the combined animal/dino pool**

## What Happened

S01 was a single-task slice that delivered the entire Pokémon routing feature in one coherent change across three files.

**index.html:** A third start button (`.btn-pokemon`) was added between the Medel button and the `.theme-picker` div, calling `startPokemonGame()` with the ⚡ label and "8 par" subtitle. The existing Lätt and Medel buttons are untouched.

**game.js:** `startPokemonGame()` was added following the exact same initialization pattern as `startGame()` — calls `ensureAudio()`, `playStartJingle()`, `playBgMusic()`, resets all game state (`totalPairs=8`, `matchedPairs=0`, `flippedCards=[]`, `isLocked=false`), then combines the full ANIMALS array (10 items) and DINOS array (6 items) into a 16-item pool, shuffles, takes 8, creates 16 paired card elements, sets `board.className='pairs-8'`, and runs the full `revealThenShuffle()` cycle. The combined pool of 16 items is exactly 2× the 8 needed, so no ratio enforcement was required.

**style.css:** `.btn-pokemon` was styled with a golden-yellow background (`#f9ca24`), dark text (`#333`), and a darker-gold 3D shadow (`#d4a800`) matching the existing button shadow pattern. `#board.pairs-8` was added with `grid-template-columns: repeat(4,1fr)` and responsive max-widths (680px portrait, 820px landscape). Deal animation delays for nth-child 13–16 were added at 0.6s–0.75s increments, continuing the existing pattern.

All slice verification greps passed (exit 0). Browser verification confirmed 16 cards rendered in a 4×4 grid with 8 stars in the score bar.

## Verification

Slice verification command (`grep -q 'startPokemonGame' game.js && grep -q 'btn-pokemon' index.html && grep -q 'pairs-8' style.css && grep -q 'btn-pokemon' style.css`) exited 0. Browser checks confirmed element_count .card == 16 (pass) and text_visible ⭐×8 in score bar (pass). Existing Lätt/Medel buttons confirmed unchanged (still call `startGame(4)` and `startGame(6)`).

## Requirements Advanced

- R001 — Third button 'Pokémon-nivå!' added to start screen, launches 8-pair game via startPokemonGame()
- R006 — Button has distinct golden-yellow (#f9ca24) color and ⚡ icon, visually separate from Lätt (default) and Medel (green)

## Requirements Validated

- R001 — Button present in index.html (grep confirmed), startPokemonGame() in game.js launches full 8-pair game loop — browser verification showed 16 cards and 8 stars
- R006 — .btn-pokemon CSS rule with golden-yellow background (#f9ca24) and dark text (#333) confirmed in style.css — visually distinct from both default and .btn-green styles

## New Requirements Surfaced

None.

## Requirements Invalidated or Re-scoped

None.

## Deviations

None. All steps executed as written in the plan.

## Known Limitations

Cards use placeholder animal/dino images — real Pokémon sprites are deferred to S02 (Dynamic sprite loading with resilience).

## Follow-ups

None beyond the planned S02 (sprite fetching) and S03 (polish) slices.

## Files Created/Modified

- `index.html` — Added .btn-pokemon button between Medel and .theme-picker div
- `game.js` — Added startPokemonGame() — combines ANIMALS+DINOS, picks 8 pairs, sets board to pairs-8, runs full game loop
- `style.css` — Added .btn-pokemon golden-yellow styles, #board.pairs-8 4×4 grid layout (portrait+landscape), deal animation delays for nth-child 13-16
