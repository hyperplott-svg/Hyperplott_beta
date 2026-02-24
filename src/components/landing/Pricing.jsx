import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const [annual, setAnnual] = useState(false);

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
                "Full ANOVA Diagnostic Suit",
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
                "Guaranteed SLA response",
                "Regulatory Compliance Mode"
            ],
            cta: "Access Demo",
            popular: false
        }
    ];

    return (
        <section id="pricing" className="py-40 bg-bg-primary relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="text-center mb-32">
                    <div className="section-badge">Public Beta Path</div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">
                        Open <span className="text-gradient">Scientific Research.</span>
                    </h2>

                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium mb-12">
                        Currently in public beta. <span className="text-slate-900 font-bold">All premium features</span> are accessible via our priority demo gateway.
                    </p>

                    {/* Toggle */}
                    <div className="flex items-center justify-center gap-6 mb-16">
                        <span className={`text-[11px] font-black tracking-[0.2em] transition-colors ${!annual ? 'text-slate-900' : 'text-slate-400'}`}>MONTHLY</span>
                        <button
                            onClick={() => setAnnual(!annual)}
                            className="w-16 h-8 rounded-full bg-slate-200 p-1 relative transition-colors duration-500"
                        >
                            <motion.div
                                animate={{ x: annual ? 32 : 0 }}
                                className="w-6 h-6 rounded-full bg-primary-purple shadow-lg"
                            />
                        </button>
                        <span className={`text-[11px] font-black tracking-[0.2em] transition-colors ${annual ? 'text-slate-900' : 'text-slate-400'}`}>ANNUAL</span>
                        <div className="px-3 py-1 bg-primary-purple/10 border border-primary-purple/20 text-primary-purple text-[9px] font-black tracking-widest rounded-full">
                            SAVE 20%
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`card-premium p-10 flex flex-col ${plan.popular ? 'ring-2 ring-primary-purple shadow-2xl scale-105 z-10' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 px-4 py-1 bg-primary-purple text-white text-[10px] font-black uppercase tracking-widest rounded-bl-xl">
                                    Recommended
                                </div>
                            )}

                            <div className="mb-10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                                    {plan.name}
                                </span>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-5xl font-black text-slate-900 tracking-tight">
                                        {plan.price !== "Free Beta" ? `₹${plan.price}` : plan.price}
                                    </span>
                                    {plan.price !== "Free Beta" && <span className="text-lg text-slate-400 font-bold">/mo</span>}
                                </div>
                                <p className="text-slate-500 font-medium">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <Check className="w-4 h-4 text-primary-purple stroke-[3]" />
                                        <span className="text-slate-600 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to="/signup"
                                className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all text-center ${plan.popular
                                    ? 'bg-primary-purple text-white shadow-lg hover:shadow-primary-purple/30'
                                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                    }`}>
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
