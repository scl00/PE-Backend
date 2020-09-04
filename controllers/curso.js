const { response } = require('express');
const { validationResult } = require('express-validator');
const Curso =  require('../models/Curso');
const TipoUsuario = require('../models/TipoUsuario');
const Usuario =  require('../models/Usuario');

const createCourse = async (req, res = response ) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({
      status: false,
      errors: errors.mapped()
    })
  }

  
  try {

    const usuario = await Usuario.findById(req.uid);
    const tipo = await TipoUsuario.findOne({ nombre: "Administrador" });

    if (usuario.tipo_usuario.toString() !== tipo.id.toString()) {
      return res.status(400).json({
        status: false,
        msg: "No tiene los permisos necesarios para crear un curso",
      });
    }

    const curso = new Curso(req.body);

    curso.lugares_disponibles = req.body.cupo;

    const cursoDB = await curso.save();

    return res.status(201).json({
      status: true,
      cid: cursoDB.id,
      name: cursoDB.nombre,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error, intentelo más tarde",
    });
  }
}

const getCourses = async (req, res = response ) => {

  try {
    const cursos = await Curso.find();

    return res.status(200).json({
      status: true,
      cursos
    });
    
  } catch (error) {
    return res.status(500).json({
      status: false, 
      msg: 'Error, intentelo más tarde'
    });
  }
  
}

const updateCourse = async (req, res = response ) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({
      status: false,
      errors: errors.mapped()
    })
  }
  try {

    // Verificar que existe el curso
    const curso = await Curso.findById(req.params.id);

    if ( !curso){
      return res.status(404).json({
        status: false,
        msg: 'No se encontro el curso'
      });
    }


    // Verificar que el usuario cuente con los permisos para modificar un curso
    const usuario = await Usuario.findById(req.uid);
    const tipo = await TipoUsuario.findOne({ nombre: "Administrador" });

    
    if (usuario.tipo_usuario.toString() !== tipo.id.toString()) {
      return res.status(400).json({
        status: false,
        msg: "No tiene los permisos necesarios para modificar un curso",
      });
    }
  
    // Actualizar el curso 
    await Curso.findByIdAndUpdate (req.params.id, req.body); 

    return res.json({
      status: true,
      msg: 'Curso modificado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({
      status: false, 
      msg: 'Error, intentelo más tarde'
    });
  }
}

const deleteCourse = async (req, res = response ) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({
      status: false,
      errors: errors.mapped()
    })
  }
  try {

    // Verificar que existe el curso
    const curso = await Curso.findById(req.params.id);

    if ( !curso){
      return res.status(404).json({
        status: false,
        msg: 'No se encontro el curso'
      });
    }

    // Verificar que el usuario cuente con los permisos para eliminar un curso
    const usuario = await Usuario.findById(req.uid);
    const tipo = await TipoUsuario.findOne({ nombre: "Administrador" });


    if (usuario.tipo_usuario.toString() !== tipo.id.toString()) {
      return res.status(400).json({
        status: false,
        msg: "No tiene los permisos necesarios para eliminar un curso",
      });
    }

    // Eliminar curso
    await Curso.findByIdAndDelete(req.params.id);

    return res.json({
      status: true,
      msg: 'Curso eliminado exitosamente'
    });

  } catch ( error ){
    console.log(error);
    return res.status(500).json({
      status: false, 
      msg: 'Error, intentelo más tarde'
    });
  }
}

const getCourse = async (req, res = response ) => {

}

module.exports = {
  createCourse, 
  getCourses,
  updateCourse, 
  deleteCourse, 
  getCourse, 
}

