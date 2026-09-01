import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { ProjectCaseStudy } from "../data/projects";

export default function ProjectCard({ project, compact = false }: { project: ProjectCaseStudy; compact?: boolean }) {
  return (
    <article className={`project-card project-card--${project.accent} ${compact ? "project-card--compact" : ""}`}>
      <Link className="project-card__media" to={`/projects/${project.slug}`} aria-label={`Open ${project.title} case study`}>
        <img src={project.hero} alt={project.heroAlt} loading="lazy" />
        <span>{project.category}</span>
      </Link>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{project.status}</span>
          <span>{project.year}</span>
        </div>
        <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
        <p>{project.summary}</p>
        <div className="project-card__footer">
          <div className="tag-list" aria-label="Technology stack">
            {project.stack.slice(0, compact ? 3 : 4).map((technology) => <span key={technology}>{technology}</span>)}
          </div>
          <Link className="icon-link" to={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`}>
            <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </article>
  );
}
