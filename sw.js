// Service worker: la app abre aunque no haya cobertura (red primero, caché de respaldo)
const V = 'w-33646bf94917';
const FILES = ['./', 'index.html', 'qr.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'logo.png', 'favicon.png', 'apple-touch-icon.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const c = await caches.open(V);
    try {
      const res = await Promise.race([fetch(r), new Promise((_, j) => setTimeout(j, 4000))]);
      if (res && res.ok) c.put(r, res.clone());
      return res;
    } catch {
      return (await c.match(r, { ignoreSearch: true })) || Response.error();
    }
  })());
});
