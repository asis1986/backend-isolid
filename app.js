//Requerir Librerias
var express = require('express');
var mongoose = require('mongoose');

//Inicializar Variables

var app = express();



//conexión a la base de datos


mongoose.connection.openUri('mongodb://localhost:27017/isolidDB',(err,res)=>{

  if(err) throw err;

  console.log("Base de datos conectada")
})



//ruta de prueba
app.get('/', (req,res,next)=>{
  res.status(200).json({
    ok:true,
    mensaje:"Petición realizada Correctamente"
  })
})

app.listen(3800,()=>{
  console.log('Servidor de express corriendo en el puerto 3800')
})