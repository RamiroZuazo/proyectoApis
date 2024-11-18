const User = require('../db/models/users'); // Asegúrate de que esta ruta sea correcta
var bcrypt = require('bcryptjs');
<<<<<<< HEAD
=======
const cloudinary = require('cloudinary').v2;
>>>>>>> 019bb376aca42ebc45f6b2bd88db9bcee223f41a

// Crear un usuario
const createUser = async (req, res) => {
    const { nombre, email, contraseña } = req.body; 
    try {
        // Imagen por defecto para todos los nuevos usuarios
        const defaultImage = 'http://surl.li/xjopwc';
        
        var hashedPassword = bcrypt.hashSync(contraseña, 8);

        // Crear el usuario con la imagen predeterminada
        const newUser = await User.create({ 
            nombre, 
            email, 
            contraseña: hashedPassword, 
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


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Actualizar un usuario
// controllers/users.js
const updateUser = async (req, res) => {
    const { id } = req.params;
<<<<<<< HEAD
    const { nombre, email, contraseña, imagen_perfil } = req.body;
    try {
        var hashedPassword = bcrypt.hashSync(contraseña, 8);
        const [updated] = await User.update({ nombre, email, contraseña:hashedPassword, imagen_perfil }, { where: { id } });
=======
    const { nombre, email, contraseña } = req.body;
    let imagen_perfil;

    try {
        // Verifica si hay una imagen en la solicitud
        if (req.file) {
            // Sube la imagen a Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'user_profiles', // Carpeta donde guardar las imágenes
            });

            // Obtiene la URL segura de la imagen subida
            imagen_perfil = result.secure_url;
        }

        // Actualiza los datos del usuario en la base de datos
        const [updated] = await User.update(
            { nombre, email, contraseña, imagen_perfil },
            { where: { id } }
        );

>>>>>>> 019bb376aca42ebc45f6b2bd88db9bcee223f41a
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




