import React, { useEffect, useState } from "react";
import axios from "axios";
import "../partials/__weather.scss";

const WeatherComponent = ({ userLocation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null); // State for icon code

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:5059/weather/${userLocation}?icon=true`; // API URL with icon parameter

        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
        if (response.data.weather[0].icon) {
          // Extract icon code
          setWeatherIcon(response.data.weather[0].icon);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {weatherData ? (
        <div className="weather">
          <h1 className="weather-title">
            The weather in {weatherData.name} is...
          </h1>
          <div className="weather-data">
            <div className="weather-data_data">
              <p>Temp: {weatherData.main.temp} °C</p>
              <p>Forecast: {weatherData.weather[0].description}</p>
              <p>Wind: {weatherData.wind.speed} mph</p>
            </div>
            <div className="weather-data_img">
              {weatherIcon && ( // Conditionally render icon
                <img
                  src={`https://openweathermap.org/img/w/${weatherIcon}.png`}
                  alt={`Weather icon for ${weatherData.weather[0].description}`} // Accessibility
                />
              )}
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
