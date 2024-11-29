const cors = require('cors');
const express = require('express');
const db = require('./db/db'); 
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const ticketRoutes = require('./routes/tickets');
const gastoRoutes = require('./routes/gastos_miembros');
const app = express();
const PORT = 8080;


app.use(cors({ origin: 'http://localhost:3000' }));
// Middleware para parsear JSON
app.use(express.json({ limit: '10mb' }));  
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Usar las rutas
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/gastos', gastoRoutes);
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
