import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import axios from "axios";

import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const SantanderFinder = () => {
  const [map, setMap] = useState(null);
  const [showUserPopup, setShowUserPopup] = useState(true);
  const [markersData, setMarkersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initializeMap = async () => {
    setIsLoading(true);
    setError(null);

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

      // Add user location marker
      const userMarker = new mapboxgl.Marker({
        color: "red",
        draggable: false,
      })
        .setLngLat(userLocation)
        .addTo(mapInstance);

      // Add user marker to markersData if popup is desired
      if (showUserPopup) {
        markersData.push({
          coordinates: userLocation,
          popupContent: "Your Location",
        });
      }
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
    markersData.forEach((markerData) => {
      const {
        lat,
        lon,
        id,
        commonName,
        placeType,
        nbBikes,
        nbEmptyDocks,
        nbDocks,
      } = markerData;

      if (lat !== undefined && lon !== undefined) {
        const coordinates = [lon, lat];
        console.log(coordinates);
        const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${commonName}</h3><p>ID: ${id}</p><p>Place Type: ${placeType}</p><p>Bikes: ${nbBikes}</p>
          <p>Empty Docks: ${nbEmptyDocks}</p>
          <p>Total Docks: ${nbDocks}</p>`
        );

        marker.setPopup(popup);
      } else {
        console.log(`Skipping marker with undefined lat or lon: ${markerData}`);
      }
    });
  }, [markersData]);

  return (
    <div>
      {isLoading && <p>Loading bike points...</p>}
      {error && <p>Error: {error.message}</p>}
      <div id="map" style={{ height: "80vh" }} />
    </div>
  );
};

export default SantanderFinder;
