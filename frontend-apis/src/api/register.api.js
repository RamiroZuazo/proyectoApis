const register = async (userData) => {
    try {
        const response = await fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Error al registrar usuario');
        }

        const result = await response.json();
        return result; // Retorna los datos de la respuesta si el registro es exitoso
    } catch (error) {
        console.error('Error al intentar registrar usuario:', error);
        throw error;
    }
};

export default register;
