import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiCheck, FiInfo, FiX } from 'react-icons/fi';
import { capabilities, tools } from '../data/capabilities';
import { getProjectBySlug } from '../data/projects';
import ProjectPreview from '../components/ProjectPreview';
import { ToolIcon } from '../components/ToolsStrip';

const seoEvidence = [
  { name: 'Google Search Console', src: '/assets/projects/seo/search-console.jpg', alt: 'Actual LeadMaps Search Console performance report, captured October 22, 2026' },
  { name: 'OpenSEO', src: '/assets/projects/seo/openseo-audit.jpg', alt: 'Actual completed LeadMaps OpenSEO audit, captured October 22, 2026' },
];
function SeoEvidence() {
  const [selected, setSelected] = useState(0); const evidence = seoEvidence[selected];
  return <div className="seo-evidence"><a href={evidence.src} target="_blank" rel="noreferrer" aria-label={`Open full ${evidence.name} screenshot`}><img src={evidence.src} alt={evidence.alt} /></a><div className="seo-evidence__tabs" aria-label="SEO project evidence">{seoEvidence.map((item, index) => <button key={item.name} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.name}</button>)}</div></div>;
}

export default function ServicesPage() {
  const [selected, setSelected] = useState(0); const [expanded, setExpanded] = useState(false); const service = capabilities[selected];
  return <div className="content-page services-page"><header className="page-header"><p className="eyebrow">Services</p><h1>What can I help you make?</h1><p>A focused build, a connected workflow, or a story worth watching.</p></header>
    <div className="service-workspace"><nav className="service-list" aria-label="Choose a service">{capabilities.map((item, index) => <button key={item.id} aria-pressed={selected === index} onClick={() => { setSelected(index); setExpanded(false); }}><span>0{index + 1}</span>{item.title}<FiArrowUpRight /></button>)}</nav>
      <section className="service-preview service-preview--immersive" key={service.id} tabIndex={0} aria-label={`${service.title} project preview. Hover or focus for details.`} data-expanded={expanded}
        onPointerEnter={(event) => { if (event.pointerType === 'mouse') setExpanded(true); }}
        onPointerLeave={(event) => { if (event.pointerType === 'mouse' && !event.currentTarget.matches(':focus-within')) setExpanded(false); }}
        onFocus={(event) => { if (event.target === event.currentTarget) setExpanded(true); }}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setExpanded(false); }}
        onKeyDown={(event) => { if (event.key === 'Escape') { setExpanded(false); event.stopPropagation(); } }}>
        <div className="service-preview__image">{service.id === 'seo' ? <SeoEvidence /> : <ProjectPreview project={getProjectBySlug(service.project)!} contain />}</div>
        <button className="service-details-toggle" aria-label={expanded ? 'Hide service details' : 'Show service details'} aria-expanded={expanded} aria-controls={`service-details-${service.id}`} onClick={() => setExpanded((value) => !value)}>{expanded ? <FiX /> : <FiInfo />}</button>
        <div id={`service-details-${service.id}`} className="service-preview__body"><div className="service-card__top"><div className="service-card__logos" aria-label={`Tools: ${service.logos.join(', ')}`}>{service.logos.map((name) => <span key={name} title={name}><ToolIcon tool={tools.find((item) => item.name === name)!} /></span>)}</div><span>0{selected + 1} / 06</span></div><h2>{service.title}</h2><p className="service-card__line">{service.line}</p><span className="service-card__badge">{service.badge}</span><ul>{service.details.map((detail) => <li key={detail}><FiCheck />{detail}</li>)}</ul><div className="service-preview__footer"><Link to={`/projects/${service.project}`}>See the work <FiArrowUpRight /></Link></div></div>
      </section>
    </div><div className="service-cta"><span>Have a project in mind?</span><Link className="button button--primary" to={`/contact?service=${encodeURIComponent(service.title)}`}>Get in touch <FiArrowRight /></Link></div>
  </div>;
}
