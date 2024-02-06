import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";
import ButtonsNavBar from "./ButtonsNavBar";

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

      // Sample JSON data for markers
      const markersData = [
        { coordinates: [-0.1, 51.5], popupContent: "Marker 1 - Lorem Ipsum" },
        { coordinates: [-0.2, 51.51], popupContent: "Marker 2 - Lorem Ipsum" },
      ];

      // Add user location marker
      const userMarker = new mapboxgl.Marker({
        color: "purple",
        draggable: false,
      })
        .setLngLat(userLocation)
        .addTo(mapInstance);

      // Add user marker to markersData if popup is desired
      if (showUserPopup) {
        markersData.push({
          coordinates: userLocation,
          popupContent: "You are Here!",
        });
      }

      // Add markers with popups
      markersData.forEach((markerData) => {
        const marker = new mapboxgl.Marker()
          .setLngLat(markerData.coordinates)
          .addTo(mapInstance);

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${markerData.popupContent}</h3>`
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
