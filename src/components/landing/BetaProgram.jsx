import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Percent, Users, Trophy } from 'lucide-react';

const BetaProgram = () => {
    const benefits = [
        {
            icon: Gift,
            title: "6 Months Free",
            desc: "Full access to all features during your research period."
        },
        {
            icon: Percent,
            title: "50% Lifetime Discount",
            desc: "Lock in our special beta pricing forever."
        },
        {
            icon: Users,
            title: "Direct Founder Access",
            desc: "Join our slack and shape the product roadmap."
        },
        {
            icon: Trophy,
            title: "Founding Member Badge",
            desc: "Recognition as a pioneer on our platform."
        }
    ];

    return (
        <section className="py-40 bg-bg-primary relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-accent-pink/20 border border-accent-pink/30 text-accent-pink text-[11px] font-black uppercase tracking-[0.4em] mb-12 shadow-sm"
                >
                    <Trophy className="w-4 h-4" />
                    Founding Member Program
                </motion.div>

                <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tight leading-[1.1]">
                    Be Among the First <br /> <span className="text-accent-pink text-3xl md:text-6xl lg:text-7xl">100 Researchers</span>.
                </h2>

                <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-medium opacity-80 mb-24">
                    We're looking for 100 dedicated researchers to join our founding
                    member program and help shape the future of scientific optimization.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 hover:border-accent-pink/30 hover:bg-white/[0.05] transition-all duration-500 text-center group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent-pink mx-auto mb-8 group-hover:scale-110 transition-transform">
                                <benefit.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{benefit.title}</h3>
                            <p className="text-text-secondary text-base opacity-70">{benefit.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-6">
                    <button className="px-12 py-6 rounded-2xl bg-accent-pink text-white text-xl font-black hover:scale-105 transition-transform shadow-lg shadow-accent-pink/20">
                        Apply for Beta Access
                    </button>
                    <p className="text-text-secondary font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
                        ⏰ 37 spots remaining
                    </p>
                </div>

                <div className="mt-24 max-w-3xl mx-auto p-12 rounded-[3.5rem] bg-slate-950/50 border border-white/5 text-left">
                    <h4 className="text-white text-xl font-black mb-8 uppercase tracking-widest">Requirements:</h4>
                    <ul className="space-y-6">
                        {[
                            "Active researcher, student, or industry professional",
                            "Willing to provide feedback on core engine features",
                            "Run at least 2 experimental designs during beta period"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 text-text-secondary font-medium">
                                <div className="w-2 h-2 rounded-full bg-accent-pink shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default BetaProgram;
