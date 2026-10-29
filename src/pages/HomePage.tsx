import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { getProjectBySlug } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import ToolsStrip from '../components/ToolsStrip';
import useMotionVisibility from '../components/useMotionVisibility';
import { themes, type ThemeId } from '../data/themes';
import { markSceneReady } from '../utils/startup';
import useMediaQuery from '../components/useMediaQuery';

const HeroScene = lazy(() => import('../components/HeroScene'));
const portraitFallback = (theme: ThemeId) => <div className="portrait-fallback"><img src={themes.find((item) => item.id === theme)!.portrait} alt="Joel at his laptop" decoding="async" fetchPriority="high" /></div>;
class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode; theme: ThemeId }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { markSceneReady(); }
  componentDidUpdate(previous: { theme: ThemeId }) { if (this.state.failed && previous.theme !== this.props.theme) this.setState({ failed: false }); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
function Portrait({ theme }: { theme: ThemeId }) {
  const ref = useRef<HTMLDivElement>(null); const active = useMotionVisibility(ref); const [supported, setSupported] = useState(false);
  useEffect(() => {
    try {
      // Software rendering can block interaction for seconds. Keep the photograph
      // until an accelerated context is available, then release this probe.
      const canvas = document.createElement('canvas');
      const options: WebGLContextAttributes = { failIfMajorPerformanceCaveat: true, powerPreference: 'low-power' };
      const context = canvas.getContext('webgl2', options) || canvas.getContext('webgl', options);
      setSupported(!!context);
      context?.getExtension('WEBGL_lose_context')?.loseContext();
      if (!context) markSceneReady();
    } catch { setSupported(false); markSceneReady(); }
  }, []);
  const fallback = portraitFallback(theme);
  return <div className="workflow-scene" ref={ref} role="img" aria-label={`Joel’s original portrait in a ${themes.find((item) => item.id === theme)!.name} scene with themed 3D objects and pointer parallax.`}><SceneBoundary theme={theme} fallback={fallback}>{supported ? <Suspense fallback={fallback}><HeroScene active={active} theme={theme} /></Suspense> : fallback}</SceneBoundary></div>;
}
export default function HomePage({ theme = 'studio' }: { theme?: ThemeId }) {
  const desktop = useMediaQuery('(min-width: 768px)');
  const [entered, setEntered] = useState(() => document.documentElement.dataset.startup === 'ready');
  useEffect(() => {
    const update = () => setEntered(document.documentElement.dataset.startup === 'ready');
    window.addEventListener('joel-studio-visibility', update);
    return () => window.removeEventListener('joel-studio-visibility', update);
  }, []);
  const featured = ['riceguardai', 'leadmaps', 'video-editing', 'sitio-alto-resort'].map((slug) => getProjectBySlug(slug)).filter((item): item is NonNullable<typeof item> => !!item);
  return <div className="home-page content-page">
    <ToolsStrip compact featured />
    <section className="home-hero"><div className="home-hero__copy"><p className="eyebrow">JOEL LAGGUI JR. <span>/ DEVELOPER & CREATOR</span></p><h1>I turn ambitious ideas.<br /><span>Into real-world solutions.</span></h1><div className="hero-actions"><Link className="button button--primary" to="/projects">Explore my work <FiArrowRight /></Link><Link className="text-link" to="/contact">Get in touch <FiArrowUpRight /></Link></div></div>{desktop && entered && <Portrait theme={theme} />}</section>
    <section id="selected-work" className="home-selected" aria-label="Latest projects" data-reveal-skip><div className="home-projects">{featured.map((project) => <ProjectCard key={project.slug} project={project} compact priority />)}</div></section>
    <nav className="home-collections" aria-label="Explore work by discipline"><Link to="/projects?category=web">Websites & SaaS <FiArrowUpRight /></Link><Link to="/projects?category=data">AI & data <FiArrowUpRight /></Link><Link to="/projects?category=video">Video & motion <FiArrowUpRight /></Link></nav>
  </div>;
}
