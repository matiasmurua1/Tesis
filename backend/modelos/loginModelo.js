// authModelo.js
const { getConnection } = require('../src/configuracion/conexionBaseDatos');

// Verificar usuario por email y contraseña


const getUsuarioClientePorEmailYContrasena = async (email, contrasena) => {
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
const crearUsuarioCliente = async (usuario) => {
    const connection = await getConnection();
    try {
        const [result] = await connection.query(
            'INSERT INTO usuario_cliente (email, contrasena, dni, telefono, direccion, id_mascota) VALUES (?, ?, ?, ?, ?)',
            [usuario.email, usuario.contrasena, usuario.dni, usuario.telefono, usuario.direccion, usuario.id_mascota]
        );
        return result;
    } catch (error) {
        console.error('Error al crear el usuario cliente:', error);
        throw error;
    }
};

module.exports = {
    getUsuarioClientePorEmailYContrasena,
    crearUsuarioCliente
};
