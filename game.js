// ===== THEME SYSTEM =====
const THEMES = ['default', 'jungle', 'space'];
let currentTheme = 'default';

function initTheme() {
  const saved = localStorage.getItem('djurspel-theme');
  if (saved && THEMES.includes(saved)) {
    currentTheme = saved;
  }
  applyTheme(currentTheme);
}

function setTheme(theme) {
  if (!THEMES.includes(theme)) return;
  currentTheme = theme;
  localStorage.setItem('djurspel-theme', theme);
  applyTheme(theme);
}

function applyTheme(theme) {
  if (theme === 'default') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Update theme picker active state
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

// Preload theme assets to prevent flash
function preloadThemeAssets() {
  const assets = [
    'assets/themes/default/bg.webp',
    'assets/themes/default/card-back.webp',
    'assets/themes/jungle/bg.webp',
    'assets/themes/jungle/card-back.webp',
    'assets/themes/space/bg.webp',
    'assets/themes/space/card-back.webp',
  ];
  assets.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// ===== DANCING DINOS =====
const DINO_FRAMES = [
  'assets/dino-dance/frame-0.webp',
  'assets/dino-dance/frame-1.webp',
  'assets/dino-dance/frame-2.webp',
  'assets/dino-dance/frame-3.webp',
  'assets/dino-dance/frame-4.webp',
  'assets/dino-dance/frame-5.webp',
];
const BRACHIO_FRAMES = [
  'assets/brachio-dance/frame-0.webp',
  'assets/brachio-dance/frame-1.webp',
  'assets/brachio-dance/frame-2.webp',
  'assets/brachio-dance/frame-3.webp',
  'assets/brachio-dance/frame-4.webp',
  'assets/brachio-dance/frame-5.webp',
];
let dinoFrameIndex = 0;
let brachioFrameIndex = 0;
let dinoInterval = null;

function startDinoDance() {
  const dinoSprite = document.getElementById('dino-sprite');
  const brachioSprite = document.getElementById('brachio-sprite');
  // Preload all frames
  DINO_FRAMES.forEach(src => { const img = new Image(); img.src = src; });
  BRACHIO_FRAMES.forEach(src => { const img = new Image(); img.src = src; });
  
  if (dinoInterval) clearInterval(dinoInterval);
  dinoInterval = setInterval(() => {
    dinoFrameIndex = (dinoFrameIndex + 1) % DINO_FRAMES.length;
    brachioFrameIndex = (brachioFrameIndex + 1) % BRACHIO_FRAMES.length;
    if (dinoSprite) dinoSprite.src = DINO_FRAMES[dinoFrameIndex];
    if (brachioSprite) brachioSprite.src = BRACHIO_FRAMES[brachioFrameIndex];
  }, 500);
}

function stopDinoDance() {
  if (dinoInterval) {
    clearInterval(dinoInterval);
    dinoInterval = null;
  }
}

// Start dancing on load
startDinoDance();

// Initialize theme on load
initTheme();
preloadThemeAssets();

// ===== BLAZE AND THE MONSTER MACHINES POOL =====
const BLAZE_CHARS = [
  { id: 'blaze',     img: 'assets/blaze/blaze.webp' },
  { id: 'crusher',   img: 'assets/blaze/crusher.webp' },
  { id: 'pickle',    img: 'assets/blaze/pickle.webp' },
  { id: 'starla',    img: 'assets/blaze/starla.webp' },
  { id: 'zeg',       img: 'assets/blaze/zeg.webp' },
  { id: 'darington', img: 'assets/blaze/darington.webp' },
  { id: 'stripes',   img: 'assets/blaze/stripes.webp' },
  { id: 'gabby',     img: 'assets/blaze/gabby.webp' },
];

// ===== CLEO / MYSTERY LANE POOL =====
// 11 unika poser av Clever, Bro och McFlare — startCleoGame() väljer 8 random per spel.
const CLEO_CHARS = [
  { id: 'clever-1',  img: 'assets/cleo/clever-1.webp' },
  { id: 'clever-2',  img: 'assets/cleo/clever-2.webp' },
  { id: 'clever-3',  img: 'assets/cleo/clever-3.webp' },
  { id: 'clever-4',  img: 'assets/cleo/clever-4.webp' },
  { id: 'bro-1',     img: 'assets/cleo/bro-1.webp' },
  { id: 'bro-2',     img: 'assets/cleo/bro-2.webp' },
  { id: 'bro-3',     img: 'assets/cleo/bro-3.webp' },
  { id: 'mcflare-1', img: 'assets/cleo/mcflare-1.webp' },
  { id: 'mcflare-2', img: 'assets/cleo/mcflare-2.webp' },
  { id: 'mcflare-3', img: 'assets/cleo/mcflare-3.webp' },
  { id: 'mcflare-4', img: 'assets/cleo/mcflare-4.webp' },
];

// ===== ANIMAL & DINOSAUR ILLUSTRATION POOL =====
const ANIMALS = [
  { id: 'cat', img: 'assets/animals/cat.webp' },
  { id: 'dog', img: 'assets/animals/dog.webp' },
  { id: 'rabbit', img: 'assets/animals/rabbit.webp' },
  { id: 'bear', img: 'assets/animals/bear.webp' },
  { id: 'fox', img: 'assets/animals/fox.webp' },
  { id: 'panda', img: 'assets/animals/panda.webp' },
  { id: 'frog', img: 'assets/animals/frog.webp' },
  { id: 'koala', img: 'assets/animals/koala.webp' },
  { id: 'lion', img: 'assets/animals/lion.webp' },
  { id: 'pig', img: 'assets/animals/pig.webp' },
];
const DINOS = [
  { id: 'brontosaurus', img: 'assets/animals/brontosaurus.webp' },
  { id: 'trex', img: 'assets/animals/trex.webp' },
  { id: 'crocodile', img: 'assets/animals/crocodile.webp' },
  { id: 'lizard', img: 'assets/animals/lizard.webp' },
  { id: 'turtle', img: 'assets/animals/turtle.webp' },
  { id: 'dragon', img: 'assets/animals/dragon.webp' },
];

// ===== STATE =====
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 0;
let isLocked = false;

// ===== DOM =====
const board = document.getElementById('board');
const starsEl = document.getElementById('stars');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const winScreen = document.getElementById('win-screen');
const winStars = document.getElementById('win-stars');
const confettiCanvas = document.getElementById('confetti-canvas');

// ===== AUDIO ENGINE =====
let audioCtx = null;
let isMuted = false;

function initMute() {
  const saved = localStorage.getItem('djurspel-muted');
  isMuted = saved === 'true';
  updateMuteButtons();
}

function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem('djurspel-muted', isMuted);
  if (isMuted && audioCtx) {
    audioCtx.suspend();
  } else if (!isMuted && audioCtx) {
    audioCtx.resume();
  }
  // Sync background music with mute state
  if (isMuted && bgMusic) {
    bgMusic.pause();
  } else if (!isMuted && bgMusic && gameScreen.classList.contains('active')) {
    bgMusic.play().catch(() => {});
  }
  updateMuteButtons();
}

function updateMuteButtons() {
  document.querySelectorAll('.mute-btn').forEach(btn => {
    btn.textContent = isMuted ? '🔇' : '🔊';
  });
}

function ensureAudio() {
  if (isMuted) return;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playTone(freq, duration, type = 'sine', vol = 0.3) {
  if (!audioCtx || isMuted) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + duration);
}

// --- No ambient pad — just a start jingle ---
function startAmbient() {
  // Replaced by playStartJingle — no looping background sound
}

function stopAmbient() {
  // No-op — nothing to stop
}

// ===== BACKGROUND MUSIC =====
let bgMusic = null;

function initBgMusic() {
  if (bgMusic) return;
  bgMusic = new Audio('assets/music/bgm.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.3;
  bgMusic.preload = 'auto';
}

function playBgMusic() {
  if (isMuted) return;
  initBgMusic();
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
}

function stopBgMusic() {
  if (bgMusic && !bgMusic.paused) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }
}

function playStartJingle() {
  if (!audioCtx || isMuted) return;
  // Cheerful ascending 5-note jingle: C-E-G-C'-E' over ~600ms
  const jingle = [
    [523, 0.12, 0],     // C5
    [659, 0.12, 100],   // E5
    [784, 0.12, 200],   // G5
    [1047, 0.15, 310],  // C6
    [1319, 0.25, 430],  // E6
  ];
  jingle.forEach(([freq, dur, delay]) => {
    setTimeout(() => playTone(freq, dur, 'sine', 0.18), delay);
  });
  // Soft shimmer finish
  setTimeout(() => {
    playTone(2093, 0.4, 'sine', 0.05);
    playTone(2637, 0.5, 'sine', 0.03);
  }, 550);
}

// --- SFX ---
function playFlipSound() {
  if (!audioCtx || isMuted) return;
  // Layered pop: click transient + rising tone
  playTone(1200, 0.03, 'square', 0.08);  // click
  playTone(600, 0.08, 'sine', 0.18);
  setTimeout(() => playTone(900, 0.06, 'sine', 0.12), 30);
}

function playMatchSound() {
  if (!audioCtx || isMuted) return;
  // Happy ascending chime with shimmer
  playTone(523, 0.15, 'sine', 0.22);   // C5
  setTimeout(() => playTone(659, 0.15, 'sine', 0.22), 100);  // E5
  setTimeout(() => playTone(784, 0.25, 'sine', 0.25), 200);  // G5
  // Shimmer overtones
  setTimeout(() => {
    playTone(1568, 0.4, 'sine', 0.06);  // G6
    playTone(2093, 0.5, 'sine', 0.04);  // C7
  }, 300);
}

function playMismatchSound() {
  if (!audioCtx || isMuted) return;
  // Gentle detuned boop — not scary
  playTone(280, 0.15, 'triangle', 0.12);
  playTone(277, 0.15, 'triangle', 0.08); // slight detune
  setTimeout(() => playTone(220, 0.2, 'triangle', 0.10), 120);
}

function playWinSound() {
  if (!audioCtx || isMuted) return;
  // Extended fanfare with sparkle tail
  const notes = [
    [523, 0.18, 0], [587, 0.18, 120], [659, 0.18, 240],
    [784, 0.18, 360], [1047, 0.4, 480],
  ];
  notes.forEach(([freq, dur, delay]) => {
    setTimeout(() => playTone(freq, dur, 'sine', 0.22), delay);
  });
  // Sparkle tail
  setTimeout(() => {
    playTone(1568, 0.4, 'sine', 0.08);
    playTone(2093, 0.5, 'sine', 0.06);
    playTone(2637, 0.6, 'sine', 0.04);
  }, 600);
  // Final shimmer
  setTimeout(() => {
    playTone(3136, 0.8, 'sine', 0.03);
    playTone(2093, 0.6, 'sine', 0.04);
  }, 900);
}

// playStartSound replaced by playStartJingle above

function playShuffleSound() {
  if (!audioCtx || isMuted) return;
  // Whooshy cascading pops
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      playTone(500 - i * 35, 0.05, 'sine', 0.10);
      if (i % 2 === 0) playTone(800 - i * 50, 0.03, 'square', 0.03); // click texture
    }, i * 45);
  }
}

// Initialize mute state
initMute();

// ===== SCREENS =====
function showScreen(screen) {
  const prev = document.querySelector('.screen.active');
  if (prev && prev !== screen) {
    prev.classList.add('screen-exit');
    prev.classList.remove('active');
    setTimeout(() => prev.classList.remove('screen-exit'), 400);
  }
  screen.classList.add('active');
}

function showStartScreen() {
  stopAmbient();
  stopBgMusic();
  showScreen(startScreen);
}

// ===== GAME SETUP =====
function startGame(pairs) {
  ensureAudio();
  playStartJingle();
  playBgMusic();

  totalPairs = pairs;
  matchedPairs = 0;
  flippedCards = [];
  isLocked = false;

  // Pick random animals — always include at least 1 dino and 1 animal
  const shuffledAnimals = [...ANIMALS].sort(() => Math.random() - 0.5);
  const shuffledDinos = [...DINOS].sort(() => Math.random() - 0.5);

  const dinoCount = Math.max(1, Math.floor(Math.random() * Math.min(3, pairs)));
  const animalCount = pairs - dinoCount;
  const selected = [
    ...shuffledDinos.slice(0, dinoCount),
    ...shuffledAnimals.slice(0, animalCount),
  ];

  // Create pairs and shuffle
  const cardData = [...selected, ...selected]
    .sort(() => Math.random() - 0.5)
    .map((animal, i) => ({ id: i, animalId: animal.id, img: animal.img, flipped: false, matched: false }));

  cards = cardData;

  // Render
  board.innerHTML = '';
  board.className = `pairs-${pairs}`;

  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.id = card.id;
    el.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back"></div>
        <div class="card-face card-front">
          <img src="${card.img}" alt="${card.animalId}" draggable="false" />
        </div>
      </div>
    `;
    el.addEventListener('click', () => flipCard(card.id));
    el.addEventListener('touchend', (e) => {
      e.preventDefault();
      flipCard(card.id);
    });
    board.appendChild(el);
  });

  updateStars();
  showScreen(gameScreen);

  // Brief reveal → shuffle → unlock
  revealThenShuffle();
}

// ===== POKÉMON LEVEL =====

/** Build a shuffled pool of all IDs 1–151 */
function buildPokemonPool() {
  const pool = Array.from({ length: 151 }, (_, i) => i + 1);
  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

/** Return the CDN sprite URL for a given Pokémon ID */
function pokemonSpriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

/**
 * Preload 8 unique Pokémon sprites with failure resilience.
 * On load failure, replaces the failed ID with the next unused ID from the pool.
 * Caps total attempts at MAX_ATTEMPTS to handle full network outages.
 * Returns a Promise that resolves to an array of { id, url } objects (length 8),
 * or rejects with an Error if the cap is reached.
 */
function loadPokemonSprites() {
  const NEEDED = 8;
  const MAX_ATTEMPTS = 25;
  const pool = buildPokemonPool(); // shuffled 1–151

  return new Promise((resolve, reject) => {
    const loaded = [];     // { id, url } confirmed loaded
    let attempts = 0;
    let poolIndex = 0;

    function tryNext() {
      if (loaded.length >= NEEDED) {
        resolve(loaded);
        return;
      }
      if (attempts >= MAX_ATTEMPTS) {
        reject(new Error(`Kunde inte ladda ${NEEDED} Pokémon-sprites efter ${MAX_ATTEMPTS} försök.`));
        return;
      }
      if (poolIndex >= pool.length) {
        // Exhausted pool (shouldn't happen for 151 IDs, but guard anyway)
        reject(new Error('Pokémon-poolen är slut — försök igen.'));
        return;
      }

      const id = pool[poolIndex++];
      attempts++;
      const url = pokemonSpriteUrl(id);
      const img = new Image();

      img.onload = () => {
        loaded.push({ id, url });
        tryNext();
      };

      img.onerror = () => {
        console.warn(`[Pokémon] Sprite ${id} misslyckades (försök ${attempts}/${MAX_ATTEMPTS}), provar nästa…`);
        tryNext();
      };

      img.src = url;
    }

    // Kick off 8 parallel loading attempts (one per needed sprite)
    for (let i = 0; i < NEEDED && i < pool.length; i++) {
      const id = pool[poolIndex++];
      attempts++;
      const url = pokemonSpriteUrl(id);
      const img = new Image();

      img.onload = () => {
        loaded.push({ id, url });
        if (loaded.length >= NEEDED) {
          resolve(loaded);
        }
      };

      img.onerror = () => {
        console.warn(`[Pokémon] Sprite ${id} misslyckades (försök ${attempts}/${MAX_ATTEMPTS}), provar nästa…`);
        tryNext();
      };

      img.src = url;
    }
  });
}

async function startPokemonGame() {
  ensureAudio();
  playStartJingle();
  playBgMusic();

  totalPairs = 8;
  matchedPairs = 0;
  flippedCards = [];
  isLocked = true; // locked until board is ready

  // Show game screen immediately with loading overlay visible
  board.innerHTML = '';
  board.className = 'pairs-8';
  updateStars();
  showScreen(gameScreen);

  const loadingEl = document.getElementById('pokemon-loading');
  if (loadingEl) loadingEl.style.display = 'flex';

  let pokemonSprites;
  try {
    pokemonSprites = await loadPokemonSprites();
  } catch (err) {
    console.error('[Pokémon] Sprite-laddning misslyckades:', err);
    if (loadingEl) {
      loadingEl.innerHTML = '<p>❌ Kunde inte ladda Pokémon-bilder.<br>Kontrollera nätverket och försök igen.</p>';
    }
    return; // leave game screen visible with the error message
  }

  // Hide loading overlay
  if (loadingEl) loadingEl.style.display = 'none';

  // Build card data — each Pokémon ID appears exactly twice (one pair)
  const cardData = [...pokemonSprites, ...pokemonSprites]
    .sort(() => Math.random() - 0.5)
    .map((pokemon, i) => ({
      id: i,
      animalId: pokemon.id, // numeric Pokémon ID — used by matchFound()
      img: pokemon.url,
      flipped: false,
      matched: false,
    }));

  cards = cardData;

  // Render board
  board.innerHTML = '';
  board.className = 'pairs-8';

  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.id = card.id;
    el.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back"></div>
        <div class="card-face card-front">
          <img src="${card.img}" alt="Pokémon ${card.animalId}" draggable="false" />
        </div>
      </div>
    `;
    el.addEventListener('click', () => flipCard(card.id));
    el.addEventListener('touchend', (e) => {
      e.preventDefault();
      flipCard(card.id);
    });
    board.appendChild(el);
  });

  updateStars();

  // Brief reveal → shuffle → unlock
  revealThenShuffle();
}

// ===== BLAZE LEVEL =====
function startBlazeGame() {
  ensureAudio();
  playStartJingle();
  playBgMusic();

  totalPairs = 8;
  matchedPairs = 0;
  flippedCards = [];
  isLocked = false;

  const cardData = [...BLAZE_CHARS, ...BLAZE_CHARS]
    .sort(() => Math.random() - 0.5)
    .map((char, i) => ({ id: i, animalId: char.id, img: char.img, flipped: false, matched: false }));

  cards = cardData;

  board.innerHTML = '';
  board.className = 'pairs-8';

  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.id = card.id;
    el.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back"></div>
        <div class="card-face card-front">
          <img src="${card.img}" alt="${card.animalId}" draggable="false" />
        </div>
      </div>
    `;
    el.addEventListener('click', () => flipCard(card.id));
    el.addEventListener('touchend', (e) => {
      e.preventDefault();
      flipCard(card.id);
    });
    board.appendChild(el);
  });

  updateStars();
  showScreen(gameScreen);
  revealThenShuffle();
}

// ===== CLEO / MYSTERY LANE LEVEL =====
function startCleoGame() {
  ensureAudio();
  playStartJingle();
  playBgMusic();

  totalPairs = 8;
  matchedPairs = 0;
  flippedCards = [];
  isLocked = false;

  // Slumpa 8 av poolens 11 bilder så varje spelomgång får olika urval
  const selected = [...CLEO_CHARS].sort(() => Math.random() - 0.5).slice(0, 8);

  const cardData = [...selected, ...selected]
    .sort(() => Math.random() - 0.5)
    .map((char, i) => ({ id: i, animalId: char.id, img: char.img, flipped: false, matched: false }));

  cards = cardData;

  board.innerHTML = '';
  board.className = 'pairs-8';

  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.id = card.id;
    el.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back"></div>
        <div class="card-face card-front">
          <img src="${card.img}" alt="${card.animalId}" draggable="false" />
        </div>
      </div>
    `;
    el.addEventListener('click', () => flipCard(card.id));
    el.addEventListener('touchend', (e) => {
      e.preventDefault();
      flipCard(card.id);
    });
    board.appendChild(el);
  });

  updateStars();
  showScreen(gameScreen);
  revealThenShuffle();
}

// ===== REVEAL THEN SHUFFLE =====
function revealThenShuffle() {
  isLocked = true;
  const allCardEls = [...board.querySelectorAll('.card')];

  // Phase 1: Deal in, then flip to reveal (600ms after deal)
  setTimeout(() => {
    allCardEls.forEach(el => el.classList.add('flipped'));
  }, 600);

  // Phase 2: Flip back (at 2800ms)
  setTimeout(() => {
    allCardEls.forEach(el => el.classList.remove('flipped'));
  }, 2800);

  // Phase 3: Shuffle positions (at 3400ms — after flip-back animation completes)
  setTimeout(() => {
    shuffleCardPositions();
  }, 3400);
}

function shuffleCardPositions() {
  const cardEls = [...board.querySelectorAll('.card')];
  const count = cardEls.length;

  // Record current bounding rects
  const firstRects = cardEls.map(el => el.getBoundingClientRect());

  // Fisher-Yates shuffle of DOM order — guarantee no card stays in same slot
  const indices = cardEls.map((_, i) => i);
  let shuffled;
  do {
    shuffled = [...indices].sort(() => Math.random() - 0.5);
  } while (shuffled.some((val, i) => val === i) && count > 1);

  // Reorder DOM
  const parent = board;
  const fragment = document.createDocumentFragment();
  shuffled.forEach(i => fragment.appendChild(cardEls[i]));
  parent.appendChild(fragment);

  // FLIP animation: record new rects, apply inverse transform, animate to 0
  const reorderedEls = [...board.querySelectorAll('.card')];
  reorderedEls.forEach((el, newIndex) => {
    const oldIndex = shuffled.indexOf(
      parseInt(
        [...cardEls].indexOf(el).toString()
      )
    );
    // Find this element's original position
    const origIdx = cardEls.indexOf(el);
    const firstRect = firstRects[origIdx];
    const lastRect = el.getBoundingClientRect();

    const dx = firstRect.left - lastRect.left;
    const dy = firstRect.top - lastRect.top;

    if (dx === 0 && dy === 0) return;

    el.style.transform = `translate(${dx}px, ${dy}px)`;
    el.style.transition = 'none';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.transform = 'translate(0, 0)';

        el.addEventListener('transitionend', function handler() {
          el.style.transform = '';
          el.style.transition = '';
          el.removeEventListener('transitionend', handler);
        });
      });
    });
  });

  playShuffleSound();

  // Unlock after shuffle animation
  setTimeout(() => {
    isLocked = false;
  }, 600);
}

// ===== GAME LOGIC =====
function flipCard(id) {
  if (isLocked) return;

  const card = cards[id];
  if (card.flipped || card.matched) return;

  card.flipped = true;
  const el = board.querySelector(`[data-id="${id}"]`);
  el.classList.add('flipped');
  playFlipSound();

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    isLocked = true;
    const [a, b] = flippedCards;

    if (a.animalId === b.animalId) {
      matchFound(a, b);
    } else {
      mismatch(a, b);
    }
  }
}

function matchFound(a, b) {
  a.matched = true;
  b.matched = true;
  matchedPairs++;

  const elA = board.querySelector(`[data-id="${a.id}"]`);
  const elB = board.querySelector(`[data-id="${b.id}"]`);

  setTimeout(() => {
    elA.classList.add('matched');
    elB.classList.add('matched');
    playMatchSound();
    updateStars();

    if (navigator.vibrate) navigator.vibrate(100);

    flippedCards = [];
    isLocked = false;

    if (matchedPairs === totalPairs) {
      setTimeout(() => winGame(), 700);
    }
  }, 400);
}

function mismatch(a, b) {
  const elA = board.querySelector(`[data-id="${a.id}"]`);
  const elB = board.querySelector(`[data-id="${b.id}"]`);

  setTimeout(() => {
    elA.classList.add('wrong');
    elB.classList.add('wrong');
    playMismatchSound();
  }, 400);

  setTimeout(() => {
    a.flipped = false;
    b.flipped = false;
    elA.classList.remove('flipped', 'wrong');
    elB.classList.remove('flipped', 'wrong');
    flippedCards = [];
    isLocked = false;
  }, 1400);
}

// ===== STARS =====
function updateStars() {
  let html = '';
  for (let i = 0; i < totalPairs; i++) {
    const earned = i < matchedPairs ? 'earned' : '';
    html += `<span class="star ${earned}">⭐</span>`;
  }
  starsEl.innerHTML = html;
}

// ===== WIN =====
function winGame() {
  let html = '';
  for (let i = 0; i < totalPairs; i++) {
    html += '⭐';
  }
  winStars.textContent = html;

  showScreen(winScreen);
  stopAmbient();
  stopBgMusic();
  playWinSound();
  launchConfetti();
}

// ===== CONFETTI =====
function launchConfetti() {
  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#ff6b6b', '#f9ca24', '#2ecc71', '#74b9ff', '#a29bfe', '#fd79a8', '#00cec9', '#f0932b'];
  const shapes = ['circle', 'rect', 'star'];

  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * confettiCanvas.width,
      y: -20 - Math.random() * 400,
      r: 5 + Math.random() * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      vx: (Math.random() - 0.5) * 5,
      vy: 2 + Math.random() * 5,
      spin: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.25,
      opacity: 1,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.03 + Math.random() * 0.05,
    });
  }

  let frame = 0;
  const maxFrames = 240;

  function animate() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    pieces.forEach(p => {
      p.wobble += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobble) * 1.5;
      p.y += p.vy;
      p.vy += 0.04;
      p.spin += p.spinSpeed;
      if (frame > maxFrames - 80) {
        p.opacity = Math.max(0, p.opacity - 0.015);
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.r, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'rect') {
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
      } else {
        drawStar(ctx, 0, 0, p.r, 5);
      }
      ctx.restore();
    });

    frame++;
    if (frame < maxFrames) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  animate();
}

function drawStar(ctx, cx, cy, r, points) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.4;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

// ===== SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // SW registration failed — still works fine without it
    });
  });
}
