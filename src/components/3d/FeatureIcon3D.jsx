import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, TorusKnot, Tetrahedron, MeshDistortMaterial, MeshWobbleMaterial, Dodecahedron } from '@react-three/drei';
import * as THREE from 'three';

const FeatureIcon3D = ({ type, color }) => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.4;
            meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;
            meshRef.current.position.y = Math.sin(t * 1.5) * 0.1;
        }
    });

    const materialProps = {
        color: color,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.9,
        emissive: color,
        emissiveIntensity: 0.2
    };

    // Global scale multiplier for all icons to make them fill the card better
    const globalScale = 1.4;

    switch (type) {
        case 'cube':
            return (
                <group ref={meshRef} scale={globalScale}>
                    <Box args={[1.5, 1.5, 1.5]}>
                        <meshPhysicalMaterial {...materialProps} wireframe thickness={0.5} transmission={0.5} />
                    </Box>
                    {[...Array(8)].map((_, i) => (
                        <Sphere key={i} args={[0.2, 16, 16]} position={[
                            (i % 2 - 0.5) * 1.5,
                            (Math.floor(i / 2) % 2 - 0.5) * 1.5,
                            (Math.floor(i / 4) - 0.5) * 1.5
                        ]}>
                            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
                        </Sphere>
                    ))}
                </group>
            );
        case 'surface':
            return (
                <group ref={meshRef} scale={globalScale}>
                    <TorusKnot args={[0.9, 0.25, 160, 40]}>
                        <MeshDistortMaterial {...materialProps} speed={3} distort={0.4} />
                    </TorusKnot>
                    <Sphere args={[0.25, 32, 32]} position={[0, 1.5, 0]}>
                        <meshStandardMaterial color="#2DD4BF" emissive="#2DD4BF" emissiveIntensity={5} />
                    </Sphere>
                </group>
            );
        case 'array':
            return (
                <group ref={meshRef} scale={globalScale}>
                    {[...Array(9)].map((_, i) => (
                        <Box key={i} args={[0.4, 0.4, 0.4]} position={[
                            (i % 3 - 1) * 0.6,
                            (Math.floor(i / 3) - 1) * 0.6,
                            0
                        ]}>
                            <meshPhysicalMaterial {...materialProps} transmission={0.8} thickness={1} />
                        </Box>
                    ))}
                </group>
            );
        case 'mixture':
            return (
                <group ref={meshRef} scale={globalScale}>
                    <Tetrahedron args={[1.2]}>
                        <MeshWobbleMaterial {...materialProps} factor={0.6} speed={2} />
                    </Tetrahedron>
                    <Sphere args={[0.1, 16, 16]} position={[0, 1.5, 0]}>
                        <meshStandardMaterial color="#F472B6" emissive="#F472B6" emissiveIntensity={5} />
                    </Sphere>
                </group>
            );
        case 'chart':
            return (
                <group ref={meshRef} scale={globalScale}>
                    {[0.6, 1.5, 1.0, 0.5].map((h, i) => (
                        <Box key={i} args={[0.4, h, 0.4]} position={[
                            (i - 1.5) * 0.6,
                            h / 2 - 0.8,
                            0
                        ]}>
                            <meshPhysicalMaterial {...materialProps} color={i % 2 === 0 ? color : '#C084FC'} transmission={0.5} />
                        </Box>
                    ))}
                </group>
            );
        case 'export':
            return (
                <group ref={meshRef} scale={globalScale}>
                    <Cylinder args={[0.6, 0.6, 1.5, 32]}>
                        <meshPhysicalMaterial {...materialProps} transmission={0.9} thickness={0.5} />
                    </Cylinder>
                    <Dodecahedron args={[0.3]} position={[0, 1.2, 0]}>
                        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={3} />
                    </Dodecahedron>
                </group>
            );
        default:
            return (
                <Box ref={meshRef} args={[1, 1, 1]} scale={globalScale}>
                    <meshStandardMaterial {...materialProps} />
                </Box>
            );
    }
};

export default FeatureIcon3D;
