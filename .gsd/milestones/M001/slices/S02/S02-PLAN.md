# S02: Theme System & Visual Variety

**Goal:** Upgrade all game interactions to use illustrated cards with layered animations. Replace emoji with image-based cards. Add post-reveal shuffle so cards move to new positions after the initial peek.
**Demo:** After this: Start screen shows theme picker. Selecting a theme instantly changes background gradient, card back design, button colors, and overall mood. At least 2 themes: default purple/blue and a warm jungle theme.

## Tasks
- [x] **T01: Replaced emoji card faces with illustrated WebP animal images.** — Replace emoji card faces with <img> tags loading WebP animal illustrations. Update card rendering in game.js to use image paths instead of emoji text. Update CSS for image-based card faces (object-fit, sizing). Verify cards display correctly at both difficulty levels.
  - Estimate: 15min
  - Files: game.js, style.css, index.html
  - Verify: Serve locally, play a round — cards show animal illustrations instead of emoji at both difficulty levels
- [x] **T02: Added post-reveal card shuffle — cards animate to new positions after the peek phase.** — After the 2-second reveal, animate cards to new randomized positions before unlocking interaction. Implement by re-shuffling the card data array and re-rendering (or DOM-reordering with CSS transitions). Cards should slide smoothly to their new spots. The shuffle must actually change positions — no card stays in place.
  - Estimate: 15min
  - Files: game.js, style.css
  - Verify: Start a game — cards reveal, then visibly shuffle to new positions. No card stays in the same spot.
- [x] **T03: Polished all animations — springy flips, bouncy matches, organic wobbles, smooth screen transitions.** — Upgrade card flip to use spring-physics easing (cubic-bezier overshoot). Add match celebration: scale pulse + green glow + subtle particle effect. Improve mismatch: satisfying wobble with color flash. Refine deal-in stagger timing. Add screen transition animations (crossfade/slide between start, game, win screens). Animate stars individually on earn.
  - Estimate: 20min
  - Files: style.css, game.js
  - Verify: Play full game — flip feels springy, matches celebrate, mismatches wobble, screens transition smoothly, stars pop on earn
- [x] **T04: Full integration verification passed — no errors, all features working.** — Serve the game locally, play through both difficulty levels. Check for animation smoothness, correct card images, shuffle behavior, and no console errors. Verify on both portrait and landscape orientations.
  - Estimate: 5min
  - Verify: Full playthrough at both difficulties, no console errors, animations smooth, shuffle works correctly
