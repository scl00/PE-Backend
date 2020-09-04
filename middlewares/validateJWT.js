const { response } = require ('express');
const jwt = require ('jsonwebtoken');
const validateJWT = (req, res = response, next) => {
  // x-token headers
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      status: false, 
      msg: 'Iniciar sesión'
    });
  }

  try {
    const { uid, nombre } = jwt.verify(
      token, 
      process.env.SECRET_JWT_SEDD
    );

    req.uid = uid;
    req.nombre = nombre;
    
  } catch (error) {
    return res.status(401).json({
      status: false, 
      msg: 'Token no válido'
    });
  }

  next();
}

module.exports = {
  validateJWT
}