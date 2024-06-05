import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || "");

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            setAuthenticated(true);
            localStorage.setItem("authenticated", authenticated);
        } else {
            localStorage.removeItem("token");
            setAuthenticated(false);
            localStorage.setItem("authenticated", authenticated);
        }
    }, [token]);

    const value = {
        token, setToken, authenticated, setAuthenticated
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
