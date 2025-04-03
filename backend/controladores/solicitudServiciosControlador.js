// Lógica para manejar las peticiones de solicitudes de servicio
const solicitudServicioModelo = require('../modelos/solicitudServiciosModelo');

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
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener solicitudes de servicio:', error);
    res.status(500).json({ message: 'Error al obtener solicitudes de servicio' });
  }
};

// Controlador para crear una nueva solicitud de servicio
const createSolicitudServicio = async (req, res) => {
  try {
    const result = await solicitudServicioModelo.postSolicitudServicio(req.body); // Llama a la función del modelo
    res.status(201).json({ message: 'Solicitud de servicio creada con éxito', insertId: result });
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
  getSolicitudesServicioPorCliente
};
