"use strict";

import { travelCardHTML } from "./travelCardHTML";

export function addDummyTravelCards() {
  const dummyRes = {
    city: "Pietermaritzburg",
    country: "South Africa",
    departDate: "2020-4-24",
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
    departDate: "2021-7-17",
    picture: "https://upload.wikimedia.org/wikipedia/commons/b/b3/City_hall_London_at_dawn_%28cropped%29.jpg",
    weather: {
      high: 19,
      low: 8,
      forecast: "Lots of rain. Bring a brolly."
    }
  };

  const main = document.querySelector("main");
  main.insertAdjacentHTML("afterbegin", travelCardHTML(dummyRes));
  main.insertAdjacentHTML("afterbegin", travelCardHTML(dummyRes2));
};
