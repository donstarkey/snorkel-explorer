import { Link } from "react-router-dom";
import "../styles/DestinationCard.css";

const COUNTRY_FLAGS = {
  "United States": "us",
  "USA": "us",
  "Honduras": "hn",
  "Caribbean Netherlands": "bq",
  "Bonaire": "bq",
  "Curaçao": "cw",
  "Turks & Caicos": "tc",
  "United Kingdom": "gb",
  "Australia": "au",
  "Mexico": "mx",
  "Belize": "bz",
  "Bahamas": "bs",
  "Fiji": "fj",
  "French Polynesia": "pf",
  "Bora Bora": "pf",
  "Barbados": "bb",
  "Cayman Islands": "ky",
  "Hawaii": "us",
  "Maui": "us"
};

const getFlagUrl = (country) => {
  if (!country) return null;
  const code = COUNTRY_FLAGS[country.trim()];
  return code ? `https://flagcdn.com/48x36/${code}.png` : null;
};

export default function DestinationCard({ destination, rank, className = "" }) {
  const imgSrc = destination.primaryImage
    ? `http://localhost:5000${destination.primaryImage}`
    : "/images/default-hero.jpg";

  return (
    <Link
      to={`/destinations/${destination.id}`}
      className={`card ${className} fade-in`}
    >
      {rank && <div className="card-rank">#{rank}</div>}

      <img src={imgSrc} alt={destination.name} />

      <div className="card-content">
        <h3 className="card-title">{destination.name}</h3>

        <div className="card-country-row">
          {getFlagUrl(destination.country) && (
            <img
              src={getFlagUrl(destination.country)}
              alt={destination.country}
              className="card-flag"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          <span className="card-country">{destination.country}</span>
        </div>

        {destination.description && (
          <p className="card-description">{destination.description}</p>
        )}
      </div>
    </Link>
  );
}
