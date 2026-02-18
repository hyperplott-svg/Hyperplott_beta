import React from 'react';
import { motion } from 'framer-motion';
import { Target, FlaskConical, BarChart3 } from 'lucide-react';

const Workflow = () => {
    const steps = [
        {
            number: "01",
            title: "Define Factors",
            icon: <Target className="w-10 h-10" />,
            description: "Input your experimental factors and responses. Set constraints, ranges, and research targets effortlessly."
        },
        {
            number: "02",
            title: "Select Strategy",
            icon: <FlaskConical className="w-10 h-10" />,
            description: "Choose from CCD, BBD, or Factorial designs. AI suggests the optimal setup based on your research goals."
        },
        {
            number: "03",
            title: "Analyze & Optimize",
            icon: <BarChart3 className="w-10 h-10" />,
            description: "Run experiments, input results, and let AI fit the models. Discover precisely the best conditions for your process."
        }
    ];

    return (
        <section className="py-32 bg-bg-primary relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px]" />
            </div>
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-5 py-2 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-10 border border-emerald-500/20 backdrop-blur-md"
                    >
                        Scientific Implementation Loop
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-7xl font-black text-white font-display tracking-tight uppercase leading-[1.1]"
                    >
                        Streamlined <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Discovery Grid</span>.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xl text-slate-400 mt-8 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        From design architecture to publication-ready statistical insights.
                        A research-grade pipeline for the modern laboratory.
                    </motion.p>
                </div>

                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent hidden lg:block -translate-y-1/2 z-0" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative z-10 flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-[3rem] p-12 shadow-2xl hover:bg-white/[0.08] hover:border-emerald-500/30 transition-all duration-500 w-full max-w-[360px] group"
                        >
                            {/* Number Badge */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-[2rem] bg-emerald-500 flex items-center justify-center text-slate-950 text-3xl font-black shadow-xl shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                                {step.number}
                            </div>

                            <div className="text-emerald-500 mb-6 mt-4 group-hover:scale-110 transition-transform">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase underline decoration-emerald-500/20">{step.title}</h3>
                            <p className="text-slate-400 leading-relaxed font-medium">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Workflow;
