import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Grid3X3,
    Shapes,
    FlaskConical,
    Zap,
    ArrowRight,
    ArrowUpRight,
    FileSpreadsheet,
    Activity,
    Database,
    Cpu,
    Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import { Badge } from '../components/common/UIElements';
import SEO from '../components/common/SEO';

// Animated counter hook
const useCounter = (target, duration = 1200, enabled = false) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!enabled) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration, enabled]);
    return count;
};

const StatCard = ({ label, value, suffix = '', icon: Icon, delay = 0, color }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });
    const count = useCounter(typeof value === 'number' ? value : 0, 1000, isInView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
            className="stat-card p-5 flex items-center gap-4"
        >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-2xl font-black text-slate-900 leading-none tabular-nums">
                    {typeof value === 'number' ? count : value}{suffix}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{label}</p>
            </div>
        </motion.div>
    );
};

const Dashboard = () => {
    const { user } = useAuth();

    const displayName = user?.displayName || user?.email?.split('@')[0] || 'Researcher';

    const getGreeting = () => {
        const h = new Date().getHours();
        if (h < 12) return 'Good morning';
        if (h < 17) return 'Good afternoon';
        return 'Good evening';
    };

    const mockDesigns = [
        { id: 1, name: "Catalyst Optimization for Polymerization", type: "RSM", factors: 5, runs: 20, createdAt: "2023-10-26" },
        { id: 2, name: "Drug Formulation Stability Study", type: "Mixture", factors: 3, runs: 15, createdAt: "2023-10-25" },
        { id: 3, name: "Process Parameter Screening for Yield", type: "Factorial", factors: 7, runs: 32, createdAt: "2023-10-24" },
        { id: 4, name: "Battery Life Cycle Testing", type: "Factorial", factors: 4, runs: 16, createdAt: "2023-10-23" },
    ];

    const stats = [
        { label: 'Active Designs', value: 4, icon: Database, color: 'bg-indigo-50 text-indigo-600', delay: 0 },
        { label: 'Design Methods', value: 3, icon: Shapes, color: 'bg-violet-50 text-violet-600', delay: 0.08 },
        { label: 'Total Runs', value: 83, icon: Activity, color: 'bg-cyan-50 text-cyan-600', delay: 0.16 },
        { label: 'AI Powered', value: '100', suffix: '%', icon: Cpu, color: 'bg-emerald-50 text-emerald-600', delay: 0.24 },
    ];

    return (
        <div className="space-y-5 md:space-y-8 pb-20 max-w-[1400px] mx-auto">
            <SEO
                title="Research Dashboard"
                description="Your Hyperplott scientific workspace. Manage active experiments, create new DoE designs, and access AI-powered statistical analysis tools."
                keywords="DoE dashboard, experimental design workspace, research management, factorial design, response surface"
                url="https://hyperplott.com/dashboard"
            />

            {/* Greeting Row */}
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between"
            >
                <div>
                    <p className="text-sm font-medium text-slate-400 mb-0.5">{getGreeting()},</p>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight capitalize">{displayName} 👋</h1>
                </div>
                <Link to="/workspace">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-primary h-10 md:h-11 px-5 md:px-7 text-sm gap-2"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="hidden sm:block">New Experiment</span>
                        <span className="sm:hidden">New</span>
                    </motion.button>
                </Link>
            </motion.div>

            {/* Hero Banner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-white border border-slate-100 p-6 md:p-12 text-slate-900 shadow-xl shadow-indigo-100/20 group min-h-[200px] md:min-h-[400px] flex flex-col justify-center"
            >
                        {/* Dynamic Background */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150 mix-blend-overlay" />
                        <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-b from-primary-purple/10 to-primary/10 blur-[100px] md:blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" style={{ animationDuration: '4s' }} />
                        <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/5 blur-[80px] md:blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div className="space-y-5 md:space-y-8 text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-purple/5 border border-primary-purple/10 backdrop-blur-sm">
                                    <div className="w-2 h-2 rounded-full bg-primary-purple animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-purple">Laboratory Active</span>
                                </div>

                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight font-display leading-[1.05] text-slate-900">
                                    <span className="text-gradient">Scientific</span> <br className="hidden sm:block" />
                                    Workspace.
                                </h1>

                                <p className="text-base md:text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
                                    Initiate high-precision experimental matrices using our AI-powered statistical optimization engine.
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    <Link to="/workspace">
                                        <button className="btn-primary h-12 md:h-14 px-7 md:px-10 group text-sm md:text-base">
                                            <Zap className="w-4 h-4 md:w-5 md:h-5 fill-white group-hover:rotate-12 transition-transform" />
                                            Initialize New DoE
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Decorative HUD Element — hidden on mobile */}
                            <div className="hidden lg:block relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/5 to-primary/5 rounded-3xl blur-xl" />
                                <motion.div
                                    initial={{ rotate: 2 }}
                                    whileHover={{ rotate: 0, scale: 1.02 }}
                                    transition={{ duration: 0.7 }}
                                    className="relative bg-white border border-slate-100 shadow-2xl rounded-3xl p-8"
                                >
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-slate-200" />
                                            <div className="w-3 h-3 rounded-full bg-slate-200" />
                                            <div className="w-3 h-3 rounded-full bg-slate-200" />
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">System Kernel v2.4</div>
                                    </div>
                                    <div className="space-y-4 font-mono text-[11px] text-slate-600">
                                        <div className="flex justify-between border-b border-slate-50 pb-2">
                                            <span className="font-bold">&gt; ANALYZING_INTERACTIONS</span>
                                            <span className="text-primary-purple font-black">ACTIVE</span>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-50 pb-2">
                                            <span className="font-bold">&gt; OPTIMIZING_YIELD</span>
                                            <span className="text-primary-purple font-black">98.2%</span>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-50 pb-2">
                                            <span className="font-bold">&gt; VALIDATING_RESIDUALS</span>
                                            <span className="text-accent-teal font-black">PASSED</span>
                                        </div>
                                        <div className="h-32 mt-4 bg-slate-50 rounded-lg border border-slate-100 relative overflow-hidden flex items-end justify-between px-2 pb-2">
                                            {[40, 70, 50, 90, 60, 80, 55].map((h, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${h}%` }}
                                                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                                                    className="w-6 bg-primary-purple/20 rounded-t-sm"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
            </motion.div>

            {/* Stat Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            {/* Quick Launch Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {[
                    { title: "Factorial Design", desc: "Screening & Interactions", icon: Grid3X3, color: "from-blue-600 to-indigo-600", path: "/create" },
                    { title: "Response Surface", desc: "Optimization & Curvature", icon: Shapes, color: "from-violet-600 to-purple-600", path: "/create" },
                    { title: "Smart Mixture", desc: "Formulation Blending", icon: FlaskConical, color: "from-fuchsia-600 to-pink-600", path: "/create" },
                ].map((item, i) => (
                    <Link key={i} to={item.path} className="group">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                            className="relative h-full bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-shadow duration-300"
                        >
                            <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-2xl -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-700`} />
                            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-5 md:mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                                <item.icon className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <h3 className="text-lg md:text-xl font-black text-slate-900 mb-1.5">{item.title}</h3>
                            <p className="text-xs md:text-sm font-medium text-slate-400 group-hover:text-slate-600 transition-colors">{item.desc}</p>
                            <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Active Experiments */}
            <section className="pt-2">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-gradient-to-b from-primary-purple to-primary rounded-full" />
                        <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight font-display uppercase">Active Experiments</h2>
                        <span className="px-2 py-0.5 rounded-full bg-primary-purple/10 text-primary-purple text-[10px] font-black uppercase tracking-widest">
                            {mockDesigns.length}
                        </span>
                    </div>
                    <Link to="/workspace" className="text-[11px] font-black text-slate-400 hover:text-primary-purple uppercase tracking-widest transition-colors flex items-center gap-1">
                        New <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {mockDesigns.map((design, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                        >
                            <Card hoverable className="p-0 rounded-[1.75rem] border border-gray-100 overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-shadow duration-500 bg-white h-full">
                                <div className="p-5 border-b border-gray-50 bg-gray-50/30">
                                    <div className="flex justify-between items-start mb-5">
                                        <div className="w-11 h-11 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-primary-purple shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                            <FileSpreadsheet className="w-5 h-5" />
                                        </div>
                                        <Badge variant={design.type === 'RSM' ? 'secondary' : 'primary'} className="rounded-lg px-2 py-0.5 text-[9px]">
                                            {design.type}
                                        </Badge>
                                    </div>
                                    <h4 className="text-base font-black text-slate-900 leading-tight mb-2 line-clamp-2">{design.name}</h4>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{design.createdAt}</p>
                                </div>
                                <div className="p-5 flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <div className="text-center">
                                            <p className="text-[9px] font-bold text-gray-400 uppercase leading-none mb-1">Factors</p>
                                            <p className="text-sm font-black text-slate-900">{design.factors}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[9px] font-bold text-gray-400 uppercase leading-none mb-1">Runs</p>
                                            <p className="text-sm font-black text-slate-900">{design.runs}</p>
                                        </div>
                                    </div>
                                    <Link to={`/design/${design.id}`}>
                                        <button className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
