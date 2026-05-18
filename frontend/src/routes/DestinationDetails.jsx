import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;
import "../styles/DestinationDetails.css";
import useEmblaCarousel from "embla-carousel-react";

export default function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      setSelectedIndex(index);
    },
    [emblaApi]
  );

  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(fetch(`${API}/api/Destinations/${id}`));
        const data = await res.json();
        setDestination(data);
      } catch (err) {
        console.error("Failed to load destination:", err);
      }
    }
    load();
  }, [id]);

  if (!destination) {
    return <p className="loading fade-in">Loading...</p>;
  }

  return (
    <div className="details-container fade-in">

      {/* HERO */}
      <div className="details-hero-wrapper fade-in-slow">
        <img
          src={`${API_BASE}${destination.primaryImage}`}
          alt={destination.name}
          className="details-hero"
        />
      </div>

      {/* TITLE */}
      <h1 className="details-title fade-in-slow">{destination.name}</h1>

      {/* QUICK FACTS */}
      <div className="quick-facts">
        <div>📍 {destination.name}</div>
        <div>🌊 Avg Depth: {destination.avgDepth ?? "--"} ft</div>
        <div>👁 Visibility: {destination.avgVisibility ?? "--"} ft</div>
        <div>⭐ Difficulty: {destination.difficulty ?? "--"}</div>
      </div>

      {/* TABS */}
      <div className="details-tabs fade-in">
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>📘 Overview</button>
        <button className={activeTab === "fishlife" ? "active" : ""} onClick={() => setActiveTab("fishlife")}>🐟 FishLife</button>
        <button className={activeTab === "storms" ? "active" : ""} onClick={() => setActiveTab("storms")}>⛈ Storms</button>
        <button className={activeTab === "gallery" ? "active" : ""} onClick={() => setActiveTab("gallery")}>🖼 Gallery</button>
        <button className={activeTab === "reports" ? "active" : ""} onClick={() => setActiveTab("reports")}>📝 Reports</button>
        <button className={activeTab === "conditions" ? "active" : ""} onClick={() => setActiveTab("conditions")}>🌤 Conditions</button>
      </div>

      {/* TAB CONTENT */}
      <div className="details-tab-content fade-in">

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="details-section">

            <h2>Overview</h2>
            <p className="details-description">{destination.description}</p>

            {/* SNORKEL SITES */}
            <div className="details-subsection">
              <h3>🪸 Top Snorkel Sites</h3>
              <ul className="dive-list">
                {destination.sites?.map((s, i) => (
                  <li key={i}>
                    <strong>{s.name}</strong> — {s.depth} ft — {s.visibility} ft visibility
                  </li>
                ))}
              </ul>
            </div>

            {/* VIDEOS */}
            <div className="details-subsection">
              <h3>🎥 Videos</h3>
              <div className="video-grid">
                {destination.videos?.map((v, i) => (
                  <iframe key={i} src={v} title={`video-${i}`} loading="lazy"></iframe>
                ))}
              </div>
            </div>

            {/* SPECIES */}
            <div className="details-subsection">
              <h3>🐠 Marine Species</h3>
              <ul className="species-list">
                {destination.species?.map((sp, i) => (
                  <li key={i}>{sp}</li>
                ))}
              </ul>
            </div>

            {/* TRAVEL GUIDE */}
            <div className="details-subsection">
              <h3>📘 Travel Guide</h3>
              <p>{destination.guide}</p>
            </div>

          </div>
        )}

        {/* FISHLIFE TAB */}
        {activeTab === "fishlife" && (
          <div className="details-section">
            <h2>FishLife Score</h2>
            <div className="fishlife-bar">
              <div className="fishlife-bar-fill" style={{ width: `${destination.fishLife?.score ?? 0}%` }}></div>
            </div>
            <p className="fishlife-note">Higher scores indicate healthier, more biodiverse marine ecosystems.</p>
          </div>
        )}

        {/* STORMS TAB */}
        {activeTab === "storms" && (
          <div className="details-section">
            <h2>Storm History</h2>
            {destination.stormHistory?.length > 0 ? (
              <ul className="storm-timeline">
                {destination.stormHistory.map((storm, i) => (
                  <li key={i}><strong>{storm.year}</strong> — {storm.category}</li>
                ))}
              </ul>
            ) : (
              <div className="gallery-empty">No storm history available</div>
            )}
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === "gallery" && (
          <div className="details-section">
            <h2>Photo Gallery</h2>

            {/* ARROWS */}
            <div className="embla-arrows">
              <button className="embla-arrow embla-arrow--prev" onClick={() => emblaApi?.scrollPrev()}>‹</button>
              <button className="embla-arrow embla-arrow--next" onClick={() => emblaApi?.scrollNext()}>›</button>
            </div>

            {destination.gallery?.length > 0 ? (
              <>
                <div className="embla" ref={emblaRef}>
                  <div className="embla__container">
                    {destination.gallery.map((img, i) => (
                      <div className="embla__slide" key={i}>
                        <img
                          //src={`${API_BASE}${img}`}                          
                          src={`${API}${img}`}
                          alt=""
                          className="embla__slide__img"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="embla-thumbs" ref={thumbsRef}>
                  <div className="embla-thumbs__container">
                    {destination.gallery.map((img, i) => (
                      <button
                        key={i}
                        className={`embla-thumbs__slide ${selectedIndex === i ? "is-selected" : ""}`}
                        onClick={() => onThumbClick(i)}
                      >
                        <img
                          src={`${API_BASE}${img}`}
                          alt=""
                          className="embla-thumbs__img"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="gallery-empty">No photos available</div>
            )}
          </div>
        )}

        {/* REPORTS TAB */}
        {activeTab === "reports" && (
          <div className="details-section">
            <h2>Field Reports</h2>
            {destination.reports?.length > 0 ? (
              <ul className="reports-list">
                {destination.reports.map((r, i) => (
                  <li key={i}>
                    <strong>{r.date}</strong> — {r.text}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="gallery-empty">No field reports yet</div>
            )}
          </div>
        )}

        {/* CONDITIONS TAB */}
        {activeTab === "conditions" && (
          <div className="details-section">

            {/* WEATHER */}
            <div className="details-subsection">
              <h3>Current Weather</h3>
              <div className="weather-inline">
                🌤 {destination.weather?.temp ?? "--"}°F |
                💨 {destination.weather?.wind ?? "--"} mph |
                🌊 {destination.weather?.waterTemp ?? "--"}°F |
                🔆 UV {destination.weather?.uv ?? "--"}
              </div>
            </div>

            {/* BEST TIME TO VISIT */}
            <div className="details-subsection">
              <h3>Best Time to Visit</h3>
              <div className="besttime-chart">
                {destination.bestTime?.map((m, i) => (
                  <div key={i} className="besttime-bar">
                    <span>{m.month}</span>
                    <div className="bar-fill" style={{ width: `${m.score}%` }}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* MAP */}
            <div className="details-subsection">
              <h3>Map</h3>
              <iframe
                className="map-frame"
                src={destination.mapEmbed}
                loading="lazy"
                title="map"
              ></iframe>
            </div>

          </div>
        )}

      </div>

      {/* CTA */}
      <div className="details-cta-wrapper fade-in">
        <Link to="/" className="details-cta-button">
          View Full Guide
        </Link>
      </div>

      {/* STICKY CTA */}
      <div className="sticky-cta">
        <Link to="/" className="sticky-cta-button">
          View Full Guide
        </Link>
      </div>

    </div>
  );
}
