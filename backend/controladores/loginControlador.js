// authControlador.js
const loginModelo = require('../modelos/loginModelo')

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
