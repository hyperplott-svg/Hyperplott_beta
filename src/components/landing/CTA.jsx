import React from 'react';
import { motion } from 'framer-motion';
import { Play, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-40 relative overflow-hidden flex items-center justify-center bg-bg-dark">
            <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter"
                >
                    Ready to Design <br /> Better <span className="text-gradient">Experiments?</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-slate-400 mb-12 font-medium max-w-2xl mx-auto leading-relaxed"
                >
                    Join researchers who are tired of expensive, complicated DoE software.
                    Start your free trial today.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <Link to="/login" className="btn-primary w-full sm:w-auto px-12 py-5 text-xl">
                        Enter Lab
                        <ArrowRight className="w-6 h-6" />
                    </Link>

                    <button className="btn-secondary w-full sm:w-auto px-12 py-5 text-xl !bg-white/5 !text-white !border-white/10 hover:!bg-white/10 transition-all backdrop-blur-md flex items-center justify-center gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-primary-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-4 h-4 text-primary-purple fill-current" />
                        </div>
                        Watch Demo
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-8 text-slate-500 text-[10px] font-black uppercase tracking-widest"
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
