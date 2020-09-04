const { Schema, model} = require('mongoose');

const TipoUsuarioSchema = new Schema ({
  nombre:{
    type: String,
    required: true
  }, 
  descripcion:{
    type: String
  }
});

module.exports = model ('TipoUsuario', TipoUsuarioSchema);