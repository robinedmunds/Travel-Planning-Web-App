"use strict";

import { calcDayDifference } from "./helpers/calcDayDiff";

export function travelCardHTML(res) {
  const city = res.city;
  const country = res.country;
  const departDate = new Date(res.departDate);
  const departDateUK = departDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const countdownDays = calcDayDifference(departDate, Date.now());
  const picture = res.picture;
  const highTemp = res.weather.high;
  const lowTemp = res.weather.low;
  const forecast = res.weather.forecast;

  return `
    <div class="travel-card">
      <div class="travel-card-left">
        <img src="${picture}" alt="${city}, ${country}">
      </div>
      <div class="travel-card-right">
        <h2>My trip to: ${city}, ${country}</h2>
        <h2>Departing: ${departDateUK} - (${countdownDays} days)</h2>
        <div class="travel-card-buttons">
          <button>Save Trip</button>
          <button>Remove Trip</button>
        </div>
        <p>
          The weather you should expect during your trip: -
          </br >
          Highs: ${highTemp}&deg;C - Lows: ${lowTemp}&deg;C
          </br >
          ${forecast}
        </p>
      </div>
    </div>
  `
};
