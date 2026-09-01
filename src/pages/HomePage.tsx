import { lazy, Suspense, useEffect, useState } from "react";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { VscCheck, VscCode, VscEye, VscJson, VscRemote } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { featuredProjects } from "../data/projects";

const HeroScene = lazy(() => import("../components/HeroScene"));

const focusItems = [
  { icon: VscCode, title: "Web products", detail: "React · TypeScript · APIs · Cloud" },
  { icon: VscRemote, title: "Automation", detail: "n8n · OpenClaw · Workflows" },
  { icon: VscEye, title: "Computer vision", detail: "CVAT · YOLO segmentation · AWS" },
  { icon: VscJson, title: "NLP & data", detail: "ABSA · Topic models · Audits" },
];

function openAssistant() {
  window.dispatchEvent(new CustomEvent("open-joel-assistant"));
}

export default function HomePage() {
  const primaryProject = featuredProjects[0];
  const secondaryProjects = featuredProjects.slice(1, 3);
  const [renderInteractiveRibbon, setRenderInteractiveRibbon] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const update = () => setRenderInteractiveRibbon(media.matches && (navigator.hardwareConcurrency ?? 4) >= 4);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div className="home-workbench">
      <section className="hero-editor" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">Hello, I’m</p>
          <h1 id="home-title">Joel<br /><span>Laggui Jr.</span></h1>
          <p className="hero-role">Full-Stack Developer &amp; AI Automation Builder</p>
          <p className="hero-summary">
            I build useful web products and automation systems—plus computer-vision and NLP pipelines grounded in real data.
          </p>
          <div className="hero-actions">
            <Link className="button button--primary" to="/projects">
              Explore work <FiArrowRight />
            </Link>
            <button className="button button--secondary" type="button" onClick={openAssistant}>
              Joel Assistant <FiExternalLink />
            </button>
          </div>

          <div className="focus-list">
            <p className="section-kicker">Current focus</p>
            {focusItems.map((item) => {
              const Icon = item.icon;
              return (
                <div className="focus-list__item" key={item.title}>
                  <Icon aria-hidden="true" />
                  <div><strong>{item.title}</strong><span>{item.detail}</span></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hero-ribbon" aria-hidden="true">
          {renderInteractiveRibbon ? (
            <Suspense fallback={<img src="/assets/hero/data-ribbon-fallback.png" alt="" />}>
              <HeroScene />
            </Suspense>
          ) : (
            <img src="/assets/hero/data-ribbon-fallback.png" alt="" />
          )}
          <span className="ribbon-label ribbon-label--web">WEB<br />PRODUCTS</span>
          <span className="ribbon-label ribbon-label--automation">AUTOMATION</span>
          <span className="ribbon-label ribbon-label--vision">COMPUTER<br />VISION</span>
          <span className="ribbon-label ribbon-label--nlp">NLP</span>
        </div>
      </section>

      <section className="project-preview" aria-labelledby="featured-work-title">
        <div className="project-preview__toolbar">
          <span><VscEye /> Preview</span>
          <span aria-hidden="true">•••</span>
        </div>
        <Link className="project-preview__image" to={`/projects/${primaryProject.slug}`}>
          <img src={primaryProject.hero} alt={primaryProject.heroAlt} />
        </Link>
        <div className="project-preview__body">
          <div className="project-preview__title-row">
            <div>
              <p className="eyebrow">Featured case study</p>
              <h2 id="featured-work-title">{primaryProject.title}</h2>
              <p>{primaryProject.subtitle}</p>
            </div>
            <span className="status-chip"><VscCheck /> {primaryProject.status}</span>
          </div>
          <dl className="evidence-list">
            <div><dt>Role</dt><dd>{primaryProject.role}</dd></div>
            <div><dt>Challenge</dt><dd>{primaryProject.challenge}</dd></div>
            <div><dt>Approach</dt><dd>{primaryProject.approach[0]}</dd></div>
            <div><dt>Outcome</dt><dd>{primaryProject.outcome[0]}</dd></div>
          </dl>
          <div className="preview-related">
            {secondaryProjects.map((project) => (
              <Link to={`/projects/${project.slug}`} key={project.slug}>
                <img src={project.hero} alt="" loading="lazy" />
                <span><strong>{project.shortTitle}</strong><small>{project.category}</small></span>
                <FiArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="terminal-panel" aria-label="Contact and availability">
        <div className="terminal-tabs"><span>TERMINAL</span><span>PROBLEMS</span><span>OUTPUT</span><span>DEBUG CONSOLE</span></div>
        <div className="terminal-output">
          <p><span className="terminal-prompt">›</span> <strong>Available for new opportunities.</strong></p>
          <p><span className="terminal-prompt">›</span> Let’s build something useful.</p>
          <p><span className="terminal-prompt">›</span> Email: <a href="mailto:jlaggui47@gmail.com">jlaggui47@gmail.com</a> <span className="terminal-divider">|</span> Location: Philippines</p>
          <p><span className="terminal-prompt">›</span> Status: <span className="terminal-ready">Open to work</span></p>
        </div>
      </section>
    </div>
  );
}
