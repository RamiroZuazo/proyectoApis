const gastoService = require('../services/gastos_miembros');

const dividirGastos = async (req, res) => {
    try {
        const { ticketId, montoTotal } = req.body;
        const gastos = await gastoService.dividirGastos(ticketId, montoTotal);
        res.status(201).json({ ok: true, message: 'Gastos divididos correctamente', gastos });
    } catch (err) {
        console.error('Error al dividir gastos:', err);
        res.status(500).json({ ok: false, message: 'Error al dividir gastos', error: err.message });
    }
};

const getGastosPorUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const gastos = await gastoService.getGastosPorUsuario(usuarioId);
        res.status(200).json({ ok: true, gastos });
    } catch (err) {
        console.error('Error al obtener gastos por usuario:', err);
        res.status(500).json({ ok: false, message: 'Error al obtener gastos por usuario', error: err.message });
    }
};

const marcarGastoComoPagado = async (req, res) => {
    try {
        const { gastoId } = req.params;
        const gasto = await gastoService.marcarGastoComoPagado(gastoId);
        res.status(200).json({ ok: true, message: 'Gasto marcado como pagado', gasto });
    } catch (err) {
        console.error('Error al marcar gasto como pagado:', err);
        res.status(500).json({ ok: false, message: 'Error al marcar gasto como pagado', error: err.message });
    }
};

module.exports = {
    dividirGastos,
    getGastosPorUsuario,
    marcarGastoComoPagado,
};
