# Requirements

This file is the explicit capability and coverage contract for the project.

Use it to track what is actively in scope, what has been validated by completed work, what is intentionally deferred, and what is explicitly out of scope.

Guidelines:
- Keep requirements capability-oriented, not a giant feature wishlist.
- Requirements should be atomic, testable, and stated in plain language.
- Every **Active** requirement should be mapped to a slice, deferred, blocked with reason, or moved out of scope.
- Each requirement should have one accountable primary owner and may have supporting slices.
- Research may suggest requirements, but research does not silently make them binding.
- Validation means the requirement was actually proven by completed work and verification, not just discussed.

## Active

### R001 — Third difficulty option: Pokémon level
- Class: primary-user-loop
- Status: active
- Description: Start screen shows a third button "Pokémon-nivå!" that launches an 8-pair memory game with Pokémon sprites
- Why it matters: Core feature request — adds variety and a beloved IP to keep the game interesting
- Source: user
- Primary owning slice: M002/S01
- Supporting slices: M002/S03
- Validation: mapped
- Notes: Button must be visually distinct from Lätt/Medel

### R002 — Random Pokémon selection per round
- Class: core-capability
- Status: active
- Description: Each Pokémon game randomly selects 8 pairs from a pool of the first 151 Pokémon, so repeat plays show different characters
- Why it matters: Replayability — prevents the game from feeling stale after one round
- Source: user
- Primary owning slice: M002/S02
- Supporting slices: none
- Validation: mapped
- Notes: Selection happens at game start, not at app load

### R003 — Runtime sprite fetching from PokéAPI
- Class: core-capability
- Status: active
- Description: Pokémon card images are fetched at runtime from `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`, not bundled as static assets
- Why it matters: Avoids bundling 151 images, keeps app lightweight, uses canonical source
- Source: user
- Primary owning slice: M002/S02
- Supporting slices: none
- Validation: mapped
- Notes: Network dependency — must handle offline/failure gracefully

### R004 — Image loading state before board reveal
- Class: quality-attribute
- Status: active
- Description: Game waits until all 8 pair images have loaded before revealing the board, shows a loading indicator during fetch
- Why it matters: Prevents partially-rendered board and broken image icons — cleaner UX
- Source: user
- Primary owning slice: M002/S02
- Supporting slices: M002/S03
- Validation: mapped
- Notes: Loading spinner or simple text during wait

### R005 — Failure handling: skip and replace
- Class: failure-visibility
- Status: active
- Description: When a Pokémon sprite fails to load (404, network timeout), skip that Pokémon and draw a replacement from the pool until 8 valid pairs are obtained
- Why it matters: Resilience — game works even if some sprites are missing or network is flaky
- Source: user
- Primary owning slice: M002/S02
- Supporting slices: none
- Validation: mapped
- Notes: Retry limit to prevent infinite loops if network is completely down

### R006 — Visual distinction for Pokémon button
- Class: quality-attribute
- Status: active
- Description: Pokémon button has distinct styling (unique color, icon, or label treatment) to stand out from Lätt and Medel buttons
- Why it matters: Makes it clear this is a different kind of level, more exciting for the user to discover
- Source: user
- Primary owning slice: M002/S01
- Supporting slices: M002/S03
- Validation: mapped
- Notes: Should still fit the overall design language

## Validated

(No requirements validated yet — M002 is in planning)

## Deferred

### R007 — Pokémon name display on cards
- Class: quality-attribute
- Status: deferred
- Description: Show the Pokémon's name below or on the card image
- Why it matters: Educational value, helps kids learn names
- Source: inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Not requested by user, defer until there's a signal it would be useful

### R008 — Sound effect variation for Pokémon level
- Class: quality-attribute
- Status: deferred
- Description: Different match/win sounds for Pokémon level vs animal/dino levels
- Why it matters: Thematic variety, makes Pokémon level feel more distinct
- Source: inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Current Web Audio synthesis works fine, defer unless user requests it

## Out of Scope

### R009 — Pokémon type colors or metadata
- Class: anti-feature
- Status: out-of-scope
- Description: Fetching Pokémon type data from PokéAPI and using type colors for card backgrounds or styling
- Why it matters: Adds complexity (extra API calls, type color mapping) without clear value for a 4-year-old's memory game
- Source: research
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: Type info is available in PokéAPI but not needed for matching gameplay

### R010 — Offline caching of sprites
- Class: operability
- Status: out-of-scope
- Description: Cache fetched Pokémon sprites in service worker or localStorage for offline play
- Why it matters: Would enable offline Pokémon games after first load
- Source: research
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: Existing service worker caches static assets only; dynamic sprite caching adds complexity and storage burden (151 sprites). Online-only for Pokémon level is acceptable.

## Traceability

| ID | Class | Status | Primary owner | Supporting | Proof |
|---|---|---|---|---|---|
| R001 | primary-user-loop | active | M002/S01 | M002/S03 | mapped |
| R002 | core-capability | active | M002/S02 | none | mapped |
| R003 | core-capability | active | M002/S02 | none | mapped |
| R004 | quality-attribute | active | M002/S02 | M002/S03 | mapped |
| R005 | failure-visibility | active | M002/S02 | none | mapped |
| R006 | quality-attribute | active | M002/S01 | M002/S03 | mapped |
| R007 | quality-attribute | deferred | none | none | unmapped |
| R008 | quality-attribute | deferred | none | none | unmapped |
| R009 | anti-feature | out-of-scope | none | none | n/a |
| R010 | operability | out-of-scope | none | none | n/a |

## Coverage Summary

- Active requirements: 6
- Mapped to slices: 6
- Validated: 0
- Unmapped active requirements: 0
