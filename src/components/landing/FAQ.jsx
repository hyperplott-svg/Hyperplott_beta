import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
    const questions = [
        {
            q: "Do I need statistics knowledge?",
            a: "No! Our AI guides you through the entire process. Perfect for beginners and experts alike."
        },
        {
            q: "How is this different from Minitab/JMP?",
            a: "We're 10x cheaper, AI-powered, cloud-based, and have beautiful interactive 3D visualizations. Plus, no steep learning curve."
        },
        {
            q: "Can I export my results?",
            a: "Yes! Export to Excel, CSV, PDF, and publication-ready formats with high-resolution plots."
        },
        {
            q: "Is my data secure?",
            a: "Absolutely. Enterprise-grade encryption, secure cloud storage, and we never share your data."
        },
        {
            q: "What if I need help?",
            a: "Professional plan includes priority support. Plus, we have comprehensive tutorials and documentation."
        },
        {
            q: "Can I try before buying?",
            a: "Yes! 14-day free trial, no credit card required. Test all features risk-free."
        }
    ];

    return (
        <section className="py-40 bg-bg-secondary relative overflow-hidden" id="faq">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="section-badge"
                    >
                        FAQ
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">
                        Questions? <span className="text-gradient">Answers.</span>
                    </h2>
                    <p className="text-slate-500 text-lg font-medium">
                        Everything you need to know about starting your optimization journey.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {questions.map((faq, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="card-premium p-8"
                        >
                            <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight uppercase">
                                {faq.q}
                            </h3>
                            <p className="text-slate-500 leading-relaxed font-medium">
                                {faq.a}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-white/10 rounded-[24px] overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
            >
                <span className="text-lg md:text-xl font-bold text-white pr-8 tracking-tight group-hover:text-emerald-500 transition-colors">
                    {question}
                </span>
                <div className={`p-2 rounded-full ${isOpen ? 'bg-emerald-500 text-slate-950' : 'bg-white/5 text-slate-500'} transition-all`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-8 pb-8 text-text-secondary leading-relaxed opacity-80 text-lg">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FAQ;
