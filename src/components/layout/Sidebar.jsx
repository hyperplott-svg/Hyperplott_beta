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
        { to: '/workspace', icon: Zap, label: 'DoE Engine' },
        { to: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <>
            {/* Mobile Overlay Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[45] lg:hidden"
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial={false}
                animate={{
                    width: isOpen ? 280 : 88,
                    x: isOpen ? 0 : (window.innerWidth < 1024 ? -280 : 0)
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={twMerge(
                    "bg-white border-r border-gray-100 flex flex-col z-[50] relative overflow-hidden h-screen",
                    "fixed lg:relative inset-y-0 left-0"
                )}
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
                                            className="flex-1"
                                        >
                                            <span>{item.label}</span>
                                        </motion.div>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>



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
        </>
    );
};

export default Sidebar;
