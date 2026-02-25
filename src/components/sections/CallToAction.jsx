import Button from '../ui/Button'

const CTA_TITLE = 'Gemeinsam digitale Care-Produkte verbessern'
const CTA_COPY =
  'Ich freue mich auf Projekte, die sensible Nutzerkontexte ernst nehmen und gleichzeitig technisch sauber umgesetzt werden.'
const CTA_EMAIL = 'mailto:selina@portfolio.dev'

function CallToAction() {
  return (
    <section className="section cta" id="kontakt">
      <div className="cta-inner">
        <h2 className="cta-title">{CTA_TITLE}</h2>
        <p className="cta-copy">{CTA_COPY}</p>
        <a href={CTA_EMAIL} className="cta-link">
          <Button className="cta-button">Jetzt Kontakt aufnehmen</Button>
        </a>
      </div>
    </section>
  )
}

export default CallToAction
