import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { resolveImage } from "../utils/imageResolver";
import { getDestination } from "../api/client";
import ImageCarousel from "../components/ImageCarousel";
import ImageModal from "../components/ImageModal";
import ConditionsTab from "../components/ConditionsTab";
import SnorkelMap from "../components/SnorkelMap";
import VideoEmbed from "../components/VideoEmbed";

// Add this import alongside the others at the top
import { videoMap } from "../data/videoMap"; // serving youtube videos
import "../styles/DestinationDetails.css";
import "../styles/QuickLinkTabs.css";


export default function DestinationDetails() {
  const { id } = useParams();
  const [tab, setTab] = useState("overview");

  //new modal code
  const [modalIndex, setModalIndex] = useState(null);
  const [modalImages, setModalImages] = useState([]);

  const openModal = (images, startIndex) => {
    setModalImages(images);
    setModalIndex(startIndex);
  };

  const closeModal = () => setModalIndex(null);

  const navigateModal = (i) => {
    if (i < 0) i = modalImages.length - 1;
    if (i >= modalImages.length) i = 0;
    setModalIndex(i);
  };


  const { data: destination, isLoading, error } = useQuery({
    queryKey: ["destination", id],
    queryFn: () => getDestination(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !destination) return <p>Failed to load destination.</p>;

  // Extract images
  const primary = destination.images?.find(i => i.type === "Primary")?.url;

  const heroes = destination.images
    ?.filter(i => i.type === "Hero")
    .map(i => resolveImage(i.url)) || [];

  const gallery = destination.images
    ?.filter(i => i.type === "Gallery")
    .map(i => resolveImage(i.url)) || [];

  const videoIds = videoMap[destination.id] ?? [];

  return (
    <div className="details-container fade-in">

      {/* QUICK ICON BAR */}
      <div className="quick-icons">
        <button onClick={() => setTab("overview")}>
          <span className="qi-icon">🛈</span>
          Overview
        </button>

        <button onClick={() => setTab("videos")}>
          <span className="qi-icon">🎬</span>
          Videos
          {
            <button onClick={() => setTab("videos")}>
              <span className="qi-icon">🎬</span>
              Videos
              {videoIds.length > 0
                ? <span className="video-badge">{videoIds.length}</span>
                : <span className="video-badge video-badge--soon">•</span>
              }
            </button>

          }
        </button>


        <button onClick={() => setTab("conditions")}>
          <span className="qi-icon">🌤</span>
          Conditions
        </button>

        <button onClick={() => setTab("sites")}>
          <span className="qi-icon">📍</span>
          Sites
        </button>

        <button onClick={() => window.location.href = "/map"}>
          <span className="qi-icon">🗺️</span>
          Map
        </button>

        <button onClick={() => setTab("reports")}>
          <span className="qi-icon">📝</span>
          Reports
        </button>
      </div>

      {/* PRIMARY HERO */}
      <div className="primary-hero-wrapper">
        <img
          src={resolveImage(primary)}
          alt={destination.name}
          className="details-hero"
        />
      </div>

      {/* TABS */}
      <div className="details-tabs">
        <button onClick={() => setTab("overview")} className={tab === "overview" ? "active" : ""}>Overview</button>
        <button onClick={() => setTab("showcase")} className={tab === "showcase" ? "active" : ""}>Showcase</button>
        <button onClick={() => setTab("gallery")} className={tab === "gallery" ? "active" : ""}>Gallery</button>
        <button onClick={() => setTab("videos")} className={tab === "videos" ? "active" : ""}>
          Videos
          {
            videoIds.length > 0
              ? <span className="video-badge">{videoIds.length}</span>
              : <span className="video-badge video-badge--soon">•</span>
          }
        </button>

        <button onClick={() => setTab("fish")} className={tab === "fish" ? "active" : ""}>FishLife</button>
        <button onClick={() => setTab("conditions")} className={tab === "conditions" ? "active" : ""}>Conditions</button>
        <button onClick={() => setTab("reports")} className={tab === "reports" ? "active" : ""}>Reports</button>
        <button onClick={() => setTab("sites")} className={tab === "sites" ? "active" : ""}>Sites</button>
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <div className="tab-content fade-in">
          <h1 className="details-title">{destination.name}</h1>
          <p className="details-description">{destination.description}</p>

          {destination.guide && (
            <div className="details-section">
              <div className="guide-notes-header">
                <h2>Guide Notes</h2>
                <button onClick={() => setTab("videos")}>
                  🎬 Watch Videos →
                </button>
              </div>
              <p>{destination.guide}</p>
            </div>
          )}
        </div>
      )}

      {/* SHOWCASE */}
      {tab === "showcase" && (
        <div className="tab-content fade-in">
          <h2>Showcase</h2>

          <ImageCarousel
            images={heroes.map(url => ({ url }))}
            autoScroll={true}
            scrollDelay={4500}
            showThumbnails={false}
            onImageClick={(i) => openModal(heroes.map(url => ({ url })), i)}
          />
        </div>
      )}

      {/* GALLERY */}
      {tab === "gallery" && (
        <div className="tab-content fade-in">
          <h2>Gallery</h2>

          <ImageCarousel
            images={gallery.map(url => ({ url }))}
            autoScroll={true}
            scrollDelay={3500}
            showThumbnails={true}
            onImageClick={(i) => openModal(gallery.map(url => ({ url })), i)}
          />
        </div>
      )}

      {/* VIDEOS */}
      {tab === "videos" && (
        <div className="tab-content fade-in">
          {videoIds.length > 0
            ? videoIds.map(id => (
              <VideoEmbed
                key={id}
                videoId={id}
                title={`${destination.name} — Snorkel Explorer`}
                destinationName={destination.name}
              />
            ))
            : <VideoEmbed videoId={null} destinationName={destination.name} />
          }
        </div>
      )}


      {/* FISHLIFE */}
      {tab === "fish" && (
        <div className="tab-content fade-in">
          <h2>FishLife Score</h2>
          <p><strong>Score:</strong> {destination.fishLife?.score}</p>
          <p>{destination.fishLife?.notes}</p>
        </div>
      )}

      {/* CONDITIONS */}
      {tab === "conditions" && (
        <div className="tab-content fade-in">
          <ConditionsTab destination={destination} />
        </div>
      )}

      {/* REPORTS */}
      {tab === "reports" && (
        <div className="tab-content fade-in">
          <h2>Recent Reports</h2>
          {destination.reports?.map((r, i) => (
            <div key={i} className="report-card">
              <p><strong>{r.userName}</strong></p>
              <p>{r.reportText}</p>
              <p className="report-date">{new Date(r.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* SITES */}
      {/* SITES */}
      {tab === "sites" && (
        <div className="tab-content fade-in sites-tab">
          <h2>Snorkel Sites</h2>

          {/* GRID OF SITE CARDS */}
          <div className="sites-grid">
            {destination.sites?.map((site, i) => (
              <div key={i} className="site-card">
                <h3>{site.name}</h3>
                <p>{site.description}</p>

                <div className="site-meta">
                  <p><strong>Difficulty:</strong> {site.difficulty || "—"}</p>
                  <p><strong>Depth:</strong> {site.depth} ft</p>
                  <p><strong>Visibility:</strong> {site.visibility} ft</p>
                </div>
              </div>
            ))}
          </div>

          {/* MAP OF SNORKEL SITES */}
          {destination.sites?.length > 0 && (
            <section className="sites-map-section">
              <h2>Map of Snorkel Sites</h2>

              <SnorkelMap
                center={{
                  lat: destination.sites[0].latitude,
                  lng: destination.sites[0].longitude,
                }}
                sites={destination.sites}
              />
            </section>
          )}
        </div>
      )}


      {/* MODAL img on click */}
      {modalIndex !== null && (
        <ImageModal
          images={modalImages}
          index={modalIndex}
          onClose={closeModal}
          onNavigate={navigateModal}
        />
      )}

    </div>
  );
}
