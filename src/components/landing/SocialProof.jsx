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
                <p className="text-[12px] font-black uppercase tracking-[0.4em] text-text-secondary/50 mb-12">
                    Orchestrating precision for professionals in:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20 opacity-30 group">
                    {categories.map((cat, i) => (
                        <motion.span
                            key={i}
                            className="text-lg md:text-xl font-bold text-white tracking-tight hover:opacity-100 transition-opacity whitespace-nowrap"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            {cat}
                        </motion.span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
