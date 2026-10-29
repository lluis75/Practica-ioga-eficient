/* Samyama Pràctica — service worker: funciona sense connexió */
const VERSION = "practica-v4";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  // la pàgina: primer xarxa (per rebre actualitzacions), si no hi ha connexió, la còpia guardada
  if(req.mode === "navigate"){
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put("./index.html", cp)); return r; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  // fonts de Google i fitxers propis: primer la còpia guardada
  if(url.origin === location.origin || url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")){
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if(r.ok || r.type === "opaque"){ const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); } return r; })));
  }
});
