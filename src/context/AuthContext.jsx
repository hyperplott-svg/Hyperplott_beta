import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { auth, signInWithPopup, googleProvider, signOut } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
            } else {
                setUser(prev => (prev?.isDemo ? prev : null));
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const registerEmail = async (email, password, displayName) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName });
            return result.user;
        } catch (error) {
            console.error("Registration Error:", error);
            throw error;
        }
    };

    const loginEmail = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Google Login Error:", error);
            throw error;
        }
    };

    const loginDemo = () => {
        setUser({
            uid: 'demo-user-id',
            displayName: 'Guest Researcher',
            email: 'demo@hyperplott.ai',
            isDemo: true
        });
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const value = {
        user,
        loading,
        registerEmail,
        loginEmail,
        loginWithGoogle,
        loginDemo,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
