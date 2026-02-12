import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    BarChart as ReBarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Bar,
    AreaChart,
    Area
} from 'recharts';
import {
    ArrowLeft,
    Download,
    Share2,
    Edit2,
    Save,
    FileSpreadsheet,
    FileText,
    LayoutGrid,
    Activity,
    Plus,
    ArrowUpRight,
    MoreHorizontal,
    Box,
    Target,
    FlaskConical,
    Filter,
    Trash2,
    Copy,
    Search,
    CheckCircle2,
    AlertCircle,
    ChevronDown,
    Zap,
    FileDown,
    Share,
    History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Container, Grid } from '../components/common/Layout';
import { Badge } from '../components/common/UIElements';
import { clsx } from 'clsx';

const DesignViewer = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('matrix');
    const [isEditing, setIsEditing] = useState(false);
    const [designName, setDesignName] = useState("Drug Formulation Study v2.0");

    const designInfo = {
        type: "RSM",
        description: "Optimization of tablet disintegration and dissolution rate using starch as a binder.",
        factors: [
            { id: 'T', name: 'Temperature', type: 'Continuous', min: 20, max: 80, unit: '°C' },
            { id: 'C', name: 'Concentration', type: 'Continuous', min: 0.1, max: 0.5, unit: 'mol/L' },
            { id: 'S', name: 'Stirring Speed', type: 'Continuous', min: 200, max: 800, unit: 'RPM' },
            { id: 'P', name: 'Pressure', type: 'Continuous', min: 5, max: 15, unit: 'bar' }
        ],
        runs: Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            'Temperature': (Math.random() > 0.5 ? 80 : 20),
            'Concentration': (Math.random() > 0.5 ? 0.5 : 0.1),
            'Stirring Speed': (Math.random() > 0.5 ? 800 : 200),
            'Pressure': (Math.random() * 10 + 5).toFixed(1),
            'Result 1': (Math.random() * 50 + 10).toFixed(2),
            'Result 2': (Math.random() * 20 + 80).toFixed(2)
        }))
    };

    const tabs = [
        { id: 'matrix', label: 'Design Matrix', icon: FileSpreadsheet },
        { id: 'factors', label: 'Factors', icon: Box },
        { id: 'analysis', label: 'Analysis', icon: ReBarChart },
        { id: 'export', label: 'Export', icon: FileDown },
        { id: 'activity', label: 'Activity Log', icon: History },
    ];

    return (
        <div className="space-y-10 pb-32 max-w-[1600px] mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-black/5">
                <div className="flex items-center gap-6">
                    <Link to="/dashboard">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-all group">
                            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </div>
                    </Link>
                    <div>
                        <div className="flex items-center gap-4 mb-1">
                            {isEditing ? (
                                <input
                                    value={designName}
                                    onChange={(e) => setDesignName(e.target.value)}
                                    className="text-4xl font-black text-primary bg-slate-50 border-none rounded-xl px-4 py-1 outline-none focus:ring-2 ring-primary/20"
                                />
                            ) : (
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight">{designName}</h1>
                            )}
                            <Badge variant="primary">{designInfo.type}</Badge>
                        </div>
                        <p className="text-slate-500 font-medium">Matrix ID: HP-2024-{id || '9921'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="secondary" icon={Share}>Share</Button>
                    <Button
                        onClick={() => setIsEditing(!isEditing)}
                        variant={isEditing ? 'primary' : 'secondary'}
                        icon={isEditing ? Save : Edit2}
                    >
                        {isEditing ? 'Save Changes' : 'Edit Design'}
                    </Button>
                    <Button icon={Plus}>Add Run</Button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl w-fit">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={clsx(
                            "flex items-center gap-3 px-8 py-3.5 rounded-xl text-xs font-black transition-all",
                            activeTab === tab.id
                                ? "bg-white text-primary shadow-lg"
                                : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                {activeTab === 'matrix' && (
                    <motion.div key="table" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <Card className="p-0 overflow-hidden border-none shadow-3xl shadow-black/5 rounded-[2.5rem]">
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white">
                                <div className="flex items-center gap-4">
                                    <div className="relative group">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                        <input placeholder="Filter results..." className="bg-slate-50 border-none rounded-xl py-3 pl-11 pr-6 text-sm font-bold outline-none w-64 focus:ring-2 ring-primary/10" />
                                    </div>
                                    <Button variant="secondary" size="sm" icon={Filter}>Filters</Button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Sort by:</span>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg text-[10px] font-black uppercase text-slate-600">Run Number <ChevronDown className="w-3 h-3" /></button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                            <th className="px-8 py-6">Run</th>
                                            {designInfo.factors.map(f => <th key={f.id} className="px-6 py-6 font-black">{f.name}</th>)}
                                            <th className="px-6 py-6 text-primary">Response 1</th>
                                            <th className="px-8 py-6 text-secondary text-right">Response 2</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {designInfo.runs.map((run, i) => (
                                            <tr key={run.id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                                                <td className="px-8 py-6 font-black text-slate-400 group-hover:text-primary">{run.id < 10 ? `0${run.id}` : run.id}</td>
                                                {designInfo.factors.map(f => (
                                                    <td key={f.id} className="px-6 py-6">
                                                        <span className={clsx(
                                                            "px-3 py-1.5 rounded-lg font-mono text-xs font-black",
                                                            run[f.name] == f.max ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                                                        )}>
                                                            {run[f.name]}
                                                        </span>
                                                    </td>
                                                ))}
                                                <td className="px-6 py-6">
                                                    <input
                                                        defaultValue={run['Result 1']}
                                                        disabled={!isEditing}
                                                        className={clsx(
                                                            "w-24 bg-transparent border-none outline-none font-mono text-sm font-black text-primary",
                                                            isEditing && "bg-white ring-4 ring-primary/5 rounded-lg px-2"
                                                        )}
                                                    />
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <input
                                                        defaultValue={run['Result 2']}
                                                        disabled={!isEditing}
                                                        className={clsx(
                                                            "w-24 bg-transparent border-none outline-none font-mono text-sm font-black text-secondary text-right",
                                                            isEditing && "bg-white ring-4 ring-secondary/5 rounded-lg px-2"
                                                        )}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {activeTab === 'factors' && (
                    <motion.div key="factors" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <Grid cols={2} gap={8}>
                            {designInfo.factors.map((f, i) => (
                                <Card key={i} hoverable className="p-10 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                                        <Box className="w-40 h-40" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                                <Target className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-black text-slate-900 leading-tight">{f.name}</h4>
                                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{f.type} Variable</p>
                                            </div>
                                        </div>
                                        <Grid cols={2} gap={6}>
                                            <div className="p-6 bg-slate-50 rounded-2xl">
                                                <span className="block text-[8px] font-black uppercase text-slate-400 tracking-widest mb-2">Lower Limit (-1)</span>
                                                <span className="text-2xl font-black text-slate-900">{f.min} <span className="text-xs text-slate-400">{f.unit}</span></span>
                                            </div>
                                            <div className="p-6 bg-slate-50 rounded-2xl">
                                                <span className="block text-[8px] font-black uppercase text-slate-400 tracking-widest mb-2">Upper Limit (+1)</span>
                                                <span className="text-2xl font-black text-slate-900">{f.max} <span className="text-xs text-slate-400">{f.unit}</span></span>
                                            </div>
                                        </Grid>
                                    </div>
                                </Card>
                            ))}
                            <button className="h-full min-h-[200px] border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-slate-300 hover:text-primary hover:border-primary/30 transition-all group">
                                <Plus className="w-10 h-10 group-hover:rotate-90 transition-transform" />
                                <span className="text-sm font-black uppercase tracking-widest">Add New Factor</span>
                            </button>
                        </Grid>
                    </motion.div>
                )}

                {activeTab === 'analysis' && (
                    <motion.div key="analysis" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-12">
                        <Grid cols={2} gap={8}>
                            <Card className="p-10 border-none shadow-xl bg-white">
                                <h4 className="text-xl font-black mb-8">Pareto of Standardized Effects</h4>
                                <div className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ReBarChart data={[
                                            { name: 'Temp', val: 12.4 },
                                            { name: 'Conc', val: 8.2 },
                                            { name: 'Stir', val: 5.1 },
                                            { name: 'T*C', val: 3.2 },
                                            { name: 'T*S', val: 1.2 }
                                        ]} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" stroke="#94A3B8" fontWeight="bold" fontSize={10} axisLine={false} tickLine={false} />
                                            <Tooltip cursor={{ fill: 'transparent' }} />
                                            <Bar dataKey="val" radius={[0, 8, 8, 0]}>
                                                {[0, 1, 2, 3, 4].map(i => <Cell key={i} fill={i === 0 ? '#1E40AF' : i === 1 ? '#7C3AED' : '#14B8A6'} fillOpacity={0.8} />)}
                                            </Bar>
                                        </ReBarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                            <Card className="p-0 border-none shadow-xl overflow-hidden bg-white">
                                <div className="p-8 border-b border-slate-50"><h4 className="text-xl font-black">ANOVA Table</h4></div>
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-400 font-black uppercase tracking-widest">
                                            <th className="px-8 py-5">Source</th>
                                            <th className="px-6 py-5">DF</th>
                                            <th className="px-6 py-5">F-Val</th>
                                            <th className="px-8 py-5 text-right">P-Val</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {[
                                            { s: 'Model', df: 3, f: 12.4, p: 0.001 },
                                            { s: 'A-Temp', df: 1, f: 20.2, p: 0.0004 },
                                            { s: 'B-Conc', df: 1, f: 10.8, p: 0.008 }
                                        ].map((r, i) => (
                                            <tr key={i}>
                                                <td className="px-8 py-5 font-black">{r.s}</td>
                                                <td className="px-6 py-5 font-bold text-slate-500">{r.df}</td>
                                                <td className="px-6 py-5 font-mono">{r.f}</td>
                                                <td className="px-8 py-5 text-right">
                                                    <Badge variant={r.p < 0.05 ? 'primary' : 'secondary'}>{r.p}</Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Card>
                        </Grid>
                        <Card className="p-12 relative overflow-hidden bg-slate-900 text-white border-none rounded-[3rem]">
                            <div className="absolute top-0 right-0 p-12 opacity-10"><Zap className="w-48 h-48" /></div>
                            <div className="relative z-10 max-w-2xl">
                                <Badge variant="white" className="mb-6 bg-white/10 border-white/20">AI Insight Engine</Badge>
                                <h3 className="text-3xl font-black mb-6">Optimization Strategy Detected</h3>
                                <p className="text-lg text-slate-400 leading-relaxed mb-10">Temperature (A) exhibits a <span className="text-white font-black underline decoration-accent">highly significant quadratic effect</span>. Dissolution rate is maximized at 68°C when paired with high Concentration levels.</p>
                                <Button className="px-10 h-14 bg-white text-primary font-black">Execute Auto-Optimization</Button>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {activeTab === 'export' && (
                    <motion.div key="export" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="max-w-4xl mx-auto">
                        <Grid cols={2} gap={8}>
                            {[
                                { title: 'Excel Matrix', icon: FileSpreadsheet, ext: '.xlsx', color: 'bg-green-600' },
                                { title: 'PDF Report', icon: FileText, ext: '.pdf', color: 'bg-red-600' },
                                { title: 'Raw Dataset', icon: Database, ext: '.csv', color: 'bg-blue-600' },
                                { title: 'Analysis Pack', icon: ReBarChart, ext: '.zip', color: 'bg-purple-600' }
                            ].map((opt, i) => (
                                <Card key={i} hoverable className="p-10 flex items-center gap-8 group">
                                    <div className={clsx("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/10 transition-transform group-hover:rotate-12", opt.color)}>
                                        <opt.icon className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-black mb-1">{opt.title}</h4>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{opt.ext} format</p>
                                        <Button variant="ghost" className="mt-4 -ml-4 py-2 hover:bg-slate-50 font-black text-[10px] uppercase tracking-widest text-primary">Download Now</Button>
                                    </div>
                                </Card>
                            ))}
                        </Grid>
                    </motion.div>
                )}

                {activeTab === 'activity' && (
                    <motion.div key="activity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
                        <Card className="p-12 border-none shadow-xl bg-white rounded-[2.5rem]">
                            <div className="space-y-12 relative border-l-2 border-slate-50 ml-5 pl-10">
                                {[
                                    { action: 'Updated Response 1 for Run 08', user: 'Antigravity', time: '12 mins ago', icon: Edit2, color: 'text-primary' },
                                    { action: 'Matrix generated via RSM Engine', user: 'System', time: '2 hours ago', icon: Zap, color: 'text-secondary' },
                                    { action: 'Project workspace initialized', user: 'Antigravity', time: '1 day ago', icon: Plus, color: 'text-success' }
                                ].map((item, i) => (
                                    <div key={i} className="relative">
                                        <div className={clsx("absolute -left-[54px] top-0 w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-100 shadow-sm", item.color)}>
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 mb-1">{item.action}</p>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">By {item.user}</span>
                                                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DesignViewer;
