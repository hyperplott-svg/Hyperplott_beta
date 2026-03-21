import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ArrowRight, MessageSquare, BookOpen, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import SEO from '../components/common/SEO';

const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'data', label: 'Data & Privacy' },
];

const questions = [
    {
        category: 'getting-started',
        q: "Do I need statistics knowledge to use Hyperplott?",
        a: "No! Our AI guides you through the entire process. Simply describe your experiment — factors, responses, and goals — and we handle the statistical complexity. Whether you're a PhD researcher or a first-year student, you'll get results in minutes, not weeks."
    },
    {
        category: 'getting-started',
        q: "How is Hyperplott different from Minitab or JMP?",
        a: "We're built for the modern researcher. Hyperplott is 10x more affordable, AI-powered for intelligent guidance, fully cloud-based (no installation), and features interactive 3D visualizations that legacy tools simply don't offer. Get from experiment idea to publishable results in one session — no steep learning curve."
    },
    {
        category: 'getting-started',
        q: "What is Design of Experiments (DoE)?",
        a: "DoE is a systematic method for planning experiments to understand how different factors affect an outcome. Instead of testing one variable at a time (which takes forever), DoE lets you efficiently study multiple factors simultaneously — saving time, resources, and cost. Hyperplott makes this accessible to everyone."
    },
    {
        category: 'getting-started',
        q: "How do I get started?",
        a: "Sign up for free (no credit card required), open the DoE workspace, describe your experiment, and click Generate. Our AI will suggest the optimal design type and parameters. You'll have a complete experimental design matrix ready in under 60 seconds."
    },
    {
        category: 'features',
        q: "What design types does Hyperplott support?",
        a: "Hyperplott supports all major DoE methodologies: Full Factorial, Fractional Factorial (for screening), Response Surface Methodology (CCD & Box-Behnken for optimization), Taguchi Orthogonal Arrays (for robust design), and Mixture Designs (Simplex-Lattice & Simplex-Centroid for formulation studies)."
    },
    {
        category: 'features',
        q: "Can I export my results?",
        a: "Yes! Export your design matrix to Excel and CSV for lab use. Statistical analysis results can be exported as PDF reports with publication-quality plots. We're also building DOCX export and direct journal submission formatting — these are coming soon."
    },
    {
        category: 'features',
        q: "How does the AI analysis engine work?",
        a: "After you run your experiments and enter the results, our AI statistical engine performs automated ANOVA, regression modeling, R² analysis, and residual diagnostics. It then provides plain-language interpretation of what the results mean — no statistics textbook required."
    },
    {
        category: 'features',
        q: "What are the 3D visualizations?",
        a: "Every design type includes interactive 3D visualizations built with WebGL. View response surfaces, factor interaction plots, and design space coverage — all rotatable, zoomable, and exportable. These help you intuitively understand complex multi-factor relationships that 2D plots can't show."
    },
    {
        category: 'pricing',
        q: "Is Hyperplott free during beta?",
        a: "Yes! Hyperplott is currently in public beta with all premium features fully unlocked. Sign up for free — no credit card required. This beta period is your chance to get founding member pricing and shape the product with your feedback."
    },
    {
        category: 'pricing',
        q: "What happens after beta?",
        a: "Beta users who join now lock in our founding member rate: 50% off the regular subscription price — forever. We'll give you plenty of notice before any pricing changes, and your data and designs will always remain accessible."
    },
    {
        category: 'pricing',
        q: "Do you offer discounts for students or universities?",
        a: "Yes — educational institutions get significant discounts. Contact us at hello@hyperplott.com with your institutional email. We're committed to making professional DoE tools accessible to every research lab and classroom."
    },
    {
        category: 'data',
        q: "Is my experimental data secure?",
        a: "Absolutely. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We use Firebase's enterprise-grade cloud infrastructure. Your experimental data and intellectual property remain 100% yours — we never use, share, or train models on your research."
    },
    {
        category: 'data',
        q: "Can I delete my data?",
        a: "Yes, at any time. Go to Settings → Account → Delete Account to permanently remove all your data from our systems. We comply with GDPR and other data protection regulations. You can also export all your designs before deleting."
    },
    {
        category: 'data',
        q: "What if I need help or support?",
        a: "We're a small, founder-led team and genuinely care about your success. Reach us via our in-app chat, email at hello@hyperplott.com, or join our Slack community for direct access. Founding members get priority response and direct access to our founders."
    },
];

const FAQItem = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-primary-purple/30 transition-colors duration-300"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
            >
                <span className="text-base md:text-lg font-black text-slate-900 pr-6 tracking-tight group-hover:text-primary-purple transition-colors">
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-primary-purple text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-primary-purple/10'}`}
                >
                    <Plus className="w-4 h-4" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-2 text-slate-500 leading-relaxed font-medium text-sm md:text-base border-t border-slate-100">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filtered = activeCategory === 'all'
        ? questions
        : questions.filter(q => q.category === activeCategory);

    return (
        <div className="bg-bg-primary min-h-screen text-text-primary font-sans overflow-x-hidden">
            <SEO
                title="FAQ — Frequently Asked Questions"
                description="Find answers to common questions about Hyperplott's Design of Experiments platform, pricing, data security, and features."
                keywords="Hyperplott FAQ, DoE software questions, design of experiments help, statistical software questions"
                url="https://hyperplott.com/faq"
            />
            <Navbar />

            <main className="pt-20">
                {/* Hero */}
                <section className="relative py-20 sm:py-28 overflow-hidden bg-bg-primary">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-purple/5 blur-[120px] rounded-full" />
                        <div className="absolute inset-0 opacity-[0.35]"
                            style={{
                                backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`,
                                backgroundSize: '60px 60px'
                            }}
                        />
                    </div>

                    <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-purple/10 border border-primary-purple/20 text-primary-purple text-[10px] font-black uppercase tracking-[0.3em] mb-6"
                        >
                            <HelpCircle className="w-3.5 h-3.5" /> Help Center
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-none"
                        >
                            Questions? <br /><span className="text-gradient">We've Got Answers.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg sm:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
                        >
                            Everything you need to know about Hyperplott — from getting started to data security.
                            Can't find what you're looking for?{' '}
                            <a href="mailto:hello@hyperplott.com" className="text-primary-purple font-black hover:underline">
                                Contact us directly.
                            </a>
                        </motion.p>
                    </div>
                </section>

                {/* Quick Links */}
                <section className="py-12 bg-white border-y border-slate-100">
                    <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { icon: BookOpen, title: "Documentation", desc: "Step-by-step guides for every DoE method", href: "#" },
                                { icon: MessageSquare, title: "Live Chat", desc: "Talk to our team — usually reply in minutes", href: "mailto:hello@hyperplott.com" },
                                { icon: Zap, title: "Start Free", desc: "No credit card, all features unlocked now", href: "/signup" },
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    href={item.href}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    whileHover={{ y: -2 }}
                                    className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200 hover:border-primary-purple/30 bg-white hover:shadow-lg transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-primary-purple/10 flex items-center justify-center shrink-0 group-hover:bg-primary-purple group-hover:text-white transition-all">
                                        <item.icon className="w-5 h-5 text-primary-purple group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 text-sm uppercase tracking-tight">{item.title}</p>
                                        <p className="text-xs text-slate-400 font-medium mt-0.5">{item.desc}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 sm:py-24 bg-bg-secondary">
                    <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2 mb-10 justify-center">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeCategory === cat.id
                                        ? 'bg-primary-purple text-white shadow-lg shadow-primary-purple/20'
                                        : 'bg-white text-slate-500 border border-slate-200 hover:border-primary-purple/30 hover:text-primary-purple'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-3"
                            >
                                {filtered.map((faq, i) => (
                                    <FAQItem key={`${activeCategory}-${i}`} question={faq.q} answer={faq.a} index={i} />
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Still have questions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary-purple to-primary text-white text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-2 tracking-tight">Still have questions?</h3>
                                <p className="text-white/70 font-medium mb-6 text-sm">
                                    We're a small team and personally respond to every message.
                                </p>
                                <a
                                    href="mailto:hello@hyperplott.com"
                                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-primary-purple text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
                                >
                                    Email Us <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default FAQPage;
