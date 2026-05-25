// src/components/layout/Header.jsx
import "../../styles/global.css";

export default function Header({ onMenuClick }) {
  return (
    <header className="header">
      <button className="hamburger" onClick={onMenuClick}>
        ☰
      </button>

      <img
        src="/images/logo.png"
        alt="Snorkel Explorer Logo"
        className="header-logo"
      />

      <h1 className="header-title">Snorkel Explorer</h1>
    </header>
  );
}
