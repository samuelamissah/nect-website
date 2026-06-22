// Minimal service worker: cache app shell and serve stale-while-revalidate
const CACHE_NAME = 'nect-site-v1';
const ASSETS = [
  '/',
  '/favicon.ico',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        // Optionally cache new requests
        return response;
      });
    })
  );
});

// Listen for queued reports from clients and attempt to submit using fetch
self.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'SUBMIT_QUEUED_REPORT') {
    const payload = event.data.payload;
    // Try to POST to /api/reports
    fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then((res) => {
      // inform client
      event.source?.postMessage({ type: 'REPORT_SUBMIT_RESULT', ok: res.ok });
    }).catch(() => {
      event.source?.postMessage({ type: 'REPORT_SUBMIT_RESULT', ok: false });
    });
  }
});
