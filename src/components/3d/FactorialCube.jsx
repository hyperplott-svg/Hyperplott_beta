import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

const FactorialCube = ({ scale = 1, ...props }) => {
    const groupRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.1;
            groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.05;
        }
    });

    const colors = {
        vertices: '#7C3AED', // Ultra-Premium Purple
        edges: '#EC4899',    // Ultra-Premium Pink
        faces: 'rgba(124, 58, 237, 0.05)'
    };

    // 2^3 Factorial Design points
    const points = useMemo(() => {
        const temp = [];
        [-1, 1].forEach(x => {
            [-1, 1].forEach(y => {
                [-1, 1].forEach(z => {
                    temp.push({
                        pos: [x * 2, y * 2, z * 2],
                        id: `${x}${y}${z}`
                    });
                });
            });
        });
        return temp;
    }, []);

    // Edge geometry
    const edgesArray = [
        [[-2, -2, -2], [2, -2, -2]], [[2, -2, -2], [2, 2, -2]], [[2, 2, -2], [-2, 2, -2]], [[-2, 2, -2], [-2, -2, -2]],
        [[-2, -2, 2], [2, -2, 2]], [[2, -2, 2], [2, 2, 2]], [[2, 2, 2], [-2, 2, 2]], [[-2, 2, 2], [-2, -2, 2]],
        [[-2, -2, -2], [-2, -2, 2]], [[2, -2, -2], [2, -2, 2]], [[2, 2, -2], [2, 2, 2]], [[-2, 2, -2], [-2, 2, 2]],
    ];

    return (
        <group ref={groupRef} scale={scale} {...props}>
            {/* Axis Labels - Using standard font to avoid loading issues */}
            <Text position={[3, -2.2, -2.2]} fontSize={0.3} color="#7C3AED" anchorX="left">
                TEMPERATURE
            </Text>
            <Text position={[-2.2, 3, -2.2]} fontSize={0.3} color="#EC4899" rotation={[0, 0, Math.PI / 2]} anchorX="left">
                PH LEVEL
            </Text>
            <Text position={[-2.2, -2.2, 3]} fontSize={0.3} color="#3B82F6" rotation={[0, -Math.PI / 2, 0]} anchorX="left">
                TIME (s)
            </Text>

            {/* Cube Edges */}
            {edgesArray.map((edge, i) => (
                <line key={i}>
                    <bufferGeometry attach="geometry" onUpdate={self => self.setFromPoints(edge.map(p => new THREE.Vector3(...p)))} />
                    <lineBasicMaterial attach="material" color={colors.edges} transparent opacity={0.3} linewidth={3} />
                </line>
            ))}

            {/* Glass Cube Volume */}
            <mesh>
                <boxGeometry args={[4, 4, 4]} />
                <meshStandardMaterial
                    color="#7C3AED"
                    transparent
                    opacity={0.03}
                    roughness={0}
                    metalness={1}
                />
            </mesh>

            {/* Experimental Points */}
            {points.map((point, i) => (
                <PulsingPoint key={i} position={point.pos} color={i % 2 === 0 ? colors.vertices : colors.edges} />
            ))}

            {/* Core Visualization Element */}
            <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
                <torusKnotGeometry args={[1, 0.25, 128, 32]} />
                <meshPhysicalMaterial
                    color="#7C3AED"
                    emissive="#EC4899"
                    emissiveIntensity={0.5}
                    roughness={0.1}
                    metalness={0.8}
                    transparent
                    opacity={0.15}
                    transmission={0.8}
                    thickness={0.5}
                />
            </mesh>
        </group>
    );
};

const PulsingPoint = ({ position, color }) => {
    const mesh = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const s = 1 + Math.sin(t * 3 + position[0]) * 0.2;
        if (mesh.current) mesh.current.scale.set(s, s, s);
    });

    return (
        <group position={position}>
            <Sphere ref={mesh} args={[0.18, 24, 24]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
            </Sphere>
            <Sphere args={[0.4, 16, 16]}>
                <meshBasicMaterial color={color} transparent opacity={0.05} />
            </Sphere>
        </group>
    );
};

export default FactorialCube;
