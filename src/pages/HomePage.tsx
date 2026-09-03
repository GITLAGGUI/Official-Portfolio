import { lazy, Suspense, useEffect, useState } from "react";
import { FiArrowRight, FiBarChart2, FiGlobe } from "react-icons/fi";
import { SiJson, SiMarkdown, SiPython, SiReact, SiTypescript } from "react-icons/si";
import { VscCode, VscEye, VscJson, VscRemote, VscServerProcess } from "react-icons/vsc";
import { Link } from "react-router-dom";

const HeroScene = lazy(() => import("../components/HeroScene"));

const focusItems = [
  { icon: VscCode, title: "Websites & apps", detail: "Fast, responsive, and ready to use" },
  { icon: VscRemote, title: "Workflow automation", detail: "Less repetitive work, clearer handoffs" },
  { icon: VscEye, title: "Computer vision", detail: "Drone imagery, annotation, and detection" },
  { icon: VscJson, title: "Language & data", detail: "Sentiment, reports, and decision support" },
];

const inputNodes = [
  { icon: SiTypescript, file: "index.ts", label: "TypeScript", className: "typescript" },
  { icon: SiReact, file: "component.tsx", label: "React TSX", className: "tsx" },
  { icon: SiJson, file: "config.json", label: "JSON", className: "json" },
  { icon: SiMarkdown, file: "readme.md", label: "Markdown", className: "markdown" },
  { icon: SiPython, file: "pipeline.py", label: "Python", className: "python" },
];

const outcomeNodes = [
  { icon: FiGlobe, title: "Deployed", detail: "Website" },
  { icon: VscServerProcess, title: "Automated", detail: "Workflow" },
  { icon: FiBarChart2, title: "AI / data", detail: "Result" },
];

function openAssistant() {
  window.dispatchEvent(new CustomEvent("open-joel-assistant"));
}

export default function HomePage() {
  const [renderInteractiveNetwork, setRenderInteractiveNetwork] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 720px) and (prefers-reduced-motion: no-preference)");
    const update = () =>
      setRenderInteractiveNetwork(media.matches && (navigator.hardwareConcurrency ?? 4) >= 4);
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
            I build websites, internal tools, and automations that help people sell, organize work, and make better use of their data.
          </p>
          <div className="hero-actions">
            <Link className="button button--primary" to="/projects">
              Explore work <FiArrowRight />
            </Link>
            <button className="button button--secondary button--assistant" type="button" onClick={openAssistant}>
              <img src="/assets/assistant/joel-assistant-bot.webp" alt="" /> Joel Assistant
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
          {renderInteractiveNetwork ? (
            <>
              <Suspense fallback={<div className="hero-scene-placeholder" />}>
                <HeroScene />
              </Suspense>
              <div className="network-nodes">
                <div className="network-node-column network-node-column--inputs">
                  {inputNodes.map((node) => {
                    const Icon = node.icon;
                    return (
                      <div className={`network-node network-node--input network-node--${node.className}`} key={node.file}>
                        <Icon />
                        <span><strong>{node.file}</strong><small>{node.label}</small></span>
                      </div>
                    );
                  })}
                </div>
                <div className="network-node network-node--hub network-node--hub-one">
                  <img src="/assets/logos/n8n.svg" alt="" />
                </div>
                <div className="network-node network-node--hub network-node--hub-two">
                  <img src="/assets/logos/n8n.svg" alt="" />
                </div>
                <div className="network-node-column network-node-column--outcomes">
                  {outcomeNodes.map((node) => {
                    const Icon = node.icon;
                    return (
                      <div className="network-node network-node--outcome" key={node.title}>
                        <Icon />
                        <span><strong>{node.title}</strong><small>{node.detail}</small></span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <img className="hero-network-fallback" src="/assets/hero/automation-network-fallback.webp" alt="" />
          )}
        </div>
      </section>

      <section className="terminal-panel" aria-label="Contact and availability">
        <div className="terminal-tabs"><span>TERMINAL</span><span>PROBLEMS</span><span>OUTPUT</span><span>DEBUG CONSOLE</span></div>
        <div className="terminal-output">
          <p><span className="terminal-prompt">›</span> <strong>Available for new opportunities.</strong></p>
          <p><span className="terminal-prompt">›</span> Let’s build something useful.</p>
          <p><span className="terminal-prompt">›</span> Email: <a href="mailto:jlaggui47@gmail.com">jlaggui47@gmail.com</a><span className="terminal-divider">|</span>Location: Philippines</p>
          <p><span className="terminal-prompt">›</span> Status: <span className="terminal-ready">Open to work</span></p>
        </div>
      </section>
    </div>
  );
}
