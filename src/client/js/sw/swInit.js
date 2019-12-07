"use strict";

import runtime from "serviceworker-webpack-plugin/lib/runtime";

function serviceWorkerInit() {
  if ("serviceWorker" in navigator) {
    const registration = runtime.register();
  }
};

export { serviceWorkerInit };
