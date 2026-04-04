# M002: Pokémon Level with Dynamic Sprite Loading

## Vision
Add a Pokémon-themed memory level with 8 pairs, fetching sprites at runtime from PokéAPI. Random selection from the first 151 Pokémon each round, with loading states and resilient failure handling.

## Slice Overview
| ID | Slice | Risk | Depends | Done | After this |
|----|-------|------|---------|------|------------|
| S01 | Pokémon button and routing | low | — | ✅ | Clicking Pokémon-nivå! on start screen launches a Pokémon game with 8 pairs (placeholder animal/dino images for now, real sprites in S02) |
| S02 | Dynamic sprite loading with resilience | medium | S01 | ✅ | Pokémon level shows real sprites fetched from PokéAPI, randomly selected from first 151, handles failures gracefully, waits for all images before revealing board |
| S03 | Visual polish and integration | low | S02 | ✅ | Pokémon button has distinct styling (unique color/icon), loading spinner shows during sprite fetch, 8-pair grid layout responsive on iPad, error message if fetch fails entirely |
