import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

// Default center (Pune)
const defaultCenter = { lat: 18.5204, lng: 73.8567 };

// Sample farmer locations
const farmers = [
  { id: 1, lat: 18.6298, lng: 73.7997 },
  { id: 2, lat: 18.3104, lng: 73.6467 },
  { id: 3, lat: 18.8404, lng: 73.3367 },
];

// Haversine formula to calculate distance between two coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const GoogleMapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCdDlf9xmFGCGsAvj7Nq6VlQagpQhqqNHs",
  });

  const [userLocation, setUserLocation] = useState(null);
  const [nearbyFarmers, setNearbyFarmers] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User Location:", latitude, longitude);
          setUserLocation({ lat: latitude, lng: longitude });

          // Filter farmers within 20km radius
          const filteredFarmers = farmers.filter((farmer) => {
            const distance = getDistance(latitude, longitude, farmer.lat, farmer.lng);
            return distance <= 20;
          });

          console.log("Nearby Farmers:", filteredFarmers);
          setNearbyFarmers(filteredFarmers);
        },
        (error) => console.error("Error getting location:", error)
      );
    } else {
      console.error("Geolocation not supported.");
    }
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  if (!userLocation) return <div>Fetching location...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={userLocation || defaultCenter} zoom={12}>
      {/* User Location Marker (Blue) */}
      <Marker
        position={userLocation}
        label="You"
        icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        }}
      />

      {/* Nearby Farmers Markers (Red) */}
      {nearbyFarmers.map((farmer) => (
        <Marker 
          key={farmer.id} 
          position={{ lat: farmer.lat, lng: farmer.lng }} 
          title={`Farmer ${farmer.id}`} 
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
