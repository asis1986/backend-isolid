var express = require('express');
var Users = require('../models/usuario');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//var seed = require('../config/config').SEED;

var mdAuth = require('../middlewares/autenticacion');
var app = express();


app.get('/', (req, res, next) => {

  Users.find({}, 'primer_nombre segundo_nombre primer_apellido segundo_apellido email img role')
    .exec(
      (err, users) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: "Error en la petición",
            errors: err
          })
        }

        res.status(200).json({
          ok: true,
          users: users
        })
      })


});

//actualizar Usuario

app.put('/:id', mdAuth.verificaToken, (req, res) => {

  var body = req.body;
  var id = req.params.id;
  Users.findById(id, (err, usuario) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error en la petición",
        errors: err
      })
    }
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        mensaje: "No existe Usuario",
        errors: {
          message: 'No existe un usuario con ese id'
        }
      })
    }
    usuario.primer_nombre = body.primer_nombre;
    usuario.segundo_nombre = body.segundo_nombre;
    usuario.primer_apellido = body.primer_apellido;
    usuario.segundo_apellido = body.segundo_apellido,
      usuario.email = body.email;
    usuario.role = body.role;

    usuario.save((err, saveUser) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al Actualizar usuario",
          errors: err
        })
      }
      saveUser.password = ':)';
      res.status(200).json({
        ok: true,
        usuario: saveUser
      })

    });


    //saveUser.password =':)'

  });


})

//Crear Un nuevo Usuario

app.post('/', mdAuth.verificaToken, (req, res) => {
  var body = req.body;

  var usuario = new Users({
    primer_nombre: body.primer_nombre,
    segundo_nombre: body.segundo_nombre,
    primer_apellido: body.primer_apellido,
    segundo_apellido: body.segundo_apellido,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    img: body.img,
    role: body.role
  });

  usuario.save((err, saveUser) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error en la petición",
        errors: err
      })
    }
    res.status(201).json({
      ok: true,
      usuario: saveUser,
      usuarioToken: req.usuario
    })

  });
})

//eliminar un usuario
app.delete('/:id', mdAuth.verificaToken, (req, res) => {
  var id = req.params.id;
  Users.findOneAndRemove(id, (err, deleteUser) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error en la petición",
        errors: err
      })
    }
    res.status(201).json({
      ok: true,
      usuario: deleteUser
    })

  })
})
module.exports = app;
