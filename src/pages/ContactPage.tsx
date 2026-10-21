import { FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiArrowUpRight, FiCheck, FiCopy, FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import { sendEmail } from '../utils/sendEmail';
import Dialog from '../components/Dialog';

export default function ContactPage() {
  const [params] = useSearchParams(); const [copied, setCopied] = useState(false);
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copyError, setCopyError] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText('jlaggui47@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { setCopyError(true); } };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (state === 'sending') return;
    const element = event.currentTarget; const form = new FormData(element);
    const name = String(form.get('name') ?? '').trim(); const email = String(form.get('email') ?? '').trim();
    const subject = String(form.get('project') ?? '').trim(); const message = String(form.get('details') ?? '').trim();
    if (!name || !email || !subject || !message || form.get('website')) return;
    setState('sending');
    try { await sendEmail({ name, email, subject, message }); element.reset(); setState('success'); }
    catch { setState('error'); }
  };
  return <div className="content-page contact-page"><div className="contact-layout"><section className="contact-intro"><p className="eyebrow">Contact</p><h1><span className="contact-greeting-long">Good things<br />start with<br /><em>a hello.</em></span><span className="contact-greeting-compact">Say <em>hello.</em></span></h1><p>Have an idea, a project,<br />or a problem worth solving?</p><a className="contact-email" href="mailto:jlaggui47@gmail.com">jlaggui47@gmail.com <FiArrowUpRight /></a><button className="text-link" type="button" onClick={() => void copy()}>{copied ? <FiCheck /> : <FiCopy />}{copied ? 'Email copied' : 'Copy email'}</button>{copyError && <small role="status">Select the email address above to copy it.</small>}<div className="contact-socials"><a href="https://github.com/GITLAGGUI" target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a><a href="https://www.linkedin.com/in/joellagguijr-dev/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin /></a></div><div className="contact-presence"><span className="availability-dot" /><span>Open to new projects<small>Philippines · GMT+8 · Remote friendly</small></span></div></section>
    <form className="contact-form" onSubmit={submit}><div className="form-heading"><span><i /> NEW CONVERSATION</span><FiMail /></div><h2>Tell me what you’re thinking.</h2><div className="form-row"><label>Your name<input name="name" autoComplete="name" required maxLength={120} placeholder="Your name" /></label><label>Your email<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label></div><label>What can I help with?<select name="project" required defaultValue={params.get('service') ?? ''}><option value="" disabled>Select a service</option>{['Websites & SaaS', 'AI & automation', 'Computer vision', 'Data & research', 'SEO & discovery', 'Video & motion', 'Collaboration / opportunity', 'Something else'].map((item) => <option key={item}>{item}</option>)}</select></label><label>Your message<textarea name="details" required minLength={10} maxLength={6000} rows={4} placeholder="A little about your idea and what you have in mind…" /></label><div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div><button className="button button--primary" disabled={state === 'sending'} type="submit">{state === 'sending' ? 'Sending your message…' : 'Send message'}<FiArrowRight /></button><p className={`form-status form-status--${state}`} role="status">{state === 'error' ? <>Your message couldn’t be sent. Please try again or <a href="mailto:jlaggui47@gmail.com">email me directly</a>.</> : 'Straight to my inbox. I’ll reply to the email you provide.'}</p></form></div>
    <Dialog open={state === 'success'} onClose={() => setState('idle')} title="Message sent" className="success-dialog"><span className="success-icon"><FiCheck /></span><h3>Your message is on its way to Joel.</h3><p>Thanks for reaching out. I’ll get back to you at the email address you provided.</p><button className="button button--primary" onClick={() => setState('idle')}>Back to the portfolio <FiArrowRight /></button></Dialog>
  </div>;
}
