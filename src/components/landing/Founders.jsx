import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, GraduationCap } from 'lucide-react';

const Founders = () => {
    const team = [
        {
            name: "Shiva Kailash",
            role: "Founder & CEO",
            image: "/founder-shiva.png",
            bio: "Visionary researcher bridging complex statistics with intuitive tools. Leads the scientific mission of Hyperplott.",
            linkedin: "https://www.linkedin.com/in/madduluri-shiva-kailash-355166281/",
        },
        {
            name: "J Madhan",
            role: "Co-Founder & CTO",
            image: "/founder-madhan.jpg",
            bio: "Architect of AI systems and cloud optimization. Drives the algorithmic precision behind Hyperplott.",
            linkedin: "https://www.linkedin.com/in/jmadhan/",
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden relative" id="about">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary-purple/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Story Side */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-purple/10 border border-primary-purple/20 text-primary-purple text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                <GraduationCap className="w-3.5 h-3.5" />
                                Our Scientific Roots
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
                                Built by <span className="text-gradient">Scientists</span>,<br /> For Scientists.
                            </h2>
                            <p className="text-lg text-slate-500 leading-relaxed mb-8 font-medium italic border-l-4 border-primary-purple/30 pl-6">
                                "We spent years struggling with expensive, complicated DoE software in the lab. After running 500+ experiments manually, we built Hyperplott — the tool we wish we had during our research."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="h-[1px] w-16 bg-primary-purple/20" />
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">The Founding Story</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Founder Cards */}
                    <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {team.map((founder, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                                className="group relative"
                            >
                                <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 mb-5 relative">
                                    <img
                                        src={founder.image}
                                        alt={founder.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="flex items-center justify-between">
                                            <div className="p-2 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm">
                                                <GraduationCap className="w-4 h-4 text-primary-purple" />
                                            </div>
                                            <a
                                                href={founder.linkedin}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2.5 rounded-xl bg-primary-purple text-white hover:bg-primary transition-all duration-300 shadow-lg"
                                            >
                                                <Linkedin className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-black text-slate-900 mb-1 uppercase tracking-tight">{founder.name}</h3>
                                <p className="text-primary-purple text-[10px] font-black uppercase tracking-[0.2em] mb-3">{founder.role}</p>
                                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 font-medium">
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
