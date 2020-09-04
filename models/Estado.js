const { Schema, model} = require('mongoose');

const EstadoPagoSchema = new Schema ({
  nombre:{
    type: String,
    required: true
  }, 
  descripcion:{
    type: String,
    required: true
  }

});

module.exports = model ('EstadoPago', EstadoPagoSchema);