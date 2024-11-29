import { jwtDecode } from 'jwt-decode';

export const getLoggedUser = async () => {
    const token = sessionStorage.getItem('access-token'); 
    if (!token) {
        throw new Error('No estás autenticado');
    }
    const decodedToken = jwtDecode(token); 
    const userId = decodedToken.id; 
    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener el usuario');
    }

    return await response.json();
};
//-------------------------------------------------------------------------------------------------------//
// hacer un update de usuario
export const updateUser = async (updatedData) => {
    const token = sessionStorage.getItem('access-token');
    if (!token) {
        throw new Error('No estás autenticado');
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'PUT',  // Usamos PUT para actualizar
        headers: {
            'Content-Type': 'application/json',  // Indica que estamos enviando datos en formato JSON
            'Authorization': `Bearer ${token}`,  // Enviamos el token de autorización
        },
        body: JSON.stringify(updatedData),  // Convertimos los datos a JSON para enviarlos en el cuerpo de la solicitud
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el usuario');
    }

    return await response.json();  // Retornamos la respuesta en formato JSON
};