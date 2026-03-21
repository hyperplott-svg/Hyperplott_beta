import React, { useState, Suspense, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Maximize2, Download, Presentation, ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import ResponseSurface from '../3d/ResponseSurface';
import Pareto3D from '../3d/Pareto3D';
import MatrixGrid3D from '../3d/MatrixGrid3D';
import ThreeErrorBoundary from '../common/ThreeErrorBoundary';
import { Link } from 'react-router-dom';

const plots = [
    {
        title: "Response Surface",
        label: "3D HIGH-FIDELITY",
        description: "Explore multi-factor interactions in immersive 3D space. Identify optimal process windows with absolute mathematical precision.",
        gradient: "from-emerald-500 to-emerald-700"
    },
    {
        title: "Contour Mapping",
        label: "2D OVERLAY",
        description: "Detailed slices of your experimental domain. Visualize constraints and multi-response trade-offs in real-time.",
        gradient: "from-teal-400 to-emerald-600"
    },
    {
        title: "Sensitivity Engine",
        label: "PERTURBATION",
        description: "Identify high-impact factors at a glance. Our sensitivity engine clarifies which variables truly drive your success.",
        gradient: "from-cyan-400 to-teal-600"
    },
    {
        title: "Model Validation",
        label: "DIAGNOSTICS",
        description: "Rigorous actual-vs-predicted analysis and residual plotting ensures your results are publication-ready and robust.",
        gradient: "from-emerald-300 to-teal-500"
    }
];

const VisualizationShowcase = () => {
    const [activeTab, setActiveTab] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.1 });

    return (
        <section id="viz" className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8"
                    >
                        <Presentation className="w-4 h-4" />
                        Scientific Visualization Suite
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-[1.1]"
                    >
                        Publication-Ready <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600">Visualizations.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Interactive 3D plots and predictive diagnostics engineered for clarity and scientific rigor.
                    </motion.p>
                </div>

                {/* Tab Navigation — above viewer on all screens */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    {plots.map((plot, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(i)}
                            className={`px-4 py-3 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden ${
                                activeTab === i
                                    ? 'bg-white/10 border-emerald-500/40 shadow-lg'
                                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                            }`}
                        >
                            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${plot.gradient} transition-opacity duration-300 ${activeTab === i ? 'opacity-100' : 'opacity-0'}`} />
                            <h4 className="text-sm font-black text-white tracking-tight uppercase leading-tight">{plot.title}</h4>
                            <span className={`text-[9px] font-black uppercase tracking-[0.15em] mt-0.5 block ${activeTab === i ? 'text-emerald-400' : 'text-slate-500'}`}>
                                {plot.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Main Viewer */}
                <div className="relative rounded-3xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="flex flex-col md:flex-row"
                        >
                            {/* Info Panel */}
                            <div className="md:w-[300px] shrink-0 flex flex-col justify-center p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10 bg-slate-900/50">
                                <span className={`inline-block px-3 py-1 rounded-md bg-gradient-to-br ${plots[activeTab].gradient} text-[9px] font-black text-white uppercase tracking-widest mb-3 w-fit`}>
                                    {plots[activeTab].label}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
                                    {plots[activeTab].title}
                                </h3>
                                <p className="text-slate-400 font-medium leading-relaxed text-sm md:text-base">
                                    {plots[activeTab].description}
                                </p>
                                <div className="flex gap-3 mt-6">
                                    <button className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                        <Download className="w-3.5 h-3.5" /> Export PLT
                                    </button>
                                    <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                                        <Maximize2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* 3D Canvas */}
                            <div className="flex-1 h-[280px] sm:h-[380px] md:h-[480px] relative" ref={ref}>
                                {isInView && (
                                    <ThreeErrorBoundary>
                                        <Canvas dpr={[1, 2]} camera={{ position: [0, 5, 12], fov: 40 }}>
                                            <Suspense fallback={null}>
                                                <Environment preset="night" />
                                                <ambientLight intensity={0.3} />
                                                <pointLight position={[10, 10, 10]} intensity={2} color="#10b981" />
                                                <pointLight position={[-10, -10, -10]} intensity={1} color="#34d399" />
                                                <group scale={1.2}>
                                                    {activeTab === 0 && <ResponseSurface position={[0, -2.5, 0]} />}
                                                    {activeTab === 1 && <ResponseSurface position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} />}
                                                    {activeTab === 2 && <Pareto3D position={[0, -2, 0]} scale={1.2} />}
                                                    {activeTab === 3 && <MatrixGrid3D position={[0, 0, 0]} scale={1.2} />}
                                                </group>
                                                <ContactShadows position={[0, -4, 0]} opacity={0.6} scale={20} blur={2.5} far={4.5} />
                                                <OrbitControls enableZoom={false} autoRotate={activeTab === 0} autoRotateSpeed={0.5} makeDefault />
                                            </Suspense>
                                        </Canvas>
                                    </ThreeErrorBoundary>
                                )}

                                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-2">
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                    </span>
                                    <span className="text-[9px] font-black text-white uppercase tracking-widest">Compute Node Active</span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 flex flex-col items-center gap-4"
                >
                    <p className="text-slate-500 text-sm font-medium">See it live inside the platform</p>
                    <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 text-slate-950 font-black text-sm uppercase tracking-widest hover:-translate-y-1 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
                    >
                        Try It Free <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default VisualizationShowcase;
