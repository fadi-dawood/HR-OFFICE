import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
import MyNavbar from '../MyNavbar/MyNavbar';
import MyFooter from '../MyFooter/MyFooter';

export default function ProtectedAuthRoute() {
    const { authenticated } = useContext(AuthContext);
    return (
        <>
            <MyNavbar />
            {authenticated ? <Outlet /> : <Navigate to="/" />}
            <MyFooter />
        </>
    );
}
