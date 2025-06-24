//Definición de rutas para los servicios
const express = require("express");

const resenasRutas = express.Router();

const resenasControlador = require("../controladores/resenasControlador");


//Rutas servicios

resenasRutas.get("/resenas", resenasControlador.getResenas);
resenasRutas.post("/resenas", express.json(), resenasControlador.createResena);
resenasRutas.put("/resenas/:id", resenasControlador.updateResena);
resenasRutas.delete("/resenas/:id", resenasControlador.deleteResena);



module.exports = resenasRutas;