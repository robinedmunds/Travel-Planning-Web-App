"use strict";

import { travelCard } from "./travelCard";
import { addDummyTravelCards } from "./addDummy";

function addTripButtonClickCallback(event) {
  event.preventDefault();

  const destinationInput = document.getElementById("destination");
  const destination = destinationInput.value;
  if (!destination) {
    console.log("No dest entered");  // TODO: remove, testing
    destinationInput.classList.add("borders-danger");
  } else {
    destinationInput.classList.remove("borders-danger");
  };

  const departureInput = document.getElementById("departure");
  const departure = departureInput.value;
  if (!departure) {
    departureInput.classList.add("borders-danger");
  } else {
    const departureArray = departure.split("/").reverse();
    const isoDate = departureArray.join("-");
    if (!isNaN(Date.parse(isoDate))) {
      departureInput.classList.remove("borders-danger");
      const dateObj = new Date(isoDate);
      console.log(dateObj);  // TODO: remove, testing
    } else {
      console.log("date invalid");  // TODO: remove, testing
      departureInput.classList.add("borders-danger");
    };
  };
  // TODO: if both inputs valid, make fetch req to backend
};

function main() {
  addDummyTravelCards();
  const addTripButton = document.getElementById("add-trip");
  addTripButton.addEventListener("click", (event) => { addTripButtonClickCallback(event) });
};

main();
