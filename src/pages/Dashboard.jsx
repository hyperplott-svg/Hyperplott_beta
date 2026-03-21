import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    Grid3X3, Shapes, FlaskConical, Zap, ArrowUpRight,
    Activity, Database, Cpu, Sparkles, TrendingUp,
    Clock, Play, ChevronRight,
    Atom, Layers, Beaker
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDesigns } from '../hooks/useDesigns';
import OnboardingModal from '../components/onboarding/OnboardingModal';
import SEO from '../components/common/SEO';

// ── Animated counter ────────────────────────────────────────────────────────
const useCounter = (target, duration = 1200, enabled = false) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!enabled) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration, enabled]);
    return count;
};

// ── Sparkline bars ──────────────────────────────────────────────────────────
const Sparkline = ({ data, color = '#7c3aed' }) => (
    <div className="flex items-end gap-[2px] h-8">
        {data.map((v, i) => (
            <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${v}%` }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
                style={{ backgroundColor: color, opacity: 0.2 + (v / 100) * 0.8 }}
                className="w-[3px] rounded-full"
            />
        ))}
    </div>
);

// ── Stat card ───────────────────────────────────────────────────────────────
const StatCard = ({ label, value, suffix = '', icon: Icon, delay = 0, color, bgColor, sparkData, trend }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    const count = useCounter(typeof value === 'number' ? value : 0, 1000, isInView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            className="relative bg-white rounded-2xl border border-slate-100 p-5 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-slate-200/60 transition-shadow duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgColor}`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                </div>
                {trend && (
                    <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <TrendingUp className="w-2.5 h-2.5" />{trend}
                    </span>
                )}
            </div>
            <p className="text-3xl font-black text-slate-900 leading-none tabular-nums mb-1">
                {typeof value === 'number' ? count : value}{suffix}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{label}</p>
            {sparkData && <Sparkline data={sparkData} />}
            <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${bgColor} opacity-50`} />
        </motion.div>
    );
};

// ── Design type badge ────────────────────────────────────────────────────────
const typeMeta = {
    RSM:      { color: 'bg-violet-100 text-violet-700', dot: 'bg-violet-500' },
    Factorial:{ color: 'bg-indigo-100 text-indigo-700',dot: 'bg-indigo-500' },
};

// ── Terminal line ────────────────────────────────────────────────────────────
const TerminalLine = ({ label, value, valueColor = 'text-primary-purple', delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.4 }}
        className="flex justify-between items-center border-b border-slate-100 pb-2"
    >
        <span className="text-[11px] font-mono font-bold text-slate-400">&gt; {label}</span>
        <span className={`text-[11px] font-mono font-black ${valueColor}`}>{value}</span>
    </motion.div>
);

// ── Icon map for design types ────────────────────────────────────────────────
const typeIconMap = { RSM: Atom, Factorial: Layers };

// ── Main Dashboard ───────────────────────────────────────────────────────────
const Dashboard = () => {
    const { user } = useAuth();
    const { designs, loading: designsLoading, syncStatus } = useDesigns();
    const [tick, setTick] = useState(0);
    const [showOnboarding, setShowOnboarding] = useState(false);

    // Show onboarding once for new users
    useEffect(() => {
        if (!user) return;
        const key = `onboarding_done_${user.uid}`;
        if (!localStorage.getItem(key)) {
            setShowOnboarding(true);
        }
    }, [user]);

    const displayName = user?.displayName || user?.email?.split('@')[0] || 'Researcher';
    const initials = displayName.slice(0, 2).toUpperCase();

    const getGreeting = () => {
        const h = new Date().getHours();
        if (h < 12) return 'Good morning';
        if (h < 17) return 'Good afternoon';
        return 'Good evening';
    };

    // Animate terminal values
    useEffect(() => {
        const id = setInterval(() => setTick(t => t + 1), 2800);
        return () => clearInterval(id);
    }, []);

    const terminalValues = [
        ['98.2%', '97.8%', '99.1%'],
        ['ACTIVE', 'RUNNING', 'ACTIVE'],
        ['PASSED', 'PASSED', 'VALID'],
    ];

    // Derive stats from real designs
    const totalRuns = designs.reduce((sum, d) => sum + (d.runs || d.numRuns || 0), 0);
    const uniqueTypes = new Set(designs.map(d => d.type || d.designType)).size;
    const stats = [
        { label: 'Active Designs', value: designs.length, suffix: '',  icon: Database,  bgColor: 'bg-indigo-50',  color: 'text-indigo-600', delay: 0,    sparkData: [30,50,40,70,55,80,65] },
        { label: 'Design Methods', value: uniqueTypes || 0, suffix: '', icon: Shapes,   bgColor: 'bg-violet-50',  color: 'text-violet-600', delay: 0.07, sparkData: [60,40,80,50,70,45,75] },
        { label: 'Total Runs',     value: totalRuns,    suffix: '',  icon: Activity,  bgColor: 'bg-cyan-50',    color: 'text-cyan-600',   delay: 0.14, sparkData: [20,45,30,80,60,90,70] },
        { label: 'AI Accuracy',    value: 100,          suffix: '%', icon: Cpu,       bgColor: 'bg-emerald-50', color: 'text-emerald-600',delay: 0.21, sparkData: [70,80,75,90,85,95,100] },
    ];

    const quickLaunch = [
        { title: "Factorial Design", desc: "Full & fractional screening",   icon: Grid3X3,    from: 'from-blue-500', to: 'to-indigo-600',   glow: 'shadow-blue-500/20',   path: "/workspace" },
        { title: "Response Surface", desc: "CCD & Box-Behnken optimization",icon: Shapes,     from: 'from-violet-500', to: 'to-purple-700', glow: 'shadow-violet-500/20', path: "/workspace" },
    ];


    const handleOnboardingDone = () => {
        if (user) localStorage.setItem(`onboarding_done_${user.uid}`, '1');
        setShowOnboarding(false);
    };

    return (
        <div className="space-y-6 md:space-y-8 pb-24 max-w-[1400px] mx-auto">
            {showOnboarding && (
                <OnboardingModal
                    onComplete={handleOnboardingDone}
                    onSkip={handleOnboardingDone}
                />
            )}
            <SEO
                title="Research Dashboard"
                description="Your Hyperplott scientific workspace. Manage active experiments, create new DoE designs, and access AI-powered statistical analysis tools."
                keywords="DoE dashboard, experimental design workspace, research management, factorial design, response surface"
                url="https://hyperplott.com/dashboard"
            />

            {/* ── Greeting Row ─────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between"
            >
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-purple to-primary flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary-purple/20">
                        {initials}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400">{getGreeting()},</p>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight capitalize leading-tight">{displayName}</h1>
                    </div>
                </div>
                <Link to="/workspace">
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="btn-primary h-10 md:h-11 px-5 md:px-7 text-sm gap-2"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="hidden sm:block">New Experiment</span>
                        <span className="sm:hidden">New</span>
                    </motion.button>
                </Link>
            </motion.div>

            {/* ── Hero Banner ──────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 md:p-10 shadow-2xl min-h-[220px] md:min-h-[340px] flex items-center"
            >
                {/* Background glows */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-purple/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-teal/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                    />
                </div>

                <div className="relative z-10 w-full grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left: copy */}
                    <div className="space-y-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">Laboratory Active</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.05]">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-purple via-violet-400 to-accent-teal">Scientific</span>
                            <br />Workspace.
                        </h2>

                        <p className="text-slate-400 font-medium text-sm md:text-base max-w-sm leading-relaxed">
                            AI-powered experimental design engine. Generate matrices, run ANOVA, export publication-ready results.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <Link to="/workspace">
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="h-11 px-7 rounded-xl bg-white text-slate-900 font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-white/90 transition-colors shadow-lg shadow-white/10"
                                >
                                    <Zap className="w-4 h-4 text-primary-purple" />
                                    Initialize DoE
                                </motion.button>
                            </Link>
                            <Link to="#experiments">
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="h-11 px-7 rounded-xl bg-white/5 border border-white/10 text-white font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-colors"
                                >
                                    <Play className="w-4 h-4" />
                                    View Experiments
                                </motion.button>
                            </Link>
                        </div>
                    </div>

                    {/* Right: animated terminal card */}
                    <div className="hidden lg:block">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                        >
                            {/* Window chrome */}
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                                <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                                <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
                                <span className="ml-auto text-[10px] font-mono text-white/30 tracking-widest">HYPERPLOTT KERNEL v2.4</span>
                            </div>

                            <div className="space-y-2.5 font-mono text-[11px] mb-5">
                                <AnimatePresence mode="wait">
                                    <TerminalLine key={`t0-${tick}`} label="OPTIMIZING_YIELD"        value={terminalValues[0][tick % 3]}   valueColor="text-primary-purple" delay={0} />
                                    <TerminalLine key={`t1-${tick}`} label="ANALYZING_INTERACTIONS"  value={terminalValues[1][tick % 3]}   valueColor="text-emerald-400" delay={0.1} />
                                    <TerminalLine key={`t2-${tick}`} label="VALIDATING_RESIDUALS"    value={terminalValues[2][tick % 3]}   valueColor="text-accent-teal" delay={0.2} />
                                </AnimatePresence>
                            </div>

                            {/* Bar chart */}
                            <div className="h-24 bg-white/[0.03] rounded-xl border border-white/5 flex items-end justify-around px-3 pb-2 pt-3">
                                {[45, 72, 55, 88, 63, 91, 58].map((h, i) => (
                                    <motion.div
                                        key={`${i}-${tick}`}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                                        className="w-5 rounded-t-sm"
                                        style={{ background: `linear-gradient(to top, #7c3aed, #06b6d4)`, opacity: 0.4 + (h / 100) * 0.6 }}
                                    />
                                ))}
                            </div>

                            <div className="flex items-center justify-between mt-3">
                                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Response Surface Analysis</span>
                                <span className="text-[9px] font-black text-emerald-400">R² = 0.982</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* ── Stat Row ─────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {stats.map((s, i) => <StatCard key={i} {...s} />)}
            </div>

            {/* ── Quick Launch ──────────────────────────────────────────── */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-5 bg-gradient-to-b from-primary-purple to-primary rounded-full" />
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Quick Launch</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    {quickLaunch.map((item, i) => (
                        <Link key={i} to={item.path} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                                className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 h-full shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-shadow duration-300"
                            >
                                <div className={`absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br ${item.from} ${item.to} opacity-10 rounded-full blur-xl group-hover:opacity-20 group-hover:scale-150 transition-all duration-500`} />
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.from} ${item.to} flex items-center justify-center text-white mb-4 shadow-lg ${item.glow} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-black text-slate-900 mb-1 leading-tight">{item.title}</h3>
                                <p className="text-[11px] font-medium text-slate-400 mb-4 leading-snug">{item.desc}</p>
                                <div className="flex items-center gap-1 text-[10px] font-black text-slate-300 group-hover:text-primary-purple uppercase tracking-widest transition-colors">
                                    Launch <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* ── Active Experiments ────────────────────────────────────── */}
            <section id="experiments">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-primary rounded-full" />
                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Active Experiments</h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-purple/10 text-primary-purple text-[10px] font-black">
                            {designs.length}
                        </span>
                        {syncStatus === 'syncing' && (
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">Syncing...</span>
                        )}
                        {syncStatus === 'synced' && (
                            <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">✓ Saved</span>
                        )}
                    </div>
                    <Link to="/workspace" className="flex items-center gap-1 text-[10px] font-black text-slate-400 hover:text-primary-purple uppercase tracking-widest transition-colors">
                        New <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {designsLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm animate-pulse">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 mb-4" />
                                <div className="h-4 bg-slate-100 rounded mb-2 w-3/4" />
                                <div className="h-3 bg-slate-100 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : designs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-primary-purple/10 flex items-center justify-center mx-auto mb-4">
                            <FlaskConical className="w-8 h-8 text-primary-purple" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">No experiments yet</h3>
                        <p className="text-sm text-slate-400 font-medium mb-6 max-w-xs mx-auto">
                            Launch the DoE workspace to design your first experiment.
                        </p>
                        <Link to="/workspace">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="btn-primary h-11 px-8 text-sm"
                            >
                                <Zap className="w-4 h-4" /> Start First Experiment
                            </motion.button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {designs.map((design, i) => {
                            const designType = design.type || design.designType || 'Factorial';
                            const meta = typeMeta[designType] || typeMeta.Factorial;
                            const Icon = typeIconMap[designType] || Layers;
                            const factors = design.factors?.length || design.numFactors || design.factors || '—';
                            const runs = design.runs || design.numRuns || design.matrix?.length || '—';
                            const progress = design.progress ?? (design.results ? 100 : design.matrix ? 60 : 20);
                            const dateStr = design.createdAt
                                ? new Date(design.createdAt?.seconds ? design.createdAt.seconds * 1000 : design.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                : design.date || '—';

                            return (
                                <motion.div
                                    key={design.id || i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                                    className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-shadow duration-300 flex flex-col"
                                >
                                    <div className={`h-1 ${meta.dot}`} />
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                                <Icon className="w-5 h-5 text-slate-500" />
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${meta.color}`}>
                                                {designType}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-black text-slate-900 leading-snug mb-1 flex-1 line-clamp-2">
                                            {design.name || design.title || 'Untitled Design'}
                                        </h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1">
                                            <Clock className="w-2.5 h-2.5" />{dateStr}
                                        </p>
                                        <div className="mb-4">
                                            <div className="flex justify-between mb-1.5">
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                                                <span className="text-[9px] font-black text-slate-700">{progress}%</span>
                                            </div>
                                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ duration: 0.8, delay: i * 0.1 + 0.3, ease: 'easeOut' }}
                                                    className={`h-full rounded-full ${progress === 100 ? 'bg-emerald-500' : 'bg-primary-purple'}`}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-4">
                                                <div>
                                                    <p className="text-[8px] font-bold text-slate-400 uppercase">Factors</p>
                                                    <p className="text-sm font-black text-slate-900">{factors}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[8px] font-bold text-slate-400 uppercase">Runs</p>
                                                    <p className="text-sm font-black text-slate-900">{runs}</p>
                                                </div>
                                            </div>
                                            <Link to={`/design/${design.id}`}>
                                                <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-purple group-hover:text-white transition-all">
                                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </section>

        </div>
    );
};

export default Dashboard;
