import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Linkedin, Clock, CheckCircle2, Send, ArrowRight } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import SEO from '../components/common/SEO';

const SUBJECTS = [
    'General Inquiry',
    'Beta Program',
    'Technical Support',
    'Research Partnership',
    'Enterprise / Institution',
    'Press / Media',
    'Bug Report',
    'Feature Request',
];

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        // Simulate send — in production, wire to EmailJS or a backend
        await new Promise(r => setTimeout(r, 1200));
        setSending(false);
        setSent(true);
    };

    return (
        <div className="bg-bg-primary min-h-screen text-text-primary font-sans overflow-x-hidden">
            <SEO
                title="Contact Us — Hyperplott"
                description="Get in touch with the Hyperplott team. We're a founder-led team and respond to every message personally."
                keywords="contact Hyperplott, support, enterprise inquiry, research partnership"
                url="https://hyperplott.com/contact"
            />
            <Navbar />

            <main className="pt-20">
                {/* Hero */}
                <section className="py-16 sm:py-24 bg-bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.35]"
                        style={{ backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
                    />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-purple/5 blur-[120px] rounded-full pointer-events-none" />
                    <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10 text-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-purple/10 border border-primary-purple/20 text-primary-purple text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                                <MessageSquare className="w-3.5 h-3.5" /> Get in Touch
                            </div>
                            <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter mb-4 leading-none">
                                Let's <span className="text-gradient">Talk</span>
                            </h1>
                            <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
                                We're a small, founder-led team. We read and personally respond to every message.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Cards + Form */}
                <section className="py-12 bg-bg-secondary">
                    <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                        <div className="grid lg:grid-cols-5 gap-8">
                            {/* Left: contact info */}
                            <div className="lg:col-span-2 space-y-5">
                                {[
                                    {
                                        icon: Mail,
                                        title: 'Email Us',
                                        desc: 'For all inquiries. We typically reply within 24 hours.',
                                        action: 'hello@hyperplott.com',
                                        href: 'mailto:hello@hyperplott.com',
                                        color: 'bg-primary-purple/10 text-primary-purple',
                                    },
                                    {
                                        icon: Linkedin,
                                        title: 'LinkedIn',
                                        desc: 'Connect with our founders directly.',
                                        action: 'linkedin.com/company/hyperplott',
                                        href: 'https://linkedin.com/company/hyperplott',
                                        color: 'bg-blue-50 text-blue-600',
                                    },
                                    {
                                        icon: Clock,
                                        title: 'Response Time',
                                        desc: 'Beta users get priority support.',
                                        action: 'Usually < 24 hours',
                                        href: null,
                                        color: 'bg-emerald-50 text-emerald-600',
                                    },
                                ].map(({ icon: Icon, title, desc, action, href, color }, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-purple/30 hover:shadow-md transition-all"
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <p className="font-black text-slate-900 text-sm mb-1">{title}</p>
                                        <p className="text-xs text-slate-400 font-medium mb-3">{desc}</p>
                                        {href ? (
                                            <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                                                className="text-xs font-black text-primary-purple hover:underline">
                                                {action}
                                            </a>
                                        ) : (
                                            <span className="text-xs font-black text-slate-600">{action}</span>
                                        )}
                                    </motion.div>
                                ))}

                                {/* Founders */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="p-6 bg-gradient-to-br from-primary-purple/10 to-primary/5 rounded-2xl border border-primary-purple/20"
                                >
                                    <p className="font-black text-slate-900 text-sm mb-4">Talk to a Founder</p>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Shiva Kailash', role: 'Founder & CEO', linkedin: 'https://www.linkedin.com/in/madduluri-shiva-kailash-355166281/' },
                                            { name: 'J Madhan', role: 'Co-Founder & CTO', linkedin: 'https://www.linkedin.com/in/jmadhan/' },
                                        ].map(f => (
                                            <a key={f.name} href={f.linkedin} target="_blank" rel="noreferrer"
                                                className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all group">
                                                <div className="w-8 h-8 rounded-full bg-primary-purple/20 flex items-center justify-center text-primary-purple text-xs font-black">{f.name[0]}</div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-black text-slate-900">{f.name}</p>
                                                    <p className="text-[10px] text-slate-400">{f.role}</p>
                                                </div>
                                                <Linkedin className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right: form */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-3"
                            >
                                <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                                    {!sent ? (
                                        <>
                                            <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Send a Message</h2>
                                            <form onSubmit={handleSubmit} className="space-y-5">
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Name</label>
                                                        <input
                                                            required
                                                            name="name"
                                                            value={form.name}
                                                            onChange={handleChange}
                                                            placeholder="Dr. Jane Smith"
                                                            className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-purple/20 border border-transparent focus:border-primary-purple/30 transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                                                        <input
                                                            required
                                                            type="email"
                                                            name="email"
                                                            value={form.email}
                                                            onChange={handleChange}
                                                            placeholder="jane@university.edu"
                                                            className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-purple/20 border border-transparent focus:border-primary-purple/30 transition-all"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</label>
                                                    <select
                                                        required
                                                        name="subject"
                                                        value={form.subject}
                                                        onChange={handleChange}
                                                        className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-purple/20 border border-transparent focus:border-primary-purple/30 transition-all cursor-pointer"
                                                    >
                                                        <option value="">Select a subject...</option>
                                                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                                                    </select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</label>
                                                    <textarea
                                                        required
                                                        name="message"
                                                        value={form.message}
                                                        onChange={handleChange}
                                                        rows={5}
                                                        placeholder="Tell us about your research and how we can help..."
                                                        className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-purple/20 border border-transparent focus:border-primary-purple/30 transition-all resize-none"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={sending}
                                                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-primary-purple to-primary text-white font-black text-sm uppercase tracking-widest disabled:opacity-60 hover:scale-[1.02] transition-transform shadow-lg shadow-primary-purple/20"
                                                >
                                                    {sending ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
                                                </button>
                                            </form>
                                        </>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-12"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-900 mb-2">Message Sent!</h3>
                                            <p className="text-slate-500 font-medium mb-6 text-sm">We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
                                            <button
                                                onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                                                className="text-primary-purple text-sm font-black hover:underline"
                                            >
                                                Send another message
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
