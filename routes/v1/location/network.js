const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const controller = require("./index");

router.get("/", getLocation);

function getLocation(req, res) {
  controller
    .getCurrentCity()
    .then((city) => {
      response.success(req, res, city, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

module.exports = router;
