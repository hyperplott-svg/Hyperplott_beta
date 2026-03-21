import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DoESession } from '../hooks/useSessionHistory';

/* ── Icons (inline SVG so no extra dep needed) ── */
const IconHistory = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" /><path d="M12 7v5l4 2" />
    </svg>
);
const IconPlus = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
        <path d="M12 5v14M5 12h14" />
    </svg>
);
const IconTrash = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`w-4 h-4 transition-transform duration-200 ${open ? '' : 'rotate-180'}`}>
        <path d="M15 18l-6-6 6-6" />
    </svg>
);
const IconFlask = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <path d="M9 3h6M10 3v6l-4 8a1 1 0 0 0 .9 1.5h10.2A1 1 0 0 0 18 17l-4-8V3" />
    </svg>
);

/* ── Date grouping ── */
const getGroup = (isoDate: string): string => {
    const d = new Date(isoDate);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return 'This Week';
    if (diffDays < 30) return 'This Month';
    return 'Older';
};

const GROUP_ORDER = ['Today', 'Yesterday', 'This Week', 'This Month', 'Older'];

const formatTime = (isoDate: string): string => {
    const d = new Date(isoDate);
    const group = getGroup(isoDate);
    if (group === 'Today') return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (group === 'Yesterday') return 'Yesterday';
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

/* ── Props ── */
interface SessionSidebarProps {
    sessions: DoESession[];
    activeSessionId: string | null;
    onLoad: (session: DoESession) => void;
    onNew: () => void;
    onDelete: (id: string) => void;
    isOpen: boolean;
    onToggle: () => void;
}

/* ── Component ── */
const SessionSidebar: React.FC<SessionSidebarProps> = ({
    sessions, activeSessionId, onLoad, onNew, onDelete, isOpen, onToggle
}) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const confirmRef = useRef<HTMLButtonElement>(null);

    // Group sessions
    const grouped = GROUP_ORDER.reduce<Record<string, DoESession[]>>((acc, g) => {
        const items = sessions.filter(s => getGroup(s.savedAt) === g);
        if (items.length > 0) acc[g] = items;
        return acc;
    }, {});

    // Close confirm on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (confirmRef.current && !confirmRef.current.contains(e.target as Node)) {
                setConfirmDeleteId(null);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className="relative flex h-full shrink-0" style={{ width: isOpen ? 260 : 48 }}>
            {/* Toggle button */}
            <button
                onClick={onToggle}
                className="absolute top-4 right-0 translate-x-1/2 z-20 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all"
                title={isOpen ? 'Collapse history' : 'Expand history'}
            >
                <IconChevron open={isOpen} />
            </button>

            {/* Sidebar panel */}
            <div
                className="h-full bg-slate-50 border-r border-slate-100 overflow-hidden flex flex-col transition-all duration-300 ease-in-out"
                style={{ width: isOpen ? 260 : 48 }}
            >
                {/* Collapsed state: just show icon */}
                {!isOpen && (
                    <div className="flex flex-col items-center pt-16 gap-4">
                        <button onClick={onToggle} className="text-slate-400 hover:text-slate-700 transition-colors p-2 rounded-xl hover:bg-slate-100" title="Open history">
                            <IconHistory />
                        </button>
                        <div className="w-5 h-px bg-slate-200" />
                        <button onClick={onNew} className="text-slate-400 hover:text-slate-700 transition-colors p-2 rounded-xl hover:bg-slate-100" title="New experiment">
                            <IconPlus />
                        </button>
                    </div>
                )}

                {/* Expanded state */}
                {isOpen && (
                    <div className="flex flex-col h-full overflow-hidden">
                        {/* Header */}
                        <div className="px-4 pt-5 pb-3 shrink-0">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-7 h-7 rounded-lg bg-primary-purple/10 flex items-center justify-center text-primary-purple">
                                    <IconHistory />
                                </div>
                                <span className="text-xs font-black text-slate-700 uppercase tracking-widest">History</span>
                            </div>
                            <button
                                onClick={onNew}
                                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 hover:border-primary-purple/40 hover:text-primary-purple hover:bg-primary-purple/5 transition-all text-xs font-bold"
                            >
                                <IconPlus /> New Experiment
                            </button>
                        </div>

                        {/* Session list */}
                        <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-thin">
                            {sessions.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-40 text-center px-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                                        <IconFlask />
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                                        Your experiments will appear here after analysis
                                    </p>
                                </div>
                            ) : (
                                Object.entries(grouped).map(([group, items]) => (
                                    <div key={group} className="mb-4">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] px-2 py-1.5 sticky top-0 bg-slate-50">
                                            {group}
                                        </p>
                                        <div className="space-y-0.5">
                                            {items.map(session => (
                                                <div
                                                    key={session.id}
                                                    className="relative group"
                                                    onMouseEnter={() => setHoveredId(session.id)}
                                                    onMouseLeave={() => { setHoveredId(null); setConfirmDeleteId(null); }}
                                                >
                                                    <button
                                                        onClick={() => onLoad(session)}
                                                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                                                            activeSessionId === session.id
                                                                ? 'bg-primary-purple/10 text-slate-900'
                                                                : 'hover:bg-slate-100 text-slate-600'
                                                        }`}
                                                    >
                                                        <div className="flex items-start gap-2 pr-5">
                                                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${session.analysis ? 'bg-emerald-400' : 'bg-slate-300'}`} />
                                                            <div className="min-w-0">
                                                                <p className="text-[11px] font-bold leading-tight truncate">
                                                                    {session.title}
                                                                </p>
                                                                <p className="text-[9px] text-slate-400 font-medium mt-0.5">
                                                                    {formatTime(session.savedAt)}
                                                                    {session.analysis && ' · Analyzed'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </button>

                                                    {/* Delete button */}
                                                    <AnimatePresence>
                                                        {hoveredId === session.id && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{ duration: 0.1 }}
                                                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                                            >
                                                                {confirmDeleteId === session.id ? (
                                                                    <button
                                                                        ref={confirmRef}
                                                                        onClick={() => { onDelete(session.id); setConfirmDeleteId(null); }}
                                                                        className="text-[9px] font-black text-red-500 bg-red-50 border border-red-200 px-2 py-0.5 rounded-lg"
                                                                    >
                                                                        Confirm
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={e => { e.stopPropagation(); setConfirmDeleteId(session.id); }}
                                                                        className="text-slate-300 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-50"
                                                                    >
                                                                        <IconTrash />
                                                                    </button>
                                                                )}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {sessions.length > 0 && (
                            <div className="px-4 pb-4 pt-2 border-t border-slate-100 shrink-0">
                                <p className="text-[9px] text-slate-400 font-medium text-center">
                                    {sessions.length} saved · stored locally in your browser
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SessionSidebar;
