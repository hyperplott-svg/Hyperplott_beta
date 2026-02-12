import React from 'react';

class ThreeErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Handle WebGL context creation errors or other Three.js crashes
        if (error.message?.includes('WebGL') || error.message?.includes('context')) {
            return { hasError: true };
        }
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Three.js Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-white/5 p-8 text-center">
                    <div className="space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-white font-black text-sm uppercase tracking-widest">Visual Component Unavailable</p>
                        <p className="text-text-secondary text-xs opacity-60">Your browser may have limited WebGL support or too many active 3D contexts.</p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ThreeErrorBoundary;
