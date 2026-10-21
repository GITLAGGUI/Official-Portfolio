import { RefObject, useEffect, useState } from 'react';
import { useMotionSettings } from './motion-context';

export default function useMotionVisibility(ref: RefObject<Element>) {
  const { paused } = useMotionSettings();
  const [active, setActive] = useState(false);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)'); let visible = false;
    const update = () => setActive(visible && !media.matches && !document.hidden && document.documentElement.dataset.startup !== 'loading');
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: .05 });
    if (ref.current) observer.observe(ref.current);
    media.addEventListener('change', update); document.addEventListener('visibilitychange', update); window.addEventListener('joel-studio-visibility', update);
    return () => { observer.disconnect(); media.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); window.removeEventListener('joel-studio-visibility', update); };
  }, [ref]);
  return active && !paused;
}
