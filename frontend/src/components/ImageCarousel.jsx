import { useState, useRef } from "react";
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
  const containerRef = useRef(null);

  useAutoScrollCarousel({
    enabled: autoScroll,
    delay: scrollDelay,
    itemCount: images.length,
    pauseSignal: isPaused,
    onIndexChange: (i) => {
      setIndex(i);
      containerRef.current?.children[i]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    },
  });

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel" ref={containerRef}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt=""
            className="carousel-image"
            onClick={() => {
                if (onImageClick) {
                    setPaused(true);
                    onImageClick(i);
                }
            }}

          />
        ))}
      </div>

      {showThumbnails && (
        <div className="thumb-strip">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.url}
              className={`thumb ${i === index ? "active" : ""}`}
              onClick={() => {
                setIndex(i);
                containerRef.current?.children[i]?.scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "nearest",
                });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
