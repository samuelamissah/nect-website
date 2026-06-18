"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sphere, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Network() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });

  const nodes = [
    { label: "NECT", pos: [0, 0, 0], size: 0.22, color: "#d8ca1f" },
    { label: "Roads", pos: [-2, 1, 0], size: 0.11, color: "#ffffff" },
    { label: "ECG", pos: [2, 1, 0], size: 0.11, color: "#ffffff" },
    { label: "GWCL", pos: [-2, -1, 0], size: 0.11, color: "#ffffff" },
    { label: "Telcos", pos: [2, -1, 0], size: 0.11, color: "#ffffff" },
    { label: "MMDAs", pos: [0, 1.7, -0.4], size: 0.1, color: "#ffffff" },
    { label: "Ministries", pos: [0, -1.7, -0.4], size: 0.1, color: "#ffffff" },
  ] as const;

  return (
    <group ref={group}>
      {nodes.slice(1).map((node, i) => (
        <Line
          key={i}
          points={[[0, 0, 0], node.pos]}
          color="#d8ca1f"
          lineWidth={1.3}
          transparent
          opacity={0.55}
        />
      ))}

      {nodes.map((node) => (
        <group key={node.label} position={node.pos}>
          <Sphere args={[node.size, 32, 32]}>
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.4}
            />
          </Sphere>

          <Text
            position={[0, -0.35, 0]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {node.label}
          </Text>
        </group>
      ))}

      <mesh rotation-x={-Math.PI / 2} position={[0, -2.15, 0]}>
        <ringGeometry args={[1.1, 2.7, 96]} />
        <meshStandardMaterial color="#1d8f45" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="h-full w-full overflow-hidden rounded-sm bg-slate-900 relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[4, 4, 5]} intensity={2} />
        <Network />
      </Canvas>
    </div>
  );
}