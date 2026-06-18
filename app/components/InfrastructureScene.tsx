"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, Line } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function NetworkModel() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.18;
  });

  const points = [
    [-2, 0, 0],
    [-1, 1, 0.5],
    [0, 0.2, -0.3],
    [1.2, 0.9, 0.4],
    [2, -0.2, -0.2],
    [0.8, -1, 0.3],
    [-1.4, -0.8, -0.4],
  ] as [number, number, number][];

  return (
    <group ref={group}>
      {points.map((p, i) => (
        <Float key={i} speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
          <Sphere position={p} args={[0.08, 24, 24]}>
            <meshStandardMaterial color="#f28c28" emissive="#f28c28" />
          </Sphere>
        </Float>
      ))}

      {points.slice(0, -1).map((p, i) => (
        <Line
          key={i}
          points={[p, points[i + 1]]}
          color="#ffffff"
          lineWidth={1.5}
          transparent
          opacity={0.45}
        />
      ))}

      <mesh rotation-x={-Math.PI / 2} position={[0, -1.4, 0]}>
        <circleGeometry args={[2.7, 80]} />
        <meshStandardMaterial color="#123047" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export default function InfrastructureScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={1.2} />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <NetworkModel />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}