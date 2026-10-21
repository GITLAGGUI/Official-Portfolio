import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { themes, type ThemeId } from '../data/themes';
import { NightDesk, MoonStudio, DataOrbit, MonokaiKeys, BlueArchitecture, RoseAtelier, NordTerrain, DaylightPlant } from './SceneDecor';

function roundShape(width: number, height: number, radius: number) {
  const x = -width / 2, y = -height / 2, shape = new THREE.Shape();
  shape.moveTo(x + radius, y); shape.lineTo(x + width - radius, y); shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius); shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height); shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius); shape.quadraticCurveTo(x, y, x + radius, y); return shape;
}

// The actual photo stays photographic; only the surrounding objects are modeled.
function StudioPhoto({ src }: { src: string }) {
  const source = useLoader(THREE.TextureLoader, src);
  const { texture, geometry, width, height } = useMemo(() => {
    const image = source.image as HTMLImageElement; const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.beginPath(); ctx.roundRect(0, 0, canvas.width, canvas.height, canvas.width * .045); ctx.clip(); ctx.drawImage(image, 0, 0);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 4;
    const height = 3.7, width = height * image.naturalWidth / image.naturalHeight;
    const geometry = new THREE.ExtrudeGeometry(roundShape(width, height, width * .045), { depth: .035, bevelEnabled: false, steps: 1 });
    return { texture, geometry, width, height };
  }, [source]);
  useEffect(() => () => { texture.dispose(); geometry.dispose(); }, [texture, geometry]);
  return <group position={[0, .05, -.12]}>
    <mesh geometry={geometry} position={[0, 0, -.045]}><meshStandardMaterial color="#14191e" roughness={.45} metalness={.6} /></mesh>
    <mesh><planeGeometry args={[width, height]} /><meshBasicMaterial map={texture} transparent alphaTest={.02} toneMapped={false} /></mesh>
  </group>;
}

function Ribbon({ color }: { color: string }) {
  const geometry = useMemo(() => {
    const vertices: number[] = [], indices: number[] = []; const segments = 160;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments * Math.PI * 2;
      const center = new THREE.Vector3(Math.sin(t) * .56, Math.cos(t) * .95, Math.sin(t * 2) * .3);
      const sideways = new THREE.Vector3(Math.cos(t * .5) * .19, Math.sin(t) * .08, Math.sin(t * .5) * .19);
      for (const sign of [-1, 1]) { const p = center.clone().addScaledVector(sideways, sign); vertices.push(p.x, p.y, p.z); }
      if (i < segments) { const a = i * 2; indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    }
    const result = new THREE.BufferGeometry(); result.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)); result.setIndex(indices); result.computeVertexNormals(); return result;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <group position={[-2.12, .15, .28]} rotation={[.2, .24, -.2]}>
    <mesh geometry={geometry}><meshPhysicalMaterial color={color} metalness={.08} roughness={.3} clearcoat={1} side={THREE.DoubleSide} /></mesh>
    <mesh geometry={geometry} scale={[.87, .87, .87]} position={[.02, 0, -.14]}><meshPhysicalMaterial color="#90a1ad" metalness={.94} roughness={.3} side={THREE.DoubleSide} /></mesh>
  </group>;
}

function Aperture({ color, active }: { color: string; active: boolean }) {
  const ref = useRef<THREE.Group>(null); const phase = useRef(0);
  const blade = useMemo(() => {
    const shape = new THREE.Shape(); shape.moveTo(.16, -.04); shape.quadraticCurveTo(.38, -.32, .66, -.18); shape.quadraticCurveTo(.74, .03, .58, .27); shape.lineTo(.27, .15); shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: .032, bevelEnabled: true, bevelThickness: .008, bevelSize: .008, bevelSegments: 2 });
  }, []);
  useEffect(() => () => blade.dispose(), [blade]);
  useFrame((_, delta) => { if (!active || !ref.current) return; phase.current += Math.min(delta, .05); ref.current.rotation.z = phase.current * .08; });
  return <group position={[2.03, 1.22, .7]} rotation={[.22, -.45, -.2]} scale={.87}>
    <mesh><torusGeometry args={[.74, .045, 12, 90]} /><meshPhysicalMaterial color="#b7c5cd" roughness={.2} metalness={.94} /></mesh>
    <mesh position={[0, 0, -.1]}><torusGeometry args={[.79, .025, 10, 90]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={.4} metalness={.7} roughness={.3} /></mesh>
    <group ref={ref}>{Array.from({ length: 7 }, (_, i) => <mesh key={i} geometry={blade} rotation={[0, 0, i * Math.PI * 2 / 7]} position={[0, 0, i * .004]}><meshPhysicalMaterial color={i % 2 ? '#33424e' : '#94a8b5'} roughness={.3} metalness={.9} clearcoat={.8} /></mesh>)}</group>
    <mesh position={[0, 0, -.08]}><circleGeometry args={[.32, 48]} /><meshPhysicalMaterial color={color} metalness={.3} roughness={.12} transparent opacity={.32} clearcoat={1} /></mesh>
  </group>;
}

function Waveform({ color, active }: { color: string; active: boolean }) {
  const group = useRef<THREE.Group>(null); const phase = useRef(0);
  const geometry = useMemo(() => new THREE.ExtrudeGeometry(roundShape(.07, 1, .032), { depth: .055, bevelEnabled: true, bevelThickness: .012, bevelSize: .01, bevelSegments: 2 }), []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame((_, delta) => { if (!active || !group.current) return; phase.current += Math.min(delta, .05); group.current.children.forEach((bar, i) => { bar.scale.y = .15 + Math.pow(Math.sin(i * .58 + phase.current * .75), 2) * .53; }); });
  return <group position={[1.12, -1.48, .72]} rotation={[.2, -.1, -.13]}><group ref={group}>{Array.from({ length: 21 }, (_, i) => <mesh key={i} geometry={geometry} position={[(i - 10) * .102, Math.sin(i * .18) * .06, Math.cos(i * .18) * .05]} scale={[1, .15 + Math.pow(Math.sin(i * .58), 2) * .53, 1]}><meshPhysicalMaterial color={i % 4 === 0 ? '#d1dce0' : color} metalness={.57} roughness={.19} clearcoat={1} emissive={color} emissiveIntensity={.13} /></mesh>)}</group></group>;
}

function Studio({ active, theme }: { active: boolean; theme: ThemeId }) {
  const scene = useRef<THREE.Group>(null); const phase = useRef(0); const pointer = useRef({ x: 0, y: 0 });
  const appearance = themes.find((item) => item.id === theme)!;
  useEffect(() => {
    if (!active || !matchMedia('(pointer:fine)').matches) return;
    const move = (event: PointerEvent) => { if (event.pointerType === 'mouse') pointer.current = { x: event.clientX / innerWidth * 2 - 1, y: event.clientY / innerHeight * 2 - 1 }; };
    const reset = () => { pointer.current = { x: 0, y: 0 }; };
    window.addEventListener('pointermove', move, { passive: true }); document.addEventListener('pointerleave', reset);
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', reset); };
  }, [active]);
  useFrame((_, delta) => {
    if (!active || !scene.current) return; const step = Math.min(delta, .05); phase.current += step;
    scene.current.rotation.y = THREE.MathUtils.damp(scene.current.rotation.y, pointer.current.x * .08, 3, step);
    scene.current.rotation.x = THREE.MathUtils.damp(scene.current.rotation.x, -pointer.current.y * .035, 3, step);
    scene.current.position.y = Math.sin(phase.current * .45) * .035;
  });
  const decor = {
    studio: <><NightDesk active={active} /><Aperture color="#d6b98b" active={active} /></>,
    dracula: <MoonStudio active={active} />,
    github: <DataOrbit active={active} />,
    monokai: <><MonokaiKeys active={active} /><Waveform color="#d3bf52" active={active} /></>,
    vscode: <BlueArchitecture active={active} />,
    rose: <RoseAtelier active={active} />,
    nord: <NordTerrain active={active} />,
    light: <><Ribbon color="#e7e2d7" /><DaylightPlant active={active} /></>,
  };
  return <group ref={scene}><StudioPhoto src={appearance.portrait} />{decor[theme]}</group>;
}

function FitCamera() {
  const { camera, size, invalidate } = useThree();
  useEffect(() => { const perspective = camera as THREE.PerspectiveCamera; const height = Math.max(4.55, 6.1 / (size.width / size.height)); perspective.position.set(0, .08, height / (2 * Math.tan(THREE.MathUtils.degToRad(30 / 2)))); perspective.lookAt(0, 0, 0); perspective.updateProjectionMatrix(); invalidate(); }, [camera, size.width, size.height, invalidate]);
  return null;
}

/** Local softboxes give the metal reflections without downloading an HDRI. */
function StudioReflections({ theme }: { theme: ThemeId }) {
  const { gl, scene, invalidate } = useThree();
  useEffect(() => {
    const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    const light = theme === 'light'; const warm = theme === 'studio' || theme === 'rose';
    const glow = ctx.createLinearGradient(0, 0, 0, 512); glow.addColorStop(0, light ? '#f4f4ef' : warm ? '#a99b85' : '#9ca7b5'); glow.addColorStop(.5, light ? '#c6d2ce' : '#364453'); glow.addColorStop(1, light ? '#8d9a93' : '#131a22'); ctx.fillStyle = glow; ctx.fillRect(0, 0, 1024, 512);
    ctx.fillStyle = '#f8fbff'; ctx.fillRect(110, 65, 78, 290); ctx.fillRect(640, 45, 140, 175);
    ctx.fillStyle = '#9db4c8'; ctx.fillRect(440, 130, 32, 290); ctx.fillStyle = '#f2debd'; ctx.fillRect(850, 280, 95, 120);
    const source = new THREE.CanvasTexture(canvas); source.mapping = THREE.EquirectangularReflectionMapping; source.colorSpace = THREE.SRGBColorSpace;
    const generator = new THREE.PMREMGenerator(gl); const environment = generator.fromEquirectangular(source); const previous = scene.environment;
    scene.environment = environment.texture; invalidate(); source.dispose(); generator.dispose();
    return () => { scene.environment = previous; environment.dispose(); };
  }, [gl, scene, invalidate, theme]);
  return null;
}

function FrameBudget({ active }: { active: boolean }) {
  const slowFrames = useRef(0);
  useFrame((state, delta) => {
    if (!active) return;
    slowFrames.current = delta > .04 ? slowFrames.current + 1 : Math.max(0, slowFrames.current - 1);
    if (slowFrames.current >= 18 && state.viewport.dpr > 1) { state.setDpr(1); slowFrames.current = 0; }
  });
  return null;
}

export default function HeroScene({ active = true, theme = 'studio' }: { active?: boolean; theme?: ThemeId }) {
  const accent = themes.find((item) => item.id === theme)!.colors[1];
  const light = theme === 'light'; const warm = theme === 'studio' || theme === 'rose';
  const maxDpr = matchMedia('(pointer:coarse)').matches ? 1.25 : 1.5;
  return <Canvas frameloop={active ? 'always' : 'demand'} dpr={[1, maxDpr]} camera={{ position: [0, .08, 10], fov: 30 }} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}>
    <FitCamera /><FrameBudget active={active} /><StudioReflections theme={theme} /><ambientLight intensity={light ? 2.2 : .85} /><directionalLight position={[-4, 5, 7]} intensity={light ? 4 : 2.4} color={warm ? "#ffe0ae" : "#edf4ff"} /><directionalLight position={[4, 1, 3]} intensity={light ? 1.6 : 3} color={accent} /><directionalLight position={[0, -3, 2]} intensity={1.4} color="#e3c5a7" /><Studio active={active} theme={theme} />
  </Canvas>;
}
