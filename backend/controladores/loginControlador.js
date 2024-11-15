// authControlador.js
const loginModelo = require('../modelos/loginModelo')

// Controlador para el login
const loginUsuario = async (req, res) => {
    const { nombre, contrasena } = req.body;

    // Validar que el nombre y la contraseña estén presentes
    if (!nombre || !contrasena) {
        return res.status(400).json({ mensaje: 'Nombre y contraseña son obligatorios' });
    }

    try {
        // Obtener el usuario por nombre y contraseña
        const usuario = await loginModelo.getUsuarioClientePorNombreYContrasena(nombre, contrasena);

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        // Aquí podrías generar un token JWT o establecer una sesión
        res.status(200).json({ mensaje: 'Login exitoso', usuario });
    } catch (error) {
        console.error('Error al realizar login:', error);
        res.status(500).json({ mensaje: 'Error al realizar login' });
    }
};

module.exports = {
    loginUsuario,
};
