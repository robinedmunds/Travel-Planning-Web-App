"use strict";

import { travelCardHTML } from "./travelCardHTML";

async function fetchTravelCardAPI(destination, departDate) {
  try {
    const url = "http://localhost:3000/api/travel-card";
    const postData = { destination, departDate };
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      referrer: "no-referrer",
      body: JSON.stringify(postData)
    });

    if (response.ok) {
      return response.json();
    };
  } catch (err) {
    console.log("Error in fetchTravelCardAPI: " + err);
  };
};

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
    const isValidDate = (date) => !isNaN(Date.parse(date));
    const departureArray = departure.split("/").reverse();
    const isoDate = departureArray.join("-");

    if (isValidDate(isoDate)) {
      departureInput.classList.remove("borders-danger");

      try {
        const travelCardRes = await fetchTravelCardAPI(destination, isoDate);

        if (travelCardRes) {
          console.log(travelCardRes);
          const main = document.querySelector("main");
          main.insertAdjacentHTML("afterbegin", travelCardHTML(travelCardRes));
        } else {
          destinationInput.classList.add("borders-danger");
        };

      } catch (err) {
        console.log("Error: fetchTravelCardAPI failed\n" + err);
      };

    } else {
      console.log("date invalid");  // TODO: remove, testing
      departureInput.classList.add("borders-danger");
    };
  };
};

export { addTripButtonClickCallback };
