"use strict";

const app = require("./app");

const LISTEN_PORT = 3000;

app.listen(LISTEN_PORT, () => {
  console.log(`Server started on port: ${LISTEN_PORT}`);
});
