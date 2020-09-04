const { Schema, model} = require('mongoose');

const PagoHistoricoSchema = Schema ({
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
    required: true 
  }, 
  archivo:{
    type: String, 
    required: true
  }
});

module.exports = model ('PagoHistorico', PagoHistoricoSchema);