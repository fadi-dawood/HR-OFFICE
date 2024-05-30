import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [authenticated, setAuthenticated] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            setAuthenticated(true);
        } else {
            localStorage.removeItem("token");
            setAuthenticated(false);
        }
    }, [token]);

    const value = {
        token, setToken, authenticated, setAuthenticated
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
