// ===== ANIMAL & DINOSAUR EMOJI POOL =====
const ANIMALS = ['🐱', '🐶', '🐰', '🐻', '🦊', '🐼', '🐸', '🐨', '🦁', '🐷'];
const DINOS = ['🦕', '🦖', '🐊', '🦎', '🐢', '🐉'];
const ALL_EMOJI = [...ANIMALS, ...DINOS];

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

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playTone(freq, duration, type = 'sine', vol = 0.3) {
  if (!audioCtx) return;
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

function playFlipSound() {
  if (!audioCtx) return;
  // Quick bright "pop" — rising tone
  playTone(600, 0.08, 'sine', 0.2);
  setTimeout(() => playTone(900, 0.06, 'sine', 0.15), 30);
}

function playMatchSound() {
  if (!audioCtx) return;
  // Happy ascending chime — three rising notes
  playTone(523, 0.15, 'sine', 0.25);  // C5
  setTimeout(() => playTone(659, 0.15, 'sine', 0.25), 100);  // E5
  setTimeout(() => playTone(784, 0.25, 'sine', 0.3), 200);   // G5
}

function playMismatchSound() {
  if (!audioCtx) return;
  // Gentle low "boop boop" — not scary
  playTone(280, 0.15, 'triangle', 0.15);
  setTimeout(() => playTone(220, 0.2, 'triangle', 0.12), 120);
}

function playWinSound() {
  if (!audioCtx) return;
  // Triumphant fanfare — ascending major arpeggio with sparkle
  const notes = [
    [523, 0.18, 0],     // C5
    [587, 0.18, 120],   // D5
    [659, 0.18, 240],   // E5
    [784, 0.18, 360],   // G5
    [1047, 0.35, 480],  // C6
  ];
  notes.forEach(([freq, dur, delay]) => {
    setTimeout(() => playTone(freq, dur, 'sine', 0.25), delay);
  });
  // Sparkle overtones
  setTimeout(() => {
    playTone(1568, 0.3, 'sine', 0.1);
    playTone(2093, 0.4, 'sine', 0.08);
  }, 600);
}

function playStartSound() {
  if (!audioCtx) return;
  // Quick cheerful "let's go" — two bright pops
  playTone(440, 0.1, 'sine', 0.2);
  setTimeout(() => playTone(660, 0.12, 'sine', 0.25), 80);
}

// ===== SCREENS =====
function showScreen(screen) {
  [startScreen, gameScreen, winScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

function showStartScreen() {
  showScreen(startScreen);
}

// ===== GAME SETUP =====
function startGame(pairs) {
  ensureAudio();
  playStartSound();

  totalPairs = pairs;
  matchedPairs = 0;
  flippedCards = [];
  isLocked = false;

  // Pick random emoji — always include at least 1 dino and 1 animal
  const shuffledAnimals = [...ANIMALS].sort(() => Math.random() - 0.5);
  const shuffledDinos = [...DINOS].sort(() => Math.random() - 0.5);

  let selected = [];
  // Guarantee mix: at least 1 dino, rest animals (or vice versa)
  const dinoCount = Math.max(1, Math.floor(Math.random() * Math.min(3, pairs)));
  const animalCount = pairs - dinoCount;
  selected = [
    ...shuffledDinos.slice(0, dinoCount),
    ...shuffledAnimals.slice(0, animalCount),
  ];

  // Create pairs and shuffle
  const cardData = [...selected, ...selected]
    .sort(() => Math.random() - 0.5)
    .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));

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
        <div class="card-face card-front">${card.emoji}</div>
      </div>
    `;
    el.addEventListener('click', () => flipCard(card.id));
    // Prevent double-tap zoom on iPad
    el.addEventListener('touchend', (e) => {
      e.preventDefault();
      flipCard(card.id);
    });
    board.appendChild(el);
  });

  // Stars
  updateStars();
  showScreen(gameScreen);

  // Brief flash reveal for toddlers — show all cards for 2s then hide
  revealAllBriefly();
}

function revealAllBriefly() {
  isLocked = true;
  const allCardEls = board.querySelectorAll('.card');

  // Stagger the reveal with the deal animation
  setTimeout(() => {
    allCardEls.forEach(el => el.classList.add('flipped'));
  }, 600);

  setTimeout(() => {
    allCardEls.forEach(el => el.classList.remove('flipped'));
    isLocked = false;
  }, 2800);
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

    if (a.emoji === b.emoji) {
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
