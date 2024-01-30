import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import axios from "axios";

import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "../partials/_bikestoragefinder.scss";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const BikeStorageFinder = () => {
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
        zoom: 17,
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

      // Fetch bike storage data
      const response = await axios.get(
        "http://localhost:5059/bikestorage/borough/hackney"
      );
      const bikeStorageData = response.data;
      console.log(bikeStorageData);

      const markers = bikeStorageData.features.map((feature) => ({
        lat: feature.lat,
        lon: feature.lon,
        id: feature.FEATURE_ID,
        parking_provision: feature.PRK_PROVIS,
        parking_capacity: feature.PRK_CPT,
        photo_1: feature.PHOTO1_URL,
        photo_2: feature.PHOTO2_URL,
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
        parking_provision,
        parking_capacity,
        photo_1,
        photo_2,
      } = markerData;

      if (lat !== undefined && lon !== undefined) {
        const coordinates = [lon, lat];
        console.log(coordinates);
        const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>ID: ${id}</h3><p>Parking Provision: ${parking_provision}</p><p>Parking Capacity: ${parking_capacity}</p><p className="pop-up_img"><img src="${photo_1}"></p><p className="pop-up_img"><img src="${photo_2}"></p>`
        );

        marker.setPopup(popup);
      } else {
        console.log(`Skipping marker with undefined lat or lon: ${markerData}`);
      }
    });
  }, [markersData]);

  return (
    <div>
      {isLoading && <p>Loading Bike Storage...</p>}
      {error && <p>Error: {error.message}</p>}
      <div id="map" style={{ height: "80vh" }} />
    </div>
  );
};

export default BikeStorageFinder;
