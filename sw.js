/* Samyama Pràctica — service worker: funciona sense connexió */
const VERSION = "practica-v13";
const SHELL = ["./", "./index.html", "./privacy.html", "./manifest.webmanifest", "./icons/sthira-192.png", "./icons/sthira-512.png", "./icons/sthira-apple-180.png", "./icons/sthira-maskable-512.png", "./fonts/cormorant-garamond-latin-400-italic.woff2", "./fonts/cormorant-garamond-latin-400-normal.woff2", "./fonts/cormorant-garamond-latin-500-italic.woff2", "./fonts/cormorant-garamond-latin-500-normal.woff2", "./fonts/cormorant-garamond-latin-600-italic.woff2", "./fonts/cormorant-garamond-latin-600-normal.woff2", "./fonts/cormorant-garamond-latin-ext-400-italic.woff2", "./fonts/cormorant-garamond-latin-ext-400-normal.woff2", "./fonts/cormorant-garamond-latin-ext-500-italic.woff2", "./fonts/cormorant-garamond-latin-ext-500-normal.woff2", "./fonts/cormorant-garamond-latin-ext-600-italic.woff2", "./fonts/cormorant-garamond-latin-ext-600-normal.woff2", "./fonts/fonts.css", "./fonts/jost-latin-400-normal.woff2", "./fonts/jost-latin-500-normal.woff2", "./fonts/jost-latin-600-normal.woff2", "./fonts/jost-latin-ext-400-normal.woff2", "./fonts/jost-latin-ext-500-normal.woff2", "./fonts/jost-latin-ext-600-normal.woff2"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // pàgines: primer xarxa (per rebre actualitzacions); sense connexió, la còpia guardada
  if(req.mode === "navigate"){
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); return r; })
      .catch(() => caches.match(req).then(hit => hit || caches.match("./index.html"))));
    return;
  }
  // fitxers: primer la còpia guardada
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if(r.ok){ const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); } return r; })));
});
