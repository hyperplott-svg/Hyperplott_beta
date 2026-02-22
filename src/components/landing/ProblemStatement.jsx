import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, DollarSign, BrainCircuit, HelpCircle, Layers } from 'lucide-react';

const ProblemStatement = () => {
    const problems = [
        {
            title: "Too Expensive",
            icon: DollarSign,
            description: "Traditional software costs ₹50,000+/year per license, putting it out of reach for many researchers."
        },
        {
            title: "Steep Learning Curve",
            icon: BrainCircuit,
            description: "Complex interfaces require weeks of training and deep statistical expertise to use effectively."
        },
        {
            title: "Static Visualizations",
            icon: Layers,
            description: "2D plots and static outputs fail to reveal complex multi-dimensional interactions in your data."
        }
    ];

    return (
        <section className="py-40 bg-bg-secondary relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="section-badge"
                    >
                        The Challenge
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter"
                    >
                        Why Traditional DoE <br /> <span className="text-gradient">Software Falls Short</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium"
                    >
                        Existing DoE tools are expensive, complicated, and outdated. 
                        We built a modern alternative for researchers who want results, not headaches.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {problems.map((problem, i) => {
                        const Icon = problem.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="card-premium p-8"
                            >
                                <div className="flex flex-col gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-primary-purple/10 flex items-center justify-center text-primary-purple shrink-0">
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight uppercase">
                                            {problem.title}
                                        </h3>
                                        <p className="text-slate-500 leading-relaxed font-medium text-sm">
                                            {problem.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
