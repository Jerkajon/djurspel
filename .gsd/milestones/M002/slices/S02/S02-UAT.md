# S02: Dynamic sprite loading with resilience — UAT

**Milestone:** M002
**Written:** 2026-04-04T19:12:54.817Z

## UAT Type

- UAT mode: live-runtime
- Why this mode is sufficient: The core deliverable is a network-dependent browser behaviour (CDN sprite fetch, loading overlay, board reveal). Only a live browser run against the real PokeAPI CDN can confirm all requirements. T02 already executed this; the UAT script formalises it for repeatable human or automated verification.

## Preconditions

- Local HTTP server running from project root (e.g. `python3 -m http.server 8765`).
- Active internet connection (PokeAPI CDN at `raw.githubusercontent.com` must be reachable).
- Browser DevTools open (Console + Network tabs) for error and request verification.

## Smoke Test

Open the app, click **⚡ Pokémon-nivå!**, and confirm 16 face-down cards appear within ~3 seconds and the score bar shows 8 stars (⭐⭐⭐⭐⭐⭐⭐⭐).

## Test Cases

### 1. Loading overlay appears on game start

1. Navigate to `http://localhost:8765/`.
2. Click the **⚡ Pokémon-nivå!** button.
3. Observe the game screen immediately (start screen should transition away).
4. **Expected:** A loading indicator (text/emoji) is visible briefly in the centre of the game screen before the board appears. On fast connections this may be sub-second — acceptable. On slow/throttled connections it must persist until all 8 sprites are loaded.

### 2. Board renders 16 cards in pairs-8 layout with CDN sprites

1. After the loading overlay disappears, inspect the board.
2. Count the card elements on screen.
3. Open DevTools Network tab — filter by image/PNG.
4. **Expected:** Exactly 16 `.card` elements are visible. The board has class `pairs-8`. All 16 card face images have `src` attributes containing `raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`. Network tab shows exactly 8 PNG requests to that CDN (one per unique Pokémon — paired cards share the same URL).

### 3. Exactly 8 unique Pokémon pairs, IDs from 1–151

1. With the board visible, open DevTools Console.
2. Run: `cards.map(c => c.animalId)`
3. **Expected:** An array of 16 values where each value is an integer between 1 and 151, and each integer appears exactly twice (8 pairs). No duplicates beyond the required pair.

### 4. Randomisation across games

1. Note the 8 Pokémon IDs from the first game (from step 3 above).
2. Click the back button (or navigate back to start screen).
3. Start a new Pokémon game.
4. Run `cards.map(c => c.animalId)` again.
5. **Expected:** The set of 8 IDs is different from the first game. (Due to randomness, an identical set is astronomically unlikely but theoretically possible — if it happens, run a third game to confirm randomisation is working.)

### 5. Score bar shows 8 stars

1. With the Pokémon board visible.
2. Inspect `#score-bar`.
3. **Expected:** 8 `.star` elements visible in the score bar (⭐⭐⭐⭐⭐⭐⭐⭐).

### 6. All CDN requests return HTTP 200

1. Open DevTools Network tab before clicking Pokémon-nivå!.
2. Start a Pokémon game.
3. After board renders, filter network requests by `githubusercontent`.
4. **Expected:** Exactly 8 requests to `raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/*.png`, all with status 200. No 404s or failed requests.

### 7. Backward compatibility — Lätt still works

1. Navigate back to start screen.
2. Click **Lätt** button.
3. **Expected:** 8 cards rendered (pairs-4 layout). Card images are local animal images (not PokeAPI CDN URLs). Score bar shows 4 stars.

### 8. Backward compatibility — Medel still works

1. Navigate back to start screen.
2. Click **Medel** button.
3. **Expected:** 12 cards rendered (pairs-6 layout). Card images are local animal/dino images. Score bar shows 6 stars.

### 9. No JavaScript errors

1. Run through test cases 1–6 with DevTools Console open.
2. **Expected:** Zero red error messages in the Console. Yellow warnings for retried sprites (if any CDN sprite failed and was replaced) are acceptable.

## Edge Cases

### Network throttle — loading overlay persists

1. In DevTools Network tab, enable throttling (e.g. "Slow 3G").
2. Start a Pokémon game.
3. **Expected:** Loading overlay remains visible while sprites are fetching. Board does not appear until all 8 are confirmed loaded. Overlay disappears and board reveals atomically.

### Complete network failure — user-visible error message

1. Disconnect from the internet (or block `raw.githubusercontent.com` via DevTools Request Blocking).
2. Start a Pokémon game.
3. **Expected:** After MAX_ATTEMPTS (25) are exhausted, the loading overlay is replaced with a user-visible error message (not a silent hang or blank board). The game does not crash.

### Pair matching works with CDN sprites

1. Start a Pokémon game and wait for board.
2. Flip two cards showing the same Pokémon sprite.
3. **Expected:** The pair is recognised as a match (cards stay face-up, match animation plays, star is filled). `matchFound()` correctly identifies the pair via `animalId` equality.

## Failure Signals

- Loading overlay never disappears → sprite pipeline hung; check console for JS errors.
- Board shows fewer than 16 cards → rendering bug or async timing issue.
- Card images show broken image icons → CDN URLs incorrect or network blocked without error path triggering.
- Console shows `TypeError` or `ReferenceError` → implementation error in game.js.
- Score bar shows wrong number of stars → `totalPairs` not set to 8 in startPokemonGame().
- Second game shows identical Pokémon set repeatedly → Fisher-Yates shuffle not running per game start.

## Not Proven By This UAT

- The onerror retry path under real network degradation (partial failure where some but not all sprites 404) — this would require a proxy or request-blocking setup to simulate.
- Behaviour when MAX_ATTEMPTS is genuinely exhausted in production (tested in code review only, not live).
- Performance on very slow connections or low-end devices.
- iPad/mobile responsive layout for the pairs-8 grid (covered in S03).

## Notes for Tester

- On a fast connection, the loading overlay may flash too quickly to observe. This is correct behaviour. Throttle the network if you want to see it persist.
- `data-id` on `.card` DOM elements stores the shuffle position (0–15), NOT the Pokémon ID. Always use `cards[i].animalId` in the console for Pokémon identity checks.
- Use `.btn-pokemon` as the CSS selector for the Pokémon button — `.btn.btn-start` matches all three mode buttons.
