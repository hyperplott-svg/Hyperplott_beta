import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Stats = () => {
    const stats = [
        { value: "50,000+", label: "Designs Created", color: "text-primary" },
        { value: "99.5%", label: "Statistical Accuracy", color: "text-secondary" },
        { value: "5,000+", label: "Active Researchers", color: "text-accent" },
        { value: "15m", label: "Saved per Experiment", color: "text-slate-900" }
    ];

    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-slate-200/50">
                    {stats.map((stat, index) => (
                        <StatItem key={index} stat={stat} index={index} />
                    ))}
                </div>
            </div>
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </section>
    );
};

const StatItem = ({ stat, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center p-4 pl-8 first:pl-4 md:pl-0"
        >
            <h3 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-2 tracking-tight ${stat.color}`}>
                {stat.value}
            </h3>
            <p className="text-sm md:text-base font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
            </p>
        </motion.div>
    );
};

export default Stats;
