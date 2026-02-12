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
                data = analysis.perturbationData.factors.map((f, i) => ({
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
            const numFactors = factors.length;
            const methodology = designType;
            
            const coded = await callWithRetry(async () => {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const response = await ai.models.generateContent({
                    model: "gemini-3-flash-preview",
                    contents: `Generate an accurate, industrially standard ${methodology} matrix for ${numFactors} factors: ${factors.map(f => f.name).join(', ')}. 
                    Factor High: +1, Low: -1, Axial: alpha (sqrt(k) for CCD).
                    Ensure standard run efficiency. Add 3-5 center points (0,0,...) for error estimation.`,
                    config: { 
                        systemInstruction: "You are a specialized statistical DOE engine (SAS JMP/Stat-Ease style). Generate accurate coded matrices. Output JSON ONLY.",
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
                return safeJSONParse(response.text);
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
    };

    const performAnalysis = async () => {
        if (runMatrix.some(r => Object.values(r.responses).some(v => v === null))) return setError("Complete all data points in the Execution matrix.");
        setLoadingState('loading');
        setError(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: `Perform high-precision statistical regression for "${experimentName}".
                Data: ${JSON.stringify(runMatrix)}
                Target Responses: ${responses.map(r => r.name).join(', ')}

                Perform Stepwise Regression. Fit a Quadratic Model if curvature exists, otherwise Linear.
                Provide explicit "fittingModelUsed" (e.g. "Response Surface Quadratic Model").`,
                config: { 
                    systemInstruction: "Senior Industrial Statistician. Provide precise ANOVA, R-Squared, and plot data. Output JSON ONLY.",
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
            
            const result = safeJSONParse(response.text);
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
                data = resAnalysis.perturbationData.factors.map(f => ({ x: f.codedX, y: f.predictedY, mode: 'lines+markers', name: f.name, line: { width: 3 } }));
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
            const headers = ["Run", ...factors.map(f => f.name), ...responses.map(r => r.name)];
            const colWidth = 170 / headers.length;
            headers.forEach((h, i) => doc.text(h, 20 + i * colWidth, y, { maxWidth: colWidth - 2 })); y += 6;
            
            runMatrix.forEach((run, i) => {
                doc.text(`${i+1}`, 20, y);
                factors.forEach((f, fi) => doc.text(`${run.factors[f.name]}`, 20 + (fi+1) * colWidth, y));
                responses.forEach((r, ri) => doc.text(`${run.responses[r.name] || '-'}`, 20 + (factors.length+ri+1) * colWidth, y));
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
                    if (images[pair[0]]) doc.addImage(images[pair[0]], 'PNG', 20, y, 80, 60);
                    if (images[pair[1]]) doc.addImage(images[pair[1]], 'PNG', 110, y, 80, 60);
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
            
            const headerChildren = [
                new docx.Paragraph({ children: [new docx.TextRun({ text: experimentName, bold: true, size: 48, color: "10B981" })], alignment: docx.AlignmentType.CENTER }),
                new docx.Paragraph({ text: `Objective: ${objective}`, spacing: { before: 400, after: 400 } }),
                new docx.Paragraph({ text: "Execution Matrix", heading: docx.HeadingLevel.HEADING_1 }),
            ];

            const executionRows = [
                new docx.TableRow({ children: ["Run", ...factors.map(f => f.name), ...responses.map(r => r.name)].map(h => new docx.TableCell({ children: [new docx.Paragraph({ text: h, bold: true })] })) }),
                ...runMatrix.map((run, i) => new docx.TableRow({ children: [`${i+1}`, ...factors.map(f => `${run.factors[f.name]}`), ...responses.map(r => `${run.responses[r.name] || 'N/A'}`)].map(v => new docx.TableCell({ children: [new docx.Paragraph({ text: v })] })) }))
            ];
            headerChildren.push(new docx.Table({ rows: executionRows, width: { size: 100, type: docx.WidthType.PERCENTAGE } }));
            sections.push({ children: headerChildren });

            for (const [resName, resData] of Object.entries(analysis.analyses || {})) {
                const responseChildren: any[] = [
                    new docx.Paragraph({ children: [new docx.TextRun({ text: `Analysis: ${resName}`, bold: true, size: 36, color: "10B981" })], pageBreakBefore: true }),
                    new docx.Paragraph({ text: `Model: ${(resData as any).fittingModelUsed}`, bold: true }),
                    new docx.Paragraph({ text: `Equation: ${(resData as any).equation}`, spacing: { after: 200 } }),
                ];
                
                const images = await generateAllPlotImages(resData as any, analysis.predVsActualData);
                for (const [type, img] of Object.entries(images)) {
                    responseChildren.push(new docx.Paragraph({ text: `${type}:`, bold: true, spacing: { before: 300 } }));
                    responseChildren.push(new docx.Paragraph({ children: [new docx.ImageRun({ data: img.split(',')[1], transformation: { width: 500, height: 375 } })], alignment: docx.AlignmentType.CENTER }));
                }

                responseChildren.push(new docx.Paragraph({ text: "ANOVA Summary", heading: docx.HeadingLevel.HEADING_2, spacing: { before: 400 } }));
                const anovaRows = [
                    new docx.TableRow({ children: ["Source", "DF", "SS", "MS", "F", "p"].map(h => new docx.TableCell({ children: [new docx.Paragraph({ text: h, bold: true })] })) }),
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
        <div className="h-full flex flex-col bg-white overflow-hidden">
            <header className="bg-white border-b border-slate-100 px-10 py-5 flex items-center justify-between z-20">
                <div className="flex items-center gap-6">
                    <Logo className="w-10 h-10 shadow-lg rounded-xl" />
                    <div>
                        <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">HyperPlott</h2>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest -mt-1">{experimentName}</p>
                    </div>
                </div>
                <nav className="flex items-center bg-slate-100 p-1.5 rounded-full gap-1 border border-slate-200">
                    {(['Dimension', 'Execution', 'Insight', 'Synthesis'] as DoETab[]).map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${activeTab === tab ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}>{tab}</button>
                    ))}
                </nav>
                <div className="w-10" />
            </header>

            <main className="flex-1 overflow-y-auto p-12 bg-[#FBFCFE] custom-scrollbar">
                <AnimatePresence mode="wait">
                    {activeTab === 'Dimension' && (
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="max-w-6xl mx-auto space-y-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <section className="space-y-8">
                                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
                                        <div className="mb-8">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Experiment Title</label>
                                            <input 
                                                value={experimentName} 
                                                onChange={e => setExperimentName(e.target.value)} 
                                                className="w-full bg-slate-50 px-8 py-5 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800 text-xl font-black" 
                                            />
                                        </div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 block">Experimental Objective</label>
                                        <textarea value={objective} onChange={e => setObjective(e.target.value)} placeholder="e.g. Optimize particle size..." className="w-full bg-slate-50 p-8 rounded-[2rem] border-none h-44 resize-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800 text-lg font-medium" />
                                        <button onClick={suggestVariablesWithAI} disabled={isSuggesting || !objective} className="w-full mt-8 py-6 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase flex items-center justify-center gap-4 hover:bg-black transition-all">
                                            {isSuggesting ? <LoaderIcon className="w-5 h-5" /> : <SparklesIcon className="w-5 h-5 text-emerald-400" />} AI Dimensioning
                                        </button>
                                    </div>
                                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 block">Statistical Design Methodology</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Central Composite Design (CCD)', 'Box-Behnken Design (BBD)', 'Full Factorial', 'Partial Factorial'].map(t => (
                                                <button key={t} onClick={() => setDesignType(t as any)} className={`p-5 rounded-2xl text-[8px] font-black transition-all ${designType === t ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-500 shadow-inner' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>{t.toUpperCase()}</button>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                                <section className="space-y-8">
                                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
                                        <div className="flex justify-between items-center mb-8"><p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Input Parameters (X)</p><button onClick={() => setFactors([...factors, { id: Math.random().toString(), name: 'New Factor', unit: 'u', low: 0, high: 100, type: 'Numerical' }])} className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors"><PlusIcon className="w-5 h-5"/></button></div>
                                        <div className="space-y-4">
                                            {factors.map((f, i) => (
                                                <div key={f.id} className="bg-slate-50 p-4 rounded-3xl flex items-center gap-4 group">
                                                    <div className="flex-1">
                                                        <input value={f.name} onChange={e => { const nf = [...factors]; nf[i].name = e.target.value; setFactors(nf); }} className="bg-transparent border-none p-0 text-sm font-black w-full outline-none" />
                                                        <input value={f.unit} onChange={e => { const nf = [...factors]; nf[i].unit = e.target.value; setFactors(nf); }} className="bg-transparent border-none p-0 text-[10px] font-bold text-slate-400 outline-none" />
                                                    </div>
                                                    <div className="flex gap-2 items-center">
                                                        <input type="number" value={f.low} onChange={e => { const nf = [...factors]; nf[i].low = +e.target.value; setFactors(nf); }} className="bg-white w-14 text-[10px] p-2 rounded-xl border border-slate-200 text-center font-black outline-none shadow-sm" />
                                                        <input type="number" value={f.high} onChange={e => { const nf = [...factors]; nf[i].high = +e.target.value; setFactors(nf); }} className="bg-white w-14 text-[10px] p-2 rounded-xl border border-slate-200 text-center font-black outline-none shadow-sm" />
                                                        <button onClick={() => setFactors(factors.filter(it => it.id !== f.id))} className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"><TrashIcon className="w-4 h-4"/></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl">
                                        <div className="flex justify-between items-center mb-8"><p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Response Metrics (Y)</p><button onClick={() => setResponses([...responses, { id: Math.random().toString(), name: 'New Response', unit: '%', goal: 'Maximize' }])} className="p-2.5 bg-white/10 text-emerald-400 rounded-xl hover:bg-white/20 transition-colors"><PlusIcon className="w-5 h-5"/></button></div>
                                        <div className="space-y-4">
                                            {responses.map((r, i) => (
                                                <div key={r.id} className="bg-white/5 p-4 rounded-3xl flex items-center gap-4 group">
                                                    <div className="flex-1">
                                                        <input value={r.name} onChange={e => { const nr = [...responses]; nr[i].name = e.target.value; setResponses(nr); }} className="bg-transparent border-none p-0 text-sm font-black w-full text-white outline-none" />
                                                        <input value={r.unit} onChange={e => { const nr = [...responses]; nr[i].unit = e.target.value; setResponses(nr); }} className="bg-transparent border-none p-0 text-[10px] font-bold text-emerald-500/50 outline-none" />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <select value={r.goal} onChange={e => { const nr = [...responses]; nr[i].goal = e.target.value as any; setResponses(nr); }} className="bg-black/40 text-[10px] font-black text-emerald-400 border border-white/10 rounded-xl px-4 py-2 outline-none">
                                                            <option value="Maximize">Maximize</option>
                                                            <option value="Minimize">Minimize</option>
                                                            <option value="Target">Target</option>
                                                        </select>
                                                        <button onClick={() => setResponses(responses.filter(it => it.id !== r.id))} className="p-2 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100"><TrashIcon className="w-4 h-4"/></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="flex justify-center pb-12"><button onClick={generateDesign} className="px-24 py-6 bg-emerald-600 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.6em] shadow-2xl hover:bg-emerald-700 transition-all">Initialize Design Matrix</button></div>
                        </motion.div>
                    )}

                    {activeTab === 'Execution' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-10">
                            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-black uppercase text-slate-900">Experimental Grid</h3>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Replicate/Center Points Highlighted</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => setRunMatrix(runMatrix.map(run => ({ ...run, responses: Object.fromEntries(responses.map(r => [r.name, Number((Math.random()*100).toFixed(2))])) })))} className="px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100">Simulate Data</button>
                                    <button onClick={performAnalysis} className="px-12 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-emerald-700 transition-all">Analyze System</button>
                                </div>
                            </div>
                            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden mb-12">
                                <div className="overflow-x-auto select-text">
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead className="bg-slate-50 border-b border-slate-100">
                                            <tr><th className="px-10 py-6 font-black text-slate-400 uppercase">Run</th>{factors.map(f => <th key={f.id} className="px-10 py-6 font-black text-slate-900 uppercase whitespace-nowrap">{f.name}</th>)}{responses.map(r => <th key={r.id} className="px-10 py-6 font-black text-emerald-600 uppercase border-l border-slate-200/50 whitespace-nowrap">{r.name}</th>)}</tr>
                                        </thead>
                                        <tbody>
                                            {runMatrix.map((run, i) => (
                                                <tr key={i} className={`border-b border-slate-50 transition-colors ${duplicateRunsIndices.includes(i) ? 'bg-emerald-50/40' : 'hover:bg-slate-50/30'}`}>
                                                    <td className="px-10 py-5 font-black text-slate-300 uppercase">RUN_{i+1}</td>
                                                    {factors.map(f => <td key={f.id} className="px-10 py-5 font-mono font-bold text-slate-600">{run.factors[f.name] ?? '-'}</td>)}
                                                    {responses.map(r => (
                                                        <td key={r.id} className="px-10 py-4 border-l border-slate-200/50">
                                                            <input type="number" value={run.responses[r.name] ?? ''} onChange={e => { const nm = [...runMatrix]; nm[i].responses[r.name] = e.target.value === '' ? null : +e.target.value; setRunMatrix(nm); }} className="w-32 bg-white border-2 border-slate-100 rounded-2xl p-3 text-center font-black text-slate-900 focus:border-emerald-500 outline-none shadow-sm" placeholder="RESULT" />
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
                                        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden relative">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Active Metric Analysis</label>
                                                    <select 
                                                        value={selectedAnalysisKey} 
                                                        onChange={(e) => setSelectedAnalysisKey(e.target.value)}
                                                        className="bg-slate-900 text-white rounded-2xl px-6 py-3.5 text-[11px] font-black uppercase shadow-xl hover:bg-black"
                                                    >
                                                        {Object.keys(analysis?.analyses || {}).map(k => (
                                                            <option key={k} value={k}>{k}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="flex gap-1.5 bg-slate-50 p-2 rounded-[1.5rem] border border-slate-100 shadow-inner">
                                                    {(['3D Surface', '2D Contour', 'Perturbation', 'Model Diagnostic'] as PlotType[]).map(pt => (
                                                        <button key={pt} onClick={() => setActivePlot(pt)} className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase transition-all duration-300 ${activePlot === pt ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>{pt}</button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="h-[520px] bg-white rounded-[2.5rem] border border-slate-50 overflow-hidden relative shadow-inner">
                                                <PlotViewer analysis={currentAnalysis} activePlot={activePlot} predVsActualData={analysis?.predVsActualData} experimentName={experimentName} />
                                            </div>
                                        </div>

                                        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                                                    <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.2em]">ANOVA Standard Report</h4>
                                                </div>
                                                <button onClick={copyAnovaToClipboard} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${copiedAnova ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                                                    {copiedAnova ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />} {copiedAnova ? 'Copied' : 'Copy Table'}
                                                </button>
                                            </div>
                                            <div className="overflow-x-auto select-text">
                                                <table className="w-full text-left text-[11px] border-collapse">
                                                    <thead>
                                                        <tr className="bg-slate-50 text-slate-500 font-black uppercase border-b border-slate-200">
                                                            <th className="px-8 py-5 rounded-tl-3xl">Source</th>
                                                            <th className="px-4 py-5 text-center">DF</th>
                                                            <th className="px-4 py-5 text-right">Sum of Squares</th>
                                                            <th className="px-4 py-5 text-right">Mean Square</th>
                                                            <th className="px-4 py-5 text-right">F-Value</th>
                                                            <th className="px-8 py-5 text-right rounded-tr-3xl">p-Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-100 font-medium">
                                                        {currentAnalysis.anovaTable?.map((row: any, idx: number) => (
                                                            <tr key={idx} className={`hover:bg-slate-50/80 transition-colors group ${['model', 'total'].includes(row.source.toLowerCase()) ? 'bg-slate-50/40 font-black' : ''}`}>
                                                                <td className={`px-8 py-5 font-black text-slate-900 group-hover:text-emerald-600 transition-colors`}>{row.source}</td>
                                                                <td className="px-4 py-5 text-center font-bold text-slate-600">{row.df}</td>
                                                                <td className="px-4 py-5 text-right font-mono text-slate-500">{row.sumOfSquares?.toLocaleString(undefined, {minimumFractionDigits: 3})}</td>
                                                                <td className="px-4 py-5 text-right font-mono text-slate-500">{row.meanSquare?.toLocaleString(undefined, {minimumFractionDigits: 3})}</td>
                                                                <td className="px-4 py-5 text-right font-mono text-emerald-600 font-black">{row.fValue ? row.fValue.toFixed(3) : '-'}</td>
                                                                <td className={`px-8 py-5 text-right font-black ${row.pValue < 0.05 ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                                    {row.pValue === undefined || row.pValue === null ? '-' : row.pValue < 0.0001 ? '< 0.0001' : row.pValue.toFixed(4)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mt-8 pt-8 border-t border-slate-100 flex items-start gap-4">
                                                <InfoIcon className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                                                <p className="text-sm font-bold text-slate-700 leading-relaxed italic">{currentAnalysis.interpretation}</p>
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
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { label: 'R-Squared', value: currentAnalysis.stats?.rSquared?.toFixed(4) },
                                                    { label: 'Adj R-Squared', value: currentAnalysis.stats?.adjRSquared?.toFixed(4) },
                                                    { label: 'F-Value', value: currentAnalysis.stats?.fValue?.toFixed(2) },
                                                    { label: 'P-Value', value: currentAnalysis.stats?.pValue?.toFixed(4), highlight: currentAnalysis.stats?.pValue < 0.05 },
                                                    { label: 'Adeq Precision', value: currentAnalysis.stats?.adeqPrecision?.toFixed(2) || 'N/A' }
                                                ].map((s, i) => (
                                                    <div key={i} className="bg-white/5 p-5 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center text-center">
                                                        <p className="text-[9px] font-black text-slate-500 uppercase mb-2 leading-none">{s.label}</p>
                                                        <p className={`text-xl font-black ${s.highlight ? 'text-emerald-400' : 'text-white'}`}>{s.value}</p>
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
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl mx-auto py-16 space-y-20 pb-32">
                            <div className="text-center space-y-8"><div className="w-24 h-24 bg-emerald-500 rounded-[3rem] flex items-center justify-center text-white mx-auto shadow-2xl mb-10"><TargetIcon className="w-12 h-12" /></div><h3 className="text-6xl font-black uppercase tracking-tighter text-slate-900">Optimal Solution</h3></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">{Object.entries(analysis.optimizedParams || {}).map(([key, val], idx) => (
                                <div key={key} className="bg-white p-14 rounded-[4.5rem] border border-slate-100 shadow-2xl hover:border-emerald-500 transition-all"><p className="text-[11px] font-black text-slate-300 uppercase mb-4">Set Point {idx+1}</p><h4 className="text-3xl font-black uppercase mb-10 text-slate-900 tracking-tight">{key}</h4><div className="flex items-end justify-between"><p className="text-8xl font-black tracking-tighter text-slate-900">{(val as number).toFixed(3)}</p><p className="text-sm font-black text-slate-400 mb-4 uppercase">{factors.find(f => f.name === key)?.unit || 'units'}</p></div></div>
                            ))}</div>
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
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 z-[60] bg-white/70 backdrop-blur-3xl flex flex-col items-center justify-center gap-12">
                    <div className="w-28 h-28 border-[10px] border-slate-100 border-t-emerald-500 rounded-full animate-spin shadow-3xl shadow-emerald-500/10" />
                    <div className="text-center space-y-4"><p className="text-lg font-black text-slate-900 uppercase tracking-[1em] animate-pulse">Running Precision Matrix</p><p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em]">Synthesizing Statistical Insights...</p></div>
                </motion.div>
            )}</AnimatePresence>
            
            {error && (
                <motion.div initial={{y: 60, opacity: 0}} animate={{y: 0, opacity: 1}} className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[70] bg-red-600 text-white px-10 py-6 rounded-[3rem] shadow-3xl flex flex-col items-center gap-5 border border-red-500 max-w-lg text-center">
                    <div className="flex items-center gap-6">
                        <InfoIcon className="w-6 h-6 flex-shrink-0" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">{error}</span>
                        <button onClick={() => setError(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors"><XIcon className="w-6 h-6"/></button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default DesignOfExperimentView;
