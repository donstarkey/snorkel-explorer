import { useEffect } from "react";
import "../styles/ImageModal.css";

export default function ImageModal({ images, index, onClose, onNavigate }) {

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(index + 1);
      if (e.key === "ArrowLeft") onNavigate(index - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, onClose, onNavigate]);

  const getSrc = (img) =>
    typeof img === "string" ? img : img.url;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <img
          src={getSrc(images[index])}
          alt=""
          className="modal-image"
        />

        <button className="modal-arrow left" onClick={() => onNavigate(index - 1)}>‹</button>
        <button className="modal-arrow right" onClick={() => onNavigate(index + 1)}>›</button>

        <div className="modal-thumbs">
          {images.map((img, i) => (
            <img
              key={i}
              src={getSrc(img)}
              className={`thumb ${i === index ? "active" : ""}`}
              onClick={() => onNavigate(i)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
