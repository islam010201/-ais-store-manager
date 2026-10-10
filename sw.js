const CACHE='ais-store-manager-v3-8';
const ASSETS=['./','./index.html','./manifest.webmanifest','./team-photo.jpg','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('ais-store-manager-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method==='GET')event.respondWith(caches.match(event.request).then(response=>response||fetch(event.request).then(result=>{const copy=result.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return result}).catch(()=>caches.match('./index.html'))));});
