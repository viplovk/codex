'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Core() { const ref = useRef<THREE.Mesh>(null); useFrame((state) => { if (!ref.current) return; ref.current.rotation.x = state.clock.elapsedTime * .16; ref.current.rotation.y = state.clock.elapsedTime * .23; }); return <Float speed={1.5} rotationIntensity={1} floatIntensity={1.2}><mesh ref={ref} position={[1.5, .2, 0]}><icosahedronGeometry args={[1.6, 5]} /><MeshDistortMaterial color="#6f8cff" roughness={.18} metalness={.55} distort={.28} speed={1.5} emissive="#182a6c" emissiveIntensity={.35} /></mesh></Float>; }
export default function HeroScene() { return <div className="scene" aria-hidden="true"><Canvas camera={{ position: [0, 0, 7], fov: 46 }} dpr={[1, 1.5]}><ambientLight intensity={.7}/><pointLight position={[4, 4, 3]} intensity={25} color="#879dff"/><pointLight position={[-3, -2, 2]} intensity={13} color="#bb5cff"/><Stars radius={40} depth={20} count={900} factor={2} saturation={0}/><Core/></Canvas></div>; }
