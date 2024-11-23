import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CustomModal from '../profileComponent/CustomModal'; // Asegúrate de importar el modal personalizado

const ProfileDropDown = (props) => {
    const [state, setState] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const profileRef = useRef();
    const navigate = useNavigate();

    const navigation = [
        { title: "Perfil", path: "/profile" },
        { title: "Cerrar sesión", action: () => setShowLogoutModal(true) }, // Mostrar el modal
    ];

    useEffect(() => {
        const handleDropDown = (e) => {
            if (!profileRef.current.contains(e.target)) setState(false);
        };
        document.addEventListener('click', handleDropDown);

        return () => {
            document.removeEventListener('click', handleDropDown);
        };
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('access-token'); // Elimina el token
        setShowLogoutModal(false); // Cierra el modal
        navigate('/LandingPage'); // Redirige al LandingPage
    };

    return (
        <div className={`relative ${props.class}`}>
            <div className="flex items-center space-x-4">
                <button
                    ref={profileRef}
                    className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
                    onClick={() => setState(!state)}
                >
                    <img
                        src="https://randomuser.me/api/portraits/men/46.jpg"
                        className="w-full h-full rounded-full"
                        alt="User profile"
                    />
                </button>
                <div className="lg:hidden">
                    <span className="block">John Lorin</span>
                    <span className="block text-sm text-gray-500">john@example.com</span>
                </div>
            </div>

            <ul className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
                {navigation.map((item, idx) => (
                    <li key={idx}>
                        {item.path ? (
                            <Link
                                className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
                                to={item.path}
                                onClick={item.action}
                            >
                                {item.title}
                            </Link>
                        ) : (
                            <button
                                className="block w-full text-left text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
                                onClick={item.action}
                            >
                                {item.title}
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            {/* Modal de logout */}
            <CustomModal
                showModal={showLogoutModal}
                setShowModal={setShowLogoutModal}
                title="¿Desea cerrar sesión?" // Título del modal
                primaryButtonText="Cerrar sesión" // Texto del botón rojo
                onPrimaryAction={handleLogout} // Acción de cerrar sesión
            />
        </div>
    );
};


export default () => {
    const [menuState, setMenuState] = useState(false);
    return (
        <div>
            <nav className="bg-white border-b">
                <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
                    <div className="flex-none lg:flex-initial">
                        <Link to="/Menu">
                            <img
                                src="/images/logoTinclinadaBlack.png" 
                                width={120}
                                height={50}
                                alt="Float UI logo"
                            />
                        </Link>
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                        <div className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${menuState ? '' : 'hidden'}`}>
                            <ProfileDropDown class="mt-5 pt-5 border-t lg:hidden" />
                        </div>
                        <div className="flex-1 flex items-center justify-end space-x-1 sm:space-x-4">

                            <ProfileDropDown class="hidden lg:block" />
                            <button className="outline-none text-gray-400 block lg:hidden" onClick={() => setMenuState(!menuState)}>
                                {menuState ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
