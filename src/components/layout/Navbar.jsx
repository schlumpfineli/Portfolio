import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar-wrap">
      <nav className="container navbar" aria-label="Hauptnavigation">
        <Link to="/" className="brand">
          Selina Schindler
        </Link>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Start
          </NavLink>
          <NavLink
            to="/projekte/tierarzt-terminbuchung"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Projekt-Demo
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
