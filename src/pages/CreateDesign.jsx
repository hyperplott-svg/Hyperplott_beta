import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Plus,
    Trash2,
    Info,
    CheckCircle2,
    Zap,
    Grid3X3,
    Shapes,
    Target,
    FlaskConical,
    Settings as ConfigIcon,
    ChevronRight,
    Sparkles,
    LayoutGrid,
    GripVertical,
    X,
    FileSpreadsheet,
    Database
} from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Container, Grid } from '../components/common/Layout';
import { Badge } from '../components/common/UIElements';
import { clsx } from 'clsx';

const factorSchema = z.object({
    name: z.string().min(1, 'Factor name is required'),
    type: z.enum(['Continuous', 'Categorical']),
    min: z.string().optional(),
    max: z.string().optional(),
    unit: z.string().optional(),
    levels: z.string().optional(),
});

const designSchema = z.object({
    name: z.string().min(3, 'Design name must be at least 3 characters'),
    type: z.enum(['Factorial', 'RSM', 'Taguchi', 'Mixture']),
    description: z.string().optional(),
    factors: z.array(factorSchema).min(2, 'At least 2 factors are required'),
    structure: z.string().optional(),
    randomize: z.boolean().default(true),
    replicates: z.number().min(1).max(10).default(1),
});

const CreateDesign = () => {
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const navigate = useNavigate();

    const { register, control, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(designSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            type: 'Factorial',
            factors: [
                { name: 'Temperature', type: 'Continuous', min: '20', max: '80', unit: '°C' },
                { name: 'pH', type: 'Continuous', min: '4', max: '10', unit: '' }
            ],
            randomize: true,
            replicates: 1,
            description: ''
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: 'factors' });
    const watchType = watch('type');
    const watchFactors = watch('factors');
    const watchName = watch('name');

    const onSubmit = (data) => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            navigate('/design/new-123');
        }, 3000);
    };

    const steps = [
        { id: 1, name: 'Design Info' },
        { id: 2, name: 'Define Factors' },
        { id: 3, name: 'Configuration' },
        { id: 4, name: 'Review' },
    ];

    return (
        <div className="pb-32 max-w-7xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-20 px-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 -translate-y-[1.5rem] -z-10" />
                    {steps.map((s, i) => (
                        <div key={s.id} className="flex flex-col items-center gap-4 relative z-10">
                            <motion.div
                                className={clsx(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all border-4",
                                    step >= s.id
                                        ? "bg-primary border-primary/20 text-white shadow-xl shadow-primary/20"
                                        : "bg-white border-slate-100 text-slate-300"
                                )}
                                animate={step === s.id ? { scale: 1.2, boxShadow: "0 20px 40px -10px rgba(30,64,175,0.3)" } : { scale: 1 }}
                            >
                                {step > s.id ? <CheckCircle2 className="w-6 h-6" /> : <span className="text-sm">{s.id}</span>}
                            </motion.div>
                            <span className={clsx("text-[10px] font-black uppercase tracking-widest transition-colors", step >= s.id ? "text-primary" : "text-slate-400")}>
                                {s.name}
                            </span>
                        </div>
                    ))}
                    {/* Progress Bar Overlay */}
                    <div className="absolute top-1/2 left-0 h-1 bg-primary/20 -translate-y-[1.5rem] -z-20 w-full" />
                    <motion.div
                        className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-[1.5rem] -z-10"
                        initial={{ width: '0%' }}
                        animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="max-w-2xl mx-auto">
                            <Card className="p-12 border-none shadow-3xl shadow-black/5">
                                <div className="mb-10">
                                    <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Design Information</h2>
                                    <p className="text-slate-500 font-medium font-medium">Define the core objectives of your research campaign.</p>
                                </div>
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Design Name</label>
                                        <div className="relative">
                                            <FileSpreadsheet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                            <input
                                                {...register('name')}
                                                placeholder="e.g., Drug Formulation Study"
                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary/50 transition-all font-bold text-slate-900"
                                            />
                                        </div>
                                        {errors.name && <p className="text-danger text-[10px] font-black uppercase mt-1 ml-1">{errors.name.message}</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Design Type</label>
                                        <Grid cols={2} gap={4}>
                                            {[
                                                { id: 'Factorial', icon: Grid3X3, label: 'Factorial' },
                                                { id: 'RSM', icon: Shapes, label: 'Response Surface' },
                                                { id: 'Taguchi', icon: Target, label: 'Taguchi' },
                                                { id: 'Mixture', icon: FlaskConical, label: 'Mixture' }
                                            ].map((type) => (
                                                <label key={type.id} className={clsx("cursor-pointer flex items-center gap-4 p-5 rounded-2xl border-2 transition-all", watchType === type.id ? "bg-primary/5 border-primary" : "bg-white border-slate-50 hover:border-primary/20")}>
                                                    <input type="radio" value={type.id} {...register('type')} className="sr-only" />
                                                    <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center transition-all", watchType === type.id ? "bg-primary text-white" : "bg-slate-100 text-slate-400")}>
                                                        <type.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className={clsx("font-black text-sm", watchType === type.id ? "text-primary" : "text-slate-500")}>{type.label}</span>
                                                </label>
                                            ))}
                                        </Grid>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between ml-1">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Description</label>
                                            <span className="text-[10px] font-black text-slate-300 uppercase italic">{watch('description')?.length || 0} / 500</span>
                                        </div>
                                        <textarea
                                            {...register('description')}
                                            rows={3}
                                            placeholder="Scientific rationale for this design iteration..."
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 outline-none focus:border-primary/50 transition-all font-medium text-slate-900 resize-none"
                                        />
                                    </div>
                                </div>
                                <div className="mt-12 flex justify-end gap-5">
                                    <Button type="button" variant="ghost" className="font-black">Cancel</Button>
                                    <Button
                                        type="button"
                                        disabled={!watchName || !!errors.name}
                                        className="px-10 h-14"
                                        onClick={() => setStep(2)}
                                    >
                                        Next Phase <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <Grid cols="60-40" gap={12} className="items-start">
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between bg-white p-8 rounded-[2rem] shadow-xl shadow-black/5">
                                        <div>
                                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Define Variables</h2>
                                            <p className="text-slate-400 text-sm font-medium">Map your factors and their boundaries.</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => append({ name: '', type: 'Continuous', min: '', max: '', unit: '' })}
                                            className="btn-premium px-6 py-3 text-xs flex items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" /> Add Factor
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {fields.map((field, index) => (
                                            <Card key={field.id} className="p-8 border-slate-100 group relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 group-hover:bg-primary transition-colors" />
                                                <div className="flex items-center gap-6">
                                                    <GripVertical className="text-slate-200" />
                                                    <div className="grid md:grid-cols-4 gap-6 flex-1">
                                                        <div className="md:col-span-1 space-y-2">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</label>
                                                            <input {...register(`factors.${index}.name`)} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none ring-primary/20 focus:ring-2" placeholder="e.g. Temp" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</label>
                                                            <select {...register(`factors.${index}.type`)} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer">
                                                                <option>Continuous</option>
                                                                <option>Categorical</option>
                                                            </select>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Boundaries</label>
                                                            <div className="flex items-center gap-2">
                                                                <input {...register(`factors.${index}.min`)} className="w-full bg-slate-50 border-none rounded-xl px-3 py-3 text-xs font-bold text-center" placeholder="Min" />
                                                                <span className="text-slate-300">-</span>
                                                                <input {...register(`factors.${index}.max`)} className="w-full bg-slate-50 border-none rounded-xl px-3 py-3 text-xs font-bold text-center" placeholder="Max" />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Units</label>
                                                            <div className="relative">
                                                                <input {...register(`factors.${index}.unit`)} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none" placeholder="°C" />
                                                                <button type="button" onClick={() => remove(index)} className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition-all opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                    <div className="flex justify-between pt-10">
                                        <Button type="button" variant="ghost" icon={ArrowLeft} onClick={() => setStep(1)}>Back</Button>
                                        <Button type="button" className="px-10 h-14" onClick={() => setStep(3)}>Next Strategy</Button>
                                    </div>
                                </div>

                                <div className="sticky top-32">
                                    <Card className="p-10 bg-slate-900 text-white rounded-[2.5rem] border-none shadow-3xl shadow-primary/20">
                                        <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                                            <Sparkles className="w-6 h-6 text-accent" />
                                            Design Preview
                                        </h3>
                                        <div className="space-y-8">
                                            <div className="flex justify-between items-center py-4 border-b border-white/5">
                                                <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Factors Active</span>
                                                <span className="text-2xl font-black text-accent">{watchFactors.length}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-4 border-b border-white/5">
                                                <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Proposed Runs</span>
                                                <span className="text-2xl font-black text-white">{Math.pow(2, watchFactors.length)}</span>
                                            </div>
                                            <div className="pt-4">
                                                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4">Matrix Signature</p>
                                                <div className="bg-white/5 p-4 rounded-xl space-y-2">
                                                    {watchFactors.slice(0, 4).map(f => (
                                                        <div key={f.name} className="flex justify-between text-[10px] font-bold">
                                                            <span>{f.name || 'Factor'}</span>
                                                            <span className="text-accent">±{f.max || '1'}</span>
                                                        </div>
                                                    ))}
                                                    {watchFactors.length > 4 && <div className="text-center text-[8px] text-slate-500 font-bold">+{watchFactors.length - 4} more factors</div>}
                                                </div>
                                            </div>
                                            <div className="p-6 bg-accent/10 rounded-2xl border border-accent/20">
                                                <p className="text-xs font-medium text-accent leading-relaxed">The Hegemonic Engine suggests a <span className="font-black">Fractional Factorial</span> design to minimize laboratory overhead while maintaining 98% resolution.</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Grid>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-3xl mx-auto space-y-12">
                            <div className="text-center">
                                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Design Configuration</h2>
                                <p className="text-slate-500 font-medium">Fine-tune the statistical parameters of the generated matrix.</p>
                            </div>

                            <Card className="p-12 border-none shadow-3xl shadow-black/5">
                                <div className="grid gap-12">
                                    <div className="space-y-6">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest block text-center">Design Structure</label>
                                        <Grid cols={2} gap={6}>
                                            <label className={clsx("cursor-pointer p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-6", watch('structure') === 'full' ? "bg-primary/5 border-primary shadow-xl shadow-primary/5" : "bg-white border-slate-50")}>
                                                <input type="radio" value="full" {...register('structure')} className="sr-only" />
                                                <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center transition-all", watch('structure') === 'full' ? "bg-primary text-white scale-110" : "bg-slate-100 text-slate-400")}>
                                                    <Grid3X3 className="w-8 h-8" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-black mb-1">Full Factorial</p>
                                                    <p className="text-[10px] uppercase font-black text-slate-400">Complete Observation</p>
                                                </div>
                                            </label>
                                            <label className={clsx("cursor-pointer p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-6", watch('structure') === 'fraction' ? "bg-secondary/5 border-secondary shadow-xl shadow-secondary/5" : "bg-white border-slate-50")}>
                                                <input type="radio" value="fraction" {...register('structure')} className="sr-only" />
                                                <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center transition-all", watch('structure') === 'fraction' ? "bg-secondary text-white scale-110" : "bg-slate-100 text-slate-400")}>
                                                    <Shapes className="w-8 h-8" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-black mb-1">Fractional</p>
                                                    <p className="text-[10px] uppercase font-black text-slate-400">Optimized Overhead</p>
                                                </div>
                                            </label>
                                        </Grid>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Replication Level</label>
                                                <span className="text-2xl font-black text-primary">{watch('replicates')}x</span>
                                            </div>
                                            <input type="range" min="1" max="5" {...register('replicates', { valueAsNumber: true })} className="w-full accent-primary h-2" />
                                            <p className="text-[10px] font-bold text-slate-400 text-center italic">Detection of pure experimental error (ANOVA capability)</p>
                                        </div>
                                        <div className="space-y-6 flex flex-col justify-center">
                                            <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100 group cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <Zap className="w-6 h-6 text-primary group-hover:animate-pulse" />
                                                    <span className="text-sm font-black text-slate-700">Enable Randomization</span>
                                                </div>
                                                <input type="checkbox" {...register('randomize')} className="w-6 h-6 accent-primary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-16 flex justify-between">
                                    <Button type="button" variant="ghost" icon={ArrowLeft} onClick={() => setStep(2)}>Back</Button>
                                    <Button type="button" className="px-10 h-14" onClick={() => setStep(4)}>Final Review</Button>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="max-w-5xl mx-auto">
                            <Grid cols="40-60" gap={10}>
                                <div className="space-y-8">
                                    <Card className="p-10 bg-gradient-to-br from-primary to-secondary text-white border-none shadow-3xl shadow-primary/20 relative overflow-hidden">
                                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl" />
                                        <div className="relative z-10 space-y-8">
                                            <div>
                                                <Badge variant="white" className="mb-4 bg-white/10 border-white/20">Summary Output</Badge>
                                                <h3 className="text-3xl font-black mb-2 leading-tight">{watchName}</h3>
                                                <p className="text-sm opacity-70 font-medium">Statistical matrix ready for generation.</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="p-4 bg-white/10 rounded-2xl">
                                                    <span className="block text-[8px] font-black uppercase tracking-widest opacity-60 mb-1">Main Effects</span>
                                                    <span className="text-2xl font-black">{watchFactors.length}</span>
                                                </div>
                                                <div className="p-4 bg-white/10 rounded-2xl">
                                                    <span className="block text-[8px] font-black uppercase tracking-widest opacity-60 mb-1">Total Points</span>
                                                    <span className="text-2xl font-black">{Math.pow(2, watchFactors.length) * watch('replicates')}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-4 pt-4 border-t border-white/10">
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="opacity-60 font-black uppercase tracking-widest">Randomized Status</span>
                                                    <span className="px-3 py-1 bg-white truncate max-w-[100px] text-primary rounded-full font-black text-[8px] uppercase tracking-widest">Active</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="opacity-60 font-black uppercase tracking-widest">Engine Mode</span>
                                                    <span className="px-3 py-1 bg-white text-primary rounded-full font-black text-[8px] uppercase tracking-widest">{watchType}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Button type="button" variant="ghost" fullWidth onClick={() => setStep(1)}>Modify Parameters</Button>
                                </div>

                                <div className="space-y-8">
                                    <Card className="p-10 border-slate-100 shadow-xl shadow-black/5 bg-white">
                                        <h4 className="text-xl font-black text-slate-900 mb-8 flex items-center justify-between">
                                            Design Matrix Preview
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">First 5 Theoretical Runs</span>
                                        </h4>
                                        <div className="overflow-hidden">
                                            <table className="w-full text-left text-xs font-bold border-separate border-spacing-y-2">
                                                <thead>
                                                    <tr className="text-slate-400 uppercase tracking-widest">
                                                        <th className="pb-4 px-4 font-black">Run</th>
                                                        {watchFactors.slice(0, 3).map(f => (
                                                            <th key={f.name} className="pb-4 px-4 font-black">{f.name || 'Factor'}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[1, 2, 3, 4, 5].map((run, i) => (
                                                        <tr key={run} className="bg-slate-50 rounded-xl overflow-hidden group">
                                                            <td className="p-4 rounded-l-xl text-primary font-black">0{run}</td>
                                                            <td className="p-4"><Badge variant="primary">±1</Badge></td>
                                                            <td className="p-4"><Badge variant="secondary">±1</Badge></td>
                                                            <td className="p-4 rounded-r-xl"><Badge variant="accent">±1</Badge></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card>
                                    <button
                                        type="submit"
                                        className="btn-premium w-full h-20 text-2xl font-black flex items-center justify-center gap-4 relative overflow-hidden group"
                                    >
                                        Generate Design
                                        <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    </button>
                                </div>
                            </Grid>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>

            {/* Generation Loading Modal */}
            <AnimatePresence>
                {isGenerating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/80 backdrop-blur-3xl p-6"
                    >
                        <Card className="max-w-md w-full p-16 text-center border-none shadow-3xl shadow-primary/30 relative overflow-hidden bg-white group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                            <div className="relative z-10 flex flex-col items-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-2xl shadow-primary/30 mb-10"
                                >
                                    <Sparkles className="w-12 h-12" />
                                </motion.div>
                                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Generating design...</h3>
                                <p className="text-slate-500 font-medium mb-12">Applying Randomized Orthogonal Algorithms to defined variables...</p>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4 border border-slate-200 shadow-inner">
                                    <motion.div
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 3, ease: "easeInOut" }}
                                        className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                                    />
                                </div>
                                <motion.p
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="text-[10px] font-black uppercase text-primary tracking-[0.4em] mt-8"
                                >
                                    Bio-Statistical Engine Active
                                </motion.p>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CreateDesign;
