//Definición de rutas para los usuarios clientes
const express = require("express");

const usuarioClienteRutas = express.Router();

const usuarioClienteControlador = require("../controladores/usuarioClienteControlador")


//Rutas usuariosClientes

usuarioClienteRutas.get("/usuariosClientes", usuarioClienteControlador.getUsuariosClientes);
usuarioClienteRutas.post("/usuariosClientes", usuarioClienteControlador.createUsuarioCliente);
usuarioClienteRutas.put("/usuariosClientes/:id", usuarioClienteControlador.updateUsuarioCliente);
usuarioClienteRutas.delete("/usuariosClientes/:id", usuarioClienteControlador.deleteUsuarioCliente);



module.exports = usuarioClienteRutas;