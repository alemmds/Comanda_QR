const CACHE_NAME = 'panificadora-bacanga-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/logo.png',
    '/favicon.ico',
    '/favicon-48x48.png',
    '/favicon.svg',
    '/apple-touch-icon.png',
    '/icon.png',
    '/icon-large.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
