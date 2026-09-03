import { useEffect, useRef } from "react";

const colors = [[240, 106, 106], [76, 167, 255], [88, 214, 107], [243, 211, 93], [169, 130, 255]];

/** A small 2D layer keeps the full-editor grid animated without WebGL on phones. */
export default function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastPaint = 0;
    const started = performance.now();

    const paint = (now: number) => {
      const cycle = motion.matches ? 1 : Math.max(0, now - started) / 2000;
      const phase = cycle % 1;
      const blend = phase * phase * (3 - 2 * phase);
      const current = colors[Math.floor(cycle) % colors.length];
      const next = colors[(Math.floor(cycle) + 1) % colors.length];
      const color = current.map((value, index) => Math.round(value + (next[index] - value) * blend)).join(",");
      const strength = Math.sin(phase * Math.PI);
      context.clearRect(0, 0, width, height);
      for (const major of [false, true]) {
        const spacing = major ? 184 : 46;
        context.beginPath();
        context.strokeStyle = `rgba(${color},${major ? .22 + strength * .2 : .28 + strength * .18})`;
        context.lineWidth = major ? 1.2 + strength * .6 : .7 + strength * .35;
        for (let x = 0; x <= width; x += spacing) { context.moveTo(x + .5, 0); context.lineTo(x + .5, height); }
        for (let y = 0; y <= height; y += spacing) { context.moveTo(0, y + .5); context.lineTo(width, y + .5); }
        context.stroke();
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      paint(performance.now());
    };
    const tick = (now: number) => {
      if (!document.hidden && now - lastPaint >= 1000 / 24) {
        paint(now);
        lastPaint = now;
      }
      if (!motion.matches) frame = requestAnimationFrame(tick);
    };
    const updateMotion = () => {
      cancelAnimationFrame(frame);
      paint(performance.now());
      if (!motion.matches) frame = requestAnimationFrame(tick);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    updateMotion();
    motion.addEventListener("change", updateMotion);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", updateMotion);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-grid" aria-hidden="true" />;
}
