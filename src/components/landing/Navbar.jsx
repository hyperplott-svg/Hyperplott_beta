import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/#pricing' },
        { name: 'Resources', href: '/#resources' },
        { name: 'Docs', href: '/#docs' },
    ];

    return (
        <>
            <motion.nav
                variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
                animate={hidden ? 'hidden' : 'visible'}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 h-[80px] flex items-center transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-slate-200 shadow-lg' : 'bg-transparent'
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

                    {/* Desktop Navigation - Centered Pill */}
                    <div className="hidden lg:flex items-center gap-1 bg-slate-100/50 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-slate-200 shadow-sm">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-6 py-2 text-[12px] font-black uppercase tracking-[0.15em] text-slate-500 hover:text-primary-purple transition-all rounded-xl hover:bg-white"
                            >
                                {link.name}
                            </a>
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
                                Start Free Trial
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                        </Link>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <button
                        className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/50 border border-white/50 text-text-primary"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </motion.nav>

            {/* Premium Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="fixed inset-0 z-[60] bg-bg-primary/98 backdrop-blur-2xl flex flex-col p-8 overflow-hidden"
                    >
                        {/* Abstract Background for Mobile Menu */}
                        <div className="absolute top-0 right-0 w-[80%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full" />
                        <div className="absolute bottom-0 left-0 w-[80%] h-[50%] bg-teal-500/5 blur-[120px] rounded-full" />

                        <div className="flex justify-between items-center mb-16 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                                    <Layers className="w-5 h-5" />
                                </div>
                                <span className="text-2xl font-black text-text-primary">Hyperplott</span>
                            </div>
                            <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4 relative z-10">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                    className="text-5xl font-black text-text-primary tracking-tight hover:text-emerald-500 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>

                        <div className="mt-auto flex flex-col gap-4 relative z-10">
                            <Link to="/login" className="w-full py-5 text-center text-white font-black text-xl border-2 border-white/10 rounded-3xl hover:bg-white/5 transition-colors">Sign In</Link>
                            <Link to="/signup" className="w-full py-6 text-center bg-emerald-500 text-slate-950 rounded-3xl font-black text-xl shadow-2xl shadow-emerald-500/20 active:scale-95 transition-transform">
                                Start Free Trial
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
