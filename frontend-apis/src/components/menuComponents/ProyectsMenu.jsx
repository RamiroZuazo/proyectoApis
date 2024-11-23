import React, { useState, useEffect } from "react";
import ProyectModal from './ProyectModal';
import { Link } from 'react-router-dom';
import { getProjectsByUserId } from '../../api/api.projects.js'; // Cambiar la importación a api.projects.js

export default () => {
    const [proyects, setProyects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const userId = 10;  // Asumiendo que el ID del usuario es 10, este puede provenir de una sesión o del token.

            try {
                const projects = await getProjectsByUserId(userId);  // Llamamos a la función de la API
                setProyects(projects);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProjects();
    }, []);  // Se ejecuta una vez al cargar el componente

    return (
        <div className="max-w-2xl mx-auto px-4 mt-8">
            <div className="items-start justify-between sm:flex">
                <div>
                    <h4 className="text-gray-800 text-xl font-semibold">Proyectos</h4>
                    <p className="mt-2 text-gray-600 text-base sm:text-sm">Crea Proyectos para dividir tus cuentas.</p>
                </div>
                <ProyectModal onCreate={(newProject) => setProyects([...proyects, newProject])} />
            </div>

            {/* Mostrar mensaje de error si ocurre */}
            {error && <div className="text-red-500 mt-4">{error}</div>}

            {/* Mostrar los proyectos */}
            <ul className="mt-12 divide-y">
                {proyects.length > 0 ? (
                    proyects.map((item) => (
                        <li key={item.id} className="py-5">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="block text-xl text-gray-700 font-semibold">{item.nombre}</span>
                                    <span className="block text-sm text-gray-500">{item.descripcion}</span>
                                </div>
                                <button className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100">
                                    <Link to="Proyect">Manage</Link>
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No se encontraron proyectos</li>
                )}
            </ul>
        </div>
    );
};
