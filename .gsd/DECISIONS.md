# Decisions Register

<!-- Append-only. Never edit or remove existing rows.
     To reverse a decision, add a new row that supersedes it.
     Read this file at the start of any planning or research phase. -->

| # | When | Scope | Decision | Choice | Rationale | Revisable? | Made By |
|---|------|-------|----------|--------|-----------|------------|---------|
| D001 |  | tooling | How to generate game assets (images and audio) | Imagen 4 Fast API for image generation ($0.02/image), Web Audio synthesis for SFX, with generate-image.js utility script in tools/ | Imagen 4 Fast delivers high-quality flat illustrations at the lowest API cost. Gemini audio models are TTS-focused (speech only), not suitable for game sound effects. Web Audio synthesis is instant, zero-download, and already proven in the existing codebase. The utility script loads GEMINI_API_KEY from .env. | Yes | collaborative |
| D002 | M002 | library | Pokémon sprite source | Direct CDN URLs from PokeAPI/sprites GitHub repo | User specified the exact URL pattern. No API calls needed — just construct https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png directly. Zero-auth, fast, canonical source. | No | human |
| D003 | M002 | pattern | Pokémon selection strategy | Random selection from 1-151 per game start, not app load | User emphasized replayability — different Pokémon each round. Selection happens in startPokemonGame(), not global scope, so each new game gets a fresh random set. | No | human |
| D004 | M002 | pattern | Image loading strategy for Pokémon level | Wait for all images first, then reveal board | User chose 'Wait for all images first' option. Clean reveal once everything is ready, brief loading spinner before the board appears. Prevents partially-rendered states and broken image icons. | No | human |
| D005 | M002 | pattern | Sprite failure handling | Skip and draw a replacement from the pool | User chose 'Skip and draw a replacement' option. Game always shows 8 working pairs by validating each sprite load and retrying with new IDs until 8 valid pairs exist. Retry limit prevents infinite loops if network is completely down. | No | human |
| D006 | M002 | pattern | Pokémon button visual treatment | Stand out with unique color/icon | User chose 'Stand out — unique color/icon' option. Makes it clear this is a different kind of level, more exciting for the user's son to discover. Should still fit the overall design language. | Yes — if user feedback suggests it's too visually noisy | human |
