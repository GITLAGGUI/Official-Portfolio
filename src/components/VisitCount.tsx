import { useEffect, useState } from 'react';
import { FiEye } from 'react-icons/fi';

// Both sidebar and status bar share one request. A persistent random browser ID
// keeps refreshes, navigation and returning tabs from incrementing the total.
let visitRequest: Promise<number> | undefined;
function readCount() {
  return visitRequest ??= (async () => {
    let session: string | undefined;
    if (!import.meta.env.PROD || location.hostname === 'joellaggui.vercel.app') {
      try {
        const key = 'joel-portfolio-visitor-v1';
        session = localStorage.getItem(key) ?? crypto.randomUUID();
        localStorage.setItem(key, session);
      } catch { session = undefined; }
    }
    const response = await fetch('/api/visits', session ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session }), signal: AbortSignal.timeout(7000) } : { signal: AbortSignal.timeout(7000) });
    if (!response.ok) throw new Error('Counter unavailable');
    const data = await response.json();
    if (!Number.isSafeInteger(data.count) || data.count < 0) throw new Error('Invalid count');
    return data.count as number;
  })();
}

export default function VisitCount({ enabled = true }: { enabled?: boolean }) {
  const [count, setCount] = useState<number | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    let mounted = true;
    const timer = setTimeout(() => { void readCount().then((value) => { if (mounted) setCount(value); }).catch(() => { if (mounted) setUnavailable(true); }); }, 800);
    return () => { mounted = false; clearTimeout(timer); };
  }, [enabled]);
  return <span className="visit-count" title={count === null ? unavailable ? 'Visitor count temporarily unavailable' : 'Visitor counter is connecting' : 'Owner-provided starting total plus distinct tracked browser visitors. Refreshes count once; another browser or cleared storage can count again.'}><FiEye /> {count === null ? 'Visitors —' : `${count.toLocaleString()} ${count === 1 ? 'visitor' : 'visitors'}`}</span>;
}
