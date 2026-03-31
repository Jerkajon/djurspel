---
estimated_steps: 1
estimated_files: 1
skills_used: []
---

# T01: CSS theme system with custom properties

1. Add CSS custom properties for all theme-variable colors (bg gradient, card back, button, accents). 2. Create [data-theme='default'] and [data-theme='jungle'] rulesets overriding those properties. 3. Add body background-image property that themes can swap. 4. Update card-back CSS to use a themed background-image instead of the hardcoded gradient pattern. 5. Ensure all existing color references use the new custom properties.

## Inputs

- `assets/themes/default/`
- `assets/themes/jungle/`

## Expected Output

- `style.css with theme CSS custom properties`
- `Two complete theme rulesets`

## Verification

Set data-theme manually in devtools — colors, backgrounds, and card backs change per theme
