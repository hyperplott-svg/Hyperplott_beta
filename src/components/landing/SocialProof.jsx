import React from 'react';
import { motion } from 'framer-motion';

const SocialProof = () => {
    const categories = [
        "Pharmaceutical Research",
        "Chemical Engineering",
        "Biotechnology Labs",
        "Academic Institutions",
        "Quality Control Teams",
        "Materials Science"
    ];

    return (
        <section className="py-20 bg-bg-primary border-y border-white/5">
            <div className="container mx-auto px-6 text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {[
                        { icon: "✓", text: "Validated Algorithms" },
                        { icon: "🔬", text: "Built by PhD Researchers" },
                        { icon: "🎓", text: "Industry-Standard Methods" },
                        { icon: "🔒", text: "Enterprise Security" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center gap-3 group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl text-emerald-500 shadow-lg group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors uppercase tracking-wider">
                                {item.text}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
