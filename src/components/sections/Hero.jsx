import { Link } from 'react-router-dom'
import Button from '../ui/Button'

function Hero() {
  return (
    <section className="hero hero-reference">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-orb hero-orb-green" />
        <div className="hero-orb hero-orb-lavender" />
        <div className="hero-orb hero-orb-accent" />
      </div>
      <div className="hero-noise" aria-hidden="true" />
      <span className="hero-brand-mark" aria-hidden="true">
        SELINA
      </span>

      <div className="hero-panel">
        <p className="hero-kicker">Frontend · Care · Digital</p>
        <h1 className="hero-title">
          Selina
          <br />
          Schindler<span className="hero-title-dot">.</span>
        </h1>

        <div className="hero-divider" aria-hidden="true" />

        <p className="hero-copy">
          Frontend-Entwicklerin fuer digitale Care-Produkte.
          <strong> UX, Interfaces &amp; State -</strong> empathisch gedacht,
          praezise gebaut.
        </p>

        <div className="hero-actions">
          <Link to="/projekte/tierarzt-terminbuchung">
            <Button className="hero-btn hero-btn-primary">Projekte ansehen</Button>
          </Link>
          <a href="#kontakt">
            <Button variant="ghost" className="hero-btn hero-btn-secondary">
              Kontakt aufnehmen
            </Button>
          </a>
        </div>

        <p className="hero-availability">
          <span className="hero-availability-dot" />
          Verfuegbar fuer Projekte
        </p>

        <div className="hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </div>
    </section>
  )
}

export default Hero
