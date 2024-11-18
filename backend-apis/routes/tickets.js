const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/tickets');

// Crear un ticket
router.post('/', ticketController.createTicket);

// Obtener todos los tickets
router.get('/', ticketController.getTickets);

// Obtener tickets por proyecto
router.get('/project/:proyectoId', ticketController.getTicketsByProject);

// Obtener tickets por usuario
router.get('/user/email/:email', ticketController.getTicketsByUser);

// Modificar un ticket
router.put('/:id', ticketController.updateTicket);

// Eliminar un ticket
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;
