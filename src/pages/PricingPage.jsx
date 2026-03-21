import React, { useEffect } from 'react';
import Navbar from '../components/landing/Navbar';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';
import SEO from '../components/common/SEO';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const PricingPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-bg-primary min-h-screen text-text-primary font-sans selection:bg-primary-purple/20 selection:text-primary-purple overflow-x-hidden">
            <SEO
                title="Pricing Plans — High-Precision DoE for Everyone"
                description="Hyperplott is free during beta. Choose the plan that fits your research — from individual students to enterprise laboratories. First 100 users get 50% off lifetime."
                keywords="DoE pricing, design of experiments software price, free research tool, beta access, scientific software cost"
                url="https://hyperplott.com/pricing"
            />
            <Navbar />

            <main className="pt-20">
                {/* Header Section */}
                <section className="relative py-24 sm:py-32 overflow-hidden bg-bg-primary">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-purple/5 blur-[120px] rounded-full" />
                        <div className="absolute inset-0 opacity-[0.35]"
                            style={{
                                backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`,
                                backgroundSize: '60px 60px'
                            }}
                        />
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-purple/10 border border-primary-purple/20 text-primary-purple text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                                <Sparkles className="w-3.5 h-3.5" /> Scalable Intelligence
                            </div>
                            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-slate-900 leading-none tracking-tighter mb-8">
                                Invest in <span className="text-gradient">Precision</span>
                            </h1>
                            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                                Flexible pricing tailored for students, independent researchers, and industry-leading laboratories.
                                Accelerate your discovery without compromise.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <Pricing />

                {/* Included in All Plans */}
                <section className="py-24 bg-bg-secondary border-y border-slate-100">
                    <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                        <div className="text-center mb-16">
                            <div className="section-badge">Every Plan Includes</div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">Included in All Plans</h2>
                            <p className="text-slate-500 font-medium">Every tier benefits from our core precision infrastructure.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                "Advanced Factorial Designs",
                                "AI-Powered Factor Suggestion",
                                "Interactive 3D Response Surfaces",
                                "One-Click ANOVA Reports",
                                "Secure Cloud Data Storage",
                                "Professional PDF/Word Exports",
                                "Real-time Lab Replicates",
                                "Model Diagnostic Suite",
                                "Unlimited Project Archiving"
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-primary-purple/30 hover:shadow-md transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary-purple/10 flex items-center justify-center text-primary-purple shrink-0">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <FAQ />
                <CTA />
            </main>

            <Footer />
        </div>
    );
};

export default PricingPage;
