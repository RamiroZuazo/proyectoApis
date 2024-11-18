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

module.exports = {
    dividirGastos,
    getGastosPorUsuario,
    marcarGastoComoPagado,
};
