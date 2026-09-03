import { FiDownload, FiExternalLink } from "react-icons/fi";
import { VscCheck, VscCode, VscGraph, VscRemote, VscTools } from "react-icons/vsc";
import { Link } from "react-router-dom";

const skillGroups = [
  {
    icon: VscCode,
    title: "Web & product engineering",
    summary: "Responsive products from interface and data model through deployment and QA.",
    skills: ["React", "TypeScript", "Node.js", "PHP", "Flutter", "Supabase", "Firebase", "Vercel"],
  },
  {
    icon: VscRemote,
    title: "AI automation & agentic tools",
    summary: "Human-reviewed workflows, local agents, APIs, and production tooling.",
    skills: ["n8n", "OpenClaw", "Workflow design", "API integration", "Claude Code", "Codex", "Docker"],
  },
  {
    icon: VscTools,
    title: "Computer vision & cloud",
    summary: "Dataset review and high-resolution segmentation pipelines built around evidence gates.",
    skills: ["Python", "OpenCV", "CVAT", "YOLOv8-seg", "YOLOv26-seg", "Ultralytics", "AWS", "Kaggle"],
  },
  {
    icon: VscGraph,
    title: "NLP & data",
    summary: "Consent-aware research data, aspect analysis, topic discovery, and auditable reporting.",
    skills: ["ABSA", "BERTopic", "MiniLM", "XLM-RoBERTa", "pandas", "Power BI", "Data audit"],
  },
];

const evidenceItems = [
  { title: "Data Analytics Challenge", detail: "Champion · 15th ICT Roadshow 2025", image: "/assets/DATA ANALYTICS CHALLENGE - CHAMPION 1_page-0001.jpg", href: "/assets/DATA ANALYTICS CHALLENGE - CHAMPION 1_page-0001.jpg", kind: "certificate" },
  { title: "Introduction to Modern AI", detail: "DICT-ITU DTC Initiative via Cisco Networking Academy · 2026", image: "/assets/certificates/modern-ai.webp", href: "/assets/certificates/Introduction_to_Modern_AI_Joel_Laggui.pdf", kind: "certificate" },
  { title: "Algorithm and Program Design", detail: "Huawei Talent certificate of completion · 2025", image: "/assets/Huawei_Certificate_of_Completion.png", href: "/assets/Huawei_Certificate_of_Completion.png", kind: "certificate" },
  { title: "Regional ITE Convention", detail: "Participant · St. Paul University Philippines · 2025", image: "/assets/ITE-REF-20250329-802 - Certificate of Participation - Regional ITE Convention 2025_page-0001.jpg", href: "/assets/ITE-REF-20250329-802 - Certificate of Participation - Regional ITE Convention 2025_page-0001.jpg", kind: "certificate" },
  { title: "RoboFusion Champion", detail: "iScene RoboFusion · 2025", image: "/assets/Champion_Robotics.png", href: "/assets/Champion_Robotics.png", kind: "certificate" },
  { title: "Philippine Startup Challenge X", detail: "Team Kaagapay · Regional pitching participant · 2025", image: "/assets/DICT_StartupChallenge_Certificate.png", href: "/assets/DICT_StartupChallenge_Certificate.png", kind: "certificate" },
  { title: "Cyber Defense Exercise Qualifiers", detail: "TRON cybersecurity event documentation", image: "/assets/gallery/cyber-defense-tron-qualifiers.webp", href: "/assets/gallery/cyber-defense-tron-qualifiers.webp", kind: "certificate" },
  { title: "RoboFusion Champion 2025", detail: "Competition gallery", image: "/assets/gallery/robofusion-champion-2025.webp", href: "/assets/gallery/robofusion-champion-2025.webp", kind: "gallery" },
  { title: "ICT Roadshow Champion 2025", detail: "Competition gallery", image: "/assets/gallery/ict-roadshow-champion-2025.webp", href: "/assets/gallery/ict-roadshow-champion-2025.webp", kind: "gallery" },
  { title: "Data Analytics Champion 2025", detail: "Competition gallery", image: "/assets/gallery/data-analytics-champion-2025.webp", href: "/assets/gallery/data-analytics-champion-2025.webp", kind: "gallery" },
  { title: "TALA Defenders", detail: "Team gallery", image: "/assets/gallery/tala-defenders-group.webp", href: "/assets/gallery/tala-defenders-group.webp", kind: "gallery" },
] as const;

export default function AboutPage() {
  return (
    <div className="content-page about-page">
      <header className="about-intro">
        <div className="about-intro__portrait">
          <img src="/assets/profile/joel-profile.webp" alt="Joel Laggui Jr. working on a laptop" />
          <span><VscCheck /> Available for new opportunities</span>
        </div>
        <div>
          <p className="eyebrow">About</p>
          <h1>I build websites, automations, and AI tools that make work easier.</h1>
          <p>
            I’m Joel Laggui Jr., a full-stack developer and AI automation builder from the Philippines. I create customer-facing websites, internal tools, and repeatable workflows that save people from slow manual work.
          </p>
          <p>
            Some of my work uses computer vision and language models. I explain those projects in plain language and show the real screens, workflow exports, and test evidence behind them.
          </p>
          <div className="about-actions">
            <a className="button button--primary" href="/assets/resume/Joel_Laggui_Resume_ATS_2026.pdf" target="_blank" rel="noreferrer">Resume <FiDownload /></a>
            <Link className="button button--secondary" to="/contact">Work with me <FiExternalLink /></Link>
          </div>
        </div>
      </header>

      <section id="skills" className="skills-section" aria-labelledby="skills-title">
        <div className="section-heading">
          <div><p className="eyebrow">Capabilities</p><h2 id="skills-title">Skills</h2></div>
          <p>A clear view of what I can build, followed by the tools I use to do it.</p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <article key={group.title}>
                <Icon aria-hidden="true" />
                <h3>{group.title}</h3>
                <p>{group.summary}</p>
                <div className="tag-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="working-style" aria-labelledby="working-style-title">
        <div><p className="eyebrow">How I work</p><h2 id="working-style-title">A practical build loop</h2></div>
        <ol>
          <li><span>01</span><div><strong>Find the real constraint</strong><p>Read the source, inspect the existing workflow, and separate product intent from assumptions.</p></div></li>
          <li><span>02</span><div><strong>Build the smallest useful system</strong><p>Connect the main journey first, then refine the details that improve trust and usability.</p></div></li>
          <li><span>03</span><div><strong>Verify what actually happened</strong><p>Use browser QA, logs, tests, dataset audits, and deployed behavior before calling the work complete.</p></div></li>
        </ol>
      </section>

      <section id="achievements" className="achievements-section" aria-labelledby="achievements-title">
        <div className="section-heading">
          <div><p className="eyebrow">Evidence & moments</p><h2 id="achievements-title">Certificates & gallery</h2></div>
          <p>Certificates, competition results, and real moments from the work. Hover or focus a certificate to read its details.</p>
        </div>
        <div className="achievement-grid">
          {evidenceItems.map((item) => (
            <a key={`${item.title}-${item.image}`} href={item.href} target="_blank" rel="noreferrer" data-kind={item.kind} aria-label={`Open ${item.title}`}>
              <article>
                <img src={item.image} alt={item.kind === "certificate" ? `${item.title} certificate or event record` : item.title} loading="lazy" />
                {item.kind === "certificate" ? <div><h3>{item.title}</h3><p>{item.detail}</p></div> : null}
              </article>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
