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

const achievements = [
  { title: "Data Analytics Challenge", detail: "Champion", image: "/assets/DATA ANALYTICS CHALLENGE - CHAMPION 1_page-0001.jpg" },
  { title: "ROBOFUSION", detail: "Line-following robot champion", image: "/assets/Champion_Robotics.png" },
  { title: "Huawei learning track", detail: "Certificate of completion", image: "/assets/Huawei_Certificate_of_Completion.png" },
  { title: "Startup and cybersecurity work", detail: "Competitions, team projects, and practical training", image: "/assets/DICT_StartupChallenge_Certificate.png" },
];

export default function AboutPage() {
  return (
    <div className="content-page about-page">
      <header className="about-intro">
        <div className="about-intro__portrait">
          <img src="/assets/Me.jpg" alt="Joel Laggui Jr." />
          <span><VscCheck /> Available for new opportunities</span>
        </div>
        <div>
          <p className="eyebrow">About</p>
          <h1>I turn operational problems into software people can actually use.</h1>
          <p>
            I’m Joel Laggui Jr., a full-stack developer and AI automation builder from the Philippines. My work ranges from booking and commerce experiences to agent workflows, computer vision, NLP research, and data operations.
          </p>
          <p>
            I use Claude Code, Codex, and other AI tools to move faster, but I still check the result against the real repository, dataset, browser state, logs, and deployment. That habit matters more to me than sounding impressive.
          </p>
          <div className="about-actions">
            <a className="button button--primary" href="/assets/New Resume.pdf" target="_blank" rel="noreferrer">Resume <FiDownload /></a>
            <Link className="button button--secondary" to="/contact">Work with me <FiExternalLink /></Link>
          </div>
        </div>
      </header>

      <section id="skills" className="skills-section" aria-labelledby="skills-title">
        <div className="section-heading">
          <div><p className="eyebrow">Capabilities</p><h2 id="skills-title">Skills</h2></div>
          <p>No percentage bars or vague proficiency labels—just the tools I use and the kind of work they support.</p>
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
          <div><p className="eyebrow">Evidence</p><h2 id="achievements-title">Selected achievements</h2></div>
          <p>Competitions and training belong here as supporting evidence—not as software case studies.</p>
        </div>
        <div className="achievement-grid">
          {achievements.map((achievement) => (
            <article key={achievement.title}>
              <img src={achievement.image} alt="" loading="lazy" />
              <div><h3>{achievement.title}</h3><p>{achievement.detail}</p></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
