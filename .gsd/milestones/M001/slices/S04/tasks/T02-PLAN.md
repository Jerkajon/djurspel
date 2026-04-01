---
estimated_steps: 1
estimated_files: 3
skills_used: []
---

# T02: Mute toggle + persistence

1. Add mute toggle button (🔊/🔇) to start screen and score bar. 2. Global isMuted flag that gates all audio output. 3. Mute suspends AudioContext, unmute resumes it. 4. Save to localStorage as 'djurspel-muted'. 5. Load on page init. 6. Ensure AudioContext only created on first user gesture (iOS).

## Inputs

- `Audio engine from T01`

## Expected Output

- `Mute button HTML in index.html`
- `Mute toggle JS in game.js`
- `Mute button CSS in style.css`

## Verification

Toggle mute — all sound stops. Unmute — sound resumes. Reload — mute state persists.
