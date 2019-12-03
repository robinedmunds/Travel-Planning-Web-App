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
  console.log(JSON.stringify(req.body));
  res.send("responding on path \"/api/travel-card\"");
});
