import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
    return (
        <section className="py-40 bg-bg-primary overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full max-w-5xl bg-gradient-to-br from-white/[0.05] to-transparent rounded-[3rem] border border-white/10 p-12 md:p-24 shadow-2xl relative overflow-hidden"
                    >
                        {/* Atmosphere decoration */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-inner-glow"
                            >
                                <Star className="w-4 h-4 text-accent-pink fill-accent-pink animate-pulse" />
                                Exclusive Beta Access
                            </motion.div>

                            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter uppercase mb-10">
                                Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent-pink">Founding Researcher</span>.
                            </h2>

                            <p className="text-xl md:text-2xl font-medium text-text-secondary mb-16 leading-relaxed max-w-3xl opacity-80">
                                We're opening 50 exclusive spots for our founding member program. Help us shape the future of DoE and receive lifetime benefits.
                            </p>

                            <div className="grid md:grid-cols-3 gap-8 w-full mb-16">
                                {[
                                    { title: "Free Beta", desc: "Full access for 6 months" },
                                    { title: "Lifetime Discount", desc: "50% off forever" },
                                    { title: "Direct Input", desc: "Shape the product roadmap" }
                                ].map((benefit, i) => (
                                    <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/5 text-center transition-all hover:bg-white/10">
                                        <h4 className="text-xl font-bold text-white mb-2">{benefit.title}</h4>
                                        <p className="text-sm text-text-secondary opacity-60 font-bold uppercase tracking-widest">{benefit.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <button className="px-12 py-5 rounded-2xl bg-white text-bg-primary text-sm font-black uppercase tracking-widest hover:scale-105 transition-all shadow-glow">
                                    Apply for Beta Access
                                </button>
                                <span className="text-text-tertiary text-xs font-black uppercase tracking-widest">
                                    ⏰ 23 spots remaining
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
