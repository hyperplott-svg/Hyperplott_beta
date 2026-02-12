import React, { useRef, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import FeatureIcon3D from '../3d/FeatureIcon3D';
import { ChevronRight, Zap, Boxes, Activity, FlaskConical, Database, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
    const features = [
        {
            type: 'cube',
            color: "#6366F1",
            icon: Boxes,
            title: "Factorial Designs",
            description: "Examine multiple factors simultaneously. AI-powered selection of full and fractional designs for rapid screening."
        },
        {
            type: 'surface',
            color: "#C084FC",
            icon: Activity,
            title: "Response Surface",
            description: "Optimize your process with CCD and Box-Behnken designs to find the mathematically perfect setup."
        },
        {
            type: 'array',
            color: "#2DD4BF",
            icon: Zap,
            title: "Taguchi Methods",
            description: "Achieve robust quality with orthogonal arrays. Optimize processes to be insensitive to environmental noise."
        },
        {
            type: 'mixture',
            color: "#F472B6",
            icon: FlaskConical,
            title: "Mixture Designs",
            description: "Perfect your formulation. Handle component dependencies efficiently with Simplex-Lattice designs."
        },
        {
            type: 'chart',
            color: "#38BDF8",
            icon: Database,
            title: "Statistical Engine",
            description: "Instant ANOVA, regression analysis, and goodness-of-fit diagnostics. No formal statistics training required."
        },
        {
            type: 'export',
            color: "#FCD34D",
            icon: Globe,
            title: "Publication Ready",
            description: "Generate professional lab notebooks and high-resolution plots ready for publications and regulatory submissions."
        },
    ];

    return (
        <section id="features" className="py-40 bg-bg-primary relative overflow-hidden">
            {/* Focal Point Glows */}
            <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-primary/10 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-secondary/10 blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-purple text-[11px] font-black uppercase tracking-[0.4em] mb-12 shadow-inner-glow"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
                        Core Intelligence Modules
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none"
                    >
                        Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent-pink">Modules</span>.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-medium opacity-80"
                    >
                        The most comprehensive suite of experimental design tools ever built.
                        Engineered for speed, validated for clinical precision.
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ feature, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const Icon = feature.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col items-start p-1 bg-white/5 rounded-[40px] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-700 shadow-premium overflow-hidden cursor-pointer h-full"
        >
            <Link to="/signup" className="flex flex-col h-full w-full">
                {/* Visual Header */}
                <div className="relative w-full h-64 rounded-[36px] bg-slate-950 border border-white/5 overflow-hidden mb-8">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                    <Canvas dpr={[1, 2]}>
                        <Suspense fallback={null}>
                            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
                            <Environment preset="night" />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1.5} color={feature.color} />
                            <Float speed={3} rotationIntensity={1.5} floatIntensity={1.2}>
                                <FeatureIcon3D type={feature.type} color={feature.color} />
                            </Float>
                        </Suspense>
                    </Canvas>

                    {/* Micro-label on Card Visual */}
                    <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                        <Icon className="w-3 h-3 text-white" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">{feature.type}</span>
                    </div>
                </div>

                <div className="px-8 pb-10 flex flex-col h-full">
                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight group-hover:text-primary transition-colors uppercase">
                        {feature.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed text-lg font-medium opacity-80 mb-8 flex-grow">
                        {feature.description}
                    </p>

                    <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-500">
                        Explore Intelligence <ChevronRight className="w-4 h-4 text-primary" />
                    </div>
                </div>
            </Link>

            {/* Glowing Aura on Hover */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>
    );
};

export default Features;
