const CACHE_NAME = 'mypokelog-v2.3';

// App Shell assets to precache for 100% offline support
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './site.webmanifest',
  './pokeball.ico',
  './pokedex_db.json',
  './css/main.css',
  './css/components/controls.css',
  './css/components/grid.css',
  './css/components/modal.css',
  './src/app.js',
  './src/data/pokemonData.js',
  './src/data/regionalDexes.js',
  './src/data/gameConfigs.js',
  './src/data/constants.js',
  './src/services/spriteService.js',
  './src/services/pokeapiService.js',
  './src/services/storageService.js',
  './src/services/shareService.js',
  './src/ui/themeUI.js',
  './src/ui/statsUI.js',
  './src/ui/filterUI.js',
  './src/ui/gridUI.js',
  './src/ui/modalUI.js'
];

// Install Event - Precache static App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Precaching App Shell assets...');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Dynamic Caching Strategies
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Sprites (CDN images from jsDelivr, GitHub, pokemon.com) -> Cache First strategy
  if (url.hostname.includes('jsdelivr.net') || url.hostname.includes('githubusercontent.com') || url.hostname.includes('pokemon.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          return cachedResponse || Response.error();
        }
      })
    );
    return;
  }

  // 2. PokéAPI requests -> Network First with Cache Fallback
  if (url.hostname.includes('pokeapi.co')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          const cachedResponse = await cache.match(event.request);
          if (cachedResponse) return cachedResponse;
          return new Response(JSON.stringify({ error: "Offline" }), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      })
    );
    return;
  }

  // 3. Local App Shell & static resources -> Stale-While-Revalidate strategy
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch((err) => {
        console.log('[ServiceWorker] Fetch failed; returning cached item if available.', err);
      });

      return cachedResponse || fetchPromise;
    })
  );
});
