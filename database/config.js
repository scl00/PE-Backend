const mongoose =  require ('mongoose');

const dbConnetion = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('Database on line');
  }
  catch(error){
    console.log(error);
    throw new Error ('Error al inicializar la base de datos')
  }
}

module.exports = {
  dbConnetion
}