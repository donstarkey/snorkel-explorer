import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Top10Card from "../components/Top10Card";
import ImageModal from "../components/ImageModal";
import { getDestinations } from "../api/client";
import "../styles/Top10.css";

//import { getDestinations } from "../api/destinations"; // adjust path if needed

export default function Top10() {
  const { data: destinations = [] } = useQuery({
    queryKey: ["destinations"],
    queryFn: getDestinations
  });

  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (images, index) => {
    setModalImages(images);
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const navigateModal = (newIndex) => {
    if (newIndex < 0) return;
    if (newIndex >= modalImages.length) return;
    setModalIndex(newIndex);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Top Snorkel Destinations</h1>

      <div className="top10-grid">
        {destinations.map((d, i) => (
          <Top10Card
            key={d.id}
            destination={d}
            rank={i + 1}
            onImageClick={openModal}
          />
        ))}
      </div>

      {isModalOpen && (
        <ImageModal
          images={modalImages}
          index={modalIndex}
          onClose={() => setIsModalOpen(false)}
          onNavigate={navigateModal}
        />
      )}
    </div>
  );
}
