const { sendMail } = require('../services/mail');
const jwt = require('jsonwebtoken');
const User = require('../db/models/users'); // Modelo de usuario

const sendEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'El campo email es requerido' });
  }

  try {
    // Verifica si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Genera un token único con tiempo de expiración
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Crea el enlace para la recuperación de contraseña
    const resetLink = `${process.env.FRONTEND_URL}/ChangePassword?token=${token}`;

    // Crea el contenido HTML del correo
    const htmlTemplate = `
      <h1>Recuperación de Contraseña</h1>
      <p>Hola ${user.nombre},</p>
      <p>Haz clic en el siguiente enlace para recuperar tu contraseña:</p>
      <a href="${resetLink}">Cambiar Contraseña</a>
      <p>Si no solicitaste este cambio, ignora este mensaje.</p>
    `;

    // Envía el correo
    await sendMail(email, 'Recuperación de contraseña', htmlTemplate);

    // Respuesta exitosa
    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Detalles del error:', error);
    res.status(500).json({ message: 'Error al enviar el correo. Inténtalo nuevamente más tarde.' });
  }
};

module.exports = { sendEmail };
