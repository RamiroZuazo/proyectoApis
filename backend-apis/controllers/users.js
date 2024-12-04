const User = require('../db/models/users'); // Asegúrate de que esta ruta sea correcta
var bcrypt = require('bcryptjs');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');



const loginUser = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }

        const isPasswordValid = bcrypt.compareSync(contraseña, user.contraseña);
        if (!isPasswordValid) {
            return res.status(401).json({ ok: false, message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email }, // Información incluida en el token
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            ok: true,
            token, // Token enviado al frontend
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
        const defaultImage = 'http://surl.li/nqrnkp';
        
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

// Configuración de multer para manejar archivos
const storage = multer.memoryStorage();  // Almacenar los archivos en la memoria temporalmente
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,  // Limitar a 5MB
  }
}).single('imagen_perfil');  // 'imagen_perfil' es el campo que contiene el archivo


// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, contraseña } = req.body;
    let imagen_perfil = null;

    try {
        // Verifica si el usuario existe
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }

        // Si se recibe una nueva imagen (Base64), la procesamos
        if (req.body.imagen_perfil) {
            console.log('Imagen recibida:', req.body.imagen_perfil);  // Log de la imagen recibida (Base64)

            // Subir la imagen a Cloudinary
            const result = await cloudinary.uploader.upload(req.body.imagen_perfil, {
                folder: 'user_profiles',  // Se guarda en la carpeta user_profiles
            });

            imagen_perfil = result.secure_url;  // Aquí se obtiene la URL pública de la imagen
            console.log('Imagen subida a Cloudinary:', imagen_perfil);
        } else {
            imagen_perfil = user.imagen_perfil;  // Si no se recibió una nueva imagen, se conserva la antigua
        }

        // Datos a actualizar
        const updatedData = {
            nombre: nombre || user.nombre,
            email: email || user.email,
            contraseña: contraseña ? bcrypt.hashSync(contraseña, 8) : user.contraseña,
            imagen_perfil: imagen_perfil || user.imagen_perfil,  // Asegúrate de almacenar la URL
        };

        console.log('Datos a actualizar:', updatedData);

        // Verificar si hubo cambios
        if (
            updatedData.nombre === user.nombre &&
            updatedData.email === user.email &&
            updatedData.contraseña === user.contraseña &&
            updatedData.imagen_perfil === user.imagen_perfil
        ) {
            return res.json({ ok: true, message: 'No se realizaron cambios' });
        }

        // Actualizar el usuario
        await user.update(updatedData);

        res.json({ ok: true, message: 'Usuario actualizado correctamente', user: updatedData });
    } catch (err) {
        console.error('Error al actualizar el usuario:', err);
        res.status(500).json({ ok: false, message: 'Error al actualizar el usuario', error: err.message });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        if (req.userId !== parseInt(id, 10)) {
            return res.status(403).json({ ok: false, message: 'No autorizado para acceder a este usuario' });
        }
        const user = await User.findByPk(id, {
            attributes: ['id', 'nombre', 'email', 'imagen_perfil'], 
        });
        if (!user) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }

        res.json({ ok: true, user });
    } catch (err) {
        console.error('Error al obtener el usuario:', err);
        res.status(500).json({ ok: false, message: 'Error al obtener el usuario', error: err.message });
    }
};


// Eliminar un usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Intentar eliminar el usuario
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
// Obtener el correo de un usuario por su ID
const getUserEmailById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }

        res.json({ ok: true, email: user.email });
    } catch (err) {
        console.error('Error al obtener el correo:', err);
        res.status(500).json({ ok: false, message: 'Error al obtener el correo del usuario', error: err.message });
    }
};




module.exports = {
    loginUser,
    createUser,
    getAllUsers,
    getUserById,
    updateUser, 
    deleteUser,  
    getUserEmailById
};
