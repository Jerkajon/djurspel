# Decisions Register

<!-- Append-only. Never edit or remove existing rows.
     To reverse a decision, add a new row that supersedes it.
     Read this file at the start of any planning or research phase. -->

| # | When | Scope | Decision | Choice | Rationale | Revisable? | Made By |
|---|------|-------|----------|--------|-----------|------------|---------|
| D001 |  | tooling | How to generate game assets (images and audio) | Imagen 4 Fast API for image generation ($0.02/image), Web Audio synthesis for SFX, with generate-image.js utility script in tools/ | Imagen 4 Fast delivers high-quality flat illustrations at the lowest API cost. Gemini audio models are TTS-focused (speech only), not suitable for game sound effects. Web Audio synthesis is instant, zero-download, and already proven in the existing codebase. The utility script loads GEMINI_API_KEY from .env. | Yes | collaborative |
