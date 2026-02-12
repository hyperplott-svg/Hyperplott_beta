import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            title: "Define Factors",
            description: "Enter your factors, levels, and constraints. Our AI suggests optimal factor ranges based on your research goals.",
            gradient: "from-primary to-indigo-500"
        },
        {
            number: "02",
            title: "Select Strategy",
            description: "Choose your DoE methodology. Hyperplott recommends the best design type based on your objectives and resources.",
            gradient: "from-indigo-500 to-secondary"
        },
        {
            number: "03",
            title: "Export & Lab",
            description: "Get your design matrix instantly. Export to Excel, run experiments, and analyze results with our statistical engine.",
            gradient: "from-secondary to-accent-pink"
        }
    ];

    return (
        <section id="how-it-works" className="py-40 bg-bg-primary relative overflow-hidden">
            {/* Atmosphere */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/2 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tight leading-[1.1]"
                    >
                        Three Steps to <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent-pink">Optimization</span>.
                    </motion.h2>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-16 md:gap-24 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[80px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-primary via-secondary to-accent-pink opacity-20 -z-0" />

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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="flex flex-col items-center text-center group relative z-10"
        >
            <div className={`w-40 h-40 rounded-[3rem] bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-5xl font-black shadow-glow mb-12 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 relative`}>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-[3rem]" />
                {step.number}
            </div>

            <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight group-hover:text-primary transition-colors">
                {step.title}
            </h3>

            <p className="text-lg text-text-secondary leading-relaxed max-w-xs mx-auto opacity-70">
                {step.description}
            </p>
        </motion.div>
    );
};

export default HowItWorks;
