const Block = ({ kind = '' }: { kind?: string }) => <span className={`skeleton-block ${kind}`} />;
const Card = () => <div className="skeleton-card"><Block kind="skeleton-media" /><Block kind="skeleton-caption" /><Block kind="skeleton-title" /></div>;

export default function PageSkeleton({ path }: { path: string }) {
  const detail = path.startsWith('/projects/');
  const home = path === '/';
  const tiles = path === '/projects' || path === '/tools' || path === '/skills';
  return <div className={`content-page page-skeleton ${home ? 'page-skeleton--home' : ''}`} role="status" aria-label="Loading page" aria-busy="true">
    <span className="sr-only">Preparing the page…</span>
    <div aria-hidden="true">
      {home && <Block kind="skeleton-workbench" />}
      <div className={home ? 'skeleton-hero' : 'skeleton-heading'}><div><Block kind="skeleton-caption" /><Block kind="skeleton-heading-line" /><Block kind="skeleton-heading-line skeleton-short" /><Block kind="skeleton-button" /></div>{home && <Block kind="skeleton-portrait" />}</div>
      {home || tiles ? <><div className="skeleton-filters">{!home && Array.from({ length: 4 }, (_, i) => <Block key={i} kind="skeleton-chip" />)}</div><div className={`skeleton-grid ${home ? 'skeleton-grid--home' : ''}`}>{Array.from({ length: home ? 4 : 6 }, (_, i) => <Card key={i} />)}</div></> : <div className={`skeleton-columns ${detail ? 'skeleton-columns--detail' : ''}`}><div><Block kind="skeleton-media" /><Block kind="skeleton-title" /><Block /><Block /></div><div>{Array.from({ length: path === '/contact' ? 4 : 3 }, (_, i) => <Block key={i} kind={path === '/contact' ? 'skeleton-field' : ''} />)}<Block kind="skeleton-button" /></div></div>}
    </div>
  </div>;
}
