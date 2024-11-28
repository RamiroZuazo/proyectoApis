const Ticket = require('../db/models/tickets');
const Proyecto = require('../db/models/projects');
const Usuario = require('../db/models/users');

// Obtener todos los tickets
const getTickets = async () => {
    return await Ticket.findAll({
        include: [
            { model: Proyecto, as: 'proyecto', attributes: ['id', 'nombre', 'descripcion'] },
            { model: Usuario, as: 'usuario_responsable', attributes: ['id', 'nombre', 'email'] },
        ],
    });
};

// Obtener un ticket por ID
const getTicketById = async (id) => {
    return await Ticket.findByPk(id, {
        include: [
            { model: Proyecto, as: 'proyecto', attributes: ['id', 'nombre', 'descripcion'] },
            { model: Usuario, as: 'usuario_responsable', attributes: ['id', 'nombre', 'email'] },
        ],
    });
};

// Crear un nuevo ticket
const createTicket = async (data) => {
    const { fecha, monto, descripcion, proyecto_id, usuario_responsable_id } = data;

    // Verifica si el ID del usuario es válido (ya no buscamos por correo)
    if (!usuario_responsable_id) {
        throw new Error('ID de usuario responsable no proporcionado');
    }

    // Crear el ticket con el ID del usuario directamente
    return await Ticket.create({
        fecha,
        monto,
        descripcion,
        proyecto_id,
        usuario_responsable_id,
    });
};


// Actualizar un ticket
const updateTicket = async (id, updatedData) => {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) return null;
    return await ticket.update(updatedData);
};

// Eliminar un ticket
const deleteTicket = async (id) => {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) return null;
    await ticket.destroy();
    return ticket;
};

// Obtener tickets por proyecto
const getTicketsByProject = async (proyectoId) => {
    return await Ticket.findAll({
        where: { proyecto_id: proyectoId },
        include: [
            { model: Proyecto, as: 'proyecto', attributes: ['id', 'nombre', 'descripcion'] },
            { model: Usuario, as: 'usuario_responsable', attributes: ['id', 'nombre', 'email'] },
        ],
    });
};

// Obtener tickets por usuario
const getTicketsByUser = async (email) => {
    // Buscar el usuario por correo
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }

    // Obtener los tickets asociados al ID del usuario encontrado
    return await Ticket.findAll({
        where: { usuario_responsable_id: usuario.id },
        include: [
            { model: Proyecto, as: 'proyecto', attributes: ['id', 'nombre', 'descripcion'] },
            { model: Usuario, as: 'usuario_responsable', attributes: ['id', 'nombre', 'email'] },
        ],
    });
};

module.exports = {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketsByProject,
    getTicketsByUser,
};
