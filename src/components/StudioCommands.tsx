import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowUpRight, FiCopy, FiSearch, FiTerminal, FiX } from 'react-icons/fi';
import { projects } from '../data/projects';
import { themes, type ThemeId } from '../data/themes';
import Dialog from './Dialog';
import { sections, resume } from '../utils/studio';

export default function StudioCommands({ theme, setTheme, toggleSidebar, openAssistant }: { theme: ThemeId; setTheme: (theme: ThemeId) => void; toggleSidebar: () => void; openAssistant: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState<string | null>(null);
  const [palette, setPalette] = useState(false); const [query, setQuery] = useState('');
  const [settings, setSettings] = useState(false); const [help, setHelp] = useState(false);
  const [terminal, setTerminal] = useState(false); const [input, setInput] = useState('');
  const [output, setOutput] = useState('Type help to explore.'); const [notice, setNotice] = useState('');
  const menuRef = useRef<HTMLDivElement>(null); const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (menu) menuRef.current?.querySelector('button')?.focus(); }, [menu]);
  useEffect(() => { setTerminal(false); setMenu(null); }, [location.pathname]);
  const openUrl = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');
  useEffect(() => {
    const action = (event: Event) => {
      const name = (event as CustomEvent<string>).detail;
      if (name === 'palette') { setQuery(''); setPalette(true); }
      if (name === 'theme') setSettings(true);
      if (name === 'terminal') setTerminal((old) => !old);
    };
    const keys = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setPalette((old) => !old); }
      if ((event.metaKey || event.ctrlKey) && event.key === ',') { event.preventDefault(); setSettings(true); }
      if ((event.metaKey || event.ctrlKey) && event.key === '`') { event.preventDefault(); setTerminal((old) => !old); }
      if (event.key === 'Escape') { setMenu(null); triggerRef.current?.focus(); }
    };
    window.addEventListener('studio-action', action); window.addEventListener('keydown', keys);
    return () => { window.removeEventListener('studio-action', action); window.removeEventListener('keydown', keys); };
  }, []);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(''), 2500); return () => clearTimeout(timer); }, [notice]);
  const copy = async (text: string, message: string) => { try { await navigator.clipboard.writeText(text); setNotice(message); } catch { setNotice('Copy unavailable. Email: jlaggui47@gmail.com'); } };
  const commands = [
    ...sections.map((section) => ({ label: section.label, detail: 'Open page', run: () => navigate(section.href) })),
    { label: 'Workflow skills', detail: 'Free skills for your agent', run: () => navigate('/tools?view=skills') },
    { label: 'Resume', detail: 'Open PDF', run: () => openUrl(resume) },
    { label: 'Color theme', detail: '8 appearances', run: () => setSettings(true) },
    { label: 'Joel Assistant', detail: 'Ask about my work', run: openAssistant },
    { label: 'Toggle sidebar', detail: 'More room for the work', run: toggleSidebar },
    { label: 'Toggle terminal', detail: 'Explore with commands', run: () => setTerminal((old) => !old) },
    ...projects.map((item) => ({ label: item.title, detail: item.category, run: () => navigate(`/projects/${item.slug}`) })),
  ];
  const go = (href: string) => () => navigate(href);
  const menuItems: Record<string, { label: string; run: () => void }[]> = {
    File: [{ label: 'Home', run: go('/') }, { label: 'Browse projects', run: go('/projects') }, { label: 'Open resume', run: () => openUrl(resume) }],
    Edit: [{ label: 'Copy email address', run: () => void copy('jlaggui47@gmail.com', 'Email copied') }, { label: 'Copy page link', run: () => void copy(window.location.href, 'Page link copied') }],
    Selection: [{ label: 'All work', run: go('/projects') }, { label: 'Websites & SaaS', run: go('/projects?category=web') }, { label: 'AI & automation', run: go('/projects?category=automation') }, { label: 'Video & motion', run: go('/projects?category=video') }],
    View: [{ label: 'Color theme…', run: () => setSettings(true) }, { label: 'Toggle sidebar', run: toggleSidebar }, { label: 'Command palette', run: () => setPalette(true) }],
    Go: sections.map((section) => ({ label: section.label, run: go(section.href) })),
    Run: [{ label: 'Open RiceGuardAI', run: () => openUrl('https://riceguardai.dev') }, { label: 'Open LeadMaps', run: () => openUrl('https://leadmaps.live') }, { label: 'Play video work', run: go('/projects/video-editing') }],
    Terminal: [{ label: 'Toggle terminal', run: () => setTerminal((old) => !old) }, { label: 'Clear terminal', run: () => { setTerminal(true); setOutput('Terminal cleared. Type help to explore.'); } }],
    Help: [{ label: 'Keyboard shortcuts', run: () => setHelp(true) }, { label: 'Ask Joel Assistant', run: openAssistant }, { label: 'About Joel', run: go('/about') }],
  };
  function run(event: FormEvent) {
    event.preventDefault(); const command = input.trim().toLowerCase(); setInput('');
    if (command === 'clear') { setOutput(''); return; }
    if (command === 'help') { setOutput('home · projects · services · tools · workflows · about · contact · resume · theme · clear'); return; }
    if (command === 'workflows' || command === 'skills') { navigate('/tools?view=skills'); return; }
    if (command === 'theme') { setSettings(true); setOutput('Choose an appearance in Settings.'); return; }
    if (command === 'resume') { openUrl(resume); setOutput('Opened the resume.'); return; }
    const section = sections.find((item) => item.label.toLowerCase() === command);
    if (section) { navigate(section.href); setOutput(`Opened ${section.label}.`); }
    else setOutput(`Unknown command: ${command || '(empty)'}. Type help for available commands.`);
  }
  const matches = commands.filter((command) => `${command.label} ${command.detail}`.toLowerCase().includes(query.toLowerCase()));
  return <>
    <div className="title-bar__menus"><img src="/assets/vscode_icon.svg" alt="Portfolio studio" />{Object.keys(menuItems).map((name) => <div className="menu-anchor" key={name}>
      <button type="button" ref={menu === name ? triggerRef : undefined} aria-expanded={menu === name} aria-haspopup="menu" onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); setMenu(name); } }} onClick={() => setMenu(menu === name ? null : name)}>{name}</button>
      {menu === name && <div ref={menuRef} role="menu" className="menu-popover" aria-label={`${name} menu`} onKeyDown={(event) => { const items = [...event.currentTarget.querySelectorAll('button')]; const current = items.indexOf(document.activeElement as HTMLButtonElement); const key = event.key; if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) return; event.preventDefault(); const next = key === 'Home' ? 0 : key === 'End' ? items.length - 1 : (current + (key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; items[next]?.focus(); }}>{menuItems[name].map((item) => <button role="menuitem" type="button" key={item.label} onClick={() => { item.run(); setMenu(null); }}>{item.label}</button>)}</div>}
    </div>)}</div>
    {menu && <button className="menu-dismiss" aria-label="Close menu" onClick={() => setMenu(null)} />}
    <Dialog open={palette} onClose={() => setPalette(false)} title="Go anywhere" className="command-dialog"><label className="command-input"><FiSearch /><input data-dialog-focus aria-label="Search portfolio commands" value={query} placeholder="Search pages, projects, actions…" onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && matches[0]) { event.preventDefault(); setPalette(false); setQuery(''); matches[0].run(); } if (event.key === 'ArrowDown') { event.preventDefault(); event.currentTarget.closest('dialog')?.querySelector<HTMLButtonElement>('.command-results button')?.focus(); } }} /></label><div className="command-results" onKeyDown={(event) => { if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return; event.preventDefault(); const items = [...event.currentTarget.querySelectorAll('button')]; const index = items.indexOf(document.activeElement as HTMLButtonElement); items[(index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus(); }}>{matches.map((command) => <button key={command.label} onClick={() => { setPalette(false); setQuery(''); command.run(); }}><span>{command.label}</span><small>{command.detail}</small><FiArrowUpRight /></button>)}{matches.length === 0 && <p>No matches. Try “Projects”, “Tools” or “Theme”.</p>}</div></Dialog>
    <Dialog open={settings} onClose={() => setSettings(false)} title="Make yourself at home"><p className="dialog-lede">Eight themes. Your choice stays with this browser.</p><div className="theme-grid">{themes.map((item, index) => <button key={item.id} aria-pressed={theme === item.id} className={theme === item.id ? 'selected' : ''} onClick={() => setTheme(item.id)}><span className="theme-preview" style={{ background: item.colors[0] }}><img src={item.preview} alt="" loading="lazy" /><b className="theme-order">{index === 0 ? 'DEFAULT' : String(index).padStart(2, '0')}</b><i style={{ background: item.colors[1] }} /><i style={{ background: item.colors[2] }} /><i style={{ background: item.colors[1] }} /></span><span>{item.name}</span>{theme === item.id && <span className="theme-selected">✓</span>}</button>)}</div></Dialog>
    <Dialog open={help} onClose={() => setHelp(false)} title="A few shortcuts"><dl className="shortcut-list"><div><dt>Find anything</dt><dd><kbd>Ctrl / ⌘ K</kbd></dd></div><div><dt>Change theme</dt><dd><kbd>Ctrl / ⌘ ,</kbd></dd></div><div><dt>Toggle terminal</dt><dd><kbd>Ctrl / ⌘ `</kbd></dd></div><div><dt>Close a dialog or menu</dt><dd><kbd>Esc</kbd></dd></div></dl><p className="dialog-lede">Explore the pages, open a live project, or ask Joel Assistant about my work.</p></Dialog>
    {terminal && <section className="studio-terminal" aria-label="Portfolio terminal"><header><span><FiTerminal /> PORTFOLIO TERMINAL</span><button className="icon-button" onClick={() => setTerminal(false)} aria-label="Close terminal"><FiX /></button></header><p role="status">{output}</p><form onSubmit={run}><label htmlFor="terminal-command">joel@studio ~ %</label><input id="terminal-command" value={input} onChange={(event) => setInput(event.target.value)} placeholder="help" autoComplete="off" /><button type="submit" className="icon-button" aria-label="Run command"><FiArrowUpRight /></button></form></section>}
    {notice && <div className="toast" role="status"><FiCopy />{notice}</div>}
  </>;
}
