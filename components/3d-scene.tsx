"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Box, Octahedron, Environment } from "@react-three/drei"
import type * as THREE from "three"

function FloatingGeometry({
  position,
  geometry,
}: { position: [number, number, number]; geometry: "sphere" | "box" | "octahedron" }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
    }
  })

  const GeometryComponent = geometry === "sphere" ? Sphere : geometry === "box" ? Box : Octahedron

  return (
    <GeometryComponent ref={meshRef} position={position} args={[0.5]}>
      <meshStandardMaterial color="#0891b2" transparent opacity={0.6} emissive="#0891b2" emissiveIntensity={0.2} />
    </GeometryComponent>
  )
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#10b981" transparent opacity={0.6} />
    </points>
  )
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#0891b2" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#10b981" />

        <ParticleField />

        <FloatingGeometry position={[-4, 2, -2]} geometry="sphere" />
        <FloatingGeometry position={[4, -1, -3]} geometry="box" />
        <FloatingGeometry position={[0, 3, -4]} geometry="octahedron" />
        <FloatingGeometry position={[-2, -2, -1]} geometry="sphere" />
        <FloatingGeometry position={[3, 1, -2]} geometry="octahedron" />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
