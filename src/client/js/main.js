"use strict";

import { travelCard } from "./travelCard";
import { addDummyTravelCards } from "./addDummy";  // TODO: remove, testing

async function fetchTravelCardJSON(destination, departDate) {
  try {
    const url = "/api/travel-card";
    const postData = { destination, departDate };
    const response = await fetch(url, {
      method: "POST",
      mode: "same-origin",
      headers: { "Content-Type": "application/json" },
      referrer: "no-referrer",
      body: JSON.stringify(postData)
    });

    if (response.ok) {
      return response.json();
    };
  } catch (err) {
    console.log("Error in fetchTravelCardJSON: " + err);
  };
};

const test = async () => console.log(await fetchTravelCardJSON("london,uk", "2021-11-22"));
// test();

async function addTripButtonClickCallback(event) {
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
      // valid user input date
      departureInput.classList.remove("borders-danger");

      try {
        // run fetchTravelCardJSON on validated user input
        // pass JSON to travelCard element build
        const travelCardRes = await fetchTravelCardJSON(destination, isoDate);

        if (travelCardRes) {
          // travelCard(travelCardRes);
          console.log(travelCardRes);
        };

      } catch (err) {
        console.log("Error: fetchTravelCardJSON failed\n" + err);
      };

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
