//Definición de rutas para los turnos
const express = require("express");

const turnosRutas = express.Router();

const turnosControlador = require("../controladores/turnosControlador");


//Rutas turnos

turnosRutas.get("/turnos", turnosControlador.getTurnos);
turnosRutas.post("/turnos", turnosControlador.createTurno);
turnosRutas.put("/turnos/:id", turnosControlador.updateTurno);
turnosRutas.delete("/turnos/:id", turnosControlador.deleteTurno);



module.exports = turnosRutas;