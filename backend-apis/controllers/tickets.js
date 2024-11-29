const ticketService = require('../services/tickets.js');

const createTicket = async (req, res) => {
    try {
        // Si la imagen está en base64, la subes a Cloudinary
        let imagen_ticket = "";
        if (req.body.imagen_ticket) {
            // Subir la imagen a Cloudinary
            const cloudinaryResponse = await cloudinary.uploader.upload(req.body.imagen_ticket, {
                folder: 'tickets', // O cualquier otra carpeta que quieras en Cloudinary
            });
            imagen_ticket = cloudinaryResponse.secure_url; // Aquí guardas la URL de la imagen
        }

        // Crear el ticket con la URL de la imagen
        const ticketData = {
            ...req.body, // Copia todos los campos del ticket
            imagen_ticket, // Agrega el campo imagen_ticket con la URL de Cloudinary
        };

        const ticket = await ticketService.createTicket(ticketData); // Usa ticketService para guardar en la base de datos

        res.status(201).json(ticket); // Retorna el ticket creado
    } catch (error) {
        console.error("Error al crear el ticket:", error);
        res.status(500).json({ message: error.message }); // En caso de error, retornamos un mensaje de error
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
