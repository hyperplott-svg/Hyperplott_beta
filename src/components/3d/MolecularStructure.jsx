import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const MolecularStructure = ({ scale = 1, ...props }) => {
    const groupRef = useRef();

    // Use a detail level of 1 for icosahedron to get a lattice feel
    const detail = 1;
    const radius = 2;

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.1;
            groupRef.current.rotation.x = t * 0.05;
        }
    });

    // To get vertices for nodes
    const geometry = new THREE.IcosahedronGeometry(radius, detail);
    const vertices = [];
    const posAttribute = geometry.getAttribute('position');
    for (let i = 0; i < posAttribute.count; i++) {
        vertices.push(new THREE.Vector3().fromBufferAttribute(posAttribute, i));
    }

    // Remove duplicates
    const uniqueVertices = [];
    const seen = new Set();
    vertices.forEach(v => {
        const key = `${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueVertices.push(v);
        }
    });

    return (
        <group ref={groupRef} scale={scale} {...props}>
            {/* The Wireframe Lattice */}
            <Icosahedron args={[radius, detail]}>
                <meshStandardMaterial
                    wireframe
                    color="#6366F1"
                    emissive="#6366F1"
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.3}
                />
            </Icosahedron>

            {/* Glowing Nodes at Vertices */}
            {uniqueVertices.map((vertex, i) => (
                <PulsingNode key={i} position={vertex} />
            ))}

            {/* Inner Core Glow */}
            <Sphere args={[radius * 0.4, 16, 16]}>
                <meshBasicMaterial color="#EEF2FF" transparent opacity={0.6} />
            </Sphere>
        </group>
    );
};

const PulsingNode = ({ position }) => {
    const mesh = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const s = 1 + Math.sin(t * 2 + position.x) * 0.2;
        if (mesh.current) {
            mesh.current.scale.set(s, s, s);
        }
    });

    return (
        <Sphere ref={mesh} position={position} args={[0.12, 16, 16]}>
            <meshStandardMaterial
                color="#2D3FE8"
                emissive="#2D3FE8"
                emissiveIntensity={0.5}
            />
        </Sphere>
    );
};

export default MolecularStructure;
