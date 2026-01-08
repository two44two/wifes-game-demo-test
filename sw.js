const CACHE_NAME = 'solitaire-pwa-v1';
const urlsToCache = [
    '/wifes-game-demo-test/index.html',
    '/wifes-game-demo-test/default.css',
    '/wifes-game-demo-test/ipad.css',
    '/wifes-game-demo-test/mobile_portrait.css',
    '/wifes-game-demo-test/solitaire_compiled.js',
    '/wifes-game-demo-test/manifest.json',
    '/wifes-game-demo-test/icon-192.png',
    '/wifes-game-demo-test/icon-512.png',
    '/wifes-game-demo-test/material-icons-extended.woff2'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
});
