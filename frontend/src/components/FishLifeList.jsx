// src/components/FishLifeList.jsx
export default function FishLifeList({ fishLife }) {
  if (!fishLife || fishLife.length === 0) {
    return <p>No fish life data available.</p>;
  }

  return (
    <div className="fishlife-list">
      <h2>Marine Life</h2>
      <ul>
        {fishLife.map((fish) => (
          <li key={fish.id}>
            <strong>{fish.name}</strong> — {fish.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

}

