import React, { useState } from 'react';
import {
    Search,
    Bell,
    User,
    LogOut,
    Settings as SettingsIcon,
    ChevronDown,
    Command,
    HelpCircle,
    Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <header className="h-20 bg-white border-b border-gray-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-[40]">
            <div className="flex items-center gap-2 md:gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 transition-all flex items-center justify-center lg:hidden"
                >
                    <Command className="w-5 h-5" />
                </button>
                <Link
                    to="/"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all group"
                    title="Back to Landing Page"
                >
                    <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Home</span>
                </Link>
                <div className="h-8 w-px bg-gray-100 mx-2" />
            </div>

            <div className="flex-1 max-w-xl mx-auto">
                <div className="relative group hidden md:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-purple transition-colors" />
                    <input
                        type="text"
                        placeholder="Search DoE experiments or factorial matrices..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-[1.25rem] py-2.5 pl-12 pr-12 outline-none focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50/50 transition-all text-sm font-semibold text-text-primary placeholder:text-text-muted/60"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-gray-100 shadow-sm pointer-events-none">
                        <span className="text-[10px] font-bold text-gray-400">⌘</span>
                        <span className="text-[10px] font-bold text-gray-400">K</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <button className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-text-primary transition-all relative">
                        <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-secondary rounded-full border-2 border-white" />
                        <Bell className="w-5 h-5" />
                    </button>

                    <button className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-text-primary transition-all">
                        <HelpCircle className="w-5 h-5" />
                    </button>
                </div>

                <div className="h-8 w-px bg-gray-100 mx-2" />

                <div className="relative">
                    <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-gray-50 transition-all group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-sm overflow-hidden text-primary-purple font-black text-xs group-hover:bg-primary-purple group-hover:text-white transition-all">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-5 h-5" />
                            )}
                        </div>
                        <div className="hidden lg:block text-left">
                            <p className="text-xs font-black text-slate-900 leading-none mb-1">Hyperplott</p>
                            <p className="text-[10px] font-bold text-primary-purple uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-purple animate-pulse" />
                                Active Sentinel
                            </p>
                        </div>
                        <ChevronDown className={clsx("w-3.5 h-3.5 text-gray-400 transition-transform", isUserMenuOpen && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                        {isUserMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-3 w-64 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden"
                            >
                                <div className="p-6 border-b border-gray-50 bg-gray-50/30">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Laboratory Registry</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-primary-purple font-black shadow-sm">HP</div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900">Admin Instance</p>
                                            <p className="text-[10px] font-bold text-text-tertiary">Scientific Professional</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2">
                                    <Link to="/settings" onClick={() => setIsUserMenuOpen(false)}>
                                        <button className="w-full flex items-center gap-3 px-5 py-3 rounded-xl text-xs font-bold text-text-secondary hover:bg-indigo-50 hover:text-primary-purple transition-all group">
                                            <User className="w-4 h-4" /> Profile Controls
                                        </button>
                                    </Link>
                                    <Link to="/settings" onClick={() => setIsUserMenuOpen(false)}>
                                        <button className="w-full flex items-center gap-3 px-5 py-3 rounded-xl text-xs font-bold text-text-secondary hover:bg-indigo-50 hover:text-primary-purple transition-all group">
                                            <SettingsIcon className="w-4 h-4" /> Global Registry
                                        </button>
                                    </Link>
                                    <div className="h-px bg-gray-50 my-2 mx-4" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-5 py-3 rounded-xl text-xs font-black text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4" /> Terminate Session
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Header;
