"use client"; //required because scene uses hooks and webgl

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

function SpinningCube() {
  const meshRef = useRef<Mesh>(null);

  //delta here to make rotation identical on both 60hz and 120hz displays
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.8;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#6366f1" />
    </mesh>
  );
}

// canvas fills parent, so div controlls size
export default function Scene() {
  return (
    <div className="h-[60vh] w-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} />
        <SpinningCube />
      </Canvas>
    </div>
  );
}