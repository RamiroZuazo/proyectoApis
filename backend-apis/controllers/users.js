const User = require('../db/models/users'); // Asegúrate de que esta ruta sea correcta

// Crear un usuario
const createUser = async (req, res) => {
    const { nombre, email, contraseña } = req.body; 
    try {
        // Imagen por defecto para todos los nuevos usuarios
        const defaultImage = 'http://surl.li/xjopwc';
        
        // Crear el usuario con la imagen predeterminada
        const newUser = await User.create({ 
            nombre, 
            email, 
            contraseña, 
            imagen_perfil: defaultImage 
        });
        
        res.status(201).json({ ok: true, message: 'Usuario creado correctamente', userId: newUser.id });
    } catch (err) {
        console.error('Error al crear el usuario:', err);
        res.status(500).json({ ok: false, message: 'Error al crear el usuario', error: err.message });
    }
};


// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({ ok: true, users });
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        res.status(500).json({ ok: false, message: 'Error al obtener usuarios', error: err.message });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }
        res.json({ ok: true, user });
    } catch (err) {
        console.error('Error al obtener el usuario:', err);
        res.status(500).json({ ok: false, message: 'Error al obtener el usuario', error: err.message });
    }
};

// Actualizar un usuario
// controllers/users.js
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, contraseña, imagen_perfil } = req.body; 
    try {
        const [updated] = await User.update({ nombre, email, contraseña, imagen_perfil }, { where: { id } });
        if (!updated) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }
        res.json({ ok: true, message: 'Usuario actualizado correctamente' });
    } catch (err) {
        console.error('Error al actualizar el usuario:', err);
        res.status(500).json({ ok: false, message: 'Error al actualizar el usuario', error: err.message });
    }
};


// Eliminar un usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await User.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }
        res.json({ ok: true, message: 'Usuario eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar el usuario:', err);
        res.status(500).json({ ok: false, message: 'Error al eliminar el usuario', error: err.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
