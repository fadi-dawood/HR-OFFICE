import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserDataContext } from '../../context/UserDataContextProvider';

export default function ProtectedAuthAdminRoute() {
    const { admin } = useContext(UserDataContext);
    return (
        <>
            {admin ? <Outlet /> : <Navigate to="/" />}
        </>
    );
}
