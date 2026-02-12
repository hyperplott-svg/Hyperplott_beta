import React, { useRef, Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, OrbitControls, ContactShadows } from '@react-three/drei';
import { ArrowRight, Play, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import FactorialCube from '../3d/FactorialCube';
import ResponseSurface from '../3d/ResponseSurface';
import FloatingParticles from '../3d/FloatingParticles';

const Hero = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const words = ["Optimal", "Faster", "Validated", "Intelligent"];
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
        }, 3000);

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const moveX = (clientX - window.innerWidth / 2) / 60;
            const moveY = (clientY - window.innerHeight / 2) / 60;
            setMousePos({ x: moveX, y: moveY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            clearInterval(interval);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const springConfig = { damping: 30, stiffness: 100 };
    const mouseX = useSpring(mousePos.x, springConfig);
    const mouseY = useSpring(mousePos.y, springConfig);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-bg-primary">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px] animate-pulse-subtle" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/20 blur-[120px]" />
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-accent-pink/10 blur-[100px]" />
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#f8fafc 1px, transparent 1px), linear-gradient(90deg, #f8fafc 1px, transparent 1px)`,
                    backgroundSize: '80px 80px'
                }}
            />

            {/* 3D Scene */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-80">
                <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                    <Suspense fallback={null}>
                        <Environment preset="night" />
                        <ambientLight intensity={0.2} />
                        <pointLight position={[10, 10, 10]} intensity={2} color="#6366F1" />
                        <pointLight position={[-10, -10, -10]} intensity={1} color="#C084FC" />

                        <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
                            <motion.group style={{ x: mouseX, y: mouseY }}>
                                <FactorialCube position={[7, 1.5, -3]} scale={1.5} />
                            </motion.group>
                        </Float>

                        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
                            <motion.group style={{ x: useSpring(mousePos.x * -0.5, springConfig), y: useSpring(mousePos.y * -0.5, springConfig) }}>
                                <ResponseSurface position={[-9, -3, -2]} scale={1} />
                            </motion.group>
                        </Float>

                        <FloatingParticles count={60} color="#818CF8" />
                    </Suspense>
                </Canvas>
            </div>

            <div className="container mx-auto px-6 relative z-20">
                <div className="flex flex-col items-center text-center">
                    {/* Ultra Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-purple text-xs font-black uppercase tracking-[0.3em] mb-12 shadow-inner-glow backdrop-blur-md"
                    >
                        <Zap className="w-4 h-4 text-accent-teal fill-accent-teal animate-pulse" />
                        AI-Empowered experimental systems
                    </motion.div>

                    {/* Headline */}
                    <div className="relative mb-12 max-w-5xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white"
                        >
                            Design <br />
                            <div className="relative inline-block h-[1.1em] min-w-[300px] md:min-w-[600px] align-middle">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={words[wordIndex]}
                                        initial={{ opacity: 0, y: 50, rotateX: 60 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        exit={{ opacity: 0, y: -50, rotateX: -60 }}
                                        transition={{ type: "spring", damping: 15, stiffness: 100 }}
                                        className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent-pink py-2"
                                    >
                                        {words[wordIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                            <br /> Experiments
                        </motion.h1>
                    </div>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-xl md:text-2xl text-text-secondary max-w-2xl mb-16 leading-relaxed font-medium opacity-90"
                    >
                        Precision engineering meets statistical intelligence.
                        Orchestrate complex discovery cycles with <span className="text-white font-bold underline decoration-primary decoration-4 underline-offset-4">clinical accuracy</span>.
                    </motion.p>

                    {/* High-Contrast Actions */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
                    >
                        <Link to="/signup" className="group relative w-full sm:w-auto overflow-hidden rounded-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary group-hover:scale-110 transition-transform duration-500" />
                            <div className="relative px-12 py-5 text-white text-lg font-black flex items-center justify-center gap-3">
                                Get Started Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </Link>

                        <button className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-lg font-black hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center gap-3 group">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 text-primary fill-current" />
                            </div>
                            Watch System Demo
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Micro-Data Status Bar */}
            <div className="absolute bottom-10 left-10 hidden xl:flex flex-col gap-4 opacity-40">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-accent-teal animate-ping" />
                    <span className="text-[10px] uppercase tracking-widest font-mono">Kernel Dynamic</span>
                </div>
                <div className="h-[1px] w-40 bg-gradient-to-r from-primary to-transparent" />
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <motion.div
                            key={i}
                            animate={{ height: [2, 12, 4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            className="w-[2px] bg-primary"
                        />
                    ))}
                </div>
            </div>

            <div className="absolute right-10 bottom-10 hidden xl:block opacity-40">
                <span className="text-[10px] uppercase tracking-[0.5em] font-mono text-right transform rotate-90 origin-bottom-right">Hyper-Compute v2.4</span>
            </div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3column%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />
        </section>
    );
};

export default Hero;
