// src/components/StormHistory.jsx
export default function StormHistory({ storms }) {
  if (!storms || storms.length === 0) {
    return <p>No storm history available.</p>;
  }

  return (
    <div className="storm-history">
      <h2>Storm History</h2>
      <ul>
        {storms.map((storm) => (
          <li key={storm.id}>
            <strong>{storm.year}</strong> — {storm.description}
          </li>
        ))}
      </ul>
    </div>
  );
}


