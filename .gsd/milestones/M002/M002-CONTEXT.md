# M002: Pokémon Level with Dynamic Sprite Loading

**Gathered:** 2026-04-04
**Status:** Ready for planning

## Project Description

Add a Pokémon-themed memory level to Ebbes memoryspel. The new level appears as a third option on the start screen (alongside Lätt 4-pair and Medel 6-pair), shows 8 pairs per game, and randomly selects Pokémon from the first 151 each round. Sprites are fetched at runtime from PokéAPI's GitHub sprite repository, with loading states and failure handling to ensure a smooth experience.

## Why This Milestone

The user's son finds having all three options immediately available easier and more fun than unlock progression. Adding Pokémon brings a beloved IP into the game, increases replayability through random selection, and keeps the game fresh without requiring new static assets.

## User-Visible Outcome

### When this milestone is complete, the user can:

- See a third button "Pokémon-nivå!" on the start screen with distinct visual styling
- Click the Pokémon button to start an 8-pair memory game
- Play with different Pokémon each round (randomly selected from the first 151)
- See a loading indicator while sprites fetch
- Complete the game even if some sprites fail to load (automatic replacement)
- Return to the start screen after winning

### Entry point / environment

- Entry point: Start screen in the browser (same as existing levels)
- Environment: Browser (iPad primary, mobile/desktop responsive)
- Live dependencies involved: PokéAPI sprite CDN (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`)

## Completion Class

- Contract complete means: Pokémon button exists, routes to game screen, random selection logic works, sprite URLs are constructed correctly
- Integration complete means: Fetched sprites actually render on cards, loading waits for all images, failures are handled and replaced, win flow returns to start
- Operational complete means: Works under real network conditions (slow connections, partial failures, offline after load)

## Final Integrated Acceptance

To call this milestone complete, we must prove:

- Starting a Pokémon game on a real device fetches 8 unique sprites from PokéAPI
- The board only appears after all sprites have loaded (no broken image icons)
- Simulating a sprite failure (block one URL in dev tools) results in a replacement Pokémon, not a broken card
- Win screen flows back to start screen, clicking Pokémon again shows a different random set

## Risks and Unknowns

- **Network dependency** — PokéAPI sprite CDN could be slow, rate-limited, or down. Mitigation: skip-and-replace logic, retry limit to prevent infinite loops.
- **Image validation** — Some sprite IDs might 404 or return broken images. Mitigation: validate each image load before adding to the pool, draw replacements until 8 valid pairs exist.
- **Loading UX** — Fetching 16 images (8 pairs) could take several seconds on slow connections. Mitigation: show clear loading state, don't block other levels.

## Existing Codebase / Prior Art

- `game.js` — Contains `startGame(pairs)` logic that selects from `ANIMALS` and `DINOS` arrays, creates card data, renders board with `board.className = 'pairs-${pairs}'`
- `index.html` — Start screen with two buttons calling `onclick="startGame(4)"` and `onclick="startGame(6)"`
- `style.css` — Button styles (`.btn-start`, `.btn-green`), card layouts (`.pairs-4`, `.pairs-6`), screen transitions
- `showScreen(screen)` — Manages screen transitions with exit animations
- `winGame()` — Handles win state, shows confetti, returns to start via `showStartScreen()`
- Image preloading pattern exists for theme assets and dino dance frames — use similar pattern for Pokémon validation

> See `.gsd/DECISIONS.md` for all architectural and pattern decisions — it is an append-only register; read it during planning, append to it during execution.

## Relevant Requirements

- R001 — Third difficulty option: Pokémon level (primary-user-loop)
- R002 — Random Pokémon selection per round (core-capability)
- R003 — Runtime sprite fetching from PokéAPI (core-capability)
- R004 — Image loading state before board reveal (quality-attribute)
- R005 — Failure handling: skip and replace (failure-visibility)
- R006 — Visual distinction for Pokémon button (quality-attribute)

## Scope

### In Scope

- Pokémon button on start screen with distinct styling (color, icon, or label)
- `startPokemonGame()` function that selects 8 random Pokémon from IDs 1-151
- Sprite URL construction: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`
- Image validation: load each sprite, skip and replace on failure
- Loading indicator while fetching/validating images
- Board reveal only after all 8 pairs are loaded and validated
- Grid layout for 8 pairs (`.pairs-8` CSS class, responsive)
- Win flow identical to existing levels (confetti, stars, return to start)

### Out of Scope / Non-Goals

- Pokémon names on cards (deferred — R007)
- Custom Pokémon sounds (deferred — R008)
- Pokémon type colors or metadata (out of scope — R009)
- Offline sprite caching (out of scope — R010)
- API calls to PokéAPI endpoints (use direct sprite CDN URLs only)
- Pokémon beyond the first 151

## Technical Constraints

- Must work in modern mobile browsers (Safari iOS, Chrome Android)
- No external libraries or frameworks (vanilla JS only)
- Sprite images must render within existing card flip animation
- Loading state must not block access to Lätt/Medel levels
- No localStorage or service worker caching for sprites (keep it simple)

## Integration Points

- **PokéAPI sprite CDN** — `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png` (read-only, no auth)
- **Existing game engine** — `showScreen()`, `winGame()`, card rendering, flip animations, sound system all reused

## Open Questions

- **Loading spinner design** — Simple text ("Laddar Pokémon...") or a graphical spinner? Lean toward simple text for consistency with the rest of the minimal UI.
- **Retry limit** — How many failed sprites before giving up entirely? Propose: attempt to load up to 24 unique Pokémon (3x the needed 8 pairs) before showing an error. If fewer than 8 valid pairs after 24 attempts, show "Kunde inte ladda Pokémon — försök igen!" message and return to start screen.
- **8-pair grid layout** — Does the existing responsive grid logic handle 8 pairs cleanly, or does it need a new breakpoint? Check `.pairs-4` and `.pairs-6` CSS — likely need `.pairs-8` with 4x4 grid on landscape, 4x4 or 3x6 on portrait depending on aspect ratio.
