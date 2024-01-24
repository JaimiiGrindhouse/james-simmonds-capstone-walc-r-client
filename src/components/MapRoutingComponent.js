import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapRoutingComponent = () => {
  const [map, setMap] = useState(null);

  const initializeMap = () => {
    const mapInstance = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 13,
    });

    setMap(mapInstance);

    // Geolocation logic
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = [longitude, latitude];

        // Center the map on the user's location
        mapInstance.setCenter(userLocation);

        // Add a marker for the user's location
        const userMarker = new mapboxgl.Marker({ color: "purple" })
          .setLngLat(userLocation)
          .addTo(mapInstance);

        // Sample JSON data for additional markers
        const markersData = [
          { coordinates: [-0.1, 51.5], popupContent: "Marker 1 - Lorem Ipsum" },
          {
            coordinates: [-0.2, 51.51],
            popupContent: "Marker 2 - Lorem Ipsum",
          },
          { coordinates: [-0.3, 51.5], popupContent: "Marker 1 - Lorem Ipsum" },
          {
            coordinates: [-0.4, 51.51],
            popupContent: "Marker 2 - Lorem Ipsum",
          },
          // Add more marker data as needed
        ];

        // Add markers with popups
        markersData.forEach((markerData) => {
          const marker = new mapboxgl.Marker()
            .setLngLat(markerData.coordinates)
            .addTo(mapInstance);

          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${markerData.popupContent}</h3><p>This is a popup associated with the marker.</p>`
          );

          marker.setPopup(popup);
        });

        // Update map container height on window resize
        window.addEventListener("resize", () => {
          const newHeight =
            window.innerHeight -
            document.getElementById("map").getBoundingClientRect().top;
          mapInstance.resize();
          document.getElementById("map").style.height = `${newHeight}px`;
        });

        // Directions control
        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: "metric",
          profile: "mapbox/walking",
          controls: {
            instructions: true,
          },
        });

        mapInstance.addControl(directions, "top-left");
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  };

  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <div>
      <div id="map" style={{ height: "100vh" }} />
    </div>
  );
};

export default MapRoutingComponent;
