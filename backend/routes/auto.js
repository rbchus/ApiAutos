// modulos intenos

const express = require("express");
const router = express.Router();

//invocamos modulos creados

const { Auto } = require("../model/auto");
const { Usuario } = require("../model/usuario");
const auth = require("../middleware/auth");

// ruta

router.post("/", auth, async (req, res) => {
  // revisamos si existe el usuario
  const usuario = await Usuario.findById(req.usuario._id);
  // Si el usuario no existe
  if (!usuario) return res.status(400).send("El usuario no existe");

  let auto = await Auto.findOne({ modelo: req.body.modelo });
  //si el usuaario existe en BD
  if (auto) return res.status(400).send("El modelo  ya existe en la coleccion");
  // si el correo no existe
  auto = new Auto({
    idUsuario: usuario._id,
    nombre: req.body.nombre,
    marca: req.body.marca,
    modelo: req.body.modelo,
    precio: req.body.precio,
    color: req.body.color,
  });

  //  guardamos el usuario se genera el JWT

  const result = await auto.save();
  const jwtToken = auto.generateJWT();
  res.status(200).send({ jwtToken });
});

// exports
module.exports = router;
