import React from 'react';
import { motion } from 'framer-motion';

const SocialProof = () => {
    const logos = [
        "https://upload.wikimedia.org/wikipedia/commons/b/b5/Pfizer_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/c/c5/Johnson_%26_Johnson_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/0e/Merck_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/b/b3/Bristol-Myers_Squibb_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Novartis_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/5/5e/AstraZeneca_logo.svg"
    ];

    return (
        <section className="py-16 bg-white border-y border-gray-100">
            <div className="container mx-auto px-6">
                <p className="text-center text-[12px] font-black uppercase tracking-[0.3em] text-text-muted mb-12">
                    TRUSTED BY LEADING RESEARCH INSTITUTIONS
                </p>
                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 grayscale group">
                    {logos.map((logo, i) => (
                        <motion.img
                            key={i}
                            src={logo}
                            alt="Partner Logo"
                            className="h-8 md:h-10 w-auto object-contain hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-110"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
