import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            title: "Define Factors",
            description: "Enter your factors, levels, and constraints. Our AI suggests optimal factor ranges based on your research goals.",
            gradient: "from-blue-500 to-indigo-500"
        },
        {
            number: "02",
            title: "Select Strategy",
            description: "Choose your DoE methodology. Hyperplott recommends the best design type based on your objectives and resources.",
            gradient: "from-indigo-500 to-purple-500"
        },
        {
            number: "03",
            title: "Export & Lab",
            description: "Get your design matrix instantly. Export to Excel, run experiments, and analyze results with our statistical engine.",
            gradient: "from-purple-500 to-pink-500"
        }
    ];

    return (
        <section id="how-it-works" className="py-32 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]"
                    >
                        Three Steps to <span className="underline decoration-4 decoration-accent underline-offset-8">Optimization</span>
                    </motion.h2>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 border-t-2 border-dashed border-slate-300 -z-10" />

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
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col items-center text-center group"
        >
            <div className={`w-32 h-32 rounded-[2.5rem] bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-primary/20 mb-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 relative`}>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-[2.5rem]" />
                {step.number}
            </div>

            <h3 className="text-3xl font-bold text-slate-900 mb-6 group-hover:text-primary transition-colors">
                {step.title}
            </h3>

            <p className="text-lg text-slate-500 leading-relaxed max-w-xs mx-auto">
                {step.description}
            </p>
        </motion.div>
    );
};

export default HowItWorks;
