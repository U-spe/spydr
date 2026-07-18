//sw.js

importScripts("/scram/scramjet.bundle.js");

const controller = new ScramjetController();

self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    if (controller.shouldRoute(event.request)) {
        event.respondWith(controller.route(event.request));
    }
});
