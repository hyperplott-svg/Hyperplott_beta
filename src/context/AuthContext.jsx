import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const loginDemo = () => {
        setUser({
            uid: 'demo-user-id',
            displayName: 'Guest Researcher',
            email: 'demo@hyperplott.ai',
            isDemo: true
        });
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        loading,
        loginDemo,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
