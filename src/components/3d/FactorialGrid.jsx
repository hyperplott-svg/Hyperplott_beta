import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

const FactorialGrid = () => {
    const groupRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.15;
            groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
        }
    });

    const gridColor = '#2D3FE8';
    const pointColor = '#00D9FF';

    // Simple cube grid points
    const points = useMemo(() => {
        const temp = [];
        [-1, 1].forEach(x => {
            [-1, 1].forEach(y => {
                [-1, 1].forEach(z => {
                    temp.push([x, y, z]);
                });
            });
        });
        return temp;
    }, []);

    // Lines for the cube edges
    const lines = useMemo(() => {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, -1, -1),
            new THREE.Vector3(1, -1, -1), new THREE.Vector3(1, 1, -1),
            new THREE.Vector3(1, 1, -1), new THREE.Vector3(-1, 1, -1),
            new THREE.Vector3(-1, 1, -1), new THREE.Vector3(-1, -1, -1),

            new THREE.Vector3(-1, -1, 1), new THREE.Vector3(1, -1, 1),
            new THREE.Vector3(1, -1, 1), new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(1, 1, 1), new THREE.Vector3(-1, 1, 1),
            new THREE.Vector3(-1, 1, 1), new THREE.Vector3(-1, -1, 1),

            new THREE.Vector3(-1, -1, -1), new THREE.Vector3(-1, -1, 1),
            new THREE.Vector3(1, -1, -1), new THREE.Vector3(1, -1, 1),
            new THREE.Vector3(1, 1, -1), new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(-1, 1, -1), new THREE.Vector3(-1, 1, 1),
        ]);
        return geometry;
    }, []);

    return (
        <group ref={groupRef}>
            <lineSegments geometry={lines}>
                <lineBasicMaterial attach="material" color={gridColor} transparent opacity={0.4} linewidth={2} />
            </lineSegments>
            {points.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial
                        color={pointColor}
                        emissive={pointColor}
                        emissiveIntensity={2}
                        toneMapped={false}
                    />
                </mesh>
            ))}
        </group>
    );
};

export default FactorialGrid;
