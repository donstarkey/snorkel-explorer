import React, { useState } from "react";

interface ImageCarouselProps {
  images: string[];
  height?: number;
}

export default function ImageCarousel({
  images,
  height = 220
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height,
          background: "#eee",
          borderRadius: "8px"
        }}
      />
    );
  }

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        borderRadius: "8px"
      }}
    >
      {/* Image */}
      <img
        src={images[index]}
        alt={`Slide ${index}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />

      {/* Prev Button */}
      <button
        onClick={prev}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.4)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          cursor: "pointer"
        }}
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={next}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.4)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          cursor: "pointer"
        }}
      >
        ›
      </button>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "6px"
        }}
      >
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: i === index ? "white" : "rgba(255,255,255,0.5)",
              cursor: "pointer"
            }}
          />
        ))}
      </div>
    </div>
  );
}
