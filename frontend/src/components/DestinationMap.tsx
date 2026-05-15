import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Destination } from "../types/Destination";

interface Props {
  destination: Destination;
}

export const DestinationMap: React.FC<Props> = ({ destination }) => {
  const sites = destination.sites.filter(
    s => s.latitude !== null && s.longitude !== null
  );

  if (sites.length === 0) {
    return <p>No map data available for this destination.</p>;
  }

  const center: [number, number] = [
    sites[0].latitude as number,
    sites[0].longitude as number,
  ];

  const openInGoogleMaps = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ height: 400, width: "100%", marginBottom: "1.5rem" }}>
      <MapContainer center={center} zoom={11} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {sites.map((site, idx) => (
          <Marker
            key={idx}
            position={[site.latitude as number, site.longitude as number]}
          >
            <Popup>
              <strong>{site.name}</strong>
              <br />
              {site.description}
              <br />
              Difficulty: {site.difficulty || "N/A"}
              <br />
              <button
                style={{ marginTop: "0.5rem" }}
                onClick={() =>
                  openInGoogleMaps(site.latitude as number, site.longitude as number)
                }
              >
                Open in Google Maps
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
