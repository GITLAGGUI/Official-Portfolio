import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function RibbonSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const curves = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const offset = (index - 3) * 0.075;
      return new THREE.CatmullRomCurve3([
        new THREE.Vector3(offset - 0.08, -2.7, 0),
        new THREE.Vector3(0.36 + offset, -1.85, index % 2 ? 0.08 : -0.08),
        new THREE.Vector3(-0.32 + offset, -0.8, index % 2 ? -0.12 : 0.1),
        new THREE.Vector3(0.28 + offset, 0.3, index % 2 ? 0.12 : -0.08),
        new THREE.Vector3(-0.26 + offset, 1.4, index % 2 ? -0.08 : 0.12),
        new THREE.Vector3(0.06 + offset, 2.65, 0),
      ]);
    });
  }, []);

  const particles = useMemo(() => {
    const points = new Float32Array(140 * 3);
    for (let index = 0; index < 140; index += 1) {
      const y = -2.7 + (index / 139) * 5.4;
      const wave = Math.sin(y * 2.2) * 0.32;
      points[index * 3] = wave + (Math.random() - 0.5) * 0.62;
      points[index * 3 + 1] = y;
      points[index * 3 + 2] = (Math.random() - 0.5) * 0.42;
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.07;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.22) * 0.035;
  });

  return (
    <group ref={groupRef} rotation={[0.04, -0.2, -0.05]}>
      {curves.map((curve, index) => (
        <mesh key={index}>
          <tubeGeometry args={[curve, 120, index === 3 ? 0.024 : 0.012, 6, false]} />
          <meshStandardMaterial
            color={index % 3 === 0 ? "#d0a657" : "#86a96f"}
            transparent
            opacity={index === 3 ? 0.56 : 0.34}
            roughness={0.24}
            metalness={0.16}
            emissive={index % 3 === 0 ? "#4a3212" : "#24361f"}
            emissiveIntensity={0.42}
          />
        </mesh>
      ))}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#d6bd78" size={0.032} transparent opacity={0.78} sizeAttenuation />
      </points>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.48} />
      <pointLight position={[2, 2, 4]} color="#9eb88a" intensity={22} distance={8} />
      <pointLight position={[-2, -1, 3]} color="#d4a85b" intensity={18} distance={8} />
      <RibbonSystem />
    </Canvas>
  );
}
