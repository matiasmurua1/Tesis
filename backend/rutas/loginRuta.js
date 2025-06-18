// authRutas.js
const express = require('express');
const loginControlador = require('../controladores/loginControlador');

const loginRutas = express.Router();

// Ruta para login
loginRutas.post('/login', express.json(),loginControlador.loginUsuario);

module.exports = loginRutas;
