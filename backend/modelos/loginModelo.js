// authModelo.js
const { getConnection } = require('../src/configuracion/conexionBaseDatos');

// Verificar usuario por nombre y contraseña
const getUsuarioClientePorNombreYContrasena = async (nombre, contrasena) => {
    const connection = await getConnection();
    try {
        const [usuario] = await connection.query(
            'SELECT * FROM usuario_cliente WHERE nombre = ? AND contrasena = ?',
            [nombre, contrasena]
        );
        return usuario;
    } catch (error) {
        console.error('Error al obtener el usuario cliente:', error);
        throw error;
    }
};

module.exports = {
    getUsuarioClientePorNombreYContrasena,
};
