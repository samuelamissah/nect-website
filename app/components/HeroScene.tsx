"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Text, Line, OrbitControls, Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/* eslint-disable @typescript-eslint/no-explicit-any */


function Particle({ curve, speed, color, initialProgress }: any) {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useRef(initialProgress);

  useFrame((_, delta) => {
    if (!ref.current) return;
    progress.current = (progress.current + delta * speed) % 1;
    const point = curve.getPoint(progress.current);
    ref.current.position.copy(point);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function InfrastructurePath({ start, end, color, controlPoint1, controlPoint2, label, labelPos }: any) {
  const curve = useMemo(() => {
    return new THREE.CubicBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(...controlPoint1),
      new THREE.Vector3(...controlPoint2),
      new THREE.Vector3(...end)
    );
  }, [start, end, controlPoint1, controlPoint2]);

  const points = useMemo(() => curve.getPoints(60), [curve]);

  return (
    <group>
      {/* Background track */}
      <Line points={points} color={color} lineWidth={2} transparent opacity={0.25} />
      
      {/* Flowing particles to represent coordination/data */}
      {[0, 0.33, 0.66].map((offset, i) => (
        <Particle key={i} curve={curve} speed={0.15} color={color} initialProgress={offset} />
      ))}

      {/* Label */}
      <Text
        position={labelPos}
        fontSize={0.16}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#0f172a"
      >
        {label}
      </Text>
      
      {/* Origin node */}
      <mesh position={new THREE.Vector3(...start)}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function NECTCore() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring1.current) ring1.current.rotation.x += delta * 0.4;
    if (ring1.current) ring1.current.rotation.y += delta * 0.2;
    
    if (ring2.current) ring2.current.rotation.x -= delta * 0.3;
    if (ring2.current) ring2.current.rotation.y -= delta * 0.5;
  });

  return (
    <group>
      <Sphere args={[0.4, 32, 32]}>
        <meshStandardMaterial color="#d8ca1f" emissive="#d8ca1f" emissiveIntensity={0.6} />
      </Sphere>
      
      <mesh ref={ring1}>
        <torusGeometry args={[0.7, 0.015, 16, 100]} />
        <meshStandardMaterial color="#d8ca1f" transparent opacity={0.6} />
      </mesh>
      
      <mesh ref={ring2}>
        <torusGeometry args={[1.0, 0.015, 16, 100]} />
        <meshStandardMaterial color="#d8ca1f" transparent opacity={0.3} />
      </mesh>

      <Text
        position={[0, -1.4, 0]}
        fontSize={0.25}
        color="#d8ca1f"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#0f172a"
      >
        NECT
      </Text>
    </group>
  );
}

function Visualization() {
  const group = useRef<THREE.Group>(null);

  // Subtle rotation for the whole system
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
      group.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.05;
    }
  });

  const paths = [
    {
      label: "Road Networks",
      color: "#e2e8f0", // slate-200
      start: [-3.5, 1.5, 0],
      controlPoint1: [-2, 1.5, 1],
      controlPoint2: [-1, 0.5, 0.5],
      end: [0, 0, 0],
      labelPos: [-3.5, 1.8, 0],
    },
    {
      label: "Power Infrastructure",
      color: "#fb923c", // orange-400
      start: [3.5, 1.5, 0],
      controlPoint1: [2, 1.5, -1],
      controlPoint2: [1, 0.5, -0.5],
      end: [0, 0, 0],
      labelPos: [3.5, 1.8, 0],
    },
    {
      label: "Water Systems",
      color: "#3b82f6", // blue-500
      start: [-3, -2, 0],
      controlPoint1: [-1.5, -2, -1],
      controlPoint2: [-1, -1, -0.5],
      end: [0, 0, 0],
      labelPos: [-3, -2.3, 0],
    },
    {
      label: "Fibre Routes",
      color: "#06b6d4", // cyan-500
      start: [3, -2, 0],
      controlPoint1: [1.5, -2, 1],
      controlPoint2: [1, -1, 0.5],
      end: [0, 0, 0],
      labelPos: [3, -2.3, 0],
    },
    {
      label: "Utility Corridors",
      color: "#10b981", // emerald-500
      start: [0, 3, -1],
      controlPoint1: [-0.5, 2, -1],
      controlPoint2: [-0.2, 1, -0.5],
      end: [0, 0, 0],
      labelPos: [0, 3.3, -1],
    }
  ];

  return (
    <group ref={group}>
      <NECTCore />
      {paths.map((path, idx) => (
        <InfrastructurePath key={idx} {...path} />
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="h-full w-full overflow-hidden rounded-sm bg-slate-900 relative">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={3} />
        <pointLight position={[-5, -5, 5]} intensity={1} color="#d8ca1f" />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Visualization />
        </Float>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
