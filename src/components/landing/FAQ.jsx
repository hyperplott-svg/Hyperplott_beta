import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const questions = [
    {
        q: "Do I need statistics knowledge?",
        a: "No! Our AI guides you through the entire process. Simply describe your experiment and we handle the complexity. Perfect for beginners and experts alike."
    },
    {
        q: "How is this different from Minitab or JMP?",
        a: "We're 10x cheaper, AI-powered, cloud-based, and have beautiful interactive 3D visualizations. Plus, no steep learning curve — get results in minutes, not weeks."
    },
    {
        q: "Can I export my results?",
        a: "Yes! Export to Excel, CSV, PDF, and publication-ready formats with high-resolution plots. All major file formats are supported."
    },
    {
        q: "Is my data secure?",
        a: "Absolutely. Enterprise-grade encryption, secure cloud storage, and we never share your data. Your experimental IP stays with you."
    },
    {
        q: "What if I need help?",
        a: "Professional plan includes priority support. Plus, we have comprehensive tutorials, documentation, and an active researcher community."
    },
    {
        q: "Can I try before buying?",
        a: "Hyperplott is currently in public beta with all premium features unlocked. Sign up for free — no credit card required."
    }
];

const FAQItem = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07, duration: 0.5 }}
            className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-primary-purple/30 transition-colors"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
            >
                <span className="text-base md:text-lg font-black text-slate-900 pr-6 tracking-tight group-hover:text-primary-purple transition-colors">
                    {question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-primary-purple text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-primary-purple/10'}`}>
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
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-5 pt-4 text-slate-500 leading-relaxed font-medium text-sm md:text-base border-t border-slate-100">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    return (
        <section className="py-24 bg-bg-secondary relative overflow-hidden" id="faq">
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-badge"
                    >
                        FAQ
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4"
                    >
                        Questions? <span className="text-gradient">Answers.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg font-medium"
                    >
                        Everything you need to know about starting your optimization journey.
                    </motion.p>
                </div>

                <div className="space-y-3">
                    {questions.map((faq, i) => (
                        <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
