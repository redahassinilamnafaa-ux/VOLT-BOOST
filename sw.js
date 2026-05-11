const CACHE_NAME = 'volt-v1.0';
const ASSETS = [
  '/',
  '/index.html',
  '/VoltApp.html',
  '/display.html',
  '/manifest.json',
];

// ── INSTALL ──────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ─────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ── FETCH (network first, cache fallback) ─────────
self.addEventListener('fetch', event => {
  // Only handle same-origin GET requests
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache fresh responses
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// ── PUSH NOTIFICATIONS ────────────────────────────
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {
    title: 'VOLT ⚡',
    body: 'Ton abonnement se renouvelle bientôt.',
    type: 'renewal'
  };

  const options = {
    body: data.body,
    icon: '/icon-192.png',
    badge: '/badge-96.png',
    tag: `volt-${data.type || 'general'}`,
    renotify: false,
    requireInteraction: data.type === 'blocked',
    data: { url: '/VoltApp.html', type: data.type },
    actions: data.type === 'renewal' ? [
      { action: 'renew', title: 'Renouveler' },
      { action: 'dismiss', title: 'Plus tard' }
    ] : []
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'VOLT ⚡', options)
  );
});

// ── NOTIFICATION CLICK ────────────────────────────
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const url = event.notification.data?.url || '/VoltApp.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // Focus existing window if open
        for (const client of clientList) {
          if (client.url.includes('VoltApp') && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise open new window
        if (clients.openWindow) return clients.openWindow(url);
      })
  );
});

// ── BACKGROUND SYNC (for offline scans) ──────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-scans') {
    event.waitUntil(syncPendingScans());
  }
});

async function syncPendingScans() {
  // In production: read from IndexedDB and POST to API
  console.log('[VOLT SW] Syncing pending scans...');
}
