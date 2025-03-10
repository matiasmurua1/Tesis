//Definición de rutas para los usuarios clientes
const express = require("express");

const usuarioClienteRutas = express.Router();

const usuarioClienteControlador = require("../controladores/usuarioClienteControlador")


//Rutas usuariosClientes

usuarioClienteRutas.get("/usuariosClientes", usuarioClienteControlador.getUsuariosClientes);
usuarioClienteRutas.post("/usuariosClientes", usuarioClienteControlador.postUsuarioCliente);
usuarioClienteRutas.put("/usuariosClientes/:id", usuarioClienteControlador.putUsuarioCliente);
usuarioClienteRutas.delete("/usuariosClientes/:id", usuarioClienteControlador.deleteUsuarioCliente);



module.exports = usuarioClienteRutas;