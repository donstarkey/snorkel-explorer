import { useEffect, useState } from "react";
import { getDestinations } from "../api/client";

const API_BASE = "http://localhost:5000";

// Defensive image resolver
function resolveImage(path) {
  if (!path) return `${API_BASE}/images/placeholder.jpg`;

  // Ensure leading slash
  if (!path.startsWith("/")) path = "/" + path;

  // Ensure extension
  const hasExt = path.match(/\.(jpg|jpeg|png|webp)$/i);
  if (!hasExt) path += ".jpg";

  return `${API_BASE}${path}`;
}

export default function FeaturedCarousel() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getDestinations().then((data) => {
      setItems(data.slice(0, 5)); // first 5 featured
    });
  }, []);

  return (
    <div className="carousel">
      {items.map((dest) => (
        <div key={dest.id} className="carousel-item">
          <img
            src={resolveImage(dest.primaryImage)}
            alt={dest.name}
            loading="lazy"
            className="carousel-img"
            onError={(e) =>
              (e.target.src = `${API_BASE}/images/placeholder.jpg`)
            }
          />
          <h3>{dest.name}</h3>
          <p>{dest.country}</p>
        </div>
      ))}
    </div>
  );
}

