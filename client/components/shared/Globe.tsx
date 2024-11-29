import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Globe() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [colorMap, normalMap, specularMap] = useTexture([
    "/assets/earth-day.jpg",
    "/assets/earth-normal.jpg",
    "/assets/earth-specular.jpg",
  ]);

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={[0, 0, 5]} />
      <Sphere args={[1, 64, 64]} ref={meshRef}>
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={5}
        />
      </Sphere>
      <Sphere args={[1.005, 64, 64]}>
        <meshPhongMaterial
          opacity={0.2}
          depthWrite={false}
          transparent={true}
          side={THREE.BackSide}
        >
          <color attach="color" args={["#5E81FF"]} />
        </meshPhongMaterial>
      </Sphere>
    </>
  );
}
