import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Youtube, Zap, Mail, Shield } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-bg-dark text-white pt-32 pb-16 relative overflow-hidden">
            {/* Structural Divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
                    {/* Brand Column */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-purple shadow-xl">
                                <img src="/logo-icon.png" alt="Hyperplott" className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tighter leading-none">Hyperplott</span>
                                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-primary-purple mt-1">Scientific AI</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-base font-medium leading-relaxed mb-10 max-w-xs">
                            Pioneering the future of experimental logic through high-fidelity AI orchestration.
                        </p>
                        <div className="flex gap-4">
                            {[Linkedin, Twitter, Github, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all hover:-translate-y-1 shadow-sm">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">Product</h4>
                        <ul className="space-y-5">
                            {['Matrix Generation', '3D Optimization', 'Statistical Engine'].map(item => (
                                <li key={item}><a href="#" className="text-slate-400 hover:text-primary-purple transition-colors text-base font-medium">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">Company</h4>
                        <ul className="space-y-5">
                            {['About Us', 'Founder Story', 'Beta Program'].map(item => (
                                <li key={item}><a href="#" className="text-slate-400 hover:text-primary-purple transition-colors text-base font-medium">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">Trust Indicators</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                                <Shield className="w-4 h-4 text-primary-purple" /> 🔒 256-bit SSL Encryption
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                                <Shield className="w-4 h-4 text-primary-purple" /> ✓ GDPR Compliant
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                                <Shield className="w-4 h-4 text-primary-purple" /> 💰 30-Day Money-Back
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-slate-500">
                    <p className="text-sm font-medium">
                        © 2026 Hyperplott. Built with ❤️ by researchers, for researchers.
                    </p>
                    <div className="flex gap-10 text-sm font-medium">
                        <Link to="/privacy" className="hover:text-white transition-all">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-all">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
