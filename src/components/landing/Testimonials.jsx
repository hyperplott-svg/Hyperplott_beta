import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
    return (
        <section className="py-32 bg-bg-secondary overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full max-w-4xl bg-white rounded-[2.5rem] border-2 border-gray-100 p-12 md:p-20 shadow-2xl relative"
                    >
                        {/* Quote mark decoration */}
                        <div className="absolute top-10 left-10 text-8xl font-serif text-indigo-50 leading-none select-none">“</div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl md:text-3xl font-medium text-text-primary italic mb-12 leading-relaxed"
                            >
                                "HyperPlott has completely transformed our R&D workflow. We've reduced our
                                experimental iterations by 60% and achieved higher precision in our
                                formulation studies."
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop"
                                    className="w-20 h-20 rounded-full border-4 border-white shadow-xl mb-6 object-cover"
                                    alt="Dr. Priya Sharma"
                                />
                                <h4 className="text-xl font-bold text-text-primary mb-1">Dr. Priya Sharma</h4>
                                <p className="text-text-secondary font-medium mb-1">Senior Scientist, Pharma R&D</p>
                                <p className="text-text-muted text-sm uppercase tracking-widest font-black">Leading Pharmaceutical Company</p>
                            </motion.div>

                            <div className="flex gap-1 mt-8">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
