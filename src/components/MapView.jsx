"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import toast, { Toaster } from 'react-hot-toast'; // Import toast

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API;

const MapView = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  
  const initializeMap = (userLoc) => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [userLoc.lng, userLoc.lat], // Use [longitude, latitude]
      zoom: 14, // Higher zoom level for walking navigation
    });

    const directionsControl = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/walking",
      controls: {
        inputs: false,
        instructions: false,
      },
    });

    mapInstance.addControl(directionsControl, "top-left");
    setMap(mapInstance);

    // Set the user's starting point
    directionsControl.setOrigin([userLoc.lng, userLoc.lat]);

    // Listen for the destination change event
    directionsControl.on('route', () => {
      // Show toast notifications after the destination is selected
      showToastNotifications();
    });
  };

  const showToastNotifications = () => {
    // Display two toast messages
    toast("⚠️ Yesterday, a robbery was reported near your destination.", {
      duration: 5000, // Duration of the toast
      position: 'top-right', // Position of the toast
      className: 'bg-red-500 text-white', // Tailwind CSS classes for styling
    });

    toast("⚠️ A vandalism incident was reported nearby recently.", {
      duration: 5000, // Duration of the toast
      position: 'top-right', // Position of the toast
      className: 'bg-yellow-500 text-white', // Tailwind CSS classes for styling
    });
  };

  const setUserLoc = (position) => {
    const { longitude, latitude } = position.coords;
    const userLoc = { lng: longitude, lat: latitude };
    setUserLocation(userLoc); // Store the user's location
    initializeMap(userLoc);
  };

  const handleLocationError = (error) => {
    console.error("Location error:", error);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        setUserLoc,
        handleLocationError
      );
    } else {
      console.error("Failed to get user location!");
    }
  }, []);

  return (
    <div>
      <Toaster /> {/* Include the Toaster component */}
      <div
        ref={mapContainerRef}
        className="w-full h-[400px] overflow-hidden"
      />
    </div>
  );
};

export default MapView;