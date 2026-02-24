import React, { useRef, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import FeatureIcon3D from '../3d/FeatureIcon3D';
import ThreeErrorBoundary from '../common/ThreeErrorBoundary';
import { ChevronRight, Zap, Boxes, Activity, FlaskConical, Database, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
    const features = [
        {
            type: 'cube',
            color: "#7c3aed",
            icon: Boxes,
            title: "Factorial Designs",
            description: "Examine multiple factors simultaneously. AI-powered selection of full and fractional designs for rapid screening."
        },
        {
            type: 'surface',
            color: "#06b6d4",
            icon: Activity,
            title: "Response Surface",
            description: "Optimize your process with CCD and Box-Behnken designs to find the mathematically perfect setup."
        },
        {
            type: 'array',
            color: "#1e3a8a",
            icon: Zap,
            title: "Taguchi Methods",
            description: "Achieve robust quality with orthogonal arrays. Optimize processes to be insensitive to noise."
        },
        {
            type: 'mixture',
            color: "#7c3aed",
            icon: FlaskConical,
            title: "Mixture Designs",
            description: "Perfect your formulation. Handle component dependencies efficiently with Simplex-Lattice designs."
        },
        {
            type: 'chart',
            color: "#06b6d4",
            icon: Database,
            title: "Statistical Engine",
            description: "Instant ANOVA and regression analysis. No formal statistics training required.",
            badge: "Coming Soon"
        },
        {
            type: 'export',
            color: "#1e3a8a",
            icon: Globe,
            title: "Publication Ready",
            description: "Generate professional lab notebooks and high-resolution plots for regulatory submissions."
        },
    ];

    return (
        <section id="features" className="py-40 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-badge"
                    >
                        Intelligence Modules
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight"
                    >
                        Ready to Design <br /><span className="text-gradient">Better Experiments?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium"
                    >
                        Comprehensive suite of experimental design tools.
                        Engineered for researchers, validated for precision.
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="card-premium h-full group flex flex-col"
        >
            <Link to="/login" className="flex flex-col h-full w-full">
                {/* Visual Header */}
                <div className="relative w-full h-56 bg-slate-50 border-b border-slate-100 overflow-hidden">
                    {isInView && (
                        <ThreeErrorBoundary>
                            <Canvas dpr={[1, 2]}>
                                <Suspense fallback={null}>
                                    <PerspectiveCamera makeDefault position={[0, 0, 4]} />
                                    <Environment preset="city" />
                                    <ambientLight intensity={0.5} />
                                    <pointLight position={[10, 10, 10]} intensity={1.5} color={feature.color} />
                                    <Float speed={3} rotationIntensity={1.5} floatIntensity={1.2}>
                                        <FeatureIcon3D type={feature.type} color={feature.color} />
                                    </Float>
                                </Suspense>
                            </Canvas>
                        </ThreeErrorBoundary>
                    )}

                    {feature.badge && (
                        <div className="absolute top-4 right-4 px-2 py-1 rounded bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest">
                            {feature.badge}
                        </div>
                    )}
                </div>

                <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-primary-purple transition-colors uppercase">
                        {feature.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed font-medium mb-6 flex-grow">
                        {feature.description}
                    </p>

                    <div className="flex items-center gap-2 text-primary-purple font-black text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-500">
                        Learn More <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default Features;
