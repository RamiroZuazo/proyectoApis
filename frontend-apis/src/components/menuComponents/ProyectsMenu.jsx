import React, { useState } from "react";
import ProyectModal from './ProyectModal';
import { Link } from 'react-router-dom';

export default () => {
    const [proyects, setproyects] = useState([
        { id: 1, name: 'Casa con Gonza', description: 'Casa gonza' },
        { id: 2, name: 'Casa Lanus', description: 'Casa Lanus' },
    ]);

    const handleCreateProject = (newProject) => {
        setproyects([...proyects, newProject]);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 mt-8">
            <div className="items-start justify-between sm:flex">
                <div>
                    <h4 className="text-gray-800 text-xl font-semibold">Proyectos</h4>
                    <p className="mt-2 text-gray-600 text-base sm:text-sm">Crea Proyectos para dividir tus cuentas.</p>
                </div>
                <ProyectModal onCreate={handleCreateProject} />
            </div>
            <ul className="mt-12 divide-y">
                {proyects.map((item) => (
                    <li key={item.id} className="py-5">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <span className="block text-xl text-gray-700 font-semibold">{item.name}</span>
                                <span className="block text-sm text-gray-500">{item.description}</span>
                            </div>
                            <button className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100">
                                <Link to="Proyect">Manage</Link>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
