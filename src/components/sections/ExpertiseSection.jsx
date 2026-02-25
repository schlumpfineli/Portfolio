function ExpertiseSection() {
  const items = [
    {
      title: 'Care UX & Accessibility',
      text: 'Komplexe Prozesse werden in klare, ruhige Interaktionen ueberfuehrt.',
    },
    {
      title: 'Interaktive Frontends',
      text: 'Robuste React-Architekturen mit wartbarer Komponentenlogik.',
    },
    {
      title: 'Produktnahe Zusammenarbeit',
      text: 'Enge Abstimmung mit Fachteams, damit Features echten Nutzen schaffen.',
    },
  ]

  return (
    <section className="section expertise-section">
      <h2>Expertise</h2>
      <div className="expertise-grid">
        {items.map((item, index) => (
          <article
            key={item.title}
            className={`expertise-item expertise-item-${index + 1}`}
          >
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ExpertiseSection
