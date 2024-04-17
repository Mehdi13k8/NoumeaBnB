// src/contexts/AuthContext.js
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Simulated user state

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
