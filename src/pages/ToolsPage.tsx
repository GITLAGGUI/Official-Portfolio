import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { tools } from '../data/capabilities';
import ToolsStrip, { ToolIcon } from '../components/ToolsStrip';
import Pagination from '../components/Pagination';
import WorkflowLibrary from '../components/WorkflowLibrary';
import workflowSkills from '../data/workflowSkills.json';

export default function ToolsPage() {
  const [params, setParams] = useSearchParams(); const query = params.get('q') ?? ''; const category = params.get('category') ?? 'All tools';
  const workflows = params.get('view') === 'skills';
  const categories = ['All tools', ...new Set(tools.map((tool) => tool.category))];
  const visible = tools.filter((tool) => (category === 'All tools' || tool.category === category) && `${tool.name} ${tool.use}`.toLowerCase().includes(query.toLowerCase()));
  const pages = Math.max(1, Math.ceil(visible.length / 6)); const page = Math.min(pages, Math.max(1, Math.floor(Number(params.get('page'))) || 1));
  const update = (key: string, value: string) => { const next = new URLSearchParams(params); next.delete('page'); if (value) next.set(key, value); else next.delete(key); setParams(next, { replace: true }); };
  return <div className={`content-page tools-page ${workflows ? 'workflow-library' : ''}`}><nav className="tool-view-switch" aria-label="Browse tools and workflow skills"><button aria-pressed={!workflows} onClick={() => { if (workflows) setParams({}); }}>Tools <span>{tools.length}</span></button><button aria-pressed={workflows} onClick={() => { if (!workflows) setParams({ view: 'skills' }); }}>Workflow skills <span>{workflowSkills.length}</span></button></nav>{workflows ? <WorkflowLibrary /> : <><header className="compact-page-header"><h1>My toolkit<span>{tools.length}</span></h1><label className="compact-search"><FiSearch /><input aria-label="Search tools" type="search" value={query} onChange={(event) => update('q', event.target.value)} placeholder="Find a tool or workflow…" /></label></header><ToolsStrip compact />
    <div className="project-filters" aria-label="Filter tools">{categories.map((item) => <button key={item} aria-pressed={category === item} onClick={() => update('category', item === 'All tools' ? '' : item)}>{item}</button>)}</div>
    <section className="tool-grid" aria-label="Tool directory">{visible.slice((page - 1) * 6, page * 6).map((tool) => <article className="tool-card" key={tool.name}><span className="tool-card__icon"><ToolIcon tool={tool} /></span><div><h2>{tool.name}</h2><span>{tool.category}{tool.available ? ' · Available integration' : ''}</span><p>{tool.use}</p></div></article>)}</section>
    {visible.length === 0 && <p className="empty-state">No tools match. Try another search.</p>}<Pagination page={page} pages={pages} label="Tool pages" onChange={(value) => update('page', String(value))} />
  </>}</div>;
}
