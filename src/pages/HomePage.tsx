import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { getProjectBySlug } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import ToolsStrip from '../components/ToolsStrip';
import useMotionVisibility from '../components/useMotionVisibility';

const HeroScene = lazy(() => import('../components/HeroScene'));
const fallback = <div className="workflow-fallback"><span>Interfaces</span><span>AI & automation</span><strong>Build & connect</strong><span>Web products</span><span>Data & stories</span></div>;
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? fallback : this.props.children; }
}
function Workflow() {
  const ref = useRef<HTMLDivElement>(null); const active = useMotionVisibility(ref); const [supported, setSupported] = useState(false);
  useEffect(() => {
    try { const canvas = document.createElement('canvas'); setSupported(!!(canvas.getContext('webgl2') || canvas.getContext('webgl'))); } catch { setSupported(false); }
  }, []);
  return <div className="workflow-scene" ref={ref} role="img" aria-label="A floating 3D product workspace with the real LeadMaps interface, code, a video timeline and orbiting development tools."><SceneBoundary>{supported ? <Suspense fallback={fallback}><HeroScene active={active} /></Suspense> : fallback}</SceneBoundary></div>;
}
export default function HomePage() {
  const featured = ['riceguardai', 'leadmaps', 'video-editing'].map((slug) => getProjectBySlug(slug)).filter((item): item is NonNullable<typeof item> => !!item);
  return <div className="home-page content-page">
    <ToolsStrip compact featured />
    <section className="home-hero"><div className="home-hero__copy"><p className="eyebrow">JOEL LAGGUI JR. <span>/ DEVELOPER & CREATOR</span></p><h1>I build software.<br /><span>And stories<br /> that move.</span></h1><div className="hero-actions"><Link className="button button--primary" to="/projects">Explore my work <FiArrowRight /></Link><Link className="text-link" to="/contact">Get in touch <FiArrowUpRight /></Link></div></div><Workflow /></section>
    <section id="selected-work" className="home-selected" aria-label="Latest projects"><div className="home-projects">{featured.map((project) => <ProjectCard key={project.slug} project={project} compact />)}</div></section>
  </div>;
}
