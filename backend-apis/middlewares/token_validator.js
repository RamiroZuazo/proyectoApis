const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener token de la cabecera

    if (!token) {
        return res.status(403).json({ ok: false, message: 'No se proporcionó un token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;  // El ID del usuario se obtiene del token
        next();  // Continuar con el siguiente middleware o controlador
    } catch (err) {
        return res.status(401).json({ ok: false, message: 'Token inválido' });
    }
};

module.exports = verifyToken;
