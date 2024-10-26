const { Router } = require('express');
const UserController = require('../controllers/users'); 
const { check } = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.get('/', UserController.getAllUsers); 
router.post('/',
    [
        check("nombre")
            .not()
            .isEmpty()
            .withMessage("El nombre es obligatorio")
            .isLength({ max: 100 })
            .withMessage("El nombre no puede exceder los 100 caracteres"),
        
        check("email")
            .not()
            .isEmpty()
            .withMessage("El email es obligatorio")
            .isEmail()
            .withMessage("Debes proporcionar un correo electrónico válido")
            .isLength({ max: 100 })
            .withMessage("El email no puede exceder los 100 caracteres"),
        
        check("contraseña")
            .not()
            .isEmpty()
            .withMessage("La contraseña es obligatoria")
            .isLength({ min: 6 })
            .withMessage("La contraseña debe tener al menos 6 caracteres"),
        
        validateRequest,
    ],
    UserController.createUser
);
router.get('/:id', UserController.getUserById);

module.exports = router;
