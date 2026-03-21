import React from 'react';
import { motion } from 'framer-motion';

const FounderStory = () => {
    return (
        <section className="py-24 bg-bg-secondary relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Founder Cards */}
                    <div className="grid sm:grid-cols-2 gap-6 order-2 lg:order-1">
                        {/* Founder 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                            className="card-premium p-6 text-center"
                        >
                            <div className="w-24 h-24 rounded-full bg-primary-purple/10 border-4 border-primary-purple/20 overflow-hidden mb-4 mx-auto shadow-xl">
                                <img src="/founder-shiva.png" alt="Shiva Kailash" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 mb-0.5 uppercase tracking-tight">Shiva Kailash</h3>
                            <span className="text-primary-purple font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">PhD Researcher</span>
                            <div className="pt-4 border-t border-slate-100 flex justify-center gap-6">
                                <div className="text-center">
                                    <div className="text-lg font-black text-slate-900 leading-none">200+</div>
                                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Experiments</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-black text-slate-900 leading-none">5+</div>
                                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Years DoE</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Founder 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                            transition={{ delay: 0.1 }}
                            className="card-premium p-6 text-center"
                        >
                            <div className="w-24 h-24 rounded-full bg-accent-teal/10 border-4 border-accent-teal/20 overflow-hidden mb-4 mx-auto shadow-xl">
                                <img src="/founder-madhan.jpg" alt="J Madhan" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 mb-0.5 uppercase tracking-tight">J Madhan</h3>
                            <span className="text-accent-teal font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">Full Stack Developer</span>
                            <div className="pt-4 border-t border-slate-100 flex justify-center gap-6">
                                <div className="text-center">
                                    <div className="text-lg font-black text-slate-900 leading-none">3+</div>
                                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Years Dev</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-black text-slate-900 leading-none">10+</div>
                                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Projects</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Story Content */}
                    <div className="order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="section-badge">Our Story</div>
                            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                                Built by Researchers, <br />
                                <span className="text-gradient">For Researchers</span>.
                            </h2>
                            <blockquote className="text-lg text-slate-600 font-medium leading-relaxed mb-6 italic border-l-4 border-primary-purple pl-6">
                                "After years of struggling with legacy tools in the lab, we built Hyperplott — the tool we wish we had during our research."
                            </blockquote>
                            <p className="text-slate-500 leading-relaxed font-medium">
                                We founded Hyperplott to transform how researchers interact with complex statistical tools.
                                Our mission is to make advanced Design of Experiments accessible to every scientist,
                                regardless of their statistical background.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FounderStory;
