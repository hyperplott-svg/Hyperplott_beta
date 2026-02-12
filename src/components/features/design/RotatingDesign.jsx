import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    Float,
    Points,
    PointMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import ThreeErrorBoundary from '../../common/ThreeErrorBoundary';

const DataPoints = () => {
    const points = useMemo(() => {
        const coords = [];
        for (let i = 0; i < 200; i++) {
            coords.push((Math.random() - 0.5) * 12);
            coords.push((Math.random() - 0.5) * 12);
            coords.push((Math.random() - 0.5) * 12);
        }
        return new Float32Array(coords);
    }, []);

    return (
        <Points positions={points} stride={3}>
            <PointMaterial
                transparent
                color="#6366F1"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
};

const FactorialCube = () => {
    const cubeRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (cubeRef.current) {
            cubeRef.current.rotation.y = t * 0.15;
            cubeRef.current.rotation.x = t * 0.1;
        }
    });

    const primaryColor = "#2D3FE8";
    const secondaryColor = "#8B5CF6";

    return (
        <group ref={cubeRef}>
            {/* Main Cube Wireframe */}
            <mesh>
                <boxGeometry args={[3, 3, 3]} />
                <meshStandardMaterial
                    color={primaryColor}
                    wireframe
                    transparent
                    opacity={0.2}
                />
            </mesh>

            {/* Corner Spheres representing 2^3 design */}
            {[-1.5, 1.5].map(x =>
                [-1.5, 1.5].map(y =>
                    [-1.5, 1.5].map(z => (
                        <mesh key={`${x}-${y}-${z}`} position={[x, y, z]}>
                            <sphereGeometry args={[0.15, 16, 16]} />
                            <meshStandardMaterial
                                color={secondaryColor}
                                emissive={secondaryColor}
                                emissiveIntensity={1}
                            />
                        </mesh>
                    ))
                )
            )}

            {/* Connecting Lines for better visibility */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(3, 3, 3)]} />
                <lineBasicMaterial color={primaryColor} transparent opacity={0.3} />
            </lineSegments>
        </group>
    );
};

const RotatingDesign = () => {
    return (
        <div className="w-full h-full relative">
            <ThreeErrorBoundary>
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={0.8} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#EEF2FF" />
                    <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <FactorialCube />
                    </Float>

                    <DataPoints />

                    <OrbitControls enableZoom={false} enablePan={false} autoRotate speed={0.5} />
                </Canvas>
            </ThreeErrorBoundary>
        </div>
    );
};

export default RotatingDesign;
