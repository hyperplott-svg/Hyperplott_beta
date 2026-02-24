import React, { useRef, Suspense, useState, useEffect } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { ArrowRight, Play, CheckCircle, Zap, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FactorialCube from '../3d/FactorialCube';
import ResponseSurface from '../3d/ResponseSurface';
import FloatingParticles from '../3d/FloatingParticles';
import ThreeErrorBoundary from '../common/ThreeErrorBoundary';

const Hero = ({ showBanner, setShowBanner }) => {
    const navigate = useNavigate();
    const { loginDemo } = useAuth();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const moveX = (clientX - window.innerWidth / 2) / 60;
            const moveY = (clientY - window.innerHeight / 2) / 60;
            setMousePos({ x: moveX, y: moveY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const springConfig = { damping: 30, stiffness: 100 };
    const mouseX = useSpring(mousePos.x, springConfig);
    const mouseY = useSpring(mousePos.y, springConfig);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-48 pb-20 overflow-hidden bg-bg-primary">
            {/* Beta Banner */}
            <AnimatePresence>
                {showBanner && (
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="fixed top-0 left-0 w-full z-[110] py-2 bg-gradient-to-r from-primary-purple to-primary text-white shadow-lg backdrop-blur-md"
                    >
                        <div className="container mx-auto px-6 relative flex items-center justify-center">
                            <p className="text-xs md:text-sm font-bold tracking-wide">
                                🚀 <span className="animate-pulse">Now in Beta</span> — First 100 users get <span className="underline decoration-accent-teal decoration-2">50% off forever</span>
                            </p>
                            <button
                                onClick={() => setShowBanner(false)}
                                className="absolute right-4 p-1 hover:bg-white/20 rounded-lg transition-all group"
                                aria-label="Close banner"
                            >
                                <X className="w-4 h-4 group-hover:scale-110 group-active:scale-90" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ambient Background Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary-purple/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]" />
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* 3D Scene */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
                <ThreeErrorBoundary>
                    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                        <Suspense fallback={null}>
                            <Environment preset="city" />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={2} color="#7c3aed" />
                            <pointLight position={[-10, -10, -10]} intensity={1} color="#1e3a8a" />

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

                            <FloatingParticles count={60} color="#7c3aed" />
                        </Suspense>
                    </Canvas>
                </ThreeErrorBoundary>
            </div>

            <div className="container mx-auto px-6 relative z-20">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="section-badge"
                    >
                        AI-Powered Design of Experiments
                    </motion.div>

                    {/* Headline */}
                    <div className="relative mb-8 max-w-5xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-slate-900"
                        >
                            Design <span className="text-gradient">Better</span><br /> Experiments.
                        </motion.h1>
                    </div>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-xl md:text-2xl text-slate-600 max-w-3xl mb-12 leading-relaxed font-medium"
                    >
                        Join researchers who are tired of expensive, complicated DoE software.
                        Optimize complex designs with statistical precision in minutes.
                    </motion.p>

                    {/* High-Impact Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mb-16">
                        <button
                            onClick={() => {
                                loginDemo();
                                navigate('/dashboard');
                            }}
                            className="btn-primary w-full sm:w-auto px-12 py-5 text-xl relative group overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Enter Laboratory <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <button className="btn-secondary w-full sm:w-auto px-12 py-5 text-xl flex items-center justify-center gap-3 group !bg-white/5 !border-white/10 hover:!bg-white/20 transition-all">
                            <div className="w-8 h-8 rounded-full bg-primary-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 text-primary-purple fill-current" />
                            </div>
                            Watch Demo
                        </button>
                    </div>

                    {/* Trust Signals */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]"
                    >
                        <span>✓ Public Beta Live</span>
                        <span>✓ Instant Guest Access</span>
                        <span>✓ Zero Configuration</span>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-20 flex flex-wrap justify-center gap-8 md:gap-12 py-8 border-t border-slate-100"
                    >
                        {[
                            "Validated Algorithms",
                            "Built by PhD Researchers",
                            "Industry-Standard Methods",
                            "Enterprise Security"
                        ].map((trust, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                                <CheckCircle className="w-4 h-4 text-primary-purple" />
                                {trust}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary-purple to-transparent" />
            </motion.div>

            {/* Micro-Data Status Bar */}
            <div className="absolute bottom-10 left-10 hidden xl:flex flex-col gap-4 opacity-40">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-accent-teal animate-ping" />
                    <span className="text-[10px] uppercase tracking-widest font-mono text-slate-400">Kernel Dynamic</span>
                </div>
                <div className="h-[1px] w-40 bg-gradient-to-r from-primary-purple to-transparent" />
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <motion.div
                            key={i}
                            animate={{ height: [2, 12, 4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            className="w-[2px] bg-primary-purple"
                        />
                    ))}
                </div>
            </div>

            <div className="absolute right-10 bottom-10 hidden xl:block opacity-40">
                <span className="text-[10px] uppercase tracking-[0.5em] font-mono text-right transform rotate-90 origin-bottom-right text-slate-400">Hyper-Compute v2.4</span>
            </div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />
        </section>
    );
};

export default Hero;
