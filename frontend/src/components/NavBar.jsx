import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/destinations">Destinations</Link>
      <Link to="/top10">Top 10</Link>
    </nav>
  )
}

