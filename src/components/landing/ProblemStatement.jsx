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
        <section className="py-40 bg-bg-primary relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#F8FAFC 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-sm"
                    >
                        <ShieldAlert className="w-4 h-4" />
                        The Challenge
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-[1.05]"
                    >
                        Why Traditional DoE <br /> <span className="text-red-500">Software Falls Short</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        Existing DoE tools are expensive, complicated, and outdated.
                        It's time for a modern alternative.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {problems.map((problem, i) => {
                        const Icon = problem.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 hover:border-red-500/20 hover:bg-red-500/[0.02] transition-all duration-500"
                            >
                                <div className="flex flex-col items-center text-center gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0 group-hover:scale-110 transition-transform">
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white mb-3 leading-tight uppercase tracking-tight group-hover:text-red-500 transition-colors">
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
