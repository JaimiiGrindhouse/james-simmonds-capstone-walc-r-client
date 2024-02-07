import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { useParams } from "react-router-dom";
import user_marker from "../assets/icons/map_marker.png"; // Import the custom marker icon
import bike_park_marker from "../assets/icons/bike_parking_bg_rmvd_sml.png"; // Import the custom bike park marker icon
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "../partials/_bikestoragefinder.scss";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const BikeStorageFinder = () => {
  const { borough } = useParams();
  const [map, setMap] = useState(null);
  const [markersData, setMarkersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBorough, setSelectedBorough] = useState(
    borough || "Select your Borough..."
  );

  const boroughs = [
    "Select your Borough...",
    "Hackney",
    "Islington",
    "Camden" /* ... other boroughs */,
  ];

  const handleBoroughChange = (event) => {
    setSelectedBorough(event.target.value);
  };

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
        zoom: 16,
      });

      setMap(mapInstance);

      // Fetch bike storage data
      const response = await axios.get(
        `http://localhost:5059/bikestorage/borough/${selectedBorough}`
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
        .setLngLat(userLocation)
        .addTo(mapInstance);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeMap();
  }, [selectedBorough]);

  useEffect(() => {
    if (!map) return;

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

        // Use custom marker image
        const customMarkerElement = document.createElement("div");
        customMarkerElement.className = "custom-marker";
        customMarkerElement.style.backgroundImage = `url(${bike_park_marker})`;
        customMarkerElement.style.width = "48px"; // Adjust size as needed
        customMarkerElement.style.height = "48px"; // Adjust size as needed

        const marker = new mapboxgl.Marker({
          element: customMarkerElement,
          draggable: false,
        })
          .setLngLat(coordinates)
          .addTo(map);

        const popup = new mapboxgl.Popup({ offset: 35 }).setHTML(
          `<div class="pop-up">
          <div class="pop-up_header">
          <h3>${selectedBorough} </h3>
          </div>
          <div class="pop-up_body">
          <p class="pop-up_body_item"><span>Cycle Provision:</span> ${parking_provision} </p>
          <p class="pop-up_body_item"><span>Cycle Capacity:</span> ${parking_capacity} </p>
          </div>
         
          <p class="popup-image-container">
            <img src="${photo_1}" alt="Photo 1" class="popup-image" />
            <img src="${photo_2}" alt="Photo 2" class="popup-image" />
          </p> `
        );

        marker.setPopup(popup);
      } else {
        console.log(`Skipping marker with undefined lat or lon: ${markerData}`);
      }
    });
  }, [markersData, map]);

  return (
    <div className="map-background">
      {isLoading && <p>Loading Bike Storage...</p>}
      {/* {error && <p>Error: {error.message}</p>} */}
      {/* {error && <p>Select your borough from the dropdown</p>} */}
      <select
        className="borough-select"
        value={selectedBorough}
        onChange={handleBoroughChange}
      >
        {boroughs.map((borough) => (
          <option key={borough} value={borough}>
            {borough}
          </option>
        ))}
      </select>
      <div id="map" style={{ height: "74vh" }} />
    </div>
  );
};

export default BikeStorageFinder;
