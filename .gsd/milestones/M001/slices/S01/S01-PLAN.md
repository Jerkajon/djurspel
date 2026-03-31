# S01: Animation & Interaction Juice

**Goal:** Generate a complete set of illustrated animal cards, theme backgrounds, and card back designs using Imagen 4. Compress and organize assets. Establish the art style and prompt patterns.
**Demo:** After this: Cards flip with springy overshoot, matches pulse and glow, mismatches wobble, screen transitions slide smoothly, deal animation staggers naturally

## Tasks
- [x] **T01: Established asset directory structure and locked in a consistent kawaii art style prompt template.** — Create assets/ directory structure (animals/, themes/default/, themes/jungle/). Generate 2-3 test animals to find the right prompt formula for consistent style. Compare results and lock in the prompt template.
  - Estimate: 10min
  - Files: assets/animals/, tools/generate-image.js
  - Verify: Visual inspection of test images for style consistency
- [x] **T02: Generated all 16 kawaii animal illustrations with consistent art style.** — Using the locked prompt template, generate all 16 animal illustrations: cat, dog, rabbit, bear, fox, panda, frog, koala, lion, pig + dinosaurs: brontosaurus, t-rex, crocodile, lizard, turtle, dragon. Regenerate any that don't match the style.
  - Estimate: 15min
  - Files: assets/animals/
  - Verify: All 16 images present, visually consistent style, correct animals
- [x] **T03: Generated card back and background images for default and jungle themes.** — Generate card back designs: 1 default (purple/playful pattern), 1 jungle (leaf/vine pattern). Generate background images: 1 default gradient/abstract, 1 jungle scene. All at appropriate aspect ratios.
  - Estimate: 10min
  - Files: assets/themes/default/, assets/themes/jungle/
  - Verify: Visual inspection — each theme has distinct card back and background
- [x] **T04: Compressed all 20 assets to WebP — total 232KB, 98% reduction from raw PNGs.** — Convert PNGs to WebP where supported, resize to appropriate dimensions (cards ~256px, backgrounds ~1024px), optimize file sizes. Verify total asset payload stays under 1.5MB. Create an asset manifest listing all files and sizes.
  - Estimate: 10min
  - Files: assets/
  - Verify: Total asset size < 1.5MB, all images load correctly, no visual quality loss at display size
