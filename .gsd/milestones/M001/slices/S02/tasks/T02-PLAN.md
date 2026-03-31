---
estimated_steps: 1
estimated_files: 2
skills_used: []
---

# T02: Post-reveal card shuffle animation

After the 2-second reveal, animate cards to new randomized positions before unlocking interaction. Implement by re-shuffling the card data array and re-rendering (or DOM-reordering with CSS transitions). Cards should slide smoothly to their new spots. The shuffle must actually change positions — no card stays in place.

## Inputs

- `Current revealAllBriefly() function`

## Expected Output

- `Post-reveal shuffle animation in game.js`
- `CSS transition for card position changes`

## Verification

Start a game — cards reveal, then visibly shuffle to new positions. No card stays in the same spot.
