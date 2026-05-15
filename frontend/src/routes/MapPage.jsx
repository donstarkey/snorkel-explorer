import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/MapPage.css"; // path for routes folder

// Fix default marker icons (Leaflet quirk)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export default function MapPage() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/destinations")
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.error("Map fetch error:", err));
  }, []);

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[20, -40]} // Atlantic-centered ocean view
        zoom={3}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {destinations.map((d) =>
          d.sites?.map((s, idx) => (
            <Marker key={`${d.id}-${idx}`} position={[s.latitude, s.longitude]}>
              <Popup>
                <div className="popup">
                  <h3>{d.name} — {s.name}</h3>
                  <p>{s.description}</p>
                  <p>
                    <strong>Difficulty:</strong> {s.difficulty} <br />
                    <strong>Depth:</strong> {s.depth} ft |{" "}
                    <strong>Visibility:</strong> {s.visibility} ft
                  </p>
                  <a
                    href={`https://www.google.com/maps?q=${s.latitude},${s.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="google-link"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
}
