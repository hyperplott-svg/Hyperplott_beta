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
    const { loginDemo } = useAuth();

    const handleDemoLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            loginDemo();
            navigate('/dashboard');
            setIsLoading(false);
        }, 800);
    };

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
        // Simulate async login
        await new Promise(res => setTimeout(res, 500));
        navigate('/dashboard');
        setIsLoading(false);
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

                <main className="relative z-10 flex min-h-[calc(100vh-88px)]">

                    {/* Left side: Context & 3D Visual */}
                    <div className="hidden lg:flex flex-col justify-between p-16 w-[45%] xl:w-[45%]">
                        <div className="section-badge">Secure Access Gateway</div>

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
                                    Precision <span className="text-gradient">Experimentation</span><br />starts here.
                                </h2>
                                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm">
                                    Return to your laboratory and continue optimizing your research with AI-powered precision.
                                </p>
                            </motion.div>

                            <div className="space-y-4">
                                {trustItems.map((item, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + (i * 0.1) }}
                                        key={i}
                                        className="flex items-center gap-3 text-slate-600 font-bold"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/10">
                                            <CheckCircle className="w-3.5 h-3.5" />
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
                                Trusted by 100+ Researchers Globally
                            </p>
                        </div>
                    </div>

                    {/* Right side: Login Form */}
                    <div className="flex flex-1 items-center justify-center p-8 lg:p-16">
                        <div className="w-full max-w-md">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-purple/10 text-primary-purple rounded-full text-[9px] font-black uppercase tracking-widest mb-6 border border-primary-purple/20">
                                    <Zap className="w-3 h-3" /> Priority Access
                                </div>

                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-3 tracking-tighter">
                                    Laboratory Access.
                                </h1>
                                <p className="text-slate-500 font-medium mb-10">
                                    Experience Hyperplott's full suite of scientific AI tools via our instant demo gateway.
                                </p>

                                <div className="space-y-4">
                                    <button
                                        type="button"
                                        onClick={handleDemoLogin}
                                        disabled={isLoading}
                                        className="btn-primary w-full py-6 text-sm flex items-center justify-center gap-3 group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {isLoading ? (
                                            <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Zap className="w-5 h-5 fill-white animate-pulse" />
                                                <span className="tracking-[0.2em] font-black">ENTER INSTANT DEMO</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                    <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest pt-4">
                                        No registration required · Direct Research Access
                                    </p>
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
