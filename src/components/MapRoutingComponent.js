import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";
import ButtonsNavBar from "./ButtonsNavBar";

import user_marker from "../assets/icons/map_marker.png"; // Import the custom marker icon

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [showUserPopup, setShowUserPopup] = useState(true); // Add this for popup visibility control

  const initializeMap = async () => {
    try {
      const userLocation = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            resolve([position.coords.longitude, position.coords.latitude]),
          (error) => reject(error)
        );
      });

      const mapInstance = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: userLocation,
        zoom: 13,
      });

      setMap(mapInstance);

      // Add directions control
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/walking",
        controls: {
          instructions: false,
        },
      });
      mapInstance.addControl(directions, "top-left");

      // Create custom marker element for the user location
      const customMarkerElement = document.createElement("div");
      customMarkerElement.className = "custom-marker";
      customMarkerElement.style.backgroundImage = `url(${user_marker})`;
      customMarkerElement.style.width = "64px";
      customMarkerElement.style.height = "64px";

      // Add user location marker with custom icon
      const userMarker = new mapboxgl.Marker({
        element: customMarkerElement,
        draggable: false,
      })
        .setLngLat(userLocation)
        .addTo(mapInstance);

      // Add user marker to markersData if popup is desired
      if (showUserPopup) {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          "<h3>You are Here!</h3>"
        );
        userMarker.setPopup(popup);
      }

      // Update map container height on window resize
      window.addEventListener("resize", () => {
        const newHeight =
          window.innerHeight -
          document.getElementById("map").getBoundingClientRect().top;
        mapInstance.resize();
        document.getElementById("map").style.height = `${newHeight}px`;
      });
    } catch (error) {
      console.error("Error fetching user location:", error);
    }
  };

  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <div>
      <div id="map" style={{ height: "85vh" }} />
    </div>
  );
};

export default MapComponent;
