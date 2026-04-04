# Knowledge Base

<!-- Append-only. Add entries that save future agents from repeating investigation or hitting known issues. -->

## M002 / S01 — Pokémon button and routing

### Combined ANIMALS+DINOS pool is exactly 16 items (10+6), no ratio logic needed
When building `startPokemonGame()`, combining all ANIMALS and all DINOS gives exactly 16 items — precisely 2× the 8 pairs needed. No need to enforce a dino/animal split ratio or worry about pool exhaustion. Just shuffle all 16 and take the first 8.

### `.pairs-8` portrait CSS rule placed after landscape @media block — cascade still correct
The `.pairs-8` portrait rule lives after the `@media (orientation: landscape)` block in `style.css`. This is intentional: the landscape rule is inside the media query and doesn't conflict. Portrait applies at the document level. No specificity issue.

### `board.className = 'pairs-8'` — must replace `board.className`, not add to it
The board element's className is set wholesale (not via `classList.add`) in both `startGame()` and `startPokemonGame()`. This clears any previous grid class. If you add a new game mode, always assign `board.className` directly to the target class, not accumulate classes.

### Deal animation delays only go up to card 13 in existing levels (max 6 pairs = 12 cards)
The existing nth-child animation delays only covered 1–12 before S01. Cards 13–16 (the extra 4 for 8-pair mode) were added as part of this slice at 0.6s–0.75s. If a future level needs more than 16 cards, extend the delay list to cover the new count.

## M002 / S02 — Dynamic sprite loading with resilience

### `.btn-pokemon` is the reliable selector for the Pokémon mode button — not `.btn.btn-start`
`.btn.btn-start` matches all three mode buttons (Lätt, Medel, Pokémon). Use `.btn-pokemon` for precise Pokémon button targeting in browser automation or DOM queries.

### `data-id` on `.card` stores shuffle position index (0–15), NOT the Pokémon ID
Card elements have `data-id` set to their position in the shuffled deck (0–15). Pokémon identity lives in the JavaScript `cards[]` array as `animalId` (numeric). To check which Pokémon is on a card, query `cards[i].animalId` in JS, not the DOM attribute.

### `position:relative` required on `.screen` to contain the `#pokemon-loading` absolute overlay
The `#pokemon-loading` overlay uses `position:absolute` to cover the game screen. Without `position:relative` on `.screen`, the overlay escapes to the nearest positioned ancestor (likely viewport). This was added to `.screen` in `style.css` during S02.

### `animalId` must store a primitive value for `matchFound()` strict equality to work
`matchFound()` compares `a.animalId === b.animalId` with strict equality. For Pokémon cards, `animalId` is set to the numeric Pokémon ID (e.g., `42`). If you ever use an object or array, pairs will never match. Keep `animalId` as a primitive string or number.
