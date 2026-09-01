import { FormEvent, useState } from "react";
import { FiArrowUpRight, FiCheck, FiCopy, FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("jlaggui47@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const project = String(form.get("project") ?? "").trim();
    const details = String(form.get("details") ?? "").trim();
    const subject = encodeURIComponent(`${project || "Portfolio inquiry"} — ${name || "New contact"}`);
    const body = encodeURIComponent(`Hi Joel,\n\n${details}\n\nFrom: ${name}`);
    window.location.href = `mailto:jlaggui47@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="content-page contact-page">
      <header className="page-header page-header--split">
        <div><p className="eyebrow">Contact</p><h1>Let’s build something useful.</h1></div>
        <p>Tell me what you are trying to improve, automate, launch, or understand. A clear problem statement is enough to start.</p>
      </header>

      <div className="contact-layout">
        <section className="contact-details" aria-labelledby="contact-details-title">
          <h2 id="contact-details-title">Direct contact</h2>
          <a href="mailto:jlaggui47@gmail.com"><FiMail /><span><small>Email</small>jlaggui47@gmail.com</span><FiArrowUpRight /></a>
          <a href="tel:+639153683496"><FiPhone /><span><small>Phone</small>+63 915 368 3496</span><FiArrowUpRight /></a>
          <div><FiMapPin /><span><small>Location</small>Philippines · Remote-friendly</span></div>
          <button type="button" onClick={() => void copyEmail()}><span>{copied ? <FiCheck /> : <FiCopy />}{copied ? "Copied" : "Copy email"}</span></button>

          <div className="contact-socials">
            <a href="https://github.com/GITLAGGUI" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
            <a href="https://www.linkedin.com/in/joellagguijr-dev/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
          </div>

          <aside className="availability-card">
            <span className="availability-dot" />
            <div><strong>Open to work</strong><p>Full-stack products, AI automation, computer vision, NLP, and data workflows.</p></div>
          </aside>
        </section>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-heading"><span>contact.ts</span><span>mailto handoff</span></div>
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" autoComplete="name" placeholder="Name or company" required />
          <label htmlFor="contact-project">What are we discussing?</label>
          <input id="contact-project" name="project" placeholder="Website, automation, AI, data…" required />
          <label htmlFor="contact-details">Useful context</label>
          <textarea id="contact-details" name="details" rows={7} placeholder="What is happening now, and what should be better after the project?" required />
          <button className="button button--primary" type="submit">Prepare email <FiArrowUpRight /></button>
          <p>This form opens your email app. It does not store your message on this site.</p>
        </form>
      </div>
    </div>
  );
}
