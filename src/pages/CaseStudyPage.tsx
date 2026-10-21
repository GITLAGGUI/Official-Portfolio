import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiExternalLink, FiFolder, FiCode } from 'react-icons/fi';
import { SiMarkdown } from 'react-icons/si';
import { Navigate, Link, useParams } from 'react-router-dom';
import { getProjectBySlug, projects } from '../data/projects';
import LanguageBar from '../components/LanguageBar';

export default function CaseStudyPage() {
  const { slug } = useParams(); const project = getProjectBySlug(slug); const [selected, setSelected] = useState(0);
  if (!project) return <Navigate replace to="/projects" />;
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length]; const next = projects[(index + 1) % projects.length];
  const screenshots = [{ src: project.hero, alt: project.heroAlt }, ...(project.gallery ?? [])].filter((item, i, items) => items.findIndex((other) => other.src === item.src) === i);
  const current = screenshots[selected] ?? screenshots[0];
  return <article className={`content-page case-study case-study--${project.accent}`}>
    <header className="repo-heading"><Link to="/projects"><FiFolder /> Projects</Link><span>/</span><h1>{project.title}</h1><span className="repo-status">{project.status}</span></header>
    <nav className="repo-tabs" aria-label="Project sections"><a href="#screenshots"><FiCode /> Overview</a><a href="#readme-title"><SiMarkdown /> Readme</a><Link to="/contact">Discuss a project <FiExternalLink /></Link></nav>
    <div className="repo-layout"><div className="repo-main"><div className="repo-toolbar"><span><FiFolder /> {project.shortTitle}</span><span>{project.year}</span></div>
      {project.videos ? <section id="screenshots" className="video-gallery" aria-label="Video edits">{project.videos.map((video) => <figure key={video.src}><video controls playsInline preload="metadata" poster={video.poster} src={video.src} /><figcaption>{video.title}</figcaption></figure>)}</section> : <section id="screenshots" className="case-gallery" aria-label="Project screenshots"><a className="repo-primary-image" href={current.src} target="_blank" rel="noreferrer" aria-label={`View full-size image: ${current.alt}`}><img src={current.src} alt={current.alt} /></a>{screenshots.length > 1 && <div className="repo-thumbnails">{screenshots.map((image, i) => <button key={image.src} aria-label={`Show ${image.alt}`} aria-pressed={selected === i} onClick={() => setSelected(i)}><img src={image.src} alt="" loading="lazy" /></button>)}</div>}</section>}
      {project.videos && project.gallery && <section className="repo-evidence" aria-label="Project evidence">{project.gallery.map((image) => <a href={image.src} key={image.src} target="_blank" rel="noreferrer"><img src={image.src} alt={image.alt} loading="lazy" /><span>{image.caption}</span></a>)}</section>}
      <section className="case-readme" aria-labelledby="readme-title"><header><SiMarkdown /><h2 id="readme-title">README.md</h2></header><div><h3>{project.subtitle}</h3><p>{project.challenge} {project.approach[0]}</p></div></section>
    </div><aside className="repo-about"><h2>About</h2><p>{project.summary}</p><div className="repo-links">{project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer"><FiExternalLink />{link.label === 'Live site' ? new URL(link.href).hostname : link.label}</a>)}</div><dl><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Period</dt><dd>{project.year}</dd></div><div><dt>Category</dt><dd>{project.category}</dd></div></dl><LanguageBar slug={project.slug} /><h2>Tools & frameworks</h2><div className="tag-list">{project.stack.map((tool) => <span key={tool}>{tool}</span>)}</div></aside></div>
    <nav className="case-pagination" aria-label="Browse project case studies"><Link to={`/projects/${previous.slug}`}><FiArrowLeft /><span><small>Previous</small>{previous.shortTitle}</span></Link><Link to={`/projects/${next.slug}`}><span><small>Next</small>{next.shortTitle}</span><FiArrowRight /></Link></nav>
  </article>;
}
