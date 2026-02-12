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
                    {/* Decorative blobs */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-[120px] -z-10" />

                    <div className="w-full max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-10 text-center lg:text-left"
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
