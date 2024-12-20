const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../db/models/users'); // Importa el modelo de usuario

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Faltan parámetros requeridos: token o nueva contraseña' });
    }
  
    try {
      // Verifica el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = decoded;
  
      // Busca al usuario por ID
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Hashea la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Actualiza la contraseña en la base de datos
      user.contraseña = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      res.status(400).json({ message: 'Token inválido o expirado' });
    }
  };
  
  module.exports = { resetPassword };
  