import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);

    useEffect(() => {
        localStorage.setItem("authenticated", token !== "");
        localStorage.setItem("token", token);
    }, [token]);

    const value = {
        token, setToken, authenticated
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}