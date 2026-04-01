const CACHE_NAME = 'djurspel-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/game.js',
  '/manifest.json',
  // Animal illustrations
  '/assets/animals/bear.webp',
  '/assets/animals/brontosaurus.webp',
  '/assets/animals/cat.webp',
  '/assets/animals/crocodile.webp',
  '/assets/animals/dog.webp',
  '/assets/animals/dragon.webp',
  '/assets/animals/fox.webp',
  '/assets/animals/frog.webp',
  '/assets/animals/koala.webp',
  '/assets/animals/lion.webp',
  '/assets/animals/lizard.webp',
  '/assets/animals/panda.webp',
  '/assets/animals/pig.webp',
  '/assets/animals/rabbit.webp',
  '/assets/animals/trex.webp',
  '/assets/animals/turtle.webp',
  // Theme assets
  '/assets/themes/default/bg.webp',
  '/assets/themes/default/card-back.webp',
  '/assets/themes/jungle/bg.webp',
  '/assets/themes/jungle/card-back.webp',
];

// Install — cache all assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clear old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — cache-first
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
