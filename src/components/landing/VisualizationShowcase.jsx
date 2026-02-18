import React, { useState, Suspense, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Maximize2, Download, Terminal, Database, Presentation } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import ResponseSurface from '../3d/ResponseSurface';
import Pareto3D from '../3d/Pareto3D';
import MatrixGrid3D from '../3d/MatrixGrid3D';
import ThreeErrorBoundary from '../common/ThreeErrorBoundary';

const VisualizationShowcase = () => {
    const [activeTab, setActiveTab] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.1 });

    const plots = [
        {
            title: "Response Surface",
            label: "3D HIGH-FIDELITY",
            description: "Explore multi-factor interactions in immersive 3D space. Identify optimal process windows with absolute mathematical precision.",
            gradient: "from-blue-500 to-indigo-600"
        },
        {
            title: "Contour Mapping",
            label: "2D OVERLAY",
            description: "Detailed slices of your experimental domain. Visualize constraints and multi-response trade-offs in real-time.",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            title: "Sensitivity Engine",
            label: "PERTURBATION",
            description: "Identify high-impact factors at a glance. Our sensitivity engine clarifies which variables truly drive your success.",
            gradient: "from-cyan-500 to-teal-500"
        },
        {
            title: "Model Validation",
            label: "DIAGNOSTICS",
            description: "Rigorous actual-vs-predicted analysis and residual plotting ensures your results are publication-ready and robust.",
            gradient: "from-orange-500 to-red-600"
        }
    ];

    return (
        <section id="viz" className="py-40 bg-bg-primary relative overflow-hidden">
            {/* Structural Glows */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10"
                    >
                        <Presentation className="w-4 h-4 text-emerald-400" />
                        Scientific Visualization Suite
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-[1.1]"
                    >
                        Publication-Ready <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-primary to-accent-pink">Visualizations.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Interactive 3D plots and predictive diagnostics engineered for clarity and scientific rigor.
                    </motion.p>
                </div>

                <div className="space-y-16">
                    {/* Main Viewer - The "Lab" */}
                    <div className="relative rounded-[3rem] bg-slate-950 border border-white/10 p-4 md:p-8 shadow-2xl h-[500px] md:h-[750px] overflow-hidden group">
                        {/* Background Atmosphere */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05)_0%,transparent_100%)]" />
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3column%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: -20, scale: 0.98 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 1.02 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute inset-0 flex flex-col md:flex-row"
                            >
                                {/* Info Panel - Glassy */}
                                <div className="w-full md:w-1/3 flex flex-col justify-center p-12 relative z-10 text-left">
                                    <div className="mb-6">
                                        <span className={`inline-block px-3 py-1 rounded-md bg-gradient-to-br ${plots[activeTab].gradient} text-[10px] font-black text-white uppercase tracking-widest mb-4`}>
                                            {plots[activeTab].label}
                                        </span>
                                        <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                            {plots[activeTab].title}
                                        </h3>
                                        <p className="text-xl text-text-secondary font-medium leading-relaxed opacity-80">
                                            {plots[activeTab].description}
                                        </p>
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <button className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                            <Download className="w-4 h-4" /> Export PLT
                                        </button>
                                        <button className="p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                                            <Maximize2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                { /* Interactive 3D Canvas */}
                                <div className="w-full md:w-2/3 h-full relative" ref={ref}>
                                    {isInView && (
                                        <ThreeErrorBoundary>
                                            <Canvas dpr={[1, 2]} camera={{ position: [0, 5, 12], fov: 40 }}>
                                                <Suspense fallback={null}>
                                                    <Environment preset="night" />
                                                    <ambientLight intensity={0.3} />
                                                    <pointLight position={[10, 10, 10]} intensity={2} color="#6366F1" />
                                                    <pointLight position={[-10, -10, -10]} intensity={1} color="#C084FC" />

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

                                    {/* Engine Status Label */}
                                    <div className="absolute bottom-10 right-10 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3">
                                        <span className="flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-teal"></span>
                                        </span>
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Compute Node Active</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Thumbnails */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {plots.map((plot, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTab(i)}
                                className={`p-8 rounded-[2rem] border transition-all duration-500 text-left group relative overflow-hidden ${activeTab === i
                                    ? 'bg-white/5 border-primary shadow-glow scale-[1.02]'
                                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                                    }`}
                            >
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${plot.gradient} opacity-${activeTab === i ? '100' : '0'} transition-opacity`} />
                                <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10 w-fit group-hover:scale-110 transition-transform duration-500">
                                    <Database className={`w-5 h-5 ${activeTab === i ? 'text-primary' : 'text-text-tertiary'}`} />
                                </div>
                                <h4 className="text-xl font-black text-white mb-2 tracking-tight">{plot.title}</h4>
                                <span className={`text-[9px] font-black uppercase tracking-widest ${activeTab === i ? 'text-primary-purple' : 'text-text-tertiary'}`}>
                                    {plot.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-32 flex flex-col items-center">
                    <div className="w-12 h-px bg-white/20 mb-12" />
                    <button className="group relative px-10 py-5 rounded-2xl overflow-hidden shadow-2xl transition-all hover:-translate-y-1 active:scale-95">
                        <div className="absolute inset-0 bg-white text-bg-primary font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center">
                            Initialize Advanced Sandbox
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-primary transform translate-y-full group-hover:translate-y-0 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default VisualizationShowcase;
