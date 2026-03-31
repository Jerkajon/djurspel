---
estimated_steps: 1
estimated_files: 2
skills_used: []
---

# T02: Theme picker UI + JS switching + persistence

1. Add theme picker UI to start screen (two tappable theme preview buttons). 2. Write JS to toggle data-theme on document body. 3. Save theme choice to localStorage. 4. Load saved theme on page load. 5. Swap card-back image src when theme changes during gameplay (if cards are on screen). 6. Preload theme background images on startup to prevent flash.

## Inputs

- `CSS theme system from T01`

## Expected Output

- `Theme picker HTML in index.html`
- `Theme switching JS in game.js`
- `localStorage persistence`

## Verification

Select jungle theme, reload page — jungle theme persists. Switch back — instant, no flash.
