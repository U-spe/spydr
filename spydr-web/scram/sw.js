importScripts("/scram/scramjet.all.js");

const controller = new ScramjetController({
    prefix: "/scram/"
});

controller.init();

self.addEventListener("fetch", (event) => {
    if (controller.shouldRoute(event)) {
        event.respondWith(controller.route(event));
    }
});
