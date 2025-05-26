const { getConnection } = require('../src/configuracion/conexionBaseDatos');

// Obtener todas las solicitudes de servicio
const getSolicitudesServicio = async () => {
    const connection = await getConnection();
    try {
        const solicitudes = await connection.query('SELECT * FROM solicitud_servicio');
        return solicitudes;
    } catch (error) {
        console.error('Error al obtener las solicitudes de servicio:', error);
        throw error;
    }
};

// Obtener todas las solicitudes de servicio
const getSolicitudesServicioPorCliente = async (idUsuarioCliente) => {
    const connection = await getConnection();
    try {
        const solicitudes = await connection.query('SELECT * FROM solicitud_servicio WHERE id_usuario_cliente = ?', [idUsuarioCliente]);
        if (solicitudes.length === 0) { // Si no hay solicitudes, devuelve un array vacío
            return []; // Devuelve un array vacío si no hay solicitudes
            }
        return solicitudes;
    } catch (error) {
        console.error('Error al obtener las solicitudes de servicio:', error);
        throw error;
    }
};

// Crear una nueva solicitud de servicio
const postSolicitudServicio = async (solicitud) => {
    const connection = await getConnection();
    console.log("ssssssssss:" , solicitud)

    const { fecha_hora, id_usuario_cliente, id_servicio, id_usuario_empleador, estado } = solicitud;
    try {
        const result = await connection.query(
            'INSERT INTO solicitud_servicio (fecha_hora, id_usuario_cliente, id_servicio, id_usuario_empleador, estado) VALUES (?, ?, ?, ?, ?)',
            [fecha_hora, id_usuario_cliente, id_servicio, id_usuario_empleador, estado]
        );
    console.log("sssssssssaaaaaaaaaas:" , result)

        return result.insertId; // Devuelve el ID de la solicitud insertada
    } catch (error) {
        console.error('Error al insertar la solicitud de servicio:', error);
        throw error;
    }
};

// Actualizar una solicitud de servicio por ID
const putSolicitudServicio = async (id, solicitud) => {
    const connection = await getConnection();
    const { fecha_hora, id_usuario_cliente, id_servicio, id_usuario_empleador, estado } = solicitud;
    try {
        const result = await connection.query(
            'UPDATE solicitud_servicio SET fecha_hora = ?, id_usuario_cliente = ?, id_servicio = ?, id_usuario_empleador = ?, estado = ? WHERE id = ?',
            [fecha_hora, id_usuario_cliente, id_servicio, id_usuario_empleador, estado, id]
        );
        return result.affectedRows; // Devuelve el número de filas actualizadas
    } catch (error) {
        console.error('Error al actualizar la solicitud de servicio:', error);
        throw error;
    }
};

// Eliminar una solicitud de servicio por ID
const deleteSolicitudServicio = async (idSolicitud) => {
    const connection = await getConnection();
    try {
        const result = await connection.query(
            'DELETE FROM solicitud_servicio WHERE id = ?',
            [idSolicitud]
        );
        return result.affectedRows; // Devuelve el número de filas eliminadas
    } catch (error) {
        console.error('Error al eliminar la solicitud de servicio:', error);
        throw error;
    }
};

module.exports = {
    getSolicitudesServicio,
    postSolicitudServicio,
    putSolicitudServicio,
    deleteSolicitudServicio,
    getSolicitudesServicioPorCliente
};
