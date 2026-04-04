---
estimated_steps: 15
estimated_files: 2
skills_used: []
---

# T02: Browser-verify Pokémon sprites load from CDN and board renders correctly

Launch the app in the browser and verify the full Pokémon game flow end-to-end with real network requests.

1. Start a local HTTP server for the project directory.
2. Navigate to the app and click the ⚡ Pokémon-nivå! button.
3. Verify the loading indicator appears (text_visible check for loading message).
4. Wait for the board to render with 16 cards.
5. Verify card images have `src` attributes pointing to `raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/` URLs.
6. Verify 8 unique Pokémon IDs across the 16 cards (each ID appears exactly twice = pairs).
7. Verify the score bar shows 8 stars.
8. Navigate back and start a second game — verify at least one different Pokémon ID appears (randomization check).
9. Check browser console for no errors (warnings for retried sprites are acceptable).
10. Verify existing Lätt/Medel buttons still work (click Lätt, confirm 8 cards with animal images).

**Key constraints:**
- This task is verification only — no code changes.
- If any check fails, document the failure clearly so it can be fixed.
- Use browser tools (browser_navigate, browser_click, browser_evaluate, browser_assert) for all verification.

## Inputs

- ``game.js` — rewritten startPokemonGame() from T01`
- ``index.html` — with #pokemon-loading overlay from T01`
- ``style.css` — with loading indicator styles from T01`

## Expected Output

- ``game.js` — verified working (no changes expected)`
- ``index.html` — verified working (no changes expected)`

## Verification

Browser assertions: 16 .card elements visible, img src contains 'raw.githubusercontent.com/PokeAPI/sprites', 8 stars in score bar, no JS errors in console
