const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { updateEmailUser, deleteUser, emailCheck} = require('../controllers/usuario');
const { validateJWT } = require('../middlewares/validateJWT');

router.post('/updateEmail',[
    check('email')
        .not().isEmpty().withMessage('El correo electronico es obligatorio').
        isEmail().withMessage('No es un correo electrónico válido'),
    check('newEmail')
        .not().isEmpty().withMessage('El nuevo correo electronico es obligatorio').
        isEmail().withMessage('No es un correo electrónico válido')
  ], updateEmailUser );

  router.post('/delete',[
    check('email')
        .not().isEmpty().withMessage('El correo electronico es obligatorio').
        isEmail().withMessage('No es un correo electrónico válido')
  ], deleteUser );
  
  router.post('/',[
    check('email')
        .not().isEmpty().withMessage('El correo electronico es obligatorio').
        isEmail().withMessage('No es un correo electrónico válido')
  ], emailCheck );


  module.exports = router;