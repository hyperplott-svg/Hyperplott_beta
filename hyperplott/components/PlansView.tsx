
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import type { ViewType } from '../types';
// Fix: Import CheckIcon from constants.tsx
import { CheckIcon, XIcon } from '../constants'; 

const plans = [
    {
        name: 'Free',
        emoji: '🆓',
        tagline: 'For trying the basics.',
        price: { monthly: 0, yearly: 0 },
        buttonText: 'Get Started',
        features: [
            { text: '20 messages/day (text only)', included: true },
            { text: 'Voice Chat', included: false },
            { text: '2 files/month (max 5MB, text-only)', included: true },
            { text: '5 Flashcards & Flowcharts/month', included: true },
            { text: '3 Drug Info searches/day', included: true },
            { text: '10 Auto Quiz Qs/day', included: true },
            { text: '250 words/day Grammar Corrector', included: true },
            { text: 'Plagiarism, Paraphraser, Research Tool', included: false },
        ]
    },
    {
        name: 'Plus',
        emoji: '💡',
        tagline: 'For students and light users.',
        price: { monthly: 399, yearly: 3999 },
        buttonText: 'Upgrade to Plus',
        features: [
            { text: 'Unlimited text + 50 voice mins/month', included: true },
            { text: '20 files/month (max 10MB, handwritten)', included: true },
            { text: '50 Flashcards & Flowcharts/month', included: true },
            { text: '20 Drug Info searches/day', included: true },
            { text: '50 Auto Quiz Qs/day', included: true },
            { text: '2,000 words/month Paraphraser & Grammar', included: true },
            { text: '2 basic Plagiarism reports/month', included: true },
            { text: 'Abstracts & summaries Research Tool', included: true },
        ]
    },
    {
        name: 'Pro',
        emoji: '🚀',
        tagline: 'For professionals and researchers.',
        price: { monthly: 999, yearly: 9999 },
        buttonText: 'Upgrade to Pro',
        isPopular: true,
        features: [
            { text: 'Unlimited text + 200 voice mins/month', included: true },
            { text: '50 files/month (max 50MB, OCR)', included: true },
            { text: 'Unlimited Flashcards & Flowcharts', included: true },
            { text: 'Unlimited Drug Info searches', included: true },
            { text: 'Unlimited Auto Quiz (export)', included: true },
            { text: '10,000 words/month Paraphraser & Grammar', included: true },
            { text: '20 detailed Plagiarism reports/month', included: true },
            { text: 'Full Research Tool', included: true },
        ]
    },
    {
        name: 'Pro +',
        emoji: '🏫',
        tagline: 'For institutions and power users.',
        price: { monthly: 1999, yearly: 19999 },
        buttonText: 'Contact Sales',
        features: [
            { text: 'Unlimited Chat & Voice', included: true },
            { text: 'Unlimited files (max 100MB, OCR+)', included: true },
            { text: 'Unlimited all core tools', included: true },
            { text: 'Unlimited Plagiarism reports', included: true },
            { text: 'Full Research Tool + templates', included: true },
            { text: 'Lecture Builder (Auto-PPTs, assignments)', included: true },
            { text: 'Priority support', included: true },
            { text: 'Team features', included: true },
        ]
    }
];

const PlansView: React.FC<{ setActiveView: (view: ViewType) => void }> = ({ setActiveView }) => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <div className="h-full flex flex-col gap-6 bg-transparent rounded-2xl p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="text-center mb-4">
                    <h2 className="text-4xl font-bold tracking-tight text-stone-900">DharaAI Plans</h2>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center p-1 bg-black/5 rounded-full">
                        <button 
                            onClick={() => setBillingCycle('monthly')} 
                            className={`px-6 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${billingCycle === 'monthly' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-800'}`}
                        >
                            Monthly
                        </button>
                        <button 
                            onClick={() => setBillingCycle('yearly')} 
                            className={`px-6 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${billingCycle === 'yearly' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-800'}`}
                        >
                            Yearly
                        </button>
                    </div>

                    <AnimatePresence>
                        {billingCycle === 'yearly' && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <span className="text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">Save up to 16%</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {plans.map((plan) => (
                    <motion.div 
                        key={plan.name} 
                        variants={cardVariants}
                        className={`relative flex flex-col p-6 rounded-2xl border transition-transform duration-300 hover:-translate-y-2 ${plan.isPopular ? 'border-emerald-500/80 bg-emerald-500/10' : 'border-black/5 bg-white/60 backdrop-blur-lg'}`}
                    >
                        {plan.isPopular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>}
                        <div className="flex-grow">
                            <div className="text-3xl mb-2">{plan.emoji}</div>
                            <h3 className="text-2xl font-bold text-stone-900">{plan.name}</h3>
                            <p className="text-stone-500 text-sm mt-1 mb-4 h-10">{plan.tagline}</p>
                            
                            {plan.name === 'Pro +' ? (
                                <>
                                    <div className="text-3xl font-bold mb-1 text-stone-800">Contact Sales</div>
                                    <div className="text-sm text-stone-400 mb-6 h-[20px]"></div>
                                </>
                            ) : (
                                <>
                                    <div className="text-4xl font-bold mb-1 text-stone-900">
                                        {plan.price[billingCycle] > 0 ? `₹${plan.price[billingCycle].toLocaleString('en-IN')}` : 'Free'}
                                    </div>
                                    <div className="text-sm text-stone-500 mb-6">{plan.price[billingCycle] > 0 ? `per ${billingCycle === 'monthly' ? 'month' : 'year'}` : 'Forever'}</div>
                                </>
                            )}
                            
                            <ul className="space-y-3 text-sm">
                                {plan.features.map(feature => (
                                    <li key={feature.text} className="flex items-start gap-3">
                                        {feature.included ? <CheckIcon className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" /> : <XIcon className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />}
                                        <span className={feature.included ? 'text-stone-700' : 'text-stone-400'}>{feature.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <motion.button whileTap={{ scale: 0.95 }} className={`w-full mt-8 py-3 rounded-lg font-semibold transition-colors ${plan.isPopular ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-gray-800 hover:bg-gray-900 text-white'}`}>
                            {plan.buttonText}
                        </motion.button>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default PlansView;
