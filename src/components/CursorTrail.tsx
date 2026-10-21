import { useEffect, useRef } from 'react';
import { useMotionSettings } from './motion-context';

export default function CursorTrail() {
  const { paused } = useMotionSettings();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (paused) return;
    const root = ref.current!; const nodes = [...root.querySelectorAll<HTMLElement>('span')];
    const positions = nodes.map(() => ({ x: 0, y: 0 }));
    const media = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    let x = 0, y = 0, frame = 0, initialized = false, moved = 0, previous = 0;
    function draw(time: number) {
      frame = 0; const step = 1 - Math.exp(-Math.min((time - previous) / 1000 || .016, .05) * 14); previous = time;
      let travel = 0;
      positions.forEach((position, index) => {
        const target = index === 0 ? { x: x + 22, y: y + 10 } : positions[index - 1];
        position.x += (target.x - position.x) * step; position.y += (target.y - position.y) * step;
        travel += Math.abs(target.x - position.x) + Math.abs(target.y - position.y);
        nodes[index].style.transform = `translate3d(${position.x}px,${position.y}px,0)`;
      });
      if (performance.now() - moved > 1100) root.style.opacity = '0';
      if (media.matches && !document.hidden && (travel > .1 || performance.now() - moved < 1200)) frame = requestAnimationFrame(draw);
    }
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== 'mouse') return;
      if ((event.target as Element).closest('input,textarea,select,dialog')) { root.style.opacity = '0'; return; }
      x = event.clientX; y = event.clientY; moved = performance.now(); root.style.opacity = '1';
      if (!initialized) { positions.forEach((position) => { position.x = x + 22; position.y = y + 10; }); initialized = true; }
      if (!frame) { previous = performance.now(); frame = requestAnimationFrame(draw); }
    };
    const hide = () => { root.style.opacity = '0'; cancelAnimationFrame(frame); frame = 0; };
    window.addEventListener('pointermove', move, { passive: true }); document.addEventListener('pointerleave', hide); document.addEventListener('visibilitychange', hide); media.addEventListener('change', hide);
    return () => { hide(); window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', hide); document.removeEventListener('visibilitychange', hide); media.removeEventListener('change', hide); };
  }, [paused]);
  return <div ref={ref} className="cursor-trail" aria-hidden="true"><span className="cursor-hello">Hello</span>{Array.from({ length: 7 }, (_, index) => <span className="cursor-dot" key={index} style={{ width: 4 - index * .35, height: 4 - index * .35, opacity: .6 - index * .065 }} />)}</div>;
}
