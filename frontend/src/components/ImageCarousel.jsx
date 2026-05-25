import { useState } from "react";
import { useAutoScrollCarousel } from "../hooks/useAutoScrollCarousel";
import "../styles/ImageCarousel.css";

export default function ImageCarousel({
  images,
  autoScroll = true,
  scrollDelay = 4000,
  showThumbnails = false,
  onImageClick,
}) {
  const [index, setIndex] = useState(0);
  const [isPaused, setPaused] = useState(false);

  useAutoScrollCarousel({
    enabled: autoScroll,
    delay: scrollDelay,
    itemCount: images.length,
    pauseSignal: isPaused,
    onIndexChange: setIndex, // ← no more scrollIntoView
  });

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="carousel-slide">
              <img
                src={img.url}
                alt=""
                onClick={() => {
                  if (onImageClick) {
                    setPaused(true);
                    onImageClick(i);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {showThumbnails && (
        <div className="thumb-strip">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.url}
              className={`thumb ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
