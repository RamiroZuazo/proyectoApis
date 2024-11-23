// src/api/api.projects.js
export const getProjectsByUserId = async (userId) => {
    const token = sessionStorage.getItem('access-token'); // Obtener el token JWT
    if (!token) {
        throw new Error('No estás autenticado');
    }

    try {
        const response = await fetch(`http://localhost:8080/api/projects/user/${userId}/projects`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Pasar el token en la cabecera
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los proyectos');
        }

        const data = await response.json();
        return data.proyectos;
    } catch (error) {
        throw error;  // Lanzar el error para ser capturado en el componente
    }
};
//-------------------------------------------------------------------------------------------------------//
// Función para crear un nuevo proyecto y agregar el usuario que lo creó
export const createProject = async (projectData) => {
    const token = sessionStorage.getItem('access-token');  // Obtener el token JWT
    if (!token) {
        throw new Error('No estás autenticado');
    }

    try {
        const response = await fetch('http://localhost:8080/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Pasar el token en la cabecera
            },
            body: JSON.stringify(projectData),
        });

        if (!response.ok) {
            throw new Error('Error al crear el proyecto');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;  // Lanzar el error para ser capturado en el componente
    }
};
