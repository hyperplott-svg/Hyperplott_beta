import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Percent, Users, Trophy } from 'lucide-react';

const BetaProgram = () => {
    const benefits = [
        {
            icon: Gift,
            title: "6 Months Free",
            desc: "Full access to all features during your research period."
        },
        {
            icon: Percent,
            title: "50% Lifetime Discount",
            desc: "Lock in our special beta pricing forever."
        },
        {
            icon: Users,
            title: "Direct Founder Access",
            desc: "Join our slack and shape the product roadmap."
        },
        {
            icon: Trophy,
            title: "Founding Member Badge",
            desc: "Recognition as a pioneer on our platform."
        }
    ];

    return (
        <section className="py-40 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="rounded-[3rem] bg-gradient-to-br from-primary-purple to-primary p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-teal/20 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />
                    
                    <div className="relative z-10">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-black uppercase tracking-widest mb-8">
                            Founding Member Program
                        </div>
                        
                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
                            Early Access is <span className="underline decoration-accent-teal decoration-4 underline-offset-8">Now Live</span>
                        </h2>
                        
                        <p className="text-xl md:text-2xl text-white/80 font-medium mb-16 max-w-3xl mx-auto leading-relaxed">
                            We're looking for researchers to help shape the future of DoE. 
                            Join the first 100 users and get exclusive founding member benefits.
                        </p>

                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                            {[
                                "50% Off Lifetime",
                                "Direct Founder Access",
                                "Custom Feature Requests",
                                "Early API Access"
                            ].map((benefit, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                                    <div className="text-xs font-black uppercase tracking-widest leading-tight">{benefit}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <button className="px-12 py-5 rounded-2xl bg-white text-primary-purple text-xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                                Join Beta Now
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '42%' }}
                                        className="h-full bg-white"
                                    />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">42/100 spots filled</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BetaProgram;
