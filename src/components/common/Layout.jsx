import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Container = ({ children, className, size = '7xl', ...props }) => {
    const sizes = {
        'xl': 'max-w-xl',
        '3xl': 'max-w-3xl',
        '5xl': 'max-w-5xl',
        '7xl': 'max-w-7xl',
        'full': 'max-w-full',
    };

    return (
        <div
            className={twMerge(
                'mx-auto px-6 lg:px-12',
                sizes[size] || size,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const Grid = ({ children, className, cols = 3, gap = 8, ...props }) => {
    const colClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
        '60-40': 'grid-cols-1 lg:grid-cols-[60%_40%]',
    };

    const gapClasses = {
        4: 'gap-4',
        6: 'gap-6',
        8: 'gap-8',
        10: 'gap-10',
        12: 'gap-12',
        16: 'gap-16',
        20: 'gap-20',
        24: 'gap-24',
    };

    return (
        <div
            className={twMerge(
                'grid',
                colClasses[cols] || cols,
                gapClasses[gap] || gap,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const Section = ({ children, className, py = '24', ...props }) => {
    const pyClasses = {
        '16': 'py-16',
        '20': 'py-20',
        '24': 'py-24',
        '32': 'py-32',
        '44': 'py-44',
    };

    return (
        <section
            className={twMerge(
                pyClasses[py] || py,
                className
            )}
            {...props}
        >
            {children}
        </section>
    );
};
