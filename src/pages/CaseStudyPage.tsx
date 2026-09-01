import { FiArrowLeft, FiArrowRight, FiExternalLink } from "react-icons/fi";
import { Navigate, Link, useParams } from "react-router-dom";
import { getProjectBySlug, projects } from "../data/projects";

export default function CaseStudyPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  if (!project) return <Navigate replace to="/projects" />;

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <article className={`content-page case-study case-study--${project.accent}`}>
      <Link className="back-link" to="/projects"><FiArrowLeft /> All projects</Link>

      <header className="case-study__header">
        <div>
          <p className="eyebrow">{project.category} · {project.status}</p>
          <h1>{project.title}</h1>
          <p className="case-study__lede">{project.summary}</p>
          <div className="case-study__links">
            {project.links.map((link) => (
              <a className="button button--secondary" key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label} <FiExternalLink />
              </a>
            ))}
          </div>
        </div>
        <dl className="case-facts">
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Period</dt><dd>{project.year}</dd></div>
          <div><dt>Status</dt><dd>{project.status}</dd></div>
          <div><dt>Stack</dt><dd>{project.stack.slice(0, 4).join(" · ")}</dd></div>
        </dl>
      </header>

      <figure className="case-study__hero">
        <img src={project.hero} alt={project.heroAlt} />
        <figcaption>{project.heroAlt}. {project.links.length === 0 ? "Public-safe project evidence; no external link is required." : "Captured from the verified project build."}</figcaption>
      </figure>

      {project.metrics && (
        <section className="metric-row" aria-label="Project evidence">
          {project.metrics.map((metric) => (
            <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
          ))}
        </section>
      )}

      <div className="case-study__story">
        <section>
          <p className="section-number">01</p>
          <h2>The challenge</h2>
          <p>{project.challenge}</p>
        </section>
        <section>
          <p className="section-number">02</p>
          <h2>How I approached it</h2>
          <ul>{project.approach.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section>
          <p className="section-number">03</p>
          <h2>Outcome and proof</h2>
          <ul>{project.outcome.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        {project.limitations && (
          <aside className="case-study__note">
            <span>Honest boundary</span>
            <p>{project.limitations}</p>
          </aside>
        )}
      </div>

      <section className="stack-section">
        <p className="eyebrow">Tools and languages</p>
        <div className="tag-list tag-list--large">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      </section>

      <nav className="case-pagination" aria-label="Browse project case studies">
        <Link to={`/projects/${previous.slug}`}><FiArrowLeft /><span><small>Previous</small>{previous.shortTitle}</span></Link>
        <Link to={`/projects/${next.slug}`}><span><small>Next</small>{next.shortTitle}</span><FiArrowRight /></Link>
      </nav>
    </article>
  );
}
