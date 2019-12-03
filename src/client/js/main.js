"use strict";

import { travelCard } from "./travelCard";
import { addDummyTravelCards } from "./addDummy";

function addTripButtonClickCallback(event) {
  event.preventDefault();

  if (!destination) {
    console.log("No dest entered");
    // TODO: add error feedback to DOM
  };

  const departureInput = document.getElementById("departure");
  const departure = departureInput.value;
  if (departure) {
    const departureArray = departure.split("/").reverse();
    const isoDate = departureArray.join("-");
    if (!isNaN(Date.parse(isoDate))) {
      const dateObj = new Date(isoDate);
      console.log(dateObj);
    } else {
      console.log("date invalid");
      // TODO: add error feedback to DOM
    };
  };

  // TODO: if both inputs valid, make fetch req to backend
};

function main() {
  addDummyTravelCards()
  const addTripButton = document.getElementById("add-trip");
  addTripButton.addEventListener("click", (event) => { addTripButtonClickCallback(event) });
};

main();
