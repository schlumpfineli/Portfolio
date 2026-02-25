import { Link } from 'react-router-dom'

function ProjectCard({ project, index }) {
  const reversed = index % 2 === 1
  const primaryCase = index === 0
  const cardClasses = [
    'project-card',
    'hybrid-card',
    reversed ? 'is-reversed' : '',
    primaryCase ? 'is-primary-case' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const cta = project.href ? (
    <Link to={project.href} className="project-cta">
      Case Study ansehen <span className="project-cta-arrow">→</span>
    </Link>
  ) : (
    <span className="project-cta">
      Case Study ansehen <span className="project-cta-arrow">→</span>
    </span>
  )

  return (
    <article className={cardClasses}>
      <div className="project-text">
        <p className="project-sector">{project.sector}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tag-list">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        {cta}
      </div>

      <div className={`project-preview project-preview-${project.previewTone}`}>
        <div className="preview-blob" />
        <div className="preview-inner" />
      </div>
    </article>
  )
}

export default ProjectCard
