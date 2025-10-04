import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function DraggableMarker({ position, onDragEnd }) {
  const [pos, setPos] = useState(position);
  const markerRef = useRef(null);

  useEffect(() => setPos(position), [position]);

  useMapEvents({
    click(e) {
      setPos([e.latlng.lat, e.latlng.lng]);
      onDragEnd(e.latlng.lat, e.latlng.lng);
    },
  });

  return (
    <Marker
      position={pos}
      icon={DefaultIcon}
      draggable
      eventHandlers={{
        dragend() {
          const m = markerRef.current;
          if (m) {
            const latlng = m.getLatLng();
            setPos([latlng.lat, latlng.lng]);
            onDragEnd(latlng.lat, latlng.lng);
          }
        },
      }}
      ref={markerRef}
    />
  );
}

function FlyTo({ coords, zoom = 10 }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, zoom, { duration: 1.2 });
  }, [coords, map, zoom]);
  return null;
}

export default function MapPicker({ center = [24.8607, 67.0011], onChange }) {
  return (
    <div className="w-full h-125 rounded-2xl overflow-hidden shadow-lg z-5">
      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker
          position={center}
          onDragEnd={(lat, lon) => onChange(lat, lon)}
        />
        <FlyTo coords={center} zoom={8} />
      </MapContainer>
    </div>
  );
}
