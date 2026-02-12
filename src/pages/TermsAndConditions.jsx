import React, { useEffect } from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-bg-primary text-gray-300 font-sans selection:bg-blue-500/30">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
                <div className="space-y-12">
                    {/* Header Section */}
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                            Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Conditions</span>
                        </h1>
                        <p className="text-gray-400 font-medium">Last Updated: February 10, 2026</p>
                        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                    </div>

                    <div className="prose prose-invert max-w-none space-y-8 text-gray-400 leading-relaxed">
                        <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
                            <p className="text-lg text-white font-medium leading-relaxed italic">
                                IMPORTANT: These Terms and Conditions ("Terms") govern your access to and use of
                                the Hyperplott platform, a Design of Experiments (DoE) software-as-a-service. By
                                accessing or using Hyperplott, you agree to be bound by these Terms. If you do not
                                agree to these Terms, do not use our platform.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 text-sm border border-blue-500/30">1</span>
                                Acceptance of Terms
                            </h2>
                            <div className="ps-11 space-y-4 text-sm leading-relaxed">
                                <p>
                                    By creating an account, accessing, or using Hyperplott ("Platform", "Service", "we", "us", or
                                    "our"), you ("User", "you", or "your") agree to be legally bound by these Terms and
                                    Conditions, along with our Privacy Policy. These Terms constitute a legally binding
                                    agreement between you and Hyperplott (operated by DharaAI).
                                </p>
                                <p>
                                    If you are using the Platform on behalf of an organization, you represent and warrant that
                                    you have the authority to bind that organization to these Terms, and your acceptance of
                                    these Terms will be treated as acceptance by that organization.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm border border-cyan-500/30">2</span>
                                Definitions
                            </h2>
                            <div className="ps-11 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { term: 'Platform', def: 'Refers to the Hyperplott web application, including all features, tools, and services.' },
                                    { term: 'User', def: 'Any individual or entity that creates an account and uses the Platform.' },
                                    { term: 'Content', def: 'All experimental designs, data, analyses, and materials created/uploaded by Users.' },
                                    { term: 'Subscription', def: 'A paid plan that grants access to specific features and usage limits.' }
                                ].map((item, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest block mb-1">{item.term}</span>
                                        <p className="text-sm">{item.def}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm border border-indigo-500/30">3</span>
                                Eligibility & Registration
                            </h2>
                            <div className="ps-11 space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-3">3.1 Requirements</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {[
                                            'At least 18 years of age',
                                            'Legal capacity for contracts',
                                            'Not prohibited by law',
                                            'Provide accurate information',
                                            'Maintain credential security'
                                        ].map((req, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm bg-white/5 p-3 rounded-lg border border-white/10">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-3">4.2 Security & Termination</h3>
                                    <p className="text-sm mb-4">You are responsible for all activities under your account. We reserve the right to suspend accounts for violations, illegal activities, inactivity, or failure to pay fees.</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm border border-emerald-500/30">5</span>
                                Pricing & Payments
                            </h2>
                            <div className="ps-11 space-y-6">
                                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-white/10 text-white font-semibold">
                                            <tr>
                                                <th className="px-6 py-4">Plan</th>
                                                <th className="px-6 py-4">Monthly</th>
                                                <th className="px-6 py-4">Features</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {[
                                                { name: 'Student', price: '₹499', feat: '50 designs/mo, Basic' },
                                                { name: 'Professional', price: '₹1,999', feat: 'Unlimited, Advanced, Priority' },
                                                { name: 'Institutional', price: '₹4,999', feat: 'Multi-user, Team collab' }
                                            ].map((plan, i) => (
                                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-white">{plan.name}</td>
                                                    <td className="px-6 py-4">{plan.price}</td>
                                                    <td className="px-6 py-4 text-xs text-gray-400">{plan.feat}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-xs">Payment Terms</h4>
                                        <p>Processed through Razorpay. Prices in INR including GST. Billed in advance monthly or annually.</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-xs">Money-Back Guarantee</h4>
                                        <p>7-day full refund for first-time subscribers. No refunds for renewals or partial months.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-sm border border-purple-500/30">7</span>
                                User Content & Ownership
                            </h2>
                            <div className="ps-11 space-y-4 text-sm">
                                <p>You retain <span className="text-white font-bold">all ownership rights</span> to experimental designs and data created or uploaded to the Platform.</p>
                                <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl space-y-3">
                                    <p className="text-white font-medium">We Guarantee:</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2">✓ No sharing content with third parties without consent</li>
                                        <li className="flex items-center gap-2">✓ No usage for purposes other than the Service</li>
                                        <li className="flex items-center gap-2">✓ No ownership claims on your content</li>
                                        <li className="flex items-center gap-2">✓ No selling or monetizing your content</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/20 text-red-400 text-sm border border-red-500/30">8</span>
                                Acceptable Use Policy
                            </h2>
                            <div className="ps-11">
                                <p className="mb-4">You agree NOT to engage in prohibited activities including but not limited to:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                    {[
                                        'Violate applicable laws',
                                        'Infringe IP rights',
                                        'Upload malicious code',
                                        'Reverse engineer the platform',
                                        'Unauthorized data harvesting',
                                        'Circumvent usage limits',
                                        'Interfere with operations',
                                        'Upload offensive content'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                                            <div className="w-1 h-1 rounded-full bg-red-500"></div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 p-4 border border-red-500/30 bg-red-500/10 rounded-xl text-red-200 text-xs">
                                    <p className="font-bold uppercase mb-1">Warning:</p>
                                    Violation may result in immediate account suspension or termination without refund, and report to law enforcement.
                                </div>
                            </div>
                        </section>

                        <div className="pt-16 mt-16 border-t border-white/10 space-y-12">
                            <section className="space-y-4">
                                <h2 className="text-xl font-semibold text-white italic">"AS IS" Disclaimer</h2>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    The platform is provided "as is" and "as available". We disclaim all warranties including merchantability and non-infringement.
                                    You are solely responsible for verifying the accuracy of experimental designs and statistical analyses generated by the platform.
                                </p>
                            </section>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <section className="space-y-4">
                                    <h3 className="text-lg font-medium text-white">Limitation of Liability</h3>
                                    <p className="text-sm">Our total liability is capped at the amount you paid us in the 12 months preceding the claim, or ₹10,000, whichever is lower.</p>
                                </section>
                                <section className="space-y-4">
                                    <h3 className="text-lg font-medium text-white">Dispute Resolution</h3>
                                    <p className="text-sm">Governed by laws of India. Disputes subject to exclusive jurisdiction in India. Mandatory informal resolution attempts before litigation.</p>
                                </section>
                            </div>
                        </div>

                        <section className="pt-12">
                            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-white/10 p-8 rounded-2xl">
                                <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { label: 'General', value: 'support@hyperplott.com' },
                                        { label: 'Legal', value: 'legal@hyperplott.com' },
                                        { label: 'Billing', value: 'billing@hyperplott.com' },
                                        { label: 'Website', value: 'hyperplott.com' }
                                    ].map((contact, i) => (
                                        <div key={i}>
                                            <p className="text-xs text-gray-500 mb-1 font-bold uppercase tracking-widest">{contact.label}</p>
                                            <p className="text-sm text-white font-medium">{contact.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <p className="text-center text-xs text-gray-600 mt-24 italic">
                            © 2026 Hyperplott (DharaAI). All Rights Reserved. These Terms and Conditions are legally binding and enforceable under Indian law.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsAndConditions;
