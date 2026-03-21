import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Percent, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        desc: "Join our Slack and shape the product roadmap."
    },
    {
        icon: Trophy,
        title: "Founding Member Badge",
        desc: "Recognition as a pioneer on our platform."
    }
];

const BetaProgram = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
                <div className="rounded-3xl bg-gradient-to-br from-primary-purple to-primary p-8 md:p-14 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-teal/20 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-black uppercase tracking-widest mb-6"
                        >
                            Founding Member Program
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-black mb-6 tracking-tight"
                        >
                            Early Access is <span className="underline decoration-accent-teal decoration-4 underline-offset-8">Now Live</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-white/80 font-medium mb-10 max-w-2xl mx-auto leading-relaxed"
                        >
                            We're looking for researchers to help shape the future of DoE.
                            Join the first 100 users and get exclusive founding member benefits.
                        </motion.p>

                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            {benefits.map((benefit, i) => {
                                const Icon = benefit.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + i * 0.08 }}
                                        className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm text-left"
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                                            <Icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="text-sm font-black uppercase tracking-tight leading-tight mb-1">{benefit.title}</div>
                                        <div className="text-[11px] text-white/70 font-medium leading-snug">{benefit.desc}</div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="flex flex-col items-center gap-5">
                            <Link
                                to="/signup"
                                className="px-10 py-4 rounded-2xl bg-white text-primary-purple text-base font-black uppercase tracking-widest hover:scale-105 hover:-translate-y-1 transition-all shadow-xl"
                            >
                                Join Beta Now
                            </Link>
                            <div className="flex items-center gap-3">
                                <div className="w-40 h-2 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '42%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                                        className="h-full bg-white rounded-full"
                                    />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">42/100 spots filled</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BetaProgram;
