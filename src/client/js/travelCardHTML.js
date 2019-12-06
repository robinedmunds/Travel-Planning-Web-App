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
          <img src="${picture}" alt="${country}">
        </div>
        <div class="travel-card-right">
          <h2>${city}, ${country}</h2>
          <h3 class="travel-card-depart">Departing: <strong>${departDateUK} - (${countdownDays} days)</strong></h2>
          <div class="travel-card-buttons">
            <button>Save Trip</button>
            <button>Remove Trip</button>
          </div>
          <p>The weather you should expect during your trip: -</p>
          <div class="travel-card-weather">
            <p><strong>Highs: ${highTemp}&deg;C - Lows: ${lowTemp}&deg;C</strong></p>
            <p><em>${forecast}</em></p>
          </div>
        </div>
      </div>
    `
};
