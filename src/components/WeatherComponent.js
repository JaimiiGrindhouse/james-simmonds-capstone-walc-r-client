import React, { useEffect, useState } from "react";
import axios from "axios";
import "../partials/__weather.scss";

const WeatherComponent = ({ userLocation }) => {
  console.log(userLocation);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:5059/weather/${userLocation}`;

        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // if (!userLocation && !weatherData) {
    // }
    fetchData();
  }, []);

  return (
    <>
      {weatherData ? (
        <div className="weather">
          {/* Test weatherData return */}
          <h1 className="weather-title">
            The weather in {weatherData.name} is...
          </h1>
          <div className="weather-data">
            <div className="weather-data_data">
              <p>Temp: {weatherData.main.temp} °C</p>
              <p>Forecast: {weatherData.weather[0].description}</p>
              <p> Wind: {weatherData.wind.speed} mph</p>
            </div>
            <div className="weather-data_img">
              <p> Wind Speed: {weatherData.weather[0].icon} mph</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  );
};

export default WeatherComponent;
