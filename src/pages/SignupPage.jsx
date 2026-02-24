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
import SEO from '../components/common/SEO';
import RotatingDesign from '../components/features/design/RotatingDesign';

const SignupPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [institution, setInstitution] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate registration
        await new Promise(res => setTimeout(res, 800));
        navigate('/dashboard');
        setIsLoading(false);
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

                <main className="relative z-10 flex min-h-[calc(100vh-88px)]">

                    {/* Left side: Context & 3D Visual */}
                    <div className="hidden lg:flex flex-col justify-between p-16 w-[45%] xl:w-[45%]">
                        <div className="section-badge">Scientific Registry</div>

                        <div className="flex flex-col gap-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-4 aspect-square max-w-[340px] mx-auto bg-white/40 rounded-[3rem] backdrop-blur-xl border border-slate-200 p-6 shadow-2xl relative"
                            >
                                <div className="absolute inset-0 bg-primary-purple/5 blur-3xl rounded-full" />
                                <div className="relative z-10 w-full h-full">
                                    <RotatingDesign />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="text-4xl xl:text-5xl font-black tracking-tighter leading-[0.95] text-slate-900 mb-6">
                                    Accelerate <span className="text-gradient">Discovery</span><br />with AI Precision.
                                </h2>
                                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm">
                                    Join the next generation of researchers using automated statistical modeling to optimize complex systems.
                                </p>
                            </motion.div>

                            <div className="space-y-4">
                                {[
                                    "Automated Factorial Analysis",
                                    "Response Surface Methodology",
                                    "Real-time Curvature Detection"
                                ].map((item, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + (i * 0.1) }}
                                        key={i}
                                        className="flex items-center gap-3 text-slate-600 font-bold"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-primary-purple/10 flex items-center justify-center text-primary-purple border border-primary-purple/10">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-sm">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Global Faculty & Industry Network
                            </p>
                        </div>
                    </div>

                    {/* Right side: Form */}
                    <div className="flex flex-1 items-center justify-center p-8 lg:p-16">
                        <div className="w-full max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-purple/10 text-primary-purple rounded-full text-[9px] font-black uppercase tracking-widest mb-6 border border-primary-purple/20">
                                    <Zap className="w-3 h-3" /> New Instance
                                </div>

                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                                    Start Optimizing.
                                </h1>
                                <p className="text-slate-500 font-medium mb-10">
                                    Create your professional registry to access AI factorial mapping.
                                </p>

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-purple transition-colors" />
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Dr. John Doe"
                                                    className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-5 outline-none focus:border-primary-purple/50 focus:ring-4 focus:ring-primary-purple/10 transition-all font-medium text-slate-800 placeholder:text-slate-300 text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Institution</label>
                                            <div className="relative group">
                                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-purple transition-colors" />
                                                <input
                                                    type="text"
                                                    value={institution}
                                                    onChange={(e) => setInstitution(e.target.value)}
                                                    placeholder="MIT Research Lab"
                                                    className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-5 outline-none focus:border-primary-purple/50 focus:ring-4 focus:ring-primary-purple/10 transition-all font-medium text-slate-800 placeholder:text-slate-300 text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Registry Email</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-purple transition-colors" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="scientist@institution.edu"
                                                className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-5 outline-none focus:border-primary-purple/50 focus:ring-4 focus:ring-primary-purple/10 transition-all font-medium text-slate-800 placeholder:text-slate-300 text-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Access Key</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-purple transition-colors" />
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••••••"
                                                className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-5 outline-none focus:border-primary-purple/50 focus:ring-4 focus:ring-primary-purple/10 transition-all font-medium text-slate-800 placeholder:text-slate-300 text-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="btn-primary w-full py-4 text-sm mt-4"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>Create Profile <ArrowRight className="w-4 h-4" /></>
                                        )}
                                    </button>

                                    <div className="relative flex items-center py-4">
                                        <div className="flex-1 border-t border-slate-200" />
                                        <span className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">or connect with SSO</span>
                                        <div className="flex-1 border-t border-slate-200" />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleGoogleSignIn}
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-white border border-slate-200 hover:border-primary-purple/30 hover:shadow-lg text-slate-700 font-black text-[12px] uppercase tracking-widest transition-all duration-300 group"
                                    >
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        Continue with Google
                                    </button>
                                </form>

                                <p className="mt-8 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                    Already registered?{' '}
                                    <Link to="/login" className="text-primary-purple hover:underline font-black">
                                        Login to laboratory
                                    </Link>
                                </p>

                                <div className="mt-12 flex justify-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                        </div>
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">GPDR Compliant</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-lg bg-primary-purple/10 flex items-center justify-center">
                                            <Star className="w-3 h-3 text-primary-purple" />
                                        </div>
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Top Rated DoE</span>
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
