# S01: Pokémon button and routing — UAT

**Milestone:** M002
**Written:** 2026-04-04T19:01:53.905Z

**Milestone:** M002
**Written:** 2026-04-04

## UAT Type

- UAT mode: live-runtime
- Why this mode is sufficient: All deliverables are UI/game-loop changes in a browser-rendered single-page app. Functional correctness requires visually launching the game and confirming the board renders correctly.

## Preconditions

- App is running locally (e.g. `python3 -m http.server 8080` in the project root)
- Browser pointed at `http://localhost:8080`
- Start screen is visible with Lätt, Medel, and Pokémon-nivå! buttons

## Smoke Test

Tap/click ⚡ Pokémon-nivå! — the game screen should appear with 16 face-down cards in a 4×4 grid and 8 stars in the score bar.

## Test Cases

### 1. Pokémon-nivå! button is present and visually distinct

1. Load the app and view the start screen.
2. Locate the three buttons: Lätt, Medel, ⚡ Pokémon-nivå!
3. **Expected:** The Pokémon-nivå! button is golden-yellow, clearly different from the white/default Lätt button and the green Medel button. It shows "⚡ Pokémon-nivå!" and a subtitle "8 par".

### 2. Clicking Pokémon-nivå! launches an 8-pair game

1. Click ⚡ Pokémon-nivå! on the start screen.
2. Wait for the game screen to appear.
3. **Expected:** 16 cards are laid out in a 4×4 grid. The score bar shows ⭐×8. The board begins the brief reveal animation (cards flash face-up then flip back down).

### 3. Cards show animal/dino placeholder images (not Pokémon sprites)

1. Start a Pokémon game.
2. After the reveal animation, flip one card.
3. **Expected:** The face of the card shows an animal or dinosaur emoji/image (placeholder for now — real sprites arrive in S02). No broken image icons should appear.

### 4. Full game loop works — match all 8 pairs and reach win screen

1. Start a Pokémon game.
2. Play through to completion, matching all 8 pairs.
3. **Expected:** Confetti fires, win screen appears, "Spela igen!" button is visible. Pressing it returns to the start screen.

### 5. Existing Lätt and Medel levels are unaffected

1. From the start screen, click Lätt.
2. **Expected:** 8 cards (4 pairs) in a 2×4 or similar layout — NOT a 4×4 grid.
3. Return to start screen, click Medel.
4. **Expected:** 12 cards (6 pairs) in appropriate layout — NOT a 4×4 grid.
5. Both levels complete normally through to the win screen.

### 6. Pokémon game is responsive on portrait and landscape orientation

1. Start a Pokémon game on an iPad (or use browser DevTools to simulate iPad dimensions).
2. Hold in portrait orientation — 820×1180 approximate.
3. **Expected:** 16 cards fit in a 4×4 grid within max-width 680px, centered.
4. Rotate to landscape — 1180×820 approximate.
5. **Expected:** 4×4 grid expands to max-width 820px — cards are larger and still fit without horizontal scroll.

## Edge Cases

### Each new Pokémon game draws a fresh random selection

1. Start a Pokémon game and note which animal/dino images appear.
2. Reach the win screen and tap "Spela igen!" to return to start.
3. Start a new Pokémon game.
4. **Expected:** The set of 8 animals/dinos is likely different from the previous game (random draw from 16-item pool; may occasionally repeat but should vary most of the time).

### Deal animation plays for all 16 cards

1. Start a Pokémon game.
2. Watch the deal animation closely.
3. **Expected:** All 16 cards animate in sequence — the last four cards (positions 13–16) animate with a slight delay after the first 12, completing around 0.75s after the first card.

## Failure Signals

- Pokémon-nivå! button is missing from the start screen — HTML change not applied
- Button appears white/green instead of golden-yellow — `.btn-pokemon` CSS rule missing or overridden
- Game screen shows 8 or 12 cards instead of 16 — `totalPairs` not set to 8 or `.pairs-8` grid not applied
- Score bar shows fewer than 8 stars — `totalPairs` not set correctly
- Lätt/Medel now show 16 cards — `startGame()` was accidentally modified

## Not Proven By This UAT

- Real Pokémon sprite fetching (deferred to S02)
- Loading spinner during sprite fetch (deferred to S02/S03)
- Failure/fallback handling for broken sprites (deferred to S02)
- Pokémon button icon/badge polish (deferred to S03)

## Notes for Tester

The placeholder animal/dino images on Pokémon-level cards are intentional for S01. The Pokémon branding of this level is currently only the button label and color — the actual Pokémon sprites arrive in S02. Focus testing on the routing, grid layout, star count, and existing level preservation.

