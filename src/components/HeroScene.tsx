import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const gridPalette = ["#f06a6a", "#4ca7ff", "#f3d35d", "#55c7b5", "#a982ff"].map(
  (color) => new THREE.Color(color),
);

const pathSpecs = [
  [0.6, 0.13, 0.67, 0.47],
  [0.6, 0.3, 0.67, 0.47],
  [0.6, 0.47, 0.67, 0.47],
  [0.6, 0.64, 0.67, 0.47],
  [0.6, 0.81, 0.67, 0.47],
  [0.67, 0.47, 0.76, 0.47],
  [0.76, 0.47, 0.86, 0.25],
  [0.76, 0.47, 0.86, 0.49],
  [0.76, 0.47, 0.86, 0.72],
] as const;

function SpectrumGrid() {
  const fineGrid = useRef<THREE.GridHelper>(null);
  const strongGrid = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    const cycle = clock.elapsedTime / 2;
    const from = Math.floor(cycle) % gridPalette.length;
    const to = (from + 1) % gridPalette.length;
    const progress = THREE.MathUtils.smoothstep(cycle % 1, 0, 1);
    const color = gridPalette[from].clone().lerp(gridPalette[to], progress);
    const strength = 0.5 + 0.5 * Math.sin((cycle % 1) * Math.PI);

    for (const [grid, opacity] of [
      [fineGrid.current, 0.1 + strength * 0.15],
      [strongGrid.current, 0.06 + strength * 0.15],
    ] as const) {
      if (!grid) continue;
      const materials = Array.isArray(grid.material) ? grid.material : [grid.material];
      materials.forEach((material) => {
        material.color.copy(color);
        material.opacity = opacity;
        material.transparent = true;
        material.depthWrite = false;
      });
    }
  });

  return (
    <group position={[0, 0, -1.35]} rotation={[Math.PI / 2, 0, 0]}>
      <gridHelper ref={fineGrid} args={[22, 44, "#4ca7ff", "#4ca7ff"]} />
      <gridHelper ref={strongGrid} args={[22, 11, "#4ca7ff", "#4ca7ff"]} position={[0, -0.01, 0]} />
    </group>
  );
}

function FlowPulse({ curve, offset }: { curve: THREE.CatmullRomCurve3; offset: number }) {
  const pulse = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!pulse.current) return;
    const progress = (clock.elapsedTime * 0.29 + offset) % 1;
    pulse.current.position.copy(curve.getPointAt(progress));
    const scale = 0.78 + Math.sin(progress * Math.PI) * 0.42;
    pulse.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={pulse}>
      <sphereGeometry args={[0.055, 12, 12]} />
      <meshBasicMaterial color="#bce8ff" toneMapped={false} />
      <pointLight color="#2e9dff" intensity={2.5} distance={0.7} />
    </mesh>
  );
}

function ConnectionNetwork() {
  const { viewport } = useThree();
  const curves = useMemo(() => {
    const point = (x: number, y: number, z = 0) =>
      new THREE.Vector3((x - 0.5) * viewport.width, (0.5 - y) * viewport.height, z);

    return pathSpecs.map(([startX, startY, endX, endY], index) => {
      const start = point(startX, startY, 0.02);
      const end = point(endX, endY, 0.02);
      const bendX = THREE.MathUtils.lerp(startX, endX, index < 5 ? 0.62 : 0.48);
      return new THREE.CatmullRomCurve3([
        start,
        point(bendX, startY, -0.03),
        point(bendX, endY, 0.01),
        end,
      ]);
    });
  }, [viewport.height, viewport.width]);

  return (
    <group>
      {curves.map((curve, index) => (
        <group key={index}>
          <mesh>
            <tubeGeometry args={[curve, 54, index === 5 ? 0.026 : 0.018, 6, false]} />
            <meshStandardMaterial
              color="#7b8a93"
              emissive="#0a2a45"
              emissiveIntensity={0.85}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          <FlowPulse curve={curve} offset={(index * 0.13) % 1} />
          {index === 5 && <FlowPulse curve={curve} offset={0.52} />}
        </group>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.35]}
      orthographic
      camera={{ position: [0, 0, 10], zoom: 74 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.68} />
      <directionalLight position={[3, 4, 7]} color="#caeaff" intensity={1.8} />
      <SpectrumGrid />
      <ConnectionNetwork />
    </Canvas>
  );
}
