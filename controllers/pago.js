const { response } = require('express');
const moment = require ('moment');

const Pago = require('../models/Pago');

const createPago = async (req, res = response ) => {

  try {

    let pago = await Pago.findOne({
      curso_id: req.params.cid,
      usuario_id: req.uid
    });

    if (pago) {
      return res.status(400).json({
        status: false, 
        msg: 'Ya tiene un pago asignado para este curso'
      });
    }

    pago = new Pago({
      fecha: moment().format(),
      curso_id: req.params.cid,
      usuario_id: req.uid,
      ficha: "No hay ficha",
    });

    const pagoDB = await pago.save();

    return res.status(201).json({
      status: true, 
      pid: pagoDB.id
    });
    
  } catch (error) {
    return res.status(500).json({
      status: false, 
      msg: 'Error, intentelo más tarde'
    });
  }
  
}

const getCursos = async (req, res = response ) => {

  try {
    const pagosCursos = await Pago.find({usuario_id: req.uid});
    return res.status(200).json({
      status: true, 
      pagosCursos
    });

  } catch (error) {
    return res.status(500).json({
      status: false, 
      msg: 'Error, intentelo más tarde'
    });
  }
  return res.status(200).json({
    status: true, 
    msg: 'Ver cursos'
  });
}


module.exports = {
  createPago, 
  getCursos
}