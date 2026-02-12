import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, GraduationCap, Microscope, ArrowUpRight } from 'lucide-react';

const Validation = () => {
    const data = [
        {
            icon: BookOpen,
            title: "Industry-Standard Methods",
            desc: "Implements Box-Wilson CCD, Taguchi Arrays, and Response Surface Methodology used by researchers worldwide."
        },
        {
            icon: CheckCircle,
            title: "Validated Algorithms",
            desc: "Our statistical engines produce identical results to Minitab and Design-Expert. Rigorously tested."
        },
        {
            icon: GraduationCap,
            title: "Built by Researchers",
            desc: "Developed by PhD researchers with 100+ published experiments and years of DoE teaching experience."
        },
        {
            icon: Microscope,
            title: "Used in Real Research",
            desc: "Battle-tested on actual research projects before public launch. It works because we use it ourselves."
        }
    ];

    return (
        <section className="py-40 bg-bg-primary relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]"
                    >
                        Proven Methodology, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent-pink">Modern Interface</span>.
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {data.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary-purple mb-8 group-hover:scale-110 transition-transform shadow-inner-glow">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                            <p className="text-text-secondary text-lg leading-relaxed opacity-70">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-12 border-t border-white/5 pt-20">
                    <a href="#" className="flex items-center gap-2 text-primary-purple font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                        Read Technical Documentation <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <a href="#" className="flex items-center gap-2 text-primary-purple font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                        See Validation Report <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Validation;
