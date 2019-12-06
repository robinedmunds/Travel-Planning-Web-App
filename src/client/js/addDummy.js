"use strict";

import { travelCardHTML } from "./travelCardHTML";
import { sortTravelCards } from "./sortTravelCards";
import { expireTravelCards } from "./expireTravelCards";

export function addDummyTravelCards() {
  const dummies = [
    {
      city: "Pietermaritzburg",
      country: "South Africa",
      departDate: "2020-4-24",
      picture: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Upland_South_Africa_Savanna.jpg",
      weather: {
        high: 32,
        low: 24,
        forecast: "Hot and sunny throughout the day. Wear a hat."
      }
    },
    {
      city: "Lisbon",
      country: "Portugal",
      departDate: "2018-7-12",
      picture: "https://upload.wikimedia.org/wikipedia/commons/8/89/Alc%C3%A2ntara_by_wax115.jpg",
      weather: {
        high: 14,
        low: 1,
        forecast: "Raining fish."
      }
    },
    {
      city: "London",
      country: "UK",
      departDate: "2021-7-17",
      picture: "https://upload.wikimedia.org/wikipedia/commons/b/b3/City_hall_London_at_dawn_%28cropped%29.jpg",
      weather: {
        high: 19,
        low: 8,
        forecast: "Lots of rain. Bring a brolly."
      }
    }
  ];

  const main = document.getElementById("travel-card-container");

  for (let i of dummies) {
    main.insertAdjacentHTML("afterbegin", travelCardHTML(i));
  };

  sortTravelCards();
  expireTravelCards();
};
