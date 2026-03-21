import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Download, FileSpreadsheet, FileText } from 'lucide-react';

const FactorsMockup = () => (
    <div className="relative">
        <div className="absolute -inset-4 bg-primary-purple/10 blur-3xl rounded-3xl" />
        <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-600" />
                    <div className="w-3 h-3 rounded-full bg-slate-600" />
                    <div className="w-3 h-3 rounded-full bg-slate-600" />
                </div>
                <span className="text-slate-400 text-xs ml-2 font-medium">hyperplott — Factor Configuration</span>
                <div className="ml-auto flex items-center gap-1.5 bg-primary-purple/20 px-2 py-0.5 rounded-md text-purple-400 text-[10px] font-bold">
                    <Sparkles className="w-2.5 h-2.5" /> AI Active
                </div>
            </div>
            <div className="p-5">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">Experimental Factors</p>
                <div className="space-y-2 mb-4">
                    {[
                        { name: "Temperature", range: "20°C – 80°C", levels: "3L", col: "purple" },
                        { name: "Pressure", range: "1.0 – 10.0 bar", levels: "2L", col: "blue" },
                        { name: "pH Level", range: "4.0 – 9.0", levels: "3L", col: "teal" },
                    ].map((factor, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="flex items-center gap-3 bg-slate-800/60 rounded-xl p-3 border border-slate-700/30"
                        >
                            <div className={`w-2 h-2 rounded-full shrink-0 ${factor.col === 'purple' ? 'bg-purple-400' : factor.col === 'blue' ? 'bg-blue-400' : 'bg-teal-400'}`} />
                            <span className="text-white text-sm font-medium flex-1">{factor.name}</span>
                            <span className="text-slate-400 text-xs">{factor.range}</span>
                            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${factor.col === 'purple' ? 'bg-purple-500/20 text-purple-300' : factor.col === 'blue' ? 'bg-blue-500/20 text-blue-300' : 'bg-teal-500/20 text-teal-300'}`}>
                                {factor.levels}
                            </span>
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-4"
                >
                    <div className="flex items-center gap-2 text-purple-400 text-[10px] font-bold mb-1">
                        <Sparkles className="w-3 h-3" /> AI Recommendation
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">Full Factorial 2³ detected. 8 experimental runs required for complete factor analysis.</p>
                </motion.div>
                <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-700 text-white text-xs font-black uppercase tracking-widest">
                    Generate Design Matrix →
                </button>
            </div>
        </div>
    </div>
);

const StrategyMockup = () => (
    <div className="relative">
        <div className="absolute -inset-4 bg-blue-900/10 blur-3xl rounded-3xl" />
        <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-600" />
                    <div className="w-3 h-3 rounded-full bg-slate-600" />
                    <div className="w-3 h-3 rounded-full bg-slate-600" />
                </div>
                <span className="text-slate-400 text-xs ml-2 font-medium">hyperplott — Design Strategy</span>
            </div>
            <div className="p-5">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">Recommended Designs</p>
                <div className="space-y-2 mb-4">
                    {[
                        { name: "Full Factorial", runs: "8 runs", match: "99%", best: true },
                        { name: "Fractional Factorial", runs: "4 runs", match: "74%", best: false },
                        { name: "Central Composite", runs: "14 runs", match: "61%", best: false },
                    ].map((design, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className={`flex items-center gap-3 rounded-xl p-3 border ${design.best ? 'bg-purple-500/10 border-purple-500/40' : 'bg-slate-800/40 border-slate-700/30'}`}
                        >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${design.best ? 'border-purple-500 bg-purple-500' : 'border-slate-600'}`}>
                                {design.best && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span className={`text-sm font-medium flex-1 ${design.best ? 'text-white' : 'text-slate-400'}`}>{design.name}</span>
                            <span className="text-slate-500 text-xs">{design.runs}</span>
                            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${design.best ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>
                                {design.match}
                            </span>
                        </motion.div>
                    ))}
                </div>
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/30 mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Factor Space Coverage</span>
                        <span className="text-emerald-400 text-xs font-bold">100%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.7 }}
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                        />
                    </div>
                </div>
                <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-500 text-white text-xs font-black uppercase tracking-widest">
                    Apply This Strategy →
                </button>
            </div>
        </div>
    </div>
);

const ExportMockup = () => (
    <div className="relative">
        <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl rounded-3xl" />
        <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-600" />
                    <div className="w-3 h-3 rounded-full bg-slate-600" />
                    <div className="w-3 h-3 rounded-full bg-slate-600" />
                </div>
                <span className="text-slate-400 text-xs ml-2 font-medium">hyperplott — Design Matrix</span>
                <div className="ml-auto flex items-center gap-1.5 bg-emerald-500/20 px-2 py-0.5 rounded-md text-emerald-400 text-[10px] font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Ready
                </div>
            </div>
            <div className="p-5">
                <div className="rounded-xl overflow-hidden border border-slate-700/50 mb-4">
                    <div className="grid grid-cols-4 text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-800/80 px-3 py-2">
                        <span>Run</span><span>Temp</span><span>Press</span><span>pH</span>
                    </div>
                    {[
                        ["1", "-1", "-1", "-1"],
                        ["2", "+1", "-1", "-1"],
                        ["3", "-1", "+1", "-1"],
                        ["4", "+1", "+1", "+1"],
                    ].map((row, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.08 }}
                            className="grid grid-cols-4 text-xs px-3 py-2 border-t border-slate-700/30"
                        >
                            <span className="text-slate-400">{row[0]}</span>
                            <span className={row[1] === "+1" ? "text-purple-400 font-bold" : "text-slate-400"}>{row[1]}</span>
                            <span className={row[2] === "+1" ? "text-blue-400 font-bold" : "text-slate-400"}>{row[2]}</span>
                            <span className={row[3] === "+1" ? "text-teal-400 font-bold" : "text-slate-400"}>{row[3]}</span>
                        </motion.div>
                    ))}
                    <div className="px-3 py-2 border-t border-slate-700/30 text-[10px] text-slate-600 font-medium">+ 4 more runs</div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                        { label: "Total Runs", value: "8" },
                        { label: "Factors", value: "3" },
                        { label: "R² Score", value: "0.97" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-slate-800/60 rounded-lg p-2.5 text-center border border-slate-700/30">
                            <p className="text-white text-sm font-black">{stat.value}</p>
                            <p className="text-slate-500 text-[9px] font-medium uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    {[
                        { icon: FileSpreadsheet, label: "Excel", cls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                        { icon: FileText, label: "PDF", cls: "text-red-400 bg-red-500/10 border-red-500/20" },
                        { icon: Download, label: "Raw CSV", cls: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                    ].map((btn, i) => (
                        <button key={i} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border text-[10px] font-bold ${btn.cls}`}>
                            <btn.icon className="w-3 h-3" /> {btn.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const StepRow = ({ step, index, reversed }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
        >
            {/* Text side */}
            <div className="flex-1 max-w-lg w-full">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 }}
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${step.gradient} text-white text-[10px] font-black uppercase tracking-widest mb-5`}
                >
                    {step.badge}
                </motion.div>

                <div className="flex items-start gap-4 mb-5">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className={`text-7xl font-black bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent leading-none shrink-0 -mt-2`}
                    >
                        {step.number}
                    </motion.span>
                    <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.25 }}
                        className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight"
                    >
                        {step.title}
                    </motion.h3>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="text-slate-500 font-medium leading-relaxed text-base sm:text-lg mb-8"
                >
                    {step.description}
                </motion.p>

                <div className="flex items-center gap-2">
                    {[0, 1, 2].map(i => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? `w-10 bg-gradient-to-r ${step.gradient}` : 'w-2.5 bg-slate-200'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Mockup side */}
            <motion.div
                initial={{ opacity: 0, x: reversed ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 w-full max-w-xl"
            >
                {step.mockup}
            </motion.div>
        </motion.div>
    );
};

const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            badge: "AI-Assisted Setup",
            title: "Define Your Factors",
            description: "Enter your experimental factors and constraints. Our AI instantly analyzes your research goals and suggests optimal factor ranges — no statistics PhD required.",
            gradient: "from-primary-purple to-primary",
            mockup: <FactorsMockup />,
        },
        {
            number: "02",
            badge: "Smart Recommendation",
            title: "Select Your Strategy",
            description: "Hyperplott evaluates your objectives and resources, then recommends the optimal DoE methodology with a clear rationale — Full Factorial, RSM, and more.",
            gradient: "from-primary to-accent-teal",
            mockup: <StrategyMockup />,
        },
        {
            number: "03",
            badge: "Instant Results",
            title: "Export & Analyze",
            description: "Download your design matrix instantly. Run your experiments, return your results, and let Hyperplott generate publication-ready reports with complete statistical analysis.",
            gradient: "from-accent-teal to-primary-purple",
            mockup: <ExportMockup />,
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-bg-secondary relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-purple/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-teal/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="section-badge"
                    >
                        Workflow
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter"
                    >
                        Three Steps to <span className="text-gradient">Optimization.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-500 max-w-xl mx-auto font-medium"
                    >
                        From idea to design matrix in minutes — no statistics PhD required.
                    </motion.p>
                </div>

                {/* Alternating Steps */}
                <div className="space-y-24 lg:space-y-32">
                    {steps.map((step, index) => (
                        <StepRow key={index} step={step} index={index} reversed={index % 2 === 1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
