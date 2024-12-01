"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Custom pin icon
const customIcon = new L.Icon({
  iconUrl: "https://www.svgrepo.com/show/535493/map-pin.svg",
  iconRetinaUrl: "https://www.svgrepo.com/show/535493/map-pin.svg",
  iconSize: [27, 41],
  iconAnchor: [13.5, 41],
  popupAnchor: [0, -41],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
  urgencyLevel: string;
  needs: string[];
}

interface LeafletMapProps {
  locations: Location[];
}

const LeafletMap: React.FC<LeafletMapProps> = ({ locations }) => {
  useEffect(() => {
    // This is needed to properly load the map tiles
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/placeholder.svg?height=41&width=27",
      iconUrl: "/placeholder.svg?height=41&width=27",
    });
  }, []);

  // Chennai center coordinates
  const chennaiCenter: [number, number] = [13.0827, 80.2707];

  // Mock Chennai locations
  const chennaiLocations: Location[] = [
    {
      id: "1",
      name: "T. Nagar",
      coordinates: [13.0418, 80.2341],
      urgencyLevel: "High",
      needs: ["Food", "Water", "Medical Supplies"],
    },
    {
      id: "2",
      name: "Mylapore",
      coordinates: [13.0368, 80.2676],
      urgencyLevel: "Medium",
      needs: ["Shelter", "Clothing"],
    },
    {
      id: "3",
      name: "Anna Nagar",
      coordinates: [13.0850, 80.2101],
      urgencyLevel: "Low",
      needs: ["Volunteers", "Sanitation"],
    },
    {
      id: "4",
      name: "Adyar",
      coordinates: [13.0012, 80.2565],
      urgencyLevel: "High",
      needs: ["Rescue", "Medical Assistance"],
    },
    {
      id: "5",
      name: "Velachery",
      coordinates: [12.9815, 80.2180],
      urgencyLevel: "Medium",
      needs: ["Food", "Water", "Blankets"],
    },
  ];

  return (
    <Card className="w-full p-0 overflow-hidden rounded-2xl">
      <CardHeader>
        <CardTitle>Chennai Cases Map</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[400px] w-full">
          <MapContainer
            center={chennaiCenter}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {chennaiLocations.map((location) => (
              <Marker
                key={location.id}
                position={location.coordinates}
                icon={customIcon}
              >
                <Popup>
                  <strong>{location.name}</strong>
                  <br />
                  Urgency Level: {location.urgencyLevel}
                  <br />
                  Needs: {location.needs.join(", ")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeafletMap;

