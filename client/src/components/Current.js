import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

export default function Current(props) {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("");

  useEffect(() => {
    console.log("props", props.city);
    if (props.city !== city || city === "") {
      setIsLoading(true);
      let url = "http://localhost:3030/v1/current";
      if (props.city) url = url + `/${props.city}`;
      fetch(url)
        .then((response) => response.json())
        .then((res) => {
          if (!res.error) {
            setWeather(res.body.weather);
            setCity(res.body.city);
            setIsLoading(false);
            console.log("ciudad", res.body.city);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [props.city, city]);

  return (
    <React.Fragment>
      {isLoading ? (
        <div>
          <React.Fragment>
            <div className="row">
              <div className="loaderWeatherIcon col-md-7 col-12 ">
                <ContentLoader height={300} width={160}>
                  <circle cx="80" cy="150" r="80" />
                </ContentLoader>
              </div>
              <div className="col-md-5 col-12">
                <ContentLoader height={300}>
                  <rect x="0" y="50" rx="5" ry="5" width="100" height="50" />
                  <rect x="0" y="110" rx="5" ry="5" width="130" height="20" />
                  <rect x="0" y="160" rx="5" ry="5" width="120" height="20" />
                  <rect x="0" y="190" rx="5" ry="5" width="120" height="20" />
                  <rect x="0" y="220" rx="5" ry="5" width="120" height="20" />
                  <rect x="0" y="250" rx="5" ry="5" width="120" height="20" />
                </ContentLoader>
              </div>
            </div>
          </React.Fragment>
        </div>
      ) : (
        <div className="my-3">
          <div className="row">
            <div className="col-md-7 col-12 weatherIcon">
              <img src={`/images/${weather.image}`} alt=""></img>
            </div>
            <div className="col-md-5 col-12 weatherText">
              <div className="my-4">
                <div className="current ">{weather.temp}°</div>
                <div className="cityLabel mb-4">
                  <b>
                    {props.city ? props.city.toUpperCase() : city.toUpperCase()}
                  </b>
                </div>
                <div className="description my-2">
                  <b>{weather.description.toUpperCase()}</b>
                </div>
                <div className="feelsLike my-2">
                  Sensación térmica: <b>{weather.feelsLike}°</b>
                </div>
                <div className="maxMin my-2">
                  <span>
                    Mín.: <b>{weather.min}</b>
                  </span>
                  {"  "}
                  <span>
                    Máx.: <b>{weather.max}</b>
                  </span>
                </div>
                <div className="humidity my-2">
                  Humedad: <b>{weather.humidity}%</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>
        {`
          .loaderWeatherIcon {
            display: flex;
            justify-content: center;
          }
          .loaderWeatherText {
            display: flex;
            justify-content: center;
          }
          .weatherIcon {
            display: flex;
            justify-content: center;
          }
          .weatherIcon img {
            width: 50%;
          }
          .weatherText {
            border-left: 2px solid #539b98;
            display: flex;
            align-items: center;
          }
          .current {
            font-size: 3em;
          }
          @media only screen and (max-width: 768px) {
            .weatherText {
              border-left: none;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        `}
      </style>
    </React.Fragment>
  );
}
