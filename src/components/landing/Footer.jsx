import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Youtube, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-bg-dark text-white pt-20 pb-12 relative overflow-hidden">
            {/* Structural Divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-purple/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl">
                                <img src="/logo-icon.png" alt="Hyperplott" className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black tracking-tighter leading-none">Hyperplott</span>
                                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-primary-purple mt-0.5">Scientific AI</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8 max-w-xs">
                            Democratizing experimental design for researchers, scientists, and students worldwide.
                        </p>
                        <div className="flex gap-3">
                            {[Linkedin, Twitter, Github, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all hover:-translate-y-1">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500 mb-6">Product</h4>
                        <ul className="space-y-4">
                            {[
                                { label: 'Matrix Generation', href: '/#features' },
                                { label: '3D Optimization', href: '/#features' },
                                { label: 'Statistical Engine', href: '/#features' },
                            ].map(item => (
                                <li key={item.label}>
                                    <a href={item.href} className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <Link to="/pricing" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Pricing</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500 mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">About Us</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Our Team</Link></li>
                            <li><a href="/#beta" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Beta Program</a></li>
                            <li><Link to="/pricing" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500 mb-6">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link to="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Terms of Service</Link></li>
                            <li>
                                <a href="mailto:hello@hyperplott.com" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium group">
                                    <Mail className="w-3.5 h-3.5 group-hover:text-primary-purple transition-colors" />
                                    Contact Us
                                </a>
                            </li>
                        </ul>

                        <div className="mt-8 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">All Systems Operational</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
                    <p className="text-xs font-medium">
                        © 2026 Hyperplott. Built with ❤️ by researchers, for researchers.
                    </p>
                    <div className="flex gap-6 text-xs font-medium">
                        <Link to="/privacy" className="hover:text-white transition-all">Privacy</Link>
                        <Link to="/terms" className="hover:text-white transition-all">Terms</Link>
                        <a href="mailto:hello@hyperplott.com" className="hover:text-white transition-all">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
