const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Esquema

const esquemaAuto = new mongoose.Schema({
  idUsuario: String,
  nombre: String,
  marca: String,
  modelo: String,
  precio: Number,
  color: String,
  fecha: {
    type: Date,
    default: Date.now,
  },
});

// generamos el JWT

esquemaAuto.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this.id,
      modelo: this.modelo,
    },
    "clave"
  );
};

// creamos los exports
const Auto = mongoose.model("auto", esquemaAuto);
module.exports.Auto = Auto;
module.exports.esquemaAuto = esquemaAuto;
