const express = require('express');
const router = express.Router();
const gastoController = require('../controllers/gastos_miembros');

// Dividir gastos al crear un ticket
router.post('/dividir', gastoController.dividirGastos);

// Obtener los gastos de un usuario
router.get('/usuario/:usuarioId', gastoController.getGastosPorUsuario);

// Marcar gasto como pagado
router.put('/:gastoId/pagar', gastoController.marcarGastoComoPagado);

module.exports = router;
