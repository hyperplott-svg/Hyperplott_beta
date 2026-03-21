import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, BarChart2, Layers, Zap, ArrowRight, X, CheckCircle2 } from 'lucide-react';

const RESEARCH_AREAS = [
    { id: 'pharma', label: 'Pharmaceuticals', icon: '💊' },
    { id: 'biotech', label: 'Biotechnology', icon: '🧬' },
    { id: 'chemical', label: 'Chemical Engineering', icon: '⚗️' },
    { id: 'materials', label: 'Materials Science', icon: '🔩' },
    { id: 'food', label: 'Food Science', icon: '🌾' },
    { id: 'other', label: 'Other', icon: '🔬' },
];

const DOE_LEVELS = [
    { id: 'beginner', label: 'Beginner', desc: "I'm new to experimental design" },
    { id: 'intermediate', label: 'Intermediate', desc: "I've used basic factorial designs" },
    { id: 'advanced', label: 'Advanced', desc: "I'm comfortable with RSM, Taguchi, etc." },
];

const steps = ['Research Area', 'Experience', 'Ready!'];

const OnboardingModal = ({ onComplete, onSkip }) => {
    const [step, setStep] = useState(0);
    const [area, setArea] = useState('');
    const [level, setLevel] = useState('');

    const canNext = step === 0 ? !!area : step === 1 ? !!level : true;

    const handleNext = () => {
        if (step < 2) setStep(s => s + 1);
        else onComplete({ area, level });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
                {/* Header */}
                <div className="relative px-8 pt-8 pb-6 border-b border-slate-100">
                    <button onClick={onSkip} className="absolute top-6 right-6 text-slate-300 hover:text-slate-500 transition-colors">
                        <X className="w-5 h-5" />
                    </button>

                    {/* Progress dots */}
                    <div className="flex items-center gap-2 mb-6">
                        {steps.map((s, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i <= step ? 'bg-primary-purple scale-110' : 'bg-slate-200'}`} />
                                {i < steps.length - 1 && <div className={`h-px w-8 transition-all duration-500 ${i < step ? 'bg-primary-purple' : 'bg-slate-200'}`} />}
                            </div>
                        ))}
                        <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-400">{steps[step]}</span>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div key="h0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Welcome to Hyperplott! 👋</h2>
                                <p className="text-slate-500 text-sm font-medium mt-1">What's your research area? We'll tailor the experience for you.</p>
                            </motion.div>
                        )}
                        {step === 1 && (
                            <motion.div key="h1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your DoE Experience</h2>
                                <p className="text-slate-500 text-sm font-medium mt-1">This helps us show you the right features first.</p>
                            </motion.div>
                        )}
                        {step === 2 && (
                            <motion.div key="h2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">You're all set! 🚀</h2>
                                <p className="text-slate-500 text-sm font-medium mt-1">Your workspace is ready. Let's design your first experiment.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Body */}
                <div className="px-8 py-6">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-2 gap-3">
                                {RESEARCH_AREAS.map(a => (
                                    <button
                                        key={a.id}
                                        onClick={() => setArea(a.id)}
                                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${area === a.id ? 'border-primary-purple bg-primary-purple/5' : 'border-slate-100 hover:border-primary-purple/30'}`}
                                    >
                                        <span className="text-2xl">{a.icon}</span>
                                        <span className={`text-sm font-black tracking-tight ${area === a.id ? 'text-primary-purple' : 'text-slate-700'}`}>{a.label}</span>
                                        {area === a.id && <CheckCircle2 className="w-4 h-4 text-primary-purple ml-auto" />}
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                                {DOE_LEVELS.map(l => (
                                    <button
                                        key={l.id}
                                        onClick={() => setLevel(l.id)}
                                        className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${level === l.id ? 'border-primary-purple bg-primary-purple/5' : 'border-slate-100 hover:border-primary-purple/30'}`}
                                    >
                                        <div className="flex-1">
                                            <p className={`font-black tracking-tight ${level === l.id ? 'text-primary-purple' : 'text-slate-900'}`}>{l.label}</p>
                                            <p className="text-xs text-slate-400 font-medium mt-0.5">{l.desc}</p>
                                        </div>
                                        {level === l.id && <CheckCircle2 className="w-5 h-5 text-primary-purple shrink-0" />}
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                                {[
                                    { icon: FlaskConical, title: 'Create a Design', desc: 'Define your factors and let AI generate the matrix' },
                                    { icon: BarChart2, title: 'Run Your Experiments', desc: 'Enter results and get instant AI analysis' },
                                    { icon: Layers, title: 'Export Reports', desc: 'Generate PDF/DOCX publication-ready reports' },
                                ].map(({ icon: Icon, title, desc }, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="w-10 h-10 rounded-xl bg-primary-purple/10 flex items-center justify-center shrink-0">
                                            <Icon className="w-5 h-5 text-primary-purple" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900">{title}</p>
                                            <p className="text-xs text-slate-400 font-medium">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="px-8 pb-8 flex items-center justify-between">
                    <button onClick={onSkip} className="text-sm text-slate-400 hover:text-slate-600 transition-colors font-medium">
                        Skip for now
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!canNext}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-purple to-primary text-white text-sm font-black uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform shadow-lg shadow-primary-purple/20"
                    >
                        {step < 2 ? 'Continue' : 'Start Designing'}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default OnboardingModal;
