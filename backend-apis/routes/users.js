const verifyToken = require('../middlewares/token_validator');
const express = require('express');
const { getAllUsers, createUser, getUserById, updateUser, deleteUser, loginUser, getUserEmailById} = require('../controllers/users');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', createUser);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.get('/:userId/email', getUserEmailById);
// Ruta para login
router.post('/login', loginUser);

module.exports = router;
