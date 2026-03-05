import React, { useState } from 'react';
import {
    Search,
    Bell,
    User,
    LogOut,
    Settings as SettingsIcon,
    ChevronDown,
    HelpCircle,
    Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        setIsUserMenuOpen(false);
        try {
            await logout();
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    // Derive display name from Firebase user
    const displayName = user?.displayName || user?.email?.split('@')[0] || 'Researcher';
    const displayEmail = user?.email || 'guest@hyperplott.com';
    const initials = displayName.slice(0, 2).toUpperCase();

    return (
        <header className="h-16 md:h-20 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-[40] shadow-sm shadow-slate-100/60">
            {/* Left: Sidebar toggle + Home */}
            <div className="flex items-center gap-2 md:gap-3">
                <button
                    onClick={toggleSidebar}
                    className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-all lg:hidden"
                    aria-label="Toggle sidebar"
                >
                    <div className="w-5 h-5 flex flex-col justify-between gap-1.5">
                        <span className="w-full h-0.5 bg-current rounded-full" />
                        <span className="w-3.5 h-0.5 bg-current rounded-full" />
                        <span className="w-full h-0.5 bg-current rounded-full" />
                    </div>
                </button>

                <Link
                    to="/"
                    className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-primary-purple hover:bg-indigo-50 hover:border-indigo-100 transition-all group"
                    title="Back to Landing Page"
                >
                    <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Home</span>
                </Link>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
                <div className="relative group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-purple transition-colors" />
                    <input
                        type="text"
                        placeholder="Search experiments..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50/50 transition-all text-sm font-medium text-text-primary placeholder:text-text-muted/50"
                    />
                </div>
            </div>

            {/* Right: Actions + User */}
            <div className="flex items-center gap-1 md:gap-2">
                <button className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-text-primary transition-all relative" aria-label="Notifications">
                    <div className="absolute top-2 right-2 w-2 h-2 bg-primary-purple rounded-full border-2 border-white" />
                    <Bell className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                </button>

                <Link to="/help" className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-text-primary transition-all hidden sm:flex items-center justify-center" aria-label="Help">
                    <HelpCircle className="w-[18px] h-[18px]" />
                </Link>

                <div className="w-px h-6 bg-gray-100 mx-1 hidden sm:block" />

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center gap-2 md:gap-2.5 p-1.5 rounded-2xl hover:bg-gray-50 transition-all group"
                    >
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-primary-purple to-primary flex items-center justify-center text-white font-black text-xs shadow-md overflow-hidden shrink-0">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt={displayName} className="w-full h-full object-cover" />
                            ) : (
                                <span>{initials}</span>
                            )}
                        </div>
                        <div className="hidden lg:block text-left">
                            <p className="text-xs font-black text-slate-900 leading-none mb-0.5 max-w-[100px] truncate">{displayName}</p>
                            <p className="text-[10px] font-bold text-slate-400 max-w-[100px] truncate">{displayEmail}</p>
                        </div>
                        <ChevronDown className={clsx("w-3.5 h-3.5 text-gray-400 transition-transform duration-200", isUserMenuOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                        {isUserMenuOpen && (
                            <>
                                {/* Backdrop */}
                                <div className="fixed inset-0 z-[39]" onClick={() => setIsUserMenuOpen(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-gray-100 overflow-hidden z-[40]"
                                >
                                    {/* User info header */}
                                    <div className="p-4 border-b border-gray-50 bg-gradient-to-b from-slate-50/80 to-white">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-purple to-primary flex items-center justify-center text-white font-black text-sm shadow-sm overflow-hidden shrink-0">
                                                {user?.photoURL ? (
                                                    <img src={user.photoURL} alt={displayName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span>{initials}</span>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-black text-slate-900 truncate">{displayName}</p>
                                                <p className="text-[10px] font-medium text-slate-400 truncate">{displayEmail}</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white border border-slate-100">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Beta Researcher</span>
                                        </div>
                                    </div>

                                    <div className="p-2">
                                        <Link to="/settings" onClick={() => setIsUserMenuOpen(false)}>
                                            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-text-secondary hover:bg-indigo-50 hover:text-primary-purple transition-all">
                                                <User className="w-4 h-4" /> Profile Settings
                                            </button>
                                        </Link>
                                        <Link to="/settings" onClick={() => setIsUserMenuOpen(false)}>
                                            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-text-secondary hover:bg-indigo-50 hover:text-primary-purple transition-all">
                                                <SettingsIcon className="w-4 h-4" /> Workspace Config
                                            </button>
                                        </Link>
                                        <div className="h-px bg-gray-100 my-1.5 mx-2" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black text-red-500 hover:bg-red-50 transition-all"
                                        >
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Header;
