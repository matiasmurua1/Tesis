// authControlador.js
const loginModelo = require('../modelos/loginModelo');

// Controlador para el login
const loginUsuario = async (req, res) => {
    const { email, contrasena } = req.body;

    // Validar que el email y la contraseña estén presentes
    if (!email || !contrasena) {
        return res.status(400).json({ mensaje: 'email y contraseña son obligatorios' });
    }

    try {
        // Obtener el usuario por email y contraseña
        const usuario = await loginModelo.mostrarUsuarioClientePorEmailYContrasena(email, contrasena);

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        // Respuesta exitosa sin incluir `statuscode` innecesario
        return res.status(200).json({ mensaje: 'Login exitoso', usuario });
    } catch (error) {
        console.error('Error al realizar login:', error);
        return res.status(500).json({ mensaje: 'Error al realizar login' });
    }
};

module.exports = {
    loginUsuario,
};
