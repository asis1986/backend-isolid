var jwt = require('jsonwebtoken');

var seed = require('../config/config').SEED;

exports.verificaToken = function (req, res, next) {

  var token = req.query.token;
  jwt.verify(token, seed, (err, decoded) => {

    if (err) {
      return res.status(401).json({
        ok: false,
        mensaje: "Token Incorrecto",
        errors: err
      })
    }

    req.usuario = decoded.usuario;
    next();

  });

}
