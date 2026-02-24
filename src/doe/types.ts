export type ViewType = 'Design of Experiment' | 'Settings' | 'dashboard';
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// --- Advanced DoE Types ---
export type DoEDesignType = 'Central Composite Design (CCD)' | 'Box-Behnken Design (BBD)' | 'Full Factorial' | 'Partial Factorial';

export interface DoEFactor {
    id: string;
    name: string;
    unit: string;
    low: number;
    high: number;
    type: 'Numerical' | 'Categorical';
}

export interface DoEResponse {
    id: string;
    name: string;
    unit: string;
    goal: 'Maximize' | 'Minimize' | 'Target' | 'None';
    target?: number;
}

export interface DoERun {
    factors: Record<string, number | string>;
    responses: Record<string, number | null>;
}

export interface DoEAnovaRow {
    source: string;
    sumOfSquares: number;
    df: number;
    meanSquare: number;
    fValue: number;
    pValue: number;
}

export interface ResponseAnalysis {
    responseName: string;
    fittingModelUsed?: string;
    equation: string;
    stats: {
        rSquared: number;
        adjRSquared: number;
        pValue: number;
        fValue: number;
        adeqPrecision?: number;
    };
    anovaTable: DoEAnovaRow[];
    interpretation: string;
    plotData: {
        x: { name: string; values: number[] };
        y: { name: string; values: number[] };
        z: { name: string; unit?: string; values: number[][] };
    };
    perturbationData: {
        factors: { name: string; codedX: number[]; predictedY: number[] }[];
    };
}

export interface DoEAnalysisResult {
    designName: string;
    overallInterpretation: string;
    optimizedParams: Record<string, number>;
    analyses: Record<string, ResponseAnalysis>;
    predVsActualData: {
        actual: number[];
        predicted: number[];
    };
}
