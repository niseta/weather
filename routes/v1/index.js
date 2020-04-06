const express = require("express");
const location = require("./location/network");
const forecast = require("./forecast/network");
const current = require("./current/network");

const app = express();

app.use("/location", location);

app.use("/current", current);

app.use("/forecast", forecast);

module.exports = app;
