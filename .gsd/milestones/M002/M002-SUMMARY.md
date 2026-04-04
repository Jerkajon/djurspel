---
id: M002
title: "Pokémon Level with Dynamic Sprite Loading"
status: complete
completed_at: 2026-04-04T19:46:16.014Z
key_decisions:
  - Combined ANIMALS+DINOS (10+6=16 items) as Pokémon placeholder pool — exactly 2× the 8 pairs needed, no ratio logic required
  - PokeAPI sprites CDN (raw.githubusercontent.com/PokeAPI/sprites) used directly — zero auth, no API calls, just URL construction
  - Random selection from 1–151 per game start (not app load) for per-round replayability
  - Wait-for-all-images then reveal board strategy — prevents partially-rendered states and broken image icons
  - Skip-and-draw-replacement failure handling — game always shows 8 working pairs
  - 8 parallel Image() loads + serial tryNext() fallback — faster happy path, correct failure recovery
  - MAX_ATTEMPTS=25 (not 20) — accounts for 8 parallel starters consuming 8 attempts simultaneously, leaving 17 serial retries
  - animalId stores numeric Pokémon ID as primitive — required for matchFound() strict equality to work between paired cards
  - position:relative on .screen — required to contain #pokemon-loading absolute overlay
  - Spinner border-top-color #f9ca24 matches .btn-pokemon background for visual coherence
key_files:
  - game.js — startPokemonGame() async function, buildPokemonPool(), pokemonSpriteUrl(), loadPokemonSprites() helpers
  - index.html — .btn-pokemon button, #pokemon-loading overlay div with .pokemon-spinner child
  - style.css — .btn-pokemon golden-yellow styles, #board.pairs-8 4×4 grid, #pokemon-loading overlay, .pokemon-spinner animation, hover/focus-visible states
lessons_learned:
  - data-id on .card DOM elements stores shuffle position index (0–15), NOT Pokémon ID — use cards[i].animalId in JS for identity
  - .btn-pokemon is the precise selector for the Pokémon button; .btn.btn-start matches all three mode buttons
  - selector_visible always fails for elements hidden by an ancestor display:none — use browser_evaluate(querySelector !== null) for DOM-presence checks on hidden elements
  - MAX_ATTEMPTS must account for the parallel batch size: 8 parallel starters immediately consume 8 of the attempt budget, so 25 is safer than 20 for 17 effective serial retries
  - Audio/state init should run synchronously before any async await in startPokemonGame() — ensures immediate screen transition while sprites load in background
  - board.className must be assigned wholesale (not classList.add) to clear any previous grid class — pattern established in startGame() and followed throughout
---

# M002: Pokémon Level with Dynamic Sprite Loading

**Added a fully functional Pokémon memory level fetching real sprites from PokeAPI CDN at runtime, with animated loading overlay, resilient retry logic, and polished distinct button styling.**

## What Happened

M002 delivered a complete third game mode — "⚡ Pokémon-nivå!" — across three sequential slices, each building on the last with no rework.

**S01 (Pokémon button and routing)** wired up the entry point: a golden-yellow `.btn-pokemon` button calling `startPokemonGame()`, which combined the full ANIMALS (10) and DINOS (6) pools into a 16-item deck (exactly 2× the 8 pairs needed), shuffled, picked 8, and rendered a functional 4×4 board using the existing game loop. The `#board.pairs-8` CSS grid class and deal animation delays for cards 13–16 were added. Browser verification confirmed 16 cards and 8 stars in the score bar with Lätt/Medel untouched.

**S02 (Dynamic sprite loading with resilience)** rewrote `startPokemonGame()` as a fully async function. Three helpers were added: `buildPokemonPool()` (Fisher-Yates shuffle of 1–151), `pokemonSpriteUrl()` (CDN URL construction for raw.githubusercontent.com/PokeAPI/sprites), and `loadPokemonSprites()` (8 parallel Image() loads with serial `tryNext()` fallback on onerror, capped at MAX_ATTEMPTS=25 to account for the 8 parallel starters). Audio/state init runs synchronously before the async wait so the screen transition is immediate. The `#pokemon-loading` overlay is shown at fetch start, hidden on success, or replaced with a user-visible error message on cap exhaustion. `animalId` stores the numeric Pokémon ID as a primitive for strict-equality matching in `matchFound()`. Browser end-to-end verification confirmed: 16 cards with PokeAPI CDN img src, 8 unique IDs each appearing twice, 8× HTTP 200 from CDN, fresh random set on second game, Lätt/Medel backward compat intact, zero JS console errors.

**S03 (Visual polish and integration)** was a pure CSS/HTML task. A `.pokemon-spinner` div was added inside `#pokemon-loading`, styled as a 56px ring with `border-top-color: #f9ca24` (matching the button yellow) animating at 0.8s linear infinite. `.btn-pokemon:hover` was given a brighter yellow (#ffd93d), lifted box-shadow (8px), and `scale(1.02) translateY(-1px)` consistent with the existing button interaction pattern. `.btn-pokemon:focus-visible` received a 3px white outline for keyboard accessibility. Browser verification at 768×1024 iPad portrait viewport confirmed the 4×4 grid renders without overflow and the loading flash + spinner appear before board reveal.

## Success Criteria Results

## Success Criteria Results

| Criterion | Result | Evidence |
|---|---|---|
| ⚡ Pokémon-nivå! button present on start screen calling startPokemonGame() | ✅ PASS | `grep` confirmed `.btn-pokemon` in index.html and `startPokemonGame` in game.js; S01 browser verification showed button rendered and functional |
| 8-pair board (16 cards, 4×4 grid) launched by Pokémon button | ✅ PASS | S01 browser assertion: `element_count .card == 16` pass; `pairs-8` grid class confirmed |
| Real Pokémon sprites from PokeAPI CDN, randomly selected from 1–151 | ✅ PASS | S02 T02: all 8 img src contain `raw.githubusercontent.com/PokeAPI/sprites`, 8× HTTP 200 from CDN confirmed in network log |
| Different Pokémon set each game (Fisher-Yates randomization) | ✅ PASS | S02 T02: second game produced entirely different set of 8 Pokémon IDs (R002 validated) |
| Loading overlay shown during sprite fetch, board revealed only after all 8 loaded | ✅ PASS | S02: `#pokemon-loading` overlay shown before async pipeline, hidden after all sprites confirmed; S03 T02 observed loading flash before board reveal |
| Resilient failure handling with user-visible error on complete network failure | ✅ PASS | S02 T01 code review: onerror→tryNext()→MAX_ATTEMPTS=25 guard→error message path all present and correct |
| Pokémon button visually distinct from Lätt/Medel | ✅ PASS | S01/S03: `.btn-pokemon` has golden-yellow #f9ca24 (vs red default and green .btn-green); hover brightens to #ffd93d with lift shadow and scale; S03 T02 desktop+iPad viewport assertion pass |
| Animated spinner visible during sprite fetch | ✅ PASS | S03: `.pokemon-spinner` added and styled; S03 T02 DOM presence confirmed via browser_evaluate |
| 4×4 grid responsive at iPad 768×1024 portrait | ✅ PASS | S03 T02: iPad viewport switched, all three mode buttons visible, 16-card board rendered without overflow |
| Lätt and Medel backward compat intact | ✅ PASS | S01, S02, S03: existing buttons confirmed unchanged; S02 T02 verified Lätt/Medel still serve local animal images with correct card counts |

## Definition of Done Results

## Definition of Done Results

| Item | Status | Evidence |
|---|---|---|
| All slices complete (S01, S02, S03) | ✅ | All three slices show `✅` in ROADMAP.md; S01-SUMMARY.md, S02-SUMMARY.md, S03-SUMMARY.md all exist with `verification_result: passed` |
| All slice summaries exist | ✅ | `ls .gsd/milestones/M002/slices/S*/` confirmed S01-SUMMARY.md, S02-SUMMARY.md, S03-SUMMARY.md present |
| Non-.gsd/ code changes present in git | ✅ | `game.js`, `index.html`, `style.css` all contain M002 deliverables; 5 M002 commits in git log |
| Requirements R001–R006 validated | ✅ | All six requirements transitioned to validated status with browser/grep evidence per pipeline context |
| Cross-slice integration correct | ✅ | S02 consumed S01's `startPokemonGame()` entry point and `pairs-8` layout; S03 consumed S02's `#pokemon-loading` overlay structure and `.btn-pokemon` base styles — all interfaces aligned |
| No JS console errors in final state | ✅ | S02 T02 and S03 T02 both confirmed zero JavaScript errors |

## Requirement Outcomes

## Requirement Outcomes

| ID | Transition | Evidence |
|---|---|---|
| R001 | active → validated | `.btn-pokemon` button in index.html confirmed by grep; `startPokemonGame()` in game.js launches full 8-pair game loop; S01 browser verification showed 16 cards and 8 stars |
| R002 | active → validated | S02 T02 browser eval confirmed second game produced entirely different Pokémon IDs via Fisher-Yates shuffle of 1–151 run per game start |
| R003 | active → validated | S02 T02 network log: 8× raw.githubusercontent.com/PokeAPI/sprites → HTTP 200; all card img src attributes verified |
| R004 | active → validated | `#pokemon-loading` overlay shown before async pipeline resolves, hidden after all 8 sprites confirmed loaded; board reveals only after fetch completes |
| R005 | active → validated | onerror→tryNext()→MAX_ATTEMPTS=25 guard→user-visible error message path implemented; code review confirmed; happy path exercised with 8/8 HTTP 200 responses |
| R006 | active → validated | `.btn-pokemon` CSS rule with golden-yellow #f9ca24, ⚡ icon in button label, hover/focus-visible states confirmed in style.css; visually distinct from Lätt (default red) and Medel (green) |

## Deviations

MAX_ATTEMPTS set to 25 instead of a suggested 20 in the S02 plan — the parallel initial batch of 8 consumes 8 attempts immediately, so 25 gives 17 effective serial retries. The plan noted 'e.g. max 20' as non-binding, so this is a calibration, not a deviation from intent.

## Follow-ups

The onerror/retry path (tryNext() failure handling) was implemented and code-reviewed but not exercised under simulated network failure — a future testing milestone could add offline/throttled-network UAT for this path. The #pokemon-loading overlay is imperceptibly fast on fast connections; users on slow connections will see it correctly (expected behavior per D004).
