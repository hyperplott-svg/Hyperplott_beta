import React, { useState } from 'react';
import {
    User,
    LogOut,
    Settings as SettingsIcon,
    ChevronDown,
    Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { useAuth } from '../../context/AuthContext';

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

    const displayName = user?.displayName || user?.email?.split('@')[0] || 'Researcher';
    const displayEmail = user?.email || '';
    const initials = displayName.slice(0, 2).toUpperCase();

    return (
        <header className="h-16 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 md:px-6 flex items-center justify-between sticky top-0 z-[40] shadow-sm shadow-slate-100/60">
            {/* Left: Hamburger */}
            <button
                onClick={toggleSidebar}
                className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-all"
                aria-label="Toggle sidebar"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Right: User menu only */}
            <div className="relative">
                <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-gray-50 transition-all"
                >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-purple to-primary flex items-center justify-center text-white font-black text-xs shadow-md overflow-hidden shrink-0">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt={displayName} className="w-full h-full object-cover" />
                        ) : (
                            <span>{initials}</span>
                        )}
                    </div>
                    <ChevronDown className={clsx("w-3.5 h-3.5 text-gray-400 transition-transform duration-200", isUserMenuOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                    {isUserMenuOpen && (
                        <>
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
                                </div>

                                <div className="p-2">
                                    <Link to="/settings" onClick={() => setIsUserMenuOpen(false)}>
                                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-text-secondary hover:bg-indigo-50 hover:text-primary-purple transition-all">
                                            <User className="w-4 h-4" /> Profile Settings
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
        </header>
    );
};

export default Header;
