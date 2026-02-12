import React from 'react';
import { motion } from 'framer-motion';

const FounderStory = () => {
    return (
        <section className="py-40 bg-bg-primary relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
                    >
                        Built by Researchers, <br />
                        <span className="text-primary-purple">For Researchers</span>.
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-24">
                    {/* Founder 1 */}
                    <div className="p-1 rounded-[4rem] bg-gradient-to-br from-primary/20 to-transparent">
                        <div className="bg-slate-950 p-12 rounded-[3.8rem] h-full flex flex-col items-center text-center">
                            <div className="w-40 h-40 rounded-[2.5rem] bg-indigo-500/20 border-2 border-primary/30 overflow-hidden mb-8 shadow-glow group">
                                <img src="/founder-shiva.jpg" alt="Shiva Kailash" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-2">Shiva Kailash</h3>
                            <a href="https://www.linkedin.com/in/madduluri-shiva-kailash-355166281/" target="_blank" rel="noreferrer" className="text-primary-purple font-black uppercase tracking-[0.2em] text-xs mb-8 hover:underline">Founder</a>
                            <p className="text-text-secondary text-lg leading-relaxed opacity-80">
                                Visionary researcher dedicated to bridging the gap between complex statistical theories
                                and intuitive laboratory tools. Shiva leads the strategic direction of Hyperplott's
                                scientific mission.
                            </p>
                        </div>
                    </div>

                    {/* Founder 2 */}
                    <div className="p-1 rounded-[4rem] bg-gradient-to-br from-secondary/20 to-transparent">
                        <div className="bg-slate-950 p-12 rounded-[3.8rem] h-full flex flex-col items-center text-center">
                            <div className="w-40 h-40 rounded-[2.5rem] bg-purple-500/20 border-2 border-secondary/30 overflow-hidden mb-8 shadow-glow group">
                                <img src="/founder-madhan.jpg" alt="J Madhan" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-2">J Madhan</h3>
                            <a href="https://www.linkedin.com/in/jmadhan/" target="_blank" rel="noreferrer" className="text-secondary font-black uppercase tracking-[0.2em] text-xs mb-8 hover:underline">Co-Founder</a>
                            <p className="text-text-secondary text-lg leading-relaxed opacity-80">
                                Technical architect specializing in AI-driven optimization and high-fidelity cloud computing.
                                Madhan drives the engineering excellence and algorithmic precision behind
                                the Hyperplott engine.
                            </p>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-white/[0.03] border border-white/5 relative"
                >
                    <div className="absolute -top-10 -left-10 text-8xl text-primary opacity-10 font-serif">"</div>
                    <p className="text-2xl md:text-3xl text-white font-medium italic leading-relaxed text-center relative z-10">
                        "After running 200+ experiments and teaching DoE to students,
                        we realized existing tools were too expensive and complicated.
                        So we built Hyperplott — the tool we wish we had."
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FounderStory;
