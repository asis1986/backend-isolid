var express = require('express');
var Users = require('../models/usuario');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var seed = require('../config/config').SEED;
var app = express();

 
app.post('/',(req,res)=>{
  var body = req.body;

Users.findOne({email:body.email},(err,dbUser)=>{


if(err){
 return res.status(500).json({
   ok: false,
   mensaje: "Error en la petición",
   errors: err
 })

 
}

if(!dbUser){
   return res.status(500).json({
     ok: false,
     mensaje: "el correo no existe",
     errors: err
   })

}

if(!bcrypt.compareSync(body.password, dbUser.password)){
  return res.status(500).json({
    ok: false,
    mensaje: "Password incorrecto",
    errors: err
  })
}


//Generar Token con jwt
dbUser.password=':)';
var token = jwt.sign({usuario:dbUser},seed,{expiresIn:14400});
  res.status(200).json({
    ok: true,
   usuario: dbUser,
   token: token
   
  })
  
})



 
})


module.exports = app;