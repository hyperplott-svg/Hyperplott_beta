import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Lock,
    User,
    ArrowRight,
    Building2,
    ShieldCheck,
    Chrome,
    Github,
    CheckCircle2,
    Zap,
    Globe
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import RotatingDesign from '../components/features/design/RotatingDesign';
import SEO from '../components/common/SEO';

const SignupPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [institution, setInstitution] = useState('');

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
                title="Create Identity"
                description="Join Hyperplott and start optimizing your experimental designs with AI-powered statistical precision."
            />
            <div className="min-h-screen grid lg:grid-cols-2 bg-white overflow-hidden font-sans">
                {/* Left Side: Visual Context & Features */}
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

                    <div className="relative z-10 flex-1 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-12 aspect-square max-w-[340px] mx-auto bg-white/40 rounded-[3rem] backdrop-blur-xl border border-white/60 p-6 shadow-2xl shadow-indigo-100/50"
                        >
                            <RotatingDesign />
                        </motion.div>

                        <div className="max-w-md mx-auto space-y-8">
                            <h2 className="text-4xl font-black text-text-primary leading-tight font-display tracking-tight">
                                Join the next generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-purple to-secondary">Scientific Research</span>.
                            </h2>

                            <div className="space-y-4">
                                {[
                                    { icon: CheckCircle2, text: 'Unlimited AI-optimized experimental matrices', color: 'text-green-500' },
                                    { icon: Zap, text: 'Full statistical analysis & ANOVA engines', color: 'text-indigo-500' },
                                    { icon: Globe, text: 'Secure cloud vault for clinical collaboration', color: 'text-blue-500' }
                                ].map((item, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        key={i}
                                        className="flex items-center gap-4 text-text-secondary font-semibold"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary-purple shadow-sm border border-gray-50">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Brand Line */}
                    <div className="relative z-10">
                        <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em]">Scientific Precision Registry • ISO 27001 Ready</p>
                    </div>
                </div>

                {/* Right Side: Signup Form */}
                <div className="flex items-center justify-center p-8 lg:p-20 bg-white relative overflow-y-auto">
                    {/* Back to Home Button */}
                    <Link
                        to="/"
                        className="absolute top-10 right-10 flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-text-secondary text-[11px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors border border-gray-100"
                    >
                        <ArrowRight className="w-3 h-3 rotate-180" /> Back to Home
                    </Link>

                    {/* Decorative blobs */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-[120px] -z-10" />
                    <div className="w-full max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-10 text-center lg:text-left pt-20"
                        >
                            <h1 className="text-4xl lg:text-5xl font-black text-text-primary mb-4 tracking-tight font-display">
                                Create Identity
                            </h1>
                            <p className="text-text-secondary font-medium">Initialize your professional workspace and secure laboratory data.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="bg-white p-1 rounded-[2.5rem]">
                                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest ml-1">Operator Name</label>
                                            <div className="relative group">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary-purple transition-colors" />
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Antigravity"
                                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:bg-white focus:border-primary-purple/30 transition-all font-semibold text-text-primary placeholder:text-text-muted/50"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest ml-1">Institution</label>
                                            <div className="relative group">
                                                <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary-purple transition-colors" />
                                                <input
                                                    type="text"
                                                    value={institution}
                                                    onChange={(e) => setInstitution(e.target.value)}
                                                    placeholder="Pharma Research Lab"
                                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:bg-white focus:border-primary-purple/30 transition-all font-semibold text-text-primary placeholder:text-text-muted/50"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest ml-1">Registry Email</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary-purple transition-colors" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="scientist@hyperplott.com"
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:bg-white focus:border-primary-purple/30 transition-all font-semibold text-text-primary placeholder:text-text-muted/50"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest ml-1">Define Access Key</label>
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
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest ml-1">Confirm Access Key</label>
                                            <div className="relative group">
                                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary-purple transition-colors" />
                                                <input
                                                    type="password"
                                                    placeholder="••••••••••••"
                                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 outline-none focus:bg-white focus:border-primary-purple/30 transition-all font-semibold text-text-primary placeholder:text-text-muted/50"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-primary-purple shrink-0 border border-indigo-100">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <p className="text-[11px] text-text-tertiary font-medium leading-relaxed">
                                            By clicking "Initialize Registry", you agree to our <a href="#" className="font-bold text-text-primary hover:underline">Sentinel Protocol</a> and <a href="#" className="font-bold text-text-primary hover:underline">Data Policy</a>. All experimental outcomes remain institutional property.
                                        </p>
                                    </div>

                                    <button type="submit" className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary-purple to-secondary text-white text-lg font-bold shadow-xl shadow-indigo-100 hover:shadow-indigo-300 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 group">
                                        Initialize Registry
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </button>

                                    <div className="relative py-2 flex items-center">
                                        <div className="flex-1 border-t border-gray-100" />
                                        <span className="px-6 text-[10px] font-black uppercase text-text-muted tracking-[0.3em]">OR SIGN UP WITH</span>
                                        <div className="flex-1 border-t border-gray-100" />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleGoogleSignIn}
                                        className="w-full flex items-center justify-center gap-4 py-5 border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-black text-text-secondary text-sm uppercase tracking-widest shadow-sm group"
                                    >
                                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                            <path
                                                fill="#4285F4"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            />
                                            <path
                                                fill="#EA4335"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            />
                                        </svg>
                                        Continue with Google
                                    </button>
                                </form>
                            </div>

                            <div className="mt-8 text-center pb-8">
                                <p className="text-sm font-medium text-text-secondary">
                                    Already registered? <Link to="/login" className="text-primary-purple font-black hover:underline px-1">Sign In</Link>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupPage;
