export const createGasto = async (gastoData) => {
    const token = sessionStorage.getItem('access-token');
    if (!token) {
        throw new Error('No estás autenticado');
    }

    const response = await fetch('http://localhost:8080/api/gastos/crear', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gastoData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error en la creación del gasto:", errorData); // Debug
        throw new Error(errorData.message || 'Error al crear el gasto');
    }

    return await response.json();
};
//-------------------------------------------------------------------------------------------------------//
// Servicio para obtener los gastos pendientes
export const getGastosPendientes = async (usuarioResponsableId, usuarioDeudorId, proyectoId) => {
    const token = sessionStorage.getItem('access-token');
    if (!token) {
        throw new Error('No estás autenticado');
    }

    // Formamos la URL con los parámetros correspondientes
    const url = `http://localhost:8080/api/gastos/gastos-pendientes/${usuarioResponsableId}/${usuarioDeudorId}/${proyectoId}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al obtener los gastos pendientes:", errorData);
        throw new Error(errorData.message || 'Error al obtener los gastos pendientes');
    }

    return await response.json();
};
//-------------------------------------------------------------------------------------------------------//
// Función para marcar los gastos como pagados de un usuario en un proyecto
export const marcarGastosComoPagado = async (proyectoId, usuarioId, usuarioResponsableId) => {
    const token = sessionStorage.getItem('access-token');
    if (!token) {
        throw new Error('No estás autenticado');
    }

    // Formamos la URL con los parámetros correspondientes, incluyendo el usuario responsable
    const url = `http://localhost:8080/api/gastos/${proyectoId}/usuario/${usuarioId}/responsable/${usuarioResponsableId}/pagar`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al marcar los gastos como pagados:", errorData);
        throw new Error(errorData.message || 'Error al marcar los gastos como pagados');
    }

    return await response.json();
};
