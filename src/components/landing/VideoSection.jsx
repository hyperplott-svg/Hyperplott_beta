import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';

const VideoSection = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.8]);
    const textY = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

    return (
        <section ref={sectionRef} className="relative h-[80vh] w-full overflow-hidden bg-slate-900">
            {/* Mock Video Placeholder */}
            <motion.div
                style={{ scale }}
                className="absolute inset-0 w-full h-full"
            >
                {/* 
                    Ideally, this would be an HTML5 video.
                    Using a generated gradient/animation to simulate "video" content for now.
                */}
                <div className="w-full h-full bg-slate-900 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 animate-gradient-mesh opacity-60 mix-blend-screen" />

                    {/* Animated Grid Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] perspective-1000 transform-style-3d rotate-x-60" />

                    {/* Floating Nodes */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]"
                            initial={{
                                x: Math.random() * 100 + "%",
                                y: Math.random() * 100 + "%",
                                opacity: Math.random() * 0.5 + 0.2
                            }}
                            animate={{
                                y: [null, Math.random() * 100 + "%"],
                                opacity: [null, Math.random() * 0.8 + 0.2]
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Dark Overlay */}
            <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10"
            />

            {/* Content Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 z-20 flex flex-col justify-end h-full">
                <motion.div
                    style={{ y: textY }}
                    className="max-w-4xl"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-lg">
                            Meet the modern way
                        </h2>
                        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary mb-6 tracking-tighter drop-shadow-lg">
                            to optimize science.
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg md:text-xl text-slate-300 font-medium max-w-xl mb-10 leading-relaxed drop-shadow-md"
                    >
                        AI-powered experimental design for pharmaceutical and biotech research.
                        Visualize complex factor interactions in real-time.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="group flex items-center gap-4 px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold hover:bg-white hover:text-slate-900 transition-all active:scale-95"
                    >
                        <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                        Watch Full Demo
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default VideoSection;
