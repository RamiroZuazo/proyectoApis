const ticketService = require('../services/tickets.js');
const cloudinary = require('cloudinary').v2;
const createTicket = async (req, res) => {
    try {
        console.log("Cuerpo de la solicitud recibido:", req.body);  // Agregado para verificar los datos recibidos

        let imagen_ticket = "";
        if (req.body.imagen_ticket) {
            // Subir la imagen a Cloudinary
            const cloudinaryResponse = await cloudinary.uploader.upload(req.body.imagen_ticket, {
                folder: 'tickets',
            });
            imagen_ticket = cloudinaryResponse.secure_url;
        }

        const ticketData = {
            ...req.body,
            imagen_ticket,
        };

        // Verifica que se esté recibiendo el campo 'usuario_responsable_id'
        if (!ticketData.usuario_responsable_id) {
            console.log(ticketData.imagen)
            console.error("Error: No se proporcionó usuario_responsable_id.");
            return res.status(400).json({ message: 'ID de usuario responsable no proporcionado' });
        }

        const ticket = await ticketService.createTicket(ticketData);  // Crear el ticket
        res.status(201).json(ticket);  // Retorna el ticket creado
    } catch (error) {
        console.error("Error al crear el ticket:", error);
        res.status(500).json({ message: error.message });  // En caso de error, retornamos un mensaje de error
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

// controller
const getTicketsByProject = async (req, res) => {
    try {
        const { proyectoId } = req.params;
        const tickets = await ticketService.getTicketsByProject(proyectoId);
        
        // Verificar si se encontraron tickets
        if (tickets.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tickets para este proyecto.' });
        }
        
        // Si hay tickets, devolverlos
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
