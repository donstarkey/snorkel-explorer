import React from "react";

export default function VideoEmbed({ videoId, title = "Snorkel Explorer", destinationName = "this destination" }) {

  // ── Coming Soon placeholder ─────────────────────────────────────────────
  if (!videoId) {
    return (
      <div className="video-coming-soon">
        <div className="video-coming-soon-icon">🤿</div>
        <p className="video-coming-soon-title">
          Video guide coming soon
        </p>
        <p className="video-coming-soon-sub">
          We're heading to {destinationName} — subscribe on YouTube to be
          the first to see it.
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
    );
  }

  // ── Live embed ──────────────────────────────────────────────────────────
  return (
    <div className="video-embed-wrapper">
      <iframe
        width="100%"
        style={{ aspectRatio: "16/9", border: "none", borderRadius: "8px" }}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <a
        href={`https://youtu.be/${videoId}`}
        target="_blank"
        rel="noreferrer"
        className="video-yt-link"
      >
        ▶ Watch on YouTube
      </a>
    </div>
  );
}
