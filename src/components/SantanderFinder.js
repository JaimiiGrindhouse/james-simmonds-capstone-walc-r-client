import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import axios from "axios";
import user_marker from "../assets/icons/map_marker.png"; // Import the custom marker icon
import santander_small from "../assets/icons/bike_icon_small.png";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "../partials/_santanderFinder.scss";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const SantanderFinder = () => {
  const [map, setMap] = useState(null);
  const [markersData, setMarkersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initializeMap = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { longitude, latitude } = position.coords;

      const mapInstance = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [longitude, latitude],
        zoom: 14,
      });

      setMap(mapInstance);

      // Add directions control
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/cycling",
        controls: {
          instructions: false,
        },
      });
      mapInstance.addControl(directions, "top-left");

      // Add user location marker with custom icon
      const customMarkerElement = document.createElement("div");
      customMarkerElement.className = "custom-marker";
      customMarkerElement.style.backgroundImage = `url(${user_marker})`;
      customMarkerElement.style.width = "64px";
      customMarkerElement.style.height = "64px";

      const userMarker = new mapboxgl.Marker({
        element: customMarkerElement,
        draggable: false,
      })
        .setLngLat([longitude, latitude])
        .addTo(mapInstance);

      // Fetch Santander bike point data from API
      const response = await axios.get(
        "http://localhost:5059/santander/bikepoint"
      );
      const bikePointsData = response.data;
      console.log(bikePointsData);

      const markers = bikePointsData.map((bikePoint) => ({
        lat: bikePoint.lat,
        lon: bikePoint.lon,
        id: bikePoint.id,
        commonName: bikePoint.commonName,
        placeType: bikePoint.placeType,
        nbBikes: bikePoint.additionalProperties.find(
          (prop) => prop.key === "NbBikes"
        ).value,
        nbEmptyDocks: bikePoint.additionalProperties.find(
          (prop) => prop.key === "NbEmptyDocks"
        ).value,
        nbDocks: bikePoint.additionalProperties.find(
          (prop) => prop.key === "NbDocks"
        ).value,
      }));

      setMarkersData(markers);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeMap();
  }, []);

  useEffect(() => {
    if (!map) return; // Make sure map is loaded before adding markers
    markersData.forEach((markerData) => {
      const { lat, lon, commonName, nbBikes, nbEmptyDocks, nbDocks } =
        markerData;

      if (lat !== undefined && lon !== undefined) {
        const coordinates = [lon, lat];
        console.log(coordinates);
        const customMarkerElement = document.createElement("div");
        customMarkerElement.className = "custom-marker";
        customMarkerElement.style.backgroundImage = `url(${santander_small})`;
        customMarkerElement.style.width = "32px"; // Adjust size as needed
        customMarkerElement.style.height = "32px"; // Adjust size as needed

        const marker = new mapboxgl.Marker({
          element: customMarkerElement,
          draggable: false,
        })
          .setLngLat(coordinates)
          .addTo(map);

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div class="santander_pop-up">
           <div class="santander_pop-up_title">
           <h4><img class="santander_pop-up_title_img"src=${santander_small}/> Santander</h4>
              <p>${commonName}</p>
            </div>
            <div class="santander_pop-up_items">
              <p class="santander_pop-up_items_item"> <span>Available Bikes:</span> ${nbBikes}</p>
              <p class="santander_pop-up_items_item"><span>Empty Spaces:</span> ${nbEmptyDocks}</p>
              <p class="santander_pop-up_items_item"><span>Total Docks:</span> ${nbDocks}</p>
            </div>
          </div>`
        );

        marker.setPopup(popup);
      } else {
        console.log(`Skipping marker with undefined lat or lon: ${markerData}`);
      }
    });
  }, [markersData, map]);

  return (
    <div>
      {isLoading && <p>Loading bike points...</p>}
      {error && <p>Error: {error.message}</p>}
      <div id="map" style={{ height: "79vh" }} />
    </div>
  );
};

export default SantanderFinder;
