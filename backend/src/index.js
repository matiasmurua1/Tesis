// index.js
const express = require("express");
const morgan = require("morgan");
const database = require("./configuracion/conexionBaseDatos");
const serviciosRutas = require("../rutas/serviciosRuta");
const mascotasRutas = require("../rutas/mascotasRuta");
const resenasRutas = require("../rutas/resenasRuta");
const usuarioClienteRutas = require("../rutas/usuarioClienteRuta");
const usuarioEmpleadorRutas = require("../rutas/usuarioEmpleadorRuta");
const loginRutas = require("../rutas/loginRuta");
const solicitudServiciosRutas = require("../rutas/solicitudServicioRuta")
const cors = require("cors");


// Configuración inicial
const app = express();
app.set("port", 4000);
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));
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
app.use(loginRutas);
app.use(solicitudServiciosRutas);