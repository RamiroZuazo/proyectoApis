import { Link } from 'react-router-dom';
export default () => {

    // Replace https://www.youtube.com/ path with your path
    const navigation = [
        { title: "Funcionamiento", path: "#features" },
        { title: "¿Quienes somos?", path: "#team" },
    ]
    
    return (
        <div className="bg-gray-900">
            <header>
                <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 sm:flex sm:space-x-6">
                    <a href="https://www.youtube.com/shorts/Clc8tOPHMZA">
                        <img
                            src="/images/logoTinclinada.png" 
                            width={150} 
                            height={60}
                            alt="Float UI logo"
                        />
                    </a>
                    <ul className="py-4 flex-1 items-center flex space-x-3 sm:space-x-6 sm:justify-end">
                        {
                            navigation.map((item, idx) => (
                                <li className="text-gray-200" key={idx}>
                                    <a href={item.path}>{item.title}</a>
                                </li>
                            ))
                        }
                        <li>
                        <Link to="/SignIn" className="flex items-center text-gray-200">
                                Iniciar sesión
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
                <div className="space-y-4 flex-1 sm:text-center lg:text-left">
                    <h1 className="text-white font-bold text-4xl xl:text-5xl">
                    Divide tus cuentas grupales
                        <span className="text-indigo-400"> facil y rapido!</span>
                    </h1>
                    <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
                    Ticketify es la solución perfecta para dividir gastos de manera rápida y sencilla. Nuestra aplicación te permite gestionar proyectos de gastos compartidos, subir tickets de compra, y calcular automáticamente lo que cada miembro del grupo debe aportar.
                    </p>
                    <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
                        <Link to="/SignUp" className="px-7 py-3 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto">
                            Registrate
                        </Link>
                        <Link to="/SignIn" className="px-7 py-3 w-full bg-gray-700 text-gray-200 text-center rounded-md block sm:w-auto">
                            Inicia sesión
                        </Link>
                    </div>
                </div>
                <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
                    <img src="https://i.postimg.cc/HxHyt53c/undraw-heatmap-uyye.png" className="w-full mx-auto sm:w-10/12  lg:w-full" />
                </div>
            </section>
        </div>
    )
}