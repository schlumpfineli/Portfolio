import Button from '../ui/Button'

function CallToAction() {
  return (
    <section className="section cta" id="kontakt">
      <div className="cta-inner">
        <h2 className="cta-title">Gemeinsam digitale Care-Produkte verbessern</h2>
        <p className="cta-copy">
        Ich freue mich auf Projekte, die sensible Nutzerkontexte ernst nehmen und
        gleichzeitig technisch sauber umgesetzt werden.
        </p>
        <a href="mailto:selina@portfolio.dev" className="cta-link">
          <Button className="cta-button">Jetzt Kontakt aufnehmen</Button>
        </a>
      </div>
    </section>
  )
}

export default CallToAction
