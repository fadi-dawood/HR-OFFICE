import React, { createContext, useState, useEffect } from "react";


export const UserDataContext = createContext("");


export default function UserDataContextProvider({ children }) {
    const [loggedUserName, setLoggedUserName] = useState(localStorage.getItem("loggedUserName") || "");
    const [loggedUserLastname, setLoggedUserLastname] = useState(localStorage.getItem("loggedUserLastname") || "");
    const [admin, setAdmin] = useState(localStorage.getItem("admin") || false);

    // Funzione per convertire il valore in booleano
    const toBoolean = (value) => {
        if (value == "true") return true;
        if (value == "false") return false;
        return value;
    };

    useEffect(() => {
        if (loggedUserName) {
            localStorage.setItem("loggedUserName", loggedUserName);
        };
        if (loggedUserLastname) {
            localStorage.setItem("loggedUserLastname", loggedUserLastname);
        };
        if (admin) {
            localStorage.setItem("admin", toBoolean(admin));
        };
    }, [loggedUserName, loggedUserLastname, admin]);

    const value = {
        loggedUserName, setLoggedUserName,
        loggedUserLastname, setLoggedUserLastname,
        admin, setAdmin
    }

    return (
        <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
    )
}