import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function NavBar() {
  return (
    <nav className="navbar">

      {/* LEFT SIDE — LOGO + TITLE */}
      <div className="navbar-brand">
        <img src="http://localhost:5173/images/logo.png" alt="Turtle Logo" className="navbar-logo" />
        <span className="navbar-title">Snorkel Explorer</span>
      </div>

      {/* RIGHT SIDE — NAV LINKS */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>
        <Link to="/top10">Top 10</Link>
      </div>

    </nav>
  );
}

