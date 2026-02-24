import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Lock,
    ArrowRight,
    Zap,
    Star,
    CheckCircle,
    Shield,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/common/SEO';
import RotatingDesign from '../components/features/design/RotatingDesign';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { loginDemo, loginEmail } = useAuth();

    const handleDemoLogin = () => {
        setIsLoading(true);
        setError('');
        setTimeout(() => {
            loginDemo();
            navigate('/dashboard');
            setIsLoading(false);
        }, 800);
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError('');
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (error) {
            console.error("Error signing in with Google: ", error);
            setError('Google authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await loginEmail(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const trustItems = [
        "Validated Algorithms",
        "Enterprise Security",
        "Industry Standards"
    ];

    return (
        <>
            <SEO
                title="Login"
                description="Access your Hyperplott dashboard and continue your experimental optimization."
            />
            <div className="min-h-screen bg-bg-primary font-sans overflow-hidden">

                {/* Ambient background blobs — same as Hero */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary-purple/5 blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]" />
                </div>

                {/* Subtle grid overlay — same as Hero */}
                <div className="fixed inset-0 z-0 opacity-[0.4] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* Header branding */}
                <header className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-purple to-primary p-[1px] shadow-lg">
                            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                                <img src="/logo-icon.png" alt="Hyperplott" className="w-5 h-5 object-contain group-hover:scale-110 transition-transform duration-500" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-black tracking-tighter text-slate-900 leading-none">Hyperplott</span>
                                <span className="px-1.5 py-0.5 rounded bg-primary-purple/10 text-primary-purple text-[8px] font-black uppercase tracking-widest">Beta</span>
                            </div>
                            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-500">Scientific AI</span>
                        </div>
                    </Link>

                    <Link
                        to="/"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-500 text-[11px] font-black uppercase tracking-widest hover:bg-slate-200 hover:text-slate-700 transition-all border border-slate-200"
                    >
                        <ArrowRight className="w-3 h-3 rotate-180" /> Back to Home
                    </Link>
                </header>

                <main className="relative z-10 flex min-h-[calc(100vh-88px)] max-w-7xl mx-auto">

                    {/* Left side: Context & 3D Visual */}
                    <div className="hidden lg:flex flex-col justify-center p-12 lg:p-16 w-[45%] border-r border-slate-100">
                        <div className="space-y-12">
                            <div>
                                <div className="section-badge mb-6">Laboratory Gateway</div>
                                <h2 className="text-5xl font-black tracking-tighter leading-[1.05] text-slate-900 mb-6">
                                    Precision <span className="text-gradient">Experimentation</span><br />starts here.
                                </h2>
                                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md">
                                    Return to your laboratory and continue optimizing your research with AI-powered precision and diagnostic mapping.
                                </p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="aspect-square max-w-[300px] bg-white rounded-[3rem] shadow-2xl shadow-indigo-100/50 border border-slate-100 p-8 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative z-10 w-full h-full">
                                    <RotatingDesign />
                                </div>
                            </motion.div>

                            <div className="space-y-5">
                                {[
                                    { text: "Secure Identity Vault", desc: "Enterprise-grade encryption" },
                                    { text: "Stable Analysis Engine", desc: "v4.2.0 Core architecture" },
                                    { text: "Cloud Sync Protocols", desc: "Instant data persistence" }
                                ].map((item, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + (i * 0.1) }}
                                        key={i}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="mt-1 w-5 h-5 rounded-full bg-primary-purple/10 flex items-center justify-center text-primary-purple border border-primary-purple/10 shrink-0">
                                            <CheckCircle className="w-3 h-3" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-800 leading-none mb-1">{item.text}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-16 flex items-center gap-4 pt-8 border-t border-slate-100">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-9 h-9 rounded-xl border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
                                        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-100" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-tight">
                                Trusted by 100+ <br />Research Institutions
                            </p>
                        </div>
                    </div>

                    {/* Right side: Login Form */}
                    <div className="flex flex-1 items-center justify-center p-8 lg:p-20">
                        <div className="w-full max-w-md">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-purple/10 text-primary-purple rounded-full text-[9px] font-black uppercase tracking-widest mb-8 border border-primary-purple/20">
                                    <Lock className="w-3 h-3" /> Verified Researcher Access
                                </div>

                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
                                    Welcome Back.
                                </h1>
                                <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                                    Authenticate your laboratory access to continue your active optimization simulations.
                                </p>

                                <div className="space-y-6">
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Registry Email</label>
                                                <div className="relative group">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-purple transition-colors" />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="scientist@institution.edu"
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-5 outline-none focus:bg-white focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/5 transition-all font-bold text-slate-800 placeholder:text-slate-300 text-sm"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Access Key</label>
                                                <div className="relative group">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-purple transition-colors" />
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="••••••••••••"
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-5 outline-none focus:bg-white focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/5 transition-all font-bold text-slate-800 placeholder:text-slate-300 text-sm"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                                                <p className="text-red-600 text-[10px] font-black uppercase tracking-widest">{error}</p>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full py-4 rounded-2xl bg-slate-900 border border-slate-800 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-black hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0"
                                        >
                                            {isLoading ? (
                                                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin mx-auto" />
                                            ) : (
                                                <span className="flex items-center justify-center gap-2">Initialize Lab Access <ArrowRight className="w-4 h-4" /></span>
                                            )}
                                        </button>
                                    </form>

                                    <div className="relative py-4 flex items-center justify-center">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-slate-100"></div>
                                        </div>
                                        <span className="relative z-10 bg-white px-6 text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">or continue with</span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleGoogleSignIn}
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white border border-slate-200 hover:border-primary-purple/30 hover:shadow-xl hover:shadow-primary-purple/5 text-slate-700 font-bold text-sm transition-all group"
                                    >
                                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Google SSO
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleDemoLogin}
                                        disabled={isLoading}
                                        className="w-full py-4 rounded-2xl bg-primary-purple text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-primary-purple/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary-purple/20"
                                    >
                                        <Zap className="w-3 h-3 fill-white animate-pulse" />
                                        Instant Demo Gateway
                                    </button>

                                    <div className="mt-12 text-center">
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                            New to Hyperplott?{' '}
                                            <Link to="/signup" className="text-primary-purple hover:underline font-black">
                                                Create Registry
                                            </Link>
                                        </p>
                                    </div>

                                    <div className="mt-12 flex items-center justify-center gap-8 border-t border-slate-100 pt-8">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-5 h-5 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                                <Shield className="w-3 h-3 text-emerald-600" />
                                            </div>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Encrypted</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-5 h-5 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                                <Star className="w-3 h-3 text-amber-600" />
                                            </div>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verified</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default LoginPage;
