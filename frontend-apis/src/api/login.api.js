const login = async (email, password) => {
    console.log("Datos enviados al servidor:"); 
    try {
        const response = await fetch("http://localhost:8080/api/users/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contraseña: password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error("Error al intentar iniciar sesión:", error);
        return { ok: false, message: 'Error al conectar con el servidor' };
    }
};

export default login;