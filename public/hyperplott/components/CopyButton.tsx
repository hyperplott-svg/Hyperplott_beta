
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Fix: Import missing icons from constants.tsx
import { CheckIcon, CopyIcon } from '../constants'; 

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-lg bg-stone-200/50 backdrop-blur-md border border-black/5 hover:bg-stone-200/80 text-stone-600 hover:text-stone-900 transition-colors"
      aria-label={copied ? 'Content copied' : 'Copy content'}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="copied"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <CheckIcon className="w-4 h-4"/>
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <CopyIcon className="w-4 h-4"/>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default CopyButton;
