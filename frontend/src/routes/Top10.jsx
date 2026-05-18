import { useEffect, useState } from "react";
import DestinationCard from "../components/DestinationCard";
const API = import.meta.env.VITE_API_URL;
import "../styles/Destinations.css"; // shared grid + layout styles

export default function Top10() {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        
        const res = await fetch(API_BASE + "/api/destinations");
        const data = await res.json();
        setList(data);
      } catch (err) {
        console.error("Failed to load Top 10:", err);
      }
    }
    load();
  }, []);

  return (
    <div className="top10 fade-in">
      <h1 className="fade-in-slow">Top 10 Snorkeling Destinations</h1>

      <div className="grid fade-in-stagger">
        {list.map((d, i) => (
          <DestinationCard
            key={d.id}
            destination={d}
            rank={i + 1}
            className="fade-in"
          />
        ))}
      </div>
    </div>
  );
}
