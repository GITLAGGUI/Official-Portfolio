import { useState } from 'react';
import { FiArrowUpRight, FiDownload } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { evidenceItems } from '../data/achievements';
import { capabilities } from '../data/capabilities';
import { resume } from '../utils/studio';
import Pagination from '../components/Pagination';
import { themes, type ThemeId } from '../data/themes';

export default function AboutPage({ theme = 'studio' }: { theme?: ThemeId }) {
  const portrait = themes.find((item) => item.id === theme)!.portrait;
  const [kind, setKind] = useState<'certificate' | 'gallery'>('certificate'); const [page, setPage] = useState(1);
  const entries = evidenceItems.filter((item) => item.kind === kind); const pages = Math.ceil(entries.length / 4);
  return <div className="content-page about-page"><header className="about-intro"><div className="about-intro__portrait" data-parallax><img src={portrait} alt="Joel Laggui Jr. working on a laptop" /><span><i className="availability-dot" /> Philippines · GMT+8</span></div><div><p className="eyebrow">A little about me</p><h1>Curious by nature.<br /><em>A builder by choice.</em></h1><p>I’m Joel Laggui Jr., a developer and creator from the Philippines. I make web products, connect workflows, work with AI and data, and edit stories into motion.</p><p>From RiceGuardAI to LeadMaps, I enjoy taking an idea all the way to something people can explore and use.</p><div className="about-actions"><a className="button button--primary" href={resume} target="_blank" rel="noreferrer">My resume <FiDownload /></a><Link className="text-link" to="/contact">Say hello <FiArrowUpRight /></Link></div></div></header>
    <section id="skills" className="about-disciplines"><div className="section-top"><h2>What keeps me building</h2><Link to="/tools?view=skills">Workflow skills <FiArrowUpRight /></Link></div><div>{capabilities.map((item, index) => <Link key={item.id} to={`/projects/${item.project}`}><span>0{index + 1}</span><h3>{item.title}</h3><FiArrowUpRight /></Link>)}</div></section>
    <section id="achievements" className="achievements-section"><div className="section-top"><h2>Certificates & gallery</h2><div className="project-filters"><button aria-pressed={kind === 'certificate'} onClick={() => { setKind('certificate'); setPage(1); }}>Certificates</button><button aria-pressed={kind === 'gallery'} onClick={() => { setKind('gallery'); setPage(1); }}>Gallery</button></div></div><div className="achievement-grid">{entries.slice((page - 1) * 4, page * 4).map((item) => <a key={`${item.title}-${item.image}`} href={item.href} target="_blank" rel="noreferrer" data-kind={item.kind} aria-label={`Open ${item.title}`}><article><div className="achievement-image"><img src={item.image} alt={item.kind === 'certificate' ? `${item.title} certificate or event record` : item.title} loading="lazy" /></div>{item.kind === 'certificate' && <div><h3>{item.title}</h3><p>{item.detail}</p></div>}</article></a>)}</div><Pagination page={page} pages={pages} label="Certificate and gallery pages" onChange={setPage} /></section>
  </div>;
}
