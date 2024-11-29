const GastoMiembro = require('../db/models/gastos_miembros');
const ProyectoMiembro = require('../db/models/proyectos_miembros');
const Ticket = require('../db/models/tickets');

// Dividir gastos entre los miembros del proyecto
const dividirGastos = async (ticketId, montoTotal) => {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) throw new Error('Ticket no encontrado');

    // Obtener los miembros del proyecto relacionado al ticket
    const miembros = await ProyectoMiembro.findAll({
        where: { proyecto_id: ticket.proyecto_id },
    });

    if (!miembros.length) throw new Error('No hay miembros asociados al proyecto.');

    const montoPorMiembro = montoTotal / miembros.length;

    // Crear registros en `gastos_miembros` para cada miembro
    const gastos = await Promise.all(
        miembros.map((miembro) =>
            GastoMiembro.create({
                ticket_id: ticketId,
                usuario_id: miembro.usuario_id,
                monto: montoPorMiembro,
            })
        )
    );

    return gastos;
};

// Obtener los gastos de un usuario
const getGastosPorUsuario = async (usuarioId) => {
    return await GastoMiembro.findAll({
        where: { usuario_id: usuarioId },
        include: [
            {
                model: Ticket,
                attributes: ['id', 'descripcion', 'monto'],
            },
        ],
    });
};


const marcarGastosComoPagadoPorUsuarioYProyecto = async (proyecto_id, usuario_id, usuario_responsable_id) => {
    // Obtener todos los tickets asociados a este proyecto y responsables
    const tickets = await Ticket.findAll({
        where: {
            proyecto_id,
            usuario_responsable_id,  // Filtrar por el responsable del ticket
        },
    });

    if (!tickets.length) {
        throw new Error('No se encontraron tickets para este proyecto y responsable');
    }

    const ticketIds = tickets.map(ticket => ticket.id);  // Extraer los IDs de los tickets encontrados

    // Buscar los gastos asociados al usuario y a los tickets del proyecto
    const gastos = await GastoMiembro.findAll({
        where: {
            usuario_id,   // El usuario que tiene el gasto
            ticket_id: ticketIds,  // Filtrar por los tickets obtenidos
            pagado: 0,     // Solo los gastos no pagados
        },
    });

    if (!gastos.length) {
        throw new Error('No se encontraron gastos pendientes para este usuario en este proyecto');
    }

    // Marcar como pagados todos los gastos encontrados
    await Promise.all(
        gastos.map(async (gasto) => {
            gasto.pagado = 1;
            await gasto.save();
        })
    );

    return gastos; // Devolver los gastos actualizados
};

const crearGasto = async (ticketId, usuarioId, monto) => {
    try {
        // Crear el gasto
        const gasto = await GastoMiembro.create({
            ticket_id: ticketId,
            usuario_id: usuarioId,
            monto: monto,
            pagado: 0, // Por defecto, no pagado
        });
        return gasto;
    } catch (error) {
        console.error('Error al crear el gasto en el servicio:', error);
        throw error; // Lanza el error para que el controlador lo maneje
    }
};

const getGastosPendientesPorUsuario = async (usuarioResponsableId, usuarioDeudorId, proyectoId) => {
    try {
        const gastos = await GastoMiembro.findAll({
            where: { usuario_id: usuarioDeudorId, pagado: 0 },
            include: [{
                model: Ticket,
                as: 'ticket',  // Asegúrate de que el alias coincida con el definido en la relación
                attributes: ['id', 'descripcion', 'monto', 'usuario_responsable_id', 'proyecto_id'],
                where: {
                    usuario_responsable_id: usuarioResponsableId,
                    proyecto_id: proyectoId,
                },
            }],
        });

        return gastos;
    } catch (error) {
        console.error('Error al obtener los gastos pendientes:', error);
        throw error;
    }
};



module.exports = {
    dividirGastos,
    getGastosPorUsuario,
    marcarGastosComoPagadoPorUsuarioYProyecto,
    crearGasto,
    getGastosPendientesPorUsuario,
};
