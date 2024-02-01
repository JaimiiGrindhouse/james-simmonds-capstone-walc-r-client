import React, { useState } from "react";
import GeolocationComponent from "../components/GeolocationComponent";
import WeatherComponent from "../components/WeatherComponent";
import ButtonsNavBar from "../components/ButtonsNavBar";
import Header from "../components/Header";
import "../partials/__weather.scss";
import "../pages/HomePage.scss";

function HomePage() {
  const [userLocation, setUserLocation] = useState(null);

  const handleLocationChange = (location) => {
    setUserLocation(location);
  };

  return (
    <>
      <div className="weather">
        {/* GeolocationComponent retrieves the user's location and updates userLocation state */}
        <GeolocationComponent
          onLocationChange={handleLocationChange}
          userLocation={userLocation}
        />
        {/* WeatherComponent receives userLocation as coordinates and fetches weather data */}
        {userLocation && <WeatherComponent userLocation={userLocation} />}
      </div>
      <div className="home-body"></div>

      <ButtonsNavBar />
    </>
  );
}

export default HomePage;
