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
    const [analysis, setAnalysis] = useState<DoEAnalysisResult | null>(null);
    const [selectedAnalysisKey, setSelectedAnalysisKey] = useState<string>('');
    const [loadingState, setLoadingState] = useState<LoadingState>('idle');
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [copiedAnova, setCopiedAnova] = useState(false);

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

    const safeJSONParse = (text: string) => {
        try {
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanText);
        } catch (e) {
            console.error("JSON Parse Error on text:", text);
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
                const errText = err.message || '';
                const isRateLimit = errText.includes('429') || err.status === 429 || errText.includes('RESOURCE_EXHAUSTED');

                if (isRateLimit && attempt < maxRetries) {
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
            const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
            if (!apiKey) throw new Error("API Key (VITE_GEMINI_API_KEY) is missing. Please configure it in your environment variables.");

            const result = await callWithRetry(async () => {
                const ai = new GoogleGenAI({ apiKey: apiKey as string });
                const response = await ai.models.generateContent({
                    model: "gemini-3-flash-preview",
                    contents: [{ role: 'user', parts: [{ text: `Scientific Study Objective: "${objective}"` }] }],
                    config: {
                        temperature: 0,
                        maxOutputTokens: 1024,
                        systemInstruction: "Concise DoE Expert. Suggest exactly 3-4 numerical factors and 1-2 responses. Output JSON only.",
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
                return safeJSONParse((response as any).text || "{}");
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
            const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
            if (!apiKey) throw new Error("API Key (VITE_GEMINI_API_KEY) is missing. Please configure it in your environment variables.");

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
                        maxOutputTokens: 2048,
                        systemInstruction: "Fast DoE Engine. Generate accurate coded matrices. Avoid preamble. Output JSON ONLY.",
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
                return safeJSONParse((response as any).text || "{}");
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
            const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
            if (!apiKey) throw new Error("API Key (VITE_GEMINI_API_KEY) is missing. Please configure it in your environment variables.");

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
                    maxOutputTokens: 2048,
                    systemInstruction: "Senior Statistician. Provide ANOVA and 8x8 plot grid. Be extremely concise. Output JSON ONLY.",
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

            const analysisResult = safeJSONParse((response as any).text);
            setAnalysis(analysisResult);
            setSelectedAnalysisKey(Object.keys(analysisResult.analyses || {})[0] || '');
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
        <div className="h-full flex flex-col bg-[#FBFCFE] overflow-hidden">
            <header className="bg-slate-950/95 backdrop-blur-xl border-b border-emerald-500/10 px-3 sm:px-6 lg:px-10 py-3 sm:py-5 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6 z-20 relative overflow-hidden">
                {/* Scientific Aesthetic Overlays */}
                <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

                <div className="flex items-center justify-between w-full lg:w-auto gap-4 lg:gap-6 transition-all relative z-10">
                    <div className="flex items-center gap-3 sm:gap-6">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-emerald-500/20 blur-xl group-hover:bg-emerald-500/40 transition-all rounded-full" />
                            <Logo className="w-8 h-8 sm:w-11 sm:h-11 shadow-2xl rounded-xl sm:rounded-2xl relative z-10 border border-white/10" />
                        </div>
                        <div>
                            <h2 className="text-base sm:text-2xl font-black tracking-tighter text-white uppercase flex items-center gap-2">
                                HyperPlott <span className="text-[8px] sm:text-[10px] bg-emerald-500 text-black px-1.5 py-0.5 rounded leading-none font-black">PRO</span>
                            </h2>
                            <p className="text-[7px] sm:text-[9px] font-black text-emerald-400/60 uppercase tracking-[0.2em] -mt-0.5 truncate max-w-[120px] sm:max-w-none">
                                <span className="text-emerald-500 animate-pulse mr-1.5">●</span> {experimentName}
                            </p>
                        </div>
                    </div>
                    {/* Progress Indicator for Mobile */}
                    <div className="lg:hidden flex items-center gap-2">
                        <span className="text-[8px] sm:text-[10px] font-black text-black uppercase tracking-tighter bg-emerald-400 px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/20 whitespace-nowrap">
                            STAGE {(['Dimension', 'Execution', 'Insight', 'Synthesis'].indexOf(activeTab) + 1)} OF 4
                        </span>
                    </div>
                </div>

                <nav className="flex items-center bg-white/5 p-1 rounded-full gap-1 border border-white/5 overflow-x-auto max-w-full no-scrollbar scroll-smooth w-full lg:w-auto justify-start lg:justify-center relative z-10">
                    {(['Dimension', 'Execution', 'Insight', 'Synthesis'] as DoETab[]).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 sm:px-10 py-2 sm:py-3 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all whitespace-nowrap flex-1 lg:flex-none relative group ${activeTab === tab
                                ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-black shadow-lg shadow-emerald-500/20 translate-y-[-1px]'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div layoutId="tab-glow" className="absolute inset-0 bg-emerald-400 blur-md opacity-20 rounded-full" />
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
                                    <div className="bg-white p-5 sm:p-10 rounded-[1.5rem] sm:rounded-[3rem] border border-slate-100 shadow-xl">
                                        <div className="mb-4 sm:mb-8">
                                            <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 sm:mb-3 block">Experiment Title</label>
                                            <input
                                                value={experimentName}
                                                onChange={e => setExperimentName(e.target.value)}
                                                className="w-full bg-slate-50 px-4 sm:px-8 py-3 sm:py-5 rounded-xl sm:rounded-2xl border-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800 text-base sm:text-xl font-black"
                                            />
                                        </div>
                                        <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 sm:mb-6 block">Experimental Objective</label>
                                        <textarea value={objective} onChange={e => setObjective(e.target.value)} placeholder="e.g. Optimize particle size..." className="w-full bg-slate-50 p-4 sm:p-8 rounded-[1rem] sm:rounded-[2rem] border-none h-32 sm:h-44 resize-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800 text-sm sm:text-lg font-medium" />
                                        <button onClick={suggestVariablesWithAI} disabled={isSuggesting || !objective} className="w-full mt-4 sm:mt-8 py-4 sm:py-6 bg-slate-900 text-white rounded-xl sm:rounded-2xl text-[8px] sm:text-[10px] font-black uppercase flex items-center justify-center gap-3 sm:gap-4 hover:bg-black transition-all">
                                            {isSuggesting ? <LoaderIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />} AI Dimensioning
                                        </button>
                                    </div>
                                    <div className="bg-white p-5 sm:p-10 rounded-[1.5rem] sm:rounded-[3rem] border border-slate-100 shadow-xl">
                                        <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 sm:mb-6 block">Statistical Design Methodology</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                                            {['Central Composite Design (CCD)', 'Box-Behnken Design (BBD)', 'Full Factorial', 'Partial Factorial'].map(t => (
                                                <button key={t} onClick={() => setDesignType(t as any)} className={`p-3 sm:p-5 rounded-lg sm:rounded-2xl text-[7px] sm:text-[8px] font-black transition-all leading-tight ${designType === t ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-500 shadow-inner' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>{t.toUpperCase()}</button>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                                <section className="space-y-4 sm:space-y-8">
                                    <div className="bg-white p-5 sm:p-10 rounded-[1.5rem] sm:rounded-[3rem] border border-slate-100 shadow-xl">
                                        <div className="flex justify-between items-center mb-4 sm:mb-8"><p className="text-[8px] sm:text-[10px] font-black text-slate-900 uppercase tracking-widest">Input Parameters (X)</p><button onClick={() => setFactors([...factors, { id: Math.random().toString(), name: 'New Factor', unit: 'u', low: 0, high: 100, type: 'Numerical' }])} className="p-1.5 sm:p-2.5 bg-emerald-50 text-emerald-600 rounded-lg sm:rounded-xl hover:bg-emerald-100 transition-colors"><PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" /></button></div>
                                        <div className="space-y-3 sm:space-y-4">
                                            {factors.map((f, i) => (
                                                <div key={f.id} className="bg-slate-50 p-2.5 sm:p-4 rounded-xl sm:rounded-3xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 group border border-slate-100 sm:border-none">
                                                    <div className="flex-1 min-w-0 flex items-center gap-3">
                                                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500 shrink-0">{i + 1}</div>
                                                        <div className="min-w-0 flex-1">
                                                            <input value={f.name} onChange={e => { const nf = [...factors]; nf[i].name = e.target.value; setFactors(nf); }} className="bg-transparent border-none p-0 text-[11px] sm:text-sm font-black w-full outline-none truncate" />
                                                            <input value={f.unit} onChange={e => { const nf = [...factors]; nf[i].unit = e.target.value; setFactors(nf); }} className="bg-transparent border-none p-0 text-[8px] sm:text-[10px] font-bold text-slate-400 outline-none" />
                                                        </div>
                                                        <button onClick={() => setFactors(factors.filter(it => it.id !== f.id))} className="sm:hidden p-1.5 text-slate-400 hover:text-red-500"><TrashIcon className="w-3.5 h-3.5" /></button>
                                                    </div>
                                                    <div className="flex gap-2 items-center justify-between border-t border-slate-200/50 sm:border-none pt-2 sm:pt-0">
                                                        <div className="flex-1 flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                                                            <span className="text-[7px] font-black text-slate-300 uppercase shrink-0">Low</span>
                                                            <input type="number" value={f.low} onChange={e => { const nf = [...factors]; nf[i].low = +e.target.value; setFactors(nf); }} className="bg-transparent w-full text-[9px] sm:text-[10px] text-center font-black outline-none" />
                                                        </div>
                                                        <div className="flex-1 flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                                                            <span className="text-[7px] font-black text-slate-300 uppercase shrink-0">High</span>
                                                            <input type="number" value={f.high} onChange={e => { const nf = [...factors]; nf[i].high = +e.target.value; setFactors(nf); }} className="bg-transparent w-full text-[9px] sm:text-[10px] text-center font-black outline-none" />
                                                        </div>
                                                        <button onClick={() => setFactors(factors.filter(it => it.id !== f.id))} className="hidden sm:block p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><TrashIcon className="w-4 h-4" /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 p-5 sm:p-10 rounded-[1.5rem] sm:rounded-[3rem] shadow-2xl">
                                        <div className="flex justify-between items-center mb-4 sm:mb-8"><p className="text-[8px] sm:text-[10px] font-black text-emerald-400 uppercase tracking-widest">Response Metrics (Y)</p><button onClick={() => setResponses([...responses, { id: Math.random().toString(), name: 'New Response', unit: '%', goal: 'Maximize' }])} className="p-1.5 sm:p-2.5 bg-white/10 text-emerald-400 rounded-lg sm:rounded-xl hover:bg-white/20 transition-colors"><PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" /></button></div>
                                        <div className="space-y-3 sm:space-y-4">
                                            {responses.map((r, i) => (
                                                <div key={r.id} className="bg-white/5 p-2.5 sm:p-4 rounded-xl sm:rounded-3xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 group border border-white/5">
                                                    <div className="flex-1 min-w-0 flex items-center gap-3">
                                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black text-emerald-400/50 shrink-0">{i + 1}</div>
                                                        <div className="min-w-0 flex-1">
                                                            <input value={r.name} onChange={e => { const nr = [...responses]; nr[i].name = e.target.value; setResponses(nr); }} className="bg-transparent border-none p-0 text-[11px] sm:text-sm font-black w-full text-white outline-none truncate" />
                                                            <input value={r.unit} onChange={e => { const nr = [...responses]; nr[i].unit = e.target.value; setResponses(nr); }} className="bg-transparent border-none p-0 text-[8px] sm:text-[10px] font-bold text-emerald-500/50 outline-none" />
                                                        </div>
                                                        <button onClick={() => setResponses(responses.filter(it => it.id !== r.id))} className="sm:hidden p-1.5 text-white/30 hover:text-red-400"><TrashIcon className="w-3.5 h-3.5" /></button>
                                                    </div>
                                                    <div className="flex items-center gap-2 border-t border-white/5 sm:border-none pt-2 sm:pt-0">
                                                        <select value={r.goal} onChange={e => { const nr = [...responses]; nr[i].goal = e.target.value as any; setResponses(nr); }} className="flex-1 bg-black/40 text-[9px] sm:text-[10px] font-black text-emerald-400 border border-white/10 rounded-lg px-3 py-1.5 outline-none">
                                                            <option value="Maximize">Maximize</option>
                                                            <option value="Minimize">Minimize</option>
                                                            <option value="Target">Target</option>
                                                        </select>
                                                        <button onClick={() => setResponses(responses.filter(it => it.id !== r.id))} className="hidden sm:block p-1 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><TrashIcon className="w-4 h-4" /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="flex justify-center pb-12"><button onClick={generateDesign} className="w-full sm:w-auto px-12 sm:px-24 py-5 sm:py-6 bg-emerald-600 text-white rounded-xl sm:rounded-[2rem] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] shadow-2xl hover:bg-emerald-700 transition-all">Initialize Design Matrix</button></div>
                        </motion.div>
                    )}

                    {activeTab === 'Execution' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-6 sm:space-y-10 pb-20">
                            <div className="bg-white p-5 sm:p-10 rounded-[1.5rem] sm:rounded-[3rem] border border-slate-100 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                                <div>
                                    <h3 className="text-lg sm:text-2xl font-black uppercase text-slate-900">Experimental Grid</h3>
                                    <div className="flex items-center gap-2 mt-1 sm:mt-2">
                                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full" />
                                        <p className="text-[7px] sm:text-[10px] font-black text-emerald-600 uppercase tracking-widest">Replicate Points Highlighted</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button onClick={() => setRunMatrix(runMatrix.map(run => ({ ...run, responses: Object.fromEntries(responses.map(r => [r.name, Number((Math.random() * 100).toFixed(2))])) })))} className="flex-1 sm:flex-none px-4 py-3 sm:px-8 sm:py-4 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-2xl text-[7px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 whitespace-nowrap">Simulate</button>
                                    <button onClick={performAnalysis} className="flex-1 sm:flex-none px-4 py-3 sm:px-12 sm:py-4 bg-emerald-600 text-white rounded-lg sm:rounded-2xl text-[7px] sm:text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-emerald-700 transition-all whitespace-nowrap">Analyze</button>
                                </div>
                            </div>
                            <div className="bg-white rounded-[1rem] sm:rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden mb-8 sm:mb-12">
                                <div className="overflow-x-auto select-text no-scrollbar">
                                    <table className="w-full text-left text-[8px] sm:text-[11px] border-collapse min-w-[500px]">
                                        <thead>
                                            <tr className="bg-slate-50 text-slate-500 font-black uppercase border-b border-slate-200">
                                                <th className="px-3 sm:px-8 py-3 sm:py-6 rounded-tl-3xl">Run</th>
                                                {factors.map(f => <th key={f.id} className="px-2 sm:px-4 py-3 sm:py-6">{f.name}</th>)}
                                                {responses.map(r => <th key={r.id} className="px-2 sm:px-4 py-3 sm:py-6 text-emerald-600 font-black">{r.name}</th>)}
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
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1500px] mx-auto min-h-[600px] pb-24">
                            {currentAnalysis ? (
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                    <div className="lg:col-span-8 space-y-6 sm:space-y-10">
                                        <div className="bg-white p-5 sm:p-8 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden relative">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-6">
                                                <div className="flex flex-col gap-2 w-full sm:w-auto">
                                                    <label className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Active Metric Analysis</label>
                                                    <select
                                                        value={selectedAnalysisKey}
                                                        onChange={(e) => setSelectedAnalysisKey(e.target.value)}
                                                        className="bg-slate-900 text-white rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-3.5 text-[9px] sm:text-[11px] font-black uppercase shadow-xl hover:bg-black w-full"
                                                    >
                                                        {Object.keys(analysis?.analyses || {}).map(k => (
                                                            <option key={k} value={k}>{k}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="flex flex-wrap gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner w-full sm:w-auto overflow-x-auto no-scrollbar">
                                                    {(['3D Surface', '2D Contour', 'Perturbation', 'Model Diagnostic'] as PlotType[]).map(pt => (
                                                        <button key={pt} onClick={() => setActivePlot(pt)} className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[7px] sm:text-[9px] font-black uppercase transition-all duration-300 whitespace-nowrap ${activePlot === pt ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>{pt}</button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="h-[280px] sx:h-[350px] sm:h-[450px] lg:h-[520px] bg-white rounded-[1.25rem] sm:rounded-[2.5rem] border border-slate-50 overflow-hidden relative shadow-inner">
                                                <PlotViewer analysis={currentAnalysis} activePlot={activePlot} predVsActualData={analysis?.predVsActualData} experimentName={experimentName} />
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-emerald-500 rounded-full" />
                                                    <h4 className="text-[10px] sm:text-[12px] font-black text-slate-900 uppercase tracking-[0.2em]">ANOVA Standard Report</h4>
                                                </div>
                                                <button onClick={copyAnovaToClipboard} className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase transition-all ${copiedAnova ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                                                    {copiedAnova ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />} {copiedAnova ? 'Copied' : 'Copy Table'}
                                                </button>
                                            </div>
                                            <div className="overflow-x-auto select-text no-scrollbar">
                                                <table className="w-full text-left text-[8px] sm:text-[11px] border-collapse min-w-[450px]">
                                                    <thead>
                                                        <tr className="bg-slate-50 text-slate-500 font-black uppercase border-b border-slate-200">
                                                            <th className="px-3 sm:px-8 py-3 sm:py-5 rounded-tl-2xl sm:rounded-tl-3xl">Source</th>
                                                            <th className="px-1 sm:px-4 py-3 sm:py-5 text-center">DF</th>
                                                            <th className="px-2 sm:px-4 py-3 sm:py-5 text-right">SS</th>
                                                            <th className="px-2 sm:px-4 py-3 sm:py-5 text-right">MS</th>
                                                            <th className="px-2 sm:px-4 py-3 sm:py-5 text-right">F</th>
                                                            <th className="px-3 sm:px-8 py-3 sm:py-5 text-right rounded-tr-2xl sm:rounded-tr-3xl">p</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-100 font-medium">
                                                        {currentAnalysis.anovaTable?.map((row: any, idx: number) => (
                                                            <tr key={idx} className={`hover:bg-slate-50/80 transition-colors group ${['model', 'total'].includes(row.source.toLowerCase()) ? 'bg-slate-50/40 font-black' : ''}`}>
                                                                <td className={`px-3 sm:px-8 py-3 sm:py-5 font-black text-slate-900 group-hover:text-emerald-600 transition-colors`}>{row.source}</td>
                                                                <td className="px-1 sm:px-4 py-3 sm:py-5 text-center font-bold text-slate-600">{row.df}</td>
                                                                <td className="px-2 sm:px-4 py-3 sm:py-5 text-right font-mono text-slate-500 whitespace-nowrap">{row.sumOfSquares?.toFixed(2)}</td>
                                                                <td className="px-2 sm:px-4 py-3 sm:py-5 text-right font-mono text-slate-500 whitespace-nowrap">{row.meanSquare?.toFixed(2)}</td>
                                                                <td className="px-2 sm:px-4 py-3 sm:py-5 text-right font-mono text-emerald-600 font-black">{row.fValue ? row.fValue.toFixed(2) : '-'}</td>
                                                                <td className={`px-3 sm:px-8 py-3 sm:py-5 text-right font-black ${row.pValue < 0.05 ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                                    {row.pValue === undefined || row.pValue === null ? '-' : row.pValue < 0.0001 ? '<.0001' : row.pValue.toFixed(3)}
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

                                        <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100 shadow-sm overflow-hidden relative">
                                            <div className="absolute -top-4 -right-4 p-6 text-emerald-100 opacity-20"><TargetIcon className="w-24 h-24" /></div>
                                            <h4 className="text-[11px] font-black text-emerald-600 uppercase mb-5">System Summary</h4>
                                            <p className="text-sm font-bold text-emerald-900 leading-relaxed italic">"{analysis.overallInterpretation}"</p>
                                        </div>

                                        <button onClick={() => setActiveTab('Synthesis')} className="w-full py-9 bg-emerald-600 text-white rounded-[3.5rem] text-[10px] font-black uppercase tracking-[0.6em] shadow-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-5 group">
                                            <TargetIcon className="w-7 h-7 group-hover:scale-125 transition-transform" /> Synthesis Engine
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
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl mx-auto py-8 sm:py-16 space-y-12 sm:space-y-20 pb-24 sm:pb-32">
                            <div className="text-center space-y-6 sm:space-y-8">
                                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-emerald-500 rounded-[1.5rem] sm:rounded-[3rem] flex items-center justify-center text-white mx-auto shadow-2xl mb-6 sm:mb-10">
                                    <TargetIcon className="w-8 h-8 sm:w-12 sm:h-12" />
                                </div>
                                <h3 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter text-slate-900">Optimal Solution</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-10">
                                {Object.entries(analysis.optimizedParams || {}).map(([key, val], idx) => (
                                    <div key={key} className="bg-white p-5 sm:p-14 rounded-[1.5rem] sm:rounded-[4.5rem] border border-slate-100 shadow-2xl hover:border-emerald-500 transition-all text-center">
                                        <p className="text-[7px] sm:text-[11px] font-black text-slate-300 uppercase mb-1 sm:mb-4">Point {idx + 1}</p>
                                        <h4 className="text-[10px] sm:text-3xl font-black uppercase mb-2 sm:mb-10 text-slate-900 tracking-tight truncate">{key}</h4>
                                        <div className="flex flex-col sm:flex-row items-center justify-center sm:items-end sm:justify-between gap-1 sm:gap-0">
                                            <p className="text-3xl sm:text-8xl font-black tracking-tighter text-slate-900">{(val as number).toFixed(2)}</p>
                                            <p className="text-[6px] sm:text-sm font-black text-slate-400 mb-1 sm:mb-4 uppercase">{factors.find(f => f.name === key)?.unit || 'units'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center relative">
                                <button onClick={() => setShowExportMenu(!showExportMenu)} className="px-20 py-8 bg-slate-900 text-white rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.5em] flex items-center gap-6 shadow-2xl hover:bg-black transition-all"><DownloadIcon className="w-7 h-7 text-emerald-400" /> Export Professional Dossier <ChevronDownIcon className={`w-5 h-5 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} /></button>
                                <AnimatePresence>{showExportMenu && (
                                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="absolute bottom-full mb-8 w-full max-w-sm bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden z-50 p-3">
                                        <button onClick={handleGeneratePDFReport} className="w-full text-left px-10 py-7 hover:bg-slate-50 rounded-[2.5rem] flex items-center gap-6 transition-colors group">
                                            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 transition-all group-hover:bg-emerald-500 group-hover:text-white"><FileSignatureIcon className="w-7 h-7" /></div>
                                            <div><p className="text-[12px] font-black uppercase text-slate-900">Scientific PDF</p><p className="text-[10px] font-bold text-slate-400 mt-1">Full Report • Visuals • ANOVA</p></div>
                                        </button>
                                        <div className="h-px bg-slate-100 my-2 mx-6" />
                                        <button onClick={handleGenerateWordReport} className="w-full text-left px-10 py-7 hover:bg-slate-50 rounded-[2.5rem] flex items-center gap-6 transition-colors group">
                                            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 transition-all group-hover:bg-blue-500 group-hover:text-white"><ZapIcon className="w-7 h-7" /></div>
                                            <div><p className="text-[12px] font-black uppercase text-slate-900">Editable Word</p><p className="text-[10px] font-bold text-slate-400 mt-1">Structured Tables • Equations</p></div>
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
