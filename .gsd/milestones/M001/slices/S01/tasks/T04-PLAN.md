---
estimated_steps: 1
estimated_files: 1
skills_used: []
---

# T04: Compress all assets and verify payload budget

Convert PNGs to WebP where supported, resize to appropriate dimensions (cards ~256px, backgrounds ~1024px), optimize file sizes. Verify total asset payload stays under 1.5MB. Create an asset manifest listing all files and sizes.

## Inputs

- `All generated assets from T02, T03`

## Expected Output

- `Compressed assets in assets/`
- `Asset size report`

## Verification

Total asset size < 1.5MB, all images load correctly, no visual quality loss at display size
