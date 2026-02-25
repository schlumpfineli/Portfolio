import Hero from '../components/sections/Hero'
import ProjectCard from '../components/sections/ProjectCard'
import ExpertiseSection from '../components/sections/ExpertiseSection'
import CallToAction from '../components/sections/CallToAction'
import { projects } from '../data/projects'

function HomePage() {
  return (
    <>
      <Hero />

      <section className="section projects-section">
        <h2>Ausgewaehlte Projekte</h2>
        <p className="projects-intro">
          Digitale Care-Produkte brauchen Klarheit, Struktur und Vertrauen. Hier
          eine Auswahl konzeptioneller und interaktiver Arbeiten.
        </p>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="section editorial-break">
        <p>
          Gute Care-Produkte reduzieren Unsicherheit. Sie fuehren Menschen ruhig
          durch komplexe Momente - mit Klarheit in jeder Interaktion.
        </p>
      </section>

      <ExpertiseSection />
      <CallToAction />
    </>
  )
}

export default HomePage
