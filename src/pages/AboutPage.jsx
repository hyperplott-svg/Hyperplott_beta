import React, { useEffect } from 'react';
import Navbar from '../components/landing/Navbar';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';
import SEO from '../components/common/SEO';
import { motion } from 'framer-motion';
import { Target, Users, Sparkles, ShieldCheck } from 'lucide-react';

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-bg-primary min-h-screen text-text-primary font-sans selection:bg-primary-purple/20 selection:text-primary-purple overflow-x-hidden">
            <SEO
                title="About Us — The Team Behind Hyperplott"
                description="Hyperplott is built by PhD researchers and engineers on a mission to democratize advanced experimental design. Learn our story and meet the team."
                keywords="about Hyperplott, DoE research team, scientific AI company, design of experiments founders, PhD researchers"
                url="https://hyperplott.com/about"
            />
            <Navbar />

            <main className="pt-20">
                {/* Hero Section */}
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
                                <Sparkles className="w-3.5 h-3.5" /> Our Scientific Mission
                            </div>
                            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-slate-900 leading-none tracking-tighter mb-8">
                                Democratizing <span className="text-gradient">Precision</span>
                            </h1>
                            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                                We're on a mission to put powerful statistical design tools into the hands of every researcher,
                                eliminating the technical barriers to scientific discovery.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-20 bg-bg-secondary border-y border-slate-100">
                    <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Target className="w-8 h-8" />,
                                    title: "Accuracy First",
                                    desc: "Our algorithms are built on decades of peer-reviewed statistical methodology."
                                },
                                {
                                    icon: <Users className="w-8 h-8" />,
                                    title: "User Centric",
                                    desc: "We prioritize the researcher's workflow, making complex tools intuitive."
                                },
                                {
                                    icon: <ShieldCheck className="w-8 h-8" />,
                                    title: "Data Sovereignty",
                                    desc: "Your research data remains your proprietary intellectual property."
                                }
                            ].map((value, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                                    className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary-purple/30 hover:shadow-xl hover:shadow-primary-purple/5 transition-all duration-300 group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-primary-purple/10 flex items-center justify-center text-primary-purple mb-6 group-hover:scale-110 transition-transform">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">{value.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium text-sm">{value.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <CTA />
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
