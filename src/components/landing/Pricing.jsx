import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star, ShieldCheck, Globe } from 'lucide-react';

const Pricing = () => {
    const [annual, setAnnual] = useState(false);

    const plans = [
        {
            name: "Researcher",
            price: annual ? "399" : "499",
            description: "Essential tools for students and independent researchers.",
            features: [
                "10 active experimental designs",
                "Full Factorial Matrix Gen",
                "Desktop 3D Visualization",
                "Standard Export Formats",
                "Community Forum Access"
            ],
            cta: "Choose Researcher",
            popular: false
        },
        {
            name: "Professional",
            price: annual ? "1599" : "1999",
            description: "Advanced intelligence engine for enterprise labs.",
            features: [
                "Unlimited active designs",
                "Response Surface Designs",
                "High-Fidelity 3D Engine",
                "Full ANOVA Diagnostic Suit",
                "Priority Technical Support",
                "Custom Export Templates"
            ],
            cta: "Choose Professional",
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "Infrastructure for global research institutions.",
            features: [
                "Private VPC Deployment",
                "Single Sign-On (SSO)",
                "Full REST API Access",
                "On-site Onboarding",
                "Guaranteed SLA response",
                "Regulatory Compliance Mode"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    return (
        <section id="pricing" className="py-40 bg-bg-primary relative overflow-hidden">
            {/* Atmosphere */}
            <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-primary/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-secondary/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-purple text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-inner-glow"
                    >
                        Commercial investment
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none"
                    >
                        Flexible <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent-pink">Plans</span>.
                    </motion.h2>

                    <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-medium opacity-80 mb-8">
                        Start with a <span className="text-white font-bold">14-day FREE trial</span>. No credit card required.
                    </p>
                    <p className="text-sm text-text-tertiary max-w-2xl mx-auto font-bold uppercase tracking-widest mb-16 px-6 py-3 bg-white/5 border border-white/5 rounded-2xl inline-block">
                        🎁 Beta Launch: Join 100+ early adopters and lock in 50% discount forever.
                    </p>

                    {/* Toggle - Premium Dark Design */}
                    <div className="flex items-center justify-center gap-6">
                        <span className={`text-[11px] font-black tracking-[0.2em] transition-colors ${!annual ? 'text-white' : 'text-text-tertiary'}`}>MONTHLY</span>
                        <button
                            onClick={() => setAnnual(!annual)}
                            className="w-16 h-8 rounded-full bg-white/10 p-1 relative transition-colors duration-500 hover:bg-white/20"
                        >
                            <motion.div
                                animate={{ x: annual ? 32 : 0 }}
                                className="w-6 h-6 rounded-full bg-primary shadow-glow"
                            />
                        </button>
                        <span className={`text-[11px] font-black tracking-[0.2em] transition-colors ${annual ? 'text-white' : 'text-text-tertiary'}`}>ANNUAL</span>
                        <div className="px-3 py-1 bg-accent-teal/10 border border-accent-teal/20 text-accent-teal text-[9px] font-black tracking-widest rounded-full">
                            -20% SAVINGS
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-center max-w-7xl mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                            className={`group relative p-12 rounded-[48px] border transition-all duration-700 flex flex-col h-full ${plan.popular
                                ? 'bg-white/[0.04] border-primary shadow-glow scale-[1.05] z-10'
                                : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl">
                                    Recommended
                                </div>
                            )}

                            <div className="mb-10">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-tertiary mb-6 block group-hover:text-primary transition-colors">
                                    {plan.name}
                                </span>
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-6xl font-black text-white tracking-tighter">
                                        {plan.price !== "Custom" ? `₹${plan.price}` : plan.price}
                                    </span>
                                    {plan.price !== "Custom" && <span className="text-xl text-text-tertiary font-bold">/mo</span>}
                                </div>
                                <p className="text-text-secondary text-lg font-medium leading-relaxed opacity-80">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="space-y-5 mb-12 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className="w-6 h-6 rounded-full bg-accent-teal/10 flex items-center justify-center border border-accent-teal/20">
                                            <Check className="w-3.5 h-3.5 text-accent-teal stroke-[4]" />
                                        </div>
                                        <span className="text-lg font-medium text-text-secondary group-hover:text-white transition-colors">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 active:scale-95 ${plan.popular
                                ? 'bg-primary text-white shadow-xl hover:shadow-glow'
                                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                                }`}>
                                {plan.cta} <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
