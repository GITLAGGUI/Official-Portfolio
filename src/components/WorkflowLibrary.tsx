import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiArrowDown, FiArrowUpRight, FiSearch } from 'react-icons/fi';
import records from '../data/workflowSkills.json';
import { tools } from '../data/capabilities';
import { ToolIcon } from './ToolsStrip';
import Pagination from './Pagination';
import Dialog from './Dialog';

type WorkflowSkill = typeof records[number];
const categories = ['All skills', 'Design', 'Video', '3D motion', 'Development', 'Automation', 'SEO & research', 'AI & data'];
export default function WorkflowLibrary() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? ''; const category = params.get('category') ?? 'All skills';
  const [opened, setOpened] = useState<WorkflowSkill | null>(null); const [source, setSource] = useState(''); const [status, setStatus] = useState('');
  const visible = records.filter((item) => (category === 'All skills' || item.categories.includes(category)) && `${item.title} ${item.summary} ${item.categories.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  const pages = Math.max(1, Math.ceil(visible.length / 3)); const page = Math.min(pages, Math.max(1, Math.floor(Number(params.get('page'))) || 1));
  const update = (key: string, value: string) => { const next = new URLSearchParams(params); next.delete('page'); if (value) next.set(key, value); else next.delete(key); setParams(next, { replace: true }); };
  useEffect(() => {
    if (!opened) return;
    const controller = new AbortController(); setSource(''); setStatus('Opening SKILL.md…');
    void fetch(`/skills/${opened.id}/SKILL.md`, { signal: controller.signal }).then((response) => { if (!response.ok) throw new Error('unavailable'); return response.text(); }).then((value) => { setSource(value); setStatus(''); }).catch((error) => { if (error.name !== 'AbortError') setStatus('Preview unavailable. You can still download the ZIP.'); });
    return () => controller.abort();
  }, [opened]);
  return <><header className="workflow-header"><div><p className="eyebrow">FREE SKILLS FOR YOUR AGENT</p><h1>Build with my workflow.</h1><p>Reusable skills for design, video, 3D motion and the work around them.</p></div><label className="compact-search"><FiSearch /><input aria-label="Search workflow skills" type="search" value={query} onChange={(event) => update('q', event.target.value)} placeholder="Find a workflow…" /></label></header>
    <div className="project-filters" aria-label="Filter workflow skills">{categories.map((item) => <button key={item} aria-pressed={category === item} onClick={() => update('category', item === 'All skills' ? '' : item)}>{item}</button>)}</div>
    <section className="workflow-grid" aria-label="Workflow skill library">{visible.slice((page - 1) * 3, page * 3).map((item) => <article className="workflow-card" key={item.id}><div className="workflow-card__top"><div className="service-card__logos">{item.tools.slice(0, 3).map((name) => <span key={name} title={name}><ToolIcon tool={tools.find((tool) => tool.name === name)!} /></span>)}</div><span>SKILL.md</span></div><div className="workflow-card__categories">{item.categories.map((name) => <span key={name}>{name}</span>)}</div><h2>{item.title}</h2><p>{item.summary}</p><footer><a href={`/skills/${item.id}.zip`} download><FiArrowDown /> Download ZIP</a><button onClick={() => setOpened(item)} aria-label={`Read ${item.title} skill`}>Read skill <FiArrowUpRight /></button></footer></article>)}</section>
    {visible.length === 0 && <p className="empty-state">No workflows match. Try another search.</p>}
    <Pagination page={page} pages={pages} label="Workflow skill pages" onChange={(value) => update('page', String(value))} />
    <Dialog open={!!opened} onClose={() => setOpened(null)} title={opened?.title ?? 'Workflow skill'} className="workflow-dialog"><p className="dialog-lede">Unzip the skill folder into your agent’s skills directory. Each pack includes SKILL.md and an MIT license.</p>{status && <p role="status">{status}</p>}{source && <pre className="workflow-source">{source}</pre>}{opened && <a className="button button--primary" href={`/skills/${opened.id}.zip`} download><FiArrowDown /> Download skill</a>}</Dialog>
  </>;
}
