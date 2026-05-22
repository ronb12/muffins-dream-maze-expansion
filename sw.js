const CACHE = "muffin-dream-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./play.html",
  "./console.html",
  "./worlds.html",
  "./story.html",
  "./store.html",
  "./settings.html",
  "./styles.css",
  "./app.js",
  "./js/audio-manager.js",
  "./js/game-plus.js",
  "./js/site-nav.js",
  "./js/app-stubs.js",
  "./js/garageband-api-client.js",
  "./manifest.json",
  "./audio/music-atmosphere.mp3",
  "./audio/music-garden.mp3",
  "./audio/music-nebula.mp3",
  "./audio/music-victory.mp3",
  "./audio/sfx-star.mp3",
  "./audio/sfx-gate.mp3",
  "./audio/sfx-gate-ready.mp3",
  "./audio/sfx-puddle.mp3",
  "./audio/sfx-pickup.mp3",
  "./audio/sfx-near-star.mp3",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request).then((response) => {
        if (response.ok && event.request.url.startsWith(self.location.origin)) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return response;
      });
      return cached || network;
    })
  );
});
