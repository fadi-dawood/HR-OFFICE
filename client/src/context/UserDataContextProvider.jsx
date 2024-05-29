import React, { createContext, useState, useEffect } from "react";


export const UserDataContext = createContext("");


export default function UserDataContextProvider({ children }) {
    const [loggedUserName, setLoggedUserName] = useState(
        localStorage.getItem("loggedUserName") || ""
    );
    const [loggedUserLastname, setLoggedUserLastname] = useState(
        localStorage.getItem("loggedUserLastname") || ""
    );
    const [admin, setAdmin] = useState(localStorage.getItem("admin") || false);


    useEffect(() => {
        localStorage.setItem("loggedUserName", loggedUserName);
        localStorage.setItem("loggedUserLastname", loggedUserLastname);
        localStorage.setItem("admin", admin);
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