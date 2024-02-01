import React, { useState } from "react";
import GeolocationComponent from "../components/GeolocationComponent";
import WeatherComponent from "../components/WeatherComponent";
import ButtonsNavBar from "../components/ButtonsNavBar";
import Header from "../components/Header";

function HomePage() {
  const [userLocation, setUserLocation] = useState(null);

  const handleLocationChange = (location) => {
    setUserLocation(location);
  };

  return (
    <>
      <h1>Home page.....under construction</h1>
      <div className="weather"></div>
      <div>
        {/* GeolocationComponent retrieves the user's location and updates userLocation state */}
        <GeolocationComponent
          onLocationChange={handleLocationChange}
          userLocation={userLocation}
        />
        {/* WeatherComponent receives userLocation as coordinates and fetches weather data */}
        {userLocation && <WeatherComponent userLocation={userLocation} />}
      </div>

      <ButtonsNavBar />
    </>
  );
}

export default HomePage;
