//Requerir Librerias
var express = require('express');
var mongoose = require('mongoose');
var bodyParser= require('body-parser');

//Inicializar Variables

var app = express();


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//importar rutas
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/usuario');
var loginROutes = require('./routes/login');

//conexión a la base de datos


mongoose.connection.openUri('mongodb://localhost:27017/isolidDB',(err,res)=>{

  if(err) throw err;

  console.log("Base de datos conectada")
});

//Rutas
app.use('/usuario',userRoutes);
app.use('/login', loginROutes);
app.use('/',appRoutes);



app.listen(3800,()=>{
  console.log('Servidor de express corriendo en el puerto 3800')
});