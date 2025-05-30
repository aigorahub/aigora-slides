/// <reference lib="webworker" />

const CACHE_NAME = 'sensory-data-app-cache-v2'; // Keep existing cache name
const URLS_TO_CACHE = [
  '/', // Root path
  '/index.html', // Main HTML file (often same as root)
  '/css/styles.css', // Custom CSS
  '/js/main.js', // Main application logic
  '/js/components/radar-chart.js', // Radar chart component
  '/js/components/word-cloud.js', // Word cloud component
  '/js/components/predictive-tool.js', // Predictive tool component
  '/js/registerServiceWorker.js', // Service worker registration script
  '/js/sw.js', // The service worker itself

  // External CDN Assets
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js',
  'https://cdn.jsdelivr.net/npm/wordcloud@1.2.3/src/wordcloud2.js',
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js',
  'https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@300;400;500;600;700&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
  'https://cdn.tailwindcss.com',

  // Note: Specific font files (e.g., woff2) from Google Fonts are often versioned and have opaque responses.
  // Caching the main CSS request for Google Fonts is generally sufficient.
  // Rely on browser cache for the font files themselves or more advanced SW strategies if deep offline for fonts is critical.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache:', CACHE_NAME);
        // Filter out requests that might fail due to opaque responses if not handled carefully
        // For this list, most should be fine, but Google Fonts CSS might lead to opaque if not cors-enabled.
        // However, modern browsers often handle these well for caching.
        return cache.addAll(URLS_TO_CACHE)
          .catch(err => {
            console.warn('Some assets failed to cache during install. This can be normal for cross-origin resources without CORS or if offline:', err);
            // Log individual failed URLs for debugging
            URLS_TO_CACHE.forEach(url => {
              fetch(url, { mode: 'no-cors' }).then(response => { // Use no-cors for a HEAD-like check
                if (!response.ok && response.type !== 'opaque') { // Opaque responses are ok for caching but can't check status
                  console.warn(`Failed to fetch (and cache): ${url}, Status: ${response.status}`);
                }
              }).catch(fetchErr => console.warn(`Fetch error for ${url}: ${fetchErr}`));
            });
          });
      })
      .catch(err => {
        console.error('Failed to open cache during install:', err);
      })
  );
  (self).skipWaiting(); // Activate new SW immediately
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // For navigation requests (HTML), try network first, then cache.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          if (networkResponse) {
            // Clone response for caching as it can only be consumed once.
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
            return networkResponse;
          }
          // If fetch fails (e.g., offline), try to serve from cache.
          return caches.match(event.request);
        })
        .catch(() => caches.match(event.request)
            .then(cachedResponse => cachedResponse || caches.match('/') || caches.match('/index.html')) // Fallback to root or index.html
        )
    );
    return;
  }

  // For other requests (CSS, JS, images, fonts), use cache-first strategy.
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Cache hit.
        }
        // Not in cache - fetch from network.
        return fetch(event.request).then(
          (networkResponse) => {
            // Check if the response is valid and cacheable.
            if (networkResponse && networkResponse.status === 200 &&
                (networkResponse.type === 'basic' || networkResponse.type === 'cors')) { // basic for same-origin, cors for CDNs
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  if (event.request.method === 'GET') { // Only cache GET requests.
                      cache.put(event.request, responseToCache);
                  }
                });
            }
            return networkResponse;
          }
        ).catch(() => {
          // If fetch fails and not in cache (e.g. for an image not cached),
          // it will naturally fail, which is often the desired behavior for non-critical, non-cached assets.
          // Optionally, return a placeholder for specific asset types like images.
          // if (event.request.destination === 'image') {
          //   return caches.match('/placeholder.png');
          // }
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    }).then(() => (self).clients.claim()) // Claim clients immediately to activate SW for all open tabs.
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    (self).skipWaiting();
  }
});
