const express = require('express');
const { sendEmail } = require('../controllers/mail');
const router = express.Router();

// Ruta para enviar correo
router.post('/send-email', sendEmail);

module.exports = router;