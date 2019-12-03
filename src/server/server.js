"use strict";

var path = require("path"); // for manipulating dir paths
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.static("dist"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const LISTEN_PORT = 8080;

app.listen(LISTEN_PORT, () => {
  console.log(`Server started on port: ${LISTEN_PORT}`);
});

app.get("/", (req, res) => {
  res.send("responding on path \"/\"");
});

app.post("/api/travel-card", (req, res) => {
  // TODO: take post data, respond with dummy obj
  const postData = req.body;
  if (postData.destination && postData.departDate) {
    const destination = postData.destination;
    const departDate = new Date(postData.departDate);  // TODO: validate date

    const bodyString = JSON.stringify(req.body);
    console.log(bodyString);
    const departDateUK = [departDate.getDate(), departDate.getMonth()+1, departDate.getFullYear()].join("/");
    res.send(`destination: ${destination}\ndepartDate: ${departDateUK}`);
  } else {
    res.send("Error: Expected POST data invalid or missing. e.g destination=\"Paris, UK\"&departDate=\"2021-04-1T00:00:00.000Z\"");
  };
});
