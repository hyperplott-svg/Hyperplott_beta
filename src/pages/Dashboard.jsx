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

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [showBanner, setShowBanner] = useState(true);

    const mockDesigns = [
        { id: 1, name: "Drug Formulation Study", type: "RSM", factors: 3, runs: 20, createdAt: "2 days ago", status: "Completed" },
        { id: 2, name: "Tablet Coating Optimization", type: "Factorial", factors: 4, runs: 16, createdAt: "5 days ago", status: "In Progress" },
        { id: 3, name: "Extraction Process v4", type: "Taguchi", factors: 5, runs: 18, createdAt: "1 week ago", status: "Completed" },
        { id: 4, name: "Stability Testing Alpha", type: "Factorial", factors: 2, runs: 8, createdAt: "2 weeks ago", status: "Draft" }
    ];

    return (
        <div className="space-y-10 pb-20 max-w-[1400px] mx-auto">

            {/* 1. Welcome Banner - Redesigned with Premium Gradient */}
            <AnimatePresence>
                {showBanner && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#111827] via-slate-800 to-slate-900 p-10 md:p-14 text-white shadow-3xl shadow-slate-200/50 group"
                    >
                        {/* Decorative Background Glows */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-purple opacity-20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary opacity-10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                        <button
                            onClick={() => setShowBanner(false)}
                            className="absolute top-8 right-8 p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 z-20"
                        >
                            <X className="w-4 h-4 text-slate-400" />
                        </button>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-2xl text-center md:text-left">
                                <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Security Clearance Level 4 Reserved</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight font-display leading-[1.1]">
                                    Welcome back, <br />
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white">Researcher Antigravity</span>
                                </h1>
                                <p className="text-lg font-medium text-slate-400 mb-10 max-w-lg leading-relaxed">
                                    Your precision optimization engine is running at <span className="text-white font-bold">100% capacity</span>. Continue where you left off.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    <Link to="/create">
                                        <button className="px-10 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-xl shadow-white/5 active:scale-95">Resume Optimization</button>
                                    </Link>
                                    <button className="px-10 py-4 bg-white/5 text-white border border-white/10 font-black rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm active:scale-95">Lab Analytics</button>
                                </div>
                            </div>

                            <div className="hidden lg:block relative group-hover:scale-105 transition-transform duration-700">
                                <div className="w-72 h-72 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl rounded-[3rem] border border-white/10 flex items-center justify-center p-10 shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-primary-purple/5 animate-pulse" />
                                    <Zap className="w-32 h-32 text-white/20" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full animate-[spin_6s_linear_infinite_reverse]" />

                                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl flex items-center justify-center p-6 shadow-2xl">
                                        <Database className="w-full h-full text-indigo-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. Quick Stats - Leaner and more Scientific */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Active Designs', value: '24', icon: Layout, color: 'text-indigo-500', bg: 'bg-indigo-50/50' },
                    { label: 'Cloud Synchrony', value: 'Syncing', icon: TrendingUp, color: 'text-secondary', bg: 'bg-indigo-50/50' },
                    { label: 'Team Capacity', value: '08 / 12', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-50/50' },
                    { label: 'Vault Storage', value: '458 GB', icon: Database, color: 'text-slate-900', bg: 'bg-indigo-50/50', isProgress: true }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5 hover:border-indigo-100 transition-all cursor-pointer group">
                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none">{stat.value}</h3>
                            {stat.isProgress && (
                                <div className="mt-3 w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-900 w-[45%]" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Recent Workspace Designs */}
            <section className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-6 bg-primary-purple rounded-full" />
                        <h2 className="text-xl font-black text-slate-900 tracking-tight font-display uppercase">Recent Laboratory Designs</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-50 p-1 rounded-xl border border-gray-100 flex gap-1">
                            <button className="px-4 py-1.5 bg-white shadow-sm border border-gray-100 rounded-lg text-[10px] font-black uppercase text-indigo-600">Grid</button>
                            <button className="px-4 py-1.5 text-[10px] font-black uppercase text-gray-400 hover:text-gray-600">List</button>
                        </div>
                        <button className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-gray-400 hover:text-indigo-600 transition-all">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockDesigns.map((design, i) => (
                        <Card key={i} hoverable className="p-0 rounded-[2rem] border border-gray-100 overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-500">
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
                            <div className="p-6 bg-white flex items-center justify-between">
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
                                <Link to="/create">
                                    <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-purple group-hover:text-white transition-all shadow-inner">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 4. Quick Strategy Launch */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-1.5 h-6 bg-secondary rounded-full" />
                    <h2 className="text-xl font-black text-slate-900 tracking-tight font-display uppercase">Precision Strategy Launch</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {[
                        { title: 'Full Factorial Design', desc: 'Screen large numbers of variables and identify significant primary effects.', icon: Grid3X3, gradient: 'from-indigo-600 to-primary-purple' },
                        { title: 'Optimization (RSM)', desc: 'Deep optimization for yield, stability, and therapeutic effectiveness.', icon: Shapes, gradient: 'from-secondary to-indigo-500' },
                        { title: 'Taguchi Method', desc: 'Minimize quality variation by identifying robust parameter intersections.', icon: Target, gradient: 'from-slate-800 to-slate-900' },
                        { title: 'Clinical Protocols', desc: 'Access pre-validated templates for common laboratory workflows.', icon: Library, gradient: 'from-accent to-secondary' },
                    ].map((item, i) => (
                        <Link key={i} to="/create" className="group">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex items-center gap-8 hover:border-indigo-100 transition-all h-full shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 duration-500 relative overflow-hidden">
                                <div className={clsx("w-20 h-20 rounded-3xl flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform shadow-xl bg-gradient-to-br", item.gradient)}>
                                    <item.icon className="w-9 h-9" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-xl font-black text-slate-900 leading-tight">{item.title}</h3>
                                        <ArrowRight className="w-4 h-4 text-gray-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                    </div>
                                    <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-sm">{item.desc}</p>
                                </div>
                                <div className="absolute top-0 right-0 p-8 opacity-5 -translate-y-4 translate-x-4 rotate-12 group-hover:scale-125 transition-transform duration-700 pointer-events-none">
                                    <item.icon className="w-40 h-40" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
