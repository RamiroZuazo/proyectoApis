const multer = require('multer');

// Configuración del almacenamiento en memoria
const storage = multer.memoryStorage();

// Middleware de Multer
const upload = multer({ storage });

module.exports = upload;
