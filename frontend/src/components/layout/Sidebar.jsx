// src/components/layout/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(236, 223, 223, 0.4)",
            zIndex: 999,
          }}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: isOpen ? 0 : "-260px",
          width: "260px",
          height: "100%",
          background: "var(--brand-secondary)",
          color: "var(--brand-text-light)",
          padding: "1rem",
          transition: "left 0.3s ease",
          zIndex: 1000,
        }}
      >
        <h2 style={{ marginTop: "1rem" }}>Menu</h2>

        <nav
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Link to="/" onClick={onClose} style={linkStyle}>Home</Link>
          <Link to="/destinations" onClick={onClose} style={linkStyle}>Destinations</Link>
          <Link to="/top10" onClick={onClose} style={linkStyle}>Top 10</Link>
          <Link to="/map" onClick={onClose} style={linkStyle}>Map</Link>
          <Link to="/upload" onClick={onClose} style={linkStyle}>Upload Photos</Link>
        </nav>
      </div>
    </>
  );
}

const linkStyle = {
  color: "var(--brand-text-light)",
  textDecoration: "none",
  fontSize: "1.1rem",
  padding: "0.5rem 0",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};
