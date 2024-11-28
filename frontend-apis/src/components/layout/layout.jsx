// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; 
import NavBar from '../navBar/NavBar';

const Layout = () => {
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet /> 
            </main>
        </div>
    );
};

export default Layout;
