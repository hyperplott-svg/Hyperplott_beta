import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            title: "Define Factors",
            description: "Enter your factors, levels, and constraints. Our AI suggests optimal factor ranges based on your research goals.",
            gradient: "from-primary-purple to-primary"
        },
        {
            number: "02",
            title: "Select Strategy",
            description: "Choose your DoE methodology. Hyperplott recommends the best design type based on your objectives and resources.",
            gradient: "from-primary to-accent-teal"
        },
        {
            number: "03",
            title: "Export & Lab",
            description: "Get your design matrix instantly. Export to Excel, run experiments, and analyze results with our statistical engine.",
            gradient: "from-accent-teal to-primary-purple"
        }
    ];

    const lineRef = useRef(null);
    const lineInView = useInView(lineRef, { once: true, margin: "-100px" });

    return (
        <section id="how-it-works" className="py-24 bg-bg-secondary relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="section-badge"
                    >
                        Workflow
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter"
                    >
                        Three Steps to <br className="hidden sm:block" /> <span className="text-gradient">Optimization.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-500 max-w-xl mx-auto font-medium"
                    >
                        From idea to design matrix in minutes — no statistics PhD required.
                    </motion.p>
                </div>

                {/* Steps */}
                <div ref={lineRef} className="grid md:grid-cols-3 gap-10 sm:gap-12 relative">
                    {/* Animated Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[56px] left-[16%] right-[16%] h-[2px] bg-slate-100 overflow-hidden">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{ originX: 0 }}
                            className="w-full h-full bg-gradient-to-r from-primary-purple via-primary to-accent-teal"
                        />
                    </div>

                    {steps.map((step, index) => (
                        <StepCard key={index} step={step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const StepCard = ({ step, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.7, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center group relative z-10"
        >
            <div className="relative mb-8">
                {/* Pulsing ring behind circle */}
                <motion.div
                    animate={isInView ? {
                        scale: [1, 1.15, 1],
                        opacity: [0.2, 0.5, 0.2],
                    } : {}}
                    transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }}
                    className={`absolute inset-[-6px] rounded-full bg-gradient-to-br ${step.gradient} blur-sm`}
                />
                <motion.div
                    animate={isInView ? { scale: [0.85, 1.06, 1] } : { scale: 0.85 }}
                    transition={{ duration: 0.7, delay: index * 0.18 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 400 } }}
                    className={`w-28 h-28 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-3xl font-black shadow-xl relative`}
                >
                    {step.number}
                </motion.div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight group-hover:text-primary-purple transition-colors duration-300">
                {step.title}
            </h3>

            <p className="text-slate-500 font-medium max-w-xs mx-auto text-sm sm:text-base leading-relaxed">
                {step.description}
            </p>
        </motion.div>
    );
};

export default HowItWorks;
