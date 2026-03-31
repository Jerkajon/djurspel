---
id: T01
parent: S02
milestone: M001
provides: []
requires: []
affects: []
key_files: ["game.js", "style.css"]
key_decisions: ["Card faces use <img> with WebP sources and object-fit:contain", "Cards have 8% padding inside face for visual breathing room", "Match comparison uses animalId string, not image path"]
patterns_established: []
drill_down_paths: []
observability_surfaces: []
duration: ""
verification_result: "Cards show illustrated animals in browser. Both difficulty levels work. Images load correctly from WebP files."
completed_at: 2026-03-31T21:03:01.127Z
blocker_discovered: false
---

# T01: Replaced emoji card faces with illustrated WebP animal images.

> Replaced emoji card faces with illustrated WebP animal images.

## What Happened
---
id: T01
parent: S02
milestone: M001
key_files:
  - game.js
  - style.css
key_decisions:
  - Card faces use <img> with WebP sources and object-fit:contain
  - Cards have 8% padding inside face for visual breathing room
  - Match comparison uses animalId string, not image path
duration: ""
verification_result: passed
completed_at: 2026-03-31T21:03:01.129Z
blocker_discovered: false
---

# T01: Replaced emoji card faces with illustrated WebP animal images.

**Replaced emoji card faces with illustrated WebP animal images.**

## What Happened

Replaced emoji card pool with structured animal objects containing id and image path. Updated card rendering to use <img> tags loading WebP illustrations. Updated CSS for image-based card faces with proper sizing and padding. Updated match logic to compare animalId instead of emoji.

## Verification

Cards show illustrated animals in browser. Both difficulty levels work. Images load correctly from WebP files.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `browser verification at localhost:8080` | 0 | ✅ pass — illustrated cards display correctly | 5000ms |


## Deviations

None.

## Known Issues

None.

## Files Created/Modified

- `game.js`
- `style.css`


## Deviations
None.

## Known Issues
None.
