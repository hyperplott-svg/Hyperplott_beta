import React, { useEffect } from 'react';
import Navbar from '../components/landing/Navbar';
import FounderStory from '../components/landing/FounderStory';
import Founders from '../components/landing/Founders';
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
        <div className="bg-bg-primary min-h-screen text-text-primary font-sans selection:bg-emerald-500/20 selection:text-emerald-500 overflow-x-hidden">
            <SEO
                title="About Us - The Team Behind Hyperplott"
                description="Hyperplott is built by scientists, for scientists. Learn about our mission to democratize advanced experimental design."
            />
            <Navbar />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative py-24 sm:py-32 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                <Sparkles className="w-4 h-4" /> Our Scientific Mission
                            </div>
                            <h1 className="text-5xl sm:text-8xl font-black text-white leading-none tracking-tighter uppercase mb-8">
                                Democratizing <span className="text-gradient">Precision</span>
                            </h1>
                            <p className="text-xl text-text-secondary opacity-80 max-w-2xl mx-auto font-medium leading-relaxed">
                                We're on a mission to put powerful statistical design tools into the hands of every researcher,
                                eliminating the technical barriers to scientific discovery.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-24 bg-white/5 border-y border-white/5">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
                                    className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all group"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-8 group-hover:scale-110 transition-transform">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">{value.title}</h3>
                                    <p className="text-text-secondary opacity-70 leading-relaxed">{value.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <FounderStory />
                <Founders />
                <CTA />
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
