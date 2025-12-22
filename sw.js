const CACHE_NAME = "solitaire-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./solitaire_compiled.js",
  "./ribbon_no_text.png",
  "./mobile_portrait.css",
  "./ipad.css",
  "./default.css",
  "./fonts.css",
  "./card-sprite.png",
  "./Material-Icons-Extended.woff2"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
