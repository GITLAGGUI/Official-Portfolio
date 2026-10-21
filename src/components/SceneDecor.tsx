import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Pose = [number, number, number];
export function Drift({ children, active, position, rotation = [0, 0, 0], speed = .35 }: { children: ReactNode; active: boolean; position: Pose; rotation?: Pose; speed?: number }) {
  const ref = useRef<THREE.Group>(null), time = useRef(0);
  useFrame((_, delta) => { if (!active || !ref.current) return; time.current += Math.min(delta, .05); ref.current.position.y = position[1] + Math.sin(time.current * speed) * .065; ref.current.rotation.z = rotation[2] + Math.sin(time.current * speed * .6) * .045; });
  return <group ref={ref} position={position} rotation={rotation}>{children}</group>;
}
const metal = { metalness: .78, roughness: .25, clearcoat: 1 };

export function NightDesk({ active }: { active: boolean }) {
  return <Drift active={active} position={[-2.05, -.5, .35]} rotation={[0, .3, -.09]}>
    <mesh position={[0, -.8, 0]}><cylinderGeometry args={[.48, .52, .075, 48]} /><meshPhysicalMaterial color="#22292e" {...metal} /></mesh>
    <mesh position={[0, -.03, -.13]} rotation={[0, 0, -.16]}><cylinderGeometry args={[.025, .025, 1.55, 16]} /><meshPhysicalMaterial color="#aa9a7e" {...metal} /></mesh>
    <group position={[.1, .72, -.13]} rotation={[.2, .1, -.18]}><mesh><latheGeometry args={[[new THREE.Vector2(.02,.25),new THREE.Vector2(.13,.22),new THREE.Vector2(.43,-.13),new THREE.Vector2(.44,-.18)],48]} /><meshPhysicalMaterial color="#171d22" {...metal} side={THREE.DoubleSide} /></mesh><mesh position={[0,-.17,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.37,48]} /><meshBasicMaterial color="#ffe2a8" /></mesh><pointLight color="#ffd39a" intensity={2} distance={3} position={[0,-.3,.1]} /></group>
    {[0,1,2].map(i=><mesh key={i} position={[.24,-.64+i*.105,.42]} rotation={[0,.12+i*.11,0]}><boxGeometry args={[.81,.09,.49]} /><meshPhysicalMaterial color={['#33424a','#b3a58b','#1a242d'][i]} roughness={.7} metalness={.1} /></mesh>)}
  </Drift>;
}

export function MoonStudio({ active }: { active: boolean }) {
  const crescent = useMemo(()=>{ const s=new THREE.Shape();s.moveTo(.2,.73);s.bezierCurveTo(-.85,.64,-.85,-.64,.2,-.73);s.bezierCurveTo(-.37,-.3,-.37,.3,.2,.73);return new THREE.ExtrudeGeometry(s,{depth:.12,bevelEnabled:true,bevelSize:.04,bevelThickness:.035,bevelSegments:4});},[]);
  useEffect(()=>()=>crescent.dispose(),[crescent]);
  return <><Drift active={active} position={[2.18,1.02,.4]} rotation={[.1,-.25,-.2]} speed={.22}><mesh geometry={crescent}><meshPhysicalMaterial color="#d6c4ef" {...metal} roughness={.4} /></mesh><pointLight position={[-.5,0,.6]} color="#f0a6ff" intensity={1.5} distance={3} /></Drift><Drift active={active} position={[-2.12,-.32,.45]} rotation={[.1,.4,.3]} speed={.27}><mesh><octahedronGeometry args={[.55,0]} /><meshPhysicalMaterial color="#b49af5" metalness={.15} roughness={.1} transmission={.72} thickness={.7} ior={1.5} /></mesh><mesh rotation={[.7,.2,.3]}><torusGeometry args={[.8,.012,8,90]} /><meshStandardMaterial color="#ff9bda" emissive="#b855a2" emissiveIntensity={.35} metalness={.6} roughness={.3} /></mesh>{[-1,1].map(i=><mesh key={i} position={[i*.68,i*.5,.12]}><sphereGeometry args={[.055,16,12]} /><meshBasicMaterial color="#ffd3ef" /></mesh>)}</Drift></>;
}

export function DataOrbit({ active }: { active: boolean }) {
  const bead = useRef<THREE.Mesh>(null), time=useRef(0);
  const curves=useMemo(()=>[new THREE.CatmullRomCurve3([new THREE.Vector3(-.6,-.7,0),new THREE.Vector3(.2,-.2,.25),new THREE.Vector3(-.3,.35,.1),new THREE.Vector3(.5,.8,0)]),new THREE.CatmullRomCurve3([new THREE.Vector3(-.65,.6,-.1),new THREE.Vector3(.15,.2,.3),new THREE.Vector3(.6,-.5,0)])],[]);
  useFrame((_,delta)=>{if(!active||!bead.current)return;time.current+=Math.min(delta,.05)*.18;bead.current.position.copy(curves[0].getPoint(time.current%1));});
  return <><Drift active={active} position={[-2.15,.2,.4]} rotation={[.05,.1,0]}><group>{curves.map((curve,i)=><mesh key={i}><tubeGeometry args={[curve,50,.025,8,false]} /><meshPhysicalMaterial color="#45785b" {...metal} /></mesh>)}{[[-.6,-.7,0],[.5,.8,0],[-.65,.6,-.1],[.6,-.5,0]].map((p,i)=><group key={i} position={p as Pose}><mesh><sphereGeometry args={[.1,24,16]} /><meshPhysicalMaterial color="#a7d9a8" metalness={.65} roughness={.2} /></mesh><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.17,.012,8,36]} /><meshStandardMaterial color="#77c995" emissive="#386e49" /></mesh></group>)}<mesh ref={bead}><sphereGeometry args={[.055,16,12]} /><meshBasicMaterial color="#d3ffd7" /></mesh></group></Drift><Drift active={active} position={[2.08,.88,.4]} rotation={[.1,-.3,-.1]}><mesh><boxGeometry args={[1.02,.71,.1]} /><meshPhysicalMaterial color="#152c24" {...metal} /></mesh>{[0,1,2,3].map(i=><mesh key={i} position={[-.24+(i%2)*.11,.22-i*.13,.065]}><boxGeometry args={[.45-(i%2)*.1,.025,.012]} /><meshStandardMaterial color="#9be6ad" emissive="#61996b" emissiveIntensity={.65} /></mesh>)}</Drift></>;
}

export function MonokaiKeys({ active }: { active: boolean }) {
  const shapes = useMemo(() => {
    const block = (w: number, h: number, depth: number, r: number) => {
      const x=-w/2,y=-h/2,s=new THREE.Shape(); s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
      return new THREE.ExtrudeGeometry(s,{depth,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:3});
    };
    return [block(.76,.42,.2,.07),block(.59,.27,.018,.04)];
  },[]);
  useEffect(()=>()=>shapes.forEach(shape=>shape.dispose()),[shapes]);
  return <Drift active={active} position={[-2.1,.2,.5]} rotation={[.35,.3,-.19]} speed={.5}>{[0,1,2].map(i=><group key={i} position={[(i%2)*.18,(1-i)*.57,i*.05]}><mesh geometry={shapes[0]}><meshPhysicalMaterial color={i===1?'#bfa03a':'#33352b'} {...metal} roughness={.35} /></mesh><mesh geometry={shapes[1]} position={[0,.015,.23]}><meshPhysicalMaterial color={i===1?'#f5dd75':'#656744'} roughness={.35} metalness={.2} /></mesh><mesh position={[0,-.06,.28]}><boxGeometry args={[.23,.025,.01]} /><meshStandardMaterial color={i===1?'#3e351c':'#e1cc72'} /></mesh></group>)}</Drift>;
}

export function BlueArchitecture({ active }: { active: boolean }) {
  return <><Drift active={active} position={[-2.1,.23,.35]} rotation={[.15,.4,-.17]} speed={.4}>{[0,1,2].map(i=><group key={i} position={[i*.11,i*.15,-i*.22]}>{[[-.48,0,.035,1.25],[.48,0,.035,1.25],[0,-.61,.98,.035],[0,.61,.98,.035]].map((r,j)=><mesh key={j} position={[r[0],r[1],0]}><boxGeometry args={[r[2],r[3],.07]} /><meshPhysicalMaterial color={i===0?'#92d4ff':'#2d6999'} {...metal} /></mesh>)}</group>)}</Drift><Drift active={active} position={[2.15,.8,.55]} rotation={[.2,-.2,.2]}>{[-1,1].map(sign=><group key={sign} position={[sign*.27,0,0]} rotation={[0,0,sign*Math.PI/4]}><mesh><boxGeometry args={[.08,.65,.17]} /><meshPhysicalMaterial color="#58aff0" {...metal} /></mesh><mesh position={[sign*.28,-.28,0]} rotation={[0,0,Math.PI/2]}><boxGeometry args={[.08,.65,.17]} /><meshPhysicalMaterial color="#92d5ff" {...metal} /></mesh></group>)}</Drift></>;
}

export function RoseAtelier({ active }: { active: boolean }) {
  return <><Drift active={active} position={[-2.02,-.12,.5]} rotation={[.1,.3,-.25]} speed={.2}>{[0,1,2,3,4,5].map(i=><group key={i} rotation={[0,(i-2.5)*.15,(i-2.5)*.18]}><mesh position={[0,.33,-i*.035]}><boxGeometry args={[.65,1.22,.025]} /><meshPhysicalMaterial color={['#ead9ca','#d6ac9f','#c78d88','#b47d83','#d3b0ae','#f0ddd0'][i]} roughness={.65} metalness={.04} /></mesh></group>)}</Drift><Drift active={active} position={[2.13,.85,.4]} rotation={[.2,.25,-.3]} speed={.23}><mesh><sphereGeometry args={[.5,48,32]} /><meshPhysicalMaterial color="#e6b8b7" roughness={.14} metalness={.18} transmission={.7} thickness={.65} clearcoat={1} /></mesh><mesh rotation={[.8,.1,0]}><torusGeometry args={[.7,.022,12,80]} /><meshPhysicalMaterial color="#b5988c" {...metal} /></mesh></Drift></>;
}

export function NordTerrain({ active }: { active: boolean }) {
  const geometry=useMemo(()=>{const s=new THREE.Shape();s.moveTo(-.8,-.5);s.lineTo(-.3,.65);s.lineTo(.06,.08);s.lineTo(.38,.55);s.lineTo(.83,-.5);s.closePath();return new THREE.ExtrudeGeometry(s,{depth:.16,bevelEnabled:true,bevelThickness:.02,bevelSize:.015,bevelSegments:2});},[]);
  useEffect(()=>()=>geometry.dispose(),[geometry]);
  return <><Drift active={active} position={[-2,-.25,.45]} rotation={[.05,.4,-.05]} speed={.16}>{[0,1,2].map(i=><mesh key={i} geometry={geometry} position={[i*.13,i*.12,-i*.24]}><meshPhysicalMaterial color={['#b7d0db','#7b9aaa','#516977'][i]} roughness={.45} metalness={.3} /></mesh>)}</Drift><Drift active={active} position={[2.12,.9,.4]} rotation={[.2,.4,.2]} speed={.18}><mesh><dodecahedronGeometry args={[.62,0]} /><meshPhysicalMaterial color="#cae3ea" roughness={.22} metalness={.1} transmission={.65} thickness={1} ior={1.32} /></mesh></Drift></>;
}

export function DaylightPlant({ active }: { active: boolean }) {
  const leaf=useMemo(()=>{const s=new THREE.Shape();s.moveTo(0,0);s.bezierCurveTo(-.28,.12,-.21,.51,0,.67);s.bezierCurveTo(.21,.51,.28,.12,0,0);return new THREE.ExtrudeGeometry(s,{depth:.015,bevelEnabled:true,bevelThickness:.009,bevelSize:.009,bevelSegments:2});},[]);
  useEffect(()=>()=>leaf.dispose(),[leaf]);
  return <Drift active={active} position={[2.04,-.65,.45]} rotation={[0,.2,-.05]} speed={.2}><mesh position={[0,-.55,0]}><cylinderGeometry args={[.32,.24,.48,48]} /><meshPhysicalMaterial color="#e5e1d5" roughness={.3} metalness={.02} clearcoat={.7} /></mesh><mesh position={[0,.15,0]}><cylinderGeometry args={[.017,.023,1.05,12]} /><meshStandardMaterial color="#647b43" roughness={.8} /></mesh>{[0,1,2,3,4].map(i=><mesh key={i} geometry={leaf} position={[0,-.1+i*.18,0]} rotation={[.2+i*.1,i*1.7,i%2?-.75:.65]} scale={.65+i*.055}><meshPhysicalMaterial color={i%2?'#7f9c62':'#4d704b'} roughness={.55} metalness={.02} side={THREE.DoubleSide} /></mesh>)}</Drift>;
}
