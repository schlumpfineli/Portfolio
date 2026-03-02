import analyseKontaktImage from '../assets/hausarzt-analyse-kontakt.png'
import analyseHeroImage from '../assets/hausarzt-analyse-hero.png'
import analyseTeamImage from '../assets/hausarzt-analyse-team.png'

import { useEffect } from 'react'

function HausarztProjectPage() {
  useEffect(() => {
    document.body.classList.add('theme-hausarzt')

    return () => {
      document.body.classList.remove('theme-hausarzt')
    }
  }, [])

  return (
    <div className="project-page project-page-hausarzt">
      <section className="section hausarzt-hero">
        <div className="hausarzt-hero-copy">
          <p className="hausarzt-hero-label">PROJECT DETAIL</p>
          <h1>Digitale Hausarztpraxis</h1>
          <p className="hausarzt-hero-question">
            Wie lässt sich eine informationsreiche Standortseite so
            strukturieren, dass Orientierung entsteht statt Überforderung?
          </p>
          <p className="lead">
            Überarbeitung einer bestehenden Praxis-Seite mit Fokus auf klarer
            Informationsarchitektur, reduzierter kognitiver Belastung und
            vertrauensbildender Struktur im Care-Kontext.
          </p>
          <ul className="hausarzt-hero-list">
            <li>Klare Entscheidungslogik</li>
            <li>Reduzierte kognitive Belastung</li>
            <li>Vertrauensarchitektur im medizinischen Kontext</li>
          </ul>
          <p className="hausarzt-hero-meta">
            Standort: Zug Bahnhofplatz
            <br />
            Fokus: Mobile First · Informationsarchitektur · Accessibility
          </p>
        </div>

        <div className="hausarzt-hero-compare" aria-label="Vorher Nachher Darstellung">
          <article className="hausarzt-hero-card is-before">
            <div className="hausarzt-hero-wireframe">
              <div className="wf-row wf-neutral" />
              <div className="wf-row wf-neutral" />
              <div className="wf-row wf-neutral" />
              <div className="wf-row wf-neutral" />
              <div className="wf-grid">
                <div className="wf-chip wf-neutral" />
                <div className="wf-chip wf-neutral" />
                <div className="wf-chip wf-neutral" />
              </div>
            </div>
            <p className="hausarzt-hero-caption">
              Vorher – Hohe Informationsdichte ohne klare Hierarchie
            </p>
          </article>

          <div className="hausarzt-hero-divider" aria-hidden="true">
            <span>Informationsdichte</span>
            <span className="hausarzt-hero-divider-arrow">→</span>
            <span>Strukturierte Entscheidungsführung</span>
          </div>

          <article className="hausarzt-hero-card is-after">
            <div className="hausarzt-hero-wireframe">
              <div className="wf-row wf-hero" />
              <div className="wf-cta" />
              <div className="wf-row wf-info" />
              <div className="wf-row wf-info short" />
              <div className="wf-team">
                <div className="wf-avatar" />
                <div className="wf-avatar" />
              </div>
            </div>
            <p className="hausarzt-hero-caption">
              Nachher – Strukturierte Informationsführung mit klarer
              Entscheidungslogik
            </p>
          </article>
        </div>
      </section>

      <section className="section hausarzt-problem-thesis">
        <h2>Eine Standortseite ist kein Archiv – sondern ein Entscheidungsraum.</h2>
        <p>
          Über Jahre gewachsene Inhalte führten zu einer strukturellen
          Überladung der Seite. Informationen wurden ergänzt, jedoch nie
          systematisch priorisiert oder entlang konkreter Nutzerbedürfnisse
          organisiert.
        </p>
        <p>
          Statt einer klaren Entscheidungsarchitektur entstand eine
          Gleichgewichtung aller Inhalte – unabhängig davon, ob sie für den
          nächsten Schritt relevant waren oder nicht.
        </p>
        <p>
          Im medizinischen Kontext ist das problematisch: Patient:innen suchen
          keine Vollständigkeit, sondern Orientierung.{' '}
          <span className="hausarzt-problem-thesis-emphasis">
            Sie benötigen Sicherheit, nicht Informationsmenge.
          </span>
        </p>
      </section>

      <section className="section hausarzt-analysis">
        <h2>Analyse der bestehenden Standortseite</h2>

        <article className="hausarzt-analysis-item">
          <h3>Gleichwertige Handlungsoptionen ohne Priorisierung</h3>
          <p className="hausarzt-analysis-stage">Beobachtung</p>
          <figure className="hausarzt-analysis-figure">
            <img
              src={analyseKontaktImage}
              alt="Kontaktbereich mit Terminbutton und Telefonnummer"
              className="hausarzt-analysis-image"
              loading="lazy"
            />
            <figcaption className="hausarzt-analysis-figure-note">
              Die Umrandungen markieren die beiden visuell gleichgewichteten
              Handlungsoptionen im oberen Seitenbereich.
            </figcaption>
          </figure>
          <p className="hausarzt-analysis-stage">Analyse</p>
          <p>
            Im oberen Seitenbereich werden zwei zentrale Handlungsoptionen
            nahezu gleich stark gewichtet: die Online-Terminbuchung sowie die
            telefonische Kontaktaufnahme. Beide Elemente sind visuell ähnlich
            prominent gestaltet und erscheinen unmittelbar hintereinander.
          </p>
          <p>
            Aus struktureller Perspektive entsteht dadurch keine klare
            Entscheidungsführung. Nutzer:innen erhalten zwei gleichwertige
            Primäraktionen, ohne kontextuelle Unterstützung, welche Handlung in
            welcher Situation sinnvoll ist.
          </p>
          <p>
            Gerade im medizinischen Kontext ist jedoch eine eindeutige
            Priorisierung entscheidend. Patient:innen suchen Orientierung und
            schnelle Handlungsfähigkeit — nicht parallele Optionen ohne
            Einordnung.
          </p>
        </article>

        <article className="hausarzt-analysis-item">
          <h3>Informationsdichte im Above-the-Fold-Bereich</h3>
          <p className="hausarzt-analysis-stage">Beobachtung</p>
          <figure className="hausarzt-analysis-figure">
            <img
              src={analyseHeroImage}
              alt="Hero-Bereich mit Terminleiste, Einführungstext und KI-Hinweis"
              className="hausarzt-analysis-image"
              loading="lazy"
            />
            <figcaption className="hausarzt-analysis-figure-note">
              Die Hervorhebungen zeigen die gleichzeitige Präsenz mehrerer
              inhaltlich unterschiedlicher Elemente ohne klare Priorisierung.
            </figcaption>
          </figure>
          <p className="hausarzt-analysis-stage">Analyse</p>
          <p>
            Bereits im sichtbaren Einstiegsbereich werden mehrere inhaltlich
            unterschiedliche Elemente nebeneinandergestellt:
          </p>
          <ul className="hausarzt-analysis-list">
            <li>Terminbuchungsleiste</li>
            <li>Einführungstext zur Praxis</li>
            <li>KI-Testhinweis mit Warncharakter</li>
          </ul>
          <p>
            Der KI-Hinweis erscheint visuell auffällig und konkurriert mit der
            eigentlichen Kernhandlung der Seite. Gleichzeitig enthält der
            Einführungstext keine konkrete Handlungsführung, sondern beschreibt
            allgemeine Informationen zur Praxis.
          </p>
          <p>
            Statt einer klaren Entscheidungsarchitektur entsteht so eine
            Gleichgewichtung heterogener Inhalte. Die Seite informiert — führt
            jedoch nicht.
          </p>
        </article>

        <article className="hausarzt-analysis-item">
          <h3>Mitarbeitendenliste als Archivstruktur</h3>
          <p className="hausarzt-analysis-stage">Beobachtung</p>
          <figure className="hausarzt-analysis-figure">
            <img
              src={analyseTeamImage}
              alt="Ausschnitt der Mitarbeitendenkarten"
              className="hausarzt-analysis-image"
              loading="lazy"
            />
            <figcaption className="hausarzt-analysis-figure-note">
              Die Umrandungen verdeutlichen die gleichförmige Kartenstruktur
              ohne funktionale Differenzierung.
            </figcaption>
          </figure>
          <p className="hausarzt-analysis-stage">Analyse</p>
          <p>
            Die Mitarbeitenden werden in visuell dominanten Karten dargestellt,
            jeweils mit Bild, Titel und Sprachangaben. Jede Karte besitzt das
            gleiche visuelle Gewicht, unabhängig von Funktion oder Relevanz für
            die aktuelle Nutzungssituation.
          </p>
          <p>
            Strukturell entsteht dadurch eine Archivlogik: Die Seite präsentiert
            Vollständigkeit, jedoch keine funktionale Differenzierung.
          </p>
          <p>Für Nutzer:innen bedeutet das:</p>
          <ul className="hausarzt-analysis-list">
            <li>keine Priorisierung nach Fachbereich</li>
            <li>keine Gruppierung nach Handlungsszenarien</li>
            <li>keine Unterstützung bei der Entscheidung „Zu wem gehe ich?“</li>
          </ul>
          <p>
            Die visuelle Gleichwertigkeit aller Karten verstärkt die kognitive
            Belastung, da Orientierung aktiv erarbeitet werden muss.
          </p>
        </article>

        <article className="hausarzt-analysis-context">
          <p className="hausarzt-analysis-stage">Kontext-Einordnung</p>
          <h3>Einordnung im medizinischen Kontext</h3>
          <p>
            Im Gesundheitsbereich ist Informationsarchitektur besonders sensibel.
            Patient:innen befinden sich häufig in unsicheren Situationen und
            suchen:
          </p>
          <ul className="hausarzt-analysis-list">
            <li>Klarheit</li>
            <li>Sicherheit</li>
            <li>eindeutige Handlungsoptionen</li>
          </ul>
          <p>
            Die bestehende Struktur vermittelt jedoch primär Informationsfülle
            statt Entscheidungsführung.
          </p>
          <p className="hausarzt-analysis-conclusion">
            Eine Standortseite ist kein Archiv gewachsener Inhalte — sie ist ein
            Entscheidungsraum.
          </p>
          <p className="hausarzt-analysis-conclusion">
            Patient:innen suchen nicht Vollständigkeit, sondern Orientierung.
          </p>
        </article>
      </section>

      <section className="section hausarzt-principles">
        <h2>Designprinzipien für die Neustrukturierung</h2>

        <div className="hausarzt-principles-list">
          <article className="hausarzt-principle-item">
            <h3>Klare Entscheidungsführung vor Informationsfülle</h3>
            <p>
              Primäre Handlungsoptionen werden eindeutig priorisiert.
              Nutzer:innen erhalten eine klare Hauptaktion – kontextuelle
              Alternativen treten visuell zurück.
            </p>
            <p>
              <strong>Ziel:</strong> Reduktion paralleler
              Entscheidungssituationen im Einstiegsbereich.
            </p>
          </article>

          <article className="hausarzt-principle-item">
            <h3>Struktur vor Vollständigkeit</h3>
            <p>
              Inhalte werden nicht archiviert, sondern entlang konkreter
              Nutzungsszenarien organisiert:
            </p>
            <ul className="hausarzt-principles-bullets">
              <li>Termin vereinbaren</li>
              <li>Kontakt aufnehmen</li>
              <li>Fachbereich finden</li>
              <li>Team kennenlernen</li>
            </ul>
            <p>
              Die Informationsarchitektur folgt damit Handlungssituationen –
              nicht interner Organisationslogik.
            </p>
          </article>

          <article className="hausarzt-principle-item">
            <h3>Visuelle Hierarchie als Vertrauensfaktor</h3>
            <p>
              Im medizinischen Kontext erzeugt visuelle Gleichgewichtung
              Unsicherheit. Klare Hierarchien vermitteln Orientierung und
              Kompetenz.
            </p>
            <p>Deshalb gilt:</p>
            <ul className="hausarzt-principles-bullets">
              <li>Eine dominante Primäraktion</li>
              <li>reduzierte Sekundäraktionen</li>
              <li>deutliche Abschnittsstruktur</li>
              <li>ruhige, konsistente Gestaltung</li>
            </ul>
            <p>
              Struktur wird bewusst als Mittel der Vertrauensbildung eingesetzt.
            </p>
          </article>

          <article className="hausarzt-principle-item">
            <h3>Reduktion kognitiver Belastung im Care-Kontext</h3>
            <p>
              Patient:innen befinden sich häufig in unsicheren oder belastenden
              Situationen.
            </p>
            <p>Das Interface soll daher:</p>
            <ul className="hausarzt-principles-bullets">
              <li>Entscheidungsalternativen minimieren</li>
              <li>Informationsdichte kontrollieren</li>
              <li>visuelle Ruhe erzeugen</li>
              <li>klare Handlungswege anbieten</li>
            </ul>
            <p>Gute UX bedeutet hier: weniger denken müssen.</p>
          </article>

          <article className="hausarzt-principle-item">
            <h3>Mobile First als strukturelles Prinzip</h3>
            <p>
              Die Standortseite wird primär für mobile Nutzung konzipiert. Auf
              kleinen Displays wird Priorisierung besonders sichtbar – und
              zwingt zu klarer Gewichtung.
            </p>
            <p>
              Mobile First dient damit nicht nur technischer Optimierung,
              sondern struktureller Disziplin.
            </p>
          </article>
        </div>

        <p className="hausarzt-principles-conclusion">
          Diese Prinzipien bilden die konzeptionelle Grundlage für das
          anschließende Redesign. Gestaltung folgt hier Struktur – nicht
          umgekehrt.
        </p>
      </section>

      <section className="section hausarzt-ia-model">
        <h2>Informationsarchitektur als Entscheidungssequenz</h2>
        <p className="hausarzt-ia-intro">
          Die neue Struktur bildet Nutzungssituationen als
          Entscheidungsabfolge ab – nicht als Inhaltsarchiv.
        </p>

        <ol className="hausarzt-ia-flow" aria-label="Vertikale Sequenz der neuen Informationsarchitektur">
          <li className="hausarzt-ia-step">
            <span className="hausarzt-ia-step-number" aria-hidden="true">
              1
            </span>
            <p className="hausarzt-ia-step-label">Hero mit dominanter Primäraktion</p>
          </li>
          <li className="hausarzt-ia-step">
            <span className="hausarzt-ia-step-number" aria-hidden="true">
              2
            </span>
            <p className="hausarzt-ia-step-label">Entscheidungsnavigation (Nutzungsszenarien)</p>
          </li>
          <li className="hausarzt-ia-step">
            <span className="hausarzt-ia-step-number" aria-hidden="true">
              3
            </span>
            <p className="hausarzt-ia-step-label">Strukturierte Leistungsübersicht</p>
          </li>
          <li className="hausarzt-ia-step">
            <span className="hausarzt-ia-step-number" aria-hidden="true">
              4
            </span>
            <p className="hausarzt-ia-step-label">Team (reduziert)</p>
          </li>
          <li className="hausarzt-ia-step">
            <span className="hausarzt-ia-step-number" aria-hidden="true">
              5
            </span>
            <p className="hausarzt-ia-step-label">Standort & Kontakt</p>
          </li>
          <li className="hausarzt-ia-step">
            <span className="hausarzt-ia-step-number" aria-hidden="true">
              6
            </span>
            <p className="hausarzt-ia-step-label">Administrative Hinweise</p>
          </li>
        </ol>

        <p className="hausarzt-ia-conclusion">Diese Seite führt – sie sammelt nicht.</p>
      </section>

      <section className="section hausarzt-redesign-hero">
        <h2>Redesign: Hero als Entscheidungsraum</h2>
        <p className="hausarzt-redesign-hero-intro">
          Der Hero priorisiert eine dominante Primäraktion und reduziert
          konkurrierende Informationen zugunsten klarer Handlungsfähigkeit.
        </p>

        <article className="hausarzt-redesign-canvas" aria-label="Redesign Hero Konzept">
          <h3 className="hausarzt-redesign-title">Zug Bahnhofplatz</h3>
          <p className="hausarzt-redesign-copy">
            Hausärztliche Betreuung für akute Anliegen und langfristige
            Begleitung.
          </p>

          <button type="button" className="hausarzt-redesign-primary-cta">
            Termin online buchen
          </button>

          <div className="hausarzt-redesign-secondary-contact">
            <p className="hausarzt-redesign-contact-kicker">Telefonisch erreichbar unter</p>
            <p className="hausarzt-redesign-contact-line">041 725 40 00</p>
            <p className="hausarzt-redesign-contact-meta">Mo–Fr · 08:00–18:00 Uhr</p>
          </div>
        </article>

        <p className="hausarzt-redesign-note">
          Die Primäraktion wird klar priorisiert. Telefonische Kontaktaufnahme
          bleibt verfügbar, tritt jedoch visuell zurück.
        </p>
      </section>

      <section className="section hausarzt-decision-nav">
        <article className="hausarzt-decision-nav-card" aria-label="Redesign Ausschnitt Entscheidungsnavigation">
          <h2>Wie können wir Ihnen helfen?</h2>
          <p className="hausarzt-decision-nav-intro">
            Wählen Sie Ihr Anliegen – wir führen Sie direkt zum passenden
            Bereich.
          </p>

          <nav aria-label="Entscheidungsnavigation Standortseite">
            <ul className="hausarzt-decision-nav-list">
              <li>
                <button type="button" className="hausarzt-decision-nav-item is-primary">
                  <span>Termin vereinbaren</span>
                  <span className="hausarzt-decision-nav-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </li>
              <li>
                <button type="button" className="hausarzt-decision-nav-item">
                  <span>Akutes Anliegen</span>
                  <span className="hausarzt-decision-nav-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </li>
              <li>
                <button type="button" className="hausarzt-decision-nav-item">
                  <span>Leistungen & Fachbereiche</span>
                  <span className="hausarzt-decision-nav-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </li>
              <li>
                <button type="button" className="hausarzt-decision-nav-item">
                  <span>Team kennenlernen</span>
                  <span className="hausarzt-decision-nav-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </article>

        <p className="hausarzt-decision-nav-note">
          Die Entscheidungsnavigation priorisiert typische Nutzungssituationen
          und reduziert Suchaufwand im Einstiegsbereich. Statt interner
          Organisationslogik werden konkrete Handlungsanlässe sichtbar gemacht.
        </p>
      </section>

      <section className="section hausarzt-services">
        <h2>Unsere Leistungen – klar strukturiert</h2>
        <div className="hausarzt-services-card">
          <p className="hausarzt-services-intro">
            Die Leistungsübersicht orientiert sich an Nutzungssituationen und
            unterstützt schnelle Orientierung statt vollständiger
            Fachauflistung.
          </p>

          <div className="hausarzt-services-groups">
            <article className="hausarzt-services-group">
              <h3>Für akute Beschwerden</h3>
              <ul className="hausarzt-services-list">
                <li>Akutsprechstunde bei plötzlichen Symptomen</li>
                <li>Infektabklärung und Erstversorgung</li>
                <li>Wundversorgung und kleinere Verletzungen</li>
                <li>Fieber-, Schmerz- und Kreislaufabklärung</li>
                <li>Kurzfristige medizinische Einschätzung</li>
              </ul>
            </article>

            <article className="hausarzt-services-group">
              <h3>Für langfristige Betreuung</h3>
              <ul className="hausarzt-services-list">
                <li>Kontrolltermine bei chronischen Erkrankungen</li>
                <li>Präventions- und Check-up-Untersuchungen</li>
                <li>Therapiebegleitung und Verlaufskontrolle</li>
                <li>Medikationsüberprüfung</li>
                <li>Koordination mit Fachärzt:innen</li>
              </ul>
            </article>

            <article className="hausarzt-services-group">
              <h3>Für administrative Anliegen</h3>
              <ul className="hausarzt-services-list">
                <li>Rezept- und Überweisungsanfragen</li>
                <li>Arbeitsunfähigkeitszeugnisse</li>
                <li>Impf- und Vorsorgedokumentation</li>
                <li>Versicherungs- und Formularanliegen</li>
                <li>Terminverschiebung und Rückfragen</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HausarztProjectPage
