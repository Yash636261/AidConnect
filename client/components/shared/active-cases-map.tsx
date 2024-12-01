"use client";

import { useEffect } from "react";
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
  lat: number;
  lng: number;
  urgencyLevel: string;
  needs: string[];
}

interface ActiveCasesMapProps {
  locations: Location[];
}

export default function ActiveCasesMap({ locations }: ActiveCasesMapProps) {
  useEffect(() => {
    // This is needed to properly load the map tiles
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/placeholder.svg?height=41&width=27",
      iconUrl: "/placeholder.svg?height=41&width=27",
      // shadowUrl:
      // "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
    });
  }, []);

  // Calculate the center of the map based on the average of all locations
  const center = locations.reduce(
    (acc, loc) => {
      acc[0] += loc.lat / locations.length;
      acc[1] += loc.lng / locations.length;
      return acc;
    },
    [0, 0]
  );

  return (
    <Card className="w-full p-0 overflow-hidden rounded-2xl">
      <CardContent className="p-0">
        <div className="h-[400px] w-full">
          <MapContainer
            center={center as [number, number]}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={[location.lat, location.lng]}
                icon={customIcon}
              >
                <Popup>
                  <strong>Location ID: {location.id}</strong>
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
}
