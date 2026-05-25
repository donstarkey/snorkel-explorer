import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getDestinations } from "../api/client";
import { resolveImage } from "../utils/imageResolver";
import "../styles/FeaturedCarousel.css";

export default function FeaturedCarousel() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["destinations", "featured"],
    queryFn: getDestinations,
    staleTime: 1000 * 60 * 5,
  });

  const featured = items.slice(0, 5);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (featured.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % featured.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [featured.length]);

  if (isLoading) {
    return <p>Loading featured destinations…</p>;
  }

  return (
    <div className="featured-carousel fade-in">
      {featured.map((dest, i) => {
        const heroImages = [
          dest.primaryImage,
          ...dest.images
            .filter((img) => img.type === "Hero")
            .map((img) => img.url),
        ];

        return (
          <div
            key={dest.id}
            className="featured-item fade-in-stagger"
            style={{ display: i === index ? "block" : "none" }}
          >
            <Link to={`/destinations/${dest.id}`}>
              <img
                src={resolveImage(heroImages[0])}
                alt={dest.name}
                className="featured-img"
                loading="lazy"
              />
            </Link>

            <Link to={`/destinations/${dest.id}`} className="featured-title-link">
              <h3>{dest.name}</h3>
            </Link>

            <p>{dest.country}</p>
          </div>
        );
      })}
    </div>
  );
}
