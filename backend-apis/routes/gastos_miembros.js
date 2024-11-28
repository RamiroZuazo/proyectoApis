const express = require('express');
const router = express.Router();
const gastoController = require('../controllers/gastos_miembros');
const token_validator = require('../middlewares/token_validator');
// Dividir gastos al crear un ticket
router.post('/dividir', gastoController.dividirGastos);

// Obtener los gastos de un usuario
router.get('/usuario/:usuarioId', gastoController.getGastosPorUsuario);

// Marcar gasto como pagado
router.put('/:gastoId/pagar', gastoController.marcarGastoComoPagado);
// Crear un nuevo gasto
router.post('/crear', token_validator, gastoController.crearGasto);
router.get('/gastos-pendientes/:usuarioResponsableId/:usuarioDeudorId/:proyectoId', gastoController.getGastosPendientesPorUsuario);

module.exports = router;
