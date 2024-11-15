// authRutas.js
const express = require('express');
const loginControlador = require('../controladores/loginControlador');

const loginRutas = express.Router();

// Ruta para login
loginRutas.get('/login', loginControlador.loginUsuario);

module.exports = loginRutas;
