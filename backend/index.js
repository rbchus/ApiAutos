// modulos internos

const express = require("express");
const mongoose = require("mongoose");

// modulos creadeos

const auto = require("./routes/auto");
const usuario = require("./routes/usuario");
const auth = require("./routes/auth")  

//App

const app = express();

app.use(express.json());
app.use("/api/usuario/",usuario);
app.use("/api/auto/",auto);
app.use("/api/auth/",auth); 

// puerto de ejecucion

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(" Ejecutando en puerto ", port));

// registro mongo
mongoose
  .connect("mongodb://localhost/autoapp", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexion con mongo OK"))
  .catch((error) => console.log("Conexion con mongo OFF"));
