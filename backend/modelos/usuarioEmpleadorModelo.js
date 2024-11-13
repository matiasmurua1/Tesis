const { getConnection } = require('../src/configuracion/conexionBaseDatos');

// Obtener todos los usuarios empleadores
const getUsuariosEmpleadores = async () => {
    const connection = await getConnection();
    try {
        const usuariosEmpleadores = await connection.query('SELECT * FROM usuario_empleador');
        return usuariosEmpleadores;
    } catch (error) {
        console.error('Error al obtener usuarios empleadores:', error);
        throw error;
    }
};

// Crear un nuevo usuario empleador
const postUsuarioEmpleador = async (usuarioEmpleador) => {
    const connection = await getConnection();
    const { nombre, contrasena, dni, tipo_servicio, telefono, experiencia, tarifa_hora } = usuarioEmpleador;
    try {
        const result = await connection.query(
            'INSERT INTO usuario_empleador (nombre, contrasena, dni, tipo_servicio, telefono, experiencia, tarifa_hora) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nombre, contrasena, dni, tipo_servicio, telefono, experiencia, tarifa_hora]
        );
        return result.insertId; // Devuelve el ID del usuario empleador insertado
    } catch (error) {
        console.error('Error al insertar el usuario empleador:', error);
        throw error;
    }
};

// Actualizar un usuario empleador por ID
const putUsuarioEmpleador = async (id, usuarioEmpleador) => {
    const connection = await getConnection();
    const { nombre, contrasena, dni, tipo_servicio, telefono, experiencia, tarifa_hora } = usuarioEmpleador;
    try {
        const result = await connection.query(
            'UPDATE usuario_empleador SET nombre = ?, contrasena = ?, dni = ?, tipo_servicio = ?, telefono = ?, experiencia = ?, tarifa_hora = ? WHERE id = ?',
            [nombre, contrasena, dni, tipo_servicio, telefono, experiencia, tarifa_hora, id]
        );
        return result.affectedRows; // Devuelve el número de filas actualizadas
    } catch (error) {
        console.error('Error al actualizar el usuario empleador:', error);
        throw error;
    }
};

// Eliminar un usuario empleador por ID
const deleteUsuarioEmpleador = async (idUsuarioEmpleador) => {
    const connection = await getConnection();
    try {
        const result = await connection.query(
            'DELETE FROM usuario_empleador WHERE id = ?',
            [idUsuarioEmpleador]
        );
        return result.affectedRows; // Devuelve el número de filas eliminadas
    } catch (error) {
        console.error('Error al eliminar el usuario empleador:', error);
        throw error;
    }
};

module.exports = {
    getUsuariosEmpleadores,
    postUsuarioEmpleador,
    putUsuarioEmpleador,
    deleteUsuarioEmpleador
};
