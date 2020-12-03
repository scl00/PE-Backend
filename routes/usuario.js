const { Router } = require('express');
const { check, body } = require('express-validator');
const router = Router();

const { updateEmailUser, deleteUser, emailCheck, getUsers, updateData, getUserById} = require('../controllers/usuario');
const { validateJWT } = require('../middlewares/validateJWT');

router.post('/updateEmail',[
    check('email')
        .not().isEmpty().withMessage('El correo electronico es obligatorio').
        isEmail().withMessage('No es un correo electrónico válido'),
    check('newEmail')
        .not().isEmpty().withMessage('El nuevo correo electronico es obligatorio').
        isEmail().withMessage('No es un correo electrónico válido')
  ], updateEmailUser );

  router.delete('/delete',[
    check('email')
        .not().isEmpty().withMessage('El correo electronico es obligatorio').
        isEmail().withMessage('No es un correo electrónico válido')
  ], deleteUser );
  
  router.post('/',[
    check('email')
        .not().isEmpty().withMessage('El correo electronico es obligatorio').
        isEmail().withMessage('No es un correo electrónico válido')
  ], emailCheck );

  router.post('/updateData',[
    check('email')
        .not().isEmpty().withMessage('El correo electronico es obligatorio').
        isEmail().withMessage('No es un correo electrónico válido'),
    check('nombre')
        .not().isEmpty().withMessage('El nombre es obligatorio'),
    check('ap_paterno')
        .not().isEmpty().withMessage('El apellido paterno es obligatorio'),
    check('ap_materno')
        .not().isEmpty().withMessage('El apellido materno es obligatorio'),
    check('telefono')
        .not().isEmpty().withMessage('El telefono es obligatorio'),
  ], updateData);
  
  
  router.get('/users', getUsers);

  router.get('/userid',[
      check('id')
      .not().isEmpty().withMessage('El Id es obligatorio')
  ],getUserById);


  module.exports = router;