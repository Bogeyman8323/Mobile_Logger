
const CACHE_NAME='rp-logger-v4';
const APP_SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))))})
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(cached=>{const fetchP=fetch(e.request).then(res=>{if(res&&res.ok&&new URL(e.request.url).origin===location.origin){const clone=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,clone))}return res}).catch(()=>cached||caches.match('./index.html'));return cached||fetchP}))});
