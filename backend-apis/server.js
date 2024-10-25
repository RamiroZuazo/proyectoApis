const express = require('express');
const db = require('./db/db'); // Asegúrate de que esta ruta sea correcta
const userRoutes = require('./routes/users');
const app = express();
const PORT = 8080;

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas
app.use('/api/users', userRoutes);

// Sincronizar modelos con la base de datos
db.sync()
    .then(() => {
        console.log('Modelos sincronizados con la base de datos');
    })
    .catch(err => {
        console.error('Error al sincronizar modelos:', err);
    });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`);
});