import React, { createContext, useState, useEffect } from "react";


export const UserDataContext = createContext("/");


export default function UserDataContextProvider({ children }) {
    const [loggedUserName, setLoggedUserName] = useState(
        localStorage.getItem("loggedUserName") || ""
    );
    const [loggedUserLastname, setLoggedUserLastname] = useState(
        localStorage.getItem("loggedUserLastname") || ""
    );


    useEffect(() => {
        localStorage.setItem("loggedUserName", loggedUserName);
        localStorage.setItem("loggedUserLastname", loggedUserLastname);
    }, [loggedUserName, loggedUserLastname]);

    const value = {
        loggedUserName, setLoggedUserName,
        loggedUserLastname, setLoggedUserLastname
    }

    return (
        <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
    )
}