import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Lock,
    User,
    ArrowRight,
    Building2,
    ShieldCheck,
    CheckCircle2,
    Zap,
    Globe,
    Star
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/common/SEO';
import RotatingDesign from '../components/features/design/RotatingDesign';

const SignupPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [institution, setInstitution] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { registerEmail, loginWithGoogle } = useAuth();

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError('');
        try {
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (error) {
            console.error("Error signing in with Google: ", error);
            setError('Google sign-in failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await registerEmail(email, password, name);
            navigate('/dashboard');
        } catch (err) {
            console.error("Registration error:", err);
            setError(err.message || 'Failed to create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <SEO
                title="Create Account"
                description="Join Hyperplott and start optimizing your experimental designs with AI-powered statistical precision."
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
                                <div className="section-badge mb-6">Scientific Registry</div>
                                <h2 className="text-5xl font-black tracking-tighter leading-[1.05] text-slate-900 mb-6">
                                    Accelerate <span className="text-gradient">Discovery</span><br />with AI Precision.
                                </h2>
                                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md">
                                    Join the next generation of researchers using automated statistical modeling to optimize complex systems.
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
                                    { text: "Automated Factorial Analysis", desc: "AI-driven dimension reduction" },
                                    { text: "Response Surface Methodology", desc: "Find optimal system states" },
                                    { text: "Curvature Detection", desc: "Identify non-linear trends" }
                                ].map((item, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + (i * 0.1) }}
                                        key={i}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="mt-1 w-5 h-5 rounded-full bg-primary-purple/10 flex items-center justify-center text-primary-purple border border-primary-purple/10 shrink-0">
                                            <CheckCircle2 className="w-3 h-3" />
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
                                Trusted by Leading <br />Faculty Globally
                            </p>
                        </div>
                    </div>

                    {/* Right side: Form */}
                    <div className="flex flex-1 items-center justify-center p-8 lg:p-20">
                        <div className="w-full max-w-md">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-purple/10 text-primary-purple rounded-full text-[9px] font-black uppercase tracking-widest mb-8 border border-primary-purple/20">
                                    <Zap className="w-3 h-3" /> New Instance Registry
                                </div>

                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
                                    Start Optimizing.
                                </h1>
                                <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                                    Create your professional registry to access AI factorial mapping and system diagnostics.
                                </p>

                                <form className="space-y-5" onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Full Name</label>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-purple transition-colors" />
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Dr. John Doe"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-5 outline-none focus:bg-white focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/5 transition-all font-bold text-slate-800 placeholder:text-slate-300 text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-1">Institution</label>
                                            <div className="relative group">
                                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-purple transition-colors" />
                                                <input
                                                    type="text"
                                                    value={institution}
                                                    onChange={(e) => setInstitution(e.target.value)}
                                                    placeholder="MIT Research Lab"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-5 outline-none focus:bg-white focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/5 transition-all font-bold text-slate-800 placeholder:text-slate-300 text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>

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
                                        className="w-full py-4 rounded-2xl bg-slate-900 border border-slate-800 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-black hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 mb-6"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin mx-auto" />
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">Initialize Registry <ArrowRight className="w-4 h-4" /></span>
                                        )}
                                    </button>

                                    <div className="relative py-4 flex items-center justify-center">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-slate-100"></div>
                                        </div>
                                        <span className="relative z-10 bg-white px-6 text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">or connect with SSO</span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleGoogleSignIn}
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white border border-slate-200 hover:border-primary-purple/30 hover:shadow-xl hover:shadow-primary-purple/5 text-slate-700 font-bold text-sm transition-all group"
                                    >
                                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Continue with Google
                                    </button>
                                </form>

                                <div className="mt-12 text-center">
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                        Already registered?{' '}
                                        <Link to="/login" className="text-primary-purple hover:underline font-black">
                                            Login to laboratory
                                        </Link>
                                    </p>
                                </div>

                                <div className="mt-12 flex items-center justify-center gap-8 border-t border-slate-100 pt-8">
                                    <div className="flex items-center gap-2.5">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">GPDR Secure</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                                    <div className="flex items-center gap-2.5">
                                        <Star className="w-4 h-4 text-amber-500" />
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">v4.2.0 Stable</span>
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

export default SignupPage;
