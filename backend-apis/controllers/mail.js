const { sendMail } = require('../services/mail');

const sendEmail = async (req, res) => {
  const { email, subject, htmlTemplate } = req.body;

  if (!email || !subject || !htmlTemplate) {
    return res.status(400).send('Faltan parámetros requeridos: email, subject o htmlTemplate');
  }

  try {
    await sendMail(email, subject, htmlTemplate);
    res.status(200).send('Correo enviado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al enviar correo');
  }
};

module.exports = { sendEmail };