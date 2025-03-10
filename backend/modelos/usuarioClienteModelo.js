const { getConnection } = require('../src/configuracion/conexionBaseDatos');

// Obtener todos los usuarios clientes
const mostrarUsuariosClientes = async () => {
    const connection = await getConnection();
    try {
        const usuariosClientes = await connection.query('SELECT * FROM usuario_cliente');
        return usuariosClientes;
    } catch (error) {
        console.error('Error al obtener usuarios clientes:', error);
        throw error;
    }
};

// Crear un nuevo usuario cliente
const crearUsuarioCliente = async (usuarioCliente) => {
    const connection = await getConnection();
    const { nombre, contrasena, dni, telefono, direccion, id_mascota, email } = usuarioCliente; // Extrae los valores del objeto `usuarioCliente`
    try {
        const result = await connection.query(
            'INSERT INTO usuario_cliente (nombre, contrasena, dni, telefono, direccion, id_mascota, email) VALUES (?, ?, ?, ?, ?, ?,?)',
            [nombre, contrasena, dni, telefono, direccion, id_mascota, email]
        );
        return result.insertId; // Devuelve el ID del usuario cliente insertado
    } catch (error) {
        console.error('Error al insertar el usuario cliente:', error);
        throw error;
    }
};

// Actualizar un usuario cliente por ID
const actualizarUsuarioCliente = async (id, usuarioCliente) => {
    const connection = await getConnection();
    const { nombre, contrasena, dni, telefono, direccion, id_mascota, email } = usuarioCliente; // Extrae los valores del objeto `usuarioCliente`
    try {
        const result = await connection.query(
            'UPDATE usuario_cliente SET nombre = ?, contrasena = ?, dni = ?, telefono = ?, direccion = ?, id_mascota = ?, email = ? WHERE id = ?',
            [nombre, contrasena, dni, telefono, direccion, id_mascota, email, id]
        );
        return result.affectedRows; // Devuelve el número de filas actualizadas
    } catch (error) {
        console.error('Error al actualizar el usuario cliente:', error);
        throw error;
    }
};

// Eliminar un usuario cliente por ID
const eliminarUsuarioCliente = async (idUsuarioCliente) => {
    const connection = await getConnection();
    try {
        const result = await connection.query(
            'DELETE FROM usuario_cliente WHERE id = ?',
            [idUsuarioCliente]
        );
        return result.affectedRows; // Devuelve el número de filas eliminadas
    } catch (error) {
        console.error('Error al eliminar el usuario cliente:', error);
        throw error;
    }
};

module.exports = {
    mostrarUsuariosClientes, crearUsuarioCliente, actualizarUsuarioCliente, eliminarUsuarioCliente
};
