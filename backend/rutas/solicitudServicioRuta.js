//Definición de rutas para los servicios
const express = require("express");

const solicitudServicioRutas = express.Router();

const solicitudServiciosControlador = require("../controladores/solicitudServiciosControlador");


//Rutas servicios

solicitudServicioRutas.get("/solicitudServicios", solicitudServiciosControlador.getSolicitudesServicio);
solicitudServicioRutas.post("/solicitudServicios", solicitudServiciosControlador.createSolicitudServicio);
solicitudServicioRutas.put("/solicitudServicios/:id", solicitudServiciosControlador.updateSolicitudServicio);
solicitudServicioRutas.delete("/solicitudServicios/:id", solicitudServiciosControlador.deleteSolicitudServicio);



module.exports = solicitudServicioRutas;