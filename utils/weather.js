formatWeather = (item) => {
  var date = new Date(item.dt * 1000);
  var image = item.weather[0].icon.slice(0, 2) + ".png";

  let formattedData = {
    date: date,
    temp: item.main.temp.toFixed(1),
    min: item.main.temp_min.toFixed(1),
    max: item.main.temp_max.toFixed(1),
    feelsLike: item.main.feels_like.toFixed(1),
    humidity: item.main.humidity,
    description: item.weather[0].description,
    image: image,
  };

  return formattedData;
};

//Limpia el array dejando un solo dato por día
clearList = (list) => {
  let cleanedlist = [];
  list.map((item) => {
    var newDate = new Date(item.dt * 1000);
    if (newDate.getDate() != new Date().getDate()) {
      if (cleanedlist.length === 0) {
        cleanedlist.push(item);
      } else {
        var lastDate = new Date(cleanedlist[cleanedlist.length - 1].dt * 1000);
        if (newDate.getDate() !== lastDate.getDate()) {
          cleanedlist.push(item);
        } else if (
          newDate.getDate() === lastDate.getDate() &&
          newDate.getHours() <= 12
        ) {
          cleanedlist.splice(cleanedlist.length - 1, 1, item);
        }
      }
    }
  });

  return cleanedlist;
};

module.exports = { formatWeather, clearList };
