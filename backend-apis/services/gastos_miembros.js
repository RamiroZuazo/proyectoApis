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

// Actualizar el estado de "pagado" de un gasto
const marcarGastoComoPagado = async (gastoId) => {
    const gasto = await GastoMiembro.findByPk(gastoId);
    if (!gasto) throw new Error('Gasto no encontrado');

    gasto.pagado = 1; // Marcar como pagado
    await gasto.save();

    return gasto;
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
    marcarGastoComoPagado,
    crearGasto,
    getGastosPendientesPorUsuario,
};
