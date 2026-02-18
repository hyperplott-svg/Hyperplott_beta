import React, { useRef, Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, OrbitControls, ContactShadows } from '@react-three/drei';
import { ArrowRight, Play, Sparkles, ChevronRight, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import FactorialCube from '../3d/FactorialCube';
import ResponseSurface from '../3d/ResponseSurface';
import FloatingParticles from '../3d/FloatingParticles';
import ThreeErrorBoundary from '../common/ThreeErrorBoundary';

const Hero = () => {
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
            {/* Beta Banner - Better Positioning */}
            <div className="absolute top-[100px] left-0 w-full z-40 py-3 bg-gradient-to-r from-orange-500/90 to-yellow-500/90 text-slate-900 shadow-2xl backdrop-blur-md">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm md:text-base font-black uppercase tracking-wide">
                        🚀 <strong>Now in Beta</strong> — Join 50 researchers testing Hyperplott
                        <span className="mx-4 opacity-30">|</span>
                        <span className="text-slate-900 font-extrabold border-b-2 border-slate-900/30">First 100 users get 50% off forever</span>
                    </p>
                </div>
            </div>

            {/* Ambient Background Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse-subtle" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-emerald-500/5 blur-[100px]" />
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
                <ThreeErrorBoundary>
                    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                        <Suspense fallback={null}>
                            <Environment preset="night" />
                            <ambientLight intensity={0.2} />
                            <pointLight position={[10, 10, 10]} intensity={2} color="#10b981" />
                            <pointLight position={[-10, -10, -10]} intensity={1} color="#34d399" />

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

                            <FloatingParticles count={60} color="#10b981" />
                        </Suspense>
                    </Canvas>
                </ThreeErrorBoundary>
            </div>

            <div className="container mx-auto px-6 relative z-20">
                <div className="flex flex-col items-center text-center mt-20 md:mt-0">
                    {/* Ultra Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-inner-glow backdrop-blur-md"
                    >
                        <Zap className="w-3.5 h-3.5 fill-emerald-500 animate-pulse" />
                        Beta access now open • 50% lifetime discount
                    </motion.div>

                    {/* Headline */}
                    <div className="relative mb-10 max-w-5xl px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-white"
                        >
                            Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Optimal</span> Experiments<br />
                            <span className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white/40 mt-6 block">Precision optimization in minutes.</span>
                        </motion.h1>
                    </div>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-xl md:text-2xl text-text-secondary max-w-4xl mb-16 leading-relaxed font-medium"
                    >
                        The AI-powered Design of Experiments (DoE) platform built for researchers who need to optimize complex designs with statistical precision.
                    </motion.p>

                    {/* Value Props - Floating Glass Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-16 p-6 sm:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-2xl"
                    >
                        {[
                            { text: "Fast Matrix Generation", detail: "60 seconds vs. days" },
                            { text: "Resource Optimization", detail: "Reduce runs by 40-60%" },
                            { text: "AI-Powered Insight", detail: "No Statistics PhD needed" }
                        ].map((prop, i) => (
                            <div key={i} className="flex flex-col items-center sm:items-start transition-transform hover:scale-105">
                                <div className="flex items-center gap-2 mb-1">
                                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                                    <span className="text-white text-sm font-black uppercase tracking-widest">{prop.text}</span>
                                </div>
                                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">{prop.detail}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* High-Impact Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-3xl"
                    >
                        <Link to="/signup" className="group relative w-full sm:flex-1 overflow-hidden rounded-2xl shadow-2xl shadow-emerald-500/20">
                            <div className="absolute inset-0 bg-emerald-500 transition-transform duration-500 group-hover:scale-105" />
                            <div className="relative px-12 py-6 text-slate-950 text-xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                                Get Started Free
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </Link>

                        <button className="w-full sm:flex-1 px-12 py-6 rounded-2xl bg-white/5 border border-white/10 text-white text-xl font-black uppercase tracking-[0.1em] hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center gap-3 group">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 text-emerald-400 fill-current" />
                            </div>
                            Watch Demo
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Micro-Data Status Bar */}
            <div className="absolute bottom-10 left-10 hidden xl:flex flex-col gap-4 opacity-40">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                    <span className="text-[10px] uppercase tracking-widest font-mono">Kernel Dynamic</span>
                </div>
                <div className="h-[1px] w-40 bg-gradient-to-r from-emerald-500 to-transparent" />
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <motion.div
                            key={i}
                            animate={{ height: [2, 12, 4] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            className="w-[2px] bg-emerald-500"
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
