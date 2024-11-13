//Definición de rutas para los servicios
const express = require("express");

const serviciosRutas = express.Router();

const serviciosControlador = require("../controladores/serviciosControlador");


//Rutas servicios

serviciosRutas.get("/servicios", serviciosControlador.getServicios);
serviciosRutas.post("/servicios", serviciosControlador.createServicio);
serviciosRutas.put("/servicios/:id", serviciosControlador.updateServicio);
serviciosRutas.delete("/servicios/:id", serviciosControlador.deleteServicio);



module.exports = serviciosRutas;