import React from "react";
import { Link } from "react-router-dom";
import getDestinationImages, { Destination } from "./BaseDestinationCard";
// Replace the inline const videoMap = { ... } with this import
import { videoMap } from "../data/videoMap";

interface Top10CardProps {
  destination: Destination;
  rank: number;
  onImageClick?: (images: string[], startIndex: number) => void;
}

export default function Top10Card({ destination, rank, onImageClick }: Top10CardProps) {
  const { primary, heroImages } = getDestinationImages(destination);
  const videoIds = videoMap[Number(destination.id)] ?? [];

  const allImages = [
    ...(primary ? [primary] : []),
    ...heroImages,
  ];

  return (
    <div className="top10-card">
      <div className="rank-badge">{rank}</div>

      <img
        src={primary ?? ""}
        alt={destination.name}
        className="primary-image"
        onClick={() => onImageClick?.(allImages, 0)}
      />

      <Link to={`/destinations/${destination.id}`} className="top10-link">
        <h2>{destination.name}</h2>
        <p>{destination.country}</p>
      </Link>

      {/* VIDEO SECTION */}
      {videoIds.length > 0 ? (
        <div className="video-thumbnails">
          {videoIds.map((id) => (
            <a
              key={id}
              href={`https://youtu.be/${id}`}
              target="_blank"
              rel="noreferrer"
              className="video-thumbnail-link"
            >
              <div className="video-thumbnail-wrapper">
                <img
                  src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                  alt={`${destination.name} snorkel video`}
                  className="video-thumbnail-img"
                />
                <div className="video-play-overlay">▶</div>
              </div>
              <span className="video-yt-label">Watch on YouTube</span>
            </a>
          ))}
        </div>
      ) : (
        <div className="video-coming-soon">
          <div className="video-coming-soon-icon">🤿</div>
          <p className="video-coming-soon-title">Video guide coming soon</p>
          <p className="video-coming-soon-sub">
            We're heading to {destination.name} — subscribe to be the first to see it.
          </p>
          <a
            href="https://www.youtube.com/@SnorkelExplorer"
            target="_blank"
            rel="noreferrer"
            className="video-coming-soon-cta"
          >
            Subscribe on YouTube →
          </a>
        </div>
      )}
    </div>
  );
}
