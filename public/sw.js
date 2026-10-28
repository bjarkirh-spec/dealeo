// Dealeo Service Worker
// ⚠️  Bump CACHE_NAME and STATIC_CACHE version (e.g. v2 → v3) whenever you need
//     to force-evict old cached assets on all clients after a deploy.
const CACHE_NAME = "dealeo-v2";
const STATIC_CACHE = "dealeo-static-v2";

// Core shell assets to pre-cache on install
const PRECACHE_URLS = [
  "/",
  "/deals",
  "/live",
  "/map",
  "/offline",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch(() => {/* ignore individual failures */})
    )
  );
});

self.addEventListener("activate", (event) => {
  // Remove old caches
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME && k !== STATIC_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => clients.claim())
  );
});

// Fetch strategy:
// - Navigation (HTML pages): network-first, fall back to cache, then /offline
// - API / Supabase: network-only (always fresh)
// - Static assets (_next/static, fonts, images): cache-first
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin API calls (Supabase, etc.)
  if (request.method !== "GET") return;
  if (url.hostname !== self.location.hostname) return;

  // _next/static assets — cache-first (they're content-hashed)
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      })
    );
    return;
  }

  // Navigation requests — network-first, stale fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache a fresh copy of visited pages
          if (response.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
          }
          return response;
        })
        .catch(async () => {
          // Offline: serve cached version of this page if available
          const cached = await caches.match(request);
          if (cached) return cached;
          // Fall back to offline page
          const offline = await caches.match("/offline");
          return offline || new Response("You are offline", { status: 503 });
        })
    );
    return;
  }
});

// Handle push notifications
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "Dealeo";
  const options = {
    body: data.body || "A new deal is live near you!",
    icon: "/api/icon",
    badge: "/api/icon",
    tag: data.tag || "dealeo-notification",
    renotify: true,
    data: { url: data.url || "/live" },
    actions: [
      { action: "view", title: "See deal" },
      { action: "dismiss", title: "Dismiss" },
    ],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Open app when notification is clicked
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "dismiss") return;
  const path = event.notification.data?.url || "/live";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        const clientUrl = new URL(client.url);
        if (clientUrl.pathname === path && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(path);
      }
    })
  );
});
