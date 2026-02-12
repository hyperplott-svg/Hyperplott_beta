import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, DollarSign, BrainCircuit, HelpCircle, Layers } from 'lucide-react';

const ProblemStatement = () => {
    const problems = [
        {
            title: "Prohibitive Costs",
            icon: DollarSign,
            description: "Industrial software like Minitab and JMP can cost over ₹50,000 per year, making high-level DoE inaccessible to many."
        },
        {
            title: "Steep Learning Curve",
            icon: BrainCircuit,
            description: "Traditional statistical tools take weeks to master. Researchers shouldn't need a PhD in statistics just to design an experiment."
        },
        {
            title: "Static Narratives",
            icon: Layers,
            description: "Old-school software provides static, non-interactive charts. You're left guessing about complex multi-dimensional factor interactions."
        },
        {
            title: "Zero Intelligence",
            icon: HelpCircle,
            description: "Most tools are just calculators. They offer no AI guidance on factor selection, level optimization, or strategic next steps."
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
                        Analyzing the R&D Bottlenecks
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none"
                    >
                        Why Researchers Struggle with <br /> <span className="text-red-500">Traditional</span> DoE.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto font-medium opacity-80"
                    >
                        Outdated software and complex methodologies are slowing down scientific discovery.
                        Hyperplott removes the barriers between you and your breakthroughs.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {problems.map((problem, i) => {
                        const Icon = problem.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, ease: "easeOut" }}
                                className="group relative p-10 rounded-[40px] bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-700 shadow-2xl flex flex-col items-start overflow-hidden"
                            >
                                {/* Card Glow Effect */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/5 blur-[40px] group-hover:bg-red-500/10 transition-colors" />

                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-inner-glow">
                                    <Icon className="w-7 h-7" />
                                </div>

                                <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-red-500 transition-colors leading-tight">
                                    {problem.title}
                                </h3>

                                <p className="text-text-secondary leading-relaxed font-medium text-base opacity-70">
                                    {problem.description}
                                </p>

                                <div className="mt-8 h-1 w-0 bg-red-500 transition-all duration-700 group-hover:w-full" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
