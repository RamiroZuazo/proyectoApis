// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Utiliza Outlet para renderizar el contenido de las rutas anidadas
import NavBar from '../navBar/NavBar';

const Layout = () => {
    return (
        <div>
            <header>
                <NavBar />
                {/* Aquí podrías incluir una barra de navegación */}
            </header>
            <main>
                <Outlet /> {/* Renderiza los componentes de las rutas anidadas */}
            </main>
        </div>
    );
};

export default Layout;
