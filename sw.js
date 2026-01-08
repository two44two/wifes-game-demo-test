const CACHE_NAME = 'solitaire-pwa-v1';
const urlsToCache = [
    'standalone.html',
    'default.css',
    'ipad.css',
    'mobile_portrait.css',
    'solitaire_compiled.js',
    'manifest.json',
    'icon-192.png',
    'icon-512.png',
    'material-icons-extended.woff2'
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
