import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, Float, MeshDistortMaterial } from '@react-three/drei';

const ResponseSurface = ({ ...props }) => {
    const meshRef = useRef();

    const geometry = useMemo(() => {
        const size = 12;
        const resolution = 64;
        const geo = new THREE.PlaneGeometry(size, size, resolution, resolution);
        const posAttribute = geo.getAttribute('position');

        for (let i = 0; i < posAttribute.count; i++) {
            const x = posAttribute.getX(i);
            const y = posAttribute.getY(i);

            // Create a complex, ripple-like response surface
            const z = 3 * Math.sin(Math.sqrt(x * x + y * y) * 0.8) / (Math.sqrt(x * x + y * y) * 0.8 + 1);
            const noise = 0.5 * Math.sin(x * 0.5) * Math.cos(y * 0.5);

            posAttribute.setZ(i, z + noise);
        }
        geo.computeVertexNormals();
        return geo;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.z = t * 0.05;
            // Subtle wave motion
            const pos = meshRef.current.geometry.getAttribute('position');
            for (let i = 0; i < pos.count; i++) {
                const x = pos.getX(i);
                const y = pos.getY(i);
                const origZ = pos.getZ(i);
                // pos.setZ(i, origZ + Math.sin(t + x) * 0.01); // Too heavy for frame? Let's use DistortMaterial instead
            }
        }
    });

    return (
        <group {...props}>
            <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 3, 0, 0]}>
                    <MeshDistortMaterial
                        color="#7C3AED"
                        speed={2}
                        distort={0.4}
                        radius={1}
                        roughness={0.1}
                        metalness={0.8}
                        transparent
                        opacity={0.8}
                        side={THREE.DoubleSide}
                    />
                    {/* Glow Outline */}
                    <mesh geometry={geometry}>
                        <meshBasicMaterial color="#EC4899" wireframe transparent opacity={0.05} />
                    </mesh>
                </mesh>
            </Float>

            {/* Optimal Target Indicator - More dramatic */}
            <mesh position={[0, 0, 3.5]} rotation={[-Math.PI / 3, 0, 0]}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={10} />
                <pointLight color="#10B981" intensity={4} distance={6} />
                {/* Floating Ring around peak */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.6, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#10B981" transparent opacity={0.5} />
                </mesh>
            </mesh>

            {/* Labels */}
            <Text position={[0, -7, 0]} fontSize={0.4} color="#64748b" anchorY="top">
                FACTOR X (ENERGY)
            </Text>
            <Text position={[-7, 0, 0]} rotation={[0, 0, Math.PI / 2]} fontSize={0.4} color="#64748b" anchorY="bottom">
                FACTOR Y (FLOW)
            </Text>
            <Text position={[1.5, 1, 4.5]} fontSize={0.4} color="#10B981" font={null}>
                OPTIMA
            </Text>
        </group>
    );
};

export default ResponseSurface;
