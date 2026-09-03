import { FiDownload, FiExternalLink } from "react-icons/fi";
import { SiCsharp, SiCss3, SiDart, SiHtml5, SiJavascript, SiMysql, SiPhp, SiPowershell, SiPython, SiTypescript } from "react-icons/si";
import { VscCheck, VscCode, VscGraph, VscRemote, VscTools } from "react-icons/vsc";
import { Link } from "react-router-dom";

const skillGroups = [
  {
    icon: VscCode,
    number: "01",
    title: "Web & software engineering",
    summary: "Responsive websites, business systems, APIs, and desktop or mobile applications.",
    languages: [
      { name: "HTML", icon: SiHtml5, color: "#e34f26" },
      { name: "CSS", icon: SiCss3, color: "#1572b6" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "PHP", icon: SiPhp, color: "#777bb4" },
      { name: "Dart", icon: SiDart, color: "#0175c2" },
      { name: "C#", icon: SiCsharp, color: "#9b4f96" },
      { name: "SQL", icon: SiMysql, color: "#4479a1" },
    ],
    tools: ["React", "Next.js", "Node.js", "Flutter", "Supabase", "Firebase", "Vercel"],
  },
  {
    icon: VscRemote,
    number: "02",
    title: "AI automation & agentic systems",
    summary: "Connected workflows and assistants that reduce repetitive work while keeping review points clear.",
    languages: [
      { name: "Python", icon: SiPython, color: "#ffd343" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "PowerShell", icon: SiPowershell, color: "#5391fe" },
    ],
    tools: ["n8n", "OpenClaw", "Claude Code", "Codex", "Docker", "Playwright", "REST APIs", "Webhooks"],
  },
  {
    icon: VscTools,
    number: "03",
    title: "Computer vision & cloud",
    summary: "Drone imagery, annotation, dataset review, model training, and deployment-ready inference pipelines.",
    languages: [
      { name: "Python", icon: SiPython, color: "#ffd343" },
      { name: "SQL", icon: SiMysql, color: "#4479a1" },
      { name: "PowerShell", icon: SiPowershell, color: "#5391fe" },
    ],
    tools: ["OpenCV", "CVAT", "YOLOv8-seg", "YOLOv26-seg", "Ultralytics", "AWS", "Kaggle"],
  },
  {
    icon: VscGraph,
    number: "04",
    title: "NLP & data science",
    summary: "Review analysis, aspect sentiment, topic discovery, data auditing, and decision-ready reporting.",
    languages: [
      { name: "Python", icon: SiPython, color: "#ffd343" },
      { name: "SQL", icon: SiMysql, color: "#4479a1" },
    ],
    tools: ["ABSA", "BERTopic", "MiniLM", "XLM-RoBERTa", "pandas", "Power BI", "Data audit"],
  },
];

const evidenceItems = [
  { title: "Data Analytics Challenge", detail: "Champion · 15th ICT Roadshow 2025", image: "/assets/DATA ANALYTICS CHALLENGE - CHAMPION 1_page-0001.jpg", href: "/assets/DATA ANALYTICS CHALLENGE - CHAMPION 1_page-0001.jpg", kind: "certificate" },
  { title: "Introduction to Modern AI", detail: "DICT-ITU DTC Initiative via Cisco Networking Academy · 2026", image: "/assets/certificates/modern-ai.webp", href: "/assets/certificates/Introduction_to_Modern_AI_Joel_Laggui.pdf", kind: "certificate" },
  { title: "Algorithm and Program Design", detail: "Huawei Talent certificate of completion · 2025", image: "/assets/Huawei_Certificate_of_Completion.png", href: "/assets/Huawei_Certificate_of_Completion.png", kind: "certificate" },
  { title: "Regional ITE Convention", detail: "Participant · St. Paul University Philippines · 2025", image: "/assets/ITE-REF-20250329-802 - Certificate of Participation - Regional ITE Convention 2025_page-0001.jpg", href: "/assets/ITE-REF-20250329-802 - Certificate of Participation - Regional ITE Convention 2025_page-0001.jpg", kind: "certificate" },
  { title: "RoboFusion Champion", detail: "iScene RoboFusion · 2025", image: "/assets/Champion_Robotics.png", href: "/assets/Champion_Robotics.png", kind: "certificate" },
  { title: "Philippine Startup Challenge X", detail: "Team Kaagapay · Regional pitching participant · 2025", image: "/assets/DICT_StartupChallenge_Certificate.png", href: "/assets/DICT_StartupChallenge_Certificate.png", kind: "certificate" },
  { title: "TRON 2026 Cyber Defense Exercise", detail: "Team Leader · Certificate of Participation", image: "/assets/certificates/tron-team-leader-2026.webp", href: "/assets/certificates/tron-team-leader-2026.webp", kind: "certificate" },
  { title: "TRON Cyber Defense - 3rd Place", detail: "ISU Cabagan Campus · Team ISUC-CompSci", image: "/assets/certificates/tron-third-place-team.webp", href: "/assets/certificates/tron-third-place-team.webp", kind: "certificate" },
  { title: "Cyber Defense Exercise Qualifiers", detail: "Team gallery", image: "/assets/gallery/cyber-defense-tron-qualifiers.webp", href: "/assets/gallery/cyber-defense-tron-qualifiers.webp", kind: "gallery" },
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
          <p>The languages I use, and the tools behind each kind of work.</p>
        </div>
        <div className="skills-command-list">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <article className="skill-command" key={group.title}>
                <div className="skill-command__identity">
                  <span className="skill-command__number">{group.number}</span>
                  <Icon aria-hidden="true" />
                  <div><h3>{group.title}</h3><p>{group.summary}</p></div>
                </div>
                <div className="skill-command__languages">
                  <span className="skill-command__label">Languages</span>
                  <div>
                    {group.languages.map((language) => {
                      const LanguageIcon = language.icon;
                      return <span key={language.name}><LanguageIcon style={{ color: language.color }} aria-hidden="true" />{language.name}</span>;
                    })}
                  </div>
                </div>
                <div className="skill-command__tools">
                  <span className="skill-command__label">Tools & platforms</span>
                  <div>{group.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                </div>
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
