import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart,
    Settings as SettingsIcon,
    Search,
    Bell,
    Plus,
    ArrowRight,
    TrendingUp,
    Clock,
    Users,
    Grid3X3,
    Shapes,
    FlaskConical,
    Target,
    FileSearch,
    ArrowUpRight,
    MoreVertical,
    Eye,
    Edit2,
    Trash2,
    Filter,
    ChevronDown,
    X,
    FileSpreadsheet,
    Database,
    Library,
    Zap,
    Layout
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Container, Grid } from '../components/common/Layout';
import { Badge, Stat } from '../components/common/UIElements';
import SEO from '../components/common/SEO';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [showBanner, setShowBanner] = useState(true);

    const mockDesigns = [
        { id: 1, name: "Catalyst Optimization for Polymerization", type: "RSM", factors: 5, runs: 20, createdAt: "2023-10-26" },
        { id: 2, name: "Drug Formulation Stability Study", type: "Mixture", factors: 3, runs: 15, createdAt: "2023-10-25" },
        { id: 3, name: "Process Parameter Screening for Yield", type: "Factorial", factors: 7, runs: 32, createdAt: "2023-10-24" },
        { id: 4, name: "Battery Life Cycle Testing", type: "Factorial", factors: 4, runs: 16, createdAt: "2023-10-23" },
    ];

    return (
        <div className="space-y-10 pb-20 max-w-[1400px] mx-auto">
            <AnimatePresence>
                {showBanner && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-12 text-slate-900 shadow-xl shadow-indigo-100/20 group min-h-[400px] flex flex-col justify-center"
                    >
                        {/* Dynamic Background */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150 mix-blend-overlay"></div>
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-primary-purple/10 to-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" style={{ animationDuration: '4s' }} />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8 text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-purple/5 border border-primary-purple/10 backdrop-blur-sm">
                                    <div className="w-2 h-2 rounded-full bg-primary-purple animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-purple">Laboratory Active</span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-black tracking-tight font-display leading-[1.05] text-slate-900">
                                    <span className="text-gradient">Scientific</span> <br />
                                    Workspace.
                                </h1>

                                <p className="text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
                                    Initiate high-precision experimental matrices using our AI-powered statistical optimization engine.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Link to="/workspace">
                                        <button className="btn-primary h-14 px-10 group">
                                            <Zap className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform" />
                                            Initialize New DoE
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Decorative HUD Element - Light Version */}
                            <div className="hidden lg:block relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/5 to-primary/5 rounded-3xl blur-xl" />
                                <div className="relative bg-white border border-slate-100 shadow-2xl rounded-3xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-700 hover:scale-[1.02]">
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
                                                <div key={i} className="w-6 bg-primary-purple/20 rounded-t-sm" style={{ height: `${h}%` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Launch Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: "Factorial Design", desc: "Screening & Interactions", icon: Grid3X3, color: "from-blue-600 to-indigo-600", path: "/create" },
                    { title: "Response Surface", desc: "Optimization & Curvature", icon: Shapes, color: "from-violet-600 to-purple-600", path: "/create" },
                    { title: "Smart Mixture", desc: "Formulation Blending", icon: FlaskConical, color: "from-fuchsia-600 to-pink-600", path: "/create" },
                ].map((item, i) => (
                    <Link key={i} to={item.path} className="group">
                        <div className="relative h-full bg-white p-8 rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1">
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-2xl -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-700`} />

                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                                <item.icon className="w-7 h-7" />
                            </div>

                            <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                            <p className="text-sm font-medium text-slate-400 group-hover:text-slate-600 transition-colors">{item.desc}</p>

                            <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Recent Workspace Designs (Simplified) */}
            <section className="pt-4">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-1.5 h-6 bg-slate-900 rounded-full" />
                    <h2 className="text-xl font-black text-slate-900 tracking-tight font-display uppercase">Active Experiments</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockDesigns.map((design, i) => (
                        <Card key={i} hoverable className="p-0 rounded-[2rem] border border-gray-100 overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-500 bg-white">
                            <div className="p-6 border-b border-gray-50 bg-gray-50/30">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-primary-purple shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                        <FileSpreadsheet className="w-6 h-6" />
                                    </div>
                                    <Badge variant={design.type === 'RSM' ? 'secondary' : 'primary'} className="rounded-lg px-2 py-0.5 text-[9px]">
                                        {design.type}
                                    </Badge>
                                </div>
                                <h4 className="text-lg font-black text-slate-900 leading-none mb-2 line-clamp-1">{design.name}</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{design.createdAt}</p>
                            </div>
                            <div className="p-6 flex items-center justify-between">
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
                                    <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
