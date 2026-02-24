import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import SEO from '../components/common/SEO';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-bg-primary text-slate-600 font-sans selection:bg-primary-purple/10">
            <SEO
                title="Privacy Policy"
                description="Our privacy policy details how we handle and protect your research data and personal information."
            />
            <Navbar />

            {/* Direct Home Navigation */}
            <div className="fixed top-32 left-8 z-40 hidden xl:block">
                <Link
                    to="/"
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-500 hover:text-primary-purple hover:border-primary-purple/30 shadow-sm hover:shadow-lg transition-all group"
                >
                    <Home className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Back to Home</span>
                </Link>
            </div>

            <main className="max-w-4xl mx-auto px-6 py-32">
                <div className="space-y-16">
                    {/* Header Section */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-purple/10 text-primary-purple rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-purple/20">
                            <Shield className="w-3.5 h-3.5" /> Data Protection
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                            Privacy <span className="text-gradient">Policy</span>
                        </h1>
                        <p className="text-slate-500 font-medium">Last Updated: February 10, 2026 • Version 1.2</p>
                    </div>

                    <div className="space-y-12">
                        <section className="bg-slate-50 border border-slate-100 rounded-[2rem] p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 transition-transform group-hover:rotate-45 duration-1000">
                                <Lock className="w-64 h-64" />
                            </div>
                            <p className="text-lg text-slate-800 font-medium leading-relaxed italic relative z-10">
                                "Hyperplott is built on the principle of data sovereignty. Your experimental designs,
                                factorial matrices, and statistical results belong solely to you. We do not use your
                                proprietary research data to train our AI models."
                            </p>
                        </section>

                        <section className="space-y-8">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-purple text-white text-sm shadow-lg shadow-primary-purple/20">1</span>
                                Information We Collect
                            </h2>

                            <div className="space-y-8 ps-2 md:ps-14">
                                <div>
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">1.1 Professional Identity</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { label: 'Registry Credentials', desc: 'Full name, institutional email, and secure access tokens.' },
                                            { label: 'Institutional Affiliation', desc: 'University name, laboratory designation, and faculty role.' },
                                            { label: 'Treasury Information', desc: 'Secure payment methods and institutional billing addresses.' },
                                            { label: 'Communication Logs', desc: 'Registry inquiries and support interactions.' }
                                        ].map((item, i) => (
                                            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-primary-purple/30 transition-all shadow-sm hover:shadow-md">
                                                <h4 className="text-slate-900 font-black text-sm mb-1">{item.label}</h4>
                                                <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">1.2 Experimental Metadata</h3>
                                    <p className="mb-6 font-medium">To provide the high-precision DoE services, we manage:</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            'Factor/Level Configurations',
                                            'Factorial Design Matrices',
                                            'ANOVA Results & Coefficients',
                                            'Response Surface Visuals'
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                </div>
                                                <span className="text-xs font-bold text-slate-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-8">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-purple text-white text-sm shadow-lg shadow-primary-purple/20">2</span>
                                Data Usage Protocols
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ps-2 md:ps-14">
                                {[
                                    { title: 'Core Operations', items: ['Matrix Generation', 'Statistical Analysis', 'PDF Report Rendering'], color: 'bg-primary-purple' },
                                    { title: 'Security & Auth', items: ['SSO Authentication', 'Vault Encryption', 'Session Management'], color: 'bg-indigo-500' },
                                    { title: 'Optimization', items: ['Error Log Analysis', 'UI/UX Enhancement', 'Performance Monitoring'], color: 'bg-cyan-500' },
                                    { title: 'Administrative', items: ['Billing Cycle Alerts', 'Service Notifications', 'Legal Compliance'], color: 'bg-slate-900' }
                                ].map((group, i) => (
                                    <div key={i} className="space-y-4">
                                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">{group.title}</h3>
                                        <ul className="space-y-3">
                                            {group.items.map((item, j) => (
                                                <li key={j} className="flex items-center gap-3 text-xs font-bold text-slate-700">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${group.color}`}></div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="pt-16 border-t border-slate-100">
                            <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/40 to-transparent pointer-events-none" />
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                    <div className="max-w-md">
                                        <h3 className="text-3xl font-black mb-4">Contact the Sentinel</h3>
                                        <p className="text-slate-400 font-medium leading-relaxed">
                                            For any inquiries regarding your experimental data or to request a full vault purge,
                                            contact our privacy department.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-4 w-full md:w-auto">
                                        <div className="px-8 py-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                                            <p className="text-[10px] font-black text-primary-purple uppercase tracking-[0.2em] mb-1">Vault Registry</p>
                                            <p className="text-lg font-black tracking-tight">privacy@hyperplott.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <p className="text-center text-[10px] font-black uppercase text-slate-300 tracking-[0.4em] py-12">
                            © 2026 Hyperplott Laboratory · Confidential Protocol
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
