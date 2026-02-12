import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Zap, ArrowRight } from 'lucide-react';

const CTA = () => {
    return (
        <section className="py-40 relative overflow-hidden flex items-center justify-center bg-bg-primary">
            {/* Background Texture & Glows */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full" />
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                {/* Visual Anchor */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-[0.4em] mb-12 shadow-inner-glow backdrop-blur-md"
                >
                    <Zap className="w-4 h-4 text-accent-teal fill-accent-teal" />
                    Enter the Era of Statistical Intelligence
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none"
                >
                    Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent-pink">Innovate</span>?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-text-secondary mb-16 font-medium max-w-3xl mx-auto leading-relaxed opacity-80"
                >
                    Join thousands of elite researchers optimizing experimental design with hyper-compute power.
                    Shift from intuition-led trials to mathematically certain discovery.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16"
                >
                    <button className="group relative w-full sm:w-auto px-12 py-6 rounded-2xl bg-white text-bg-primary text-xl font-black overflow-hidden shadow-2xl transition-all hover:-translate-y-1 active:scale-95">
                        <span className="relative z-10 flex items-center gap-3">
                            Start Computing Free
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button className="w-full sm:w-auto px-12 py-6 rounded-2xl bg-white/5 border border-white/10 text-white text-xl font-black hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center gap-3 group">
                        <Calendar className="w-6 h-6 text-primary" />
                        Schedule Deep Dive
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-10 text-text-tertiary text-[10px] font-black uppercase tracking-[0.4em]"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-accent-teal" /> No Credit Card Required
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-accent-teal" /> Enterprise Ready
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-accent-teal" /> Cancel Anytime
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
