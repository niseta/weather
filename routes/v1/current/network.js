const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const controller = require("./index");

router.get("/:city?", getWeather);

function getWeather(req, res) {
  controller
    .getCurrentWeather(req.params.city)
    .then((weather) => {
      response.success(req, res, weather, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

module.exports = router;
