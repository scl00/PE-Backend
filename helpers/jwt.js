const jwt = require('jsonwebtoken');

const generateJWT = (uid, nombre) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, nombre };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEDD,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          reject("Algo salió mal");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT 
}