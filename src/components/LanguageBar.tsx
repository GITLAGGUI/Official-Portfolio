import records from '../data/projectLanguages.json';
const colors: Record<string, string> = { TypeScript: '#3178c6', JavaScript: '#f1e05a', CSS: '#8060b0', SCSS: '#c6538c', Python: '#4a8bc2', SQL: '#e38c00', HTML: '#e8795c', Shell: '#89b969', PowerShell: '#5883ce', 'C#': '#63ae70', Dart: '#00b4ab', PHP: '#8581bb' };
export default function LanguageBar({ slug }: { slug: string }) {
  const record = (records as Record<string, { basis: string; measured: string; files: number; totalBytes: number; languages: { name: string; percent: number; bytes: number }[] }>)[slug];
  if (!record) return null;
  return <section className="repo-languages" aria-label="Programming language distribution"><h2>Languages</h2><div className="language-bar" role="img" aria-label={record.languages.map((item) => `${item.name} ${item.percent}%`).join(', ')}>{record.languages.map((item) => <span key={item.name} style={{ width: `${item.percent}%`, background: colors[item.name] ?? '#93a5b0' }} />)}</div><ul>{record.languages.map((item) => <li key={item.name}><i style={{ background: colors[item.name] ?? '#93a5b0' }} /><span>{item.name}</span><strong>{item.percent.toFixed(1)}%</strong></li>)}</ul><small title={`${record.files} source files • ${record.totalBytes.toLocaleString()} bytes • measured ${record.measured}`}>Measured from application source</small></section>;
}
