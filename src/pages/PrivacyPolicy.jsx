import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import SEO from '../components/common/SEO';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-bg-primary text-gray-300 font-sans selection:bg-purple-500/30">
            <SEO
                title="Privacy Policy"
                description="Our privacy policy details how we handle and protect your research data and personal information."
            />
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
                <div className="space-y-12">
                    {/* Header Section */}
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Policy</span>
                        </h1>
                        <p className="text-gray-400 font-medium">Last Updated: February 10, 2026</p>
                        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    </div>

                    <div className="prose prose-invert max-w-none space-y-8 text-gray-400 leading-relaxed">
                        <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
                            <p className="text-lg text-white font-medium leading-relaxed italic">
                                IMPORTANT: This Privacy Policy explains how Hyperplott collects, uses, discloses,
                                and safeguards your information when you use our Design of Experiments (DoE)
                                platform. Please read this privacy policy carefully. By using Hyperplott, you agree to the
                                collection and use of information in accordance with this policy.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-sm border border-purple-500/30">1</span>
                                Information We Collect
                            </h2>

                            <div className="space-y-6 ps-11">
                                <div>
                                    <h3 className="text-lg font-medium text-purple-300 mb-3">1.1 Personal Information</h3>
                                    <p className="mb-4">We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, or otherwise contact us. The personal information we collect may include:</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0">
                                        {[
                                            { label: 'Account Information', desc: 'Name, email, phone, organization, designation' },
                                            { label: 'Profile Information', desc: 'Education, research interests, affiliation' },
                                            { label: 'Billing Information', desc: 'Payment card details, address, GST number' },
                                            { label: 'Communication Data', desc: 'Support inquiries and communications' }
                                        ].map((item, i) => (
                                            <li key={i} className="flex flex-col p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors">
                                                <span className="text-white font-semibold text-sm">{item.label}</span>
                                                <span className="text-xs text-gray-500 mt-1">{item.desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-purple-300 mb-3">1.2 Experimental Design Data</h3>
                                    <p className="mb-4">We collect and store data related to your use of the platform, including:</p>
                                    <ul className="space-y-2 list-disc ps-5 marker:text-purple-500">
                                        <li>Experimental designs you create (factors, levels, responses)</li>
                                        <li>Design matrices and experimental runs</li>
                                        <li>Statistical analysis results</li>
                                        <li>Visualizations and reports generated</li>
                                        <li>Project names, descriptions, and metadata</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-purple-300 mb-3">1.3 Automatically Collected Information</h3>
                                    <p className="mb-4">When you access our platform, we automatically collect certain information, including:</p>
                                    <ul className="space-y-4">
                                        <li className="flex gap-4">
                                            <div className="min-w-[120px] text-white font-medium text-sm">Device Info</div>
                                            <div className="text-sm">IP address, browser type and version, operating system, device type</div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="min-w-[120px] text-white font-medium text-sm">Usage Data</div>
                                            <div className="text-sm">Pages visited, time spent, features used, click patterns</div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="min-w-[120px] text-white font-medium text-sm">Log Data</div>
                                            <div className="text-sm">Access times, error logs, performance data</div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="min-w-[120px] text-white font-medium text-sm">Cookies</div>
                                            <div className="text-sm">Session cookies, preference cookies, analytics cookies</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 text-sm border border-pink-500/30">2</span>
                                How We Use Your Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ps-11">
                                {[
                                    { title: 'Service Provision', items: ['Create and manage accounts', 'Process designs and results', 'Secure data storage', 'Customer support'] },
                                    { title: 'Payments', items: ['Process subscription fees', 'Fraud prevention', 'Invoice generation'] },
                                    { title: 'Improvement', items: ['Analyze usage patterns', 'Feature development', 'R&D', 'Trend monitoring'] },
                                    { title: 'Communication', items: ['Security alerts', 'Support responses', 'Marketing (with consent)', 'Feedback requests'] }
                                ].map((group, i) => (
                                    <div key={i} className="space-y-3">
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-pink-400">{group.title}</h3>
                                        <ul className="space-y-2 text-sm">
                                            {group.items.map((item, j) => (
                                                <li key={j} className="flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-pink-500"></div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div className="ps-11 mt-6">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-pink-400 mb-3">Legal and Security</h3>
                                <p className="text-sm">We use data to comply with legal obligations, protect against unauthorized activity, and enforce our Terms and Conditions.</p>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm border border-indigo-500/30">3</span>
                                Data Storage and Security
                            </h2>
                            <div className="ps-11 space-y-6">
                                <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-6">
                                    <p className="text-sm mb-4 italic text-indigo-200">Your data is stored on secure servers provided by Supabase (PostgreSQL) and Render (hosting).</p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            'SSL/TLS encryption in transit',
                                            'Encryption at rest',
                                            'Regular security audits',
                                            'Strict access controls',
                                            'Regular backups'
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-xs text-indigo-300/80 uppercase font-semibold tracking-wide">
                                                <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-lg font-medium text-indigo-300 mb-2">3.2 Data Retention</h3>
                                        <p className="text-sm">We retain data as long as your account is active. You may request deletion at any time. We keep information necessary for legal compliance or dispute resolution.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-indigo-300 mb-2">3.3 Data Location</h3>
                                        <p className="text-sm">Data may be processed in India or other service provider locations. By using Hyperplott, you consent to international data transfers.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 text-sm border border-orange-500/30">4</span>
                                Data Sharing
                            </h2>
                            <div className="ps-11 space-y-4">
                                <p>We do not sell, trade, or rent your personal information. We share with:</p>
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                        <h3 className="text-white font-medium mb-2">Service Providers</h3>
                                        <p className="text-sm">Razorpay (Payments), Supabase & Render (Hosting), Analytics & Email providers. They are contractually bound to protect your data.</p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                            <h3 className="text-white text-sm font-medium mb-1">Legal</h3>
                                            <p className="text-xs text-gray-500">When required by law or public authorities.</p>
                                        </div>
                                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                            <h3 className="text-white text-sm font-medium mb-1">Transfers</h3>
                                            <p className="text-xs text-gray-500">In case of merger, acquisition or sale.</p>
                                        </div>
                                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                            <h3 className="text-white text-sm font-medium mb-1">Consent</h3>
                                            <p className="text-xs text-gray-500">Any other time with your explicit consent.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 text-sm border border-blue-500/30">5</span>
                                Your Data Rights
                            </h2>
                            <div className="ps-11">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {[
                                        { title: 'Access', desc: 'Request copies of your data' },
                                        { title: 'Rectification', desc: 'Correct inaccurate info' },
                                        { title: 'Erasure', desc: 'Request data deletion' },
                                        { title: 'Portability', desc: 'Export your data tools' },
                                        { title: 'Withdraw', desc: 'Stop marketing emails' },
                                        { title: 'Object', desc: 'Protest data processing' }
                                    ].map((right, i) => (
                                        <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-500/5 transition-colors group">
                                            <h3 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors">{right.title}</h3>
                                            <p className="text-xs text-gray-500">{right.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-6 text-sm flex items-center gap-2">
                                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Contact: <span className="text-blue-400 font-bold">privacy@hyperplott.com</span>
                                </p>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm border border-emerald-500/30">6</span>
                                Cookies & Tracking
                            </h2>
                            <div className="ps-11 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { name: 'Essential', desc: 'Authentication and security' },
                                    { name: 'Preference', desc: 'Remember your settings' },
                                    { name: 'Analytics', desc: 'Usage analysis for improvements' },
                                    { name: 'Marketing', desc: 'Relevant ads (with consent)' }
                                ].map((cookie, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></div>
                                        <div>
                                            <h4 className="text-white text-sm font-semibold">{cookie.name}</h4>
                                            <p className="text-xs text-gray-500">{cookie.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-16 border-t border-white/10">
                            <section className="space-y-4">
                                <h2 className="text-xl font-semibold text-white">Children's Privacy</h2>
                                <p className="text-sm">Platform intended for users 18+. We do not knowingly collect info from children. If you believe we have, please contact us for deletion.</p>
                            </section>
                            <section className="space-y-4">
                                <h2 className="text-xl font-semibold text-white">Data Breach</h2>
                                <p className="text-sm">In case of a breach, we will notify you and relevant authorities within 72 hours of discovery, highlighting data affected and steps taken.</p>
                            </section>
                        </div>

                        <section className="space-y-6 pt-12">
                            <h2 className="text-2xl font-semibold text-white">Compliance & Contact</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                    <h3 className="text-white font-medium mb-3">Indian Laws</h3>
                                    <ul className="text-xs space-y-2 text-gray-500">
                                        <li>IT Act, 2000</li>
                                        <li>IT Rules, 2011</li>
                                        <li>DPDP Act, 2023</li>
                                    </ul>
                                </div>
                                <div className="sm:col-span-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Contact Us</h3>
                                        <p className="text-xs text-gray-400">Hyperplott (DharaAI)</p>
                                    </div>
                                    <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4">
                                        <div className="text-xs">
                                            <p className="text-gray-500">Email</p>
                                            <p className="text-white">privacy@hyperplott.com</p>
                                        </div>
                                        <div className="text-xs">
                                            <p className="text-gray-500">Support</p>
                                            <p className="text-white">support@hyperplott.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <p className="text-center text-xs text-gray-600 mt-24">
                            © 2026 Hyperplott. All Rights Reserved. This document is legally binding and enforceable under Indian law.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
