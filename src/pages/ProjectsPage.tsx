import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import ProjectCard from '../components/ProjectCard';
import Pagination from '../components/Pagination';
import { projects } from '../data/projects';
const filters = [
  { id: 'all', label: 'All work', categories: [] as string[] },
  { id: 'web', label: 'Websites & SaaS', categories: ['SaaS', 'Web product', 'Commerce', 'Mobile', 'Web application', 'Web design', 'Frontend study', 'Web animation'] },
  { id: 'hospitality', label: 'Resorts & hospitality', categories: ['Web product', 'Web design'] },
  { id: 'automation', label: 'Automation', categories: ['AI automation', 'Workflow automation', 'Developer tool', 'Desktop utility'] },
  { id: 'data', label: 'AI & data', categories: ['Computer vision', 'Data engineering', 'NLP and data science', 'Data application', 'Data visualization'] },
  { id: 'video', label: 'Video & motion', categories: ['Video & motion', 'Web animation'] },
];
export default function ProjectsPage() {
  const [params, setParams] = useSearchParams(); const filter = filters.find((item) => item.id === params.get('category')) ?? filters[0];
  const query = params.get('q') ?? '';
  const visible = projects.filter((project) => (filter.categories.length === 0 || filter.categories.includes(project.category)) && `${project.title} ${project.category} ${project.stack.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  const pages = Math.max(1, Math.ceil(visible.length / 6)); const page = Math.min(pages, Math.max(1, Math.floor(Number(params.get('page'))) || 1));
  const update = (key: string, value: string) => { const next = new URLSearchParams(params); next.delete('page'); if (value) next.set(key, value); else next.delete(key); setParams(next, { replace: true }); };
  return <div className="content-page projects-page"><header className="compact-page-header"><h1>Projects<span>{projects.length}</span></h1><label className="compact-search"><FiSearch /><input aria-label="Search projects" value={query} placeholder="Find a project…" onChange={(event) => update('q', event.target.value)} /></label></header><div className="project-filters" role="group" aria-label="Filter projects">{filters.map((item) => <button key={item.id} aria-pressed={filter.id === item.id} onClick={() => update('category', item.id === 'all' ? '' : item.id)}>{item.label}</button>)}</div><div className="project-results"><span>{visible.length} {visible.length === 1 ? 'project' : 'projects'}</span>{(query || filter.id !== 'all') && <button onClick={() => setParams({}, { replace: true })}>Clear filters</button>}<a href="https://github.com/GITLAGGUI?tab=repositories" target="_blank" rel="noreferrer">Source archive ↗</a></div><section className="project-grid" aria-label="Projects">{visible.slice((page - 1) * 6, page * 6).map((project) => <ProjectCard key={project.slug} project={project} compact />)}</section>{visible.length === 0 && <p className="empty-state">No projects match. Try another search.</p>}<Pagination page={page} pages={pages} label="Project pages" onChange={(value) => update('page', String(value))} /></div>;
}
