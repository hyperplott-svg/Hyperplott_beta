import React from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const Card = ({ children, className, hoverable = true, ...props }) => {
    return (
        <motion.div
            initial={false}
            whileHover={hoverable ? { y: -8, scale: 1.005, transition: { duration: 0.3 } } : {}}
            className={twMerge(
                "bg-white rounded-[2.5rem] border border-slate-100 p-6 md:p-8 transition-shadow duration-300",
                hoverable && "hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
