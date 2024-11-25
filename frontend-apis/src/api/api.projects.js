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
    const token = sessionStorage.getItem("access-token");
    if (!token) throw new Error("No estás autenticado.");

    const response = await fetch("http://localhost:8080/api/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Agrega el token
        },
        body: JSON.stringify(projectData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el proyecto.");
    }

    return await response.json();
};

//-------------------------------------------------------------------------------------------------------//
// Función obtener proyecto por id
export const getProjectById = async (id) => {
    const token = sessionStorage.getItem('access-token'); // Obtener el token JWT
    if (!token) {
        throw new Error('No estás autenticado');
    }

    try {
        const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Pasar el token en la cabecera
                'Content-Type': 'application/json',  // Asegurar tipo de contenido
            },
        });

        if (!response.ok) {
            const errorData = await response.json(); // Intentar extraer el mensaje de error
            throw new Error(errorData.message || 'Error al obtener el proyecto');
        }

        const data = await response.json();
        return data.project; // Asegúrate de que tu backend devuelva el proyecto en `data.project`
    } catch (error) {
        console.error('Error al obtener proyecto:', error);
        throw error;
    }
};
//-------------------------------------------------------------------------------------------------------//
// Función obtener miembros del proyecto por id
export const getMembersByProjectId = async (proyecto_id) => {
    const token = sessionStorage.getItem('access-token'); // Si necesitas autenticación
    try {
        const response = await fetch(`http://localhost:8080/api/projects/${proyecto_id}/members`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los miembros del proyecto');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en getMembersByProjectId:', error);
        throw error;
    }
};
//-------------------------------------------------------------------------------------------------------//
// Función para eliminar miembros de un proyecto
export const removeMemberFromProject = async (proyecto_id, email) => {
    const token = sessionStorage.getItem('access-token');
    if (!token) {
        throw new Error('No estás autenticado');
    }

    try {
        const response = await fetch(`http://localhost:8080/api/projects/remove-member/${proyecto_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ email }), // Solo el email en el cuerpo
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al eliminar miembro');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
//-------------------------------------------------------------------------------------------------------//
// Función para agregar miembros a un proyecto
export const addMemberToProject = async (proyecto_id, email, rol) => {
    const token = sessionStorage.getItem('access-token'); // Obtener el token JWT
    if (!token) {
        throw new Error('No estás autenticado');
    }

    try {
        const response = await fetch(`http://localhost:8080/api/projects/add-member`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Pasar el token en la cabecera
            },
            body: JSON.stringify({ proyecto_id, email, rol }), // Enviar los datos necesarios en el cuerpo
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al agregar miembro');
        }

        return await response.json(); // Devuelve la respuesta del backend
    } catch (error) {
        throw error; // Lanzar el error para ser capturado en el componente
    }
};
