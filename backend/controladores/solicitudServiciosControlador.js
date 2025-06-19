// Lógica para manejar las peticiones de solicitudes de servicio
const solicitudServicioModelo = require('../modelos/solicitudServiciosModelo');
const estadoPrioridad = {
    "pendiente": 0,
    "en curso": 1,
    "aceptada": 2,
    "finalizada": 3
  };
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

// Controlador para obtener todas las solicitudes de servicio
const getSolicitudesServicio = async (req, res) => {
  try {
    const solicitudes = await solicitudServicioModelo.getSolicitudesServicio(); // Llama a la función del modelo
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener solicitudes de servicio:', error);
    res.status(500).json({ message: 'Error al obtener solicitudes de servicio' });
  }
};

const getSolicitudesServicioPorCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const solicitudes = await solicitudServicioModelo.getSolicitudesServicioPorCliente(id);

    const solicitudesOrdenadas = solicitudes.sort((a, b) => {
      const prioridadA = estadoPrioridad[a.estado?.toLowerCase().trim()] ?? Infinity;
      const prioridadB = estadoPrioridad[b.estado?.toLowerCase().trim()] ?? Infinity;
      return prioridadA - prioridadB;
    });

    res.json(solicitudesOrdenadas);
  } catch (error) {
    console.error('Error al obtener solicitudes de servicio:', error);
    res.status(500).json({ message: 'Error al obtener solicitudes de servicio' });
  }
};

const getSolicitudesServicioPorEmpleador = async (req, res) => {
  const { id } = req.params;
  try {
    const solicitudes = await solicitudServicioModelo.getSolicitudesServicioPorEmpleador(id); 
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener solicitudes de servicio:', error);
    res.status(500).json({ message: 'Error al obtener solicitudes de servicio' });
  }
};


const getSolicitudServicioPorID = async (req, res) => {
  const { id } = req.params;
  try {
    const solicitud = await solicitudServicioModelo.getSolicitudServicioPorID(id); 
    res.json(solicitud);
  } catch (error) {
    console.error('Error al obtener solicitudes de servicio:', error);
    res.status(500).json({ message: 'Error al obtener solicitudes de servicio' });
  }
};



const formatearFechaLocal = (datetimeStr) => {
  // Extiende dayjs para usar el formato personalizado
  dayjs.extend(customParseFormat);

  // Intenta parsear según el formato DD/MM/YYYY HH:mm
  const fecha = dayjs(datetimeStr, 'DD/MM/YYYY HH:mm');
  if (!fecha.isValid()) {
    console.error('❌ Fecha inválida:', datetimeStr); // Error para depuración
    return null; // Devuelve null si la fecha es inválida
  }

  // Formatear a "YYYY-MM-DD HH:mm:ss" para MySQL
  return fecha.format('YYYY-MM-DD HH:mm:ss');
};

const createSolicitudServicio = async (req, res) => {
  console.log("createSolicitudServicio body: ", req.body);

  try {
    // Formatear la fecha recibida del body
    const fechaHoraFormateada = formatearFechaLocal(req.body.fecha_hora);
    if (!fechaHoraFormateada) {
      return res.status(400).json({ error: 'Fecha y hora inválida' }); // Validación de fecha
    }

    // Crear un nuevo objeto de solicitud con la fecha formateada
    const solicitud = {
      ...req.body,
      fecha: fechaHoraFormateada, // Usar la fecha formateada
    };

    // Llama al modelo con el objeto de solicitud actualizado
    const result = await solicitudServicioModelo.postSolicitudServicio(solicitud);

    // Obtener la solicitud recién creada
    const nuevaSolicitud = await solicitudServicioModelo.getSolicitudServicioPorID(result.insertId);

    // Responder con éxito
    res.status(201).json({
      message: 'Solicitud de servicio creada con éxito',
      insertId: result.insertId,
      solicitud: nuevaSolicitud,
    });
  } catch (error) {
    console.error('Error al crear la solicitud de servicio:', error);
    res.status(500).json({ message: 'Error al crear solicitud de servicio' });
  }
};

// Controlador para actualizar una solicitud de servicio por ID
const updateSolicitudServicio = async (req, res) => {
  const { id } = req.params; // Obtén el ID de los parámetros de la solicitud
  console.log('ID:', id, 'Body:', req.body);
  try {
    const result = await solicitudServicioModelo.putSolicitudServicio(id, req.body); // Llama a la función del modelo
    if (result > 0) {
      res.json({ message: 'Solicitud de servicio actualizada con éxito' });
    } else {
      res.status(404).json({ message: 'Solicitud de servicio no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la solicitud de servicio:', error);
    res.status(500).json({ message: 'Error al actualizar solicitud de servicio' });
  }
};

const updateEstadoSolicitudServicio = async (req, res) => {
  const { id } = req.params; // Obtén el ID de los parámetros de la solicitud
  console.log('ID:', id, 'Body:', req.body);
  try {
    const result = await solicitudServicioModelo.editarEstadoSolicitudServicio(id, req.body); // Llama a la función del modelo
    if (result > 0) {
      res.json({ message: 'Solicitud de servicio actualizada con éxito' });
    } else {
      res.status(404).json({ message: 'Solicitud de servicio no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la solicitud de servicio:', error);
    res.status(500).json({ message: 'Error al actualizar solicitud de servicio' });
  }
};

// Controlador para eliminar una solicitud de servicio por ID
const deleteSolicitudServicio = async (req, res) => {
  const { id } = req.params; // Obtén el ID de los parámetros de la solicitud
  try {
    const result = await solicitudServicioModelo.deleteSolicitudServicio(id); // Llama a la función del modelo
    if (result > 0) {
      res.json({ message: 'Solicitud de servicio eliminada con éxito' });
    } else {
      res.status(404).json({ message: 'Solicitud de servicio no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar la solicitud de servicio:', error);
    res.status(500).json({ message: 'Error al eliminar solicitud de servicio' });
  }
};

// Exporta los controladores para su uso en las rutas
module.exports = {
  getSolicitudesServicio,
  createSolicitudServicio,
  updateSolicitudServicio,
  deleteSolicitudServicio,
  getSolicitudesServicioPorCliente, 
  getSolicitudServicioPorID, 
  getSolicitudesServicioPorEmpleador,
  updateEstadoSolicitudServicio
};
