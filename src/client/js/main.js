"use strict";

import { travelCard } from "./travelCard";

// create dummy response object containing all data required to build output
// parse response data to DOM

const dummyRes = {
  city: "Pietermaritzburg",
  country: "South Africa",
  departDate: new Date(2020, 4-1, 24),
  picture: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Upland_South_Africa_Savanna.jpg",
  weather: {
    high: 32,
    low: 24,
    forecast: "Hot and sunny throughout the day. Wear a hat."
  }
};

const dummyRes2 = {
  city: "London",
  country: "UK",
  departDate: new Date(2021, 8-1, 13),
  picture: "https://upload.wikimedia.org/wikipedia/commons/b/b3/City_hall_London_at_dawn_%28cropped%29.jpg",
  weather: {
    high: 19,
    low: 8,
    forecast: "Lots of rain. Bring a brolly."
  }
};

function addTripButtonClickEvent(event) {
  event.preventDefault();

  const destinationInput = document.getElementById("destination");
  const destination = destinationInput.value;
  if (destination) {
    console.log(destination);
  } else {
    console.log("No dest entered");
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
    };
  };
}

function main() {
  const main = document.querySelector("main");
  main.insertAdjacentHTML("afterbegin", travelCard(dummyRes));
  main.insertAdjacentHTML("afterbegin", travelCard(dummyRes2));
  
  const addTripButton = document.getElementById("add-trip");
  addTripButton.addEventListener("click", (event) => { addTripButtonClickEvent(event) });
};

main();
