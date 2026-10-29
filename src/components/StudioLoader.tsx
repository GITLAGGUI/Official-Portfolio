import { useEffect, useState } from 'react';
import { themes, type ThemeId } from '../data/themes';
import { getProjectBySlug } from '../data/projects';
import { preloadImage } from '../utils/startup';

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
    const home = arrival.path === '/';
    const images = [appearance.avatar, ...(arrival.path === '/about' ? [appearance.portrait] : []), ...(home ? ['riceguardai', 'leadmaps'].map((slug) => getProjectBySlug(slug)!.hero) : [])];
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
    <div className="studio-loader__atmosphere" aria-hidden="true"><div /><div /><span /></div>
    <div className="studio-loader__top"><span><i /> JOEL’S STUDIO</span><span>{themes.find((item) => item.id === arrival.theme)!.name} / PORTFOLIO</span></div>
    <div className="studio-loader__center">
      <div className="studio-loader__sculpture" aria-hidden="true"><div className="studio-loader__orbit studio-loader__orbit--one"><i /></div><div className="studio-loader__orbit studio-loader__orbit--two"><i /></div><div className="studio-loader__halo" /><div className="studio-loader__monogram"><span>J</span><span>L</span><i /></div><span className="studio-loader__coordinate">01 / IN THE MAKING</span></div>
      <p className="studio-loader__eyebrow">A LITTLE PREPARATION. A LOT TO EXPLORE.</p>
      <h1>Ideas<span> in motion.</span></h1>
      <div className="studio-loader__progress" role="progressbar" aria-label="Portfolio loading" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
      <div className="studio-loader__status"><span role="status">{leaving && progress < 100 ? 'Finishing in the background' : progress === 100 ? 'Welcome to the studio' : labels[finished.findIndex((ready) => !ready)]}</span><span aria-hidden="true">{String(progress).padStart(3, '0')}<small>%</small></span></div>
    </div>
    <div className="studio-loader__bottom"><span>SOFTWARE · INTELLIGENCE · MOTION</span><button onClick={() => setLeaving(true)} disabled={leaving}>Enter portfolio <span aria-hidden="true">↗</span></button></div>
  </div>;
}
