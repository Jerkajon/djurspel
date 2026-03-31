# S03: Sound & Atmosphere

**Goal:** Implement a theme system that swaps color palettes, backgrounds, and card back designs. Theme picker on start screen with at least 2 complete themes.
**Demo:** After this: Game has subtle background ambient loop. SFX are richer (layered tones). Mute button visible on all screens. Sound preference persists.

## Tasks
- [x] **T01: Built CSS theme system with custom properties — two complete themes with generated art assets.** — 1. Add CSS custom properties for all theme-variable colors (bg gradient, card back, button, accents). 2. Create [data-theme='default'] and [data-theme='jungle'] rulesets overriding those properties. 3. Add body background-image property that themes can swap. 4. Update card-back CSS to use a themed background-image instead of the hardcoded gradient pattern. 5. Ensure all existing color references use the new custom properties.
  - Estimate: 15min
  - Files: style.css
  - Verify: Set data-theme manually in devtools — colors, backgrounds, and card backs change per theme
- [x] **T02: Added theme picker UI, JS switching, localStorage persistence, and asset preloading.** — 1. Add theme picker UI to start screen (two tappable theme preview buttons). 2. Write JS to toggle data-theme on document body. 3. Save theme choice to localStorage. 4. Load saved theme on page load. 5. Swap card-back image src when theme changes during gameplay (if cards are on screen). 6. Preload theme background images on startup to prevent flash.
  - Estimate: 15min
  - Files: index.html, game.js
  - Verify: Select jungle theme, reload page — jungle theme persists. Switch back — instant, no flash.
- [x] **T03: Integration verification passed — both themes work correctly with persistence.** — Serve locally, test both themes × both difficulties. Verify backgrounds, card backs, button colors, star bar, win screen all respond to theme. Check localStorage. Check no console errors. Check no flash of wrong theme on reload.
  - Estimate: 5min
  - Verify: Full playthrough on each theme, localStorage check, no console errors, no flash
