const { User } = require('../db/db'); // Asegúrate de importar el modelo User

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const { nombre, email, contrasena } = req.body;

    try {
        const newUser = await User.create({ nombre, email, contrasena });
        res.status(201).json({ ok: true, message: 'Usuario creado correctamente', userId: newUser.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: 'Error al crear el usuario', error: err });
    }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({ ok: true, users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: 'Error al obtener usuarios', error: err });
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
        console.error(err);
        res.status(500).json({ ok: false, message: 'Error al obtener el usuario', error: err });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, contrasena } = req.body;

    try {
        const [updated] = await User.update({ nombre, email, contrasena }, { where: { id } });
        if (!updated) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }
        res.json({ ok: true, message: 'Usuario actualizado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, message: 'Error al actualizar el usuario', error: err });
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
        console.error(err);
        res.status(500).json({ ok: false, message: 'Error al eliminar el usuario', error: err });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
