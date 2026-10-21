import { FiArrowUpRight, FiCode, FiTerminal, FiEye, FiFilm, FiCloud, FiDatabase, FiBarChart2, FiSearch, FiZap } from 'react-icons/fi';
import { SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiPython, SiPytorch, SiKaggle, SiPostgresql, SiSupabase, SiDocker, SiVercel, SiGithub, SiVisualstudiocode, SiCanva, SiThreedotjs, SiGoogle, SiOpenai, SiHtml5, SiNodedotjs, SiFfmpeg, SiGooglesearchconsole, SiOpencv, SiPandas, SiPlaywright, SiPowerbi, SiPowershell, SiMicrosoftazure, SiAmazonaws, SiFlutter, SiPhp, SiMicrosoftexcel } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { tools, type Tool } from '../data/capabilities';
import { useRef } from 'react';
import useMotionVisibility from './useMotionVisibility';

const icons = { react: SiReact, next: SiNextdotjs, typescript: SiTypescript, javascript: SiJavascript, python: SiPython, pytorch: SiPytorch, kaggle: SiKaggle, postgres: SiPostgresql, supabase: SiSupabase, docker: SiDocker, vercel: SiVercel, github: SiGithub, vscode: SiVisualstudiocode, canva: SiCanva, three: SiThreedotjs, google: SiGoogle, openai: SiOpenai, html: SiHtml5, node: SiNodedotjs, ffmpeg: SiFfmpeg, gsc: SiGooglesearchconsole, opencv: SiOpencv, pandas: SiPandas, playwright: SiPlaywright, powerbi: SiPowerbi, powershell: SiPowershell, azure: SiMicrosoftazure, aws: SiAmazonaws, flutter: SiFlutter, php: SiPhp, excel: SiMicrosoftexcel, terminal: FiTerminal, vision: FiEye, film: FiFilm, cloud: FiCloud, data: FiDatabase, chart: FiBarChart2, search: FiSearch, spark: FiZap, code: FiCode };
const brandAssets: Record<string, string> = { claude: 'claude-color.svg', antigravity: 'antigravity-color.svg', gemini: 'gemini-color.svg', codex: 'codex-color.svg', openclaw: 'openclaw-color.svg', mcp: 'mcp.svg', openseo: 'openseo.ico', n8n: 'n8n.svg', clerk: 'clerk.svg', elevenlabs: 'elevenlabs.svg', huggingface: 'huggingface.svg', ultralytics: 'ultralytics.svg', cvat: 'cvat.svg', heygen: 'heygen.ico', pinecone: 'pinecone.ico', hyperframes: 'hyperframes.ico' };
export function ToolIcon({ tool }: { tool: Tool }) {
  if (tool.icon && brandAssets[tool.icon]) return <img className={`brand-logo ${['mcp', 'clerk', 'elevenlabs', 'huggingface', 'ultralytics'].includes(tool.icon) ? 'brand-logo--mono' : ''}`} src={`/assets/logos/${brandAssets[tool.icon]}`} alt="" />;
  const Icon = icons[tool.icon as keyof typeof icons] ?? FiCode;
  return <Icon aria-hidden="true" style={{ color: tool.color }} />;
}
export default function ToolsStrip({ compact = false, featured = false }: { compact?: boolean; featured?: boolean }) {
  const ref = useRef<HTMLElement>(null); const active = useMotionVisibility(ref);
  const names = ['Codex', 'Claude Code', 'Google Antigravity', 'n8n', 'React', 'Next.js', 'TypeScript', 'Python', 'Supabase', 'Docker', 'VS Code', 'FFmpeg', 'Three.js', 'OpenSEO'];
  return <section ref={ref} className={`tools-strip ${compact ? 'tools-strip--compact' : ''} ${featured ? 'tools-strip--featured' : ''}`} aria-label="Tools I work with">
    {featured && <Link to="/tools" className="tools-strip__intro"><span>THE WORKBENCH</span><strong>Tools I work with <FiArrowUpRight /></strong></Link>}
    {!compact && <div className="section-top"><h2>Inside my toolkit</h2><Link to="/tools">All tools <FiArrowUpRight /></Link></div>}
    <div className={`tools-marquee ${active ? 'is-moving' : ''}`}><div className="tools-marquee-track">{[false, true].map((clone) => <div className="tools-marquee-group" key={String(clone)} aria-hidden={clone || undefined}>{names.map((name) => { const tool = tools.find((item) => item.name === name)!; return <Link to={`/tools?q=${encodeURIComponent(name)}`} tabIndex={clone ? -1 : 0} key={name}><ToolIcon tool={tool} /><span>{name}</span></Link>; })}</div>)}</div></div>
  </section>;
}
