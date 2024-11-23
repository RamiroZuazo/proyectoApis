import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/landingPage.js';
import SignUp from './pages/signUp.js';
import SignIn from './pages/signIn.js';
import Menu from './pages/menu.js';
import Layout from './components/layout/layout.jsx';
import Proyect from './pages/proyect.js';
import ForgotPassword from './pages/forgotPassword.js';
import UserProfile from './pages/profile';

// Componente para proteger rutas
const PrivateRoute = ({ children }) => {
    const token = sessionStorage.getItem("access-token"); 
    return token ? children : <Navigate to="/SignIn" replace />;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/LandingPage" element={<LandingPage />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Rutas protegidas con Layout */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }
                >
                    <Route path="Menu" element={<Menu />} />
                    <Route path="Menu/Proyect" element={<Proyect />} />
                    <Route path="Menu/Proyect/:id" element={<Proyect />} /> {/* Ruta dinámica */}
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="ForgotPasswordProfile" element={<ForgotPassword />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
