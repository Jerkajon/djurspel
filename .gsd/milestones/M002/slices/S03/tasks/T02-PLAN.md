---
estimated_steps: 10
estimated_files: 2
skills_used: []
---

# T02: Browser verification of spinner, button styling, and iPad grid layout

Run a local HTTP server and verify all S03 visual polish criteria using browser automation. Confirm the spinner is present in the DOM, the Pokémon button is visually distinct, the 8-pair grid renders correctly on iPad viewport (768×1024), and the error state markup is correct.

Steps:
1. Start a Python HTTP server: `python3 -m http.server 8765` in `/Users/erikandersson/vscode/djurspel`.
2. Navigate to `http://localhost:8765` and screenshot the start screen — confirm `.btn-pokemon` is visually distinct from the two standard buttons.
3. Verify `#pokemon-loading` contains a `.pokemon-spinner` div in the DOM (use `browser_evaluate` on `document.querySelector('.pokemon-spinner') !== null`).
4. Switch to iPad viewport (768×1024 portrait) and navigate to the start screen — screenshot to confirm the Pokémon button still looks correct at tablet size.
5. Trigger the Pokémon level (click `.btn-pokemon`) and immediately check whether the loading overlay appears (it may flash by quickly on fast connections — acceptable).
6. After the board renders, screenshot to confirm the 4-column grid fills the iPad viewport without overflow.
7. Check browser console for zero JS errors.
8. Kill the server.

## Inputs

- ``style.css` — as modified by T01`
- ``index.html` — as modified by T01`

## Expected Output

- ``style.css``
- ``index.html``

## Verification

browser_assert: selector_visible '.btn-pokemon', selector_visible '#pokemon-loading .pokemon-spinner' (DOM present), no_console_errors
