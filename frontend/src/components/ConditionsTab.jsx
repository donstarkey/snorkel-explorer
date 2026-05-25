import SnorkelMap from "./SnorkelMap";
import "../styles/ConditionsTab.css";

export default function ConditionsTab({ destination }) {
  const conditions = destination.conditions;

  // FIXED: use the correct property from your API
  const storms = destination.stormHistory ?? [];

  // FIXED: your destination uses "sites", not "snorkelSites"
  const snorkelSites = destination.sites ?? [];

  // Map center = first snorkel site
  const firstSite = snorkelSites[0];

  const mapCenter = {
    lat: firstSite?.latitude ?? 25.774,
    lng: firstSite?.longitude ?? -80.19
  };

  return (
    <div className="conditions-wrapper">

      {/* CURRENT CONDITIONS */}
      <section className="conditions-section">
        <h2>Current Conditions</h2>

        <div className="conditions-grid">
          <div className="condition-item">
            <span className="label">Temperature</span>
            <span className="value">{conditions?.temperature}°F</span>
          </div>

          <div className="condition-item">
            <span className="label">Visibility</span>
            <span className="value">{conditions?.visibility} ft</span>
          </div>

          <div className="condition-item">
            <span className="label">Waves</span>
            <span className="value">{conditions?.waves} ft</span>
          </div>

          <div className="condition-item">
            <span className="label">Weather</span>
            <span className="value">{conditions?.weatherSummary}</span>
          </div>
        </div>
      </section>

      {/* STORM HISTORY */}
      <section className="conditions-section">
        <h2>Storm History</h2>

        {storms.length === 0 && (
          <p className="empty-text">No storm records available.</p>
        )}

        {storms.map((storm, i) => (
            <div key={storm.id ?? i} className="storm-item">

            <div className="storm-header">
              <span className="storm-name">{storm.name}</span>
              <span className="storm-date">{storm.date}</span>
            </div>

            <div className="storm-severity">
              Severity: <strong>{storm.severity}</strong>
            </div>

            {storm.notes && (
              <div className="storm-notes">{storm.notes}</div>
            )}
          </div>
        ))}
      </section>

      {/* MAP SECTION */}
      {snorkelSites.length > 0 && (
        <section className="conditions-section">
          <h2>Map of Snorkel Sites</h2>

          <SnorkelMap center={mapCenter} sites={snorkelSites} />
        </section>
      )}

    </div>
  );
}
