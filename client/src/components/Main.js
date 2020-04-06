import React, { useState, useEffect } from "react";
import Current from "./Current";
import Forecast from "./Forecast";
import Select from "react-select";

export default function Main() {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("http://localhost:3030/v1/location")
      .then((response) => response.json())
      .then((res) => {
        if (!res.error) {
          setCity(res.body.city);
          setSelectedCity(res.body.city);
        } else {
          setError(true);
        }
      });
  }, []);

  let cityList = [
    {
      value: "London",
      label: "Londres",
    },
    {
      value: "New York",
      label: "Nueva York",
    },
    {
      value: "Tokyo",
      label: "Tokio",
    },
    {
      value: "Oslo",
      label: "Oslo",
    },
    {
      value: "Zagreb",
      label: "Zagreb",
    },
  ];

  !error &&
    cityList.unshift({
      value: city,
      label: `${city ? city + " (Actual)" : "Cargando ciudad actual"}`,
    });

  return (
    <div className="container mb-3">
      <div className="title row my-3">
        <div className="searchBar col-md-7 col-12 pl-md-0">
          <Select
            options={cityList}
            placeholder={"Elige una ciudad"}
            onChange={(target) => setSelectedCity(target.value)}
          />
        </div>
        <h1 className=" pl-3 ">EL CLIMA</h1>
      </div>

      <Current city={selectedCity}></Current>
      <hr className="weatherSeparator "></hr>
      <Forecast city={selectedCity}></Forecast>

      <style jsx>
        {`
          .title {
            display: flex;
            align-items: center;
          }
          h1 {
            font-size: 3em;
          }
          .form-group {
            width: 50%;
          }
          .searchBar {
          }
          .weatherSeparator {
            border-top: 1px solid #539b98;
            margin-top: 2rem;
            margin-bottom: 2rem;
          }
        `}
      </style>
    </div>
  );
}
