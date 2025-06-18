//Definición de rutas para los servicios
const express = require("express");

const mascotasRuta = express.Router();

const mascotasControlador = require("../controladores/mascotasControlador");

mascotasRuta.get("/mascotas", mascotasControlador.getMascotas);
mascotasRuta.get("/mascotas/user/:id", mascotasControlador.getMascotasPorUsuario);
mascotasRuta.post("/mascotas", express.json(),mascotasControlador.createMascotas);
mascotasRuta.put("/mascotas/:id", mascotasControlador.updateMascota);
mascotasRuta.delete("/mascotas/:id", mascotasControlador.deleteMascota);

//Rutas mascotas
module.exports = mascotasRuta;