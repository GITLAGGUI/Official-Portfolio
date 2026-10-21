import { useEffect, useState } from 'react';
import { FiEye } from 'react-icons/fi';

let visitRequest: Promise<number | null> | undefined;
function recordVisit() {
  if (!visitRequest) visitRequest = (async () => {
    let session: string;
    try { session = sessionStorage.getItem('joel-visit') || crypto.randomUUID(); sessionStorage.setItem('joel-visit', session); }
    catch { session = crypto.randomUUID(); }
    try {
      const response = await fetch('/api/visits', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session }), signal: AbortSignal.timeout(6000) });
      if (!response.ok) return null;
      const data = await response.json();
      return Number.isSafeInteger(data.count) && data.count >= 0 ? data.count as number : null;
    } catch { return null; }
  })();
  return visitRequest;
}
export default function VisitCount() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => { let active = true; void recordVisit().then((value) => { if (active) setCount(value); }); return () => { active = false; }; }, []);
  if (count === null) return <span className="visit-count"><FiEye /> Thanks for stopping by</span>;
  return <span className="visit-count" title="Visits, counted once per browser session"><FiEye /> {count.toLocaleString()} visits</span>;
}
