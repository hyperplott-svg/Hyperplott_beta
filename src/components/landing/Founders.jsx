import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, GraduationCap, Quote } from 'lucide-react';

const Founders = () => {
    const team = [
        {
            name: "Shiva Kailash",
            role: "Founder & CEO",
            image: "/founder-shiva.png",
            bio: "Visionary researcher bridging complex statistics with intuitive tools. Leads the scientific mission of Hyperplott.",
            linkedin: "https://www.linkedin.com/in/madduluri-shiva-kailash-355166281/",
            degree: "Founder"
        },
        {
            name: "J Madhan",
            role: "Co-Founder & CTO",
            image: "/founder-madhan.jpg",
            bio: "Architect of AI systems and cloud optimization. Drives the algorithmic precision behind Hyperplott.",
            linkedin: "https://www.linkedin.com/in/jmadhan/",
            degree: "Tech Architect"
        }
    ];

    return (
        <section className="py-40 bg-bg-primary overflow-hidden relative" id="about">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-text-secondary text-[10px] font-black uppercase tracking-[0.4em] mb-12">
                                <GraduationCap className="w-4 h-4" />
                                Our Scientific Roots
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight uppercase mb-10">
                                Built by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Scientists</span>, <br /> For Scientists.
                            </h2>
                            <p className="text-xl text-text-secondary opacity-80 leading-relaxed mb-10 font-medium italic">
                                "We spent years struggling with expensive, complicated DoE software in the lab. After running 500+ experiments manually, we built Hyperplott - the tool we wish we had during our research."
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="h-[1px] w-20 bg-emerald-500/30" />
                                <span className="text-sm font-black uppercase tracking-widest text-text-muted">The Founding Story</span>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {team.map((founder, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="group relative"
                            >
                                <div className="aspect-square rounded-[40px] overflow-hidden bg-white/5 border border-white/10 mb-8 relative">
                                    <img
                                        src={founder.image}
                                        alt={founder.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60" />

                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex items-center justify-between">
                                            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                                                <GraduationCap className="w-5 h-5 text-white" />
                                            </div>
                                            <a
                                                href={founder.linkedin}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-3 rounded-xl bg-emerald-500 hover:bg-white hover:text-emerald-500 text-slate-950 transition-all duration-300"
                                            >
                                                <Linkedin className="w-5 h-5 shadow-sm" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">{founder.name}</h3>
                                <p className="text-emerald-500 text-xs font-black uppercase tracking-[0.2em] mb-4">{founder.role}</p>
                                <p className="text-sm text-text-secondary opacity-70 leading-relaxed line-clamp-3">
                                    {founder.bio}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Founders;
