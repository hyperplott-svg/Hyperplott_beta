import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Lock,
    ArrowRight,
    Chrome,
    Github,
    Zap,
    Star,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import RotatingDesign from '../components/features/design/RotatingDesign';
import SEO from '../components/common/SEO';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };

    return (
        <>
            <SEO
                title="Login"
                description="Login to your Hyperplott researcher dashboard to access and manage your experimental designs."
            />
            <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950 overflow-hidden font-sans">
                {/* Left Side: Professional Branding & Visuals */}
                <div className="hidden lg:flex flex-col justify-between p-16 relative bg-slate-950 overflow-hidden border-r border-white/5">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 z-0 opacity-10"
                        style={{
                            backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Logo Section */}
                    <div className="relative z-10">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/10 group-hover:rotate-6 transition-transform">
                                <img src="/logo-icon.png" alt="Hyperplott" className="w-5 h-5 object-contain" />
                            </div>
                            <span className="text-2xl font-black text-white tracking-tighter">Hyperplott</span>
                        </Link>
                    </div>

                    {/* Main Visual Center */}
                    <div className="relative z-10 flex flex-col items-center justify-center flex-1 py-12">
                        <div className="w-full max-w-sm aspect-square relative mb-12">
                            <RotatingDesign />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center max-w-md"
                        >
                            <h2 className="text-4xl font-black text-white mb-8 leading-tight tracking-tighter">
                                Optimize your research with <br /><span className="text-emerald-500">Scientific Intelligence.</span>
                            </h2>

                            <div className="inline-flex flex-col items-center p-8 bg-white/[0.02] backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl">
                                <div className="flex gap-1 text-yellow-400 mb-4">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-text-secondary italic font-medium leading-relaxed mb-6 text-sm">
                                    "Hyperplott transformed our laboratory workflow. We reduced formulation development time by 60% in just months."
                                </p>
                                <div className="flex items-center gap-4">
                                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&h=100&auto=format&fit=crop" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-lg" />
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-text-primary uppercase tracking-widest">Antigravity</p>
                                        <p className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider">Lead Research Assistant</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer Brand Line */}
                    <div className="relative z-10">
                        <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em]">© 2026 Hyperplott AI Laboratory • Scientific Precision Ready</p>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="flex items-center justify-center p-8 lg:p-20 bg-slate-950 relative">
                    {/* Back to Home Button */}
                    <Link
                        to="/"
                        className="absolute top-10 right-10 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all border border-white/5"
                    >
                        <ArrowRight className="w-3 h-3 rotate-180" /> Back to Home
                    </Link>

                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />

                    <div className="w-full max-w-md">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-12 text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[9px] font-black uppercase tracking-widest mb-6 border border-emerald-500/20">
                                <Zap className="w-3 h-3 fill-emerald-500" /> SECURE LABORATORY ACCESS
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tighter">
                                Welcome Back.
                            </h1>
                            <p className="text-slate-500 font-medium tracking-tight">Access your scientific credentials for the dashboard.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="p-1 md:p-2">
                                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Research Email</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="scientist@institution.edu"
                                                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 pl-14 pr-6 outline-none focus:bg-white/[0.04] focus:border-emerald-500/30 transition-all font-semibold text-white placeholder:text-slate-600"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between px-1 mb-1">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Scientific Key</label>
                                            <a href="#" className="text-[9px] font-black uppercase text-emerald-500 hover:underline tracking-widest">Forgot?</a>
                                        </div>
                                        <div className="relative group">
                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••••••"
                                                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 pl-14 pr-6 outline-none focus:bg-white/[0.04] focus:border-emerald-500/30 transition-all font-semibold text-white placeholder:text-slate-600"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between px-1">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input type="checkbox" className="peer sr-only" id="stay" />
                                                <div className="w-5 h-5 border-2 border-gray-200 rounded-lg peer-checked:bg-primary-purple peer-checked:border-primary-purple transition-all" />
                                                <div className="absolute opacity-0 peer-checked:opacity-100 transition-opacity">
                                                    <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-text-secondary group-hover:text-text-primary transition-colors select-none">Stay signed in</span>
                                        </label>
                                    </div>

                                    <button type="submit" className="w-full py-6 rounded-2xl bg-emerald-500 text-slate-950 text-xl font-black uppercase tracking-widest shadow-2xl shadow-emerald-500/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 group">
                                        Initialize Session
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>

                                    <div className="relative py-4 flex items-center">
                                        <div className="flex-1 border-t border-white/5" />
                                        <span className="px-6 text-[9px] font-black uppercase text-slate-600 tracking-[0.3em]">VALIDATE IDENTITY</span>
                                        <div className="flex-1 border-t border-white/5" />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleGoogleSignIn}
                                        className="w-full flex items-center justify-center gap-4 py-6 border border-white/5 rounded-2xl hover:bg-white/5 transition-all font-black text-white text-[11px] uppercase tracking-[0.2em] shadow-sm group"
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                            <path
                                                fill="#FFF"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                opacity="0.8"
                                            />
                                            <path
                                                fill="#FFF"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                opacity="0.6"
                                            />
                                            <path
                                                fill="#FFF"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                opacity="0.4"
                                            />
                                            <path
                                                fill="#FFF"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                opacity="0.2"
                                            />
                                        </svg>
                                        Continue with Institutional SSO
                                    </button>
                                </form>
                            </div>

                            <div className="mt-12 text-center pb-12">
                                <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                                    New to Hyperplott Laboratory? <Link to="/signup" className="text-emerald-500 hover:underline px-1">Create Research Identity</Link>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
