
import React, { useState, useCallback, useRef, useLayoutEffect, useEffect } from 'react';
import mermaid from 'mermaid';
import { GoogleGenAI, Type } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import type { LoadingState, ViewType } from '../types';
import CopyButton from './CopyButton';
// Fix: Import missing icons from constants.tsx
import { ArrowLeftIcon, ExpandIcon, ShrinkIcon } from '../constants'; 


interface FlowDiagramsViewProps {
  setActiveView: (view: ViewType) => void;
}

const FlowDiagramsView: React.FC<FlowDiagramsViewProps> = ({ setActiveView }) => {
  const [concept, setConcept] = useState('');
  const [diagramSyntax, setDiagramSyntax] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const diagramContainerRef = useRef<HTMLDivElement>(null);

    const resetState = useCallback(() => {
        setConcept('');
        setDiagramSyntax('');
        setLoadingState('idle');
        setError('');
        setIsFullScreen(false);
    }, []);

    useEffect(() => {
        if (isFullScreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        // Re-render mermaid diagram when toggling fullscreen to fit new container size
        if (diagramContainerRef.current && diagramSyntax) {
            // A brief delay helps ensure the container has resized before mermaid runs
            setTimeout(() => {
                try {
                    mermaid.run({ nodes: [diagramContainerRef.current!] });
                } catch (e) {
                    console.error("Mermaid resize error:", e);
                }
            }, 50); 
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isFullScreen, diagramSyntax]);


  const generateDiagram = useCallback(async () => {
    if (!concept) return;
    setLoadingState('loading');
    setDiagramSyntax('');
    setError('');

    const prompt = `Generate a Mermaid.js flowchart syntax to visualize the following pharmacy-related concept. Your response must be a single, clean JSON object with one key: "graphCode". The value of "graphCode" must be ONLY the raw Mermaid syntax. Follow these rules for the syntax:
1. The diagram MUST be vertically oriented (graph TD).
2. ALL node text, regardless of content, MUST be enclosed in double quotes inside brackets. Example: A["Start"] --> B["Process"].
3. Do not include any markdown, explanations, or extra text outside the JSON object.

Concept: "${concept}"`;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

      const schema = {
          type: Type.OBJECT,
          properties: {
              graphCode: { type: Type.STRING, description: "The raw Mermaid.js syntax for the flowchart." }
          },
          required: ["graphCode"]
      };
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { 
            responseMimeType: "application/json",
            responseSchema: schema
        },
      });
      
      const result = JSON.parse(response.text.trim());
      const syntax = result.graphCode;

      if (syntax && syntax.trim().startsWith('graph')) {
        setDiagramSyntax(syntax);
        setLoadingState('success');
      } else {
        console.error("Invalid syntax received:", syntax);
        setError("The AI returned an invalid response that could not be parsed as a diagram. Please try again or rephrase your concept.");
        setDiagramSyntax('');
        setLoadingState('error');
      }
    } catch (err) {
      console.error("Error generating diagram:", err);
      setError('Failed to generate diagram. Please check your connection and try again.');
      setLoadingState('error');
    }
  }, [concept]);

  useLayoutEffect(() => {
    if (loadingState === 'success' && diagramSyntax && diagramContainerRef.current) {
      const container = diagramContainerRef.current;
      container.removeAttribute('data-processed');
      container.innerHTML = diagramSyntax;
      
      setError('');
      
      try {
        mermaid.run({
          nodes: [container],
        });
        
        const svg = container.querySelector('svg');
        if (svg) {
            svg.removeAttribute('width');
            svg.removeAttribute('height');
            svg.classList.add('w-full', 'h-auto', 'max-h-full');
        } else {
             throw new Error("Mermaid could not generate an SVG from the provided syntax.");
        }

      } catch (e) {
        console.error("Mermaid run error:", e);
        setError("Could not render diagram due to invalid syntax. Please try rephrasing your concept.");
        setLoadingState('error');
        container.innerHTML = `<p class="text-red-500 p-4">Error rendering diagram.</p>`;
      }
    }
  }, [diagramSyntax, loadingState]);

  const hasResults = diagramSyntax && loadingState === 'success';

  return (
    <div className="h-full flex flex-col gap-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative z-0">
      <AnimatePresence>
        {!isFullScreen && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        {/* Fix: Changed 'Workspace' to valid ViewType 'Design of Experiment' */}
                        <button onClick={() => setActiveView('Design of Experiment')} className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors" aria-label="Go back to workspace">
                            <ArrowLeftIcon className="w-6 h-6"/>
                        </button>
                        <h2 className="text-3xl font-bold text-slate-900">Flowchart Visualizer</h2>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input 
                        type="text"
                        value={concept}
                        onChange={(e) => setConcept(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') generateDiagram() }}
                        placeholder="e.g., Mechanism of action of aspirin"
                        className="flex-1 bg-slate-100 p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <button onClick={generateDiagram} disabled={loadingState === 'loading' || !concept} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold transition-transform duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100 text-slate-800">
                        {loadingState === 'loading' ? 'Generating...' : 'Visualize'}
                        </button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <div className={isFullScreen ? "fixed inset-0 z-50 bg-white/80 backdrop-blur-md p-4 md:p-8 flex flex-col" : "flex-1 flex flex-col min-h-0"}>
          <motion.div layout className="bg-white rounded-lg border border-slate-100 flex flex-col h-full shadow-md">
            <div className="w-full flex justify-between items-center p-3 text-left border-b border-slate-100 flex-shrink-0">
                <h3 className="font-semibold text-xl text-slate-800">Diagram</h3>
                <div className="flex items-center gap-2">
                    {hasResults && <CopyButton textToCopy={diagramSyntax} />}
                    {hasResults && (
                        <button onClick={() => setIsFullScreen(!isFullScreen)} className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors" title={isFullScreen ? "Exit full screen" : "View in full screen"}>
                            {isFullScreen ? <ShrinkIcon className="w-5 h-5"/> : <ExpandIcon className="w-5 h-5"/>}
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 p-2 overflow-auto flex items-center justify-center min-h-[200px] bg-white rounded-b-lg">
                {loadingState === 'idle' && <p className="text-slate-500 text-center">Enter a concept above to generate a diagram.</p>}
                {loadingState === 'loading' && <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-primary"></div>}
                {loadingState === 'error' && <p className="text-red-500 text-center">{error}</p>}
                
                <div ref={diagramContainerRef} className={`w-full h-full flex items-center justify-center ${hasResults ? '' : 'hidden'}`}></div>
            </div>
          </motion.div>
      </div>
    </div>
  );
};

export default FlowDiagramsView;
