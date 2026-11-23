const CACHE_NAME = "school-register-shell-v30";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  // PAYE/SSNIT rates are always fetched live (never from cache) so sync only works with internet.
  if (new URL(request.url).pathname.endsWith("/statutory-rates.json")) { event.respondWith(fetch(request)); return; }

  // HTML navigations: offline-first. Open the cached app instantly (no waiting on a dead connection),
  // and refresh the cached copy quietly in the background whenever internet happens to be available.
  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("./index.html").then(cached => {
        const update = fetch(request).then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy));
          }
          return response;
        }).catch(() => null);
        if (cached) { event.waitUntil(update); return cached; }
        return update.then(r => r || new Response("Offline - open the app once with internet to install it.", {status: 503, headers: {"Content-Type": "text/plain"}}));
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }))
  );
});
