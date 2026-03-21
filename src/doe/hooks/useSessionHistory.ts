import { useState, useCallback } from 'react';
import type { DoEFactor, DoEResponse, DoERun, DoEAnalysisResult, DoEDesignType } from '../types';

export interface DoESession {
    id: string;
    title: string;
    savedAt: string; // ISO string
    objective: string;
    designType: DoEDesignType;
    factors: DoEFactor[];
    responses: DoEResponse[];
    runMatrix: DoERun[];
    analysis: DoEAnalysisResult | null;
    activeTab: string;
}

const STORAGE_KEY = 'hyperplott_doe_sessions';
const MAX_SESSIONS = 25;

const persist = (sessions: DoESession[]): DoESession[] => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
        return sessions;
    } catch {
        // Storage full — trim to half and retry
        const trimmed = sessions.slice(0, Math.max(5, Math.floor(sessions.length / 2)));
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed)); } catch { /* ignore */ }
        return trimmed;
    }
};

const loadFromStorage = (): DoESession[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

export const useSessionHistory = () => {
    const [sessions, setSessions] = useState<DoESession[]>(loadFromStorage);

    const saveSession = useCallback((data: Omit<DoESession, 'id' | 'savedAt'>): string => {
        const id = `doe_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        const newSession: DoESession = { ...data, id, savedAt: new Date().toISOString() };
        setSessions(prev => {
            // Replace if same title already saved today, otherwise prepend
            const today = new Date().toDateString();
            const existing = prev.find(
                s => s.title === data.title && new Date(s.savedAt).toDateString() === today
            );
            let updated: DoESession[];
            if (existing) {
                updated = prev.map(s => s.id === existing.id ? { ...newSession, id: existing.id } : s);
            } else {
                updated = [newSession, ...prev].slice(0, MAX_SESSIONS);
            }
            return persist(updated);
        });
        return id;
    }, []);

    const updateSession = useCallback((id: string, data: Partial<Omit<DoESession, 'id'>>) => {
        setSessions(prev => {
            const updated = prev.map(s =>
                s.id === id ? { ...s, ...data, savedAt: new Date().toISOString() } : s
            );
            return persist(updated);
        });
    }, []);

    const deleteSession = useCallback((id: string) => {
        setSessions(prev => persist(prev.filter(s => s.id !== id)));
    }, []);

    const clearAll = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setSessions([]);
    }, []);

    return { sessions, saveSession, updateSession, deleteSession, clearAll };
};
