import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    CreditCard,
    Bell,
    Shield,
    Monitor,
    CheckCircle2,
    Download,
    Lock,
    Trash2,
    ChevronRight,
    ShieldCheck,
    Building2,
    Mail,
    Camera,
    FlaskConical,
    Settings as SettingsIcon,
    Database,
    Zap,
    Briefcase
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Container, Grid } from '../components/common/Layout';
import { Badge } from '../components/common/UIElements';
import { clsx } from 'clsx';
import SEO from '../components/common/SEO';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const sidebarItems = [
        { id: 'profile', label: 'User Profile', icon: User },
        { id: 'laboratory', label: 'Laboratory', icon: FlaskConical },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'billing', label: 'Billing', icon: CreditCard },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            <SEO title="Settings" />
            <div className="flex items-center justify-between px-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Workspace Controls</h1>
                    <p className="text-slate-500 font-medium">Configure your research environment and laboratory credentials.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="primary" className="py-2 px-4 bg-primary/10 border-primary/20">Version 2.4.0-Stable</Badge>
                </div>
            </div>

            <Grid cols="25-75" gap={12}>
                {/* Sidebar Navigation */}
                <div className="space-y-2">
                    {sidebarItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={clsx(
                                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black transition-all",
                                activeTab === item.id
                                    ? "bg-primary text-white shadow-xl shadow-primary/20"
                                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                    <div className="pt-10 border-t border-slate-100 mt-6 hidden lg:block">
                        <div className="p-6 bg-slate-50 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform"><Zap className="w-16 h-16" /></div>
                            <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Storage Status</p>
                            <div className="flex items-end justify-between mb-2">
                                <span className="text-xl font-black">45%</span>
                                <span className="text-[10px] font-bold text-slate-400">458 / 1024 Plots</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} className="h-full bg-primary" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Pane */}
                <div className="min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'profile' && (
                            <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <Card className="p-12 border-none shadow-xl bg-white overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-12 opacity-5"><User className="w-64 h-64" /></div>
                                    <h3 className="text-2xl font-black mb-10 relative z-10">Institutional Identity</h3>

                                    <div className="flex flex-col md:flex-row gap-12 items-start relative z-10 mb-12">
                                        <div className="relative group/avatar">
                                            <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 overflow-hidden border-4 border-white shadow-2xl">
                                                <img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-full h-full object-cover" />
                                            </div>
                                            <button className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl shadow-xl shadow-primary/30 group-hover/avatar:scale-110 transition-transform">
                                                <Camera className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex-1 space-y-8 w-full">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Display Name</label>
                                                    <input defaultValue="Antigravity Agent" className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 ring-primary/20" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                                                    <input defaultValue="antigravity@hyperplott.ai" className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 ring-primary/20" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional Bio</label>
                                                <textarea rows={3} defaultValue="Lead pharmaceutical researcher focused on optimizing drug formulation matrices through randomized orthogonal designs." className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 ring-primary/20 resize-none" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-10 border-t border-slate-50 relative z-10">
                                        <Button className="px-10 h-14">Save Identity</Button>
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {activeTab === 'laboratory' && (
                            <motion.div key="lab" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <Card className="p-12 border-none shadow-xl bg-white">
                                    <h3 className="text-2xl font-black mb-10">Laboratory Protocols</h3>
                                    <div className="space-y-10">
                                        <div className="grid md:grid-cols-2 gap-10">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution Name</label>
                                                <input defaultValue="Bio-Science Global Labs" className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 text-sm font-black outline-none focus:ring-2 ring-primary/20" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Preferred Methodology</label>
                                                <select className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 text-sm font-black outline-none cursor-pointer">
                                                    <option>Factorial (Screening)</option>
                                                    <option selected>Response Surface (Optimization)</option>
                                                    <option>Taguchi (Robust Design)</option>
                                                    <option>Mixture (Formulations)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group">
                                            <div className="flex gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm"><Building2 className="w-8 h-8" /></div>
                                                <div>
                                                    <p className="text-lg font-black text-slate-900 mb-1">Laboratory Seal / Logo</p>
                                                    <p className="text-xs font-medium text-slate-500">Auto-appended to all generated PDF clinical reports.</p>
                                                </div>
                                            </div>
                                            <Button variant="secondary" size="sm">Replace Seal</Button>
                                        </div>
                                        <div className="flex justify-end pt-10 border-t border-slate-50">
                                            <Button className="px-10 h-14">Update Lab Rules</Button>
                                        </div>
                                    </div>
                                </Card>
                                <Card className="p-10 bg-slate-900 text-white border-none rounded-[2.5rem] relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent pointer-events-none" />
                                    <div className="relative z-10 flex items-center justify-between gap-10">
                                        <div>
                                            <Badge variant="white" className="mb-4 bg-white/10 border-white/20">Pro Capability</Badge>
                                            <h4 className="text-xl font-black mb-2">Automated Peer Review</h4>
                                            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">Enable AI-driven validation of all experimental matrices before institutional commit.</p>
                                        </div>
                                        <div className="w-16 h-8 bg-slate-800 rounded-full relative p-1 cursor-pointer">
                                            <motion.div initial={{ x: 0 }} animate={{ x: 32 }} className="w-6 h-6 bg-primary rounded-full shadow-lg" />
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {activeTab === 'notifications' && (
                            <motion.div key="notif" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <Card className="p-12 border-none shadow-xl bg-white">
                                    <h3 className="text-2xl font-black mb-10">Observer Alerts</h3>
                                    <div className="space-y-6">
                                        {[
                                            { title: 'Experimental Completion', desc: 'Notify when the Sentinel engine finishes matrix generation.', icon: Zap, active: true },
                                            { title: 'Collaborator Interaction', desc: 'Alert when a peer modifies a laboratory script.', icon: User, active: true },
                                            { title: 'System Security Pulse', desc: 'Weekly audit of vault access logs and sentinel heartbeats.', icon: Shield, active: false },
                                            { title: 'Treasury Notifications', desc: 'Receipts and institutional billing cycle alerts.', icon: CreditCard, active: true }
                                        ].map((n, i) => (
                                            <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                                <div className="flex gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                                        <n.icon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900 leading-tight">{n.title}</p>
                                                        <p className="text-[10px] font-medium text-slate-500 mt-1">{n.desc}</p>
                                                    </div>
                                                </div>
                                                <div className={clsx("w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors", n.active ? "bg-primary" : "bg-slate-300")}>
                                                    <div className={clsx("w-4 h-4 bg-white rounded-full shadow-lg transition-transform", n.active ? "translate-x-6" : "translate-x-0")} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {/* Security and Billing would follow similar premium patterns */}
                        {activeTab === 'security' && (
                            <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <Card className="p-12 border-none shadow-xl bg-white">
                                    <h3 className="text-2xl font-black mb-10">Sentinel Access Override</h3>
                                    <div className="space-y-8">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Sentinel Phase</label>
                                                <input type="password" placeholder="••••••••••••" className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 text-sm font-bold outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Sentinel Phase</label>
                                                <input type="password" placeholder="••••••••••••" className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 text-sm font-bold outline-none" />
                                            </div>
                                        </div>
                                        <div className="p-8 bg-red-50 rounded-[2.5rem] border border-red-100 flex items-center justify-between">
                                            <div>
                                                <h4 className="text-lg font-black text-red-600 mb-1">Terminal Deactivation</h4>
                                                <p className="text-xs font-medium text-red-500/70">Permanently erase vault contents. Irreversible action.</p>
                                            </div>
                                            <button className="px-8 h-12 bg-red-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl">Execute</button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {activeTab === 'billing' && (
                            <motion.div key="billing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <Card className="p-0 border-none shadow-xl bg-white overflow-hidden rounded-[2.5rem]">
                                    <div className="p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 group-hover:rotate-12 transition-transform duration-1000"><CreditCard className="w-48 h-48" /></div>
                                        <Badge variant="white" className="mb-6 bg-white/10 border-white/20">Active Subscription</Badge>
                                        <h3 className="text-4xl font-black mb-4 tracking-tight">Professional Institutional</h3>
                                        <p className="text-slate-400 font-medium mb-10 leading-relaxed max-w-sm">Your license covers unlimited matrices and up to 5 institutional collaborators.</p>
                                        <div className="flex items-center gap-4">
                                            <Button className="bg-white text-slate-900 font-black px-8">Manage Billing</Button>
                                            <Button variant="ghost" className="text-white border-white/20">View Ledger</Button>
                                        </div>
                                    </div>
                                    <div className="p-12">
                                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-10">Ledger History</h4>
                                        <table className="w-full text-left">
                                            <tbody>
                                                {[1, 2, 3].map(i => (
                                                    <tr key={i} className="border-b border-slate-50 last:border-none">
                                                        <td className="py-6 font-black text-sm text-slate-900">Professional Plan Renewal</td>
                                                        <td className="py-6 text-sm font-bold text-slate-500">Jan 12, 202{4 - i}</td>
                                                        <td className="py-6 text-sm font-black text-primary text-right">₹19,999</td>
                                                        <td className="py-6 text-right pl-6"><button className="p-2.5 rounded-lg bg-slate-50 text-slate-400 hover:text-primary transition-all"><Download className="w-4 h-4" /></button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Grid>
        </div>
    );
};

export default Settings;
