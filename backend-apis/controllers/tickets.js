const ticketService = require('../services/tickets.js');

const createTicket = async (req, res) => {
    try {
        const ticket = await ticketService.createTicket(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getTickets();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTicketsByProject = async (req, res) => {
    try {
        const { proyectoId } = req.params;
        const tickets = await ticketService.getTicketsByProject(proyectoId);
        if (tickets.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tickets para este proyecto.' });
        }
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTicketsByUser = async (req, res) => {
    try {
        const { email } = req.params; // Obtener el correo del usuario desde los parámetros
        const tickets = await ticketService.getTicketsByUser(email);

        if (tickets.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tickets para este usuario.' });
        }

        res.status(200).json(tickets);
    } catch (error) {
        if (error.message === 'Usuario no encontrado') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTicket = await ticketService.updateTicket(id, req.body);
        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }
        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTicket = await ticketService.deleteTicket(id);
        if (!deletedTicket) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Exportar funciones de manera estructurada
module.exports = {
    createTicket,
    getTickets,
    getTicketsByProject,
    getTicketsByUser,
    updateTicket,
    deleteTicket,
};
