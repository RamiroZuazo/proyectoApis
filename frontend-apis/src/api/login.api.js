const login = async (email, password) => {
    try {
        const response = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, contraseña: password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { ok: false, status: response.status, message: errorData.message };
        }

        const data = await response.json();
        return { ok: true, ...data };
    } catch (error) {
        console.error("Error al intentar iniciar sesión:", error);
        return { ok: false, message: "Error al conectar con el servidor" };
    }
};

export default login;
