const { body, validationResult } = require('express-validator');

const validateLogin = [
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('contraseña').notEmpty().withMessage('La contraseña es obligatoria'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Usarlo en la ruta de login
router.post('/login', validateLogin, loginUser);
