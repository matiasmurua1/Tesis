// imagenesRutas.js
const express = require('express');
const imagenControlador = require('../controladores/imagenesControlador');

const imagenRutas = express.Router();
const multer = require("multer");
const path = require("path");

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Carpeta relativa donde guardar
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// Ruta para imagenes
imagenRutas.post('/imagenes', upload.single("path"), imagenControlador.uploadImage);

module.exports = imagenRutas;
