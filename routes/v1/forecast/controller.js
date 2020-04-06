const fetch = require("isomorphic-fetch");
const weatherUtils = require("../../../utils").Weather;

module.exports = () => {
  getForecastWeather = async (city) => {
    let data;
    let url;
    let response;
    if (!city) {
      url = "http://ip-api.com/json/";
      response = await fetch(url, {
        method: "GET",
      });
      data = await response.json();
      city = data.city;
    }

    const apiKey = "fd5cc1a4c4d59bbf5f96a030bb5ecd0d";
    url = `http://api.openweathermap.org/data/2.5/forecast?q=${encodeURI(
      city
    )}&appid=${apiKey}&units=metric&lang=es`;

    response = await fetch(url, {
      method: "GET",
    });
    data = await response.json();

    let weather = [];
    let list = weatherUtils.clearList(data.list);

    list.map((item) => {
      weather.push(weatherUtils.formatWeather(item));
    });

    return { city, weather };
  };

  return {
    getForecastWeather,
  };
};
