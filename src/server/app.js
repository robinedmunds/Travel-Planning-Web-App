"use strict";

var path = require("path"); // for manipulating dir paths
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");
const dotenv = require('dotenv').config();

const app = express();
app.use(express.static("dist"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

async function fetchAPI(url, method) {
  const response = await fetch(url, { method })
    .then(res => res);

  if (response.ok) {
    return await response.json();
  };
};

async function getDestinationCoords(destination) {
  try {
    const credentials = JSON.parse(process.env.GEONAMES);
    const url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${credentials.username}&password=${credentials.password}`;
    const method = "GET";
    const response = await fetchAPI(url, method);

    if (response.totalResultsCount > 0) {
      const latitude = response.geonames[0].lat;
      const longitude = response.geonames[0].lng;
      const city = response.geonames[0].name;
      const country = response.geonames[0].countryName;
      return { coords: { latitude, longitude }, city, country };
    };

  } catch (err) {
    console.log("Error in getDestinationCoords: -\n" + err);
  };
};

async function getWeatherData(coords, date = null) {
  try {
    const key = process.env.DARKSKY_KEY;
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    let url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`;
    const method = "GET";

    if (date) {
      const epochTime = Math.floor(date / 1000);
      url = url + `,${epochTime}`;
    };

    const response = await fetchAPI(url, method);

    if (response) {
      const toCelsius = (fahrenheit) => Math.round((fahrenheit - 32) * (5 / 9));
      const high = toCelsius(response.daily.data[0].temperatureHigh);
      const low = toCelsius(response.daily.data[0].temperatureLow);
      const forecast = response.daily.data[0].summary;
      if (!forecast) {
        const nullForecast = "Forecast summary unavailable.";
        return { high, low, forecast: nullForecast };
      };
      return { high, low, forecast };
    };

  } catch (err) {
    console.log("Error in getWeatherData: -\n" + err);
  };
};

async function getDestinationPicture(query) {
  try {
    const key = process.env.PIXABAY_KEY;
    const url = `https://pixabay.com/api/?q=${query}&image_type=photo&min_height=720&orientation=horizontal&safesearch=true&category=travel&key=${key}`;
    const method = "GET";
    const response = await fetchAPI(url, method);

    if (response.totalHits > 0) {
      const picture = response.hits[0].largeImageURL;
      const tags = response.hits[0].tags;
      return { picture, tags };
    } else {
      const nullResponse = {
        picture: "https://upload.wikimedia.org/wikipedia/commons/8/8c/2010-06-30_B757_OpenSkies_F-HAVN_EDDF_02.jpg",
        tags: "Fly away."
      };
      return nullResponse;
    };

  } catch (err) {
    console.log("Error in getDestinationPicture: -\n" + err);
  };
};

async function buildTravelCardResponse(destination, departDate) {
  class TravelCardResponse {
    constructor(departDate, geonames, darksky, pixabay) {
      this.city = geonames.city;
      this.country = geonames.country;
      this.departDate = departDate;
      this.picture = pixabay.picture;
      this.weather = darksky;
    };
  };

  try {
    const geonames = await getDestinationCoords(destination);

    if (geonames) {
      const darksky = await getWeatherData(geonames.coords, departDate);
      const pixabayQuery = [geonames.city, geonames.country].join(" ");
      let pixabay = await getDestinationPicture(pixabayQuery);

      if (!pixabay) {
        pixabay = await getDestinationPicture(geonames.country);
      };

      if (darksky && pixabay) {
        const instance = new TravelCardResponse(departDate, geonames, darksky, pixabay);
        return JSON.stringify(instance);
      };
    };

  } catch (err) {
    console.log("Error in buildTravelCardResponse: -\n" + err);
  }
};

app.get("/", (req, res) => {
  res.sendFile(__dirname);
});

app.post("/api/travel-card", async (req, res) => {
  try {
    const isValidDate = (date) => !isNaN(Date.parse(date));
    const destination = encodeURIComponent(req.body.destination);
    const departDateISO = req.body.departDate;

    if (destination && departDateISO) {

      if (isValidDate(departDateISO)) {
        const departDate = new Date(departDateISO);
        const travelCardJSON = await buildTravelCardResponse(destination, departDate);

        if (travelCardJSON) {
          res.send(travelCardJSON);
        } else {
          res.status(400).send("Error: TravelCard response object could not be built. This is likely due to a mistyped destination.");
        };

      } else {
        res.status(400).send("Error: Invalid date. ISO date format expected. (yyyy-mm-dd)");
      };

    } else {
      res.status(400).send("Error: Expected POST data missing. (destination=\"London, UK\"&departDate=\"2020-12-30)\"");
    };

  } catch (err) {
    console.log("Error in \"/api/travel-card\" callback: -\n" + err);
  };
});

module.exports = app
