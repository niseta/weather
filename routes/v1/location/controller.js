const fetch = require("isomorphic-fetch");
var should = require("should");

module.exports = () => {
  async function getCurrentCity() {
    const response = await fetch("http://ip-api.com/json/", {
      method: "GET",
    });
    const data = await response.json();
    return {
      city: data.city,
    };
  }

  return {
    getCurrentCity,
  };
};
