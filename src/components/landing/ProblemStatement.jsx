import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { DollarSign, BrainCircuit, Layers } from 'lucide-react';

/* ─── Visual Headers ─────────────────────────────────────────── */

const PriceVisual = () => (
    <div className="w-full h-full bg-slate-900 flex items-center justify-center gap-8 px-6 relative overflow-hidden">
        <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
                backgroundImage: `linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
            }}
        />
        {/* Before */}
        <div className="text-center relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Before</p>
            <div className="relative inline-block">
                <p className="text-2xl font-black text-slate-400">₹50,000</p>
                <div className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none">
                    <div className="w-full h-0.5 bg-red-500/80" style={{ transform: 'rotate(-8deg)' }} />
                </div>
            </div>
            <p className="text-[10px] text-slate-600 font-medium mt-1">/year per seat</p>
        </div>

        <div className="text-slate-600 text-xl font-black relative z-10">→</div>

        {/* After */}
        <div className="text-center relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">With Hyperplott</p>
            <p className="text-4xl font-black text-white leading-none">₹0</p>
            <div className="inline-block px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[9px] font-black uppercase tracking-wider mt-1.5">
                Free Beta
            </div>
        </div>
    </div>
);

const CurveVisual = () => (
    <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-4 px-6 relative overflow-hidden">
        <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
                backgroundImage: `linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
            }}
        />
        <div className="w-full relative z-10 space-y-3">
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-wider">Traditional Tools</span>
                    <span className="text-red-400 text-[10px] font-bold">3+ weeks</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '90%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.0, delay: 0.3, ease: 'easeOut' }}
                        className="h-full bg-red-500/60 rounded-full"
                    />
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-purple-400 text-[10px] font-black uppercase tracking-wider">Hyperplott</span>
                    <span className="text-emerald-400 text-[10px] font-bold">5 minutes</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '8%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                    />
                </div>
            </div>
        </div>
        <p className="text-slate-600 text-[9px] font-medium relative z-10 uppercase tracking-widest">Time to first design matrix</p>
    </div>
);

const VizVisual = () => (
    <div className="w-full h-full bg-slate-900 flex items-center justify-center gap-6 px-6 relative overflow-hidden">
        <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
                backgroundImage: `linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
            }}
        />
        {/* 2D flat */}
        <div className="text-center relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Traditional</p>
            <div className="w-28 h-20 border border-slate-700 rounded-lg flex items-center justify-center bg-slate-800/50 relative overflow-hidden">
                {[0, 1, 2, 3].map(i => (
                    <div key={`h${i}`} className="absolute left-0 right-0 border-t border-slate-600/50" style={{ top: `${18 + i * 18}%` }} />
                ))}
                {[0, 1, 2, 3].map(i => (
                    <div key={`v${i}`} className="absolute top-0 bottom-0 border-l border-slate-600/50" style={{ left: `${18 + i * 20}%` }} />
                ))}
                <span className="text-slate-500 text-[9px] font-bold uppercase relative z-10 bg-slate-800/80 px-1 rounded">2D Only</span>
            </div>
        </div>

        <div className="text-slate-600 text-xl font-black relative z-10">→</div>

        {/* 3D perspective */}
        <div className="text-center relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">Hyperplott</p>
            <div className="w-28 h-20 rounded-lg flex items-center justify-center bg-slate-800/50 border border-purple-500/30 relative overflow-hidden">
                <div className="absolute inset-2" style={{ perspective: '100px' }}>
                    <div
                        className="w-full h-full border border-purple-500/30 rounded"
                        style={{ transform: 'rotateX(25deg) rotateY(-12deg)', transformStyle: 'preserve-3d' }}
                    >
                        {[0, 1, 2].map(i => (
                            <div key={`ph${i}`} className="absolute left-0 right-0 border-t border-purple-500/25" style={{ top: `${25 + i * 25}%` }} />
                        ))}
                        {[0, 1, 2].map(i => (
                            <div key={`pv${i}`} className="absolute top-0 bottom-0 border-l border-purple-500/25" style={{ left: `${25 + i * 25}%` }} />
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/5 rounded" />
                    </div>
                </div>
                <span className="text-purple-300 text-[9px] font-bold uppercase relative z-10 bg-slate-800/80 px-1 rounded">3D Live</span>
            </div>
        </div>
    </div>
);

/* ─── Card ───────────────────────────────────────────────────── */

const VISUALS = { price: PriceVisual, curve: CurveVisual, viz: VizVisual };

const problems = [
    {
        title: "Too Expensive",
        icon: DollarSign,
        stat: "₹50k+",
        statLabel: "per year",
        description: "Traditional software costs ₹50,000+/year per license, putting it out of reach for most researchers and students.",
        visual: "price",
    },
    {
        title: "Steep Learning Curve",
        icon: BrainCircuit,
        stat: "3+ weeks",
        statLabel: "to get started",
        description: "Complex interfaces require weeks of training and deep statistical expertise just to run a basic design.",
        visual: "curve",
    },
    {
        title: "Static Visualizations",
        icon: Layers,
        stat: "2D only",
        statLabel: "no interaction",
        description: "Flat 2D plots fail to reveal complex multi-dimensional factor interactions hiding in your data.",
        visual: "viz",
    },
];

const ProblemCard = ({ problem, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const Icon = problem.icon;
    const Visual = VISUALS[problem.visual];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            className="card-premium flex flex-col overflow-hidden"
        >
            {/* Visual header */}
            <div className="h-32 w-full relative shrink-0 overflow-hidden">
                <Visual />
            </div>

            {/* Card body */}
            <div className="p-8 flex flex-col gap-5">
                <div className="flex items-start justify-between">
                    <motion.div
                        whileHover={{ scale: 1.15, rotate: 6 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                        className="w-14 h-14 rounded-2xl bg-primary-purple/10 flex items-center justify-center text-primary-purple shrink-0"
                    >
                        <Icon className="w-7 h-7" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                        transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
                        className="text-right"
                    >
                        <p className="text-2xl font-black text-slate-900 leading-none">{problem.stat}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{problem.statLabel}</p>
                    </motion.div>
                </div>

                <div>
                    <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight uppercase">
                        {problem.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed font-medium text-sm">
                        {problem.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Section ────────────────────────────────────────────────── */

const ProblemStatement = () => {
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <section className="py-24 bg-bg-secondary relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                <div ref={headerRef} className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                        transition={{ duration: 0.5 }}
                        className="section-badge"
                    >
                        The Challenge
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter"
                    >
                        Why Traditional DoE <br className="hidden sm:block" />{' '}
                        <span className="text-gradient">Software Falls Short</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium"
                    >
                        Existing DoE tools are expensive, complicated, and outdated.
                        We built a modern alternative for researchers who want results, not headaches.
                    </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {problems.map((problem, i) => (
                        <ProblemCard key={i} problem={problem} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
