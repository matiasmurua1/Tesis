//Definición de rutas para los usuarios clientes
const express = require("express");

const usuarioClienteRutas = express.Router();

const usuarioClienteControlador = require("../controladores/usuarioClienteControlador")

//Rutas usuariosClientes

usuarioClienteRutas.get("/usuariosClientes", express.json(),usuarioClienteControlador.getUsuariosClientes);
usuarioClienteRutas.get("/usuariosClientes/empleadores",express.json(), usuarioClienteControlador.getUsuariosEmpleadores);
usuarioClienteRutas.get("/usuariosClientes/:id",express.json(), usuarioClienteControlador.getUsuarioClientePorID);
usuarioClienteRutas.post("/usuariosClientes", express.json(), usuarioClienteControlador.postUsuarioCliente);
usuarioClienteRutas.put("/usuariosClientes/:id", express.json(), usuarioClienteControlador.putUsuarioCliente);
usuarioClienteRutas.delete("/usuariosClientes/:id",express.json(), usuarioClienteControlador.deleteUsuarioCliente);



module.exports = usuarioClienteRutas;