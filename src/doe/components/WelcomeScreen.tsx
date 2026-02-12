
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface WelcomeScreenProps {
  onAnimationEnd: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onAnimationEnd }) => {
  useEffect(() => {
    const timer = setTimeout(onAnimationEnd, 2500);
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="mb-12 mx-auto w-32 h-32 flex items-center justify-center relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-30px] rounded-full border border-primary/20 border-dashed"
            />
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Logo className="w-20 h-20 relative z-10 shadow-2xl rounded-3xl" />
            </motion.div>
          </div>

          <motion.h1
            initial={{ letterSpacing: "1em", opacity: 0 }}
            animate={{ letterSpacing: "0.2em", opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
            className="text-5xl font-black text-slate-900 mb-6 uppercase"
          >
            HyperPlott
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex items-center justify-center gap-6"
          >
            <span className="h-[2px] w-16 bg-slate-100"></span>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em]">
              Universal Optimization Studio
            </p>
            <span className="h-[2px] w-16 bg-slate-100"></span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
