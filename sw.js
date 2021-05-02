var CACHE_NAME = 'static-cache';
var urlsToCache = [
  '.',
  'index.html',
  'scripts.js',
  'style.css'
];
self.addEventListener('install', function (event) {
  console.log(`installing service worker`);
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// self.addEventListener('install', () => {
//     console.log(`installing service worker`);
// });

self.addEventListener('activate', () => {
  console.log(`activating service worker`);
});

// self.addEventListener('fetch', event => {
//     console.log(`fetching...
//     ${event.request.url}`);
// });

self.addEventListener('fetch', function (event) {
  console.log(`fetching...
       ${event.request.url}`);
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      return response || fetchAndCache(event.request);
    })
  );
});

function fetchAndCache(url) {
  return fetch(url)
    .then(function (response) {
      // Check if we received a valid response
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return caches.open(CACHE_NAME)
        .then(function (cache) {
          cache.put(url, response.clone());
          return response;
        });
    })
    .catch(function (error) {
      console.log('Request failed:', error);
      // You could return a custom offline 404 page here
    });
}