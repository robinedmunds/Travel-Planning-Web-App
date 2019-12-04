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

const LISTEN_PORT = 8080;

app.listen(LISTEN_PORT, () => {
  console.log(`Server started on port: ${LISTEN_PORT}`);
});

async function fetchAPI(url, method) {
  const response = await fetch(url, { method })
    .then(res => res);
  if (response.ok) {
    return await response.json();
  };
};

async function getDestinationCoords(destination) {
  const credentials = JSON.parse(process.env.GEONAMES);
  const url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${credentials.username}&password=${credentials.password}`;
  const method = "GET";
  try {
    const response = await fetchAPI(url, method);
    if (response.totalResultsCount > 0) {
      const latitude = response.geonames[0].lat;
      const longitude = response.geonames[0].lng;
      const city = response.geonames[0].name;
      const country = response.geonames[0].countryName;
      return { coords: {latitude, longitude}, city, country };
    };
  } catch (err) {
    console.log("Error in getDestinationCoords: -\n" + err);
  };
};

async function getWeatherData(coords, date=null) {
  const key = process.env.DARKSKY_KEY;
  const latitude = coords.latitude;
  const longitude = coords.longitude;
  let url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?exclude=currently,flags`;
  const method = "GET";
  if (date) {
    const epochTime = Math.floor(date / 1000);
    url = url + `,${epochTime}`;
  };
  try {
    const toCelsius = (fahrenheit) => Math.round((fahrenheit-32) * (5/9));
    const response = await fetchAPI(url, method);
    const high = toCelsius(response.daily.data[0].temperatureHigh);
    const low = toCelsius(response.daily.data[0].temperatureLow);
    const forecast = response.daily.data[0].summary;
    return { high, low, forecast };
  } catch (err) {
    console.log("Error in getWeatherData: -\n" + err);
  };
};

async function getDestinationPicture(query) {
  const key = process.env.PIXABAY_KEY;
  const url = `https://pixabay.com/api/?q=${query}&image_type=photo&min_height=720&orientation=horizontal&safesearch=true&category=travel&key=${key}`;
  const method = "GET";
  try {
    const response = await fetchAPI(url, method);
    const picture = response.hits[0].largeImageURL;
    const tags = response.hits[0].tags;
    return { picture, tags };
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
      const pixabay = await getDestinationPicture(destination);
    };
    if (darksky && pixabay) {
      const instance = new TravelCardResponse(departDate, geonames, darksky, pixabay);
      return JSON.stringify(instance);
    };
  } catch (err) {
    console.log("Error in buildTravelCardResponse: -\n" + err);
  }
};

app.get("/", (req, res) => {
  res.send("responding on path \"/\"");
});

app.post("/api/travel-card", async (req, res) => {
  const postData = req.body;
  if (postData.destination && postData.departDate) {
    const destination = postData.destination;
    const departDate = new Date(postData.departDate);  // TODO: validate date
    res.send(await buildTravelCardResponse(destination, departDate));
  } else {
    res.send("Error: Expected POST data invalid or missing. e.g destination=\"Paris, UK\"&departDate=\"2021-04-1T00:00:00.000Z\"");
  };
});

const test = async () => {
  const bad = "lkajgflkajdf";
  const good = "london, uk";

  const geonames = await getDestinationCoords(good);
  if (geonames) {
    const darksky = await getWeatherData(geonames.coords);
    console.log(darksky);
  } else { console.log("no geonames res")}

};
test();
