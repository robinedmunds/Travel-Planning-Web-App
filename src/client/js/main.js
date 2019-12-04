"use strict";

import { addTripButtonClickCallback } from "./addTripBtnClick";

function main() {
  const addTripButton = document.getElementById("add-trip");
  addTripButton.addEventListener("click", (event) => {
    addTripButtonClickCallback(event)
  });
};

main();
