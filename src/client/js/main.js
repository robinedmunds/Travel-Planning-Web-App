"use strict";

import { addTripButtonClickCallback } from "./addTripBtnClick";
import { addDummyTravelCards } from "./addDummy";  // TODO: remove testing

function main() {
  const addTripButton = document.getElementById("add-trip");
  addTripButton.addEventListener("click", (event) => {
    addTripButtonClickCallback(event)
  });

  // window.addEventListener("load", () => { addDummyTravelCards();});  // TODO: remove testing
};

main();
