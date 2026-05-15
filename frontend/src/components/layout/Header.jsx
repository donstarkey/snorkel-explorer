// src/components/layout/Header.jsx
export default function Header({ onMenuClick }) {
  return (
    <header
      style={{
        height: "60px",
        background: "var(--brand-primary)",
        color: "var(--brand-text-light)",
        display: "flex",
        alignItems: "center",
        padding: "0 1.25rem",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      <button
        onClick={onMenuClick}
        style={{
          fontSize: "1.5rem",
          background: "none",
          border: "none",
          color: "var(--brand-text-light)",
          cursor: "pointer",
          marginRight: "1rem",
          height: "40px",
          width: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ☰
      </button>

      {/* Turtle Logo */}
      <img
        src=".\images\logo.png"
        alt="Snorkel Explorer Logo"
        style={{
          height: "36px",
          width: "36px",
          objectFit: "contain",
          marginRight: "12px",
          borderRadius: "4px", // optional, looks clean
        }}
      />

      {/* Original Title — unchanged */}
      <h1 style={{ fontSize: "1.25rem", margin: 0 }}>
        Snorkel Explorer
      </h1>
    </header>
  );
}
