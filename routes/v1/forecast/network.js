const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const controller = require("./index");

router.get("/:city?", getForecast);

function getForecast(req, res) {
  controller
    .getForecastWeather(req.params.city)
    .then((forecast) => {
      response.success(req, res, forecast, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

module.exports = router;
