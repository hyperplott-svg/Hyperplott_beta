import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ bannerActive }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);
            setHidden(currentScrollY > lastScrollY && currentScrollY > 100);
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { name: 'Features', href: '/#features', type: 'anchor' },
        { name: 'Pricing', href: '/pricing', type: 'link' },
        { name: 'About', href: '/about', type: 'link' },
        { name: 'Docs', href: '/#docs', type: 'anchor' },
    ];

    return (
        <>
            <motion.nav
                variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
                animate={hidden ? 'hidden' : 'visible'}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ top: bannerActive ? '36px' : '0px' }}
                className={`fixed left-0 right-0 z-50 h-[80px] flex items-center transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-slate-200 shadow-lg' : 'bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Logo Area */}
                    <Link to="/" className="flex items-center gap-3 group relative">
                        <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-purple to-primary p-[1px] shadow-lg">
                            <div className="w-full h-full bg-white rounded-[15px] flex items-center justify-center overflow-hidden">
                                <img src="/logo-icon.png" alt="Hyperplott" className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-500" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">
                                    Hyperplott
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-primary-purple/10 text-primary-purple text-[8px] font-black uppercase tracking-widest">Beta</span>
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Scientific AI</span>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-1 bg-slate-100/50 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-slate-200 shadow-sm">
                        {navLinks.map((link) => (
                            link.type === 'link' ? (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="px-6 py-2 text-[12px] font-black uppercase tracking-[0.15em] text-slate-500 hover:text-primary-purple transition-all rounded-xl hover:bg-white"
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="px-6 py-2 text-[12px] font-black uppercase tracking-[0.15em] text-slate-500 hover:text-primary-purple transition-all rounded-xl hover:bg-white"
                                >
                                    {link.name}
                                </a>
                            )
                        ))}
                    </div>

                    {/* Action Group */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login" className="text-[12px] font-black uppercase tracking-[0.15em] text-slate-500 hover:text-slate-900 transition-all px-6 py-2.5 rounded-xl hover:bg-slate-100">
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="relative group px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-purple to-primary text-white text-[12px] font-black uppercase tracking-[0.1em] shadow-lg shadow-primary-purple/20 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Join Beta
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                        </Link>
                    </div>

                    {/* Modern Mobile Menu Trigger */}
                    <button
                        className="md:hidden relative z-50 w-11 h-11 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <div className="w-6 h-5 relative flex flex-col justify-between items-center">
                            <motion.span
                                animate={mobileMenuOpen ? { rotate: 45, y: 9, backgroundColor: "#7c3aed" } : { rotate: 0, y: 0, backgroundColor: "#64748b" }}
                                className="w-full h-[2px] rounded-full transition-colors"
                            />
                            <motion.span
                                animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0, backgroundColor: "#64748b" }}
                                className="w-full h-[2px] rounded-full transition-colors"
                            />
                            <motion.span
                                animate={mobileMenuOpen ? { rotate: -45, y: -9, backgroundColor: "#7c3aed" } : { rotate: 0, y: 0, backgroundColor: "#64748b" }}
                                className="w-full h-[2px] rounded-full transition-colors"
                            />
                        </div>
                    </button>
                </div>
            </motion.nav>

            {/* Premium Mobile Menu */}
            <AnimatePresence mode="wait">
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[49] bg-white/95 backdrop-blur-2xl lg:hidden flex flex-col"
                    >
                        {/* Background Decorative Elements */}
                        <div className="absolute top-0 right-0 w-[100%] h-[100%] bg-gradient-to-br from-primary-purple/5 via-transparent to-primary/5 pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none"
                            style={{
                                backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                                backgroundSize: '40px 40px'
                            }}
                        />

                        <div className="container mx-auto px-8 pt-28 pb-12 flex flex-col h-full relative z-10">
                            {/* Mobile Links */}
                            <nav className="flex flex-col border-t border-slate-100">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.4 }}
                                    >
                                        {link.type === 'link' ? (
                                            <Link
                                                to={link.href}
                                                className="group flex items-center justify-between py-6 border-b border-slate-50"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[10px] font-black text-primary-purple bg-primary-purple/10 w-6 h-6 rounded-full flex items-center justify-center">0{i + 1}</span>
                                                    <span className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-primary-purple transition-all">
                                                        {link.name}
                                                    </span>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-primary-purple group-hover:bg-primary-purple/5 transition-all">
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </Link>
                                        ) : (
                                            <a
                                                href={link.href}
                                                className="group flex items-center justify-between py-6 border-b border-slate-50"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[10px] font-black text-primary-purple bg-primary-purple/10 w-6 h-6 rounded-full flex items-center justify-center">0{i + 1}</span>
                                                    <span className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-primary-purple transition-all">
                                                        {link.name}
                                                    </span>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-primary-purple group-hover:bg-primary-purple/5 transition-all">
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </a>
                                        )}
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Mobile Actions */}
                            <div className="mt-auto space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Link
                                        to="/login"
                                        className="w-full flex items-center justify-center p-5 bg-white border border-slate-200 rounded-2xl text-slate-900 font-bold text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-slate-50 transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Link
                                        to="/signup"
                                        className="w-full flex items-center justify-center p-5 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 active:scale-[0.98] transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Join Beta
                                    </Link>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="pt-8 grid grid-cols-2 gap-4 border-t border-slate-100"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</span>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">v4.2.0 Stable</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Network</span>
                                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Registry Active</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
