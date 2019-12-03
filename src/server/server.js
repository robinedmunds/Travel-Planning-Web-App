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

function buildTravelCardResponseDummy(destination, departDate) {
  return {
    city: "Pietermaritzburg",
    country: "South Africa",
    departDate: new Date(2020, 4 - 1, 24),
    picture: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Upland_South_Africa_Savanna.jpg",
    weather: {
      high: 32,
      low: 24,
      forecast: "Hot and sunny throughout the day. Wear a hat."
    }
  };
};

async function fetchAPI(url, method) {
  const response = await fetch(url, { method: method })
    .then(res => res);
  return await response.json();
};

async function getDestinationCoords(destination) {
  const credentials = JSON.parse(process.env.GEONAMES);
  const url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${credentials.username}&password=${credentials.password}`;
  const method = "GET";
  try {
    const response = await fetchAPI(url, method);
    const latitude = response.geonames[0].lat;
    const longitude = response.geonames[0].lng;
    return { latitude: latitude, longitude: longitude };
  } catch (err) {
    console.log("Error in getDestinationCoords: " + err);
  };
};

async function getWeatherData(destination, date=null) {
  // take coords from getDestinationCoords func, call dark sky api, return response
  const coords = await getDestinationCoords(destination);
  const key = process.env.DARKSKY_KEY;
  const latitude = coords.latitude;
  const longitude = coords.longitude;
  let url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`;
  const method = "GET";
  if (date) {
    const epochTime = Math.floor(date / 1000);
    url = url + `,${epochTime}`;
  };
  try {
    return await fetchAPI(url, method);
  } catch {err} {
    console.log("Error in getWeatherData: " + err);
  };
};

app.get("/", (req, res) => {
  res.send("responding on path \"/\"");
});

app.post("/api/travel-card", (req, res) => {
  // TODO: take post data, respond with dummy obj
  const postData = req.body;
  if (postData.destination && postData.departDate) {
    const destination = postData.destination;
    const departDate = new Date(postData.departDate);  // TODO: validate date
    const response = buildTravelCardResponseDummy(destination, departDate);
    res.send(JSON.stringify(response));
  } else {
    res.send("Error: Expected POST data invalid or missing. e.g destination=\"Paris, UK\"&departDate=\"2021-04-1T00:00:00.000Z\"");
  };
});

const test = async () => {
  console.log(await getWeatherData("cairo", new Date("2021-04-01")));
};
test();

// fetchAPI("http://api.geonames.org/searchJSON?q=london,uk&maxRows=1&username=roblobob&password=OTa0Fwnp5FkOiQSCxsM", "GET");
// fetchAPI("https://api.darksky.net/forecast/75c000d2c0c6da4bcea32364d3003936/51.50853,-0.12574,1585180800", "GET");
// fetchAPI("https://pixabay.com/api/?q=london&image_type=photo&min_height=720&orientation=horizontal&safesearch=true&category=travel&key=14499565-1a48a4402908c2a23d27f5ba0", "GET");
