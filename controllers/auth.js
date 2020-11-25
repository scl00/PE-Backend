const { response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const TipoUsuario = require('../models/TipoUsuario');
const { generateJWT } = require('../helpers/jwt');

const registerUser = async (req, res = response ) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({
      status: false,
      errors: errors.mapped()
    })
  }

  try {
    // Verificar que no esté registrado el correo
    let usuario = await Usuario.findOne({email: req.body.email});
    if (usuario) {
      return res.status(400).json({
        status: false,
        msg: "Email ya está registrado",
      });
    }

    // Verificar que no esté registrado el número de cuenta o de trabajador
    if (typeof req.body.comunidad_unam !== "undefined") {
      usuario = await Usuario.findOne({ comunidad_unam: req.body.comunidad_unam });
      if (usuario) {
        return res.status(400).json({
          status: false,
          msg: "El número de cuenta o trabajador ya está registrado",
        });
      }
    }

    // Crear el usuario
    usuario = new Usuario(req.body);
    
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(req.body.password, salt);

    const tipo = await TipoUsuario.findOne({ nombre: "Usuario" }); 
    usuario.tipo_usuario = tipo.id;

    const usuariodb = await usuario.save();

    //Generar JWT 
    const token = await generateJWT( usuariodb.id, usuariodb.nombre);

    res.status(201).json({
      status: true,
      uid: usuariodb.id, 
      nombre: usuariodb.nombre,
      token
    });


  } catch (error) {
    res.status(400).json({
      status: false, 
      msg: 'Error, intentelo más tarde'
    });
  }
  
}

const loginUser = async (req, res = response ) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({
      status: false,
      errors: errors.mapped()
    })
  }
  try {
    // Verificar que el correo está registrado 
    let usuario = await Usuario.findOne({email: req.body.email});
    if (!usuario) {
      return res.status(400).json({
        status: false,
        msg: "Email y/o contraseña son incorrectos",
        msg: email
      });
    }

    const validatePassword = bcrypt.compareSync(password, usuario.password);

    if (!validatePassword){
      return res.status(400).json({
        status: false,
        msg: "Email y/o contraseña son incorrectos",
      });
    }

     //Generar JWT 
     const token = await generateJWT( usuario.id, usuario.nombre);

     res.status(201).json({
       status: true,
       uid: usuario.id, 
       name: usuario.nombre,
       password: usuario.password,
       email: usuario.email,
       token
     });
    
  } catch (error) {
    res.status(400).json({
      status: false, 
      msg: 'Error, intentelo más tarde'
    });
  }
  
}

const renewToken = async (req, res = response ) => {

  const { uid, nombre } = req;

  //Generar JWT 
  const token = await generateJWT( uid, nombre);

  res.json({
    status: true, 
    token 
  });
} 




  module.exports = {
    registerUser, 
    loginUser, 
    renewToken
  }