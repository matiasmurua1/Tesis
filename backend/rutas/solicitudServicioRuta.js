//Definición de rutas para los servicios
const express = require("express");

const solicitudServicioRutas = express.Router();

const solicitudServiciosControlador = require("../controladores/solicitudServiciosControlador");


//Rutas servicios

solicitudServicioRutas.get("/solicitudServicios", solicitudServiciosControlador.getSolicitudesServicio);
solicitudServicioRutas.get("/solicitudServicios/:id", solicitudServiciosControlador.getSolicitudServicioPorID);
solicitudServicioRutas.get("/solicitudServicios/cliente/:id", solicitudServiciosControlador.getSolicitudesServicioPorCliente);
solicitudServicioRutas.get("/solicitudServicios/empleador/:id", solicitudServiciosControlador.getSolicitudesServicioPorEmpleador);
solicitudServicioRutas.post("/solicitudServicios", express.json(), solicitudServiciosControlador.createSolicitudServicio);
solicitudServicioRutas.put("/solicitudServicios/:id",  express.json(), solicitudServiciosControlador.updateSolicitudServicio);
solicitudServicioRutas.patch("/solicitudServicios/:id",  express.json(), solicitudServiciosControlador.updateEstadoSolicitudServicio);
solicitudServicioRutas.delete("/solicitudServicios/:id", solicitudServiciosControlador.deleteSolicitudServicio);



module.exports = solicitudServicioRutas;