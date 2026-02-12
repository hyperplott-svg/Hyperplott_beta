import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    icon: Icon,
    fullWidth,
    ...props
}) => {
    const variants = {
        primary: 'bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-xl shadow-primary/20 hover:shadow-secondary/30',
        secondary: 'bg-white border-2 border-slate-100 text-slate-900 hover:bg-slate-50',
        outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5',
        ghost: 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900',
        danger: 'bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600',
    };

    const sizes = {
        sm: 'px-4 py-2 text-[10px] font-black uppercase tracking-widest',
        md: 'px-8 py-3.5 text-sm font-bold',
        lg: 'px-10 py-5 text-lg font-black tracking-tight',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            className={twMerge(
                'inline-flex items-center justify-center gap-2 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden',
                variants[variant],
                sizes[size],
                fullWidth && 'w-full',
                className
            )}
            {...props}
        >
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full hover:translate-x-full transition-transform duration-1000" />
            )}
            {Icon && <Icon className={clsx("w-5 h-5", size === 'sm' && 'w-3.5 h-3.5')} />}
            {children}
        </motion.button>
    );
};

export default Button;
