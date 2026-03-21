import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Bug, Sparkles, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import SEO from '../components/common/SEO';

const releases = [
    {
        version: 'v1.4.0',
        date: '2026-03-21',
        label: 'Latest',
        labelColor: 'bg-emerald-500',
        changes: [
            { type: 'feature', text: 'Dedicated FAQ page with category filters and 14 searchable questions' },
            { type: 'feature', text: 'Documentation page with full sidebar navigation and searchable guides' },
            { type: 'feature', text: 'Blog with 6 research articles on DoE methodology' },
            { type: 'feature', text: 'Contact page with form and direct calendar link' },
            { type: 'feature', text: 'Changelog page (you are here!)' },
            { type: 'improvement', text: 'All pages converted to consistent light theme — no more invisible text' },
            { type: 'improvement', text: 'Footer updated with real social links, docs, blog, and changelog' },
            { type: 'improvement', text: 'Navbar Docs → FAQ link update' },
            { type: 'improvement', text: 'Firebase Firestore + Storage initialized for future cloud sync' },
            { type: 'fix', text: 'Email standardized to hello@hyperplott.com across all pages' },
            { type: 'fix', text: 'Social media links replaced (no more # placeholders)' },
        ]
    },
    {
        version: 'v1.3.0',
        date: '2026-03-18',
        label: null,
        changes: [
            { type: 'feature', text: 'Dashboard completely redesigned — animated stat counters, activity feed, terminal widget' },
            { type: 'feature', text: 'Dashboard hero shows personalized greeting with Firebase display name' },
            { type: 'improvement', text: 'DoE Engine header made more compact and professional' },
            { type: 'improvement', text: 'Inline "Add Factor" and "Add Response" buttons replace large FAB' },
            { type: 'improvement', text: 'Card padding reduced from sm:p-12 → sm:p-8 throughout DoE engine' },
            { type: 'fix', text: 'AI Dimension Probe Error: res.text is not a function — fixed with safeGetText helper' },
            { type: 'fix', text: 'Analysis Engine JSON parse error on unescaped newlines — fixed with char-by-char scanner' },
        ]
    },
    {
        version: 'v1.2.0',
        date: '2026-03-14',
        label: null,
        changes: [
            { type: 'feature', text: 'Separate About, Pricing, FAQ pages — landing page is now focused and fast' },
            { type: 'feature', text: 'HowItWorks animated connecting line (scaleX 0→1 on scroll)' },
            { type: 'feature', text: 'Hero animated rotating domain text (Chemistry → Pharma → Materials → Engineering)' },
            { type: 'improvement', text: 'All landing sections: py-40 → py-24 (removes excessive vertical spacing)' },
            { type: 'improvement', text: 'ProblemStatement cards now show stat numbers (₹50k+, 3+ weeks, 2D only)' },
            { type: 'improvement', text: 'Features section title changed from duplicate hero copy to "Everything You Need to Run Better Science"' },
            { type: 'fix', text: 'Pricing cards: scale-105 → lg:scale-105 (fixes mobile card overlap)' },
            { type: 'fix', text: 'VisualizationShowcase: bg-bg-primary (white) → bg-slate-950 (dark) — text was invisible' },
            { type: 'fix', text: 'FAQ accordion: replaced static grid with interactive accordion component' },
        ]
    },
    {
        version: 'v1.1.0',
        date: '2026-03-08',
        label: null,
        changes: [
            { type: 'feature', text: 'Footer Resources column: Privacy, Terms, Contact, Status badge' },
            { type: 'feature', text: 'Header: shows actual Firebase displayName, gradient avatar with initials fallback' },
            { type: 'feature', text: 'Header dropdown: click-away backdrop closes menu' },
            { type: 'improvement', text: 'Footer padding: pt-32 pb-16 → pt-20 pb-12 (more compact)' },
            { type: 'improvement', text: 'SEO: all 11 pages now have full title + description + keywords + url' },
            { type: 'improvement', text: 'Retry logic: increased AI retries from 3 to 6 for better persistence' },
        ]
    },
    {
        version: 'v1.0.0',
        date: '2026-03-01',
        label: 'Initial',
        labelColor: 'bg-slate-400',
        changes: [
            { type: 'feature', text: 'Public beta launch — full AI-powered DoE engine live' },
            { type: 'feature', text: 'Factorial, RSM (CCD/BBD), Taguchi, and Mixture design types' },
            { type: 'feature', text: 'AI-powered factor suggestion using Google Gemini' },
            { type: 'feature', text: 'Automated ANOVA and regression analysis' },
            { type: 'feature', text: '3D response surface plots with WebGL' },
            { type: 'feature', text: 'PDF and DOCX export (publication-ready)' },
            { type: 'feature', text: 'Firebase authentication (Email + Google OAuth)' },
            { type: 'feature', text: 'Demo mode — explore without signing up' },
            { type: 'feature', text: 'Landing page, About, Pricing, Login, Signup' },
        ]
    },
];

const typeConfig = {
    feature: { icon: Sparkles, label: 'New', color: 'text-primary-purple bg-primary-purple/10' },
    improvement: { icon: ArrowUpRight, label: 'Improved', color: 'text-accent-teal bg-accent-teal/10' },
    fix: { icon: Bug, label: 'Fixed', color: 'text-amber-600 bg-amber-50' },
};

const ChangelogPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="bg-bg-primary min-h-screen text-text-primary font-sans overflow-x-hidden">
            <SEO
                title="Changelog — Hyperplott"
                description="What's new in Hyperplott. Full version history with features, improvements, and bug fixes."
                keywords="Hyperplott changelog, version history, release notes, updates"
                url="https://hyperplott.com/changelog"
            />
            <Navbar />

            <main className="pt-20">
                {/* Hero */}
                <section className="py-16 sm:py-24 bg-bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.35]"
                        style={{ backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
                    />
                    <div className="container mx-auto px-4 sm:px-6 max-w-3xl relative z-10 text-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-purple/10 border border-primary-purple/20 text-primary-purple text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                                <Zap className="w-3.5 h-3.5" /> What's New
                            </div>
                            <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter mb-4 leading-none">Changelog</h1>
                            <p className="text-lg text-slate-500 font-medium">Every feature, fix, and improvement — version by version.</p>
                        </motion.div>
                    </div>
                </section>

                {/* Releases */}
                <section className="py-16 bg-bg-secondary">
                    <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-200 hidden sm:block" />

                            <div className="space-y-12">
                                {releases.map((release, i) => (
                                    <motion.div
                                        key={release.version}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                        className="sm:pl-10 relative"
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute left-0 top-1 w-[23px] h-[23px] rounded-full border-4 border-white bg-primary-purple shadow-md hidden sm:block" />

                                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                            {/* Release header */}
                                            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl font-black text-slate-900 tracking-tight">{release.version}</span>
                                                    {release.label && (
                                                        <span className={`${release.labelColor} text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded`}>
                                                            {release.label}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-sm text-slate-400 font-medium">{release.date}</span>
                                            </div>

                                            {/* Changes */}
                                            <div className="p-6 space-y-2">
                                                {release.changes.map((change, j) => {
                                                    const { icon: Icon, label, color } = typeConfig[change.type];
                                                    return (
                                                        <div key={j} className="flex items-start gap-3">
                                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest shrink-0 mt-0.5 ${color}`}>
                                                                <Icon className="w-3 h-3" />
                                                                {label}
                                                            </span>
                                                            <p className="text-sm text-slate-600 font-medium leading-snug">{change.text}</p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ChangelogPage;
