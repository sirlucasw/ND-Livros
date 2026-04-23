const CACHE_NAME = 'nd-livros-v2';
const STATIC_ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './manifest.json',
    './icons/favicon.ico',
    './icons/favicon-16x16.png',
    './icons/favicon-32x32.png',
    './icons/apple-touch-icon.png',
    './icons/android-chrome-192x192.png',
    './icons/android-chrome-512x512.png'
];

// Instalar e cachear assets estáticos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(STATIC_ASSETS);
            })
            .catch(err => console.error('Erro ao cachear assets:', err))
    );
    self.skipWaiting();
});

// Ativar e limpar caches antigos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Interceptar requisições
self.addEventListener('fetch', event => {
    // Estratégia: Network First para API, Cache First para assets estáticos
    if (event.request.url.includes('/api/')) {
        // Para requisições da API: tenta rede primeiro, senão retorna erro genérico
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Clonar resposta para cachear atualizações (opcional)
                    return response;
                })
                .catch(() => {
                    return new Response(
                        JSON.stringify({ error: 'Você está offline. Conecte-se à internet para sincronizar os dados.' }),
                        { headers: { 'Content-Type': 'application/json' } }
                    );
                })
        );
    } else {
        // Para assets estáticos: Cache First
        event.respondWith(
            caches.match(event.request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(event.request)
                        .then(networkResponse => {
                            // Cachear novos assets dinamicamente
                            return caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, networkResponse.clone());
                                return networkResponse;
                            });
                        });
                })
                .catch(() => {
                    // Fallback para página offline se for navegação
                    if (event.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                })
        );
    }
});

