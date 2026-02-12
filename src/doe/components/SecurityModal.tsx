
import React, { useState } from 'react';
// FIX: Import Variants type from framer-motion to correctly type the animation variants.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { generateKey, exportKey, importKey } from '../utils/crypto';
import CopyButton from './CopyButton';
// Fix: Import missing icons and replace FilePlusIcon with PlusIcon
import { LockIcon, DownloadIcon, KeyIcon, PlusIcon } from '../constants'; 


interface SecurityModalProps {
    onKeyReady: (key: CryptoKey) => void;
    onError: (msg: string) => void;
}

const SecurityModal: React.FC<SecurityModalProps> = ({ onKeyReady, onError }) => {
    const [view, setView] = useState<'initial' | 'generate' | 'import'>('initial');
    const [generatedKeyObj, setGeneratedKeyObj] = useState<CryptoKey | null>(null);
    const [generatedKeyStr, setGeneratedKeyStr] = useState<string>('');
    const [hasSavedKey, setHasSavedKey] = useState(false);
    const [inputKey, setInputKey] = useState('');

    const handleGenerate = async () => {
        try {
            const key = await generateKey();
            const exported = await exportKey(key);
            setGeneratedKeyObj(key);
            setGeneratedKeyStr(exported);
            setView('generate');
        } catch (e) {
            onError("Could not generate a key. Your browser might not support the required cryptographic functions.");
        }
    };

    const handleImport = async () => {
        if (!inputKey.trim()) { onError('Please paste your key.'); return; }
        try {
            const key = await importKey(inputKey.trim());
            onKeyReady(key);
        } catch (e) { onError('Invalid key format. Please paste the exact key you saved.'); }
    };

    const handleDownloadKey = () => {
        if (!generatedKeyStr) return;
        const blob = new Blob([generatedKeyStr], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'DharaAI_Patent_Drafter_Key.txt';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    const handleUnlock = () => {
        if(generatedKeyObj) onKeyReady(generatedKeyObj);
    };
    
    // FIX: Replaced cubic-bezier array with equivalent string to fix framer-motion typing issue.
    // FIX: Explicitly typed with `Variants` to fix TypeScript's inference of the `ease` property as a generic string.
    const contentVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }, // easeOut equivalent
        exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } } // easeIn equivalent
    };

    return (
        <div className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                <AnimatePresence mode="wait">
                    {view === 'initial' && (
                        <motion.div key="initial" variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
                             <LockIcon className="mx-auto w-12 h-12 text-slate-400 mb-4" />
                            <h2 className="text-2xl font-bold text-slate-900">End-to-End Encryption</h2>
                            <p className="text-slate-600 mt-2">Your patent drafts are encrypted with zero-knowledge security. Only you can access them with your unique project key.</p>
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button onClick={() => setView('import')} className="flex flex-col items-center justify-center p-6 bg-slate-100 text-slate-800 rounded-lg font-semibold hover:bg-slate-100 hover:scale-105 transition-transform duration-200">
                                    <KeyIcon className="w-8 h-8 mb-2 text-slate-500"/>
                                    Load Existing Project
                                </button>
                                <button onClick={handleGenerate} className="flex flex-col items-center justify-center p-6 bg-slate-800 text-white rounded-lg font-semibold hover:bg-[#0F172A] hover:scale-105 transition-transform duration-200">
                                    <PlusIcon className="w-8 h-8 mb-2"/>
                                    Start New Project
                                </button>
                            </div>
                        </motion.div>
                    )}
                    {view === 'import' && (
                         <motion.div key="import" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                            <h3 className="text-xl font-bold text-center">Load Project from Key</h3>
                            <textarea value={inputKey} onChange={e => setInputKey(e.target.value)} placeholder="Paste your saved key here" rows={4} className="w-full mt-4 bg-slate-100 p-2 rounded-md border border-slate-200 resize-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50/50" />
                            <div className="mt-4 flex gap-4">
                                <button onClick={() => setView('initial')} className="flex-1 py-2.5 bg-slate-100 text-slate-800 rounded-lg font-semibold">Back</button>
                                <button onClick={handleImport} className="flex-1 py-2.5 bg-slate-800 text-white rounded-lg font-semibold">Unlock</button>
                            </div>
                        </motion.div>
                    )}
                    {view === 'generate' && (
                        <motion.div key="generate" variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="text-left p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <h3 className="font-bold text-lg text-yellow-900">IMPORTANT: Save Your Project Key</h3>
                            <p className="text-yellow-800 text-sm mt-1">This key is the **only** way to access your work. We cannot recover it. <strong className="font-bold">Save it somewhere safe before proceeding.</strong></p>
                            <div className="relative mt-2">
                                <textarea readOnly value={generatedKeyStr} rows={3} className="w-full bg-white p-2 rounded-md border border-slate-200 text-xs font-mono"/>
                                <div className="absolute top-2 right-2"><CopyButton textToCopy={generatedKeyStr} /></div>
                            </div>
                            <button onClick={handleDownloadKey} className="mt-2 w-full py-2 bg-yellow-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-yellow-600">
                                <DownloadIcon className="w-5 h-5"/> Download Key as .txt
                            </button>
                            <div className="mt-4 flex items-center gap-3">
                                <input id="save-confirm" type="checkbox" checked={hasSavedKey} onChange={() => setHasSavedKey(v => !v)} className="h-4 w-4 rounded border-slate-200 text-yellow-600 focus:ring-yellow-500"/>
                                <label htmlFor="save-confirm" className="text-sm font-medium text-yellow-900 select-none">I have securely saved my key.</label>
                            </div>
                            <button onClick={handleUnlock} disabled={!hasSavedKey} className="mt-4 w-full py-2.5 bg-slate-800 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0F172A]">
                                Unlock Drafter
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default SecurityModal;
