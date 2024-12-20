const sendEmail = async (email) => {
    try {
        const response = await fetch("http://localhost:8080/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { ok: false, status: response.status, message: errorData.message };
        }

        const data = await response.json();
        return { ok: true, message: "Correo enviado correctamente", ...data };
    } catch (error) {
        console.error("Error al intentar enviar el correo:", error);
        return { ok: false, message: "Error al conectar con el servidor." };
    }
};

const changePassword = async (token, newPassword) => {
    try {
        const response = await fetch("http://localhost:8080/api/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, newPassword }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { ok: false, status: response.status, message: errorData.message };
        }

        const data = await response.json();
        return { ok: true, message: data.message };
    } catch (error) {
        console.error("Error al intentar cambiar la contraseña:", error);
        return { ok: false, message: "Error al conectar con el servidor." };
    }
};




export { sendEmail, changePassword };
