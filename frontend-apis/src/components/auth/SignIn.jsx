import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import login from '../../api/login.api';

export default () => {
    const navigate = useNavigate(); // Para la navegación

    // Estados para los valores del formulario y errores
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            // Llamar al backend para iniciar sesión
            const response = await login(email, password);
    
            if (response.ok) {
                // Limpiar el almacenamiento previo por si quedó algo del usuario anterior
                sessionStorage.clear();
    
                // Guardar el token y datos del usuario en sessionStorage
                sessionStorage.setItem('access-token', response.token);
                sessionStorage.setItem('user-id', response.user.id);
    
                // Redirigir al usuario después del login
                navigate('/Menu');
            } else {
                // Manejar errores específicos basados en el status devuelto por el backend
                if (response.status === 404) {
                    setErrorMessage("No existe una cuenta asociada a este correo. Regístrese.");
                } else if (response.status === 401) {
                    setErrorMessage("La contraseña ingresada es incorrecta. Inténtalo nuevamente.");
                } else {
                    setErrorMessage(response.message || "Ocurrió un error al iniciar sesión.");
                }
            }
        } catch (error) {
            // Manejar errores del servidor
            setErrorMessage("Error interno del servidor. Por favor, inténtalo más tarde.");
        }
    };
    
    

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600 space-y-5">
                <div className="text-center pb-8">
                    <Link to="/LandingPage">
                        <img src="/images/logoTinclinadaBlack.png" width={150} className="mx-auto" alt="Logo" />
                    </Link>
                    <div className="mt-5">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Inicia sesión en tu cuenta</h3>
                    </div>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin(); // Manejo del login
                    }}
                    className="space-y-5"
                >
                    <div>
                        <label className="font-medium">Correo</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Contraseña</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 text-sm">
                            {errorMessage}
                        </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-x-3">
                            <input type="checkbox" id="remember-me-checkbox" className="checkbox-item peer hidden" />
                            <label
                                htmlFor="remember-me-checkbox"
                                className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                            ></label>
                            <span>Recordar</span>
                        </div>
                        <Link to="/forgot-password" className="text-center text-indigo-600 hover:text-indigo-500">
                            ¿Has olvidado tu contraseña?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Iniciar sesión
                    </button>
                </form>
                
                <p className="text-center">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/signUp" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Registrate
                    </Link>
                </p>
            </div>
        </main>
    );
};
