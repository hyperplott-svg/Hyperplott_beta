import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Tag, BookOpen, TrendingUp } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import SEO from '../components/common/SEO';

const posts = [
    {
        id: 'intro-factorial-design',
        title: 'Introduction to Factorial Design: Why Testing One Variable at a Time Wastes Your Research',
        excerpt: 'Most researchers default to OFAT (One Factor At A Time) experiments. We explain why this misses interactions and how factorial designs solve it with fewer runs.',
        category: 'Fundamentals',
        date: '2026-03-15',
        readTime: '8 min read',
        author: 'Shiva Kailash',
        authorRole: 'PhD Researcher',
        featured: true,
        image: '🧪',
        color: 'from-primary-purple/10 to-primary/5',
    },
    {
        id: 'rsm-pharma',
        title: 'Response Surface Methodology in Pharmaceutical Formulation: A Practical Guide',
        excerpt: 'How pharma researchers use CCD and Box-Behnken designs to optimize tablet formulations, coating thickness, and API dissolution rates.',
        category: 'Case Study',
        date: '2026-03-10',
        readTime: '12 min read',
        author: 'Shiva Kailash',
        authorRole: 'PhD Researcher',
        featured: false,
        image: '💊',
        color: 'from-accent-teal/10 to-primary-purple/5',
    },
    {
        id: 'taguchi-robust-quality',
        title: 'Taguchi Methods for Robust Quality: Making Products That Work Under Real-World Conditions',
        excerpt: 'Signal-to-noise ratios, orthogonal arrays, and the philosophy of robust design explained — with examples from electronics manufacturing.',
        category: 'Design Methods',
        date: '2026-03-05',
        readTime: '10 min read',
        author: 'J Madhan',
        authorRole: 'Co-Founder & CTO',
        featured: false,
        image: '⚙️',
        color: 'from-primary/10 to-accent-teal/5',
    },
    {
        id: 'anova-explained',
        title: 'ANOVA Explained Without the Statistics Degree: Reading Your Results in Plain English',
        excerpt: 'P-values, F-statistics, R² — demystified. A practical walkthrough of the analysis output you get from DoE, written for bench scientists.',
        category: 'Analysis',
        date: '2026-02-28',
        readTime: '7 min read',
        author: 'Shiva Kailash',
        authorRole: 'PhD Researcher',
        featured: false,
        image: '📊',
        color: 'from-primary-purple/10 to-accent-teal/5',
    },
    {
        id: 'minitab-vs-hyperplott',
        title: 'Minitab vs JMP vs Hyperplott: A Researcher\'s Honest Comparison in 2026',
        excerpt: 'We compare the three most popular DoE platforms on price, learning curve, features, and AI capabilities. Spoiler: the market has changed.',
        category: 'Comparison',
        date: '2026-02-20',
        readTime: '15 min read',
        author: 'J Madhan',
        authorRole: 'Co-Founder & CTO',
        featured: false,
        image: '⚖️',
        color: 'from-primary/10 to-primary-purple/5',
    },
    {
        id: 'doe-food-science',
        title: 'Optimizing Food Formulations with DoE: From Recipe to Reproducible Product',
        excerpt: 'How food scientists use mixture designs and RSM to optimize taste, texture, shelf life, and nutritional content simultaneously.',
        category: 'Case Study',
        date: '2026-02-12',
        readTime: '9 min read',
        author: 'Shiva Kailash',
        authorRole: 'PhD Researcher',
        featured: false,
        image: '🌾',
        color: 'from-accent-teal/10 to-primary/5',
    },
];

const categories = ['All', 'Fundamentals', 'Case Study', 'Design Methods', 'Analysis', 'Comparison'];

const BlogPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const filtered = activeCategory === 'All'
        ? posts
        : posts.filter(p => p.category === activeCategory);

    const featured = posts.find(p => p.featured);
    const rest = filtered.filter(p => !p.featured || activeCategory !== 'All');

    return (
        <div className="bg-bg-primary min-h-screen text-text-primary font-sans overflow-x-hidden">
            <SEO
                title="Blog — Hyperplott"
                description="Articles on Design of Experiments, statistical analysis, and scientific optimization from the Hyperplott research team."
                keywords="DoE blog, design of experiments articles, statistical analysis tutorial, research methodology, scientific AI"
                url="https://hyperplott.com/blog"
            />
            <Navbar />

            <main className="pt-20">
                {/* Hero */}
                <section className="py-16 sm:py-24 bg-bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.35]"
                        style={{ backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
                    />
                    <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-purple/10 border border-primary-purple/20 text-primary-purple text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                                <BookOpen className="w-3.5 h-3.5" /> Research Insights
                            </div>
                            <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter mb-4 leading-none">
                                The <span className="text-gradient">Hyperplott</span> Blog
                            </h1>
                            <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
                                Practical guides, case studies, and deep dives on Design of Experiments from the research team.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Featured Post */}
                {activeCategory === 'All' && featured && (
                    <section className="py-8 bg-white border-y border-slate-100">
                        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-3.5 h-3.5" /> Featured
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`rounded-3xl bg-gradient-to-br ${featured.color} border border-slate-100 p-8 sm:p-12 flex flex-col sm:flex-row gap-8 items-start hover:shadow-xl transition-all cursor-pointer`}
                            >
                                <div className="text-6xl sm:text-8xl">{featured.image}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-2.5 py-1 rounded-full bg-primary-purple/10 text-primary-purple text-[10px] font-black uppercase tracking-widest">{featured.category}</span>
                                        <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3 leading-tight">{featured.title}</h2>
                                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-primary-purple/20 flex items-center justify-center text-primary-purple text-[10px] font-black">{featured.author[0]}</div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900">{featured.author}</p>
                                                <p className="text-[10px] text-slate-400">{featured.date}</p>
                                            </div>
                                        </div>
                                        <Link to={`/blog/${featured.id}`} className="flex items-center gap-2 text-primary-purple text-xs font-black uppercase tracking-widest hover:gap-3 transition-all">
                                            Read More <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* All Posts */}
                <section className="py-16 bg-bg-secondary">
                    <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                        {/* Category filter */}
                        <div className="flex flex-wrap gap-2 mb-10">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-primary-purple text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:border-primary-purple/30'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rest.map((post, i) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07 }}
                                    whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                                    className="bg-white rounded-2xl border border-slate-200 hover:border-primary-purple/30 hover:shadow-xl transition-all overflow-hidden"
                                >
                                    <div className={`h-36 bg-gradient-to-br ${post.color} flex items-center justify-center text-5xl`}>
                                        {post.image}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest">{post.category}</span>
                                            <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                                        </div>
                                        <h3 className="text-base font-black text-slate-900 mb-2 leading-tight tracking-tight">{post.title}</h3>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-primary-purple/10 flex items-center justify-center text-primary-purple text-[9px] font-black">{post.author[0]}</div>
                                                <p className="text-[10px] font-bold text-slate-600">{post.author}</p>
                                            </div>
                                            <Link to={`/blog/${post.id}`} className="text-primary-purple text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                                                Read <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {rest.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-slate-400 font-medium">No posts in this category yet.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPage;
