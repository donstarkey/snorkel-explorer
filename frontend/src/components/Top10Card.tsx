import React from "react";
import { Link } from "react-router-dom";
import getDestinationImages, { Destination } from "./BaseDestinationCard";

interface Top10CardProps {
  destination: Destination;
  rank: number;
  onImageClick?: (images: string[], startIndex: number) => void;
}

export default function Top10Card({ destination, rank, onImageClick }: Top10CardProps) {
  const { primary, heroImages } = getDestinationImages(destination);

  const allImages = [
    ...(primary ? [primary] : []),
    ...heroImages
  ];

  return (
    <div className="top10-card">
      <div className="rank-badge">{rank}</div>

      {/* IMAGE CLICK → MODAL */}
      <img
        src={primary ?? ""}
        alt={destination.name}
        className="primary-image"
        onClick={() => onImageClick?.(allImages, 0)}
      />

      {/* TITLE CLICK → DETAILS PAGE */}
      <Link to={`/destination/${destination.id}`} className="top10-link">
        <h2>{destination.name}</h2>
        <p>{destination.country}</p>
      </Link>
    </div>
  );
}
