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

    return (
        <section id="how-it-works" className="py-40 bg-bg-secondary relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-32">
                    <div className="section-badge">Workflow</div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">
                        Three Steps to <br /> <span className="text-gradient">Optimization.</span>
                    </h2>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-slate-200 -z-0" />

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
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="flex flex-col items-center text-center group relative z-10"
        >
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-4xl font-black shadow-xl mb-10 group-hover:scale-110 transition-all duration-500 relative`}>
                {step.number}
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight group-hover:text-primary-purple transition-colors">
                {step.title}
            </h3>

            <p className="text-slate-500 font-medium max-w-xs mx-auto">
                {step.description}
            </p>
        </motion.div>
    );
};

export default HowItWorks;
