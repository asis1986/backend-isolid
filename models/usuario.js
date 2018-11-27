//requerir archivos

var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');
//crear esquemas 

var Schema = mongoose.Schema;

var rolesValidos={
  values:['ADMIN_ROLE','USER_ROLE'],
  message:'{VALUE} no es un rol permitido'
}

var usuarioSchema = new Schema({
  primer_nombre:{type:String, required:[true,'Este campo es obligatorio']},
  segundo_nombre:{type:String,required:false},
  primer_apellido:{type:String,required:[true,'Este campo es obligatorio']},
  segundo_apellido:{type:String, required:false},
  email:{type:String,unique:true, required:[true,'El correo es necesario']},
  password:{type:String,required:[true,'La contraseña es obligatoria']},
  img:{type:String,required:false},
  role:{type:String,requerid:true, default:'USER_ROLE', enum:rolesValidos}

});

usuarioSchema.plugin(uniqueValidator, {message:'El correo debe ser único'})
module.exports = mongoose.model('Users',usuarioSchema);