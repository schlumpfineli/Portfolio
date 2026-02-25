function Placeholder({ label, className = '' }) {
  return (
    <div className={`case-placeholder ${className}`.trim()} role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  )
}

function RedesignCaseStudyPage() {
  return (
    <article className="case-study-page">
      <section className="section case-hero">
        <p className="eyebrow">Case Study</p>
        <h1>Redesign Haustierarztpraxis Baar</h1>
        <p className="lead">
          Neustrukturierung einer bestehenden Praxiswebsite mit Fokus auf Klarheit,
          Terminfuehrung und mobile Nutzerfuehrung.
        </p>
        <div className="case-meta">
          <p>
            <strong>Rolle:</strong> UX & Frontend Development
          </p>
          <p>
            <strong>Fokus:</strong> Informationsarchitektur, Terminlogik,
            Mobile-Optimierung
          </p>
          <p>
            <strong>Zeitraum:</strong> 4 Wochen
          </p>
          <p>
            <strong>Tech:</strong> React, Komponentenarchitektur, Responsive Design
          </p>
        </div>
        <Placeholder label="Redesign Preview" className="is-wide" />
      </section>

      <section className="section case-section">
        <h2>Analyse der bestehenden Website</h2>
        <ul className="case-list">
          <li>Informationsdichte ohne klare Priorisierung</li>
          <li>Terminvereinbarung ausschliesslich telefonisch</li>
          <li>Wichtige Informationen nicht visuell hervorgehoben</li>
          <li>Lange Textabschnitte ohne klare Struktur</li>
          <li>Mobile-Nutzung nicht optimiert</li>
          <li>Keine klare Nutzerfuehrung</li>
        </ul>
        <Placeholder label="Screenshot Vorher - Bestehende Website" />
      </section>

      <section className="section case-section">
        <h2>UX-Probleme im Detail</h2>
        <ul className="case-list">
          <li>Fehlende visuelle Hierarchie</li>
          <li>Keine primaere Handlungsoption</li>
          <li>Gleichgewichtete Inhalte ohne Fokus</li>
          <li>Hohe kognitive Belastung beim Scannen</li>
          <li>Vertrauensbildung nicht ausreichend unterstuetzt</li>
        </ul>
      </section>

      <section className="section case-section">
        <h2>Redesign-Ziele</h2>
        <ul className="case-list">
          <li>Mobile-first Struktur</li>
          <li>Klarer Call-to-Action fuer Terminvereinbarung</li>
          <li>Reduzierte Navigation mit klaren Einstiegen</li>
          <li>Strukturierte Leistungsuebersicht</li>
          <li>Vertrauensfoerderndes Design</li>
          <li>Reduktion kognitiver Belastung</li>
        </ul>
      </section>

      <section className="section case-section">
        <h2>Informationsarchitektur</h2>
        <div className="case-copy">
          <p>Neue Navigationsstruktur mit klarer Priorisierung von „Termin“.</p>
          <p>Leistungen wurden in nachvollziehbare Gruppen ueberfuehrt.</p>
          <p>Textbloecke wurden gekuerzt und visuell gegliedert.</p>
          <p>Visuelle Hierarchie steuert die Orientierung in wenigen Sekunden.</p>
        </div>
        <Placeholder label="Neue Struktur / Wireframe" />
      </section>

      <section className="section case-section">
        <h2>Terminlogik & State-Handling</h2>
        <div className="case-copy">
          <p>Schrittweise Terminfuehrung mit klaren Auswahlzustaenden.</p>
          <p>Verfuegbarkeiten, Bestaetigungszustand und Fehlermeldungen sind sichtbar.</p>
          <p>Wiederverwendbare Komponenten reduzieren UI-Duplikate.</p>
          <p>State-Management in React sorgt fuer konsistente Interaktionen auf Mobile.</p>
        </div>
        <Placeholder label="Termininterface - State Uebersicht" />
      </section>

      <section className="section case-section">
        <h2>Vorher / Nachher Vergleich</h2>
        <div className="case-compare-copy">
          <p>
            <strong>Vorher:</strong> Telefonnummer im Fliesstext versteckt.
          </p>
          <p>
            <strong>Nachher:</strong> Prominenter CTA plus Sticky Button auf Mobile.
          </p>
          <p>
            <strong>Vorher:</strong> Leistungen als lange Liste.
          </p>
          <p>
            <strong>Nachher:</strong> Strukturierte Module mit klarer Gruppierung.
          </p>
        </div>
        <div className="case-compare-grid">
          <Placeholder label="Vorher - Struktur" />
          <Placeholder label="Nachher - Struktur" />
        </div>
      </section>

      <section className="section case-section">
        <h2>Designentscheidungen</h2>
        <ul className="case-list">
          <li>Farbwahl fuer Ruhe, Vertrauen und medizinischen Kontext</li>
          <li>Typografie mit klarer Lesefuehrung auf kleinen Displays</li>
          <li>Reduzierte visuelle Reize fuer fokussierte Orientierung</li>
          <li>Mehr Weissraum zur Entzerrung komplexer Inhalte</li>
          <li>Kontrast gezielt fuer Hierarchie und Handlungsoptionen</li>
        </ul>
      </section>

      <section className="section case-section">
        <h2>Ergebnis / Wirkung</h2>
        <ul className="case-list">
          <li>Klarere Nutzerfuehrung und schnellere Orientierung</li>
          <li>Reduzierte kognitive Belastung bei Informationsaufnahme</li>
          <li>Mobile-optimierte Terminfuehrung mit klaren Schritten</li>
          <li>Staerkerer Fokus auf Conversion und Kontaktaufnahme</li>
        </ul>
        <p className="case-note">
          Kennzahlen sind in dieser Case Study bewusst qualitativ beschrieben; konkrete
          Effekte waeren in einem Live-Betrieb hypothetisch zu validieren.
        </p>
      </section>

      <section className="section case-section case-reflection">
        <h2>Reflexion & naechste Schritte</h2>
        <ul className="case-list">
          <li>Online-Bezahlung fuer bestimmte Leistungen</li>
          <li>Patienten-Login fuer Verlaufsdaten und Dokumente</li>
          <li>Erinnerungsfunktion fuer Impfungen und Kontrolltermine</li>
          <li>Multi-Praxis-Faehigkeit fuer skalierbare Standorte</li>
        </ul>
      </section>
    </article>
  )
}

export default RedesignCaseStudyPage
