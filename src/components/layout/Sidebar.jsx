import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderOpen,
    PlusCircle,
    FileText,
    BarChart3,
    Settings,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Database,
    Zap
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const menuItems = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/workspace', icon: Zap, label: 'Workspace', premium: true },
        { to: '/designs', icon: FolderOpen, label: 'My Designs' },
        { to: '/create', icon: PlusCircle, label: 'Create New' },
        { to: '/templates', icon: FileText, label: 'Templates' },
        { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    ];

    const bottomItems = [
        { to: '/settings', icon: Settings, label: 'Settings' },
        { to: '/help', icon: HelpCircle, label: 'Help & Support' },
        { to: '/privacy', icon: FileText, label: 'Privacy' },
        { to: '/terms', icon: FileText, label: 'Terms' },
    ];

    return (
        <motion.aside
            initial={false}
            animate={{ width: isOpen ? 280 : 88 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white border-r border-gray-100 flex flex-col z-[50] relative overflow-hidden h-screen"
        >
            {/* Subtle Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/20 via-white to-white pointer-events-none" />

            {/* Logo Area */}
            <div className={`h-24 flex items-center mb-6 transition-all duration-300 ${isOpen ? 'px-8' : 'justify-center px-0'}`}>
                <NavLink to="/dashboard" className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-purple to-secondary flex items-center justify-center text-white shadow-lg shadow-indigo-100 group-hover:rotate-6 transition-transform">
                        <img src="/logo-icon.png" alt="Hyperplott" className="w-5 h-5 object-contain" />
                    </div>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="text-xl font-bold text-text-primary tracking-tight font-display"
                            >
                                Hyperplott
                            </motion.span>
                        )}
                    </AnimatePresence>
                </NavLink>
            </div>

            {/* Navigation Section */}
            <div className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.to}
                        className={({ isActive }) => twMerge(
                            "flex items-center gap-4 px-4 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all group relative",
                            isActive
                                ? "bg-indigo-50/50 text-primary-purple"
                                : "text-text-tertiary hover:text-text-primary hover:bg-gray-50"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={twMerge(
                                    "w-5 h-5 transition-transform group-hover:scale-110",
                                    isActive ? "text-primary-purple" : "text-text-muted group-hover:text-text-primary"
                                )} />
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center justify-between flex-1"
                                    >
                                        <span>{item.label}</span>
                                        {item.premium && (
                                            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                                        )}
                                    </motion.div>
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary-purple"
                                    />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}

                <div className="my-6 border-t border-gray-100 mx-2" />

                {bottomItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.to}
                        className={({ isActive }) => twMerge(
                            "flex items-center gap-4 px-4 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all group",
                            isActive
                                ? "bg-gray-50 text-text-primary"
                                : "text-text-tertiary hover:text-text-primary hover:bg-gray-50"
                        )}
                    >
                        <item.icon className="w-5 h-5 text-text-muted group-hover:text-text-primary" />
                        {isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{item.label}</motion.span>}
                    </NavLink>
                ))}
            </div>

            {/* Capacity Card */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mx-4 mb-6 p-6 rounded-[2rem] bg-gradient-to-br from-gray-900 to-slate-800 text-white shadow-xl relative overflow-hidden group"
                    >
                        <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <Zap className="w-32 h-32 text-indigo-400" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <Database className="w-3.5 h-3.5 text-indigo-400" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-200">Matrix Capacity</span>
                            </div>

                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-2xl font-black">458</span>
                                <span className="text-xs text-indigo-300 font-bold">/ 1024</span>
                            </div>

                            <div className="w-full h-1.5 bg-white/10 rounded-full mb-6 relative overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '45%' }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.5)]"
                                />
                            </div>

                            <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95">
                                Upgrade Storage
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Collapse Toggle */}
            <div className={`p-4 mt-auto border-t border-gray-50 flex ${isOpen ? 'justify-end' : 'justify-center'}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-text-muted hover:text-primary-purple hover:bg-indigo-50 transition-all border border-gray-100"
                >
                    {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
