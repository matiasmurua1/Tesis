const { getConnection } = require('../src/configuracion/conexionBaseDatos');

function formatearFechaLocal(datetimeStr) {
  const date = new Date(datetimeStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}




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

const getSolicitudesServicioPorEmpleador = async (id) => {
    const connection = await getConnection();
    try {
        const solicitudes = await connection.query(`SELECT 
                ss.id ,
                ss.id_usuario_cliente,
                ss.id_usuario_empleador,
                ss.id_servicio,
                ss.estado,
                ss.fecha_hora,
                ss.id_resena,
                r.id AS resena_id,
                r.puntaje,
                r.comentario
             FROM solicitud_servicio ss
             LEFT JOIN resena r ON ss.id_resena = r.id
             WHERE ss.id_usuario_empleador = ?`, [id]);
        if (solicitudes.length === 0) { // Si no hay solicitudes, devuelve un array vacío
            return []; // Devuelve un array vacío si no hay solicitudes
            }
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
        const solicitudes = await connection.query(`SELECT 
                ss.id ,
                ss.id_usuario_cliente,
                ss.id_usuario_empleador,
                ss.id_servicio,
                ss.estado,
                ss.fecha_hora,
                ss.id_resena,
                r.id AS resena_id,
                r.puntaje,
                r.comentario
             FROM solicitud_servicio ss
             LEFT JOIN resena r ON ss.id_resena = r.id
             WHERE ss.id_usuario_cliente = ?`, [idUsuarioCliente]);
        if (solicitudes.length === 0) { // Si no hay solicitudes, devuelve un array vacío
            return []; // Devuelve un array vacío si no hay solicitudes
            }
        return solicitudes;
    } catch (error) {
        console.error('Error al obtener las solicitudes de servicio:', error);
        throw error;
    }
};

// Obtener todas las solicitudes de servicio
const getSolicitudServicioPorID = async (id) => {
    const connection = await getConnection();
    try {
        const solicitud = await connection.query('SELECT * FROM solicitud_servicio WHERE id = ?', [id]);
        if (solicitud.length == 0) { 
            return {}; // Devuelve un objeto vacío si no hay solicitudes
            }
        return solicitud[0];
    } catch (error) {
        console.error('Error al obtener las solicitudes de servicio:', error);
        throw error;
    }
};

// Crear una nueva solicitud de servicio
const postSolicitudServicio = async (solicitud) => {
  const connection = await getConnection();

  const { id_usuario_cliente, id_servicio, id_usuario_empleador, estado, fecha } = solicitud;
  console.log('🕓 Fecha final a guardar:', fecha);

  try {
    const result = await connection.query(
      'INSERT INTO solicitud_servicio (fecha_hora, id_usuario_cliente, id_servicio, id_usuario_empleador, estado) VALUES (?, ?, ?, ?, ?)',
      [fecha, id_usuario_cliente, id_servicio, id_usuario_empleador, estado] // Aquí usamos "fecha" que viene ya formateada
    );

    console.log("result:", result);
    return result;
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

// Actualizar una solicitud de servicio por ID
const patchSolicitudServicio = async (id, columna) => {
    const connection = await getConnection();
    
    try {
        const result = await connection.query(
            `UPDATE solicitud_servicio SET ${columna.nombre} = ? WHERE id = ?`,
            [columna.valor, id]
        );
        return result.affectedRows; // Devuelve el número de filas actualizadas
    } catch (error) {
        console.error('Error al actualizar la solicitud de servicio:', error);
        throw error;
    }
};

const editarEstadoSolicitudServicio = async (id, solicitud) => {
    const connection = await getConnection();
    const { estado } = solicitud;
    try {
        const result = await connection.query(
            'UPDATE solicitud_servicio SET estado = ? WHERE id = ?',
            [estado, id]
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
    getSolicitudesServicioPorCliente, 
    getSolicitudServicioPorID,
    getSolicitudesServicioPorEmpleador, 
    editarEstadoSolicitudServicio,
    patchSolicitudServicio
};
