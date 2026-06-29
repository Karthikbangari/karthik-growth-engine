/* eslint-disable react/no-unknown-property */
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, ContactShadows } from "@react-three/drei";

const ACCENTS = ["#38BDF8", "#8B5CF6", "#22C55E"];
const reduced =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Floating laptop with a glowing "code" screen, built from simple geometry.
function Laptop() {
  const bars = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        y: 0.5 - i * 0.16,
        w: 0.5 + Math.random() * 1.1,
        x: -0.85 + Math.random() * 0.2,
        color: ACCENTS[i % ACCENTS.length],
      })),
    []
  );

  return (
    <group>
      {/* base / keyboard deck */}
      <mesh position={[0, -0.62, 0.35]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <boxGeometry args={[2.5, 1.6, 0.08]} />
        <meshStandardMaterial color="#0b1220" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* screen, hinged back */}
      <group position={[0, -0.62, -0.45]} rotation={[-0.32, 0, 0]}>
        {/* bezel */}
        <mesh castShadow>
          <boxGeometry args={[2.5, 1.55, 0.07]} />
          <meshStandardMaterial color="#0b1220" metalness={0.7} roughness={0.35} />
        </mesh>
        {/* glowing panel */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.3, 1.38]} />
          <meshStandardMaterial color="#0a1830" emissive="#0e2a52" emissiveIntensity={0.9} />
        </mesh>
        {/* code lines */}
        {bars.map((b, i) => (
          <mesh key={i} position={[b.x + b.w / 2, b.y * 0.78, 0.05]}>
            <planeGeometry args={[b.w, 0.05]} />
            <meshBasicMaterial color={b.color} toneMapped={false} transparent opacity={0.85} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Node({ position, color, speed }) {
  return (
    <Float speed={reduced ? 0 : speed} rotationIntensity={0.7} floatIntensity={1.4}>
      <mesh position={position} castShadow>
        <icosahedronGeometry args={[0.17, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          metalness={0.3}
          roughness={0.25}
        />
      </mesh>
    </Float>
  );
}

const NODES = [
  { position: [-2.4, 1.2, -0.4], color: ACCENTS[0], speed: 1.6 },
  { position: [2.5, 1.0, -0.2], color: ACCENTS[1], speed: 1.2 },
  { position: [-2.0, -1.1, 0.5], color: ACCENTS[2], speed: 1.9 },
  { position: [2.2, -1.2, 0.3], color: ACCENTS[0], speed: 1.4 },
  { position: [0, 1.9, -0.7], color: ACCENTS[1], speed: 1.7 },
];

// Tilts the whole scene gently toward the pointer (parallax).
function Rig({ children }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const tx = reduced ? 0 : state.pointer.x * 0.35;
    const ty = reduced ? 0 : -state.pointer.y * 0.2;
    ref.current.rotation.y += (tx - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (ty - ref.current.rotation.x) * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

export default function ThreeHeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.4, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-5, 2, 4]} intensity={40} color="#38BDF8" distance={14} />
      <pointLight position={[5, -2, 3]} intensity={36} color="#8B5CF6" distance={14} />
      <pointLight position={[0, -3, 2]} intensity={20} color="#22C55E" distance={12} />

      <Rig>
        <Float speed={reduced ? 0 : 1.1} rotationIntensity={0.25} floatIntensity={0.9}>
          <Laptop />
        </Float>

        {NODES.map((n, i) => (
          <Node key={i} {...n} />
        ))}

        {/* glowing connection lines from nodes to the laptop */}
        {NODES.map((n, i) => (
          <Line
            key={`l-${i}`}
            points={[n.position, [0, -0.2, 0]]}
            color={n.color}
            lineWidth={1}
            transparent
            opacity={0.35}
            dashed
            dashSize={0.18}
            gapSize={0.12}
          />
        ))}
      </Rig>

      <ContactShadows position={[0, -1.8, 0]} opacity={0.35} scale={12} blur={2.6} far={4} color="#000000" />
    </Canvas>
  );
}
