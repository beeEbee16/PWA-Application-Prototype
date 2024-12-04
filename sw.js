const staticCacheName = 'static-v1';
const dynamicCacheName = 'dynamic-v1';
const assets = [
    '/',
    '/index.html',
    '/products/gameThrones3.jpg',
    '/products/harryPotter1.jpg',
    '/products/lordRings2.jpg',
    '/products/macgyver1.jpg',
    '/products/starWars1.jpg',
    'products/quizList.js',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];

// install service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching assets');
            cache.addAll(assets); 
        })
    );
});

// activate service worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.filter(key => key !== staticCacheName && key !== dynamicCacheName).map(key => caches.delete(key)));
        })
    );
});

// service worker fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(event.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    );
});