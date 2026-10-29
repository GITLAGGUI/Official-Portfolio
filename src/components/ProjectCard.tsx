import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import type { ProjectCaseStudy } from '../data/projects';
import ProjectPreview from './ProjectPreview';
import { useState } from 'react';
export default function ProjectCard({ project, compact = false }: { project: ProjectCaseStudy; compact?: boolean }) {
  const [preview, setPreview] = useState(false);
  return <article className={`project-card project-card--${project.accent} ${compact ? 'project-card--compact' : ''}`}><Link className="project-card__media" onPointerEnter={(event) => { if (event.pointerType === 'mouse') setPreview(true); }} onPointerLeave={() => setPreview(false)} onFocus={() => setPreview(true)} onBlur={() => setPreview(false)} to={`/projects/${project.slug}`} aria-label={`Open ${project.title} case study`}><ProjectPreview project={project} intent={preview} /><span className="project-card__open"><FiArrowUpRight /></span><span className="project-card__status"><i />{project.status}</span></Link><div className="project-card__body"><div className="project-card__meta"><span>{project.category}</span><span>{project.year}</span></div><h3><Link to={`/projects/${project.slug}`}>{project.title}<FiArrowUpRight /></Link></h3>{!compact && <p>{project.subtitle}</p>}<div className="tag-list">{project.stack.slice(0, compact ? 2 : 4).map((tool) => <span key={tool}>{tool}</span>)}</div></div></article>;
}
