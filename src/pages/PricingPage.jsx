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
        <div className="bg-bg-primary min-h-screen text-text-primary font-sans selection:bg-emerald-500/20 selection:text-emerald-500 overflow-x-hidden">
            <SEO
                title="Pricing Plans - High-Precision DoE for Everyone"
                description="Choose the right plan for your research needs. From individual students to enterprise-level research laboratories."
            />
            <Navbar />

            <main className="pt-20">
                {/* Header Section */}
                <section className="relative py-24 sm:py-32 overflow-hidden">
                    <div className="absolute top-0 right-1/2 translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                <Sparkles className="w-4 h-4" /> Scalable Intelligence
                            </div>
                            <h1 className="text-5xl sm:text-8xl font-black text-white leading-none tracking-tighter uppercase mb-8">
                                Invest in <span className="text-gradient">Precision</span>
                            </h1>
                            <p className="text-xl text-text-secondary opacity-80 max-w-2xl mx-auto font-medium leading-relaxed">
                                Flexible pricing tailored for students, independent researchers, and industry-leading laboratories.
                                Accelerate your discovery without compromise.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <Pricing />

                {/* Comparative Features */}
                <section className="py-24 bg-white/5 border-y border-white/5">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">Included in All Plans</h2>
                            <p className="text-text-secondary opacity-60">Every tier benefits from our core precision infrastructure.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10"
                                >
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-bold text-white/80">{feature}</span>
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
