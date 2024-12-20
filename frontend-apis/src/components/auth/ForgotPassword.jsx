import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '../../api/api.cambioContrasela.js'; 

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); 
    const showSignUpLink = location.state?.showSignUpLink ?? true;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        if (!email) {
            setError('Por favor ingresa un correo electrónico');
            return;
        }

        try {
            // Llama a la API importada para enviar el correo
            const response = await sendEmail(email);

            if (!response.ok) {
                setError(response.message || "Hubo un problema al intentar enviar el correo.");
                setMessage('');
                return;
            }

            // Muestra mensaje de éxito
            setMessage('Se ha enviado un enlace para restablecer tu contraseña.');
            setError('');

            // Redirige al usuario a la página de inicio de sesión después de 2 segundos
            setTimeout(() => {
                navigate('/SignIn'); 
            }, 2000);
        } catch (err) {
            console.error("Error al intentar enviar el correo:", err);
            setError('Hubo un problema al intentar enviar el correo. Inténtalo de nuevo.');
            setMessage('');
        }
    };

    return (
        <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
            <h1 className="text-4xl font-medium">Restablecer contraseña</h1>
            <p className="text-slate-500">Llena el formulario para restablecer tu contraseña</p>

            <form onSubmit={handleSubmit} className="my-10">
                <div className="flex flex-col space-y-5">
                    <label htmlFor="email">
                        <p className="font-medium text-slate-700 pb-2">Correo electrónico</p>
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" 
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {message && <p className="text-green-500 text-sm">{message}</p>}

                    <button type="submit" className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                        </svg>
                        <span>Enviar Correo</span>
                    </button>

                    {showSignUpLink && (
                        <p className="text-center">¿No tienes cuenta aún?  
                            <Link to="/SignUp" className="text-indigo-600 font-medium inline-flex space-x-1 items-center">
                                <span> Regístrate aqui</span>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 2 0 00-2 2v10a2 2 2 0 002 2h10a2 2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </span>
                            </Link>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
