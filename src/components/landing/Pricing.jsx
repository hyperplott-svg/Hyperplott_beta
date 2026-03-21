import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import CheckoutModal from '../payment/CheckoutModal';

const plans = [
    {
        name: "Researcher",
        price: "0",
        description: "Essential tools for students and independent researchers.",
        features: [
            "10 active experimental designs",
            "Full Factorial Matrix Gen",
            "Desktop 3D Visualization",
            "Standard Export Formats",
            "Community Forum Access"
        ],
        cta: "Enter Laboratory",
        popular: false
    },
    {
        name: "Professional",
        price: "0",
        description: "Advanced intelligence engine for enterprise labs.",
        features: [
            "Unlimited active designs",
            "Response Surface Designs",
            "High-Fidelity 3D Engine",
            "Full ANOVA Diagnostic Suite",
            "Priority Technical Support",
            "Custom Export Templates"
        ],
        cta: "Enter Laboratory",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Free Beta",
        description: "Infrastructure for global research institutions.",
        features: [
            "Private VPC Deployment",
            "Single Sign-On (SSO)",
            "Full REST API Access",
            "On-site Onboarding",
            "Guaranteed SLA Response",
            "Regulatory Compliance Mode"
        ],
        cta: "Access Demo",
        popular: false
    }
];

const Pricing = () => {
    const [annual, setAnnual] = useState(false);
    const [checkoutPlan, setCheckoutPlan] = useState(null);

    return (
        <>
        {checkoutPlan && (
            <CheckoutModal
                plan={checkoutPlan}
                annual={annual}
                onClose={() => setCheckoutPlan(null)}
            />
        )}
        <section id="pricing" className="py-24 bg-bg-primary relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                <div className="text-center mb-12">
                    <div className="section-badge">Public Beta Path</div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
                        Open <span className="text-gradient">Scientific Research.</span>
                    </h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium mb-10">
                        Currently in public beta. <span className="text-slate-900 font-bold">All premium features</span> are accessible via our priority demo gateway.
                    </p>

                    {/* Billing toggle */}
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-[11px] font-black tracking-[0.2em] transition-colors ${!annual ? 'text-slate-900' : 'text-slate-400'}`}>MONTHLY</span>
                        <button
                            onClick={() => setAnnual(!annual)}
                            className={`w-14 h-7 rounded-full p-1 relative transition-colors duration-300 ${annual ? 'bg-primary-purple' : 'bg-slate-200'}`}
                        >
                            <motion.div
                                animate={{ x: annual ? 28 : 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className="w-5 h-5 rounded-full bg-white shadow-md"
                            />
                        </button>
                        <span className={`text-[11px] font-black tracking-[0.2em] transition-colors ${annual ? 'text-slate-900' : 'text-slate-400'}`}>ANNUAL</span>
                        <div className="px-3 py-1 bg-primary-purple/10 border border-primary-purple/20 text-primary-purple text-[9px] font-black tracking-widest rounded-full">
                            SAVE 20%
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-stretch max-w-6xl mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`card-premium p-8 md:p-10 flex flex-col relative ${plan.popular ? 'ring-2 ring-primary-purple shadow-2xl shadow-primary-purple/10 lg:scale-105 z-10' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 px-4 py-1 bg-primary-purple text-white text-[10px] font-black uppercase tracking-widest rounded-bl-xl rounded-tr-xl">
                                    Recommended
                                </div>
                            )}

                            <div className="mb-8">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">
                                    {plan.name}
                                </span>
                                <div className="flex items-baseline gap-1 mb-3">
                                    <span className="text-5xl font-black text-slate-900 tracking-tight">
                                        {plan.price !== "Free Beta" ? `₹${plan.price}` : plan.price}
                                    </span>
                                    {plan.price !== "Free Beta" && <span className="text-lg text-slate-400 font-bold">/mo</span>}
                                </div>
                                <p className="text-slate-500 font-medium text-sm">{plan.description}</p>
                            </div>

                            <div className="space-y-3 mb-8 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <Check className="w-4 h-4 text-primary-purple stroke-[3] shrink-0" />
                                        <span className="text-slate-600 font-medium text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setCheckoutPlan(plan.name)}
                                className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all text-center block ${
                                    plan.popular
                                        ? 'bg-primary-purple text-white shadow-lg hover:shadow-primary-purple/30 hover:bg-primary-purple/90'
                                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                }`}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
};

export default Pricing;
