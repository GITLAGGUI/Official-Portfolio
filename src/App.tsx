import {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { NavLink, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import {
  VscAccount,
  VscChevronDown,
  VscCode,
  VscFiles,
  VscGithub,
  VscJson,
  VscMail,
  VscMarkdown,
  VscRemote,
  VscSearch,
  VscSettingsGear,
  VscSourceControl,
} from "react-icons/vsc";
import { featuredProjects, legacyProjectRoutes } from "./data/projects";
import JoelAssistant from "./components/JoelAssistant";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

type TabDefinition = {
  label: string;
  href: string;
  kind: "tsx" | "md" | "json" | "ts";
};

const baseTabs: TabDefinition[] = [
  { label: "home.tsx", href: "/", kind: "tsx" },
  { label: "about.md", href: "/about", kind: "md" },
  { label: "projects.json", href: "/projects", kind: "json" },
  { label: "contact.ts", href: "/contact", kind: "ts" },
];

function LegacyProjectRedirect() {
  const { slug } = useParams();
  if (!slug || !/^\d+$/.test(slug)) return null;
  return <Navigate replace to={legacyProjectRoutes[slug] ?? "/projects"} />;
}

function RouteContent() {
  return (
    <Suspense fallback={<div className="route-loading">Opening file…</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<CaseStudyRoute />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Suspense>
  );
}

function CaseStudyRoute() {
  const { slug } = useParams();
  if (slug && /^\d+$/.test(slug)) return <LegacyProjectRedirect />;
  return <CaseStudyPage />;
}

function App() {
  const location = useLocation();
  const scrollRegionRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);

  const activeTab = useMemo(() => {
    if (location.pathname.startsWith("/projects/") && location.pathname !== "/projects") {
      const segments = location.pathname.split("/").filter(Boolean);
      const slug = segments[segments.length - 1] ?? "project";
      return { label: `${slug}.md`, href: location.pathname, kind: "md" as const };
    }
    return (
      baseTabs.find((tab) =>
        tab.href === "/" ? location.pathname === "/" : location.pathname.startsWith(tab.href),
      ) ?? baseTabs[0]
    );
  }, [location.pathname]);

  const visibleTabs = useMemo(() => {
    if (activeTab.href.startsWith("/projects/") && activeTab.href !== "/projects") {
      return [...baseTabs.slice(0, 3), activeTab, baseTabs[3]];
    }
    return baseTabs;
  }, [activeTab]);

  useLayoutEffect(() => {
    const region = scrollRegionRef.current;
    if (!region) return;

    region.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        document.querySelector(location.hash)?.scrollIntoView({ block: "start" });
      }
      mainRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const pageName = activeTab.label.replace(/\.(tsx|ts|json|md)$/, "");
    document.title = `${pageName === "home" ? "Joel Laggui" : pageName} — Portfolio`;
  }, [activeTab.label]);

  useEffect(() => {
    const openAssistant = () => setAssistantOpen(true);
    window.addEventListener("open-joel-assistant", openAssistant);
    return () => window.removeEventListener("open-joel-assistant", openAssistant);
  }, []);

  const tabIcon = (kind: TabDefinition["kind"]) => {
    if (kind === "md") return <VscMarkdown aria-hidden="true" />;
    if (kind === "json") return <VscJson aria-hidden="true" />;
    return <VscCode aria-hidden="true" />;
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="title-bar">
        <div className="title-bar__menus" aria-hidden="true">
          <img src="/assets/vscode_icon.svg" alt="" />
          <span>File</span>
          <span>Edit</span>
          <span>Selection</span>
          <span>View</span>
          <span>Go</span>
          <span>Run</span>
          <span>Terminal</span>
          <span>Help</span>
        </div>
        <NavLink className="title-bar__title" to="/">
          Joel Laggui Jr. — Full-Stack Developer &amp; AI Automation Builder
        </NavLink>
        <div className="window-controls" aria-hidden="true">
          <span className="window-control window-control--amber" />
          <span className="window-control window-control--sage" />
          <span className="window-control window-control--rose" />
        </div>
      </header>

      <div className="workspace-grid">
        <aside className="activity-rail" aria-label="Primary navigation">
          <div className="activity-rail__top">
            <NavLink to="/projects" aria-label="Projects" title="Projects">
              <VscFiles />
            </NavLink>
            <NavLink to="/about" aria-label="About" title="About">
              <VscSearch />
            </NavLink>
            <NavLink to="/projects" aria-label="Work archive" title="Work archive">
              <VscSourceControl />
            </NavLink>
            <NavLink to="/contact" aria-label="Contact" title="Contact">
              <VscMail />
            </NavLink>
            <button
              type="button"
              aria-label="Open Joel Assistant"
              title="Joel Assistant"
              onClick={() => setAssistantOpen(true)}
            >
              <VscRemote />
            </button>
          </div>
          <div className="activity-rail__bottom">
            <NavLink to="/about" aria-label="Profile" title="Profile">
              <VscAccount />
            </NavLink>
            <span aria-hidden="true">
              <VscSettingsGear />
            </span>
          </div>
        </aside>

        <aside className="explorer-panel" aria-label="Portfolio explorer">
          <div className="explorer-panel__heading">
            <span>EXPLORER</span>
            <span aria-hidden="true">•••</span>
          </div>
          <nav>
            <div className="tree-row tree-row--root">
              <VscChevronDown aria-hidden="true" />
              <strong>PORTFOLIO</strong>
            </div>
            <div className="tree-group">
              <div className="tree-row tree-row--folder">
                <VscChevronDown aria-hidden="true" />
                <span>profile</span>
              </div>
              <NavLink className="tree-link" to="/about">
                <VscMarkdown /> about.md
              </NavLink>
              <NavLink className="tree-link" to="/about#skills">
                <VscMarkdown /> skills.md
              </NavLink>
              <a className="tree-link" href="/assets/New Resume.pdf" target="_blank" rel="noreferrer">
                <span className="file-badge file-badge--pdf">PDF</span> resume.pdf
              </a>
            </div>

            <div className="tree-group">
              <div className="tree-row tree-row--folder">
                <VscChevronDown aria-hidden="true" />
                <span>projects</span>
              </div>
              {featuredProjects.slice(0, 8).map((project) => (
                <NavLink className="tree-link" key={project.slug} to={`/projects/${project.slug}`}>
                  <VscMarkdown /> {project.slug}.md
                </NavLink>
              ))}
              <NavLink className="tree-link tree-link--more" to="/projects">
                + more work
              </NavLink>
            </div>

            <div className="tree-group tree-group--utility">
              <NavLink className="tree-link" to="/contact">
                <VscCode /> contact.ts
              </NavLink>
              <span className="tree-link tree-link--static">
                <VscJson /> config.json
              </span>
              <a className="tree-link" href="https://github.com/GITLAGGUI" target="_blank" rel="noreferrer">
                <VscGithub /> GitHub
              </a>
            </div>
          </nav>
        </aside>

        <section className="editor-pane">
          <nav className="editor-tabs" aria-label="Open portfolio files">
            {visibleTabs.map((tab) => (
              <NavLink
                key={`${tab.href}-${tab.label}`}
                className={({ isActive }) =>
                  `editor-tab ${isActive || activeTab.href === tab.href ? "editor-tab--active" : ""}`
                }
                to={tab.href}
              >
                {tabIcon(tab.kind)}
                <span>{tab.label}</span>
                {activeTab.href === tab.href && <span className="editor-tab__close" aria-hidden="true">×</span>}
              </NavLink>
            ))}
          </nav>

          <main id="main-content" ref={mainRef} className="editor-main" tabIndex={-1}>
            <div ref={scrollRegionRef} className="editor-scroll" data-testid="editor-scroll-region">
              <RouteContent />
            </div>
          </main>
        </section>
      </div>

      <footer className="status-bar">
        <div>
          <VscSourceControl aria-hidden="true" /> main
          <span>× 0</span>
          <span>△ 0</span>
        </div>
        <div>
          <span>{activeTab.kind === "md" ? "Markdown" : "TypeScript React"}</span>
          <span>UTF-8</span>
          <span>Prettier</span>
        </div>
      </footer>

      <JoelAssistant open={assistantOpen} onClose={() => setAssistantOpen(false)} />
    </div>
  );
}

export default App;
