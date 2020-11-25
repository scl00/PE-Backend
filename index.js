const express = require('express');
require('dotenv').config();
const cors = require ('cors');
const { dbConnetion } = require ('./database/config');

const app = express();

dbConnetion();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', require('./routes/auth')); 
app.use('/api/course', require('./routes/curso'));
app.use('/api/pago', require('./routes/pago'));
app.use('/api/user', require('./routes/usuario'));


app.listen( process.env.PORT , () => {
  console.log(`Servidor en el puerto ${  process.env.PORT }`);
});