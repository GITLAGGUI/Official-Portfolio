import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { ProjectCaseStudy } from "../data/projects";

export default function ProjectCard({ project, compact = false }: { project: ProjectCaseStudy; compact?: boolean }) {
  return (
    <article className={`project-card project-card--${project.accent} ${compact ? "project-card--compact" : ""}`}>
      <Link className="project-card__media" to={`/projects/${project.slug}`} aria-label={`Open ${project.title} case study`}>
        <img src={project.hero} alt={project.heroAlt} loading="lazy" />
        <div className="project-card__overlay">
          <div className="project-card__meta">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <div className="project-card__copy">
            <p>{project.status}</p>
            <h3>{project.title}</h3>
            {!compact && <p className="project-card__summary">{project.summary}</p>}
            <div className="project-card__footer">
              <div className="tag-list" aria-label="Technology stack">
                {project.stack.slice(0, compact ? 2 : 4).map((technology) => <span key={technology}>{technology}</span>)}
              </div>
              <span className="icon-link" aria-hidden="true"><FiArrowUpRight /></span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
