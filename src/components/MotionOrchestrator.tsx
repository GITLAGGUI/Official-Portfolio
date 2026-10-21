import { RefObject, useEffect } from 'react';
import { useMotionSettings } from './motion-context';

export default function MotionOrchestrator({ region, route, enabled = true }: { region: RefObject<HTMLDivElement>; route: string; enabled?: boolean }) {
  const { paused } = useMotionSettings();
  useEffect(() => {
    const root = region.current; if (!root || paused || !enabled) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>(); let index = 0;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || media.matches) return; observer.unobserve(entry.target);
        const animation = entry.target.animate([{ opacity: .3, transform: 'translate3d(0,18px,0)' }, { opacity: 1, transform: 'translate3d(0,0,0)' }], { duration: 650, delay: (index++ % 3) * 65, easing: 'cubic-bezier(.23,1,.32,1)' });
        animations.add(animation); animation.onfinish = () => animations.delete(animation);
      });
    }, { root, threshold: .08 });
    const discover = () => { if (media.matches) return; root.querySelectorAll('.project-card,.tool-card,.capability-card,.about-intro__portrait,.about-disciplines a,.achievement-grid a,.repo-about,.contact-form,[data-reveal]').forEach((element) => { if (!seen.has(element)) { seen.add(element); observer.observe(element); } }); };
    const cancel = () => { animations.forEach((animation) => animation.cancel()); animations.clear(); };
    const preferenceChanged = () => { if (media.matches) cancel(); else discover(); };
    discover(); const mutation = new MutationObserver(discover); mutation.observe(root, { childList: true, subtree: true });
    media.addEventListener('change', preferenceChanged);
    return () => { observer.disconnect(); mutation.disconnect(); media.removeEventListener('change', preferenceChanged); cancel(); };
  }, [region, route, paused, enabled]);
  return null;
}
