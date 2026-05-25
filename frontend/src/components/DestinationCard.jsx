import { useNavigate } from "react-router-dom";
import BaseDestinationCard from "./BaseDestinationCard";
import ImageCarousel from "./ImageCarousel";
import { videoMap } from "../data/videoMap";
import "../styles/DestinationCard.css";

export default function DestinationCard({ destination }) {
  const navigate = useNavigate();
  const { primary, heroImages } = BaseDestinationCard(destination);
  const videoIds = videoMap[Number(destination.id)] ?? [];

  // Primary first, then heroes
  const carouselImages = [
    ...(primary ? [{ url: primary }] : []),
    ...heroImages.map(url => ({ url })),
  ];

  return (
    <div className="destination-card">

      {/* CAROUSEL — click image navigates to detail */}
      <div className="destination-card-media">
        <ImageCarousel
          images={carouselImages}
          autoScroll={true}
          scrollDelay={4000}
          showThumbnails={false}
          onImageClick={() => navigate(`/destinations/${destination.id}`)}
        />
      </div>

      {/* INFO ROW */}
      <div
        className="destination-card-info"
        onClick={() => navigate(`/destinations/${destination.id}`)}
      >
        <div>
          <h2 className="destination-card-name">{destination.name}</h2>
          <p className="destination-card-country">{destination.country}</p>
        </div>

        {/* VIDEO BADGE */}
        {videoIds.length > 0
          ? <span className="video-badge">{videoIds.length} 🎬</span>
          : <span className="video-badge video-badge--soon">•</span>
        }
      </div>

    </div>
  );
}
