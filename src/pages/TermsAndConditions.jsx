import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import SEO from '../components/common/SEO';

const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-bg-primary text-slate-600 font-sans selection:bg-primary-purple/10">
            <SEO
                title="Terms & Conditions"
                description="Our terms and conditions outline the agreement between you and Hyperplott regarding the use of our platform."
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
                            <FileText className="w-3.5 h-3.5" /> Legal Framework
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                            Terms & <span className="text-gradient">Conditions</span>
                        </h1>
                        <p className="text-slate-500 font-medium">Last Updated: February 10, 2026 • Agreement Protocol</p>
                    </div>

                    <div className="space-y-12">
                        <section className="bg-slate-50 border border-slate-100 rounded-[2rem] p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 transition-transform group-hover:rotate-45 duration-1000">
                                <FileText className="w-64 h-64" />
                            </div>
                            <p className="text-lg text-slate-800 font-medium leading-relaxed italic relative z-10">
                                "These terms establish the framework for professional research and experimental
                                optimization on the Hyperplott platform. By initializing a workspace, you agree to
                                these scientific and legal standards."
                            </p>
                        </section>

                        <section className="space-y-8">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-purple text-white text-sm shadow-lg shadow-primary-purple/20">1</span>
                                Acceptance
                            </h2>
                            <div className="ps-2 md:ps-14 space-y-4 text-sm leading-relaxed font-medium">
                                <p>
                                    By creating an account, accessing, or using Hyperplott ("Platform"), you agree to
                                    be legally bound by these Terms and Conditions. These Terms constitute a legally binding
                                    agreement between you and Hyperplott (operated by DharaAI).
                                </p>
                                <p>
                                    If you are using the Platform on behalf of an institution, you represent and warrant that
                                    you have the authority to bind that organization to these Terms.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-8">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-purple text-white text-sm shadow-lg shadow-primary-purple/20">2</span>
                                Pricing Architecture
                            </h2>
                            <div className="ps-2 md:ps-14 space-y-8">
                                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 text-slate-900 font-black uppercase text-[10px] tracking-widest">
                                            <tr>
                                                <th className="px-6 py-4">Laboratory Tier</th>
                                                <th className="px-6 py-4">Investment</th>
                                                <th className="px-6 py-4">Capabilities</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {[
                                                { name: 'Academic', price: '₹499', feat: '50 designs/mo, Basic Support' },
                                                { name: 'Professional', price: '₹1,999', feat: 'Unlimited Matrices, Advanced ANOVA' },
                                                { name: 'Institutional', price: '₹4,999', feat: 'Team Vault, Shared Models' }
                                            ].map((plan, i) => (
                                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-4 font-black text-slate-900">{plan.name}</td>
                                                    <td className="px-6 py-4 font-bold text-primary-purple">{plan.price}</td>
                                                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{plan.feat}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                        <h4 className="text-slate-900 font-black mb-2 uppercase text-[10px] tracking-widest">Payment Security</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed font-medium">Processed via Razorpay with end-to-end encryption. GST compliant billing across all jurisdictions.</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                        <h4 className="text-slate-900 font-black mb-2 uppercase text-[10px] tracking-widest">Guarantee</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed font-medium">7-day professional money-back guarantee for first-time institutional users.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-8">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-purple text-white text-sm shadow-lg shadow-primary-purple/20">3</span>
                                Usage Restrictions
                            </h2>
                            <div className="ps-2 md:ps-14">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                    {[
                                        'Unauthorized reverse engineering of ANOVA kernels',
                                        'Automated scraping of Factorial templates',
                                        'Institutional account credential sharing',
                                        'Usage for illegal pharmacological research'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 bg-red-50/30 border border-red-100 rounded-xl">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                            <span className="font-bold text-slate-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="pt-16 border-t border-slate-100">
                            <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/40 to-transparent pointer-events-none" />
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                    <div className="max-w-md">
                                        <h3 className="text-3xl font-black mb-4">Legal Liaison</h3>
                                        <p className="text-slate-400 font-medium leading-relaxed">
                                            For institutional contract modifications or legal registry inquiries,
                                            please contact our compliance department.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-4 w-full md:w-auto">
                                        <div className="px-8 py-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                                            <p className="text-[10px] font-black text-primary-purple uppercase tracking-[0.2em] mb-1">Legal Registry</p>
                                            <p className="text-lg font-black tracking-tight">legal@hyperplott.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <p className="text-center text-[10px] font-black uppercase text-slate-300 tracking-[0.4em] py-12">
                            © 2026 Hyperplott (DharaAI) · Institutional Agreement
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsAndConditions;
