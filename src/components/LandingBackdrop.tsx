import { useEffect, useRef } from 'react';
import type { ThemeId } from '../data/themes';
import useMotionVisibility from './useMotionVisibility';

/** One ambient field covers the entire landing canvas, including the work grid. */
export default function LandingBackdrop({ theme }: { theme: ThemeId }) {
  const ref = useRef<HTMLDivElement>(null); const canvasRef = useRef<HTMLCanvasElement>(null);
  const active = useMotionVisibility(ref);
  useEffect(() => {
    const host = ref.current, canvas = canvasRef.current; if (!host || !canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let width = 1, height = 1, frame = 0, last = 0, phase = 0, beam: CanvasGradient | null = null;
    const pointer = { x: 0, y: 0 }; const light = theme === 'light';
    const coarse = matchMedia('(pointer:coarse)').matches;
    const color = getComputedStyle(host).getPropertyValue('--accent').trim();
    const points = Array.from({ length: coarse ? 34 : 58 }, (_, i) => ({ x: ((i * 73 + 19) % 997) / 997, y: ((i * 137 + 41) % 991) / 991, size: i % 7 === 0 ? 1.8 : .8, speed: .3 + (i % 5) * .12 }));
    const draw = () => {
      ctx.clearRect(0, 0, width, height); ctx.strokeStyle = color; ctx.fillStyle = color;
      if (['dracula', 'nord', 'rose'].includes(theme)) {
        for (let row = 0; row < 3; row++) {
          const baseline = height * (.22 + row * .29);
          ctx.globalAlpha = theme === 'dracula' ? .16 : .09; ctx.lineWidth = theme === 'rose' ? 1.2 : .65; ctx.beginPath();
          for (let x = -20; x <= width + 20; x += 18) {
            const amplitude = theme === 'nord' ? .025 : .075;
            const y = baseline + Math.sin(x / width * 5 + phase * .14 + row) * height * amplitude + pointer.y * 9;
            if (x === -20) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
      if (theme === 'github' || theme === 'vscode') {
        ctx.globalAlpha = .055; ctx.lineWidth = .7;
        for (let x = 0; x < width; x += 85) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + (theme === 'vscode' ? height * .35 : 0), height); ctx.stroke(); }
        for (let y = 0; y < height; y += 85) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
      }
      if (theme === 'light') {
        ctx.fillStyle = '#d6ba7f'; ctx.globalAlpha = .045;
        for (let i = 0; i < 4; i++) { const x = width * (.12 + i * .22) + Math.sin(phase * .08) * 20; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 80, 0); ctx.lineTo(x - height * .45 + 80, height); ctx.lineTo(x - height * .45, height); ctx.fill(); }
      }
      if (beam) {
        ctx.globalAlpha = .09; ctx.fillStyle = beam; ctx.fillRect(0, 0, width, height);
      }
      for (let i = 0; i < points.length; i++) {
        const point = points[i]; const speed = theme === 'monokai' ? 13 : theme === 'nord' ? 4 : 2;
        const x = (point.x * width + Math.sin(phase * .12 * point.speed + point.y * 8) * 22 + pointer.x * (5 + point.size * 4) + (theme === 'nord' ? phase * 4 : 0) + width * 100) % width;
        const y = (point.y * height + (theme === 'nord' ? 1 : -1) * phase * point.speed * speed + pointer.y * 8 + height * 100) % height;
        ctx.fillStyle = theme === 'studio' ? '#e6c690' : color; ctx.strokeStyle = color;
        ctx.globalAlpha = (light ? .16 : .31) * (.65 + Math.sin(phase * .3 + point.x * 13) * .35);
        if (theme === 'rose') {
          ctx.save(); ctx.translate(x, y); ctx.rotate(phase * .09 + i); ctx.beginPath(); ctx.ellipse(0, 0, point.size * 2.8, point.size, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        } else if (theme === 'github') {
          ctx.fillRect(x, y, 3.5, 2);
          if (i % 3 === 0) { ctx.globalAlpha *= .3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 34, y); ctx.lineTo(x + 52, y + 22); ctx.stroke(); }
        } else if (theme === 'vscode' || theme === 'monokai') {
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (theme === 'vscode' ? 14 : 0), y + (theme === 'monokai' ? 8 : 0)); ctx.stroke();
        } else if ((theme === 'dracula' || theme === 'nord') && i % 5 === 0) {
          const size = theme === 'nord' ? 2 : 3; ctx.beginPath(); ctx.moveTo(x - size, y); ctx.lineTo(x + size, y); ctx.moveTo(x, y - size); ctx.lineTo(x, y + size); ctx.stroke();
        } else { ctx.beginPath(); ctx.arc(x, y, light ? point.size * 1.8 : point.size, 0, Math.PI * 2); ctx.fill(); }
      }
      ctx.globalAlpha = 1;
    };
    const resize = () => {
      const size = host.getBoundingClientRect(); width = Math.max(1, size.width); height = Math.max(1, size.height);
      // Sparse ambient particles do not need a high-DPI full-screen buffer.
      const dpr = Math.min(devicePixelRatio || 1, 1);
      const pixelsWide = Math.round(width * dpr), pixelsHigh = Math.round(height * dpr);
      if (canvas.width !== pixelsWide || canvas.height !== pixelsHigh) { canvas.width = pixelsWide; canvas.height = pixelsHigh; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (theme === 'studio') { beam = ctx.createRadialGradient(width * .06, 0, 0, width * .06, 0, height * .85); beam.addColorStop(0, '#e9ba6c'); beam.addColorStop(1, 'transparent'); }
      draw();
    };
    const tick = (now: number) => { if (now - last >= 1000 / 30) { phase += Math.min((now - last) / 1000, .05); last = now; draw(); } frame = requestAnimationFrame(tick); };
    const move = (event: PointerEvent) => { if (event.pointerType !== 'mouse') return; pointer.x = event.clientX / innerWidth * 2 - 1; pointer.y = event.clientY / innerHeight * 2 - 1; };
    const observer = new ResizeObserver(resize); observer.observe(host); resize();
    if (active) { frame = requestAnimationFrame(tick); window.addEventListener('pointermove', move, { passive: true }); }
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('pointermove', move); };
  }, [active, theme]);
  return <div ref={ref} className={`landing-backdrop ${active ? 'is-active' : ''}`} aria-hidden="true"><div className="ambient-grid" /><div className="ambient-orb ambient-orb--one" /><div className="ambient-orb ambient-orb--two" /><div className="ambient-orb ambient-orb--three" /><canvas ref={canvasRef} /></div>;
}
