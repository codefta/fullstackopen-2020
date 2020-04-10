import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ fc }) => {
  const [wheather, setWheater] = useState(null);
  const wheatherApiKey = process.env.REACT_APP_WHEATER_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${wheatherApiKey}&query=${fc.capital}`
      )
      .then((response) => setWheater(response.data));
  });

  return (
    <div>
      <h2>{fc.name}</h2>
      <p>capital {fc.capital}</p>
      <p>population {fc.population}</p>
      <h3>languages</h3>
      <ul>
        {fc.languages.map((l, i) => {
          return <li key={i}>{l.name}</li>;
        })}
      </ul>
      <img src={fc.flag} alt="country's flag" width="100" height="100" />
      <h3>Wheater in {fc.capital}</h3>
      {wheather !== null && (
        <div>
          <p>
            <b>temperature:</b> {wheather.current.temperature} celcius
          </p>
          <img
            src={wheather.current.weather_icons[0]}
            alt={wheather.current.weather_descriptions[0]}
          />
          <p>
            <b>wind:</b> {wheather.current.wind_speed} mph direction{" "}
            {wheather.current.wind_dir}
          </p>
        </div>
      )}
      <p></p>
    </div>
  );
};

export default Country;
