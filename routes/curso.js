//Rutas de auth: host + /api/course

const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validateJWT');
const router = Router();

const { createCourse, getCourses, updateCourse, deleteCourse, getCourse } = require('../controllers/curso');
const { isDate } = require('../helpers/isDate');

// router.use( validateJWT );

// Crear un curso
router.post('/',[
  check('nombre')
    .not().isEmpty().withMessage('El nombre es un campo obligatorio'),
  check('imagen')
    .not().isEmpty().withMessage('La imagen es un campo obligatorio'),
  check('temario')
    .not().isEmpty().withMessage('El temario es un campo obligatorio'),
  check('precio')
    .not().isEmpty().withMessage('El precio es un campo obligatorio'),
  check('fecha_inicio')
    .not().isEmpty().withMessage('La fecha de inicio es un campo obligatorio')
    .custom( isDate ).withMessage('La fecha de inicio no está en un formato válido'),
  check('fecha_fin')
    .not().isEmpty().withMessage('La fecha de fin es un campo obligatorio')
    .custom( isDate ).withMessage('La fecha de fin no está en un formato válido'),
  check('cupo')
    .not().isEmpty().withMessage('El cupo es un campo obligatorio'), 
    validateJWT
] ,createCourse);

// Obtener cursos
router.get('/', getCourses);

// Actualizar un curso
router.put('/:id', [
  check('nombre')
    .not().isEmpty().withMessage('El nombre es un campo obligatorio'),
  check('imagen')
    .not().isEmpty().withMessage('La imagen es un campo obligatorio'),
  check('temario')
    .not().isEmpty().withMessage('El temario es un campo obligatorio'),
  check('precio')
    .not().isEmpty().withMessage('El precio es un campo obligatorio'),
  check('fecha_inicio')
    .not().isEmpty().withMessage('La fecha de inicio es un campo obligatorio')
    .custom( isDate ).withMessage('La fecha de inicio no está en un formato válido'),
  check('fecha_fin')
    .not().isEmpty().withMessage('La fecha de fin es un campo obligatorio')
    .custom( isDate ).withMessage('La fecha de fin no está en un formato válido'),
  check('cupo')
    .not().isEmpty().withMessage('El cupo es un campo obligatorio'), 
  validateJWT
],updateCourse);

// Eliminar un curso por ID
router.delete('/:id', validateJWT, deleteCourse);

// Obtener un curso por ID
router.get('/:id', getCourse);


module.exports = router;