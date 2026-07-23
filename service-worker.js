// =======================================================
// SIGEI-RPB
// Service Worker v1.0
// =======================================================

const CACHE_NAME = "sigei-rpb-cache-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/estilos.css",
  "./js/api.js",
  "./js/app.js",
  "./js/tema.js",
  "./js/ui.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-192.png",
  "./icons/maskable-512.png"
];

// -------------------------------------------------------
// Instalación
// -------------------------------------------------------

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
  );

  self.skipWaiting();
});

// -------------------------------------------------------
// Activación
// -------------------------------------------------------

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }

          return null;
        })
      )
    )
  );

  self.clients.claim();
});

// -------------------------------------------------------
// Solicitudes
// -------------------------------------------------------

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Las APIs de Google Apps Script siempre deben usar la red.
  if (
    url.hostname.includes("script.google.com") ||
    url.hostname.includes("script.googleusercontent.com")
  ) {
    event.respondWith(fetch(request));
    return;
  }

  // No controlar recursos externos, como Google Fonts
  // o las aplicaciones independientes de los módulos.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Navegación: red primero, caché como respaldo.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => cache.put("./index.html", copy));
          }

          return response;
        })
        .catch(() => caches.match("./index.html"))
    );

    return;
  }

  // Archivos propios: caché primero, red como respaldo.
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then(networkResponse => {
            if (
              networkResponse &&
              networkResponse.ok &&
              networkResponse.type === "basic"
            ) {
              const copy = networkResponse.clone();

              caches.open(CACHE_NAME)
                .then(cache => cache.put(request, copy));
            }

            return networkResponse;
          });
      })
  );
});
