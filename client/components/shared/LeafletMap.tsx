"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
}

interface LeafletMapProps {
  locations: Location[];
}

const LeafletMap: React.FC<LeafletMapProps> = ({ locations }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView([0, 0], 2);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);
      }

      const map = mapRef.current;

      // Clear existing markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Add markers for each location
      locations.forEach((location) => {
        L.marker(location.coordinates).addTo(map).bindPopup(location.name);
      });

      // Fit the map to show all markers
      if (locations.length > 0) {
        const bounds = L.latLngBounds(locations.map((loc) => loc.coordinates));
        map.fitBounds(bounds);
      }
    }
  }, [locations]);

  return <div id="map" style={{ height: "100%", width: "100%" }} />;
};

export default LeafletMap;
