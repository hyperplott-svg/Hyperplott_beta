import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { DollarSign, BrainCircuit, Layers } from 'lucide-react';

const problems = [
    {
        title: "Too Expensive",
        icon: DollarSign,
        stat: "₹50k+",
        statLabel: "per year",
        description: "Traditional software costs ₹50,000+/year per license, putting it out of reach for most researchers and students."
    },
    {
        title: "Steep Learning Curve",
        icon: BrainCircuit,
        stat: "3+ weeks",
        statLabel: "to get started",
        description: "Complex interfaces require weeks of training and deep statistical expertise just to run a basic design."
    },
    {
        title: "Static Visualizations",
        icon: Layers,
        stat: "2D only",
        statLabel: "no interaction",
        description: "Flat 2D plots fail to reveal complex multi-dimensional factor interactions hiding in your data."
    }
];

const ProblemCard = ({ problem, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const Icon = problem.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            className="card-premium p-8 flex flex-col gap-6"
        >
            <div className="flex items-start justify-between">
                <motion.div
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className="w-14 h-14 rounded-2xl bg-primary-purple/10 flex items-center justify-center text-primary-purple shrink-0"
                >
                    <Icon className="w-7 h-7" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                    transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
                    className="text-right"
                >
                    <p className="text-2xl font-black text-slate-900 leading-none">{problem.stat}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{problem.statLabel}</p>
                </motion.div>
            </div>

            <div>
                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight uppercase">
                    {problem.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium text-sm">
                    {problem.description}
                </p>
            </div>
        </motion.div>
    );
};

const ProblemStatement = () => {
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <section className="py-24 bg-bg-secondary relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                <div ref={headerRef} className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                        transition={{ duration: 0.5 }}
                        className="section-badge"
                    >
                        The Challenge
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter"
                    >
                        Why Traditional DoE <br className="hidden sm:block" /> <span className="text-gradient">Software Falls Short</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium"
                    >
                        Existing DoE tools are expensive, complicated, and outdated.
                        We built a modern alternative for researchers who want results, not headaches.
                    </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {problems.map((problem, i) => (
                        <ProblemCard key={i} problem={problem} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
