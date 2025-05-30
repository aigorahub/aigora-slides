// registerServiceWorker.js
export function register() {
  // Only register in production or if explicitly enabled, not during Eleventy --serve for dev convenience
  if ('serviceWorker' in navigator && (location.hostname !== "localhost" && location.hostname !== "127.0.0.1")) {
    window.addEventListener('load', () => {
      const swUrl = '/js/sw.js'; // Fixed path relative to site root
      
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log(
                    'New content is available and will be used when all ' +
                      'tabs for this page are closed. See https://cra.link/PWA.'
                  );
                  // Optional: Show a "New version available" toast
                  // registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
                } else {
                  console.log('Content is cached for offline use.');
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error('Error during service worker registration:', error, 'Attempted URL:', swUrl);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}