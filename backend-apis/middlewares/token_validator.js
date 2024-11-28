const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extraer el token del encabezado

    console.log("Token recibido en verifyToken:", token); // Log para depuración

    if (!token) {
        return res.status(401).json({ ok: false, message: "Token faltante o no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar y decodificar el token
        console.log("Token decodificado:", decoded); // Log para verificar la decodificación
        req.userId = decoded.id; // Guardar el ID del usuario en la solicitud
        next();
    } catch (err) {
        console.error("Error al verificar el token:", err.message); // Log para errores
        return res.status(403).json({ ok: false, message: "Token inválido o expirado" });
    }
};


module.exports = verifyToken;
