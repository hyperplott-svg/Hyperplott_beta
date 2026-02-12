import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const Badge = ({ children, className, variant = 'primary', ...props }) => {
    const variants = {
        primary: 'bg-primary/10 text-primary border-primary/20',
        secondary: 'bg-secondary/10 text-secondary border-secondary/20',
        accent: 'bg-accent/10 text-accent border-accent/20',
        success: 'bg-success/10 text-success border-success/20',
        error: 'bg-danger/10 text-danger border-danger/20',
        white: 'bg-white/10 text-white border-white/20',
    };

    return (
        <div
            className={twMerge(
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const Avatar = ({ src, name, size = 'md', className, ...props }) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-32 h-32',
    };

    const textSizes = {
        sm: 'text-[10px]',
        md: 'text-sm',
        lg: 'text-lg',
        xl: 'text-3xl',
    };

    return (
        <div
            className={twMerge(
                'rounded-full overflow-hidden border-2 border-white bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shrink-0',
                sizes[size],
                className
            )}
            {...props}
        >
            {src ? (
                <img src={src} alt={name || 'Avatar'} className="w-full h-full object-cover" />
            ) : (
                <span className={twMerge('font-black text-white uppercase', textSizes[size])}>
                    {name ? name.substring(0, 2) : '??'}
                </span>
            )}
        </div>
    );
};

export const Rating = ({ value = 5, max = 5, className }) => {
    return (
        <div className={twMerge('flex gap-0.5', className)}>
            {Array.from({ length: max }).map((_, i) => (
                <Star
                    key={i}
                    className={twMerge(
                        'w-4 h-4',
                        i < value ? 'text-yellow-500 fill-current' : 'text-slate-200'
                    )}
                />
            ))}
        </div>
    );
};

export const Stat = ({ value, label, icon: Icon, color = 'text-primary', delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            {Icon && (
                <div className="w-16 h-16 mx-auto mb-6 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8" />
                </div>
            )}
            <div className={twMerge('text-5xl font-black mb-2 tracking-tight', color)}>{value}</div>
            <div className="text-xs font-black uppercase tracking-widest text-slate-400 italic">{label}</div>
        </motion.div>
    );
};
