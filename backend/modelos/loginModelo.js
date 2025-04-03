// authModelo.js
const { getConnection } = require('../src/configuracion/conexionBaseDatos');

// Verificar usuario por email y contraseña


const mostrarUsuarioClientePorEmailYContrasena = async (email, contrasena) => {
    const connection = await getConnection();
    try {
        const [usuario] = await connection.query(
            'SELECT * FROM usuario_cliente WHERE email = ? AND contrasena = ?',
            [email, contrasena]
        );
        return usuario;
    } catch (error) {
        console.error('Error al obtener el usuario cliente:', error);
        throw error;
    }
};


module.exports = {
    mostrarUsuarioClientePorEmailYContrasena
};
