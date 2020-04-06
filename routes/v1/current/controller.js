const fetch = require("isomorphic-fetch");
const weatherUtils = require("../../../utils").Weather;

module.exports = () => {
  getCurrentWeather = async (city) => {
    let url = "http://ip-api.com/json/";
    let data;
    let response;
    if (!city) {
      response = await fetch(url, {
        method: "GET",
      });
      data = await response.json();
      city = data.city;
    }

    const apiKey = "fd5cc1a4c4d59bbf5f96a030bb5ecd0d";
    url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    response = await fetch(url, {
      method: "GET",
    });
    data = await response.json();

    return { city, weather: weatherUtils.formatWeather(data) };
  };

  return {
    getCurrentWeather,
  };
};
