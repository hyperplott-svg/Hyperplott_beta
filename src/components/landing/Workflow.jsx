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
        <section className="py-32 bg-gradient-to-b from-bg-secondary to-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1 bg-indigo-50 text-primary-purple text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 border border-indigo-100"
                    >
                        Protocol Implementation
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 font-display tracking-tight uppercase leading-[1.1]"
                    >
                        Streamlined <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-purple to-secondary">Discovery Grid</span>.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xl text-slate-500 mt-8 font-semibold max-w-2xl mx-auto leading-relaxed"
                    >
                        From design architecture to publication-ready statistical insights.
                        A high-fidelity pipeline for the modern researcher.
                    </motion.p>
                </div>

                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-100 to-transparent hidden lg:block -translate-y-1/2 z-0" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative z-10 flex flex-col items-center text-center bg-white border-2 border-gray-100 rounded-[2rem] p-12 shadow-xl hover:shadow-2xl transition-all duration-500 w-full max-w-[360px]"
                        >
                            {/* Number Badge */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-200">
                                {step.number}
                            </div>

                            <div className="text-primary-purple mb-6 mt-4">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-text-primary mb-4 font-display">{step.title}</h3>
                            <p className="text-text-secondary leading-relaxed font-medium">
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
