import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import moment from "moment";
import "moment/locale/es";

export default function Forecast(props) {
  const [weatherList, setWeatherList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("");

  useEffect(() => {
    if (props.city !== city || city === "") {
      setIsLoading(true);
      let url = "http://localhost:3030/v1/forecast";
      if (props.city) url = url + `/${props.city}`;
      fetch(url)
        .then((response) => response.json())
        .then((res) => {
          if (!res.error) {
            setWeatherList(res.body.weather);
            setCity(res.body.city);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [props.city, city]);

  var formatDate = (date) => {
    moment.locale("es");
    return moment(date).format("DD MMMM");
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="text-center">
          <ContentLoader height={200} width={800}>
            <circle cx="100" cy="40" r="40" />
            <rect x="50" y="90" rx="5" ry="5" width="100" height="50" />
            <circle cx="250" cy="40" r="40" />
            <rect x="200" y="90" rx="5" ry="5" width="100" height="50" />
            <circle cx="400" cy="40" r="40" />
            <rect x="350" y="90" rx="5" ry="5" width="100" height="50" />
            <circle cx="550" cy="40" r="40" />
            <rect x="500" y="90" rx="5" ry="5" width="100" height="50" />
            <circle cx="700" cy="40" r="40" />
            <rect x="650" y="90" rx="5" ry="5" width="100" height="50" />
          </ContentLoader>
        </div>
      ) : (
        <div className="row weatherList">
          {weatherList.map((weather, key) => (
            <div
              className={`col-2 forecast ${
                key === 0 ? " offset-1" : " daysSeparator"
              }`}
            >
              <div className="forecastIcon">
                <img src={`/images/${weather.image}`} alt=""></img>
              </div>
              <div className="forecastTemp">{weather.temp}°</div>
              <div className="forecastDay">{formatDate(weather.date)}</div>
            </div>
          ))}
        </div>
      )}
      <style jsx>
        {`
          .loadingForcast {
          }
          .forecast {
            text-align: center;
          }
          .daysSeparator {
            border-left: 2px solid #539b98;
          }
          .forecastTemp {
            font-weight: 500;
          }
          .forecastDay {
            font-weight: 500;
          }
          .forecastIcon img {
            width: 70%;
          }
        `}
      </style>
    </React.Fragment>
  );
}
