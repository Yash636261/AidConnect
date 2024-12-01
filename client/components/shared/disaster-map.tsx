'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'

// Fix for default marker icon in production build

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: '/marker-icon-2x.png',
//   iconUrl: '/marker-icon.png',
//   shadowUrl: '/marker-shadow.png',
// })

interface Location {
  id: number;
  lat: number;
  lng: number;
  urgencyLevel: string;
  needs: string[];
}

interface DisasterMapProps {
  locations: Location[];
}

export default function DisasterMap({ locations }: DisasterMapProps) {
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
    <MapContainer center={[13.0827, 80.2707]} zoom={11} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location) => (
        <Marker key={location.id} position={[location.lat, location.lng]}>
          <Popup>
            <div>
              <h3 className="font-bold">Location ID: {location.id}</h3>
              <p>Urgency: {location.urgencyLevel}</p>
              <p>Needs: {location.needs.join(', ')}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

