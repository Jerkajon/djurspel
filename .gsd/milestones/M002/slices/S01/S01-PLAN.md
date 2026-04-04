# S01: Pokémon button and routing

**Goal:** Start screen shows a visually distinct "Pokémon-nivå!" button that launches an 8-pair memory game using placeholder animal/dino images, with a responsive 4×4 grid layout.
**Demo:** After this: Clicking Pokémon-nivå! on start screen launches a Pokémon game with 8 pairs (placeholder animal/dino images for now, real sprites in S02)

## Tasks
- [x] **T01: Added ⚡ Pokémon-nivå! button and startPokemonGame() launching a 4×4 responsive 8-pair memory game from combined animal/dino pool** — This single task implements the entire S01 slice: a visually distinct Pokémon button on the start screen, the startPokemonGame() function that picks 8 random animal/dino pairs as placeholders, the .pairs-8 CSS grid layout (responsive for iPad portrait and landscape), and deal animation delay entries for 16 cards.

## Steps

1. In `index.html`, add a third button after the Medel button inside `.start-content`:
   ```html
   <button class="btn btn-start btn-pokemon" onclick="startPokemonGame()">
     <span>⚡ Pokémon-nivå!</span>
     <small>8 par</small>
   </button>
   ```
   Keep it between the Medel button and the `.theme-picker` div.

2. In `style.css`, add `.btn-pokemon` styles with a distinct yellow/gold color scheme:
   - Background: `#f9ca24` (golden yellow)
   - Shadow: `0 7px 0 #d4a800` (darker gold for the 3D shadow)
   - Text color: `#333` (dark text on yellow for contrast)
   - Text shadow adjusted for dark-on-light
   - Active state shadow matching the pattern

3. In `style.css`, add `.pairs-8` grid layout:
   - Portrait: `grid-template-columns: repeat(4, 1fr)` with `max-width: 680px`
   - Landscape media query: `grid-template-columns: repeat(4, 1fr)` with `max-width: 820px`
   - This produces a 4×4 grid for 16 cards (8 pairs)

4. In `style.css`, add deal animation delays for cards 13-16 (nth-child 13 through 16) following the existing pattern (0.05s increments).

5. In `game.js`, add the `startPokemonGame()` function:
   - Calls `ensureAudio()` and `playStartJingle()` and `playBgMusic()` (same as startGame)
   - Sets `totalPairs = 8`, resets game state
   - Combines ANIMALS and DINOS into a single pool, shuffles, picks 8
   - Creates paired card data (16 cards), shuffles, renders to board
   - Sets `board.className = 'pairs-8'`
   - Calls `updateStars()`, `showScreen(gameScreen)`, `revealThenShuffle()`
   - The function follows the exact same pattern as `startGame()` but always uses 8 pairs

6. Verify that the existing Lätt and Medel buttons are unchanged — they still call `startGame(4)` and `startGame(6)`.

## Must-Haves

- Pokémon button is visually distinct from Lätt/Medel (yellow/gold color, ⚡ emoji)
- startPokemonGame() picks 8 pairs from combined ANIMALS+DINOS pool
- .pairs-8 CSS renders a 4×4 responsive grid
- Full game loop works through to win screen and back
- Existing levels unaffected
  - Estimate: 30m
  - Files: index.html, game.js, style.css
  - Verify: grep -q 'startPokemonGame' game.js && grep -q 'btn-pokemon' index.html && grep -q 'pairs-8' style.css && grep -q 'btn-pokemon' style.css
