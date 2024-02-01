import React, { useEffect } from "react";

const GeolocationComponent = ({ onLocationChange }) => {
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await fetchUserLocation();
        onLocationChange(location);
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    // Check if there is already data in the state before calling geolocation
    const existingLocation = onLocationChange([]);
    if (!existingLocation) {
      fetchLocation();
    }
  }, [onLocationChange]);

  const fetchUserLocation = async () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve([latitude, longitude]);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  return null; // GeolocationComponent doesn't render anything
};

export default GeolocationComponent;
