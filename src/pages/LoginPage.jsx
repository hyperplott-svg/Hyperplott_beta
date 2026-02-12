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
            <div className="min-h-screen grid lg:grid-cols-2 bg-white overflow-hidden font-sans">
                {/* Left Side: Professional Branding & Visuals */}
                <div className="hidden lg:flex flex-col justify-between p-16 relative bg-gradient-hero overflow-hidden border-r border-gray-100">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 z-0 opacity-30"
                        style={{
                            backgroundImage: 'radial-gradient(#6366F1 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Logo Section */}
                    <div className="relative z-10">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-purple to-secondary flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
                                <img src="/logo-icon.png" alt="Hyperplott" className="w-5 h-5 object-contain" />
                            </div>
                            <span className="text-2xl font-bold text-text-primary tracking-tight font-display">Hyperplott</span>
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
                            <h2 className="text-4xl font-black text-text-primary mb-6 leading-tight tracking-tight font-display">
                                Optimize your research with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">AI-driven Design</span>.
                            </h2>

                            <div className="inline-flex flex-col items-center p-8 bg-white/50 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl shadow-indigo-100/50">
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
                <div className="flex items-center justify-center p-8 lg:p-20 bg-white relative">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-[120px] -z-10" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50/50 rounded-full blur-[100px] -z-10" />

                    <div className="w-full max-w-md">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-10 text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-primary-purple rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-indigo-100">
                                <Zap className="w-3 h-3 fill-primary-purple" /> SECURE LABORATORY ACCESS
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black text-text-primary mb-4 tracking-tight font-display">
                                Welcome Back
                            </h1>
                            <p className="text-text-secondary font-medium">Please enter your credentials to access the researcher dashboard.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="bg-white p-1 md:p-2 rounded-[2.5rem]">
                                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-[0.15em] ml-1">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary-purple transition-colors" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="scientist@institution.edu"
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:bg-white focus:border-primary-purple/30 transition-all font-semibold text-text-primary placeholder:text-text-muted/50"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between px-1 mb-1">
                                            <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-[0.15em]">Access Key</label>
                                            <a href="#" className="text-[10px] font-bold uppercase text-primary-purple hover:underline tracking-wider">Forgot?</a>
                                        </div>
                                        <div className="relative group">
                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary-purple transition-colors" />
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••••••"
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:bg-white focus:border-primary-purple/30 transition-all font-semibold text-text-primary placeholder:text-text-muted/50"
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

                                    <button type="submit" className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary-purple to-secondary text-white text-lg font-bold shadow-xl shadow-indigo-100 hover:shadow-indigo-300 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 group">
                                        Initialize Session
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </button>

                                    <div className="relative py-4 flex items-center">
                                        <div className="flex-1 border-t border-gray-100" />
                                        <span className="px-6 text-[10px] font-black uppercase text-text-muted tracking-[0.3em]">OR CONTINUE WITH</span>
                                        <div className="flex-1 border-t border-gray-100" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={handleGoogleSignIn}
                                            className="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-text-secondary text-xs uppercase tracking-widest shadow-sm"
                                        >
                                            <Chrome className="w-4 h-4 text-red-500" /> Google
                                        </button>
                                        <button type="button" className="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-text-secondary text-xs uppercase tracking-widest shadow-sm">
                                            <Github className="w-4 h-4" /> GitHub
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="mt-12 text-center">
                                <p className="text-sm font-medium text-text-secondary">
                                    New to Hyperplott Laboratory? <Link to="/signup" className="text-primary-purple font-black hover:underline px-1">Create Research Identity</Link>
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
