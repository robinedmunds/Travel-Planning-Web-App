"use strict";

export function travelCard(res) {
  const countdownDaysCalc = (departDate) => {
    const msInDay = 24 * 60 * 60 * 1000;
    const difference = departDate - Date.now();
    return Math.ceil(difference / msInDay);
  };

  const city = res.city;
  const country = res.country;
  const departDate = res.departDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const countdownDays = countdownDaysCalc(res.departDate);
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
        <h2>Departing: ${departDate} - (${countdownDays} days)</h2>
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
