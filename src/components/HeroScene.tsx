import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

type Vec3 = [number, number, number];
type PanelKind = 'product' | 'code' | 'timeline' | 'react' | 'typescript' | 'python' | 'automation';
const poster = '/assets/projects/leadmaps/product.webp';
const filmPoster = '/assets/projects/leadmaps/leadmaps-v11-poster.webp';
const toolImages: Partial<Record<PanelKind, string>> = { react: '/assets/logos/react.svg', typescript: '/assets/logos/typescript.svg', python: '/assets/logos/python.svg', automation: '/assets/logos/n8n.svg' };

function roundedPanel(width: number, height: number, depth = .12) {
  const shape = new THREE.Shape(); const x = -width / 2, y = -height / 2, r = .14;
  shape.moveTo(x + r, y); shape.lineTo(x + width - r, y); shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r); shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height); shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r); shape.quadraticCurveTo(x, y, x + r, y);
  return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: .035, bevelSize: .035, bevelSegments: 3, steps: 1 });
}

function panelTexture(kind: PanelKind, image: CanvasImageSource) {
  const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 650;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#13242d'; ctx.fillRect(0, 0, 1024, 650);
  const isTool = !['product', 'code', 'timeline'].includes(kind);
  if (isTool) {
    ctx.fillStyle = '#172d38'; ctx.fillRect(0, 0, 1024, 650);
    ctx.textAlign = 'center';
    const picture = image as HTMLImageElement; const ratio = picture.naturalWidth / picture.naturalHeight || 1;
    const width = Math.min(480, 350 * ratio), height = width / ratio;
    ctx.drawImage(image, (1024 - width) / 2, 95 + (350 - height) / 2, width, height);
    ctx.font = '500 52px Segoe UI, sans-serif'; ctx.fillStyle = '#d5e1e5'; ctx.fillText(kind === 'typescript' ? 'TypeScript' : kind === 'python' ? 'Python' : kind === 'automation' ? 'Automation' : 'React', 512, 565);
  } else {
    ctx.fillStyle = '#223844'; ctx.fillRect(0, 0, 1024, 58);
    ['#db8f96', '#e0c184', '#8ac7b0'].forEach((color, i) => { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(28 + i * 22, 28, 5, 0, Math.PI * 2); ctx.fill(); });
    ctx.fillStyle = '#d5e4e8'; ctx.font = '500 21px Segoe UI, sans-serif'; ctx.fillText(kind === 'product' ? 'LeadMaps / workspace' : kind === 'code' ? 'build.tsx' : 'LeadMaps / spatial film', 112, 36);
    if (kind === 'product') {
      ctx.fillStyle = '#f5f5ec'; ctx.fillRect(14, 70, 996, 566); ctx.drawImage(image, 14, 73, 996, 560);
    } else if (kind === 'code') {
      const lines = [ ['// From idea to interface', '#78919f'], ['const product = {', '#b6a9e4'], ['  interface: React,', '#91cce5'], ['  intelligence: Python,', '#e1c578'], ['  workflows: n8n,', '#e9a3b3'], ['};', '#b6a9e4'], ['', '#fff'], ['await build(product);', '#a6d2b5'], ['await connect();', '#91cce5'], ['await ship();', '#d6e5ea'] ];
      ctx.font = '500 31px Consolas, monospace';
      lines.forEach(([text, color], i) => { ctx.fillStyle = '#4b6573'; ctx.fillText(String(i + 1).padStart(2, '0'), 23, 118 + i * 47); ctx.fillStyle = color; ctx.fillText(text, 92, 118 + i * 47); });
    } else {
      ctx.drawImage(image, 22, 75, 980, 360);
      ctx.fillStyle = '#0d1b23'; ctx.fillRect(22, 455, 980, 170);
      const colors = ['#76a9c8', '#ae95c6', '#89bba5'];
      colors.forEach((color, row) => { for (let i = 0; i < 5; i++) { ctx.fillStyle = color; ctx.globalAlpha = .55 + (i % 2) * .2; ctx.fillRect(47 + i * 185, 478 + row * 42, 169, 28); } }); ctx.globalAlpha = 1;
      ctx.fillStyle = '#ecdbb1'; ctx.fillRect(480, 456, 4, 169);
    }
  }
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 4; return texture;
}

function FloatingPanel({ kind, size, position, rotation = [0, 0, 0], phase = 0, active }: { kind: PanelKind; size: [number, number]; position: Vec3; rotation?: Vec3; phase?: number; active: boolean }) {
  const [width, height] = size;
  const source = useLoader(THREE.TextureLoader, toolImages[kind] ?? (kind === 'timeline' ? filmPoster : poster)); const ref = useRef<THREE.Group>(null); const time = useRef(phase);
  const texture = useMemo(() => panelTexture(kind, source.image), [kind, source]);
  const geometry = useMemo(() => roundedPanel(width, height), [width, height]);
  useEffect(() => () => { texture.dispose(); geometry.dispose(); }, [texture, geometry]);
  useFrame((_, delta) => {
    if (!active || !ref.current) return; time.current += Math.min(delta, .05);
    ref.current.position.y = position[1] + Math.sin(time.current * .65) * .09;
    ref.current.rotation.z = rotation[2] + Math.sin(time.current * .36) * .025;
  });
  return <group ref={ref} position={position} rotation={rotation}>
    <mesh geometry={geometry} castShadow><meshPhysicalMaterial color="#58717c" metalness={.65} roughness={.27} clearcoat={1} /></mesh>
    <mesh position={[0, 0, .158]}><planeGeometry args={[size[0] - .1, size[1] - .1]} /><meshBasicMaterial map={texture} toneMapped={false} /></mesh>
    <mesh geometry={geometry} position={[0, -.035, -.12]}><meshStandardMaterial color="#0c1920" metalness={.6} roughness={.4} /></mesh>
  </group>;
}

const routes: Vec3[][] = [
  [[-3.5, -1, .5], [-2, -2.1, .5], [-1, -1.8, 1.2], [.4, -1.8, .3]],
  [[3.5, 1.7, -.5], [4, -.8, -1], [2.4, -1.9, .1], [.4, -1.8, .3]],
  [[-3.2, 1.7, -.7], [-3.6, 2.9, -1.1], [2.5, 2.7, -1.6], [3.5, 1.7, -.5]],
];
function Signal({ points, offset, active }: { points: Vec3[]; offset: number; active: boolean }) {
  const ref = useRef<THREE.Group>(null); const phase = useRef(offset);
  const curve = useMemo(() => new THREE.CubicBezierCurve3(...points.map((point) => new THREE.Vector3(...point)) as [THREE.Vector3, THREE.Vector3, THREE.Vector3, THREE.Vector3]), [points]);
  useFrame((_, delta) => { if (!active || !ref.current) return; phase.current += Math.min(delta, .05) * .12; ref.current.position.copy(curve.getPoint(phase.current % 1)); });
  return <group><mesh><tubeGeometry args={[curve, 60, .014, 7, false]} /><meshStandardMaterial color="#7daebf" emissive="#3a6e86" emissiveIntensity={.65} transparent opacity={.65} /></mesh><group ref={ref} position={points[0]}><mesh><sphereGeometry args={[.052, 12, 12]} /><meshBasicMaterial color="#bdedff" /></mesh><mesh><sphereGeometry args={[.105, 12, 12]} /><meshBasicMaterial color="#a1d7eb" transparent opacity={.16} depthWrite={false} /></mesh></group></group>;
}
function Workbench({ active }: { active: boolean }) {
  const ref = useRef<THREE.Group>(null); const orbit = useRef<THREE.Group>(null); const time = useRef(0);
  const base = useMemo(() => roundedPanel(6.9, 3.25, .13), []);
  useEffect(() => () => base.dispose(), [base]);
  useFrame(({ pointer }, delta) => {
    if (!active || !ref.current) return; const step = Math.min(delta, .05); time.current += step;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, -.19 + pointer.x * .16, 2.7, step);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, .12 - pointer.y * .085, 2.7, step);
    ref.current.position.y = Math.sin(time.current * .4) * .055;
    if (orbit.current) orbit.current.rotation.z = time.current * .085;
  });
  return <group ref={ref} rotation={[.12, -.19, -.02]}>
    <group position={[.1, -1.72, -.25]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh geometry={base} receiveShadow><meshPhysicalMaterial color="#24414d" metalness={.6} roughness={.38} clearcoat={.7} /></mesh>
      <mesh geometry={base} position={[0, 0, -.22]}><meshStandardMaterial color="#0d212c" metalness={.55} roughness={.4} /></mesh>
      <mesh position={[0, 0, .19]}><ringGeometry args={[1.1, 1.12, 80]} /><meshBasicMaterial color="#8ec4d4" transparent opacity={.38} side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, 0, .2]}><ringGeometry args={[.91, .92, 80]} /><meshBasicMaterial color="#8ec4d4" transparent opacity={.18} side={THREE.DoubleSide} /></mesh>
    </group>
    <group ref={orbit} position={[.1, .2, -1.35]} rotation={[0, 0, -.22]}>
      <mesh scale={[1.45, .75, 1]}><torusGeometry args={[3.05, .01, 6, 100]} /><meshBasicMaterial color="#82b7c8" transparent opacity={.25} /></mesh>
      {Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return <mesh key={i} position={[Math.cos(a) * 4.42, Math.sin(a) * 2.29, Math.sin(a * 2) * .25]}><sphereGeometry args={[i % 3 === 0 ? .045 : .022, 10, 10]} /><meshBasicMaterial color={i % 3 === 0 ? '#c5b49b' : '#8db7c7'} transparent opacity={.65} /></mesh>; })}
    </group>
    <FloatingPanel kind="code" size={[2.85, 2.3]} position={[-2.25, .25, -.65]} rotation={[0, .2, .035]} phase={2} active={active} />
    <FloatingPanel kind="product" size={[4.2, 2.65]} position={[.45, .55, .05]} rotation={[0, -.04, -.02]} active={active} />
    <FloatingPanel kind="timeline" size={[2.8, 1.85]} position={[2.5, -.65, 1.05]} rotation={[-.04, -.17, -.025]} phase={4} active={active} />
    <FloatingPanel kind="react" size={[.85, .85]} position={[-3.45, -.92, .85]} rotation={[0, .2, -.12]} phase={1} active={active} />
    <FloatingPanel kind="typescript" size={[.82, .82]} position={[-2.5, 1.9, -.4]} rotation={[0, .15, .08]} phase={3} active={active} />
    <FloatingPanel kind="python" size={[.85, .85]} position={[3.3, 1.68, -.6]} rotation={[0, -.18, -.09]} phase={5} active={active} />
    <FloatingPanel kind="automation" size={[.9, .9]} position={[.05, -1.3, 1.1]} rotation={[0, -.05, .04]} phase={2} active={active} />
    {routes.map((points, index) => <Signal key={index} points={points} offset={index * .3} active={active} />)}
  </group>;
}
function FitCamera() {
  const { camera, size, invalidate } = useThree();
  useEffect(() => { const perspective = camera as THREE.PerspectiveCamera; const height = Math.max(5.3, 9.5 / (size.width / size.height)); perspective.position.set(0, .25, height / (2 * Math.tan(THREE.MathUtils.degToRad(29 / 2)))); perspective.lookAt(0, .1, 0); perspective.updateProjectionMatrix(); invalidate(); }, [camera, size.width, size.height, invalidate]);
  return null;
}
export default function HeroScene({ active = true }: { active?: boolean }) {
  return <Canvas shadows frameloop={active ? 'always' : 'demand'} dpr={[1, 1.5]} camera={{ position: [0, .25, 11], fov: 29 }} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}>
    <FitCamera /><ambientLight intensity={1.25} /><directionalLight castShadow position={[-3, 6, 7]} intensity={3} color="#e0eff8" shadow-mapSize={[1024, 1024]} /><directionalLight position={[4, 1, 4]} intensity={2} color="#83b4c5" /><directionalLight position={[-4, -2, 1]} intensity={1} color="#d9b5bc" /><Workbench active={active} />
  </Canvas>;
}
