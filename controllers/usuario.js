const { response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const TipoUsuario = require('../models/TipoUsuario');
const router = require('../routes/usuario');

//Funcion para actualizar el email mediante el email y contraseña
//Parecido a inicio de Sesion

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
    if(!usuario){
      return res.status(400).json({
        status: false,
        msg: "Email y/o contraseña son incorrectos",
      });
    }
    await Usuario.findByIdAndUpdate( usuario.id, {email: req.body.newEmail});
    res.status(200).json({
      status: true,
      msg: 'Correo actualizado exitosamente'
    });
  }
  catch (error){
    res.status(400).json({
      status: false, 
      msg: 'Error, intentelo más tarde', error
    });
  }
}

//Funcion que elimina una instancia de la bd mediante su correo

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
        msg: "Ese email no se encuentra",
      });
    }
    
    await Usuario.findByIdAndDelete(usuario.id);
    res.status(200).json({
      status: true,
      msg: 'Eliminado exitosamente'
    });
  }

  catch (error){
    res.status(400).json({
      status: false, 
      msg: 'Error, intentelo más tarde'


    });
  }

}

//Funcion para verificar la existencioa de un email
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
     res.status(200).json({
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

//Funcion que devuelve a todos los usuarios

const getUsers = async (req, res = response ) => {
  try {
    const Usuarios = await Usuario.find();
    return res.status(200).json({
      status: true,
      Usuarios
    });
  } catch (error) {
    return res.status(500).json({
      status: false, 
      msg: 'Error, intentelo más tarde'
    });
  }
}

//Funcion que devuelve a un usuario mediante su id

const getUserById = async (req, res = response ) => {
  try {
    const usuario = await Usuario.findById(req.body.id);
    if (!usuario) {
      return res.status(400).json({
        status: false,
        msg: "Ese id no existe"
      });
    }
    return res.status(200).json({
      status: true,
      usuario
    });
  } catch (error) {
    return res.status(500).json({
      status: false, 
      msg: 'Error, intentelo más tarde'
    });
  }
}

//Funcion que permite actualizar datos basicos del usuario

const updateData = async (req, res = response ) => {
  const { email, nombre, ap_paterno, ap_materno, telefono } = req.body;
  const errors = validationResult(req);
  /*
  Funcion de prueba para verificar la existencia de puros caracteres en una cadena
  de entrada
  let StringRex = /^[A-Za-z]+$/;
      if(!nombre.match(StringRex) || !ap_materno.match(StringRex)){
        return res.status(400).json({
          status: false,
          msg: "No puede haber numeros en el nombre"
        })
      }
  */
  try {
    let usuario = await Usuario.findOne({email: req.body.email});
    if (!usuario) {
      return res.status(400).json({
        status: false,
        msg: "Ese email no existe"
      });
    }
    await Usuario.findByIdAndUpdate( usuario.id, {nombre: nombre, ap_paterno: ap_paterno
                                      ,ap_materno:ap_materno,telefono:telefono});
    return res.status(200).json({
      status: true,
      msg: 'Datos actualizados correctamente'
    });
    
  } catch (error) {
    return res.status(500).json({
      status: false, 
      msg: 'Error, intentelo más tarde'

    });
  }
  
}

  module.exports = {
    updateEmailUser,
    deleteUser,
    emailCheck,
    getUsers,
    updateData,
    getUserById
  }