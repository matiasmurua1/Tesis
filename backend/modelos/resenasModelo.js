const { getConnection } = require('../src/configuracion/conexionBaseDatos');

// Obtener todas las resenas
const getResenas = async () => {
    const connection = await getConnection();
    try {
        const resenas = await connection.query('SELECT * FROM resena');
        return resenas;
    } catch (error) {
        console.error('Error al obtener resenas:', error);
        throw error;
    }
};

// Crear una nueva resena
const postResena = async (resena) => {
    const connection = await getConnection();
    const { nombre_usuario_cliente, comentario, id_solicitud_servicio } = resena; // Extrae los valores del objeto `resena`
    try {
        const result = await connection.query(
            'INSERT INTO resena (nombre_usuario_cliente, comentario, id_solicitud_servicio) VALUES (?, ?, ?)',
            [nombre_usuario_cliente, comentario, id_solicitud_servicio]
        );
        return result.insertId; // Devuelve el ID de la resena insertada
    } catch (error) {
        console.error('Error al insertar la resena:', error);
        throw error;
    }
};

// Actualizar una resena por ID
const putResena = async (id, resena) => {
    const connection = await getConnection();
    const { nombre_usuario_cliente, comentario, id_solicitud_servicio } = resena; // Extrae los valores del objeto `resena`
    try {
        const result = await connection.query(
            'UPDATE resena SET nombre_usuario_cliente = ?, comentario = ?, id_solicitud_servicio = ? WHERE id = ?',
            [nombre_usuario_cliente, comentario, id_solicitud_servicio, id]
        );
        return result.affectedRows; // Devuelve el número de filas actualizadas
    } catch (error) {
        console.error('Error al actualizar la resena:', error);
        throw error;
    }
};

// Eliminar una resena por ID
const deleteResena = async (idResena) => {
    const connection = await getConnection();
    try {
        const result = await connection.query(
            'DELETE FROM resena WHERE id = ?',
            [idResena]
        );
        return result.affectedRows; // Devuelve el número de filas eliminadas
    } catch (error) {
        console.error('Error al eliminar la resena:', error);
        throw error;
    }
};

module.exports = {
    getResenas, postResena, putResena, deleteResena
};
