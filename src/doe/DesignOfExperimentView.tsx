/** Design of Experiment View for Scientific Optimization */
import React from 'react';
import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from "jspdf";
import * as docx from "docx";
import type { ViewType, LoadingState, DoEFactor, DoEResponse, DoERun, DoEAnalysisResult, DoEDesignType, ResponseAnalysis } from './types';
import Logo from './components/Logo';
import WelcomeScreen from './components/WelcomeScreen';
import {
    SparklesIcon, PlusIcon, InfoIcon,
    ZapIcon, TargetIcon, LoaderIcon, ChartBarIcon,
    DownloadIcon, XIcon, ChevronDownIcon, FileSignatureIcon,
    TrashIcon, CopyIcon, CheckIcon
} from './constants';

declare var Plotly: any;

type DoETab = 'Dimension' | 'Execution' | 'Insight' | 'Synthesis';
type PlotType = '3D Surface' | '2D Contour' | 'Perturbation' | 'Model Diagnostic';

const PlotViewer: React.FC<{
    analysis: ResponseAnalysis,
    activePlot: PlotType,
    predVsActualData?: { actual: number[], predicted: number[] },
    experimentName: string
}> = React.memo(({ analysis, activePlot, predVsActualData, experimentName }) => {
    const plotRef = useRef<HTMLDivElement>(null);
    const layoutRef = useRef<any>({
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#ffffff',
        margin: { l: 80, r: 60, b: 80, t: 80 },
        font: { family: 'Plus Jakarta Sans', color: '#0f172a', size: 12 },
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
                        z: { show: true, usecolormap: true, highlightcolor: "#42f4c5", project: { z: true } }
                    },
                    hoverinfo: 'x+y+z',
                    showscale: true
                }];
                layout.scene = {
                    xaxis: { title: { text: analysis.plotData.x.name, font: { size: 12, weight: 'bold', color: '#0f172a' } }, gridcolor: '#f1f5f9', backgroundcolor: '#ffffff' },
                    yaxis: { title: { text: analysis.plotData.y.name, font: { size: 12, weight: 'bold', color: '#0f172a' } }, gridcolor: '#f1f5f9', backgroundcolor: '#ffffff' },
                    zaxis: { title: { text: analysis.responseName, font: { size: 12, weight: 'bold', color: '#0f172a' } }, gridcolor: '#f1f5f9', backgroundcolor: '#ffffff' },
                    camera: { eye: { x: 1.6, y: 1.6, z: 1.1 } }
                };
            } else if (activePlot === '2D Contour' && analysis.plotData.x && analysis.plotData.y && analysis.plotData.z) {
                data = [{
                    x: analysis.plotData.x.values,
                    y: analysis.plotData.y.values,
                    z: analysis.plotData.z.values,
                    type: 'contour',
                    colorscale: colorScale,
                    line: { width: 1, color: 'rgba(255,255,255,0.5)' },
                    contours: { coloring: 'heatmap', showlabels: true, labelfont: { size: 12, color: 'white', weight: 'bold' } }
                }];
                layout.xaxis = { title: { text: analysis.plotData.x.name, font: { weight: 'bold', size: 14, color: '#0f172a' } }, gridcolor: '#f1f5f9' };
                layout.yaxis = { title: { text: analysis.plotData.y.name, font: { weight: 'bold', size: 14, color: '#0f172a' } }, gridcolor: '#f1f5f9' };
            } else if (activePlot === 'Perturbation' && analysis.perturbationData) {
                data = analysis.perturbationData.factors.map((f: any, i: number) => ({
                    x: f.codedX,
                    y: f.predictedY,
                    mode: 'lines+markers',
                    name: f.name,
                    marker: { size: 8, symbol: i % 5 },
                    line: { shape: 'spline', width: 3 },
                    type: 'scatter'
                }));
                layout.xaxis = {
                    title: { text: 'Deviation from Reference Point (Coded Units)', font: { weight: 'bold', size: 14, color: '#0f172a' } },
                    range: [-1.1, 1.1],
                    gridcolor: '#f1f5f9',
                    zerolinecolor: '#cbd5e1'
                };
                layout.yaxis = {
                    title: { text: analysis.responseName, font: { weight: 'bold', size: 14, color: '#0f172a' } },
                    gridcolor: '#f1f5f9',
                    zerolinecolor: '#cbd5e1'
                };
                layout.legend = { orientation: 'h', y: -0.25, x: 0.5, xanchor: 'center', font: { size: 12 } };
            } else if (activePlot === 'Model Diagnostic' && predVsActualData) {
                const minVal = Math.min(...predVsActualData.actual, ...predVsActualData.predicted) * 0.95;
                const maxVal = Math.max(...predVsActualData.actual, ...predVsActualData.predicted) * 1.05;
                data = [
                    {
                        x: predVsActualData.actual,
                        y: predVsActualData.predicted,
                        mode: 'markers',
                        name: 'Data Points',
                        marker: { color: '#10B981', size: 12, line: { color: 'white', width: 2 } }
                    },
                    {
                        x: [minVal, maxVal],
                        y: [minVal, maxVal],
                        mode: 'lines',
                        name: 'Perfect Fit',
                        line: { dash: 'dash', color: '#cbd5e1', width: 2 }
                    }
                ];
                layout.xaxis = { title: { text: 'Actual Response Values', font: { weight: 'bold', size: 14, color: '#0f172a' } }, range: [minVal, maxVal], gridcolor: '#f1f5f9' };
                layout.yaxis = { title: { text: 'Predicted Response Values', font: { weight: 'bold', size: 14, color: '#0f172a' } }, range: [minVal, maxVal], gridcolor: '#f1f5f9' };
                layout.legend = { orientation: 'h', y: -0.25, x: 0.5, xanchor: 'center', font: { size: 12 } };
            }

            if (data.length > 0) Plotly.react(plotRef.current, data, layout, { responsive: true, displayModeBar: false });
        } catch (err) { console.error("Plotly Error:", err); }
    }, [analysis, activePlot, predVsActualData]);

    return (
        <div className="w-full h-full min-h-[450px] relative rounded-3xl overflow-hidden bg-white shadow-inner border border-slate-100">
            <div ref={plotRef} className="w-full h-full" />
            <div className="absolute top-6 right-6 flex flex-col gap-3">
                <button
                    onClick={handleDownload}
                    className="p-3.5 bg-white/95 backdrop-blur shadow-xl rounded-2xl border border-slate-100 text-slate-500 hover:text-emerald-600 transition-all z-20 group active:scale-90"
                    title="Export High-Res PNG"
                >
                    <DownloadIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </div>
    );
});

const DesignOfExperimentView: React.FC<{ setActiveView: (view: ViewType) => void }> = ({ setActiveView }) => {
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
    const [analysis, setAnalysis] = useState<DoEAnalysisResult | null>(null);
    const [selectedAnalysisKey, setSelectedAnalysisKey] = useState<string>('');
    const [loadingState, setLoadingState] = useState<LoadingState>('idle');
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [copiedAnova, setCopiedAnova] = useState(false);
    const [isDemoAutoRunning, setIsDemoAutoRunning] = useState(false);

    const loadDemo = useCallback(() => {
        setExperimentName("Nanoparticle Synthesis Optimization");
        setObjective("Seeking to optimize the Yield (%) and minimize the Particle Size (nm) of gold nanoparticles by adjusting pH and Citrate Ratio. This is a standard Response Surface Methodology study.");
        setDesignType('Central Composite Design (CCD)');

        const demoFactors: DoEFactor[] = [
            { id: 'df1', name: 'pH Level', unit: 'pH', low: 6.5, high: 8.5, type: 'Numerical' },
            { id: 'df2', name: 'Citrate Ratio', unit: 'ratio', low: 2.0, high: 6.0, type: 'Numerical' }
        ];
        setFactors(demoFactors);

        const demoResponses: DoEResponse[] = [
            { id: 'dr1', name: 'Yield', unit: '%', goal: 'Maximize' },
            { id: 'dr2', name: 'Size', unit: 'nm', goal: 'Minimize' }
        ];
        setResponses(demoResponses);

        const demoMatrix: DoERun[] = [
            { factors: { "pH Level": 6.5, "Citrate Ratio": 2.0 }, responses: { "Yield": 65.4, "Size": 45.2 } },
            { factors: { "pH Level": 8.5, "Citrate Ratio": 2.0 }, responses: { "Yield": 72.1, "Size": 48.5 } },
            { factors: { "pH Level": 6.5, "Citrate Ratio": 6.0 }, responses: { "Yield": 88.5, "Size": 22.1 } },
            { factors: { "pH Level": 8.5, "Citrate Ratio": 6.0 }, responses: { "Yield": 94.2, "Size": 18.4 } },
            { factors: { "pH Level": 6.08, "Citrate Ratio": 4.0 }, responses: { "Yield": 58.2, "Size": 52.1 } },
            { factors: { "pH Level": 8.91, "Citrate Ratio": 4.0 }, responses: { "Yield": 78.5, "Size": 38.2 } },
            { factors: { "pH Level": 7.5, "Citrate Ratio": 1.17 }, responses: { "Yield": 45.1, "Size": 62.4 } },
            { factors: { "pH Level": 7.5, "Citrate Ratio": 6.83 }, responses: { "Yield": 98.2, "Size": 12.5 } },
            { factors: { "pH Level": 7.5, "Citrate Ratio": 4.0 }, responses: { "Yield": 82.1, "Size": 28.4 } },
            { factors: { "pH Level": 7.5, "Citrate Ratio": 4.0 }, responses: { "Yield": 81.5, "Size": 29.1 } },
            { factors: { "pH Level": 7.5, "Citrate Ratio": 4.0 }, responses: { "Yield": 83.2, "Size": 27.8 } }
        ];
        setRunMatrix(demoMatrix);
        setActiveTab('Execution');
    }, []);

    const runFullDemo = useCallback(() => {
        loadDemo();
        setIsDemoAutoRunning(true);
    }, [loadDemo]);

    useEffect(() => {
        if (isDemoAutoRunning && runMatrix.length > 0 && activeTab === 'Execution') {
            const timer = setTimeout(() => {
                performAnalysis();
                setIsDemoAutoRunning(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isDemoAutoRunning, runMatrix, activeTab]);

    const currentAnalysis = useMemo(() => {
        if (!analysis || !selectedAnalysisKey) return null;
        return (analysis.analyses[selectedAnalysisKey] as ResponseAnalysis) || null;
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

    const duplicateRunsIndices = useMemo(() => {
        const indices: number[] = [];
        const seen = new Map<string, number>();
        runMatrix.forEach((run, i) => {
            const key = JSON.stringify(run.factors);
            if (seen.has(key)) {
                indices.push(i);
                indices.push(seen.get(key)!);
            }
            seen.set(key, i);
        });
        return [...new Set(indices)];
    }, [runMatrix]);

    const safeJSONParse = (input: any) => {
        if (!input) return null;
        if (typeof input === 'object' && !Array.isArray(input) && Object.keys(input).length > 0) return input;

        let text = String(input).trim();

        const cleanJSONString = (str: string) => {
            // Remove trailing commas in objects and arrays
            return str.replace(/,\s*([\]}])/g, '$1');
        };

        try {
            // First pass: try direct parse after cleaning
            return JSON.parse(cleanJSONString(text));
        } catch (initialError) {
            try {
                // Second pass: remove markdown blocks and then clean
                let cleanText = text;
                if (cleanText.includes('```')) {
                    const match = cleanText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
                    if (match) cleanText = match[1].trim();
                    else cleanText = cleanText.replace(/```json\s?/g, '').replace(/```\s?/g, '').trim();
                }
                return JSON.parse(cleanJSONString(cleanText));
            } catch (markdownError) {
                // Third pass: find first { or [ and last } or ] and then clean
                try {
                    const firstBrace = text.indexOf('{');
                    const lastBrace = text.lastIndexOf('}');
                    const firstBracket = text.indexOf('[');
                    const lastBracket = text.lastIndexOf(']');

                    let start = -1, end = -1;
                    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
                        start = firstBrace;
                        end = lastBrace;
                    } else if (firstBracket !== -1) {
                        start = firstBracket;
                        end = lastBracket;
                    }

                    if (start !== -1 && end !== -1 && end > start) {
                        return JSON.parse(cleanJSONString(text.substring(start, end + 1)));
                    }
                    throw markdownError;
                } catch (extractionError) {
                    console.error("Critical JSON Parse Failure:", { input, text });
                    throw new Error("Invalid AI format. The result was too complex or malformed to parse. Please try again.");
                }
            }
        }
    };

    const callWithRetry = async (fn: () => Promise<any>, maxRetries = 4) => {
        let attempt = 0;
        while (attempt < maxRetries) {
            try {
                return await fn();
            } catch (err: any) {
                attempt++;
                const errText = err.message || '';
                const isRetryable = errText.includes('429') || err.status === 429 || errText.includes('RESOURCE_EXHAUSTED') ||
                    errText.includes('503') || err.status === 503 || errText.includes('UNAVAILABLE');

                if (isRetryable && attempt < maxRetries) {
                    const delay = Math.pow(2.5, attempt) * 1000 + Math.random() * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                }
                throw err;
            }
        }
    };

    const handleError = (err: any, context: string) => {
        console.error(`${context} Error:`, err);
        const errText = err.message || '';
        setError(`${context} Error: ${errText || 'System instability detected.'}`);
        setLoadingState('error');
    };

    const suggestVariablesWithAI = async () => {
        if (!objective.trim()) return;
        setIsSuggesting(true);
        setError(null);
        try {
            const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || (import.meta as any).env.VITE_GOOGLE_API_KEY;
            if (!apiKey) throw new Error("API Key is missing. Please configure VITE_GEMINI_API_KEY or GOOGLE_API_KEY in your environment variables.");

            const result = await callWithRetry(async () => {
                const ai = new GoogleGenAI({ apiKey: apiKey as string });
                const response = await ai.models.generateContent({
                    model: "gemini-3-flash-preview",
                    contents: [{ role: 'user', parts: [{ text: `Scientific Study Objective: "${objective}"` }] }],
                    config: {
                        temperature: 0,
                        maxOutputTokens: 2048,
                        systemInstruction: "Concise DoE Expert. Suggest 3-4 numerical factors and 1-2 responses. Output RAW JSON ONLY. No preamble, no postamble, no markdown. Standard JSON format.",
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
                const responseText = (response as any).text || (response.candidates?.[0]?.content?.parts?.[0] as any)?.text || "";
                return safeJSONParse(responseText);
            });

            setFactors(result.factors.map((f: any) => ({
                ...f,
                id: Math.random().toString(),
                type: 'Numerical',
                low: Number(f.low),
                high: Number(f.high)
            })));
            setResponses(result.responses.map((r: any) => ({ ...r, id: Math.random().toString(), goal: 'Maximize' })));
        } catch (e) { handleError(e, "AI Dimension Probe"); }
        finally { setIsSuggesting(false); }
    };

    const generateDesign = async () => {
        if (factors.length < 2) return setError("Minimum 2 factors required.");
        setLoadingState('loading');
        setError(null);
        try {
            const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || (import.meta as any).env.VITE_GOOGLE_API_KEY;
            if (!apiKey) throw new Error("API Key is missing. Please configure VITE_GEMINI_API_KEY or GOOGLE_API_KEY in your environment variables.");

            const numFactors = factors.length;
            const methodology = designType;

            const coded = await callWithRetry(async () => {
                const ai = new GoogleGenAI({ apiKey: apiKey as string });
                const response = await ai.models.generateContent({
                    model: "gemini-3-flash-preview",
                    contents: [{
                        role: 'user', parts: [{
                            text: `Generate an accurate, industrially standard ${methodology} matrix for ${numFactors} factors: ${factors.map(f => f.name).join(', ')}. 
                    Factor High: +1, Low: -1, Axial: alpha (sqrt(k) for CCD).
                    Ensure standard run efficiency. Add 3-5 center points (0,0,...) for error estimation.` }]
                    }],
                    config: {
                        temperature: 0,
                        maxOutputTokens: 4096,
                        systemInstruction: "Fast DoE Engine. Generate accurate coded matrices. Output RAW JSON ONLY. No preamble, no postamble. Numeric values must use dot notation.",
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    coded: {
                                        type: Type.OBJECT,
                                        properties: factors.reduce((acc, f) => ({ ...acc, [f.name]: { type: Type.NUMBER } }), {}),
                                        required: factors.map(f => f.name)
                                    }
                                },
                                required: ["coded"]
                            }
                        }
                    }
                });
                const responseText = (response as any).text || (response.candidates?.[0]?.content?.parts?.[0] as any)?.text || "";
                return safeJSONParse(responseText);
            });

            const actual = coded.map((row: any) => {
                const mapped: Record<string, number> = {};
                factors.forEach(f => {
                    const c = row.coded[f.name] ?? 0;
                    const range = f.high - f.low;
                    const midpoint = (f.high + f.low) / 2;
                    mapped[f.name] = Number((c * (range / 2) + midpoint).toFixed(4));
                });
                const resMap: Record<string, number | null> = {};
                responses.forEach(r => resMap[r.name] = null);
                return { factors: mapped, responses: resMap };
            });
            setRunMatrix(actual);
            setActiveTab('Execution');
            setLoadingState('success');
        } catch (e) { handleError(e, "Design Generation"); }
        finally { setLoadingState('success'); }
    };

    const performAnalysis = async () => {
        if (runMatrix.some(r => Object.values(r.responses).some(v => v === null))) return setError("Complete all data points in the Execution matrix.");
        setLoadingState('loading');
        setError(null);
        try {
            const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || (import.meta as any).env.VITE_GOOGLE_API_KEY;
            if (!apiKey) throw new Error("API Key is missing. Please configure VITE_GEMINI_API_KEY or GOOGLE_API_KEY in your environment variables.");

            const result = await callWithRetry(async () => {
                const ai = new GoogleGenAI({ apiKey: apiKey as string });
                const response = await ai.models.generateContent({
                    model: "gemini-3-flash-preview",
                    contents: [{
                        role: 'user', parts: [{
                            text: `Perform high-precision statistical regression for "${experimentName}".
                    Data: ${JSON.stringify(runMatrix)}
                    Target Responses: ${responses.map(r => r.name).join(', ')}
    
                    Perform Stepwise Regression. Fit a Quadratic Model if curvature exists, otherwise Linear.
                    Provide explicit "fittingModelUsed" (e.g. "Response Surface Quadratic Model").` }]
                    }],
                    config: {
                        temperature: 0,
                        maxOutputTokens: 8192,
                        systemInstruction: "Expert Statistician. Fit a Quadratic Response Surface Model. Output valid RAW JSON ONLY. No preamble, no postamble, no markdown. Ensure all numeric values are formatted correctly for JSON.parse.",
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                overallInterpretation: { type: Type.STRING },
                                optimizedParams: { type: Type.OBJECT, properties: factors.reduce((acc, f) => ({ ...acc, [f.name]: { type: Type.NUMBER } }), {}), required: factors.map(f => f.name) },
                                analyses: {
                                    type: Type.OBJECT,
                                    properties: responses.reduce((acc, r) => ({
                                        ...acc,
                                        [r.name]: {
                                            type: Type.OBJECT,
                                            properties: {
                                                responseName: { type: Type.STRING },
                                                fittingModelUsed: { type: Type.STRING },
                                                equation: { type: Type.STRING },
                                                stats: { type: Type.OBJECT, properties: { rSquared: { type: Type.NUMBER }, adjRSquared: { type: Type.NUMBER }, pValue: { type: Type.NUMBER }, fValue: { type: Type.NUMBER }, adeqPrecision: { type: Type.NUMBER } }, required: ["rSquared", "pValue"] },
                                                anovaTable: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { source: { type: Type.STRING }, df: { type: Type.NUMBER }, sumOfSquares: { type: Type.NUMBER }, meanSquare: { type: Type.NUMBER }, fValue: { type: Type.NUMBER }, pValue: { type: Type.NUMBER } }, required: ["source", "pValue", "df"] } },
                                                interpretation: { type: Type.STRING },
                                                plotData: { type: Type.OBJECT, properties: { x: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, values: { type: Type.ARRAY, items: { type: Type.NUMBER } } } }, y: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, values: { type: Type.ARRAY, items: { type: Type.NUMBER } } } }, z: { type: Type.OBJECT, properties: { values: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.NUMBER } } } } } } },
                                                perturbationData: { type: Type.OBJECT, properties: { factors: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, codedX: { type: Type.ARRAY, items: { type: Type.NUMBER } }, predictedY: { type: Type.ARRAY, items: { type: Type.NUMBER } } } } } } }
                                            }
                                        }
                                    }), {})
                                },
                                predVsActualData: { type: Type.OBJECT, properties: { actual: { type: Type.ARRAY, items: { type: Type.NUMBER } }, predicted: { type: Type.ARRAY, items: { type: Type.NUMBER } } }, required: ["actual", "predicted"] }
                            }
                        }
                    }
                });
                const responseText = (response as any).text || (response.candidates?.[0]?.content?.parts?.[0] as any)?.text || "";
                return safeJSONParse(responseText);
            });

            setAnalysis(result);
            setSelectedAnalysisKey(Object.keys(result.analyses || {})[0] || '');
            setActiveTab('Insight');
            setLoadingState('success');
        } catch (e) { handleError(e, "Analysis Engine"); }
    };

    const generateAllPlotImages = async (resAnalysis: ResponseAnalysis, predData: any): Promise<Record<PlotType, string>> => {
        const tempDiv = document.createElement('div');
        tempDiv.style.width = '1200px';
        tempDiv.style.height = '900px';
        tempDiv.style.position = 'fixed';
        tempDiv.style.top = '0';
        tempDiv.style.left = '-2000px';
        tempDiv.style.backgroundColor = '#ffffff';
        document.body.appendChild(tempDiv);

        const images: any = {};
        const plotTypes: PlotType[] = ['3D Surface', '2D Contour', 'Perturbation', 'Model Diagnostic'];

        for (const type of plotTypes) {
            let data: any[] = [];
            let layout: any = {
                margin: { l: 80, r: 80, b: 80, t: 100 },
                font: { family: 'Plus Jakarta Sans', size: 16, color: '#000000' },
                title: { text: `${resAnalysis.responseName} - ${type}`, font: { size: 24, weight: 'bold' } },
                paper_bgcolor: '#ffffff',
                plot_bgcolor: '#ffffff'
            };

            if (type === '3D Surface') {
                data = [{ x: resAnalysis.plotData.x.values, y: resAnalysis.plotData.y.values, z: resAnalysis.plotData.z.values, type: 'surface', colorscale: 'Viridis', showscale: true }];
                layout.scene = {
                    xaxis: { title: resAnalysis.plotData.x.name, font: { weight: 'bold' }, backgroundcolor: '#ffffff', showbackground: true },
                    yaxis: { title: resAnalysis.plotData.y.name, font: { weight: 'bold' }, backgroundcolor: '#ffffff', showbackground: true },
                    zaxis: { title: 'Response', font: { weight: 'bold' }, backgroundcolor: '#ffffff', showbackground: true },
                    camera: { eye: { x: 1.6, y: 1.6, z: 1.1 } }
                };
            } else if (type === '2D Contour') {
                data = [{ x: resAnalysis.plotData.x.values, y: resAnalysis.plotData.y.values, z: resAnalysis.plotData.z.values, type: 'contour', colorscale: 'Portland', line: { color: 'rgba(255,255,255,0.4)', width: 1 } }];
                layout.xaxis = { title: resAnalysis.plotData.x.name, font: { weight: 'bold' } };
                layout.yaxis = { title: resAnalysis.plotData.y.name, font: { weight: 'bold' } };
            } else if (type === 'Perturbation') {
                data = resAnalysis.perturbationData.factors.map((f: any) => ({ x: f.codedX, y: f.predictedY, mode: 'lines+markers', name: f.name, line: { width: 3 } }));
                layout.xaxis = { title: 'Deviation from Reference Point', font: { weight: 'bold' } };
                layout.yaxis = { title: resAnalysis.responseName, font: { weight: 'bold' } };
            } else if (type === 'Model Diagnostic' && predData) {
                data = [
                    { x: predData.actual, y: predData.predicted, mode: 'markers', marker: { color: '#10B981', size: 12 } },
                    { x: [Math.min(...predData.actual), Math.max(...predData.actual)], y: [Math.min(...predData.actual), Math.max(...predData.actual)], mode: 'lines', line: { dash: 'dash', color: '#666', width: 2 } }
                ];
                layout.xaxis = { title: 'Actual Values', font: { weight: 'bold' } };
                layout.yaxis = { title: 'Predicted Values', font: { weight: 'bold' } };
            }

            await Plotly.newPlot(tempDiv, data, layout);
            if (type === '3D Surface') await new Promise(r => setTimeout(r, 100));
            images[type] = await Plotly.toImage(tempDiv, { format: 'png', width: 1200, height: 900, scale: 3 });
            Plotly.purge(tempDiv);
        }
        document.body.removeChild(tempDiv);
        return images;
    };

    const handleGeneratePDFReport = async () => {
        if (!analysis) return;
        setLoadingState('loading');
        try {
            const doc = new jsPDF('p', 'mm', 'a4') as any;
            let y = 20;
            doc.setFontSize(22).setTextColor(16, 185, 129).setFont("helvetica", "bold").text(experimentName, 20, y); y += 10;
            doc.setFontSize(10).setTextColor(100).setFont("helvetica", "normal").text(`Study Objective: ${objective}`, 20, y, { maxWidth: 170 }); y += 15;

            doc.setFontSize(14).setTextColor(30).setFont("helvetica", "bold").text("Execution Matrix", 20, y); y += 10;
            doc.setFontSize(7);
            const headers = ["Run", ...factors.map((f: any) => f.name), ...responses.map((r: any) => r.name)];
            const colWidth = 170 / headers.length;
            headers.forEach((h, i) => doc.text(h, 20 + i * colWidth, y, { maxWidth: colWidth - 2 })); y += 6;

            runMatrix.forEach((run, i) => {
                doc.text(`${i + 1}`, 20, y);
                factors.forEach((f: any, fi: number) => doc.text(`${run.factors[f.name]}`, 20 + (fi + 1) * colWidth, y));
                responses.forEach((r: any, ri: number) => doc.text(`${run.responses[r.name] || '-'}`, 20 + (factors.length + ri + 1) * colWidth, y));
                y += 4;
                if (y > 275) { doc.addPage(); y = 20; }
            });
            y += 10;

            for (const [resName, resData] of Object.entries(analysis.analyses || {})) {
                doc.addPage(); y = 20;
                doc.setFontSize(18).setTextColor(16, 185, 129).setFont("helvetica", "bold").text(`Analysis: ${resName}`, 20, y); y += 10;
                doc.setFontSize(10).setTextColor(30).text(`Model Used: ${(resData as any).fittingModelUsed}`, 20, y); y += 6;
                doc.setFontSize(9).setTextColor(50).text(`Equation: ${(resData as any).equation}`, 20, y, { maxWidth: 170 }); y += 15;

                const images = await generateAllPlotImages(resData as any, analysis.predVsActualData);
                const plotPairs = [['3D Surface', '2D Contour'], ['Perturbation', 'Model Diagnostic']];
                for (const pair of plotPairs) {
                    if (y > 220) { doc.addPage(); y = 20; }
                    if (images[pair[0] as PlotType]) doc.addImage(images[pair[0] as PlotType], 'PNG', 20, y, 80, 60);
                    if (images[pair[1] as PlotType]) doc.addImage(images[pair[1] as PlotType], 'PNG', 110, y, 80, 60);
                    y += 70;
                }

                if (y > 220) { doc.addPage(); y = 20; }
                doc.setFontSize(14).setTextColor(30).setFont("helvetica", "bold").text("ANOVA Data", 20, y); y += 8;
                doc.setFontSize(7);
                const aw = 170 / 6;
                ["Source", "DF", "SS", "MS", "F", "p"].forEach((h, i) => doc.text(h, 20 + i * aw, y)); y += 5;
                (resData as any).anovaTable.forEach((row: any) => {
                    doc.text(row.source, 20, y);
                    doc.text(`${row.df}`, 20 + aw, y);
                    doc.text(`${row.sumOfSquares.toFixed(3)}`, 20 + 2 * aw, y);
                    doc.text(`${row.meanSquare.toFixed(3)}`, 20 + 3 * aw, y);
                    doc.text(`${row.fValue?.toFixed(3) || '-'}`, 20 + 4 * aw, y);
                    doc.text(`${row.pValue?.toFixed(4) || '-'}`, 20 + 5 * aw, y);
                    y += 4;
                });
            }
            doc.save(`${experimentName.replace(/\s+/g, '_')}_HyperPlott.pdf`);
            setLoadingState('success');
        } catch (e) { handleError(e, "PDF Export"); }
        finally { setShowExportMenu(false); }
    };

    const handleGenerateWordReport = async () => {
        if (!analysis) return;
        setLoadingState('loading');
        try {
            const sections: any[] = [];

            const headerChildren: any[] = [
                new docx.Paragraph({ children: [new docx.TextRun({ text: experimentName, bold: true, size: 48, color: "10B981" })], alignment: docx.AlignmentType.CENTER }),
                new docx.Paragraph({ text: `Objective: ${objective}`, spacing: { before: 400, after: 400 } }),
                new docx.Paragraph({ text: "Execution Matrix", heading: docx.HeadingLevel.HEADING_1 }),
            ];

            const executionRows = [
                new docx.TableRow({ children: ["Run", ...factors.map((f: any) => f.name), ...responses.map((r: any) => r.name)].map(h => new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: h, bold: true })] })] })) }),
                ...runMatrix.map((run, i) => new docx.TableRow({ children: [`${i + 1}`, ...factors.map((f: any) => `${run.factors[f.name]}`), ...responses.map((r: any) => `${run.responses[r.name] || 'N/A'}`)].map(v => new docx.TableCell({ children: [new docx.Paragraph({ text: v })] })) }))
            ];
            headerChildren.push(new docx.Table({ rows: executionRows, width: { size: 100, type: docx.WidthType.PERCENTAGE } }));
            sections.push({ children: headerChildren });

            for (const [resName, resData] of Object.entries(analysis.analyses || {})) {
                const responseChildren: any[] = [
                    new docx.Paragraph({ children: [new docx.TextRun({ text: `Analysis: ${resName}`, bold: true, size: 36, color: "10B981" })], pageBreakBefore: true }),
                    new docx.Paragraph({ children: [new docx.TextRun({ text: `Model: ${(resData as any).fittingModelUsed}`, bold: true })] }),
                    new docx.Paragraph({ text: `Equation: ${(resData as any).equation}`, spacing: { after: 200 } }),
                ];

                const images = await generateAllPlotImages(resData as any, analysis.predVsActualData);
                for (const [type, img] of Object.entries(images)) {
                    responseChildren.push(new docx.Paragraph({
                        children: [new docx.TextRun({ text: `${type}:`, bold: true })],
                        spacing: { before: 300 }
                    }));
                    responseChildren.push(new docx.Paragraph({ children: [new docx.ImageRun({ data: img.split(',')[1], transformation: { width: 500, height: 375 } })], alignment: docx.AlignmentType.CENTER }));
                }

                responseChildren.push(new docx.Paragraph({ text: "ANOVA Summary", heading: docx.HeadingLevel.HEADING_2, spacing: { before: 400 } }));
                const anovaRows = [
                    new docx.TableRow({ children: ["Source", "DF", "SS", "MS", "F", "p"].map(h => new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: h, bold: true })] })] })) }),
                    ...(resData as any).anovaTable.map((row: any) => new docx.TableRow({ children: [row.source, `${row.df}`, `${row.sumOfSquares.toFixed(3)}`, `${row.meanSquare.toFixed(3)}`, `${row.fValue?.toFixed(3) || '-'}`, `${row.pValue?.toFixed(4) || '-'}`].map(v => new docx.TableCell({ children: [new docx.Paragraph({ text: v })] })) }))
                ];
                responseChildren.push(new docx.Table({ rows: anovaRows, width: { size: 100, type: docx.WidthType.PERCENTAGE } }));
                sections.push({ children: responseChildren });
            }

            const doc = new docx.Document({ sections });
            const blob = await docx.Packer.toBlob(doc);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = `${experimentName.replace(/\s+/g, '_')}_Dossier.docx`; a.click();
            setLoadingState('success');
        } catch (e) { handleError(e, "Word Export"); }
        finally { setShowExportMenu(false); }
    };

    return (
        <div className="h-full flex flex-col bg-bg-primary overflow-hidden selection:bg-primary-purple/20">
            <header className="glass border-b border-slate-100 px-4 sm:px-10 py-5 flex flex-col lg:flex-row items-center justify-between gap-6 z-30 relative">
                {/* Branding Section */}
                <div className="flex items-center justify-between w-full lg:w-auto gap-8 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="relative group cursor-pointer" onClick={() => setActiveView('dashboard')}>
                            <div className="absolute inset-0 bg-primary-purple/20 blur-2xl group-hover:bg-primary-purple/40 transition-all rounded-full" />
                            <Logo className="w-12 h-12 shadow-2xl rounded-2xl relative z-10 border border-white/50 backdrop-blur-sm" />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900 uppercase flex items-center gap-2">
                                Hyper<span className="text-gradient">Plott</span>
                                <span className="text-[10px] bg-primary-purple text-white px-2 py-1 rounded-md leading-none font-black tracking-widest ml-1 shadow-lg shadow-primary-purple/20">PRO</span>
                            </h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 -mt-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                {experimentName}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={runFullDemo}
                        className="hidden sm:flex items-center gap-3 px-6 py-2.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100 hover:bg-emerald-100 hover:shadow-lg hover:shadow-emerald-500/10 transition-all active:scale-95 group"
                    >
                        <SparklesIcon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        Live Demo
                    </button>

                    <div className="lg:hidden">
                        <span className="text-[10px] font-black text-white bg-primary-purple px-4 py-2 rounded-full shadow-xl shadow-primary-purple/20">
                            STEP {(['Dimension', 'Execution', 'Insight', 'Synthesis'].indexOf(activeTab) + 1)}/4
                        </span>
                    </div>
                </div>

                <nav className="flex items-center bg-slate-100/30 p-1.5 rounded-full gap-1 border border-slate-100 w-full lg:w-auto overflow-x-auto no-scrollbar relative z-10">
                    {(['Dimension', 'Execution', 'Insight', 'Synthesis'] as DoETab[]).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 sm:px-10 py-3 text-[10px] font-black uppercase tracking-[0.25em] rounded-full transition-all duration-500 whitespace-nowrap flex-1 lg:flex-none relative group overflow-hidden ${activeTab === tab
                                ? 'bg-white text-primary-purple shadow-xl shadow-primary-purple/10 translate-y-[-1px]'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
                                }`}
                        >
                            <span className="relative z-10">{tab}</span>
                            {activeTab === tab && (
                                <motion.div layoutId="tab-highlight" className="absolute inset-0 bg-primary-purple/5 opacity-50 rounded-full" />
                            )}
                        </button>
                    ))}
                </nav>
            </header>

            <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 bg-[#FBFCFE] custom-scrollbar">
                <AnimatePresence mode="wait">
                    {activeTab === 'Dimension' && (
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="max-w-6xl mx-auto space-y-6 sm:space-y-12 pb-20">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
                                <section className="space-y-4 sm:space-y-8">
                                    <div className="card-premium p-6 sm:p-12">
                                        <div className="mb-6 sm:mb-10">
                                            <div className="section-badge">Optimization Context</div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 sm:mb-4 block">Experiment Identifier</label>
                                            <input
                                                value={experimentName}
                                                onChange={e => setExperimentName(e.target.value)}
                                                className="w-full bg-slate-50/50 px-4 sm:px-8 py-3 sm:py-5 rounded-xl sm:rounded-2xl border border-slate-100 focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/5 text-slate-900 text-base sm:text-xl font-black transition-all outline-none"
                                            />
                                        </div>
                                        <div className="mb-6 sm:mb-10">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 sm:mb-4 block">Scientific Objective</label>
                                            <textarea
                                                value={objective}
                                                onChange={e => setObjective(e.target.value)}
                                                placeholder="e.g. Seeking high-precision yield optimization..."
                                                className="w-full bg-slate-50/50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/5 h-32 sm:h-48 resize-none text-slate-800 text-sm sm:text-lg font-medium transition-all outline-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mt-4">
                                            <button
                                                onClick={suggestVariablesWithAI}
                                                disabled={isSuggesting || !objective}
                                                className="btn-primary group !py-4 sm:!py-6"
                                            >
                                                {isSuggesting ? <LoaderIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-all text-white/80" />}
                                                <span className="tracking-[0.1em] sm:tracking-[0.2em] text-[10px] sm:text-xs">{isSuggesting ? 'PROBING...' : 'AI DIMENSIONING'}</span>
                                            </button>
                                            <button onClick={runFullDemo} className="btn-secondary !py-4 sm:!py-6 border-emerald-100 bg-emerald-50/30 text-emerald-600 hover:bg-emerald-50 text-[10px] sm:text-xs">
                                                <ZapIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                                                <span className="tracking-[0.1em] sm:tracking-[0.2em]">DEMO WORKFLOW</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-premium p-8 sm:p-12">
                                        <div className="section-badge">Model selection</div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 block">Experimental Design Framework</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['Central Composite Design (CCD)', 'Box-Behnken Design (BBD)', 'Full Factorial', 'Partial Factorial'].map(t => (
                                                <button
                                                    key={t}
                                                    onClick={() => setDesignType(t as any)}
                                                    className={`p-5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${designType === t
                                                        ? 'bg-primary-purple/5 text-primary-purple border-primary-purple shadow-lg shadow-primary-purple/10'
                                                        : 'bg-slate-50 border-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-500'}`}
                                                >
                                                    {t.replace(' Design', '')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                                <section className="space-y-4 sm:space-y-8">
                                    <div className="card-premium p-8 sm:p-12">
                                        <div className="flex justify-between items-center mb-8">
                                            <div>
                                                <div className="section-badge">Input parameters</div>
                                                <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Variable Factors (X)</p>
                                            </div>
                                            <button
                                                onClick={() => setFactors([...factors, { id: Math.random().toString(), name: 'New Factor', unit: 'u', low: 0, high: 100, type: 'Numerical' }])}
                                                className="w-12 h-12 flex items-center justify-center bg-primary-purple text-white rounded-2xl hover:bg-primary-purple/90 transition-all shadow-xl shadow-primary-purple/20"
                                            >
                                                <PlusIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {factors.map((f, i) => (
                                                <div key={f.id} className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100/50 group hover:bg-white hover:shadow-xl transition-all duration-500">
                                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
                                                        <div className="flex-1 flex items-center gap-4">
                                                            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black shadow-lg">{i + 1}</div>
                                                            <div className="flex-1">
                                                                <input
                                                                    value={f.name}
                                                                    onChange={e => { const nf = [...factors]; nf[i].name = e.target.value; setFactors(nf); }}
                                                                    className="bg-transparent border-none p-0 text-sm font-black w-full outline-none text-slate-900"
                                                                />
                                                                <input
                                                                    value={f.unit}
                                                                    onChange={e => { const nf = [...factors]; nf[i].unit = e.target.value; setFactors(nf); }}
                                                                    className="bg-transparent border-none p-0 text-[10px] font-bold text-slate-400 outline-none uppercase tracking-widest"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <div className="flex flex-col gap-1">
                                                                <span className="text-[8px] font-black text-slate-400 uppercase ml-3">LOW (-1)</span>
                                                                <input type="number" value={f.low} onChange={e => { const nf = [...factors]; nf[i].low = +e.target.value; setFactors(nf); }} className="w-24 bg-white px-4 py-2 rounded-xl text-xs font-black text-slate-700 border border-slate-100 outline-none focus:border-primary-purple" />
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <span className="text-[8px] font-black text-slate-400 uppercase ml-3">HIGH (+1)</span>
                                                                <input type="number" value={f.high} onChange={e => { const nf = [...factors]; nf[i].high = +e.target.value; setFactors(nf); }} className="w-24 bg-white px-4 py-2 rounded-xl text-xs font-black text-slate-700 border border-slate-100 outline-none focus:border-primary-purple" />
                                                            </div>
                                                            <button
                                                                onClick={() => setFactors(factors.filter(it => it.id !== f.id))}
                                                                className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                            >
                                                                <TrashIcon className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="card-premium p-8 sm:p-12">
                                        <div className="flex justify-between items-center mb-8">
                                            <div>
                                                <div className="section-badge">Response metrics</div>
                                                <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Quality Indicators (Y)</p>
                                            </div>
                                            <button
                                                onClick={() => setResponses([...responses, { id: Math.random().toString(), name: 'New Response', unit: '%', goal: 'Maximize' }])}
                                                className="w-12 h-12 flex items-center justify-center bg-primary-purple/10 text-primary-purple rounded-2xl hover:bg-primary-purple/20 transition-all"
                                            >
                                                <PlusIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {responses.map((r, i) => (
                                                <div key={r.id} className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100/50 group hover:bg-white hover:shadow-xl transition-all duration-500">
                                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
                                                        <div className="flex-1 flex items-center gap-4">
                                                            <div className="w-8 h-8 rounded-full bg-primary-purple/10 text-primary-purple flex items-center justify-center text-[10px] font-black shadow-inner">{i + 1}</div>
                                                            <div className="flex-1">
                                                                <input
                                                                    value={r.name}
                                                                    onChange={e => { const nr = [...responses]; nr[i].name = e.target.value; setResponses(nr); }}
                                                                    className="bg-transparent border-none p-0 text-sm font-black w-full outline-none text-slate-900"
                                                                />
                                                                <input
                                                                    value={r.unit}
                                                                    onChange={e => { const nr = [...responses]; nr[i].unit = e.target.value; setResponses(nr); }}
                                                                    className="bg-transparent border-none p-0 text-[10px] font-bold text-slate-400 outline-none uppercase tracking-widest"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <select
                                                                value={r.goal}
                                                                onChange={e => { const nr = [...responses]; nr[i].goal = e.target.value as any; setResponses(nr); }}
                                                                className="bg-white text-[10px] font-black text-primary-purple border border-slate-100 rounded-xl px-4 py-2 outline-none uppercase tracking-widest shadow-sm"
                                                            >
                                                                <option value="Maximize">Maximize</option>
                                                                <option value="Minimize">Minimize</option>
                                                                <option value="Target">Target</option>
                                                            </select>
                                                            <button
                                                                onClick={() => setResponses(responses.filter(it => it.id !== r.id))}
                                                                className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                            >
                                                                <TrashIcon className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="flex justify-center pb-12 px-4">
                                <button
                                    onClick={generateDesign}
                                    className="btn-primary w-full sm:w-auto !px-12 sm:!px-20 !py-5 sm:!py-8 text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] shadow-2xl shadow-primary-purple/20"
                                >
                                    INITIALIZE DESIGN MATRIX
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'Execution' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-12 pb-24">
                            <div className="card-premium p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                                <div>
                                    <div className="section-badge">Data Acquisition</div>
                                    <h3 className="text-3xl font-black uppercase text-slate-900 tracking-tighter">Experimental Matrix</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] px-2 py-0.5 bg-emerald-50 rounded-md">Live Validation Active</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 w-full sm:w-auto">
                                    <button onClick={() => setRunMatrix(runMatrix.map(run => ({ ...run, responses: Object.fromEntries(responses.map(r => [r.name, Number((Math.random() * 100).toFixed(2))])) })))} className="btn-secondary !px-8 !py-4 text-[10px] tracking-widest uppercase">Simulate Results</button>
                                    <button onClick={performAnalysis} className="btn-primary !px-12 !py-4 text-[10px] tracking-widest uppercase">Perform Analysis</button>
                                </div>
                            </div>
                            <div className="card-premium !p-0 shadow-2xl overflow-hidden mb-12 border-slate-100">
                                <div className="overflow-x-auto select-text no-scrollbar">
                                    <table className="w-full text-left text-[11px] border-collapse min-w-[600px]">
                                        <thead>
                                            <tr className="bg-slate-50 text-slate-400 font-black uppercase border-b border-slate-100">
                                                <th className="px-10 py-8">Sequence</th>
                                                {factors.map(f => <th key={f.id} className="px-4 py-8">{f.name}</th>)}
                                                {responses.map(r => <th key={r.id} className="px-4 py-8 text-primary-purple">{r.name}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 font-medium">
                                            {runMatrix.map((run, idx) => (
                                                <tr key={idx} className={`hover:bg-slate-50/80 transition-colors group ${duplicateRunsIndices.includes(idx) ? 'bg-emerald-50/40' : ''}`}>
                                                    <td className="px-4 sm:px-8 py-3 sm:py-4 font-black text-slate-900 border-l-4 border-transparent group-hover:border-emerald-500 uppercase text-[9px] sm:text-[11px]">RUN_{idx + 1}</td>
                                                    {factors.map(f => (
                                                        <td key={f.id} className="px-3 sm:px-4 py-3 sm:py-4 font-mono text-slate-500">
                                                            {typeof run.factors[f.name] === 'number' ? (run.factors[f.name] as number).toFixed(2) : run.factors[f.name] || '-'}
                                                        </td>
                                                    ))}
                                                    {responses.map(r => (
                                                        <td key={r.id} className="px-3 sm:px-4 py-3 sm:py-4">
                                                            <input
                                                                type="number"
                                                                value={run.responses[r.name] ?? ''}
                                                                onChange={e => {
                                                                    const nm = [...runMatrix];
                                                                    nm[idx].responses[r.name] = e.target.value === '' ? null : +e.target.value;
                                                                    setRunMatrix(nm);
                                                                }}
                                                                className="w-16 sm:w-20 bg-white border border-slate-200 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-black text-emerald-600 text-[10px] sm:text-[12px] outline-none shadow-sm focus:ring-2 focus:ring-emerald-500/20"
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
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1600px] mx-auto min-h-[600px] pb-32">
                            {currentAnalysis ? (
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                    <div className="lg:col-span-8 space-y-12">
                                        <div className="card-premium p-6 sm:p-10 overflow-visible relative">
                                            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-10 gap-6 sm:gap-8">
                                                <div className="flex flex-col gap-3 w-full sm:w-72">
                                                    <div className="section-badge !mb-0">Selected Response</div>
                                                    <select
                                                        value={selectedAnalysisKey}
                                                        onChange={(e) => setSelectedAnalysisKey(e.target.value)}
                                                        className="bg-slate-900 text-white rounded-xl sm:rounded-2xl px-5 py-3 sm:px-6 sm:py-4 text-[10px] sm:text-xs font-black uppercase shadow-2xl hover:bg-black transition-all outline-none w-full"
                                                    >
                                                        {Object.keys(analysis?.analyses || {}).map(k => (
                                                            <option key={k} value={k}>{k}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="flex flex-wrap gap-1 md:gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner w-full sm:w-auto overflow-x-auto no-scrollbar">
                                                    {(['3D Surface', '2D Contour', 'Perturbation', 'Model Diagnostic'] as PlotType[]).map(pt => (
                                                        <button key={pt} onClick={() => setActivePlot(pt)} className={`px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-black uppercase tracking-wider transition-all duration-500 whitespace-nowrap ${activePlot === pt ? 'bg-primary-purple text-white shadow-xl shadow-primary-purple/20 translate-y-[-1px]' : 'text-slate-400 hover:text-slate-600'}`}>{pt}</button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="h-[300px] xs:h-[350px] sm:h-[550px] bg-slate-50 rounded-2xl sm:rounded-[2.5rem] overflow-hidden relative border border-slate-100 inner-shadow">
                                                <PlotViewer analysis={currentAnalysis} activePlot={activePlot} predVsActualData={analysis?.predVsActualData} experimentName={experimentName} />
                                            </div>
                                        </div>

                                        <div className="card-premium p-10 border-slate-100">
                                            <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-2.5 h-10 bg-primary-purple rounded-full shadow-lg shadow-primary-purple/20" />
                                                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">ANOVA STATISTICAL DOSSIER</h4>
                                                </div>
                                                <button onClick={copyAnovaToClipboard} className={`btn-secondary !px-8 !py-3 !text-[10px] tracking-widest transition-all ${copiedAnova ? '!bg-emerald-500 !text-white !border-emerald-500' : ''}`}>
                                                    {copiedAnova ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />} {copiedAnova ? 'COPIED TO CLIPBOARD' : 'EXTRACT DATA'}
                                                </button>
                                            </div>
                                            <div className="overflow-x-auto rounded-[2rem] border border-slate-50">
                                                <table className="w-full text-left text-[11px] border-collapse min-w-[500px]">
                                                    <thead>
                                                        <tr className="bg-slate-50/50 text-slate-400 font-black uppercase border-b border-slate-100">
                                                            <th className="px-10 py-6">Source of Variation</th>
                                                            <th className="px-4 py-6 text-center">DF</th>
                                                            <th className="px-4 py-6 text-right">SS</th>
                                                            <th className="px-4 py-6 text-right">MS</th>
                                                            <th className="px-4 py-6 text-right">F-Value</th>
                                                            <th className="px-10 py-6 text-right">Prob &gt; F</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-100 font-medium">
                                                        {currentAnalysis.anovaTable?.map((row: any, idx: number) => (
                                                            <tr key={idx} className={`hover:bg-slate-50/80 transition-colors group ${['model', 'total'].includes(String(row.source || '').toLowerCase()) ? 'bg-slate-50/40 font-black' : ''}`}>
                                                                <td className={`px-3 sm:px-8 py-3 sm:py-5 font-black text-slate-900 group-hover:text-emerald-600 transition-colors`}>{row.source || '-'}</td>
                                                                <td className="px-1 sm:px-4 py-3 sm:py-5 text-center font-bold text-slate-600">{row.df ?? '-'}</td>
                                                                <td className="px-2 sm:px-4 py-3 sm:py-5 text-right font-mono text-slate-500 whitespace-nowrap">
                                                                    {typeof row.sumOfSquares === 'number' ? row.sumOfSquares.toFixed(2) : '-'}
                                                                </td>
                                                                <td className="px-2 sm:px-4 py-3 sm:py-5 text-right font-mono text-slate-500 whitespace-nowrap">
                                                                    {typeof row.meanSquare === 'number' ? row.meanSquare.toFixed(2) : '-'}
                                                                </td>
                                                                <td className="px-2 sm:px-4 py-3 sm:py-5 text-right font-mono text-emerald-600 font-black">
                                                                    {typeof row.fValue === 'number' ? row.fValue.toFixed(2) : '-'}
                                                                </td>
                                                                <td className={`px-3 sm:px-8 py-3 sm:py-5 text-right font-black ${typeof row.pValue === 'number' && row.pValue < 0.05 ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                                    {typeof row.pValue === 'number' ? (row.pValue < 0.0001 ? '<.0001' : row.pValue.toFixed(3)) : '-'}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-100 flex items-start gap-4">
                                                <InfoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 flex-shrink-0 mt-1" />
                                                <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed italic">{currentAnalysis.interpretation}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-4 space-y-10">
                                        <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl space-y-8 text-white">
                                            <div className="flex items-center gap-3 mb-2">
                                                <ZapIcon className="w-5 h-5 text-emerald-400 animate-pulse" />
                                                <h4 className="text-[11px] font-black uppercase tracking-widest text-emerald-400">Precision Diagnostics</h4>
                                            </div>
                                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Regression Model Fitting</label>
                                                <p className="text-emerald-400 font-black text-sm uppercase tracking-tight">{currentAnalysis.fittingModelUsed || "Standard Quadratic RSM"}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                                {[
                                                    { label: 'R²', value: currentAnalysis.stats?.rSquared?.toFixed(3) },
                                                    { label: 'Adj R²', value: currentAnalysis.stats?.adjRSquared?.toFixed(3) },
                                                    { label: 'F-Val', value: currentAnalysis.stats?.fValue?.toFixed(1) },
                                                    { label: 'p-Val', value: currentAnalysis.stats?.pValue?.toFixed(3), highlight: currentAnalysis.stats?.pValue < 0.05 },
                                                    { label: 'Adeq P', value: currentAnalysis.stats?.adeqPrecision?.toFixed(1) || 'N/A' }
                                                ].map((s, i) => (
                                                    <div key={i} className="bg-white/5 p-4 sm:p-5 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center text-center">
                                                        <p className="text-[7px] sm:text-[9px] font-black text-slate-500 uppercase mb-1 leading-none">{s.label}</p>
                                                        <p className={`text-base sm:text-xl font-black ${s.highlight ? 'text-emerald-400' : 'text-white'}`}>{s.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pt-6 border-t border-white/10">
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 block">Predictive Equation</label>
                                                <div className="bg-black/40 p-6 rounded-3xl font-mono text-[10px] text-emerald-400 italic break-all leading-relaxed shadow-inner">
                                                    {currentAnalysis.equation}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-premium p-10 !bg-emerald-50 border-emerald-100 shadow-sm relative overflow-hidden">
                                            <div className="absolute -top-10 -right-10 p-10 text-emerald-600 opacity-5 rotate-12"><TargetIcon className="w-48 h-48" /></div>
                                            <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                Synthesis Insight
                                            </h4>
                                            <p className="text-sm font-bold text-emerald-900 leading-relaxed italic relative z-10">"{analysis.overallInterpretation}"</p>
                                        </div>

                                        <button onClick={() => setActiveTab('Synthesis')} className="btn-primary !py-8 text-sm tracking-[0.4em] shadow-2xl flex items-center justify-center gap-5 group">
                                            <TargetIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                            VIEW OPTIMAL SOLUTION
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-48 bg-white rounded-[4rem] border border-slate-100 shadow-xl space-y-10">
                                    <div className="w-28 h-28 bg-slate-50 rounded-full flex items-center justify-center text-slate-200"><ChartBarIcon className="w-14 h-14" /></div>
                                    <div className="text-center space-y-4">
                                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Analytics Engine Offline</h3>
                                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] max-w-sm mx-auto">Upload or simulate data in the execution grid.</p>
                                    </div>
                                    <button onClick={() => setActiveTab('Execution')} className="px-14 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase transition-all shadow-2xl hover:scale-105">Begin Execution</button>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'Synthesis' && analysis && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto py-16 space-y-20 pb-32">
                            <div className="text-center space-y-4">
                                <div className="section-badge !mb-4">Final Configuration</div>
                                <h3 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-none">Global <span className="text-gradient">Optima</span></h3>
                                <p className="text-slate-400 font-bold tracking-[0.2em] uppercase text-xs">Recommended Parameters for Peak Performance</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {Object.entries(analysis.optimizedParams || {}).map(([key, val], idx) => (
                                    <div key={key} className="card-premium p-12 hover:border-primary-purple transition-all duration-700 group">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-md">Variable {idx + 1}</div>
                                            <div className="w-10 h-10 rounded-xl bg-primary-purple/5 flex items-center justify-center text-primary-purple"><TargetIcon className="w-5 h-5" /></div>
                                        </div>
                                        <h4 className="text-2xl font-black uppercase mb-8 text-slate-900 tracking-tight transition-colors group-hover:text-primary-purple">{key}</h4>
                                        <div className="flex items-end justify-between border-t border-slate-50 pt-8">
                                            <p className="text-6xl sm:text-8xl font-black tracking-tighter text-slate-900 group-hover:scale-[1.02] transition-transform origin-left text-gradient bg-gradient-to-r from-slate-900 to-slate-600">{(val as number).toFixed(2)}</p>
                                            <p className="text-sm font-black text-slate-400 mb-4 uppercase tracking-widest">{factors.find(f => f.name === key)?.unit || 'units'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center relative px-4">
                                <button onClick={() => setShowExportMenu(!showExportMenu)} className="btn-primary w-full sm:w-auto !px-8 sm:!px-16 !py-5 sm:!py-8 text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] shadow-3xl shadow-primary-purple/20">
                                    <DownloadIcon className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
                                    DOWNLOAD DOSSIER
                                    <ChevronDownIcon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 ${showExportMenu ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>{showExportMenu && (
                                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="absolute bottom-full mb-6 w-full max-w-sm glass rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden z-50 p-2 shadow-2xl border-white/50">
                                        <button onClick={handleGeneratePDFReport} className="w-full text-left p-4 sm:p-6 hover:bg-slate-50 rounded-xl sm:rounded-[2rem] flex items-center gap-4 sm:gap-6 transition-all group">
                                            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 transition-all group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/20"><FileSignatureIcon className="w-5 h-5 sm:w-7 sm:h-7" /></div>
                                            <div><p className="text-[10px] sm:text-[11px] font-black uppercase text-slate-900 tracking-wider">Scientific PDF</p><p className="text-[8px] sm:text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Visuals • ANOVA</p></div>
                                        </button>
                                        <div className="h-px bg-slate-100 my-1 mx-4 sm:mx-6" />
                                        <button onClick={handleGenerateWordReport} className="w-full text-left p-4 sm:p-6 hover:bg-slate-50 rounded-xl sm:rounded-[2rem] flex items-center gap-4 sm:gap-6 transition-all group">
                                            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary-purple/5 flex items-center justify-center text-primary-purple transition-all group-hover:bg-primary-purple group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary-purple/20"><ZapIcon className="w-5 h-5 sm:w-7 sm:h-7" /></div>
                                            <div><p className="text-[10px] sm:text-[11px] font-black uppercase text-slate-900 tracking-wider">Editable Word</p><p className="text-[8px] sm:text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Tables • Equations</p></div>
                                        </button>
                                    </motion.div>
                                )}</AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <AnimatePresence>{loadingState === 'loading' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[60] bg-white/70 backdrop-blur-3xl flex flex-col items-center justify-center gap-12">
                    <div className="w-28 h-28 border-[10px] border-slate-100 border-t-emerald-500 rounded-full animate-spin shadow-3xl shadow-emerald-500/10" />
                    <div className="text-center space-y-4"><p className="text-lg font-black text-slate-900 uppercase tracking-[1em] animate-pulse">Running Precision Matrix</p><p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em]">Synthesizing Statistical Insights...</p></div>
                </motion.div>
            )}</AnimatePresence>

            {error && (
                <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[70] bg-red-600 text-white px-10 py-6 rounded-[3rem] shadow-3xl flex flex-col items-center gap-5 border border-red-500 max-w-lg text-center">
                    <div className="flex items-center gap-6">
                        <InfoIcon className="w-6 h-6 flex-shrink-0" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">{error}</span>
                        <button onClick={() => setError(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors"><XIcon className="w-6 h-6" /></button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default DesignOfExperimentView;
