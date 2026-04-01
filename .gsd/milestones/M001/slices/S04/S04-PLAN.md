# S04: Final Integration & PWA Update

**Goal:** Add ambient background sound, improve existing SFX with richer synthesis, and add a mute toggle that persists.
**Demo:** After this: Full playthrough with themes and sound — everything works together. PWA installs cleanly with updated cache.

## Tasks
- [x] **T01: Added looping ambient pad and enriched all SFX with layered harmonics and transients.** — 1. Add a gentle looping ambient pad using Web Audio oscillators (soft major chord with slow filter sweep, low volume). 2. Start ambient when game begins, fade out on win/return to start. 3. Enrich existing SFX: flip gets a layered pop with click transient, match gets shimmer overtones and longer tail, mismatch stays gentle but gets subtle detuned character, win fanfare gets extended sparkle tail. 4. Enhance shuffle sound with whoosh-like filtered noise burst.
  - Estimate: 15min
  - Files: game.js
  - Verify: Play game — ambient pad audible during gameplay, all SFX sound richer
- [x] **T02: Mute toggle on start screen and score bar with localStorage persistence.** — 1. Add mute toggle button (🔊/🔇) to start screen and score bar. 2. Global isMuted flag that gates all audio output. 3. Mute suspends AudioContext, unmute resumes it. 4. Save to localStorage as 'djurspel-muted'. 5. Load on page init. 6. Ensure AudioContext only created on first user gesture (iOS).
  - Estimate: 10min
  - Files: index.html, game.js, style.css
  - Verify: Toggle mute — all sound stops. Unmute — sound resumes. Reload — mute state persists.
- [x] **T03: Integration verification passed — sound, mute, and persistence all working.** — Serve locally, verify: ambient plays during game, stops on win/back, SFX fire correctly, mute toggle works, mute persists across reload, no console errors. Test both themes.
  - Estimate: 5min
  - Verify: Full playthrough with sound on and off, both themes, no errors
