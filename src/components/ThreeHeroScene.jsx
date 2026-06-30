/* eslint-disable react/no-unknown-property */
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#D8B76A";
const EMERALD = "#15564A";
const EMERALD_DEEP = "#123C35";
const NAVY = "#101828";

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The floating service cards arranged around the laptop.
const CARDS = [
  { label: "Career Portfolio", pos: [-2.7, 1.35, 0.2], dot: EMERALD, speed: 1.4 },
  { label: "Wedding Memory", pos: [2.8, 1.15, 0.0], dot: "#E7A6A0", speed: 1.1 },
  { label: "Business Website", pos: [-3.0, -0.55, -0.4], dot: GOLD, speed: 1.7 },
  { label: "Photo Memory", pos: [3.0, -0.7, 0.3], dot: "#8FB8DE", speed: 1.3 },
  { label: "Promo Video", pos: [-1.5, 2.2, -0.6], dot: "#C47A4A", speed: 1.5 },
  { label: "WhatsApp Leads", pos: [1.7, -2.0, 0.4], dot: "#25D366", speed: 1.9 },
];

function Laptop() {
  const bars = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        y: 0.42 - i * 0.16,
        w: 0.5 + ((i * 37) % 11) / 11,
        color: i % 3 === 0 ? GOLD : i % 3 === 1 ? "#5FAE97" : "#cfe3da",
      })),
    []
  );

  return (
    <group>
      {/* keyboard deck */}
      <mesh position={[0, -0.62, 0.35]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <boxGeometry args={[2.6, 1.7, 0.08]} />
        <meshStandardMaterial color={NAVY} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* screen */}
      <group position={[0, -0.62, -0.5]} rotation={[-0.3, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.6, 1.62, 0.08]} />
          <meshStandardMaterial color={NAVY} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[2.4, 1.44]} />
          <meshStandardMaterial color={EMERALD_DEEP} emissive={EMERALD} emissiveIntensity={0.5} />
        </mesh>
        {/* portfolio header band */}
        <mesh position={[0, 0.45, 0.06]}>
          <planeGeometry args={[2.4, 0.42]} />
          <meshBasicMaterial color={GOLD} toneMapped={false} transparent opacity={0.85} />
        </mesh>
        {bars.map((b, i) => (
          <mesh key={i} position={[-0.9 + b.w / 2, b.y - 0.18, 0.06]}>
            <planeGeometry args={[b.w, 0.05]} />
            <meshBasicMaterial color={b.color} toneMapped={false} transparent opacity={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function ServiceCard({ label, pos, dot, speed }) {
  return (
    <Float speed={reduced ? 0 : speed} rotationIntensity={0.25} floatIntensity={1.1}>
      <group position={pos}>
        {/* glass-ish panel */}
        <mesh castShadow>
          <boxGeometry args={[1.15, 0.72, 0.05]} />
          <meshStandardMaterial
            color="#FFFDF8"
            metalness={0.2}
            roughness={0.35}
            transparent
            opacity={0.92}
            emissive={GOLD}
            emissiveIntensity={0.05}
          />
        </mesh>
        {/* accent dot */}
        <mesh position={[-0.4, 0.18, 0.04]}>
          <circleGeometry args={[0.07, 24]} />
          <meshBasicMaterial color={dot} toneMapped={false} />
        </mesh>
        <Html
          center
          distanceFactor={9}
          position={[0.12, -0.02, 0.05]}
          style={{ pointerEvents: "none" }}
        >
          <div className="whitespace-nowrap font-grotesk text-[13px] font-semibold text-ink/90">
            {label}
          </div>
        </Html>
      </group>
    </Float>
  );
}

function GoldParticles({ count = 160 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 3.5;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.cos(p) * 0.7;
      arr[i * 3 + 2] = r * Math.sin(p) * Math.sin(t);
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current && !reduced) ref.current.rotation.y += dt * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={GOLD} size={0.045} sizeAttenuation transparent opacity={0.8} toneMapped={false} />
    </points>
  );
}

function Rig({ children }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const tx = reduced ? 0 : state.pointer.x * 0.3;
    const ty = reduced ? 0 : -state.pointer.y * 0.18;
    ref.current.rotation.y += (tx - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (ty - ref.current.rotation.x) * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

export default function ThreeHeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.5, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* warm ivory-studio lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-5, 2, 4]} intensity={28} color={GOLD} distance={16} />
      <pointLight position={[5, -2, 3]} intensity={22} color={EMERALD} distance={16} />

      <Rig>
        <Float speed={reduced ? 0 : 1.1} rotationIntensity={0.22} floatIntensity={0.8}>
          <Laptop />
        </Float>

        {CARDS.map((c) => (
          <ServiceCard key={c.label} {...c} />
        ))}

        <GoldParticles />
      </Rig>

      <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={14} blur={2.8} far={4.5} color="#101828" />
    </Canvas>
  );
}
