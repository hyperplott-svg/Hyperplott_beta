import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-24 relative overflow-hidden flex items-center justify-center bg-bg-secondary">
            {/* Background atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-purple/8 blur-[120px]" />
                <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />
                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-accent-teal/5 blur-[80px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-purple/10 border border-primary-purple/20 text-primary-purple text-[10px] font-black uppercase tracking-[0.3em] mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-primary-purple animate-pulse" />
                    Beta Access Open
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter"
                >
                    Ready to Design <br /> Better <span className="text-gradient">Experiments?</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-slate-500 mb-10 font-medium max-w-2xl mx-auto leading-relaxed"
                >
                    Join researchers who are tired of expensive, complicated DoE software.
                    Access our public beta and start optimizing today.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                >
                    <Link to="/signup" className="btn-primary w-full sm:w-auto px-10 py-4 text-base sm:text-lg flex items-center justify-center gap-2">
                        Build Your Lab
                        <ArrowRight className="w-5 h-5" />
                    </Link>

                    <button className="w-full sm:w-auto px-10 py-4 text-base sm:text-lg rounded-xl font-black bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3 group shadow-sm">
                        <div className="w-7 h-7 rounded-full bg-primary-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-3.5 h-3.5 text-primary-purple fill-current" />
                        </div>
                        Watch Demo
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-slate-400 text-[10px] font-black uppercase tracking-widest"
                >
                    <span>✓ Public Beta Access</span>
                    <span>✓ No Registration Required</span>
                    <span>✓ Instant Optimization</span>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
