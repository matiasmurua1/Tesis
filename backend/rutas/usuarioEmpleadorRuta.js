//Definición de rutas para los usuarios Empleadores
const express = require("express");

const usuarioEmpleadorRutas = express.Router();

const usuarioEmpleadorControlador = require("../controladores/usuarioEmpleadorControlador")


//Rutas usuariosEmpleadores

usuarioEmpleadorRutas.get("/usuariosEmpleadores", usuarioEmpleadorControlador.getUsuariosEmpleadores);
usuarioEmpleadorRutas.post("/usuariosEmpleadores",usuarioEmpleadorControlador.createUsuarioEmpleador);
usuarioEmpleadorRutas.put("/usuariosEmpleadores/:id",usuarioEmpleadorControlador.updateUsuarioEmpleador);
usuarioEmpleadorRutas.delete("/usuariosEmpleadores/:id",usuarioEmpleadorControlador.deleteUsuarioEmpleador);



module.exports = usuarioEmpleadorRutas;