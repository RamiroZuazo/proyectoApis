const User = require('../db/models/users'); // Asegúrate de que esta ruta sea correcta
var bcrypt = require('bcryptjs');

const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        // Buscar usuario por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }

        // Comparar contraseñas
        const isPasswordValid = bcrypt.compareSync(contraseña, user.contraseña);
        if (!isPasswordValid) {
            return res.status(401).json({ ok: false, message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            ok: true,
            token,
            user: { id: user.id, email: user.email, nombre: user.nombre },
        });
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ ok: false, message: 'Error al iniciar sesión', error: err.message });
    }
};

// Crear un usuario
const createUser = async (req, res) => {
    const { nombre, email, contraseña } = req.body; 
    try {
        // Imagen por defecto
        const defaultImage = 'http://surl.li/xjopwc';
        
        // Encriptar contraseña
        const hashedPassword = bcrypt.hashSync(contraseña, 8);

        // Crear el usuario
        const newUser = await User.create({ 
            nombre, 
            email, 
            contraseña: hashedPassword, 
            imagen_perfil: defaultImage,
        });

        res.status(201).json({ ok: true, message: 'Usuario creado correctamente', userId: newUser.id });
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ ok: false, message: err.errors.map(e => e.message).join(', ') });
        }
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ ok: false, message: 'El correo ya está registrado' });
        }
        console.error('Error al crear el usuario:', err);
        res.status(500).json({ ok: false, message: 'Error interno del servidor' });
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

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, contraseña } = req.body;
    console.log('Cuerpo de la solicitud:', req.body);

    try {
        console.log('Buscando usuario con ID:', id);

        // Verifica si el usuario existe
        const user = await User.findByPk(id);
        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }

        let imagen_perfil;

        // Verifica si hay un archivo adjunto
        if (req.file) {
            console.log('Archivo recibido:', req.file);

            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'user_profiles' },
                    (error, result) => {
                        if (error) {
                            console.error('Error al subir a Cloudinary:', error);
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                req.file.stream.pipe(stream);
            });

            imagen_perfil = result.secure_url;
            console.log('URL de la imagen subida:', imagen_perfil);
        }

        // Datos a actualizar
        const updatedData = {
            nombre: nombre || user.nombre,
            email: email || user.email,
            contraseña: contraseña ? bcrypt.hashSync(contraseña, 8) : user.contraseña,
            imagen_perfil: imagen_perfil || user.imagen_perfil,
        };

        console.log('Datos a actualizar:', updatedData);

        // Verificar que haya cambios
        if (
            updatedData.nombre === user.nombre &&
            updatedData.email === user.email &&
            updatedData.contraseña === user.contraseña &&
            updatedData.imagen_perfil === user.imagen_perfil
        ) {
            return res.json({ ok: true, message: 'No se realizaron cambios' });
        }

        const updated = await user.update(updatedData);

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
    deleteUser,
    loginUser,
};




