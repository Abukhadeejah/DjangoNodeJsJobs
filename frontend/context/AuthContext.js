import { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState();
    const [user, setUser] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                loading,
                user,
                error,
                isAuthenticated
            }}
        
        >
            {children}
        
        </AuthContext.Provider>
    )

}

export default AuthContext;