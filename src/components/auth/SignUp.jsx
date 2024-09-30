import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importar función de Firebase para registrar usuarios
import { auth } from '../../firebase'; // Importar autenticación desde la configuración de Firebase

export default () => {
    const navigate = useNavigate();

    // Estados para los valores del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Función de validación de correo
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Función de validación de contraseña
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    // Función de manejo del envío del formulario
    const handleRegister = async () => {
        if (!name) {
            setErrorMessage('El nombre es obligatorio.');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage('Por favor ingresa un correo válido.');
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
            return;
        }

        try {
            // Registra al usuario usando Firebase Authentication
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/Menu'); // Redirigir al menú si el registro es exitoso
        } catch (error) {
            // Manejo de errores al intentar registrar
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('Este correo ya está registrado.');
            } else {
                setErrorMessage('Error al crear la cuenta. Inténtalo de nuevo.');
            }
        }
    };

    // Función que se ejecuta cuando el login de Google es exitoso
    const handleGoogleLoginSuccess = (response) => {
        console.log('Google Login Success:', response);
        // Aquí puedes manejar la respuesta de Google para autenticar o registrar al usuario
        navigate('/Menu');
    };

    // Función que se ejecuta cuando el login de Google falla
    const handleGoogleLoginFailure = (error) => {
        console.error('Google Login Failed:', error);
        setErrorMessage('Error al iniciar sesión con Google');
    };

    return (
        <GoogleOAuthProvider clientId="TU_CLIENT_ID_DE_GOOGLE">
            <main className="w-full flex">
                <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
                    <div className="relative z-10 w-full max-w-md">
                        <Link to="/LandingPage"><img src="/images/logoTinclinada.png" width={200} /></Link>
                        <div className=" mt-10 space-y-3">
                            <h3 className="text-white text-3xl font-bold">Comience a dividir sus cuentas rápidamente</h3>
                            <p className="text-gray-300">
                                Cree una cuenta y obtenga acceso a todas las funcionalidades. No se requiere tarjeta de crédito.
                            </p>
                            <div className="flex items-center -space-x-2 overflow-hidden">
                                {/* Avatares de ejemplo */}
                                <img src="https://randomuser.me/api/portraits/women/79.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                                <img src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f" className="w-10 h-10 rounded-full border-2 border-white" />
                                <img src="https://randomuser.me/api/portraits/men/86.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
                                <p className="text-sm text-gray-400 font-medium translate-x-5">
                                    Únase a más de 5.000 usuarios
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-0 my-auto h-[500px]"
                        style={{
                            background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)", filter: "blur(118px)"
                        }}
                    ></div>
                </div>
                <div className="flex-1 flex items-center justify-center h-screen">
                    <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                        <div>
                            <Link to="/LandingPage"><img src="/images/logoTinclinadaBlack.png"  width={150} className="lg:hidden" /></Link>
                            <div className="mt-5 space-y-2">
                                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Registrate</h3>
                                <p>¿Ya tienes una cuenta? <Link to="/SignIn" className="font-medium text-indigo-600 hover:text-indigo-500">Inicia sesión</Link></p>
                            </div>
                        </div>

                        {/* BOTÓN DE GOOGLE LOGIN */}
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginFailure}
                        />

                        <div className="relative">
                            <span className="block w-full h-px bg-gray-300"></span>
                            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">O continuar con</p>
                        </div>
                        
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="space-y-5"
                        >
                            <div>
                                <label className="font-medium">Nombre</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
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
                            <button
                                onClick={handleRegister} // Usa la función handleRegister
                                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            >
                                Crear una cuenta
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </GoogleOAuthProvider>
    );
};
