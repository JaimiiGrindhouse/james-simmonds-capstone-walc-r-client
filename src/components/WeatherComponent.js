import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherComponent = ({ coordinates }) => {
  console.log(coordinates);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:5059/weather/${coordinates}`;

        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (coordinates) {
      fetchData();
    }
  }, [coordinates]);

  return (
    <>
      {weatherData ? (
        <div>
          {/* Test weatherData return */}
          <p>Temperature: {weatherData.main.temp}</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  );
};

export default WeatherComponent;
