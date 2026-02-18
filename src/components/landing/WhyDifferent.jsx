import React from 'react';
import { motion } from 'framer-motion';

const WhyDifferent = () => {
    const comparison = [
        { feature: "Cost", traditional: "₹50,000+/year", hyperplott: "₹499/month" },
        { feature: "Learning Curve", traditional: "Weeks of training", hyperplott: "Start in 5 minutes" },
        { feature: "Visualizations", traditional: "Static 2D plots", hyperplott: "Interactive 3D" },
        { feature: "AI Guidance", traditional: "None", hyperplott: "Built-in AI assistant" },
        { feature: "Cloud Access", traditional: "Desktop only", hyperplott: "Anywhere, any device" },
    ];

    return (
        <section className="py-32 bg-bg-primary relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-[0.4em] mb-8"
                    >
                        Precision Comparison
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]"
                    >
                        Legacy Bottlenecks vs. <br /><span className="text-emerald-500">Modern Velocity.</span>
                    </motion.h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-3">
                    {comparison.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group flex flex-col md:flex-row items-stretch rounded-[1.5rem] overflow-hidden border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500"
                        >
                            <div className="w-full md:w-1/4 p-6 bg-white/[0.02] border-r border-white/5 flex items-center">
                                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-500">{item.feature}</span>
                            </div>
                            <div className="flex-1 p-6 flex items-center opacity-40 group-hover:opacity-60 transition-opacity italic">
                                <span className="text-xs sm:text-sm font-medium text-white">{item.traditional}</span>
                            </div>
                            <div className="flex-1 p-6 bg-emerald-500/5 flex items-center">
                                <span className="text-sm sm:text-base font-black text-emerald-400 flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                                    {item.hyperplott}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyDifferent;
