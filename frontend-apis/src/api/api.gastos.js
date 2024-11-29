export const createGasto = async (gastoData) => {
    const token = sessionStorage.getItem('access-token');
    if (!token) {
        throw new Error('No estás autenticado');
    }

    console.log("Datos enviados para crear el gasto:", gastoData); // Debug

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
// Función obtener miembros del proyecto por id
// Servicio para obtener los gastos pendientes
export const getGastosPendientes = async (usuarioResponsableId, usuarioDeudorId, proyectoId) => {
    const token = sessionStorage.getItem('access-token');
    if (!token) {
        throw new Error('No estás autenticado');
    }

    console.log("Datos enviados para obtener los gastos pendientes:", { usuarioResponsableId, usuarioDeudorId, proyectoId });

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

