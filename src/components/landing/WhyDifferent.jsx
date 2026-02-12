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
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]"
                    >
                        Why <span className="text-primary-purple">Hyperplott</span>?
                    </motion.h2>
                    <p className="text-text-secondary text-xl opacity-70">The modern alternative to legacy statistical software.</p>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm shadow-premium max-w-4xl mx-auto">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 uppercase tracking-[0.2em] text-[9px] font-black text-text-muted">
                                    <th className="px-4 md:px-6 py-6 border-r border-white/5">Metric</th>
                                    <th className="px-4 md:px-6 py-6 border-r border-white/5">Traditional Softwares</th>
                                    <th className="px-4 md:px-6 py-6 text-primary-purple">Hyperplott AI</th>
                                </tr>
                            </thead>
                            <tbody className="text-white/80">
                                {comparison.map((item, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors group">
                                        <td className="px-4 md:px-6 py-5 font-bold text-[10px] md:text-[11px] uppercase tracking-wider text-text-tertiary border-r border-white/5">{item.feature}</td>
                                        <td className="px-6 py-6 text-base font-medium opacity-50 group-hover:opacity-80 transition-opacity">{item.traditional}</td>
                                        <td className="px-6 py-6 text-base font-black text-primary-purple bg-primary-purple/[0.02]">
                                            {item.hyperplott}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyDifferent;
