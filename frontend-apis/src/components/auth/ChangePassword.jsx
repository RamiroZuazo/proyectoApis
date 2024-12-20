import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {changePassword} from '../../api/api.cambioContrasela.js';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Obtenemos el token desde la URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        if (!password || !confirmPassword) {
            setError('Por favor ingresa y confirma tu nueva contraseña.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            // Llama a la API importada para cambiar la contraseña
            const response = await changePassword(token, password);

            if (!response.ok) {
                setError(response.message || 'Hubo un problema al cambiar la contraseña.');
                setMessage('');
                return;
            }

            // Muestra mensaje de éxito y redirige al inicio de sesión
            setMessage('Tu contraseña ha sido cambiada exitosamente.');
            setError('');

            setTimeout(() => {
                navigate('/SignIn');
            }, 2000);
        } catch (err) {
            console.error('Error al intentar cambiar la contraseña:', err);
            setError('Hubo un problema al intentar cambiar la contraseña. Inténtalo de nuevo.');
            setMessage('');
        }
    };

    return (
        <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
            <h1 className="text-4xl font-medium">Cambiar contraseña</h1>
            <p className="text-slate-500">Ingresa tu nueva contraseña</p>

            <form onSubmit={handleSubmit} className="my-10">
                <div className="flex flex-col space-y-5">
                    <label htmlFor="password">
                        <p className="font-medium text-slate-700 pb-2">Nueva contraseña</p>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" 
                            placeholder="Ingresa tu nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <label htmlFor="confirmPassword">
                        <p className="font-medium text-slate-700 pb-2">Confirma tu nueva contraseña</p>
                        <input 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" 
                            placeholder="Confirma tu nueva contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {message && <p className="text-green-500 text-sm">{message}</p>}

                    <button type="submit" className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                        </svg>
                        <span>Cambiar contraseña</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
