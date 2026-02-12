import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Float } from '@react-three/drei';
import * as THREE from 'three';

const Pareto3D = ({ ...props }) => {
    const factors = [
        { name: 'Temp', effect: 4.5, color: '#6366F1' },
        { name: 'pH', effect: 3.8, color: '#8B5CF6' },
        { name: 'Conc', effect: 2.1, color: '#06B6D4' },
        { name: 'T*P', effect: 1.5, color: '#10B981' },
        { name: 'P*C', effect: 0.8, color: '#94A3B8' },
    ];

    return (
        <group {...props}>
            {factors.map((factor, i) => (
                <Bar
                    key={i}
                    position={[i * 1.5 - (factors.length * 1.5) / 2, 0, 0]}
                    height={factor.effect}
                    color={factor.color}
                    name={factor.name}
                />
            ))}

            {/* Significance Threshold Line */}
            <mesh position={[0, 1.2, 0.5]}>
                <boxGeometry args={[factors.length * 1.6, 0.05, 0.05]} />
                <meshBasicMaterial color="#EF4444" />
            </mesh>
            <Text position={[factors.length * 0.8, 1.4, 0.5]} fontSize={0.3} color="#EF4444">
                Significance α=0.05
            </Text>
        </group>
    );
};

const Bar = ({ position, height, color, name }) => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1);
        }
    });

    return (
        <group position={position}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
                <Box
                    ref={meshRef}
                    args={[1, height, 1]}
                    position={[0, height / 2, 0]}
                    scale={[1, 0.01, 1]} // Initial scale for animation
                >
                    <meshStandardMaterial
                        color={color}
                        roughness={0.1}
                        metalness={0.8}
                        emissive={color}
                        emissiveIntensity={0.2}
                    />
                </Box>
            </Float>
            <Text position={[0, -0.8, 0.5]} fontSize={0.4} color="#64748b" font="/fonts/Inter-Bold.ttf">
                {name}
            </Text>
            <Text position={[0, height + 0.5, 0.5]} fontSize={0.5} color={color} font="/fonts/Inter-Bold.ttf">
                {(height * 10).toFixed(1)}
            </Text>
        </group>
    );
};

export default Pareto3D;
