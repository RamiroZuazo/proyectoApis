const dotenv = require('dotenv');
const {
  Resend
} = require('resend');
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (email, subject, htmlTemplate) => {
  try {
    const response = await resend.emails.send({
      from: 'Ticketify <onboarding@resend.dev>',
      to: email,
      subject,
      html: htmlTemplate
    });

    if (response && response.data && response.data.id) {
      console.log(`Correo enviado con éxito. ID: ${response.data.id}`);
      return response.data.id; // Retorna el ID del correo si se envió correctamente
    } else {
      console.error('No se pudo enviar el correo, no se recibió un ID válido.');
      throw new Error('No se pudo enviar el correo, no se recibió un ID válido.');
    }
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('Error al enviar el correo: ' + error.message);
  }
};


module.exports = {
  sendMail,
};