import { useEffect, useRef, useState } from 'react';
import type { ProjectCaseStudy } from '../data/projects';
import useMotionVisibility from './useMotionVisibility';

export default function ProjectPreview({ project, contain = false }: { project: ProjectCaseStudy; contain?: boolean }) {
  const ref = useRef<HTMLDivElement>(null); const video = useRef<HTMLVideoElement>(null);
  const active = useMotionVisibility(ref); const [index, setIndex] = useState(0); const [playing, setPlaying] = useState(false);
  const clip = project.previewVideo ?? project.videos?.[0]?.src;
  const images = [project.hero, ...(project.gallery ?? []).map((item) => item.src)].slice(0, 3);
  useEffect(() => {
    const player = video.current;
    if (!player || !clip) return;
    const previous = player.getAttribute('src');
    if (previous !== clip && (active || previous)) { setPlaying(false); player.src = clip; }
    if (active) { void player.play().catch(() => undefined); }
    else player.pause();
  }, [active, clip]);
  useEffect(() => {
    if (!active || clip || images.length < 2) return;
    const timer = setInterval(() => setIndex((old) => (old + 1) % images.length), 5200);
    return () => clearInterval(timer);
  }, [active, clip, images.length]);
  return <div ref={ref} className={`project-preview ${contain ? 'project-preview--contain' : ''} ${active ? 'motion-active' : ''} ${playing ? 'is-playing' : ''}`} onPointerMove={(event) => {
    if (!active || contain || event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect(); const x = (event.clientX - box.left) / box.width - .5, y = (event.clientY - box.top) / box.height - .5;
    event.currentTarget.style.transform = `perspective(1100px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) translateZ(0)`;
  }} onPointerLeave={(event) => { event.currentTarget.style.transform = ''; }}>
    {images.map((src, i) => <img key={src} className={`project-preview__image ${i === index ? 'is-current' : ''}`} src={src} alt={i === 0 ? project.heroAlt : `${project.title} project preview ${i + 1}`} loading="lazy" />)}
    {clip && <video ref={video} muted loop playsInline preload="none" onPlaying={() => setPlaying(true)} onError={() => setPlaying(false)} aria-hidden="true" />}
    <span className="preview-light" aria-hidden="true" />
  </div>;
}
