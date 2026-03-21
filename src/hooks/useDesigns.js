import { useState, useEffect, useCallback } from 'react';
import {
    collection, doc, setDoc, deleteDoc, onSnapshot,
    query, where, orderBy, serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

const LS_KEY = 'hyperplott_designs';

const loadFromLS = () => {
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

const saveToLS = (designs) => {
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(designs));
    } catch { /* quota exceeded — ignore */ }
};

export const useDesigns = () => {
    const { user } = useAuth();
    const [designs, setDesigns] = useState(loadFromLS);
    const [loading, setLoading] = useState(false);
    const [syncStatus, setSyncStatus] = useState('local'); // 'local' | 'syncing' | 'synced' | 'error'

    // Subscribe to Firestore when user is logged in (non-demo)
    useEffect(() => {
        if (!user || user.isDemo || !db) {
            setDesigns(loadFromLS());
            setSyncStatus('local');
            return;
        }

        setLoading(true);
        const q = query(
            collection(db, 'designs'),
            where('uid', '==', user.uid),
            orderBy('updatedAt', 'desc')
        );

        const unsub = onSnapshot(q,
            (snap) => {
                const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                setDesigns(data);
                saveToLS(data);
                setSyncStatus('synced');
                setLoading(false);
            },
            (err) => {
                console.error('Firestore sync error:', err);
                setSyncStatus('error');
                setLoading(false);
            }
        );
        return unsub;
    }, [user]);

    const saveDesign = useCallback(async (design) => {
        const now = new Date().toISOString();
        const enriched = {
            ...design,
            uid: user?.uid || 'demo',
            updatedAt: now,
            createdAt: design.createdAt || now,
        };

        // Optimistic local update
        setDesigns(prev => {
            const existing = prev.findIndex(d => d.id === enriched.id);
            const next = existing >= 0
                ? prev.map(d => d.id === enriched.id ? enriched : d)
                : [enriched, ...prev];
            saveToLS(next);
            return next;
        });

        // Sync to Firestore if available
        if (db && user && !user.isDemo) {
            setSyncStatus('syncing');
            try {
                await setDoc(doc(db, 'designs', enriched.id), {
                    ...enriched,
                    updatedAt: serverTimestamp(),
                });
                setSyncStatus('synced');
            } catch (e) {
                console.error('Firestore save error:', e);
                setSyncStatus('error');
            }
        }
        return enriched;
    }, [user]);

    const deleteDesign = useCallback(async (id) => {
        setDesigns(prev => {
            const next = prev.filter(d => d.id !== id);
            saveToLS(next);
            return next;
        });

        if (db && user && !user.isDemo) {
            try {
                await deleteDoc(doc(db, 'designs', id));
            } catch (e) {
                console.error('Firestore delete error:', e);
            }
        }
    }, [user]);

    const getDesign = useCallback((id) => {
        return designs.find(d => d.id === id) || null;
    }, [designs]);

    return { designs, loading, syncStatus, saveDesign, deleteDesign, getDesign };
};

export default useDesigns;
