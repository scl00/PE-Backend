const { response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const TipoUsuario = require('../models/TipoUsuario');
/*
const updateEmailUser = async (req, res = response ) => {
  const { email, password , newEmail } = req.body;
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
      });
    }

    const validatePassword = bcrypt.compareSync(password, usuario.password);

    if (!validatePassword){
      return res.status(400).json({
        status: false,
        msg: "Email y/o contraseña son incorrectos",
      });
    }
     //await Usuario.findByIdAndUpdate(req.params.id, { email });
     //"5fb32312b78f0829a4d1b0d5"
     await Usuario.findByIdAndUpdate( usuario.id, {email: req.body.newEmail});
     //Generar JWT 
     const token = await generateJWT( usuario.id, usuario.nombre);
     res.status(201).json({
       status: true,
       uid: usuario.id, 
       name: usuario.nombre,
       password: usuario.password,
       email: usuario.email,
       
       newEmail,
       token
     })
     ;
    
  } catch (error) {
    res.status(400).json({
      status: false, 
      msg: 'Error, intentelo más tarde'
    });
  }
  
}*/
const updateEmailUser = async (req, res = response ) => {
  const { email, password , newEmail } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({
      status: false,
      errors: errors.mapped()
    })
  }
  try{
    let usuario = await Usuario.findOne({email: req.body.email});
    if (!usuario) {
      return res.status(400).json({
        status: false,
        msg: "Email y/o contraseña son incorrectos",
        msg: email
      });
    }
    
    await Usuario.findByIdAndUpdate( usuario.id, {email: req.body.newEmail});
  }
  catch (error){
    res.status(400).json({
      status: false, 
      msg: 'Error, intentelo más tarde', error

    });
  }

}

const deleteUser = async (req, res = response ) => {
  const { email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({
      status: false,
      errors: errors.mapped()
    })
  }
  try{
    let usuario = await Usuario.findOne({email: req.body.email});
    if (!usuario) {
      return res.status(400).json({
        status: false,
        msg: "Email y/o contraseña son incorrectos",
      });
    }
    
    await Usuario.findByIdAndDelete(usuario.id);
    res.status(201).json({
      status: true,
      uid: usuariodb.id, 
      nombre: usuariodb.nombre,
      msg: 'Eliminado exitosamente'
    });
  }
  catch (error){
    res.status(400).json({
      status: false, 
      msg: 'Error, intentelo más tarde', error

    });
  }

}

const emailCheck = async (req, res = response ) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({
      status: false,
      errors: errors.mapped()
    })
  }
  try {
    let usuario = await Usuario.findOne({email: req.body.email});
    if (!usuario) {
      return res.status(400).json({
        status: false,
        msg: "Ese email no existe"
      });
    }
     res.status(201).json({
       status: true,
       uid: usuario.id, 
       name: usuario.nombre,
       password: usuario.password,
       email: usuario.email,
       msg: 'Email encontrado'
     });
    
  } catch (error) {
    res.status(400).json({
      status: false, 
      msg: 'Error, intentelo más tarde'
    });
  }
  
}

  module.exports = {
    updateEmailUser,
    deleteUser,
    emailCheck
  }