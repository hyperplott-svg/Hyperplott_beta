import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from "jspdf";
import * as docx from "docx";
import type { ViewType, LoadingState, DoEFactor, DoEResponse, DoERun, DoEAnalysisResult, DoEDesignType, ResponseAnalysis } from '../types';
import Logo from './Logo';
import {
    SparklesIcon, PlusIcon, InfoIcon,
    ZapIcon, TargetIcon, LoaderIcon, ChartBarIcon,
    DownloadIcon, XIcon, ChevronDownIcon, FileSignatureIcon,
    KeyIcon, TrashIcon, CopyIcon, CheckIcon
} from '../constants';
import { Search, Bell, HelpCircle, Database } from 'lucide-react';

declare var Plotly: any;

type DoETab = 'Dimension' | 'Execution' | 'Insight' | 'Synthesis';
type PlotType = '3D Surface' | '2D Contour' | 'Perturbation' | 'Model Diagnostic';

const PlotViewer: React.FC<{
    analysis: ResponseAnalysis,
    activePlot: PlotType,
    onDownloadPlot?: (format: string) => void,
    predVsActualData?: { actual: number[], predicted: number[] },
    experimentName: string
}> = React.memo(({ analysis, activePlot, onDownloadPlot, predVsActualData, experimentName }) => {
    const plotRef = useRef<HTMLDivElement>(null);
    const layoutRef = useRef<any>({
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        margin: { l: 60, r: 40, b: 60, t: 60 },
        font: { family: 'Inter, sans-serif', color: '#1f2937', size: 11 },
        autosize: true,
        hovermode: 'closest'
    });

    const handleDownload = () => {
        if (!plotRef.current || typeof Plotly === 'undefined') return;
        Plotly.downloadImage(plotRef.current, {
            format: 'png',
            width: 1600,
            height: 1200,
            scale: 3,
            filename: `HyperPlott_${experimentName.replace(/\s+/g, '_')}_${analysis.responseName}_${activePlot.replace(/\s+/g, '_')}`
        });
    };

    useEffect(() => {
        if (!plotRef.current || typeof Plotly === 'undefined' || !analysis || !analysis.plotData) return;

        let data: any[] = [];
        let layout = { ...layoutRef.current };
        const colorScale = activePlot === '3D Surface' ? 'Viridis' : 'Portland';

        try {
            if (activePlot === '3D Surface' && analysis.plotData.x && analysis.plotData.y && analysis.plotData.z) {
                data = [{
                    x: analysis.plotData.x.values,
                    y: analysis.plotData.y.values,
                    z: analysis.plotData.z.values,
                    type: 'surface',
                    colorscale: colorScale,
                    contours: {
                        z: { show: true, usecolormap: true, highlightcolor: "#6366F1", project: { z: true } }
                    },
                    hoverinfo: 'x+y+z',
                    showscale: true
                }];
                layout.scene = {
                    xaxis: { title: { text: analysis.plotData.x.name, font: { size: 11, color: '#4b5563' } }, gridcolor: '#f3f4f6' },
                    yaxis: { title: { text: analysis.plotData.y.name, font: { size: 11, color: '#4b5563' } }, gridcolor: '#f3f4f6' },
                    zaxis: { title: { text: analysis.responseName, font: { size: 11, color: '#4b5563' } }, gridcolor: '#f3f4f6' },
                    camera: { eye: { x: 1.5, y: 1.5, z: 1.1 } }
                };
            } else if (activePlot === '2D Contour' && analysis.plotData.x && analysis.plotData.y && analysis.plotData.z) {
                data = [{
                    x: analysis.plotData.x.values,
                    y: analysis.plotData.y.values,
                    z: analysis.plotData.z.values,
                    type: 'contour',
                    colorscale: colorScale,
                    line: { width: 0.5, color: 'rgba(255,255,255,0.3)' },
                    contours: { coloring: 'heatmap', showlabels: true }
                }];
                layout.xaxis = { title: { text: analysis.plotData.x.name }, gridcolor: '#f3f4f6' };
                layout.yaxis = { title: { text: analysis.plotData.y.name }, gridcolor: '#f3f4f6' };
            } else if (activePlot === 'Perturbation' && analysis.perturbationData) {
                data = analysis.perturbationData.factors.map((f, i) => ({
                    x: f.codedX,
                    y: f.predictedY,
                    mode: 'lines+markers',
                    name: f.name,
                    marker: { size: 6 },
                    line: { shape: 'spline', width: 2 },
                    type: 'scatter'
                }));
                layout.xaxis = { title: { text: 'Deviation from Ref' }, gridcolor: '#f3f4f6' };
                layout.yaxis = { title: { text: analysis.responseName }, gridcolor: '#f3f4f6' };
            } else if (activePlot === 'Model Diagnostic' && predVsActualData) {
                data = [
                    {
                        x: predVsActualData.actual,
                        y: predVsActualData.predicted,
                        mode: 'markers',
                        marker: { color: '#6366F1', size: 8 }
                    },
                    {
                        x: [Math.min(...predVsActualData.actual), Math.max(...predVsActualData.actual)],
                        y: [Math.min(...predVsActualData.actual), Math.max(...predVsActualData.actual)],
                        mode: 'lines',
                        line: { dash: 'dash', color: '#9ca3af', width: 1 }
                    }
                ];
                layout.xaxis = { title: 'Actual' };
                layout.yaxis = { title: 'Predicted' };
            }

            if (data.length > 0) Plotly.react(plotRef.current, data, layout, { responsive: true, displayModeBar: false });
        } catch (err) { console.error("Plotly Error:", err); }
    }, [analysis, activePlot, predVsActualData]);

    return (
        <div className="w-full h-full relative">
            <div ref={plotRef} className="w-full h-full" />
            <button
                onClick={handleDownload}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur border border-gray-100 rounded-xl text-gray-400 hover:text-primary-purple transition-all shadow-sm"
            >
                <DownloadIcon className="w-4 h-4" />
            </button>
        </div>
    );
});

const DesignOfExperimentView: React.FC<{ setActiveView: (view: ViewType) => void }> = () => {
    const [activeTab, setActiveTab] = useState<DoETab>('Dimension');
    const [activePlot, setActivePlot] = useState<PlotType>('3D Surface');
    const [experimentName, setExperimentName] = useState('New Optimization Project');
    const [designType, setDesignType] = useState<DoEDesignType>('Central Composite Design (CCD)');
    const [objective, setObjective] = useState('');
    const [factors, setFactors] = useState<DoEFactor[]>([
        { id: 'f1', name: 'Lipid Concentration', unit: 'mg/mL', low: 1, high: 10, type: 'Numerical' },
        { id: 'f2', name: 'Temperature', unit: '°C', low: 20, high: 80, type: 'Numerical' }
    ]);
    const [responses, setResponses] = useState<DoEResponse[]>([
        { id: 'r1', name: 'Entrapment Efficiency', unit: '%', goal: 'Maximize' },
        { id: 'r2', name: 'Particle Size', unit: 'nm', goal: 'Minimize' }
    ]);
    const [runMatrix, setRunMatrix] = useState<DoERun[]>([]);
    const [analysis, setAnalysis] = useState<any | null>(null);
    const [selectedAnalysisKey, setSelectedAnalysisKey] = useState<string>('');
    const [loadingState, setLoadingState] = useState<LoadingState>('idle');
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [copiedAnova, setCopiedAnova] = useState(false);

    const currentAnalysis = useMemo(() => {
        if (!analysis || !selectedAnalysisKey) return null;
        return analysis.analyses[selectedAnalysisKey] || null;
    }, [analysis, selectedAnalysisKey]);

    const copyAnovaToClipboard = useCallback(() => {
        if (!currentAnalysis) return;
        const headers = "Source\tDF\tSum of Squares\tMean Square\tF-Value\tp-Value\n";
        const rows = currentAnalysis.anovaTable.map((r: any) =>
            `${r.source}\t${r.df}\t${r.sumOfSquares.toFixed(4)}\t${r.meanSquare.toFixed(4)}\t${r.fValue ? r.fValue.toFixed(4) : '-'}\t${r.pValue !== null ? r.pValue.toFixed(4) : '-'}`
        ).join('\n');

        navigator.clipboard.writeText(headers + rows);
        setCopiedAnova(true);
        setTimeout(() => setCopiedAnova(false), 2000);
    }, [currentAnalysis]);

    const safeJSONParse = (text: string) => {
        try {
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanText);
        } catch (e) {
            console.error("JSON Parse Error:", text);
            throw new Error("Malformed JSON response from AI.");
        }
    };

    const callWithRetry = async (fn: () => Promise<any>, maxRetries = 4) => {
        let attempt = 0;
        while (attempt < maxRetries) {
            try {
                return await fn();
            } catch (err: any) {
                attempt++;
                const isRateLimit = err.message?.includes('429') || err.status === 429;
                if (isRateLimit && attempt < maxRetries) {
                    await new Promise(r => setTimeout(r, Math.random() * 2000 + 1000));
                    continue;
                }
                throw err;
            }
        }
    };

    const suggestVariablesWithAI = async () => {
        if (!objective.trim()) return;
        setIsSuggesting(true);
        setError(null);
        try {
            const result = await callWithRetry(async () => {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const response = await ai.models.generateContent({
                    model: "gemini-3-flash-preview",
                    contents: `Scientific Study Objective: "${objective}"`,
                    config: {
                        systemInstruction: "Suggest exactly 3-4 numerical factors and 1-2 responses for a high-precision DOE study. Output JSON only.",
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                factors: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            name: { type: Type.STRING },
                                            unit: { type: Type.STRING },
                                            low: { type: Type.NUMBER },
                                            high: { type: Type.NUMBER }
                                        },
                                        required: ["name", "unit", "low", "high"]
                                    }
                                },
                                responses: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            name: { type: Type.STRING },
                                            unit: { type: Type.STRING }
                                        },
                                        required: ["name", "unit"]
                                    }
                                }
                            },
                            required: ["factors", "responses"]
                        }
                    }
                });
                return safeJSONParse(response.text);
            });

            setFactors(result.factors.map((f: any) => ({
                ...f,
                id: Math.random().toString(),
                type: 'Numerical',
            })));
            setResponses(result.responses.map((r: any) => ({ ...r, id: Math.random().toString(), goal: 'Maximize' })));
        } catch (e) { console.error(e); setError("AI Suggestion Failed."); }
        finally { setIsSuggesting(false); }
    };

    const generateDesign = async () => {
        setLoadingState('loading');
        try {
            const coded = await callWithRetry(async () => {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const response = await ai.models.generateContent({
                    model: "gemini-3-flash-preview",
                    contents: `Generate a CCD matrix for factors: ${factors.map(f => f.name).join(', ')}. Output JSON array of objects with "coded" property.`,
                    config: {
                        systemInstruction: "Statistical DOE engine. Generate accurate coded matrices. JSON ONLY.",
                        responseMimeType: "application/json",
                    }
                });
                return safeJSONParse(response.text);
            });

            const actual = coded.map((row: any) => {
                const mapped: Record<string, number> = {};
                factors.forEach(f => {
                    const c = row.coded[f.name] ?? 0;
                    mapped[f.name] = Number((c * ((f.high - f.low) / 2) + (f.high + f.low) / 2).toFixed(4));
                });
                const resMap: Record<string, number | null> = {};
                responses.forEach(r => resMap[r.name] = null);
                return { factors: mapped, responses: resMap };
            });
            setRunMatrix(actual);
            setActiveTab('Execution');
            setLoadingState('success');
        } catch (e) { console.error(e); setLoadingState('error'); }
    };

    const performAnalysis = async () => {
        setLoadingState('loading');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: `Perform regression for study: ${JSON.stringify(runMatrix)}`,
                config: {
                    systemInstruction: "Statistician. Precise ANOVA and plot data. JSON ONLY.",
                    responseMimeType: "application/json",
                }
            });
            const result = safeJSONParse(response.text);
            setAnalysis(result);
            setSelectedAnalysisKey(Object.keys(result.analyses || {})[0] || '');
            setActiveTab('Insight');
            setLoadingState('success');
        } catch (e) { console.error(e); setLoadingState('error'); }
    };

    const handleGeneratePDFReport = () => { /* PDF logic */ };
    const handleGenerateWordReport = () => { /* Word logic */ };

    return (
        <div className="h-full flex flex-col bg-[#F9FAFB] overflow-hidden font-sans">
            {/* Workflow Control Bar */}
            <div className="bg-white px-8 py-3 flex items-center justify-center border-b border-gray-100">
                <nav className="flex items-center bg-gray-50 p-1 rounded-2xl gap-1 border border-gray-100">
                    {(['Dimension', 'Execution', 'Insight', 'Synthesis'] as DoETab[]).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === tab
                                ? 'bg-white shadow-sm text-slate-900 border border-gray-100'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <main className="flex-1 overflow-y-auto p-12 bg-[#F9FAFB] custom-scrollbar">
                <AnimatePresence mode="wait">
                    {activeTab === 'Dimension' && (
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto space-y-8">

                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary-purple border border-gray-100">
                                        <PlusIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-black text-text-primary tracking-tight font-display uppercase">Hyperplott</h1>
                                        <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mt-1">New Optimization Project</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button className="px-6 py-2.5 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-tertiary hover:bg-gray-50 transition-all">Discard</button>
                                    <button onClick={generateDesign} className="px-8 py-2.5 bg-primary-purple text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:scale-[1.02] transition-all">Initialize Matrix</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Left Column: Project Config */}
                                <div className="lg:col-span-7 space-y-8">
                                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                        <div className="mb-10">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Experiment Title</label>
                                            <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-50 focus-within:bg-white focus-within:border-indigo-100 transition-all">
                                                <input
                                                    value={experimentName}
                                                    onChange={e => setExperimentName(e.target.value)}
                                                    className="w-full bg-transparent border-none text-2xl font-black text-slate-800 focus:ring-0"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Experimental Objective</label>
                                            <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-50 focus-within:bg-white focus-within:border-indigo-100 transition-all min-h-[220px]">
                                                <textarea
                                                    value={objective}
                                                    onChange={e => setObjective(e.target.value)}
                                                    placeholder="e.g. Optimize particle size..."
                                                    className="w-full bg-transparent border-none text-lg font-medium text-slate-600 focus:ring-0 resize-none h-32"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={suggestVariablesWithAI}
                                            disabled={isSuggesting || !objective}
                                            className="w-full mt-6 py-5 bg-[#111827] text-white rounded-[1.5rem] text-[11px] font-black uppercase flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl active:scale-[0.98]"
                                        >
                                            {isSuggesting ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <SparklesIcon className="w-5 h-5 text-indigo-400" />}
                                            AI Dimensioning
                                        </button>
                                    </div>

                                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 block">Statistical Design Methodology</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['Central Composite Design (CCD)', 'Box-Behnken Design (BBD)', 'Full Factorial', 'Partial Factorial'].map(t => (
                                                <button
                                                    key={t}
                                                    onClick={() => setDesignType(t as any)}
                                                    className={`p-6 rounded-2xl text-[9px] font-black transition-all border ${designType === t
                                                        ? 'bg-indigo-50/50 text-primary-purple border-primary-purple shadow-sm'
                                                        : 'bg-gray-50 text-gray-400 border-gray-50 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {t.toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Factors & Responses */}
                                <div className="lg:col-span-5 space-y-8">
                                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                        <div className="flex justify-between items-center mb-10">
                                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Input Parameters (X)</p>
                                            <button
                                                onClick={() => setFactors([...factors, { id: Math.random().toString(), name: 'New Factor', unit: 'u', low: 0, high: 100, type: 'Numerical' }])}
                                                className="w-10 h-10 bg-gray-50 text-slate-900 rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center border border-gray-100"
                                            >
                                                <PlusIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {factors.map((f, i) => (
                                                <div key={f.id} className="bg-gray-50/80 p-5 rounded-[1.5rem] flex items-center justify-between group border border-gray-50/50">
                                                    <div className="flex-1">
                                                        <input
                                                            value={f.name}
                                                            onChange={e => { const nf = [...factors]; nf[i].name = e.target.value; setFactors(nf); }}
                                                            className="bg-transparent border-none p-0 text-sm font-black w-full outline-none text-slate-800"
                                                        />
                                                        <div className="flex items-center gap-1">
                                                            <input
                                                                value={f.unit}
                                                                onChange={e => { const nf = [...factors]; nf[i].unit = e.target.value; setFactors(nf); }}
                                                                className="bg-transparent border-none p-0 text-[10px] font-bold text-slate-400 outline-none w-20"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1.5 items-center">
                                                        <input type="number" value={f.low} onChange={e => { const nf = [...factors]; nf[i].low = +e.target.value; setFactors(nf); }} className="bg-white w-14 text-[11px] py-1.5 px-2 rounded-lg border border-gray-100 text-center font-black outline-none shadow-sm" />
                                                        <div className="w-2 h-[2px] bg-gray-200" />
                                                        <input type="number" value={f.high} onChange={e => { const nf = [...factors]; nf[i].high = +e.target.value; setFactors(nf); }} className="bg-white w-14 text-[11px] py-1.5 px-2 rounded-lg border border-gray-100 text-center font-black outline-none shadow-sm" />
                                                        <button
                                                            onClick={() => setFactors(factors.filter(it => it.id !== f.id))}
                                                            className="ml-2 p-1.5 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <TrashCircle />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-[#111827] p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
                                        <div className="flex justify-between items-center mb-10 relative z-10">
                                            <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Response Metrics (Y)</p>
                                            <button
                                                onClick={() => setResponses([...responses, { id: Math.random().toString(), name: 'New Response', unit: '%', goal: 'Maximize' }])}
                                                className="w-10 h-10 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all flex items-center justify-center border border-white/5"
                                            >
                                                <PlusIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="space-y-4 relative z-10">
                                            {responses.map((r, i) => (
                                                <div key={r.id} className="bg-white/5 p-5 rounded-[1.5rem] flex items-center justify-between group border border-white/5">
                                                    <div className="flex-1">
                                                        <input
                                                            value={r.name}
                                                            onChange={e => { const nr = [...responses]; nr[i].name = e.target.value; setResponses(nr); }}
                                                            className="bg-transparent border-none p-0 text-sm font-black w-full text-white outline-none"
                                                        />
                                                        <input
                                                            value={r.unit}
                                                            onChange={e => { const nr = [...responses]; nr[i].unit = e.target.value; setResponses(nr); }}
                                                            className="bg-transparent border-none p-0 text-[10px] font-bold text-indigo-400 outline-none"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <select
                                                            value={r.goal}
                                                            onChange={e => { const nr = [...responses]; nr[i].goal = e.target.value as any; setResponses(nr); }}
                                                            className="bg-[#0b0e14] text-[10px] font-black text-indigo-400 border border-white/5 rounded-xl px-4 py-2 outline-none appearance-none cursor-pointer hover:bg-black transition-colors"
                                                        >
                                                            <option value="Maximize">Maximize</option>
                                                            <option value="Minimize">Minimize</option>
                                                            <option value="Target">Target</option>
                                                        </select>
                                                        <button
                                                            onClick={() => setResponses(responses.filter(it => it.id !== r.id))}
                                                            className="p-1.5 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <TrashIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'Execution' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-8">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-primary-purple border border-indigo-100">
                                        <Database className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black uppercase text-slate-900 leading-none">Experimental Grid</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Precision Matrix • Center Points Highlit</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => setRunMatrix(runMatrix.map(run => ({ ...run, responses: Object.fromEntries(responses.map(r => [r.name, Number((Math.random() * 100).toFixed(2))])) })))} className="px-8 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 active:scale-95 transition-all">Simulate</button>
                                    <button onClick={performAnalysis} className="px-10 py-3.5 bg-primary-purple text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-95 transition-all">Analyze System</button>
                                </div>
                            </div>

                            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50/50 border-b border-gray-100">
                                            <tr>
                                                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Ident</th>
                                                {factors.map(f => <th key={f.id} className="px-10 py-6 text-[10px] font-black text-slate-900 uppercase tracking-widest">{f.name}</th>)}
                                                {responses.map(r => <th key={r.id} className="px-10 py-6 text-[10px] font-black text-primary-purple uppercase tracking-widest bg-indigo-50/30">{r.name}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {runMatrix.map((run, i) => (
                                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-10 py-5 text-[10px] font-black text-gray-300 uppercase">RUN_{i + 1}</td>
                                                    {factors.map(f => <td key={f.id} className="px-10 py-5 text-sm font-bold text-slate-600">{run.factors[f.name] ?? '-'}</td>)}
                                                    {responses.map(r => (
                                                        <td key={r.id} className="px-10 py-4 bg-indigo-50/10">
                                                            <input
                                                                type="number"
                                                                value={run.responses[r.name] ?? ''}
                                                                onChange={e => { const nm = [...runMatrix]; nm[i].responses[r.name] = e.target.value === '' ? null : +e.target.value; setRunMatrix(nm); }}
                                                                className="w-28 bg-white border border-gray-100 rounded-xl py-2 px-3 text-center text-sm font-black text-slate-900 focus:border-primary-purple outline-none shadow-sm"
                                                                placeholder="-"
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'Insight' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1500px] mx-auto min-h-[600px] pb-24">
                            {currentAnalysis ? (
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                    <div className="lg:col-span-8 space-y-10">
                                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Active Metric</label>
                                                    <select
                                                        value={selectedAnalysisKey}
                                                        onChange={(e) => setSelectedAnalysisKey(e.target.value)}
                                                        className="bg-slate-900 text-white rounded-xl px-5 py-2.5 text-[10px] font-black uppercase outline-none"
                                                    >
                                                        {Object.keys(analysis?.analyses || {}).map(k => (
                                                            <option key={k} value={k}>{k}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="flex gap-1.5 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                                                    {(['3D Surface', '2D Contour', 'Perturbation', 'Model Diagnostic'] as PlotType[]).map(pt => (
                                                        <button key={pt} onClick={() => setActivePlot(pt)} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${activePlot === pt ? 'bg-slate-900 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>{pt}</button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="h-[500px] bg-gray-50/50 rounded-[2rem] border border-gray-50 overflow-hidden relative shadow-inner">
                                                <PlotViewer analysis={currentAnalysis} activePlot={activePlot} predVsActualData={analysis?.predVsActualData} experimentName={experimentName} />
                                            </div>
                                        </div>

                                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1.5 h-6 bg-primary-purple rounded-full" />
                                                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">ANOVA Standard Report</h4>
                                                </div>
                                                <button onClick={copyAnovaToClipboard} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${copiedAnova ? 'bg-green-500 text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                                                    {copiedAnova ? <CheckIcon className="w-3.5 h-3.5" /> : <CopyIcon className="w-3.5 h-3.5" />} {copiedAnova ? 'Copied' : 'Copy'}
                                                </button>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-[11px]">
                                                    <thead>
                                                        <tr className="text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
                                                            <th className="px-6 py-4">Source</th>
                                                            <th className="px-4 py-4 text-center">DF</th>
                                                            <th className="px-4 py-4 text-right">F-Value</th>
                                                            <th className="px-6 py-4 text-right">p-Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50">
                                                        {currentAnalysis.anovaTable?.map((row: any, idx: number) => (
                                                            <tr key={idx} className="group">
                                                                <td className="px-6 py-4 font-black text-slate-900">{row.source}</td>
                                                                <td className="px-4 py-4 text-center font-bold text-gray-500">{row.df}</td>
                                                                <td className="px-4 py-4 text-right font-black text-primary-purple">{row.fValue ? row.fValue.toFixed(2) : '-'}</td>
                                                                <td className={`px-6 py-4 text-right font-black ${row.pValue < 0.05 ? 'text-[#10B981]' : 'text-gray-400'}`}>
                                                                    {row.pValue < 0.0001 ? '< 0.0001' : row.pValue?.toFixed(4)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-4 space-y-10">
                                        <div className="bg-[#111827] p-8 rounded-[2.5rem] shadow-2xl space-y-8 text-white">
                                            <div className="flex items-center gap-3">
                                                <ZapIcon className="w-5 h-5 text-indigo-400 animate-pulse" />
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Precision Diagnostics</h4>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { label: 'R-Squared', value: currentAnalysis.stats?.rSquared?.toFixed(4) },
                                                    { label: 'Adj R2', value: currentAnalysis.stats?.adjRSquared?.toFixed(4) },
                                                    { label: 'P-Value', value: currentAnalysis.stats?.pValue?.toFixed(4), highlight: currentAnalysis.stats?.pValue < 0.05 },
                                                    { label: 'Precision', value: currentAnalysis.stats?.adeqPrecision?.toFixed(2) || 'N/A' }
                                                ].map((s, i) => (
                                                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                                                        <p className="text-[8px] font-bold text-gray-500 uppercase mb-1">{s.label}</p>
                                                        <p className={`text-lg font-black ${s.highlight ? 'text-indigo-400' : 'text-white'}`}>{s.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pt-6 border-t border-white/5">
                                                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4 block">Predictive Model Fitting</label>
                                                <div className="bg-white/5 p-5 rounded-2xl font-mono text-[10px] text-indigo-300 italic break-all leading-relaxed shadow-inner">
                                                    {currentAnalysis.equation}
                                                </div>
                                            </div>
                                        </div>

                                        <button onClick={() => setActiveTab('Synthesis')} className="w-full py-6 bg-primary-purple text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
                                            <TargetIcon className="w-5 h-5" /> Synthesis Optimization
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Footer Status Bar */}
            <footer className="bg-white border-t border-gray-100 px-8 py-3 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        AI ENGINE ONLINE
                    </span>
                    <span className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        SENTINEL v4.0.2
                    </span>
                </div>
                <span>HYPERPLOTT UNIVERSAL OPTIMIZATION ENGINE • SCIENTIFIC PRECISION MODE</span>
            </footer>

            <LoadingOverlay active={loadingState === 'loading'} />
            <ErrorOverlay error={error} onClose={() => setError(null)} />
        </div>
    );
};

const LoadingOverlay = ({ active }: { active: boolean }) => (
    <AnimatePresence>
        {active && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[60] bg-white/60 backdrop-blur-3xl flex flex-col items-center justify-center gap-8">
                <div className="w-16 h-16 border-4 border-gray-100 border-t-primary-purple rounded-full animate-spin" />
                <div className="text-center">
                    <p className="text-sm font-black text-slate-900 uppercase tracking-[0.4em] animate-pulse">Running precision matrix</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-2">Synthesizing Statistical Insights...</p>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);

const ErrorOverlay = ({ error, onClose }: { error: string | null, onClose: () => void }) => (
    <AnimatePresence>
        {error && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[70] bg-red-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
                <InfoIcon className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wide">{error}</span>
                <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg"><XIcon className="w-4 h-4" /></button>
            </motion.div>
        )}
    </AnimatePresence>
);

const TrashCircle = () => (
    <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
        <TrashIcon className="w-3 h-3" />
    </div>
);

export default DesignOfExperimentView;
