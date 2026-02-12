import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Hourglass, BarChart3, AlertTriangle, Layers, Clock } from 'lucide-react';

const ProblemStatement = () => {
    const problems = [
        {
            title: "Expertise Scarcity",
            icon: AlertTriangle,
            description: "Traditional statistical software requires deep formal expertise, creating massive analytical bottlenecks in modern R&D."
        },
        {
            title: "Time-Locked Pipelines",
            icon: Clock,
            description: "Manual design configurations and data reconciliation devour valuable cycles that should be dedicated to breakthrough science."
        },
        {
            title: "Visual Stagnation",
            icon: Layers,
            description: "Static, non-interactive plotting tools fail to reveal the complex multi-dimensional interactions hidden within your experimental data."
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
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-red-950/20 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-sm"
                    >
                        <ShieldAlert className="w-4 h-4" />
                        Analyzing structural bottlenecks
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none"
                    >
                        Legacy DOE Methods are <br /> <span className="text-red-500">Crippling</span> Innovation.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto font-medium opacity-80"
                    >
                        Traditional DOE architectures rely on outdated workflows that delay global discovery pipelines.
                        It's time to transition from trial-and-error to intelligent orchestration.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    {problems.map((problem, i) => {
                        const Icon = problem.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, ease: "easeOut" }}
                                className="group relative p-12 rounded-[40px] bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-700 shadow-2xl hover:-translate-y-3 flex flex-col items-start overflow-hidden"
                            >
                                {/* Card Glow Effect */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/5 blur-[40px] group-hover:bg-red-500/10 transition-colors" />

                                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-inner-glow">
                                    <Icon className="w-8 h-8" />
                                </div>

                                <h3 className="text-3xl font-black text-white mb-6 tracking-tight group-hover:text-red-500 transition-colors">
                                    {problem.title}
                                </h3>

                                <p className="text-text-secondary leading-relaxed font-medium text-lg opacity-80">
                                    {problem.description}
                                </p>

                                <div className="mt-10 h-1 w-0 bg-red-500 transition-all duration-700 group-hover:w-full" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
