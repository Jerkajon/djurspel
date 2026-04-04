# S03: Visual polish and integration — UAT

**Milestone:** M002
**Written:** 2026-04-04T19:42:44.679Z

**Milestone:** M002
**Written:** 2026-04-04

## UAT Type

- UAT mode: live-runtime
- Why this mode is sufficient: All S03 changes are visual (CSS/HTML only). Runtime verification against a local HTTP server is the only way to confirm rendering, hover states, spinner presence, and grid layout. Static grep confirms structure; browser automation confirms appearance and interaction.

## Preconditions

- Local HTTP server running at `http://localhost:8765` from `/Users/erikandersson/vscode/djurspel` (e.g. `python3 -m http.server 8765`)
- Modern browser with DevTools available
- Network access to `raw.githubusercontent.com` for Pokémon sprite CDN

## Smoke Test

Open `http://localhost:8765`. The start screen should show three buttons: Lätt (red/orange), Medel (green), and a yellow Pokémon-nivå! button. The Pokémon button must visually stand out from the other two.

## Test Cases

### 1. Pokémon button is visually distinct at desktop viewport

1. Open `http://localhost:8765`
2. Observe the three mode buttons on the start screen
3. **Expected:** `.btn-pokemon` has a yellow/gold background clearly different from the red Lätt button and green Medel button. On hover, the background brightens to `#ffd93d`, the button lifts slightly (shadow increases, scale(1.02)), and the effect is smooth.

### 2. Spinner element is present in DOM

1. Open `http://localhost:8765`
2. Open browser DevTools → Console
3. Run: `document.querySelector('#pokemon-loading .pokemon-spinner') !== null`
4. **Expected:** `true` — the spinner div exists inside the overlay even though the overlay itself is hidden (`display:none`).

### 3. Loading overlay appears during sprite fetch

1. Open `http://localhost:8765`
2. Click the Pokémon-nivå! button
3. **Expected:** The `#pokemon-loading` overlay briefly appears showing "⚡ Laddar Pokémon-sprites…" with a yellow animated spinner ring. On fast connections this may flash quickly — this is expected behavior per D004/D005.

### 4. 4×4 grid renders at iPad portrait viewport (768×1024)

1. Open DevTools → Device emulation → set viewport to 768×1024 (iPad portrait)
2. Open `http://localhost:8765`
3. Click the Pokémon-nivå! button and wait for the board to render
4. **Expected:** 16 cards arranged in a 4-column grid. No horizontal overflow. Cards fill the viewport comfortably without clipping or scrollbar. `document.querySelectorAll('.card').length` returns 16.

### 5. Focus-visible ring on Pokémon button

1. Open `http://localhost:8765`
2. Tab-navigate to the Pokémon-nivå! button (or use DevTools to force `:focus-visible`)
3. **Expected:** A visible white outline (3px, 2px offset) appears around the button. This should be clearly visible for keyboard accessibility.

### 6. Zero JS errors during full Pokémon game flow

1. Open DevTools → Console (clear any prior logs)
2. Open `http://localhost:8765`
3. Click Pokémon-nivå!, wait for board to render, flip a few cards
4. **Expected:** Zero JS errors in the console throughout the flow.

## Edge Cases

### Spinner animation is smooth (no jank)

1. Open `http://localhost:8765` with DevTools → Performance tab recording
2. Click Pokémon-nivå! to trigger the overlay
3. **Expected:** The spinner rotates smoothly at constant speed. No layout thrash — it uses `transform: rotate()` which runs on the compositor thread.

### Button state after game starts (no duplicate hover state)

1. Open `http://localhost:8765`
2. Hover the Pokémon button, then click it
3. Wait for the game screen to appear
4. **Expected:** The game screen shows the board (or loading overlay). The start screen buttons are no longer visible. No stuck hover state persists.

## Failure Signals

- Pokémon button looks identical to Lätt/Medel buttons (no yellow color) → CSS rule for `.btn-pokemon` not applied or overridden
- No spinner visible during loading → `.pokemon-spinner` missing from DOM or `#pokemon-loading` never shown
- `document.querySelector('#pokemon-loading .pokemon-spinner') !== null` returns `false` → spinner div missing from index.html
- Cards overflow the iPad viewport horizontally → `.pairs-8` grid CSS not applied or `grid-template-columns` incorrect at this viewport
- JS errors in console → regression introduced in index.html or game.js

## Not Proven By This UAT

- Behavior on real iPad hardware (only emulated viewport tested)
- Behavior on very slow network connections where the loading overlay is visible for several seconds
- Hover state appearance on touch devices (`:hover` has different behavior on mobile)
- Error state UI when all sprite fetches fail (covered by S02 UAT)

## Notes for Tester

The loading overlay flash on fast local connections is expected and not a bug — it confirms the overlay mechanism works. If you want to see it clearly, throttle the network in DevTools (Slow 3G) before clicking the Pokémon button.
