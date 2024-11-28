const gastoService = require('../services/gastos_miembros');
const token_validator = require('../middlewares/token_validator');
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

const crearGasto = async (req, res) => {
    try {
        const { ticketId, usuarioId, monto } = req.body;

        // Validar datos de entrada
        if (!ticketId || !usuarioId || !monto) {
            return res.status(400).json({
                ok: false,
                message: 'Todos los campos (ticketId, usuarioId, monto) son requeridos.',
            });
        }

        // Llamar al servicio para crear el gasto
        const gasto = await gastoService.crearGasto(ticketId, usuarioId, monto);
        
        res.status(201).json({
            ok: true,
            message: 'Gasto creado exitosamente',
            gasto,
        });
    } catch (err) {
        console.error('Error al crear gasto:', err);
        res.status(500).json({
            ok: false,
            message: 'Error al crear gasto',
            error: err.message,
        });
    }
};
const getGastosPendientesPorUsuario = async (req, res) => {
    try {
        const { usuarioResponsableId, usuarioDeudorId, proyectoId } = req.params;
        
        // Llamar al servicio para obtener los gastos pendientes
        const gastos = await gastoService.getGastosPendientesPorUsuario(usuarioResponsableId, usuarioDeudorId, proyectoId);

        // Verificamos si hay gastos
        if (!gastos.length) {
            return res.status(404).json({ ok: false, message: 'No hay gastos pendientes para este usuario.' });
        }

        res.status(200).json({
            ok: true,
            message: 'Gastos obtenidos correctamente',
            gastos,
        });
    } catch (err) {
        console.error('Error al obtener los gastos pendientes del usuario:', err);
        res.status(500).json({
            ok: false,
            message: 'Error al obtener los gastos pendientes del usuario',
            error: err.message,
        });
    }
};


module.exports = {
    dividirGastos,
    getGastosPorUsuario,
    marcarGastoComoPagado,
    crearGasto,
    getGastosPendientesPorUsuario,
};
