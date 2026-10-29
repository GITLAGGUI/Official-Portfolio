import { useEffect, useRef, useState } from 'react';
import type { ProjectCaseStudy } from '../data/projects';
import useMotionVisibility from './useMotionVisibility';
import useMediaQuery from './useMediaQuery';
import previews from '../data/projectPreviews.json';

export default function ProjectPreview({ project, contain = false, intent = true, priority = false }: { project: ProjectCaseStudy; contain?: boolean; intent?: boolean; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null); const video = useRef<HTMLVideoElement>(null);
  const tiltFrame = useRef(0); const pointer = useRef({ x: 0, y: 0 });
  const active = useMotionVisibility(ref); const [index, setIndex] = useState(0); const [playing, setPlaying] = useState(false);
  const wide = useMediaQuery('(min-width: 768px)');
  const autoplay = active && wide && intent && !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  const clip = project.previewVideo ?? project.videos?.[0]?.src;
  const images = clip || !wide ? [project.hero] : [project.hero, ...(project.gallery ?? []).map((item) => item.src)].slice(0, 3);
  useEffect(() => () => { cancelAnimationFrame(tiltFrame.current); tiltFrame.current = 0; }, [active]);
  useEffect(() => {
    const player = video.current;
    if (!player || !clip) return;
    const previous = player.getAttribute('src');
    if (previous !== clip && (autoplay || previous)) { setPlaying(false); player.src = clip; }
    if (autoplay) { void player.play().catch(() => undefined); }
    else player.pause();
    return () => player.pause();
  }, [autoplay, clip]);
  useEffect(() => {
    if (!active || clip || images.length < 2) return;
    const timer = setInterval(() => setIndex((old) => (old + 1) % images.length), 5200);
    return () => clearInterval(timer);
  }, [active, clip, images.length]);
  return <div ref={ref} className={`project-preview ${contain ? 'project-preview--contain' : ''} ${active ? 'motion-active' : ''} ${playing ? 'is-playing' : ''}`} onPointerMove={(event) => {
    if (!active || contain || event.pointerType !== 'mouse') return;
    pointer.current = { x: event.clientX, y: event.clientY };
    if (tiltFrame.current) return;
    const element = event.currentTarget;
    tiltFrame.current = requestAnimationFrame(() => {
      tiltFrame.current = 0;
      const box = (element.parentElement ?? element).getBoundingClientRect();
      const x = (pointer.current.x - box.left) / box.width - .5, y = (pointer.current.y - box.top) / box.height - .5;
      element.style.transform = `perspective(1100px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) translateZ(0)`;
    });
  }} onPointerLeave={(event) => { cancelAnimationFrame(tiltFrame.current); tiltFrame.current = 0; event.currentTarget.style.transform = ''; }}>
    {images.map((src, i) => <img key={src} className={`project-preview__image ${i === index ? 'is-current' : ''}`} src={src} srcSet={(previews as Record<string, string>)[src]} sizes={contain ? '(min-width: 1000px) 65vw, 95vw' : '(min-width: 1280px) 23vw, (min-width: 768px) 43vw, 50vw'} alt={i === 0 ? project.heroAlt : `${project.title} project preview ${i + 1}`} loading={priority && i === 0 ? 'eager' : 'lazy'} decoding="async" />)}
    {clip && <video ref={video} muted loop playsInline preload="none" onPlaying={() => setPlaying(true)} onError={() => setPlaying(false)} aria-hidden="true" />}
    <span className="preview-light" aria-hidden="true" />
  </div>;
}
