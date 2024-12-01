"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Custom pin icon
const customIcon = new L.Icon({
  iconUrl: "/placeholder.svg?height=41&width=27",
  iconRetinaUrl: "/placeholder.svg?height=41&width=27",
  iconSize: [27, 41],
  iconAnchor: [13.5, 41],
  popupAnchor: [0, -41],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Sample data for active cases
const activeCases = [
  { id: 1, lat: 40.7128, lng: -74.006, city: "New York", cases: 1500 },
  { id: 2, lat: 34.0522, lng: -118.2437, city: "Los Angeles", cases: 1200 },
  { id: 3, lat: 41.8781, lng: -87.6298, city: "Chicago", cases: 900 },
  { id: 4, lat: 29.7604, lng: -95.3698, city: "Houston", cases: 800 },
  { id: 5, lat: 33.749, lng: -84.388, city: "Atlanta", cases: 600 },
];

export default function ActiveCasesMap() {
  useEffect(() => {
    // This is needed to properly load the map tiles
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/placeholder.svg?height=41&width=27",
      iconUrl: "/placeholder.svg?height=41&width=27",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
    });
  }, []);

  return (
    <Card className="w-full p-o overflow-hidden">
      <CardContent className="p-0">
        <div className="h-[400px] w-full">
          <MapContainer
            center={[13.0827, 80.2707]}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {activeCases.map((caseData) => (
              <Marker
                key={caseData.id}
                position={[caseData.lat, caseData.lng]}
                icon={customIcon}
              >
                <Popup>
                  <strong>{caseData.city}</strong>
                  <br />
                  Active cases: {caseData.cases}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
