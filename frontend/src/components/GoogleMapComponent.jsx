import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 18.5204, // Pune Latitude
  lng: 73.8567, // Pune Longitude
};

const locations = [
  { lat: 18.5304, lng: 73.8667 }, // Nearby Farmer 1
  { lat: 18.5104, lng: 73.8467 }, // Nearby Farmer 2
];

const GoogleMapComponent = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCdDlf9xmFGCGsAvj7Nq6VlQagpQhqqNHs">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {locations.map((loc, index) => (
          <Marker key={index} position={loc} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
