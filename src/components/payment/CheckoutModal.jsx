import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, CheckCircle2, Sparkles, ArrowRight, Shield } from 'lucide-react';

const PLANS = {
    Researcher: { price: '₹499', priceAnnual: '₹399', period: '/month', color: 'from-indigo-500 to-blue-600' },
    Professional: { price: '₹1,999', priceAnnual: '₹1,599', period: '/month', color: 'from-primary-purple to-indigo-600' },
    Enterprise: { price: 'Custom', priceAnnual: 'Custom', period: '', color: 'from-slate-700 to-slate-900' },
};

const CheckoutModal = ({ plan, annual = false, onClose }) => {
    const [step, setStep] = useState('plan'); // 'plan' | 'payment' | 'success'
    const [processing, setProcessing] = useState(false);
    const meta = PLANS[plan] || PLANS.Researcher;
    const displayPrice = annual ? meta.priceAnnual : meta.price;

    const handlePay = async (e) => {
        e.preventDefault();
        setProcessing(true);
        // Simulate processing — wire to payment gateway (Razorpay/Stripe) here
        await new Promise(r => setTimeout(r, 1800));
        setProcessing(false);
        setStep('success');
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                onClick={e => { if (e.target === e.currentTarget) onClose(); }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                >
                    {/* Header */}
                    <div className={`bg-gradient-to-br ${meta.color} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="relative z-10 flex items-start justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">
                                    {annual ? 'Annual Plan' : 'Monthly Plan'}
                                </p>
                                <h2 className="text-2xl font-black tracking-tight">{plan} Plan</h2>
                                <div className="flex items-baseline gap-1 mt-2">
                                    <span className="text-4xl font-black">{displayPrice}</span>
                                    {meta.period && <span className="text-white/60 font-medium">{meta.period}</span>}
                                </div>
                            </div>
                            <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            {step === 'plan' && (
                                <motion.div
                                    key="plan"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-5"
                                >
                                    {/* Beta notice */}
                                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100">
                                        <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-sm font-black text-amber-800 mb-0.5">Currently in Free Beta</p>
                                            <p className="text-xs text-amber-600 font-medium">
                                                All features are free right now. Locking in your plan gets you 50% off when billing begins.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2.5">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">What you get</p>
                                        {[
                                            'Unlimited experimental designs',
                                            'AI-powered statistical analysis',
                                            'Interactive 3D visualizations',
                                            'Publication-ready PDF exports',
                                            'Priority support queue',
                                        ].map((f, i) => (
                                            <div key={i} className="flex items-center gap-2.5">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                <span className="text-sm text-slate-700 font-medium">{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setStep('payment')}
                                        className="w-full h-13 py-4 rounded-xl bg-gradient-to-r from-primary-purple to-primary text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary-purple/20 hover:scale-[1.02] transition-transform"
                                    >
                                        <CreditCard className="w-4 h-4" /> Continue to Payment
                                    </button>
                                    <p className="text-center text-xs text-slate-400 font-medium">
                                        <Lock className="w-3 h-3 inline mr-1" />
                                        Secured by industry-standard encryption. Cancel anytime.
                                    </p>
                                </motion.div>
                            )}

                            {step === 'payment' && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <form onSubmit={handlePay} className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Card Number</label>
                                            <input
                                                required
                                                placeholder="1234 5678 9012 3456"
                                                maxLength={19}
                                                className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-purple/20 border border-transparent focus:border-primary-purple/30 transition-all"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expiry</label>
                                                <input required placeholder="MM / YY" maxLength={7} className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-purple/20 border border-transparent focus:border-primary-purple/30 transition-all" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CVV</label>
                                                <input required placeholder="•••" maxLength={4} type="password" className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-purple/20 border border-transparent focus:border-primary-purple/30 transition-all" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Name on Card</label>
                                            <input required placeholder="Dr. Jane Smith" className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-purple/20 border border-transparent focus:border-primary-purple/30 transition-all" />
                                        </div>

                                        {/* Order summary */}
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-black text-slate-900">{plan} — {annual ? 'Annual' : 'Monthly'}</p>
                                                <p className="text-[10px] text-slate-400 font-medium">{annual ? 'Billed annually' : 'Billed monthly'}</p>
                                            </div>
                                            <span className="text-lg font-black text-slate-900">{displayPrice}</span>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-purple to-primary text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary-purple/20 hover:scale-[1.02] transition-transform disabled:opacity-60"
                                        >
                                            {processing ? (
                                                <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Processing...</>
                                            ) : (
                                                <><Lock className="w-4 h-4" /> Pay {displayPrice}</>
                                            )}
                                        </button>
                                        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400">
                                            <Shield className="w-3 h-3" /> 256-bit SSL encryption
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {step === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">You're In!</h3>
                                    <p className="text-slate-500 font-medium text-sm mb-6 max-w-xs mx-auto">
                                        Welcome to {plan}. Your access is active. We'll send a receipt to your email.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary-purple to-primary text-white font-black text-sm uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-transform"
                                    >
                                        Go to Dashboard <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CheckoutModal;
