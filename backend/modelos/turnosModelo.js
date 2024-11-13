const { getConnection } = require('../src/configuracion/conexionBaseDatos');

// Obtener todos los turnos
const getTurnos = async () => {
    const connection = await getConnection();
    try {
        const turnos = await connection.query('SELECT * FROM turno');
        return turnos;
    } catch (error) {
        console.error('Error al obtener turnos:', error);
        throw error;
    }
};

// Crear un nuevo turno
const postTurno = async (turno) => {
    const connection = await getConnection();
    const {fecha_hora, proveedor, ubicacion, estado, id_solicitud_servicio } = turno; // Extrae los valores del objeto `turno`
    try {
        const result = await connection.query(
            'INSERT INTO turno (fecha_hora, proveedor, ubicacion, estado, id_solicitud_servicio) VALUES (?, ?, ?, ?, ?)',
            [fecha_hora, proveedor, ubicacion, estado, id_solicitud_servicio]
        );
        return result.insertId; // Devuelve el ID del turno insertado
    } catch (error) {
        console.error('Error al insertar el turno:', error);
        throw error;
    }
};

// Actualizar un turno por ID
const putTurno = async (id, turno) => {
    const connection = await getConnection();
    const {fecha_hora, proveedor, ubicacion, estado, id_solicitud_servicio } = turno; // Extrae los valores del objeto `turno`
    try {
        const result = await connection.query(
            'UPDATE turno SET fecha_hora = ?, proveedor = ?, ubicacion = ?, estado = ?, id_solicitud_servicio = ? WHERE id = ?',
            [fecha_hora, proveedor, ubicacion, estado, id_solicitud_servicio, id]
        );
        return result.affectedRows; // Devuelve el número de filas actualizadas
    } catch (error) {
        console.error('Error al actualizar el turno:', error);
        throw error;
    }
};

// Eliminar un turno por ID
const deleteTurno = async (idTurno) => {
    const connection = await getConnection();
    try {
        const result = await connection.query(
            'DELETE FROM turno WHERE id = ?',
            [idTurno]
        );
        return result.affectedRows; // Devuelve el número de filas eliminadas
    } catch (error) {
        console.error('Error al eliminar el turno:', error);
        throw error;
    }
};

module.exports = {
    getTurnos, postTurno, putTurno, deleteTurno
};
