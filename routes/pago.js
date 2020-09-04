//Rutas de auth: host + /api/pago

const { Router } = require('express');
const router = Router();

const { createPago, getCursos } = require('../controllers/pago');
const { validateJWT } = require('../middlewares/validateJWT');

router.post('/:cid', validateJWT ,createPago);
router.get('/', validateJWT, getCursos);


module.exports = router;