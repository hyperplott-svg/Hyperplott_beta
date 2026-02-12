import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const MatrixGrid3D = ({ ...props }) => {
    const groupRef = useRef();

    const cells = useMemo(() => {
        const temp = [];
        const rows = 4;
        const cols = 4;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                temp.push({
                    pos: [c * 1.2 - 1.8, -r * 1.2 + 1.8, 0],
                    run: r * cols + c + 1,
                    value: Math.random() > 0.5 ? '+' : '-',
                    color: Math.random() > 0.5 ? '#6366F1' : '#DBEAFE'
                });
            }
        }
        return temp;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
            groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.1;
        }
    });

    return (
        <group ref={groupRef} {...props}>
            {cells.map((cell, i) => (
                <MatrixCell key={i} {...cell} />
            ))}

            {/* Grid Frame */}
            <Box args={[5, 5, 0.1]} position={[0, 0, -0.2]}>
                <meshStandardMaterial color="#f8fafc" roughness={1} />
            </Box>
        </group>
    );
};

const MatrixCell = ({ pos, run, value, color }) => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.position.z = Math.sin(t * 2 + run) * 0.1;
        }
    });

    return (
        <group position={pos}>
            <Box ref={meshRef} args={[1, 1, 0.2]}>
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
            </Box>
            <Text position={[0, 0, 0.15]} fontSize={0.5} color={color === '#6366F1' ? '#white' : '#1e293b'} font="/fonts/Inter-Bold.ttf">
                {value}
            </Text>
            <Text position={[0.3, 0.3, 0.2]} fontSize={0.2} color="#94a3b8">
                {run}
            </Text>
        </group>
    );
};

export default MatrixGrid3D;
