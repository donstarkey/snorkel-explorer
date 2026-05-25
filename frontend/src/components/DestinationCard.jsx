import BaseDestinationCard from "./BaseDestinationCard";

import { Link } from "react-router-dom";

export default function DestinationCard({ destination }) {

  // Debug log
  console.log("CARD RECEIVED DESTINATION:", destination);

  // Resolve image whether it's a string or object
  const resolveImage = (img) => {
    if (!img) return null;
    if (typeof img === "string") return img;
    if (typeof img === "object") return img.url || null;
    return null;
  };

  const { primary, heroImages } = BaseDestinationCard(destination);


  // Primary image
 /*  const primary = resolveImage(destination?.primaryImage);
console.warn("**primary resolved = ", primary);
  // Hero images
  const heroImages = Array.isArray(destination?.heroImages)
    ? destination.heroImages.map(resolveImage)
    : []; */

  return (
    <div
      style={{
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "20px",
        background: "#fafafa"
      }}
    >

      {/* PRIMARY IMAGE */}
      
      
      {primary && (
        <Link to={`/destinations/${destination.id}`}>
          <img
            src={primary}
            alt={destination.name}
            style={{ width: "300px", height: "200px", background: "yellow", border: "3px solid red" }}

          />
        </Link>
      )}

      {/* HERO IMAGES STACKED */}
      {heroImages.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {heroImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${destination.name} hero ${i + 1}`}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "8px",
                background: "#ddd"
              }}
            />
          ))}
        </div>
      )}

      {/* INFO */}
      <div style={{ marginTop: "12px" }}>
        <h2 style={{ margin: 0 }}>{destination.name}</h2>
        <p style={{ margin: "4px 0 0 0" }}>{destination.country}</p>
      </div>

    </div>
  );
}
