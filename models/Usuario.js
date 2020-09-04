const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema ({
  nombre:{
    type: String,
    required: true
  }, 
  ap_paterno:{
    type: String,
    required: true
  },
  ap_materno: {
    type: String,
    required: true
  }, 
  email:{
    type: String,
    required: true, 
    unique: true
  }, 
  password:{
    type: String,
    required: true, 
  }, 
  telefono:{
    type: Number, 
    default: null
  }, 
  comunidad_unam:{
    type: String, 
    default: null
  }, 
  RFC: {
    type: String, 
    default: null
  },
  tipo_usuario:{
    type: Schema.Types.ObjectId, 
    default: null
  }
});

module.exports = model ('Usuario', UsuarioSchema);