import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
    const questions = [
        {
            q: "Do I need statistics knowledge to use Hyperplott?",
            a: "No! Our AI guides you through the entire process, suggested factors, and interpreting results. It's designed to be used by researchers, not just statisticians."
        },
        {
            q: "Can I export my designs to Excel/CSV?",
            a: "Yes, you can export your designs, matrixes, and analysis results to Excel, CSV, PDF, and publication-ready Word documents."
        },
        {
            q: "What makes Hyperplott different from Minitab or JMP?",
            a: "Hyperplott is 10x more affordable, browser-based, and powered by AI agents. We focus on modern UX and 3D interactivity rather than just tables and static charts."
        },
        {
            q: "Is my data secure?",
            a: "Absolutely. We use enterprise-grade AES-256 encryption. Your experimental data is stored in secure, private containers and is never used for training models without consent."
        },
        {
            q: "Do you offer student discounts?",
            a: "Yes! Students and academic researchers with a valid .edu email get 50% off all plans. Contact support for your discount code."
        }
    ];

    return (
        <section className="py-40 bg-bg-primary relative overflow-hidden" id="faq">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary-purple/10 border border-primary-purple/20 text-primary-purple text-[10px] font-black uppercase tracking-[0.4em] mb-8"
                    >
                        <HelpCircle className="w-4 h-4" />
                        Common inquiries
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6">
                        FAQ.
                    </h2>
                    <p className="text-text-secondary text-lg opacity-70">
                        Everything you need to know about starting your optimization journey.
                    </p>
                </div>

                <div className="space-y-4">
                    {questions.map((faq, i) => (
                        <FAQItem key={i} question={faq.q} answer={faq.a} />
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
                <span className="text-lg md:text-xl font-bold text-white pr-8 tracking-tight group-hover:text-primary-purple transition-colors">
                    {question}
                </span>
                <div className={`p-2 rounded-full ${isOpen ? 'bg-primary-purple text-white' : 'bg-white/5 text-text-secondary'} transition-all`}>
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
