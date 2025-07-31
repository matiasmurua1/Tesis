// index.js
const express = require("express");
const morgan = require("morgan");
const database = require("./configuracion/conexionBaseDatos");
const serviciosRutas = require("../rutas/serviciosRuta");
const imagenRutas = require("../rutas/imagenesRuta");
const mascotasRutas = require("../rutas/mascotasRuta");
const resenasRutas = require("../rutas/resenasRuta");
const usuarioClienteRutas = require("../rutas/usuarioClienteRuta");
const loginRutas = require("../rutas/loginRuta");
const solicitudServiciosRutas = require("../rutas/solicitudServicioRuta")
const cors = require("cors");
const path = require('path');


// Configuración inicial
const app = express();
app.set("port", 4000);
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));
// Middlewares
app.use(morgan("dev"));

// Rutas
app.listen(app.get("port"), () => {
    console.log("Escuchando comunicaciones en el puerto " + app.get("port"));
});

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


app.use(mascotasRutas);
app.use(imagenRutas);
app.use(serviciosRutas);
app.use(resenasRutas);
app.use(usuarioClienteRutas);
app.use(loginRutas);
app.use(solicitudServiciosRutas);