import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FiArrowUpRight, FiChevronDown, FiCode, FiCommand, FiDownload, FiFolder, FiGithub, FiHome, FiMail, FiSidebar, FiMonitor, FiPause, FiPlay, FiSearch, FiSettings, FiTerminal, FiUser, FiX, FiZap } from 'react-icons/fi';
import { projects, legacyProjectRoutes } from './data/projects';
import { themes, loadTheme, type ThemeId } from './data/themes';
import JoelAssistant from './components/JoelAssistant';
import StudioCommands from './components/StudioCommands';
import { sections, resume, studioAction } from './utils/studio';
import VisitCount from './components/VisitCount';
import CursorTrail from './components/CursorTrail';
import MotionOrchestrator from './components/MotionOrchestrator';
import LandingBackdrop from './components/LandingBackdrop';
import { useMotionSettings } from './components/motion-context';
import StudioLoader from './components/StudioLoader';
import PortfolioAnalytics from './components/PortfolioAnalytics';

const pages = {
  '/': () => import('./pages/HomePage'), '/projects': () => import('./pages/ProjectsPage'),
  '/about': () => import('./pages/AboutPage'), '/contact': () => import('./pages/ContactPage'),
  '/tools': () => import('./pages/ToolsPage'), '/services': () => import('./pages/ServicesPage'),
};
const HomePage = lazy(pages['/']);
const ProjectsPage = lazy(pages['/projects']);
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const AboutPage = lazy(pages['/about']);
const ContactPage = lazy(pages['/contact']);
const ToolsPage = lazy(pages['/tools']);
const ServicesPage = lazy(pages['/services']);
function preparePage(path: string) {
  if (path === '/') return pages['/']();
  if (path.startsWith('/projects/')) return import('./pages/CaseStudyPage');
  return (pages[path === '/skills' ? '/tools' : path as keyof typeof pages] ?? pages['/'])();
}
const icons = [FiHome, FiFolder, FiZap, FiMonitor, FiUser, FiMail];
function ProjectRoute() {
  const { slug } = useParams();
  return slug && /^\d+$/.test(slug) ? <Navigate replace to={legacyProjectRoutes[slug] ?? '/projects'} /> : <CaseStudyPage />;
}
export default function App() {
  const { paused, toggle: toggleMotion } = useMotionSettings();
  const motionButton = <button className="icon-button motion-toggle" onClick={toggleMotion} aria-label={paused ? 'Resume motion' : 'Pause motion'} title={paused ? 'Resume motion' : 'Pause motion'} aria-pressed={paused}>{paused ? <FiPlay /> : <FiPause />}</button>;
  const location = useLocation(); const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null); const mainRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<ThemeId>(loadTheme);
  const [loading, setLoading] = useState(true);
  const shellRef = useRef<HTMLDivElement>(null);
  const finishStartup = useCallback(() => setLoading(false), []);
  const appearance = themes.find((item) => item.id === theme)!;
  const [sidebar, setSidebar] = useState(true); const [assistant, setAssistant] = useState(false);
  const [tabs, setTabs] = useState(['/', '/projects', '/contact']);
  const active = sections.find((section) => section.href === location.pathname);
  const project = projects.find((item) => location.pathname === `/projects/${item.slug}`);
  const pageTitle = active?.label ?? project?.shortTitle ?? 'Home';
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('joel-theme', theme); } catch { /* Storage is optional. */ }
  }, [theme]);
  useLayoutEffect(() => {
    document.documentElement.dataset.startup = loading ? 'loading' : 'ready';
    if (shellRef.current) shellRef.current.inert = loading;
    window.dispatchEvent(new Event('joel-studio-visibility'));
    if (!loading) mainRef.current?.focus({ preventScroll: true });
  }, [loading]);
  useEffect(() => {
    document.title = `${pageTitle} — Joel Laggui Jr.`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://joellaggui.vercel.app${location.pathname}`);
    setTabs((old) => old.includes(location.pathname) ? old : [...old.slice(-5), location.pathname]);
  }, [location.pathname, pageTitle]);
  useLayoutEffect(() => {
    const region = scrollRef.current; region?.scrollTo({ top: 0, behavior: 'instant' });
    mainRef.current?.focus({ preventScroll: true });
    if (!location.hash || !region) return;
    const seek = () => { const target = document.getElementById(location.hash.slice(1)); if (!target) return false; target.scrollIntoView({ behavior: 'instant', block: 'start' }); return true; };
    const observer = new MutationObserver(() => { if (seek()) observer.disconnect(); });
    if (!seek()) observer.observe(region, { subtree: true, childList: true });
    return () => observer.disconnect();
  }, [location.pathname, location.hash]);
  useEffect(() => {
    const open = () => setAssistant(true); window.addEventListener('open-joel-assistant', open);
    return () => window.removeEventListener('open-joel-assistant', open);
  }, []);
  useEffect(() => {
    const region = scrollRef.current; if (!region) return;
    let frame = 0;
    const update = () => { if (frame) return; frame = requestAnimationFrame(() => {
      frame = 0;
      const reduce = paused || matchMedia('(prefers-reduced-motion: reduce)').matches;
      const regionTop = region.getBoundingClientRect().top, midpoint = region.clientHeight * .5;
      const positions = [...region.querySelectorAll<HTMLElement>('[data-parallax]')].map((element) => {
        const top = element.getBoundingClientRect().top - regionTop;
        return { element, value: reduce ? 0 : Math.max(-22, Math.min(22, (midpoint - top) * .035)) };
      });
      positions.forEach(({ element, value }) => { const transform = `translate3d(0,${value}px,0)`; if (element.style.transform !== transform) element.style.transform = transform; });
    }); };
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    region.addEventListener('scroll', update, { passive: true }); media.addEventListener('change', update); update();
    return () => { region.removeEventListener('scroll', update); media.removeEventListener('change', update); cancelAnimationFrame(frame); };
  }, [location.pathname, paused]);
  return <>{!loading && <PortfolioAnalytics />}{loading && <StudioLoader theme={theme} path={location.pathname} preparePage={preparePage} onComplete={finishStartup} />}<div ref={shellRef} aria-hidden={loading ? true : undefined} className={`app-shell ${location.pathname === '/' ? 'app-shell--home' : ''} ${sidebar ? '' : 'sidebar-hidden'}`}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="title-bar">
      <StudioCommands theme={theme} setTheme={setTheme} toggleSidebar={() => setSidebar((old) => !old)} openAssistant={() => setAssistant(true)} />
      <button className="command-trigger" onClick={() => studioAction('palette')}><FiSearch /><span>Explore Joel’s portfolio</span><kbd>Ctrl K</kbd></button>
      <div className="title-tools"><span className="mobile-motion">{motionButton}</span><button className="icon-button mobile-sidebar-toggle" onClick={() => setSidebar((old) => !old)} aria-label="Toggle sidebar" aria-expanded={sidebar}><FiSidebar /></button><button className="icon-button mobile-theme" onClick={() => studioAction('theme')} aria-label="Choose color theme"><FiSettings /></button></div>
    </header>
    <div className="workspace-grid">
      <aside className="activity-rail" aria-label="Studio utilities"><div><button onClick={() => setSidebar((old) => !old)} aria-label="Toggle sidebar" title={sidebar ? 'Collapse sidebar' : 'Expand sidebar'} aria-expanded={sidebar}><FiSidebar /></button><button onClick={() => setAssistant(true)} aria-label="Open Joel Assistant" title="Joel Assistant"><FiCommand /></button><button onClick={() => studioAction('terminal')} aria-label="Open terminal" title="Portfolio terminal"><FiTerminal /></button></div><div>{motionButton}<button onClick={() => studioAction('theme')} aria-label="Choose color theme" title="Color theme"><FiSettings /></button></div></aside>
      <aside className="explorer-panel" aria-label="Portfolio navigation"><div className="explorer-heading"><span>EXPLORER</span><button className="icon-button" onClick={() => studioAction('palette')} aria-label="Find a page">•••</button></div><div className="explorer-root"><FiChevronDown /> JOEL’S STUDIO</div><nav>{sections.map(({ href, label }, index) => { const Icon = icons[index]; return <NavLink key={href} to={href} end={href === '/'}><Icon />{label}{label === 'Projects' && <span className="nav-count">{projects.length}</span>}</NavLink>; })}<a href={resume} target="_blank" rel="noreferrer"><FiDownload />Resume<FiArrowUpRight className="nav-out" /></a></nav><div className="explorer-profile"><img src={appearance.avatar} alt="Joel Laggui Jr." /><strong>Joel Laggui Jr.</strong><span>Developer & creator</span><p><span className="availability-dot" /> Open to work</p><VisitCount enabled={!loading} /><a href="https://github.com/GITLAGGUI" target="_blank" rel="noreferrer"><FiGithub /> Find me on GitHub <FiArrowUpRight /></a></div></aside>
      <section className="editor-pane">{location.pathname === '/' && <LandingBackdrop theme={theme} />}<nav className="editor-tabs" aria-label="Open pages">{tabs.map((href) => {
        const title = sections.find((section) => section.href === href)?.label ?? projects.find((item) => href === `/projects/${item.slug}`)?.shortTitle ?? 'Project';
        return <div className={`editor-tab ${href === location.pathname ? 'editor-tab--active' : ''}`} key={href}><NavLink to={href} end><FiCode /><span>{title}</span></NavLink><button aria-label={`Close ${title} tab`} onClick={() => { const rest = tabs.filter((tab) => tab !== href); setTabs(rest.length ? rest : ['/']); if (href === location.pathname) navigate(rest[rest.length - 1] ?? '/'); }}><FiX /></button></div>;
      })}<button className="tabs-more icon-button" aria-label="Open a page" onClick={() => studioAction('palette')}>+</button></nav>
      <div className="breadcrumbs"><span>portfolio</span><span>/</span><span>{project ? 'projects / ' : ''}{pageTitle}</span><span className="breadcrumbs__right"><span className="availability-dot" /> Available for projects</span></div>
      <main id="main-content" ref={mainRef} tabIndex={-1} className={`editor-main ${location.pathname === '/contact' ? 'editor-main--contact' : ''}`}><div className="editor-scroll" ref={scrollRef} data-testid="editor-scroll-region"><Suspense fallback={<div className="route-loading">Opening {pageTitle}…</div>}><div className="route-stage" key={location.pathname}><Routes>
        <Route path="/" element={<HomePage theme={theme} />} /><Route path="/projects" element={<ProjectsPage />} /><Route path="/projects/:slug" element={<ProjectRoute />} /><Route path="/services" element={<ServicesPage />} /><Route path="/tools" element={<ToolsPage />} /><Route path="/skills" element={<Navigate replace to="/tools?view=skills" />} /><Route path="/about" element={<AboutPage theme={theme} />} /><Route path="/contact" element={<ContactPage />} /><Route path="*" element={<Navigate replace to="/" />} />
      </Routes></div></Suspense></div></main></section>
    </div>
    <footer className="status-bar"><div><FiCode /> portfolio <span>·</span><span>Philippines, GMT+8</span></div><div><VisitCount enabled={!loading} /><span>{themes.find((item) => item.id === theme)?.name}</span></div></footer>
    <JoelAssistant open={assistant} onClose={() => setAssistant(false)} />
    <CursorTrail /><MotionOrchestrator region={scrollRef} route={location.pathname} enabled={!loading} />
  </div></>;
}
