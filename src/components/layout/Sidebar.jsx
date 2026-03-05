import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Settings,
    ChevronLeft,
    ChevronRight,
    Zap
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const menuItems = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/workspace', icon: Zap, label: 'DoE Engine' },
        { to: '/settings', icon: Settings, label: 'Settings' },
    ];

    // On mobile: slide in/out. On desktop: expand/collapse width.
    const sidebarX = isMobile ? (isOpen ? 0 : -280) : 0;
    const sidebarWidth = isOpen ? 280 : (isMobile ? 280 : 88);

    return (
        <>
            {/* Mobile Overlay Backdrop */}
            <AnimatePresence>
                {isOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[45] lg:hidden"
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial={false}
                animate={{ width: sidebarWidth, x: sidebarX }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={twMerge(
                    "bg-white border-r border-gray-100 flex flex-col z-[50] relative overflow-hidden h-screen",
                    "fixed lg:relative inset-y-0 left-0"
                )}
            >
                {/* Subtle Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/20 via-white to-white pointer-events-none" />

                {/* Logo Area */}
                <div className={`h-20 md:h-24 flex items-center mb-4 md:mb-6 transition-all duration-300 ${isOpen ? 'px-6 md:px-8' : 'justify-center px-0'}`}>
                    <NavLink to="/dashboard" className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary-purple to-secondary flex items-center justify-center text-white shadow-lg shadow-indigo-100 group-hover:rotate-6 transition-transform shrink-0">
                            <img src="/logo-icon.png" alt="Hyperplott" className="w-5 h-5 object-contain" />
                        </div>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-lg md:text-xl font-bold text-text-primary tracking-tight font-display"
                                >
                                    Hyperplott
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </NavLink>
                </div>

                {/* Navigation Section */}
                <div className="flex-1 px-3 md:px-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            onClick={() => isMobile && setIsOpen(false)}
                            className={({ isActive }) => twMerge(
                                "flex items-center gap-4 px-3 md:px-4 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all group relative",
                                isActive
                                    ? "bg-indigo-50/50 text-primary-purple"
                                    : "text-text-tertiary hover:text-text-primary hover:bg-gray-50"
                            )}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={twMerge(
                                        "w-5 h-5 transition-transform group-hover:scale-110 shrink-0",
                                        isActive ? "text-primary-purple" : "text-text-muted group-hover:text-text-primary"
                                    )} />
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -8 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Collapse Toggle — desktop only */}
                <div className={`p-3 md:p-4 mt-auto border-t border-gray-50 hidden lg:flex ${isOpen ? 'justify-end' : 'justify-center'}`}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-gray-50 text-text-muted hover:text-primary-purple hover:bg-indigo-50 transition-all border border-gray-100"
                    >
                        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
