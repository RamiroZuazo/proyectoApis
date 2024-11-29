const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars'); // Importar Handlebars

const gastoService = require('../services/gastos_miembros');
const userService = require('../services/users');
const mailService = require('../services/mail');

// Ruta de la plantilla HBS
const templatePath = path.resolve(__dirname, '../templates/email.template.gastoProyecto.hbs');

// Función para leer y compilar la plantilla
const compileTemplate = (emailData) => {
  const templateSource = fs.readFileSync(templatePath, 'utf8'); // Leer el archivo de plantilla como texto
  const template = handlebars.compile(templateSource); // Compilar la plantilla
  return template(emailData); // Pasar los datos a la plantilla y devolver el HTML generado
};

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

const marcarGastosComoPagado = async (req, res) => {
    const { proyecto_id, usuario_id, usuario_responsable_id } = req.params; // Obtener los parámetros desde la URL

    try {
        // Llamar al servicio para marcar todos los gastos de ese usuario en el proyecto como pagados
        const gastos = await gastoService.marcarGastosComoPagadoPorUsuarioYProyecto(proyecto_id, usuario_id, usuario_responsable_id);
        
        // Devolver los gastos actualizados
        res.status(200).json({
            ok: true,
            message: 'Gastos marcados como pagados',
            gastos,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ ok: false, message: error.message });
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

    // Obtener los correos de los usuarios involucrados, excluyendo al creador
    const correos = await userService.obtenerCorreosUsuariosPorTicket(ticketId, usuarioId);

    // Obtener detalles del ticket (proyecto asociado)
    const ticket = await ticketService.getTicketById(ticketId);
    const proyectoNombre = ticket ? ticket.nombre : 'Proyecto desconocido';

    // Obtener el nombre del usuario que realiza el gasto
    const usuario = await userService.getUserById(usuarioId);
    const usuarioNombre = usuario ? usuario.nombre : 'Usuario desconocido';

    // Generar el link dinámico del proyecto (si existe)
    const linkProyecto = `http://tu-dominio.com/proyectos/${ticketId}`;

    // Preparar los datos del email
    const emailData = {
      nombre: usuarioNombre,
      nombre_proyecto: proyectoNombre,
      monto: monto.toFixed(2),
      fecha: new Date().toLocaleDateString(),
      nombre_usuario: usuarioNombre,
      link_proyecto: linkProyecto,
    };

    // Compilar la plantilla con los datos
    const emailHtml = compileTemplate(emailData);

    // Enviar el correo a todos los involucrados (excepto al creador)
    for (const correo of correos) {
      await mailService.sendMail(correo, 'Nuevo Gasto Registrado en Ticketify', emailHtml);
    }

    res.status(201).json({ ok: true, message: 'Gasto creado y correos enviados correctamente.' });
  } catch (err) {
    console.error('Error al crear gasto:', err);
    res.status(500).json({ ok: false, message: 'Error al crear gasto', error: err.message });
  }
};

module.exports = {
  dividirGastos,
  getGastosPorUsuario,
  marcarGastoComoPagado,
  crearGasto,
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
    marcarGastosComoPagado,
    crearGasto,
    getGastosPendientesPorUsuario,
};
