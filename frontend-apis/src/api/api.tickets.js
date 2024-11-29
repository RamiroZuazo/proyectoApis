export const createTicket = async (ticketData) => {
    const token = sessionStorage.getItem('access-token');
    if (!token) {
        throw new Error('No estás autenticado');
    }

    // Verifica si la URL de la imagen está presente en ticketData
    if (ticketData.imagen_ticket) {
        console.log("URL de la imagen del ticket:", ticketData.imagen_ticket); // Debug
    }
    console.log(ticketData)
    // Realizamos la llamada a la API para crear el ticket
    const response = await fetch('http://localhost:8080/api/tickets', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Seguimos enviando como JSON
        },
        body: JSON.stringify(ticketData), // Asegúrate de que ticketData contenga la URL de imagen
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error en la creación del ticket:", errorData); // Añadir detalles de la respuesta
        throw new Error(errorData.message || 'Error al crear el ticket');
    }

    return await response.json(); // Retorna los datos del ticket creado
};
//-------------------------------------------------------------------------------------------------------//
// Función obtener miembros del proyecto por id

// api.tickets.js

export const getTicketsByProject = async (proyectoId) => {
    const token = sessionStorage.getItem('access-token'); // Obtén el token de la sesión
    if (!token) {
        throw new Error('No estás autenticado'); // Si no hay token, lanza un error
    }

    try {
        // Realiza la solicitud GET a la API para obtener los tickets del proyecto
        const response = await fetch(`http://localhost:8080/api/tickets/project/${proyectoId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluye el token de autenticación
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al obtener los tickets:", errorData); // Añadir detalles de la respuesta de error
            throw new Error(errorData.message || 'Error al obtener los tickets');
        }

        // Devuelve los tickets obtenidos desde el backend
        return await response.json();
    } catch (error) {
        console.error("Error en la solicitud de tickets:", error); // Log del error
        throw error; // Vuelve a lanzar el error para que se maneje en el componente o donde se llame la función
    }
};
