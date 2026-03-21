import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    CreditCard,
    Bell,
    Shield,
    Download,
    Building2,
    Camera,
    FlaskConical,
    Zap,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    Star
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Grid } from '../components/common/Layout';
import { Badge } from '../components/common/UIElements';
import { clsx } from 'clsx';
import SEO from '../components/common/SEO';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Settings = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    // Profile state wired to real user
    const displayName = user?.displayName || user?.email?.split('@')[0] || '';
    const [profileName, setProfileName] = useState(displayName);
    const [profileBio, setProfileBio] = useState('');
    const [profileSaving, setProfileSaving] = useState(false);
    const [profileSaved, setProfileSaved] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(user?.photoURL || null);
    const fileInputRef = useRef(null);

    const handleAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;
        try {
            if (storage) {
                const storageRef = ref(storage, `avatars/${user.uid}`);
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                await updateProfile(auth.currentUser, { photoURL: url });
                setAvatarUrl(url);
            } else {
                // No storage: show local preview only
                setAvatarUrl(URL.createObjectURL(file));
            }
        } catch (err) {
            console.error('Avatar upload error:', err);
        }
    };

    const handleProfileSave = async () => {
        if (!user) return;
        setProfileSaving(true);
        try {
            await updateProfile(auth.currentUser, { displayName: profileName });
            setProfileSaved(true);
            setTimeout(() => setProfileSaved(false), 2500);
        } catch (err) {
            console.error('Profile save error:', err);
        } finally {
            setProfileSaving(false);
        }
    };

    const sidebarItems = [
        { id: 'profile', label: 'User Profile', icon: User },
        { id: 'laboratory', label: 'Laboratory', icon: FlaskConical },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'billing', label: 'Billing', icon: CreditCard },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            <SEO
                title="Workspace Settings"
                description="Configure your Hyperplott research environment, manage your API keys, notification preferences, and laboratory credentials."
                keywords="DoE settings, research workspace, API configuration, laboratory settings"
                url="https://hyperplott.com/settings"
            />
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
                                    ? "bg-primary-purple text-white shadow-xl shadow-primary-purple/20"
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
                                <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} className="h-full bg-primary-purple" />
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
                                    <h3 className="text-2xl font-black mb-10 relative z-10">User Profile</h3>

                                    <div className="flex flex-col md:flex-row gap-12 items-start relative z-10 mb-12">
                                        {/* Avatar */}
                                        <div className="relative group/avatar shrink-0">
                                            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary-purple to-primary overflow-hidden border-4 border-white shadow-2xl flex items-center justify-center">
                                                {avatarUrl ? (
                                                    <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-4xl font-black text-white">
                                                        {(profileName || user?.email || 'U').slice(0, 2).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute -bottom-2 -right-2 p-3 bg-primary-purple text-white rounded-2xl shadow-xl shadow-primary-purple/30 group-hover/avatar:scale-110 transition-transform"
                                            >
                                                <Camera className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex-1 space-y-8 w-full">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Display Name</label>
                                                    <input
                                                        value={profileName}
                                                        onChange={e => setProfileName(e.target.value)}
                                                        className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 ring-primary/20"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                                                    <input
                                                        value={user?.email || ''}
                                                        readOnly
                                                        className="w-full bg-slate-100 border-none rounded-xl px-6 py-4 text-sm font-bold outline-none text-slate-500 cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional Bio</label>
                                                <textarea
                                                    rows={3}
                                                    value={profileBio}
                                                    onChange={e => setProfileBio(e.target.value)}
                                                    placeholder="Tell us about your research focus..."
                                                    className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 ring-primary/20 resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end gap-4 pt-10 border-t border-slate-50 relative z-10">
                                        {profileSaved && (
                                            <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-black">
                                                <CheckCircle2 className="w-4 h-4" /> Saved!
                                            </span>
                                        )}
                                        <Button onClick={handleProfileSave} disabled={profileSaving} className="px-10 h-14">
                                            {profileSaving ? 'Saving...' : 'Save Profile'}
                                        </Button>
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
                                <Card className="p-10 bg-white border border-slate-100 rounded-[2.5rem] relative overflow-hidden group shadow-lg">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/5 to-transparent pointer-events-none" />
                                    <div className="relative z-10 flex items-center justify-between gap-10">
                                        <div>
                                            <Badge variant="primary" className="mb-4 bg-primary-purple/10 text-primary-purple border-primary-purple/20">Pro Capability</Badge>
                                            <h4 className="text-xl font-black mb-2 text-slate-900">Automated Peer Review</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">Enable AI-driven validation of all experimental matrices before institutional commit.</p>
                                        </div>
                                        <div className="w-12 h-8 bg-slate-100 rounded-full relative p-1 cursor-pointer">
                                            <motion.div initial={{ x: 0 }} animate={{ x: 32 }} className="w-6 h-6 bg-primary-purple rounded-full shadow-lg" />
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
                                                <div className={clsx("w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors", n.active ? "bg-primary-purple" : "bg-slate-200")}>
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
                            <motion.div key="billing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                {/* Current Plan Banner */}
                                <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-primary-purple to-primary text-white overflow-hidden relative rounded-3xl">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                    <div className="relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[9px] font-black uppercase tracking-widest mb-4">
                                            <Star className="w-3 h-3" /> Free Beta — All Features Unlocked
                                        </div>
                                        <h3 className="text-2xl font-black mb-2 tracking-tight">You're on the Beta Plan</h3>
                                        <p className="text-white/70 text-sm font-medium mb-6 max-w-sm">
                                            All premium features are completely free during beta. Founding members lock in 50% off forever when we launch.
                                        </p>
                                        <a href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-purple font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                                            View Pricing Plans <ArrowRight className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </Card>

                                {/* Pricing Cards */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        {
                                            name: 'Researcher', price: '₹499', period: '/month',
                                            badge: null, badgeColor: '',
                                            desc: 'For individual researchers and students.',
                                            features: ['Unlimited designs', 'AI statistical analysis', '3D visualizations', 'PDF export', 'Email support'],
                                            cta: 'Upgrade After Beta', ctaStyle: 'btn-secondary',
                                        },
                                        {
                                            name: 'Professional', price: '₹1,999', period: '/month',
                                            badge: 'Most Popular', badgeColor: 'bg-primary-purple text-white',
                                            desc: 'For labs, teams, and institutions.',
                                            features: ['Everything in Researcher', '5 collaborator seats', 'Team design sharing', 'Priority AI queue', 'Dedicated support', 'Founding member discount'],
                                            cta: 'Upgrade After Beta', ctaStyle: 'btn-primary',
                                        },
                                    ].map((plan, i) => (
                                        <div key={i} className={`p-8 rounded-3xl border-2 ${i === 1 ? 'border-primary-purple/30 bg-primary-purple/5' : 'border-slate-100 bg-white'}`}>
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="text-lg font-black text-slate-900">{plan.name}</h4>
                                                {plan.badge && <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${plan.badgeColor}`}>{plan.badge}</span>}
                                            </div>
                                            <div className="flex items-end gap-1 mb-2">
                                                <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                                                <span className="text-slate-400 font-medium mb-1">{plan.period}</span>
                                            </div>
                                            <p className="text-sm text-slate-500 font-medium mb-6">{plan.desc}</p>
                                            <ul className="space-y-2.5 mb-8">
                                                {plan.features.map((f, j) => (
                                                    <li key={j} className="flex items-center gap-2.5 text-sm text-slate-600 font-medium">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {f}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button disabled className={`w-full h-12 rounded-xl font-black text-xs uppercase tracking-widest opacity-60 cursor-not-allowed flex items-center justify-center gap-2 ${plan.ctaStyle}`}>
                                                {plan.cta}
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-center text-xs text-slate-400 font-medium">
                                    Billing goes live when we exit beta. You'll be notified before any charges.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Grid>
        </div>
    );
};

export default Settings;
