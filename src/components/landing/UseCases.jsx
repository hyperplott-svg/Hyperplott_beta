import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, Microscope, Factory, GraduationCap, CheckCircle2 } from 'lucide-react';

const UseCases = () => {
    const industries = [
        {
            name: "Pharmaceutical Research",
            icon: Beaker,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
            tasks: [
                "Drug formulation optimization",
                "Stability studies",
                "Process validation"
            ]
        },
        {
            name: "Biotechnology",
            icon: Microscope,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            tasks: [
                "Cell culture optimization",
                "Protein expression studies",
                "Fermentation process design"
            ]
        },
        {
            name: "Chemical Engineering",
            icon: Factory,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20",
            tasks: [
                "Process optimization",
                "Quality control",
                "Yield improvement"
            ]
        },
        {
            name: "Academic Research",
            icon: GraduationCap,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            tasks: [
                "Thesis projects",
                "Research papers",
                "Teaching DoE concepts"
            ]
        }
    ];

    return (
        <section className="py-32 bg-bg-primary relative">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                        Who Uses <span className="text-primary-purple underline decoration-primary-purple/30">Hyperplott</span>?
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto opacity-70">
                        Tailored for the most demanding scientific disciplines and research environments.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {industries.map((industry, i) => {
                        const Icon = industry.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-8 rounded-[32px] bg-white/[0.02] border ${industry.border} flex flex-col items-start hover:bg-white/[0.04] transition-all duration-500`}
                            >
                                <div className={`w-14 h-14 rounded-2xl ${industry.bg} flex items-center justify-center ${industry.color} mb-8 shadow-inner-glow`}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">
                                    {industry.name}
                                </h3>
                                <ul className="space-y-4">
                                    {industry.tasks.map((task, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm text-text-secondary opacity-80">
                                            <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${industry.color}`} />
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default UseCases;
