//Rutas de auth: host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { registerUser, loginUser, renewToken} = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validateJWT');

// Registro de un usuario
router.post('/registerUser',[
    check('nombre')
      .not().isEmpty().withMessage('El nombre es obligatorio'),
    check('ap_paterno')
      .not().isEmpty().withMessage('El apellido paterno es obligatorio'),
    check('ap_materno')
      .not().isEmpty().withMessage('El apellido materno es obligatorio'),  
    check('email')
      .not().isEmpty().withMessage('El correo electrónico es obligatorio')
      .isEmail().withMessage('No es un correo electrónico válido'),
    check('password')
      .not().isEmpty().withMessage('La contraseña es obligatoria')
      .isLength({ min: 6}).withMessage('La constraseña debe tener por lo menos 6 caracteres')
  ], registerUser );

// Inicio de sesión de un usuario
router.post('/',[
  check('email')
      .not().isEmpty().withMessage('El correo electrónico es obligatorio')
      .isEmail().withMessage('No es un correo electrónico válido'),
    check('password')
      .not().isEmpty().withMessage('La contraseña es obligatoria')
      .isLength({ min: 6}).withMessage('La constraseña debe tener por lo menos 6 caracteres')
],loginUser );


// Renovación del JWT
router.get('/renewToken', validateJWT, renewToken );


module.exports = router;