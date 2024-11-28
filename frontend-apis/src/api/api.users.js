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
// 