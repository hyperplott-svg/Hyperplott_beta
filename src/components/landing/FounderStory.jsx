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
                        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]"
                    >
                        Built by Researchers, <br />
                        <span className="text-secondary">For Researchers</span>.
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-24 max-w-6xl mx-auto">
                    {/* Founder 1 */}
                    <div className="group p-px rounded-[3rem] bg-gradient-to-br from-primary/20 via-transparent to-transparent">
                        <div className="bg-slate-950 p-10 rounded-[2.9rem] h-full flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-[2rem] bg-indigo-500/10 border border-primary/20 overflow-hidden mb-6 shadow-glow relative">
                                <img src="/founder-shiva.png" alt="Shiva Kailash" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">Shiva Kailash</h3>
                            <a href="https://www.linkedin.com/in/madduluri-shiva-kailash-355166281/" target="_blank" rel="noreferrer" className="text-primary-purple font-black uppercase tracking-[0.3em] text-[10px] mb-6 hover:underline">Founder</a>
                            <p className="text-text-secondary text-base leading-relaxed opacity-70 font-medium">
                                Visionary researcher leading scientific mission. Shiva founded Hyperplott to transform how researchers interact with complex statistical tools.
                            </p>
                        </div>
                    </div>

                    {/* Founder 2 */}
                    <div className="group p-px rounded-[3rem] bg-gradient-to-br from-secondary/20 via-transparent to-transparent">
                        <div className="bg-slate-950 p-10 rounded-[2.9rem] h-full flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-[2rem] bg-purple-500/10 border border-secondary/20 overflow-hidden mb-6 shadow-glow relative">
                                <img src="/founder-madhan.jpg" alt="J Madhan" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">J Madhan</h3>
                            <a href="https://www.linkedin.com/in/jmadhan/" target="_blank" rel="noreferrer" className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] mb-6 hover:underline">Co-Founder</a>
                            <p className="text-text-secondary text-base leading-relaxed opacity-70 font-medium">
                                Technical architect driving the AI engine. Madhan specializes in high-fidelity optimization and large-scale computing architectures.
                            </p>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-4xl mx-auto p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative"
                >
                    <p className="text-xl md:text-2xl text-white font-bold leading-relaxed text-center relative z-10 opacity-90">
                        "After years of struggling with legacy tools in the lab, we built Hyperplott — the tool we wish we had during our research."
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FounderStory;
