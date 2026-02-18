import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Youtube, Zap, Mail, Shield } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-bg-primary text-white pt-32 pb-16 relative overflow-hidden">
            {/* Structural Divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Background Atmosphere */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
                    {/* Brand Column */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/10">
                                <Zap className="w-6 h-6 text-emerald-500 fill-emerald-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tighter leading-none">Hyperplott</span>
                                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-emerald-400 mt-1 opacity-70">Scientific AI</span>
                            </div>
                        </div>
                        <p className="text-text-secondary text-base font-medium leading-relaxed mb-10 max-w-xs opacity-70">
                            Pioneering the future of experimental logic through high-fidelity AI orchestration.
                        </p>
                        <div className="flex gap-4">
                            {[Linkedin, Twitter, Github, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-tertiary hover:bg-white/10 hover:text-white transition-all hover:-translate-y-1 shadow-sm">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-text-tertiary mb-10">Product</h4>
                        <ul className="space-y-5">
                            {['Matrix Generation', '3D Optimization', 'Statistical Engine', 'API Reference', 'Cloud Ops'].map(item => (
                                <li key={item}><a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors text-base font-medium">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-text-tertiary mb-10">Company</h4>
                        <ul className="space-y-5">
                            {['Mission Control', 'Careers', 'Research Portal', 'Global Sales', 'Brand Kit'].map(item => (
                                <li key={item}><a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors text-base font-medium">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-text-tertiary mb-10">Intelligence Feed</h4>
                        <p className="text-sm font-medium text-text-tertiary mb-6 opacity-70">Join 12k+ researchers receiving weekly optimization insights.</p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="research@institution.edu"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-medium outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700"
                            />
                            <button className="absolute right-2 top-2 p-2 rounded-xl bg-emerald-500 text-slate-950 shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">
                                <Mail className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="mt-12 space-y-4">
                            <div className="flex items-center gap-3 text-slate-500 text-[10px] uppercase tracking-widest font-black">
                                <Shield className="w-4 h-4 text-emerald-500" /> 🔒 256-bit SSL Encryption
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 text-[10px] uppercase tracking-widest font-black">
                                <Shield className="w-4 h-4 text-emerald-500" /> ✓ GDPR Compliant
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 text-[10px] uppercase tracking-widest font-black">
                                <Shield className="w-4 h-4 text-emerald-500" /> 💰 Money-Back Guarantee
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 text-[10px] uppercase tracking-widest font-black">
                                <Shield className="w-4 h-4 text-emerald-500" /> 🌍 Accessible Worldwide
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-6">
                        <p className="text-text-tertiary text-sm font-medium opacity-50">
                            © 2026 Hyperplott. Built with ❤️ by researchers, for researchers.
                        </p>
                    </div>
                    <div className="flex gap-10">
                        <Link to="/privacy" className="text-text-tertiary hover:text-white transition-all text-sm font-medium opacity-50 hover:opacity-100">Privacy Policy</Link>
                        <Link to="/terms" className="text-text-tertiary hover:text-white transition-all text-sm font-medium opacity-50 hover:opacity-100">Terms & Conditions</Link>
                        <a href="#" className="text-text-tertiary hover:text-white transition-all text-sm font-medium opacity-50 hover:opacity-100">Security</a>
                    </div>
                </div>
            </div>

            {/* Micro-label vertical */}
            <div className="absolute right-10 bottom-40 hidden xl:block opacity-10">
                <span className="text-[10px] uppercase tracking-[1em] font-mono text-right transform rotate-90 origin-bottom-right">Hyper-Network Secure</span>
            </div>
        </footer>
    );
};

export default Footer;
