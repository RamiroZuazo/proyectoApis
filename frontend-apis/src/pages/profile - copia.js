import React, { useEffect, useState } from 'react';
import '../App.css';
import ProfileComponent from '../components/profileComponent/Profile.jsx';
import axios from 'axios';

function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = 1;  // Suponiendo que estás trabajando con el usuario con ID 1, puedes cambiarlo dinámicamente según sea necesario
    const token = localStorage.getItem('token');  // Asumiendo que el token se guarda en localStorage

    // Cargar los datos del usuario cuando se monta el componente
    useEffect(() => {
        document.title = "Perfil - Ticketify";

        // Cargar los datos del usuario desde el backend
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
                    headers: {
                        "x-access-token": token,  // Pasamos el token en los headers
                    },
                });

                if (response.data) {
                    setUserData(response.data);  // Guardamos los datos del usuario en el estado
                }
            } catch (err) {
                console.error("Error al obtener los datos del usuario:", err);
                setError("Error al obtener los datos del usuario");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId, token]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Perfil de Usuario</h2>
            {/* Si los datos del usuario ya están cargados, pasamos esos datos al componente ProfileComponent */}
            {userData && <ProfileComponent userData={userData} />}
        </div>
    );
}

export default Profile;
