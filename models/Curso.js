const { Schema, model} = require('mongoose');

const CursoSchema = Schema ({
  nombre:{
    type: String, 
    required: true
  },
  imagen: {
    type: String, 
    required: true
  }, 
  temario:{
    type: String,
    required: true
  },
  precio:{
    type: Number, 
    required: true
  },
  detalles:{
    type: String
  },
  fecha_inicio:{
    type: Date, 
    required: true
  }, 
  fecha_fin:{
    type: Date, 
    required: true
  }, 
  cupo:{
    type: Number, 
    required: true
  },
  lugares_disponibles:{
    type: Number, 
    required: true
  },
  hora_inicio:{
    type: Date, 
    default: null
  },
  hora_fin:{
    type: Date, 
    default: null
  }, 
  lugar:{
    type: String,
    default: null
  }
});

module.exports = model ('Curso', CursoSchema);