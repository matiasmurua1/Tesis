// index.js
const express = require("express");
const morgan = require("morgan");
const database = require("./configuracion/conexionBaseDatos");
const serviciosRutas = require("../rutas/serviciosRuta");
const mascotasRutas = require("../rutas/mascotasRuta");
const resenasRutas = require("../rutas/resenasRuta");
const usuarioClienteRutas = require("../rutas/usuarioClienteRuta");
const usuarioEmpleadorRutas = require("../rutas/usuarioEmpleadorRuta");
const turnosRutas = require("../rutas/turnosRuta");
const loginRutas = require("../rutas/loginRuta");

// Configuración inicial
const app = express();
app.set("port", 4000);
app.use(express.json());
// Middlewares
app.use(morgan("dev"));

// Rutas
app.listen(app.get("port"), () => {
    console.log("Escuchando comunicaciones en el puerto " + app.get("port"));
});


app.use(mascotasRutas);
app.use(serviciosRutas);
app.use(resenasRutas);
app.use(usuarioClienteRutas);
app.use(usuarioEmpleadorRutas);
app.use(turnosRutas);
app.use(loginRutas);