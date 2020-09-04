const { Schema, model} = require('mongoose');

const PagoSchema = Schema ({
  fecha:{
    type: Date,
    required: true
  }, 
  curso_id:{
    type: Schema.Types.ObjectId, 
    required: true 
  }, 
  usuario_id:{
    type: Schema.Types.ObjectId, 
    required: true 
  }, 
  ficha:{
    type: String, 
    required: true
  }, 
  estado_pago_id:{
    type: Schema.Types.ObjectId, 
    default: null 
  }
});

module.exports = model ('Pago', PagoSchema);