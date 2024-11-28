const verifyToken = require('../middlewares/token_validator');
const express = require('express');
const { getAllUsers, createUser, getUserById, updateUser, deleteUser, loginUser } = require('../controllers/users');
const router = express.Router();
const multer = require('multer');

router.get('/', getAllUsers);
router.post('/register', createUser);
router.get('/:id', getUserById);
//router.put('/:id', verifyToken, updateUser);
router.put('/:id', updateUser);
router.delete('/:id', verifyToken, deleteUser);

// Ruta para login
router.post('/login', loginUser);

module.exports = router;


// Configuración de Multer
const storage = multer.memoryStorage(); // Guarda en la memoria (si prefieres, puedes cambiarlo para que guarde en el disco)
const upload = multer({ storage: storage });

router.put('/users/:id', upload.single('imagen_perfil'), updateUser); // Usar el middleware de multer para manejar el archivo