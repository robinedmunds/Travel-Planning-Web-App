"use strict";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      console.log("Service worker cached assets: " + serviceWorkerOption.assets);
      return cache.addAll(serviceWorkerOption.assets);
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "POST") {
    event.respondWith(caches.match(event.request).then(function (response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function (response) {
          // response may be used only once
          // we need to save clone to put one copy in cache
          // and serve second one
          let responseClone = response.clone();

          caches.open("v1").then(function (cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        }).catch(function () {
          console.log("File not found in service-worker cache...");
        });
      }
    }));
  };
});
