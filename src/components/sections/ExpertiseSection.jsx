function ExpertiseSection() {
  const items = [
    {
      id: 'care-ux',
      className: 'expertise-item-1',
      title: 'Care UX & Accessibility',
      text: 'Komplexe Prozesse werden in klare, ruhige Interaktionen ueberfuehrt.',
    },
    {
      id: 'interactive-frontends',
      className: 'expertise-item-2',
      title: 'Interaktive Frontends',
      text: 'Robuste React-Architekturen mit wartbarer Komponentenlogik.',
    },
    {
      id: 'product-collaboration',
      className: 'expertise-item-3',
      title: 'Produktnahe Zusammenarbeit',
      text: 'Enge Abstimmung mit Fachteams, damit Features echten Nutzen schaffen.',
    },
  ]

  return (
    <section className="section expertise-section">
      <h2>Expertise</h2>
      <div className="expertise-grid">
        {items.map((item) => (
          <article key={item.id} className={`expertise-item ${item.className}`}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ExpertiseSection
