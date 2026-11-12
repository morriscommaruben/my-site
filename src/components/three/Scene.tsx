"use client"; //required because scene uses hooks and webgl

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

// starting yaw: negative turns the cube's front face to the viewer's left.
// use Math.PI / 4 for 3/4 view.
const START_YAW = Math.PI / 4;

// rotation over full scroll range. 2pi = one full turn.
const TOTAL_ROTATION = Math.PI * 2;

function ScrollCube() {
  const meshRef = useRef<Mesh>(null);

  // read scroll directly each frame. trying to avoid re-renders
  useFrame(() => {
    if (!meshRef.current) return;

    // maxScroll = limit for scrolling on page, account for header/footer
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    // if user can scroll:
    // get max of: (downward scroll / maxScroll) or 0
    // then set progress to the min between that and 1
    // if user can't scroll:
    // set progress to 0
    const progress =
      maxScroll > 0 ? Math.min(Math.max((window.scrollY / maxScroll), 0), 1) : 0;

    // positive y rotation turns front face toward user's right
    // (anticlockwise when viewed from above cube).
    meshRef.current.rotation.y = START_YAW + progress * TOTAL_ROTATION;
  });

  // THA CUBE
  return (
    <mesh ref={meshRef} rotation={[0, START_YAW, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#c11655" />
    </mesh>
  );
}

// canvas fills parent, so div controls size
export default function Scene() {
  return (
    <div className="h-[60vh] w-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} />
        <ScrollCube />
      </Canvas>
    </div>
  );
}