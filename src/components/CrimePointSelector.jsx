import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

const CrimePointSelector = ({ onLocationSelect }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // To store map instance
  const markerRef = useRef(null); // To store marker instance
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            const userLoc = { lng: longitude, lat: latitude };
            setUserLocation(userLoc);

            const mapInstance = new mapboxgl.Map({
              container: mapContainerRef.current,
              style: "mapbox://styles/mapbox/streets-v11",
              center: [userLoc.lng, userLoc.lat],
              zoom: 14,
            });

            mapRef.current = mapInstance; // Store the map instance

            // Handle click event to select location
            mapInstance.on("click", (e) => {
              const { lng, lat } = e.lngLat;
              console.log("Selected location:", lng, lat);

              // Remove the previous marker if it exists
              if (markerRef.current) {
                markerRef.current.remove();
              }

              // Add a new marker at the clicked location
              markerRef.current = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(mapInstance);

              // Pass selected location to the parent component
              onLocationSelect({ lng, lat });
            });
          },
          (error) => {
            console.error("Location error:", error);
          }
        );
      }
    }
  }, [onLocationSelect]);

  return (
    <div>
      <div
        ref={mapContainerRef}
        className="w-full h-[150px] border"
        style={{ position: "relative" }}
      >
        {!userLocation && (
          <div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50"
            style={{ zIndex: 10 }}
          >
            Loading Map...
          </div>
        )}
      </div>
    </div>
  );
};

export default CrimePointSelector;