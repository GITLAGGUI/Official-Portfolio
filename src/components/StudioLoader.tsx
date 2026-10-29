import { useEffect, useState } from 'react';
import { themes, type ThemeId } from '../data/themes';
import { preloadImage } from '../utils/startup';
import PageSkeleton from './PageSkeleton';

type Props = { theme: ThemeId; path: string; preparePage: (path: string) => Promise<unknown>; onComplete: () => void };
const labels = ['Opening the workspace', 'Bringing the visuals into focus', 'Setting the type'];
const weights = [25, 55, 20];

export default function StudioLoader({ theme, path, preparePage, onComplete }: Props) {
  // Capture the arrival route/theme. Later navigation never replays the opening.
  const [arrival] = useState({ theme, path });
  const [finished, setFinished] = useState([false, false, false]);
  const [leaving, setLeaving] = useState(false);
  const progress = finished.reduce((total, ready, index) => total + (ready ? weights[index] : 0), 0);

  useEffect(() => {
    const controller = new AbortController(); let cancelled = false;
    const start = performance.now(); let revealTimer: ReturnType<typeof setTimeout>;
    const reveal = () => {
      if (cancelled) return;
      revealTimer = setTimeout(() => { if (!cancelled) setLeaving(true); }, Math.max(0, 300 - (performance.now() - start)));
    };
    const appearance = themes.find((item) => item.id === arrival.theme)!;
    // Let the browser select responsive gallery posters when their route mounts.
    // Preloading full-size originals here duplicated those downloads on phones.
    const images = [appearance.avatar, ...(arrival.path === '/about' ? [appearance.portrait] : [])];
    const tasks = [
      () => preparePage(arrival.path),
      () => Promise.all(images.map((src) => preloadImage(src, controller.signal))),
      () => document.fonts ? Promise.all([document.fonts.load('600 16px Manrope'), document.fonts.load('400 16px "DM Sans"')]) : Promise.resolve(),
    ];
    const timeout = setTimeout(() => { controller.abort(); reveal(); }, 2200);
    void Promise.allSettled(tasks.map(async (task, index) => {
      try { await task(); } finally { if (!cancelled && !controller.signal.aborted) setFinished((old) => old.map((ready, i) => i === index || ready)); }
    })).then(() => { if (!controller.signal.aborted) { clearTimeout(timeout); reveal(); } });
    return () => { cancelled = true; controller.abort(); clearTimeout(timeout); clearTimeout(revealTimer); };
  }, [arrival, preparePage]);

  useEffect(() => {
    if (!leaving) return;
    // Also release when browser animation events are suppressed or the tab is hidden.
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'paused';
    const timer = setTimeout(onComplete, reduce ? 100 : 350);
    return () => clearTimeout(timer);
  }, [leaving, onComplete]);

  return <div className={`studio-loader ${leaving ? 'studio-loader--leaving' : ''}`} aria-label="Opening Joel’s portfolio" onAnimationEnd={(event) => { if (leaving && event.target === event.currentTarget) onComplete(); }}>
    <div className="startup-skeleton"><div className="startup-skeleton__brand">JOEL’S STUDIO <span>PORTFOLIO</span></div><PageSkeleton path={arrival.path} /><div className="startup-skeleton__status"><div className="studio-loader__progress" role="progressbar" aria-label="Portfolio loading" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ transform: `scaleX(${progress / 100})` }} /></div><span role="status">{leaving && progress < 100 ? 'Finishing in the background' : progress === 100 ? 'Ready to explore' : labels[finished.findIndex((ready) => !ready)]}</span><button onClick={() => setLeaving(true)} disabled={leaving}>Enter portfolio ↗</button></div></div>
  </div>;
}
