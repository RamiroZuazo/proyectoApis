const { User } = require("../db/models/users");
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const upload = require('../middlewares/upload');

// Ruta para actualizar usuario con imagen
router.put('/:id', upload.single('imagen_perfil'), userController.updateUser);
// Obtener todos los usuarios
const getUsers = async () => await User.findAll();

// Obtener un usuario por ID
const getUserById = async (id) => await User.findByPk(id);

// Crear un nuevo usuario
const createUser = async (user) => await User.create(user);

// Actualizar un usuario por ID
const updateUser = async (id, updatedData) => {
    const user = await User.findByPk(id);
    if (!user) {
        return null; 
    }
    return await user.update(updatedData); 
};

// Eliminar un usuario por ID
const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        return null; 
    }
    await user.destroy();
    return user; 
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
