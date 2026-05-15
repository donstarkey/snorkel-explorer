import { useEffect, useState } from "react";
import { getDestinations } from "../api/client";
import DestinationCard from "../components/DestinationCard";
import "../styles/Destinations.css";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    getDestinations()
      .then(setDestinations)
      .catch(err => console.error("Failed to load destinations:", err));
  }, []);

  return (
    <div className="destinations fade-in">
      <h1 className="fade-in-slow">Destinations</h1>

      <div className="grid fade-in-stagger">
        {destinations.map((d) => (
          <DestinationCard
            key={d.id}
            destination={d}
            className="fade-in"
          />
        ))}
      </div>

      {destinations.length === 0 && (
        <p className="no-results fade-in">No destinations found.</p>
      )}
    </div>
  );
}
