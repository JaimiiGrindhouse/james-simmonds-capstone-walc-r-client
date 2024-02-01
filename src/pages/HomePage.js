import React, { useState } from "react";
import GeolocationComponent from "../components/GeolocationComponent";
import WeatherComponent from "../components/WeatherComponent";
import ButtonsNavBar from "../components/ButtonsNavBar";
import Header from "../components/Header";
import ControlledCarousel from "../components/ControlledCarousel";

function HomePage() {
  // const [userLocation, setUserLocation] = useState(null);

  // const handleLocationChange = (location) => {
  //   setUserLocation(location);
  // };

  return (
    <>
      <h1>Home page.....under construction</h1>
      <div className="weather"></div>
      <section>
        <article></article>
      </section>
      <ButtonsNavBar />
    </>
  );
}

export default HomePage;
