const loginModelo = require('../modelos/loginModelo');
const jwt = require("jsonwebtoken");

// Controlador para el login
const loginUsuario = async (req, res) => {
    const { email, contrasena } = req.body;

    // Validar que el email y la contraseña estén presentes
    if (!email || !contrasena) {
        return res.status(400).json({ mensaje: 'email y contraseña son obligatorios' });
    }

    try {
        // Obtener el usuario por email y contraseña
        let permisos;
        const usuario = await loginModelo.mostrarUsuarioClientePorEmailYContrasena(email, contrasena);
        switch (usuario.id_rol) {
            case 1:
                permisos = 'EMPLEADOR';
                break;
            case 2:
                permisos = 'CLIENTE';
                break;
            default:
                permisos = 'ADMIN';
        }
        const payload = {
            id: usuario.id,
            username: usuario.email,
            rol: permisos, 
            servicios: usuario.id_servicio
          }
        const token = jwt.sign(payload, "token", { expiresIn: "1h" });
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        // Respuesta exitosa sin incluir `statuscode` innecesario
        return res.status(200).json({ mensaje: 'Login exitoso', token });
    } catch (error) {
        console.error('Error al realizar login:', error);
        return res.status(500).json({ mensaje: 'Error al realizar login' });
    }
};

module.exports = {
    loginUsuario,
};
